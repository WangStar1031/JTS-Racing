<?php

	include('library/common_lib.php');

	$__proc_url = "https://keiba.rakuten.co.jp/odds/tanfuku/RACEID/";
	$__result_url = "https://keiba.rakuten.co.jp/race_performance/list/RACEID/";

	function __generate_error_notice($url = "", $pattern = "Something Changed", $case = 0) {
		$message = $url." : [ ".$pattern." ]";
		__send_slack_function("https://hooks.slack.com/services/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", $message);

	  include('email_list.php');
	  foreach ($emails as $__to_email_address) {
	  	__send_email($__to_email_address, "Rakuten Site HTML Content Changed", $message);
	  }	
	  echo $message;
	  echo "\n<br>-----------------------------------<br>\n";
	}

	function __get_tracks() {
		global $__proc_url;

		$ret = array();		
		$__url = $__proc_url.(date("Ymd", time()-86400))."0000000000";
		$__result = __call_safe_url($__url);
		$ret_html = str_get_html($__result);
		if($ret_html){
	  		$arr_tracks = $ret_html->find('.raceTrack li');
			foreach($arr_tracks as $info_track) {
				$track_html = str_get_html($info_track->innertext);
				if($track_html->find('a', 0)){
					$a_obj = $track_html->find('a', 0);
					$track_obj = new \stdClass;
					$track_obj->track_id = $info_track->class;
					$track_obj->track_name = $a_obj->innertext;
					$track_obj->track_race_id = __get_last_values($a_obj->href, "/");
					
					print_r($track_obj);
					echo "\n<br>---------------------<br>\n";
					return $track_obj;
				}
			}
			__generate_error_notice($__url, '.raceTrack li');
	  		return false;
		}
		__generate_error_notice($__url, "Parse Error");
		return false;
	}

	function __track_info($__race_id) {	
		global $__proc_url;

		$__url = $__proc_url.$__race_id;
		$__result = __call_safe_url($__url);

		$ret_html = str_get_html($__result);
		if($ret_html){			
	  		$arr_races = $ret_html->find('tbody.raceState tr');
			foreach($arr_races as $info_race) {
				$race_html = str_get_html($info_race->innertext);
				if($race_html->find('.number .race', 0)){
					if(!($race_html->find('.number .race', 0))) {
						__generate_error_notice($__url, '.number .race');
						return false;
					}
					if(!($race_html->find('.raceName a', 0))) {
						__generate_error_notice($__url, '.raceName a');
						return false;
					}
					$track_obj = new \stdClass;
					$track_obj->id = __get_until_values($race_html->find('.number .race', 0)->innertext, "<span");
					$track_obj->race_id = __get_last_values($race_html->find('.raceName a', 0)->href, "/");
					$track_obj->name = $race_html->find('.raceName a', 0)->innertext;
					$track_obj->time = trim($race_html->find('td', 0)->innertext);
					$track_obj->distance = __get_last_values($race_html->find('td.distance', 0)->innertext, "</span>");
					$track_obj->count = $race_html->find('td', 3)->innertext;
					
					if(!is_numeric($track_obj->id)) {
						__generate_error_notice($__url, "Race Number InCorrect");
						return false;
					}
					if(strlen($track_obj->race_id) != strlen($__race_id)) {
						__generate_error_notice($__url, "Race ID Error");
						return false;
					}
					if(substr($track_obj->time, 2, 1) != ":") {
						__generate_error_notice($__url, "Race Time Error");
						return false;
					}

					print_r($track_obj);
					echo "\n<br>---------------------<br>\n";
					return $track_obj;
				}
			}
		}
		__generate_error_notice($__url, "Parse Error");
		return false;
	}

	function __race_info($__race_id_1, $__race_id_2) {
		
		$__race_url = "https://keiba.rakuten.co.jp/race_card/list/RACEID/".$__race_id_1;
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);

		if($ret_html){
			$check_1 = __race_info_check($__race_id_1);
			//$check_2 = __race_info_check($__race_id_2);
			if($check_1) {
				__generate_error_notice($__race_url, "HTML Template Changed");
				return false;
			}
			return true;
		}

		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	function __race_info_check($__race_id) {
		
		$__race_url = "https://keiba.rakuten.co.jp/race_card/list/RACEID/".$__race_id;
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);

		if(@file_get_contents("rakuten_race_template".$__race_id))
			copy("rakuten_race_template".$__race_id, "rakuten_race_template.bak".$__race_id);
		if($ret_html){
			foreach ($ret_html->find("span.hot") as $span_obj) {
				$span_obj->innertext = "XXX";
			}
			foreach ($ret_html->find("span.dark") as $span_obj) {
				$span_obj->innertext = "XXX";
			}
			$div_obj = $ret_html->find("div#oddsField", 0);
			@file_put_contents("rakuten_race_template".$__race_id, $div_obj->innertext);

			if(@file_get_contents("rakuten_race_template.bak".$__race_id)) {
				if(md5_file("rakuten_race_template.bak".$__race_id) != md5_file("rakuten_race_template".$__race_id)) {
					return true;
				}
			}
			return false;
		}

		return true;
	}

	function __win_plc_check($__race_id) {
		global $__proc_url;

		$__race_url = $__proc_url.$__race_id;
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);
		if($ret_html){
			$trs = $ret_html->find("#oddsField #wakuUmaBanJun .selectWrap tr");
			$total_check = 0;
			for($i=0; $i<count($trs); $i++) {
				$tr = $trs[$i];
				$race_html = str_get_html($tr->innertext);				
				if($race_html->find('.number', 0)){
					$oddsWin = ($race_html->find('.oddsWin span', 0))?$race_html->find('.oddsWin span', 0)->innertext:$race_html->find('.oddsWin', 0)->innertext;
					if(!($race_html->find('.oddsPlace span', 0))) {
						$oddsPlace = $race_html->find('.oddsPlace', 0)->innertext;
						$oddsPlace_val = explode("-", $oddsPlace);
						$oddsPlace_min = $oddsPlace_val[0];
						if(count($oddsPlace_val)) $oddsPlace_max = $oddsPlace_val[1];
						else $oddsPlace_max = 0;
					} else {
						$oddsPlace_min = ($race_html->find('.oddsPlace span', 0))?$race_html->find('.oddsPlace span', 0)->innertext:0;
						$oddsPlace_max = ($race_html->find('.oddsPlace span', 1))?$race_html->find('.oddsPlace span', 1)->innertext:0;
					}
					if($oddsWin) $total_check++;
					if($oddsPlace_min) $total_check++;
					if($oddsPlace_max) $total_check++;
					echo $oddsWin." -- ".$oddsPlace_min." -- ".$oddsPlace_max." -- ";
					if($total_check >= 9) {
						echo "\n<br>---------------------<br>\n";
						return true;
					}
				}
			}
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	function __qnl_exa_qnp_tri_tro_check($__race_id, $__pattern, $__check_tag="div#wakuUmaBanJun tbody.oddsList td") {
		global $__proc_url;

		$__race_url = str_replace("tanfuku", $__pattern, $__proc_url).$__race_id;

		$__result = __call_safe_url($__race_url);
		
		$ret_html = str_get_html($__result);
		if($ret_html){
			$trs = $ret_html->find($__check_tag);
			$total_check = 0;
			$total_count = count($trs);
			foreach ($trs as $td_obj) {
				if($__pattern == "wide") {
					$td_html = $td_obj->innertext;
					$td_datas = explode('<span>-</span>', $td_html);
					$odds_value_min = 0;
					if(str_get_html($td_datas[0])->find('span')){
						$odds_value_min = floatval( str_get_html($td_datas[0])->find('span', 0)->innertext );
					} else {
						$odds_value_min = floatval( $td_datas[0] );
					}
					$odds_value_max = 0;
					if(count($td_datas) > 1){
						if(str_get_html($td_datas[1])->find('span')){
							$odds_value_max = floatval( str_get_html($td_datas[1])->find('span', 0)->innertext );
						} else {
							$odds_value_max = floatval( $td_datas[1] );
						}
					}
					if(is_numeric($odds_value_max) && is_numeric($odds_value_min)) {
						echo $odds_value_min." -- ".$odds_value_max." -- ";
						$total_check++;
					}
				} else {
					if(str_get_html($td_obj)->find('span')){
						$odds_value = floatval( str_get_html($td_obj)->find('span', 0)->innertext );
					} else {
						$odds_value = floatval( $td_obj->innertext );
					}
					if(is_numeric($odds_value)) {
						echo $odds_value." -- ";
						$total_check++;
					}
				}
			}
			if(($total_check > 10) && ($total_count > 10)) {
				echo "\n<br>---------------------<br>\n";
				return true;
			}
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	function __result_check($__race_id) {
		global $__result_url;

		$__race_url = $__result_url.$__race_id;
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);
		if($ret_html){
			$__config_check = array( "馬単", "三連複", "三連単", "単勝", "複勝", "ワイド", "馬複" );
			$__config_pays = array( "馬単" => "EXA", "三連複" => "TRO", "三連単" => "TRI", "単勝" => "WIN", "複勝" => "PLC", "ワイド" => "QNP", "馬複" => "QNL" );

			$ret = [];
			$__arr_repay = [];
			$arr_races = $ret_html->find('#oddsField tbody.record tr');
			foreach($arr_races as $info_race) {
				$race_html = str_get_html($info_race->innertext);
				if($race_html->find('td.order', 0)){
			          $race_obj = new \stdClass;
			          $race_obj->runner_number = trim($race_html->find('td.number', 0)->innertext);
			          $position_obj = new \stdClass;
			          $position_obj->finish_position = trim($race_html->find('td.order', 0)->innertext);
			          $race_obj->race_data = $position_obj;
					array_push($ret, $race_obj);
				}
			}
			$arr_pays = $ret_html->find('tbody.repay tr');
			foreach($arr_pays as $info_pay) {
				$pay_html = str_get_html($info_pay->innertext);
				if($pay_html->find('th', 0)){
					$th_1 = $pay_html->find('th', 0);
					if($th_1->innertext){
						if(in_array(trim($th_1->innertext), $__config_check)){
				          $pay_obj = new \stdClass;
				          $pay_obj->kind = $__config_pays[trim($th_1->innertext)];
				          $pay_obj->number = trim($pay_html->find('td.number', 0)?$pay_html->find('td.number', 0)->innertext:"");
				          $pay_obj->money = trim($pay_html->find('td.money', 0)?$pay_html->find('td.money', 0)->innertext:"");
						  array_push($__arr_repay, $pay_obj);
						}
					}
				}
				if($pay_html->find('th', 1)){
					$th_1 = $pay_html->find('th', 1);
					if($th_1->innertext){
						if(in_array(trim($th_1->innertext), $__config_check)){
				          $pay_obj = new \stdClass;
				          $pay_obj->kind = $__config_pays[trim($th_1->innertext)];
				          $pay_obj->number = trim($pay_html->find('td.number', 1)?$pay_html->find('td.number', 1)->innertext:"");
				          $pay_obj->money = trim($pay_html->find('td.money', 1)?$pay_html->find('td.money', 1)->innertext:"");
						  array_push($__arr_repay, $pay_obj);
						}
					}
				}
			}
			print_r($ret);
			echo "\n<br>---------------------<br>\n";
			print_r($__arr_repay);
			echo "\n<br>---------------------<br>\n";
			if((count($ret) > 0) && (count($__arr_repay) == 7)) return true;
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}
__race_info("201801010304200102", "201801192726230411");
//exit();
	$track_obj = __get_tracks();
	if($track_obj) $race_obj = __track_info($track_obj->track_race_id);
	if($race_obj) {
		//__race_info($race_obj->race_id);
		__win_plc_check($race_obj->race_id);
		__qnl_exa_qnp_tri_tro_check($race_obj->race_id, "umafuku");
		__qnl_exa_qnp_tri_tro_check($race_obj->race_id, "umatan");
		__qnl_exa_qnp_tri_tro_check($race_obj->race_id, "wide");
		__qnl_exa_qnp_tri_tro_check($race_obj->race_id, "sanrentan", "div#oddsField div.rateField div#odds_1_1 table tr td");
		__qnl_exa_qnp_tri_tro_check($race_obj->race_id, "sanrenfuku", "div#oddsField div.rateField div#odds_1 table tr td");
		__result_check($race_obj->race_id);
	}
