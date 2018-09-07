<?php

	include('library/common_lib.php');

	$__proc_url = "http://race.netkeiba.com/?pid=race_list";
	$__result_url = "http://race.netkeiba.com/?pid=race&mode=result&id=";
	$__odds_url = "http://race.netkeiba.com/?pid=put_raceinfo&rid=";

	function __generate_error_notice($url = "", $pattern = "Something Changed", $case = 0) {
	  $message = $url." : [ ".$pattern." ]";
	  __send_slack_function("https://hooks.slack.com/services/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", $message);

	  include('email_list.php');
	  print_r($emails);
	  echo "<br>";

	  foreach ($emails as $__to_email_address) {
	  	echo $__to_email_address."<br>";
	  	__send_email($__to_email_address, "Netkeiba Site HTML Content Changed", $message);
	  }	  
	  
	  echo $message;
	  echo "\n<br>-----------------------------------<br>\n";
	}

	function __get_base_date() {
		global $__proc_url;

		$__result = __call_safe_url($__proc_url);
		$__result = iconv("EUC-JP", "UTF-8", $__result);
		$ret_html = str_get_html($__result);
		if($ret_html){
			$arr_date = $ret_html->find("#race_list_header a");
			if($arr_date){
				if(count($arr_date) > 0) {
					$href = $arr_date[0]->href;
					return __get_after_values($href, "&id=");
				}
			}
		}

		return false;
	}

	function __get_odds_track($__proc_id) {
		global $__proc_url;

		$ret = array();

		$__result = __call_safe_url($__proc_url."&id=".$__proc_id);
		$__result = iconv("EUC-JP", "UTF-8", $__result);
		$ret_html = str_get_html($__result);
		if($ret_html){
	  		$arr_tracks = $ret_html->find('.race_top_hold_list');
			foreach($arr_tracks as $info_track) {
				$track_html = str_get_html($info_track->innertext);
				if($track_html->find('.kaisaidata', 0)){
					$a_obj = $track_html->find('.kaisaidata', 0);
					$track_obj = new \stdClass;
					$track_obj->meeting_name = $a_obj->innertext;
					if(__get_until_values($track_obj->meeting_name, "<span")) $track_obj->meeting_name = __get_until_values($track_obj->meeting_name, "<span");
					$race_array = array();

					$arr_races = $track_html->find('.race_top_data_info');
					foreach($arr_races as $info_race) {
						$race_obj = new \stdClass;
						$race_html = str_get_html($info_race->innertext);
						$race_obj->race_text = $race_html->find('a', 0)->title;
						$race_obj->race_id =  __get_after_values(trim($race_html->find('a', 1)->href), '&id=');
						if(__get_until_values($race_obj->race_id, "&")) $race_obj->race_id = __get_until_values($race_obj->race_id, "&");
						$race_obj->event_number = str_replace("R", "", trim($race_html->find('a img', 0)->alt));
						$race_obj->id = $race_obj->event_number;
						$race_obj->time = trim(__get_until_values($race_html->find('.racedata', 0)->innertext, '&nbsp;'));
						if(strlen($race_obj->time) > 8) $race_obj->time = trim(__get_after_values($race_obj->time, '>'));
						if(strlen($race_obj->time) > 8) {
							$race_obj->time = trim(__get_last_values($race_obj->time, ' '));
						}
						array_push($race_array, $race_obj);
					}
					$track_obj->races = $race_array;
					array_push($ret, $track_obj);
				}
			}
		}
		return $ret;
	}

	function __get_race_odds($__race_id) {
		global $__odds_url;

		$__url = $__odds_url.substr($__race_id,1);
		$__result = __call_safe_url($__url);
		$race_info = json_decode($__result, true);
		$odds = $race_info["odds"];

		return $odds;
	}

	function __get_race_results($__race_id) {
		global $__result_url;

		$ret_obj = new \stdClass;

		$ret = array();
		
		$__url = $__result_url.$__race_id;
		$__result = __call_safe_url($__url);
		$__result = iconv("EUC-JP", "UTF-8", $__result);

		$__arr_repay = array();

		$__config_check = array( "馬単", "三連複", "三連単", "単勝", "複勝", "ワイド", "馬連" );
		$__config_pays = array( "馬単" => "EXA", "三連複" => "TRO", "三連単" => "TRI", "単勝" => "WIN", "複勝" => "PLC", "ワイド" => "QNP", "馬連" => "QNL" );

		$ret_html = str_get_html($__result);
		if($ret_html){
			$result_table = $ret_html->find('.race_table_01', 0);
			if($result_table){
		  		$arr_races = str_get_html($result_table)->find('tr');
				foreach($arr_races as $info_race) {
					$race_html = str_get_html($info_race->innertext);
					if($race_html->find('td.result_rank', 0)){
				          $race_obj = new \stdClass;
				          $race_obj->runner_number = trim($race_html->find('td', 2)->innertext);
				          $position_obj = new \stdClass;
				          $position_obj->finish_position = trim($race_html->find('td.result_rank', 0)->innertext);
				          $race_obj->race_data = $position_obj;
						array_push($ret, $race_obj);
					}
				}
				
				$arr_pays = $ret_html->find('.pay_table_01 tr');
				foreach($arr_pays as $info_pay) {
					$pay_html = str_get_html($info_pay->innertext);
					if($pay_html->find('th', 0)){
						$th_1 = $pay_html->find('th', 0);
						if($th_1->innertext){
							if(in_array(trim($th_1->innertext), $__config_check)){
					          $pay_obj = new \stdClass;
					          $pay_obj->kind = $__config_pays[trim($th_1->innertext)];
					          $pay_obj->number = trim($pay_html->find('td', 0)?$pay_html->find('td', 0)->innertext:"");
					          $pay_obj->money = trim($pay_html->find('td', 1)?$pay_html->find('td', 1)->innertext:"");
							  array_push($__arr_repay, $pay_obj);
							}
						}
					}
				}
			}
		}

		$ret_obj->result = $ret;
		$ret_obj->payout = $__arr_repay;

		return $ret_obj;
	}

	$base_date = __get_base_date();
	if($base_date) {
		echo $base_date;
		echo "\n<br>---------------------<br>\n";
	} else {
		__generate_error_notice($__proc_url, "NetKeiba Scheduler Parse Step 1 Error");
		exit();
	}

	$tracks = __get_odds_track($base_date);
	
	$track_url = $__proc_url."&id=".$base_date;
	echo $track_url;
	echo "\n<br>---------------------<br>\n";

	if((count($tracks) > 0) && isset($tracks[0]->races) && (count($tracks[0]->races) > 0)) {
		print_r($tracks);
		echo "\n<br>---------------------<br>\n";

		$race_id = $tracks[0]->races[0]->race_id;
		$result = __get_race_results($race_id);
		if((count($result->result) > 5) && (count($result->payout) > 5)) {
		  print_r($result);
		  echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($__result_url.$race_id, "Result & Payout Graber Error");
		}

		$odds_url = $__odds_url.substr($race_id,1);
		$odds = __get_race_odds($race_id);
		
		if(isset($odds[1])){
			$win_ret = [];
			$win_arr = $odds[1];
			foreach ($win_arr as $key => $value) {
				$win_ret[$key] = floatval( $value["win"] );
			}
			print_r($win_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "WIN Odds Graber Error");
		}

		if(isset($odds[2])){
			$min_ret = [];
			$max_ret = [];
			$plc_arr = $odds[2];
			foreach ($plc_arr as $key => $value) {
				$min_ret[$key] = floatval( $value["min"] );
				$max_ret[$key] = floatval( $value["max"] );
			}
			print_r($min_ret);
			echo "\n<br>---------------------<br>\n";
			print_r($max_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "PLC Odds Graber Error");
		}

		if(isset($odds[4])){
			$qnl_ret = [];
			$qnl_arr = $odds[4];
			foreach ($qnl_arr as $key => $value) {
				$arr_key = explode("_", $key);
				if(count($arr_key) == 2){
					$key1 = $arr_key[0];
					$key2 = $arr_key[1];
					if(!isset($qnl_ret[$key1])) $qnl_ret[$key1] = [];
					$qnl_ret[$key1][$key2] = floatval( $value );
				}
			}
			print_r($qnl_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "QNL Odds Graber Error");
		}

		if(isset($odds[5])){
			$min_ret = [];
			$max_ret = [];
			$qnp_arr = $odds[5];
			foreach ($qnp_arr as $key => $value) {
				$arr_key = explode("_", $key);
				if(count($arr_key) == 2){
					$key1 = $arr_key[0];
					$key2 = $arr_key[1];
					if(!isset($min_ret[$key1])) $min_ret[$key1] = [];
					if(!isset($max_ret[$key1])) $max_ret[$key1] = [];
					$min_ret[$key1][$key2] = floatval( $value["min"] );
					$max_ret[$key1][$key2] = floatval( $value["max"] );
				}
			}
			print_r($min_ret);
			echo "\n<br>---------------------<br>\n";
			print_r($max_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "QNP Odds Graber Error");
		}

		if(isset($odds[6])){
			$exa_ret = [];
			$exa_arr = $odds[6];
			foreach ($exa_arr as $key => $value) {
				$arr_key = explode("_", $key);
				if(count($arr_key) == 2){
					$key1 = $arr_key[0];
					$key2 = $arr_key[1];
					if(!isset($exa_ret[$key1])) $exa_ret[$key1] = [];
					$exa_ret[$key1][$key2] = floatval( $value );
				}
			}
			print_r($exa_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "EXA Odds Graber Error");
		}

		if(isset($odds[7])){
			$tro_ret = [];
			$tro_arr = $odds[7];
			foreach ($tro_arr as $key => $value) {
				$arr_key = explode("_", $key);
				if(count($arr_key) == 3){
					$key1 = $arr_key[0];
					$key2 = $arr_key[1];
					$key3 = $arr_key[2];
					if(!isset($tro_ret[$key1])) $tro_ret[$key1] = [];
					if(!isset($tro_ret[$key1][$key2])) $tro_ret[$key1][$key2] = [];
					$tro_ret[$key1][$key2][$key3] = floatval( $value );
				}
			}
			print_r($tro_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "TRO Odds Graber Error");
		}

		if(isset($odds[8])){
			$tri_ret = [];
			$tri_arr = $odds[8];
			foreach ($tri_arr as $key => $value) {
				$arr_key = explode("_", $key);
				if(count($arr_key) == 3){
					$key1 = $arr_key[0];
					$key2 = $arr_key[1];
					$key3 = $arr_key[2];
					if(!isset($tri_ret[$key1])) $tri_ret[$key1] = [];
					if(!isset($tri_ret[$key1][$key2])) $tri_ret[$key1][$key2] = [];
					$tri_ret[$key1][$key2][$key3] = floatval( $value );
				}
			}
			print_r($tri_ret);
			echo "\n<br>---------------------<br>\n";
		} else {
		  __generate_error_notice($odds_url, "TRI Odds Graber Error");
		}

	} else {
		__generate_error_notice($track_url, "NetKeiba Scheduler Parse Step 2 Error");
	}

?>