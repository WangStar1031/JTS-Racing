<?php

	include('library/common_lib.php');

	$__root_url_00 = "http://www2.keiba.go.jp";
	$__proc_url_00 = "http://www2.keiba.go.jp/KeibaWeb/TodayRaceInfo/TodayRaceInfoTop";

	function __generate_error_notice($url = "", $pattern = "Something Changed", $case = 0) {
		$message = $url." : [ ".$pattern." ]";
		__send_slack_function("https://hooks.slack.com/services/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", $message);

	  include('email_list.php');
	  foreach ($emails as $__to_email_address) {
	  	__send_email($__to_email_address, "Keiba Site HTML Content Changed", $message);
	  }	
	  echo $message;
	  echo "\n<br>-----------------------------------<br>\n";
	}

	function __get_tracks() {
		global $__root_url_00, $__proc_url_00;

		$__result = __call_safe_url($__proc_url_00);
		$ret_html = str_get_html($__result);
		if($ret_html){
	  		$arr_tracks = $ret_html->find('.courseInfo .course td');
	  		if(count($arr_tracks) < 3) {
	  			__generate_error_notice($__proc_url_00, '.courseInfo .course td');
	  			return false;
	  		}
	  		$info_track = $arr_tracks[1];
			$track_html = str_get_html($info_track->innertext);
			$tracks_array = $track_html->find('a.courseName');
			if(count($tracks_array) == 0) {
				__generate_error_notice($__proc_url_00, 'a.courseName');
	  			return false;
			}
			$track_item = $tracks_array[0];

			$track_obj = new \stdClass;
			$track_obj->track_name = $track_item->innertext;
			$track_obj->race_id = __get_last_values($track_item->href, "=");
			$track_obj->track_href = $__root_url_00.$track_item->href;

			print_r($track_obj);
			echo "\n---------------------\n";
			return $track_obj;
		}
		__generate_error_notice($__root_url_00, "Parse Error");
		return false;
	}

	function __track_info($__track_url) {	
		global $__root_url_00;

		$ret = [];
		$__result = __call_safe_url($__track_url);
		$ret_html = str_get_html($__result);
		if($ret_html){
	  		$arr_races = $ret_html->find('.raceTable tr.data');
	  		if(count($arr_races) < 5) {
	  			__generate_error_notice($__track_url, '.raceTable tr.data');
	  			return false;
	  		}
			foreach($arr_races as $info_race) {
				$race_html = str_get_html($info_race->innertext);
				$race_datas = $race_html->find('td');
				if(count($race_datas) < 9) continue;
				$track_obj = new \stdClass;
				$track_obj->id = trim(str_replace("R", "", $race_datas[0]->innertext));
				if(!is_numeric($track_obj->id)) {
					__generate_error_notice($__track_url, "Race Number Error");
	  				return false;
	  			}
				$track_obj->race_id = $track_obj->id;
				$race_name_html = str_get_html( $race_datas[4]->innertext );
				$track_obj->name = trim($race_name_html->find('a', 0)->innertext);
				if(substr($race_name_html->find('a', 0)->href, 0, 2) == "..")
					$track_obj->href = "http://www2.keiba.go.jp/KeibaWeb".substr($race_name_html->find('a', 0)->href,2);
				else
					$track_obj->href = $__root_url_00.$race_name_html->find('a', 0)->href;
				if(__get_values($race_datas[1]->innertext, '<span class="timechange">', '</span>'))
					$track_obj->time = trim(__get_values($race_datas[1]->innertext, '<span class="timechange">', '</span>'));
				else
					$track_obj->time = trim($race_datas[1]->innertext);
				if((!($track_obj->time)) || (substr($track_obj->time, 2, 1) != ":")) {
					__generate_error_notice($__track_url, "Race Time Error");
	  				return false;
				}
				$track_obj->count = trim($race_datas[8]->innertext);
				if($track_obj->count) $ret[] = $track_obj;
			}
			print_r($ret);
			echo "\n---------------------\n";
			return $ret[0];
		}
		__generate_error_notice($__track_url, "Parse Error");
		return false;
	}

	function __race_info($__race_url) {
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);
		if($ret_html){
			$trs = $ret_html->find(".cardTable table tr");
			for($i=0; $i<count($trs); $i++) {
				$tr = $trs[$i];
				$tr_obj = str_get_html($tr->innertext);
				if($tr->class == "tBorder") {
					if(!($tr_obj->find(".horseNum", 0))) {
						__generate_error_notice($__race_url, ".horseNum");
						return false;
					}
					$num = (int) $tr_obj->find(".horseNum", 0)->innertext;
					$trTrainr = $trs[$i+2];
					$tr_obj2 = str_get_html($trTrainr->innertext);

					if(!($tr_obj->find("a.jockeyName", 0))) {
						__generate_error_notice($__race_url, "a.jockeyName");
						return false;
					}
					$jockey_link = $tr_obj->find("a.jockeyName", 0)->href;

					if(!($tr_obj2->find("[href*=k_trainerLicenseNo]", 0))) {
						__generate_error_notice($__race_url, "[href*=k_trainerLicenseNo]");
						return false;
					}
					$trainr_link = $tr_obj2->find("[href*=k_trainerLicenseNo]", 0)->href;

					$jockey_id = (int) explode("k_riderLicenseNo=", $jockey_link)[1];
					$trainer_id = (int) explode("k_trainerLicenseNo=", $trainr_link)[1];

					echo $num.' -- '.$jockey_id.' -- '.$trainer_id;
					echo "\n---------------------\n";

					$silk = "http://www2.keiba.go.jp/Image/Main/Uniform/U" . str_pad($jockey_id, 6, "0", STR_PAD_LEFT) . ".jpg";
					if(@file_get_contents($silk))
						return true;

					__generate_error_notice($__race_url, "Uniform Error");
					return false;
				}
			}
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	function __win_plc_check($__race_url, $__pattern) {
		$__race_url = str_replace("DebaTable", $__pattern, $__race_url);
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);
		if($ret_html){
			$trs = $ret_html->find("td.dbtbl table.bs tr");
			$total_check = 0;
			for($i=0; $i<count($trs); $i++) {
				$tr = $trs[$i];
				$race_html = str_get_html($tr->innertext);				
				if($race_html->find('.dbdata', 0)){
					$oddsWin = ($race_html->find('.plus1bold01', 1))?trim($race_html->find('.plus1bold01', 1)->innertext):0;
					$oddsPlace = ($race_html->find('.plus1bold01', 2))?trim($race_html->find('.plus1bold01', 2)->innertext):0;
					if($oddsWin) $total_check++;
					if($oddsPlace) $total_check++;
					if($total_check >= 6) return true;
				}
			}
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	function __qnl_exa_qnp_tri_tro_check($__race_url, $__pattern, $__addition = false, $__check_tag = "tr.dbdata td") {
		$__race_url = str_replace("DebaTable", $__pattern, $__race_url);
		$__race_url .= "&odds_flg=0";
		if($__addition) {
			$__race_url__second = $__race_url."&k_selHoseNo=2";
			$__race_url .= "&k_selHoseNo=1";
		}
		$__result = __call_safe_url($__race_url);
		if($__addition) {
			$__result__second = __call_safe_url($__race_url__second);
			echo strlen($__result__second)."++++++++";
			echo strlen($__result)."--------";
			if(strlen($__result__second) < strlen($__result)) {
				$__result = $__result__second;
				$__race_url = $__race_url__second;
			}
		}
		$ret_html = str_get_html($__result);
		if($ret_html){
			$trs = $ret_html->find($__check_tag);
			$total_check = 0;
			$total_count = count($trs);
			foreach ($trs as $td) {
				if(is_numeric($td->innertext)) {
					echo $td->innertext." -- ";
					$total_check++;
				} else {
					$odds = explode("-", $td->innertext);
					if(count($odds) == 2)
						if(is_numeric($odds[0]) && is_numeric($odds[1])) {
							echo $td->innertext." -- ";
							$total_check++;							
						}
				}
			}
			if(($total_check > 10) && ($total_count > 10)) {
				echo "\n---------------------\n";
				return true;
			}
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	function __result_check($__race_url) {
		$__race_url = str_replace("DebaTable", "RaceMarkTable", $__race_url);
		$__result = __call_safe_url($__race_url);
		$ret_html = str_get_html($__result);
		if($ret_html){
			$__config_pays = array( "馬連単" => "EXA", "三連複" => "TRO", "三連単" => "TRI", "単勝" => "WIN", "複勝" => "PLC", "ワイド" => "QNP", "馬連複" => "QNL" );

			$arr_races = $ret_html->find('td.containerMain table.cover table.bs td.dbtbl table.bs tr');
			$ret = [];
			$__arr_repay = [];
			foreach($arr_races as $info_race) {
				$race_html = str_get_html($info_race->innertext);
				if(count($race_html->find('td')) == 15){
					if($race_html->find('td span.bold', 0)){
						$race_obj = new \stdClass;
						$race_obj->runner_number = trim($race_html->find('td', 2)->innertext);
						$position_obj = new \stdClass;
						$position_obj->finish_position = trim($race_html->find('td span.bold', 0)->innertext);
						$race_obj->race_data = $position_obj;
						$ret[] = $race_obj;
					}
				}
			}
			$arr_tables = $ret_html->find('table.cover table');
			$__pos__ = 0;
			foreach ($arr_tables as $obj_table) {
				$obj_table_html = str_get_html($obj_table->innertext);
				$trs = $obj_table_html->find('tr.dbitem');
				if(count($trs) == 2){
					if($__pos__) break;
					if($obj_table_html->find('tr.dbdata', 0)){
						$obj_trs_html = str_get_html($trs[0]->innertext);
						$obj_trs_html_2 = str_get_html($obj_table_html->find('tr.dbdata', 0)->innertext);
						$tr_detail_items = $obj_trs_html_2->find('td');
						$__pos__ = 0;
						foreach ($obj_trs_html->find("td") as $tr_main_item) {
							if($tr_main_item->colspan == 3){
								$pay_obj = new \stdClass;
								$pay_key = trim(str_get_html($tr_main_item->innertext)->find("b", 0)->innertext);
								if(isset($__config_pays[$pay_key])){
									$pay_obj->kind = $__config_pays[$pay_key];
									$pay_obj->number = trim($tr_detail_items[3 * $__pos__ + 1]->innertext);
									$pay_obj->money = trim($tr_detail_items[3 * $__pos__ + 2]->innertext);
									$__arr_repay[] = $pay_obj;
								}
									
								$__pos__++;
							}
						}
					}
				}
			}
			print_r($ret);
			echo "\n---------------------\n";
			print_r($__arr_repay);
			if((count($ret) > 0) && (count($__arr_repay) == 7)) return true;
		}
		__generate_error_notice($__race_url, "Parse Error");
		return false;
	}

	$track_obj = __get_tracks();
	if($track_obj) $race_obj = __track_info($track_obj->track_href);
	if($race_obj) {
		__race_info($race_obj->href);
		__win_plc_check($race_obj->href, "OddsTanFuku");
		__qnl_exa_qnp_tri_tro_check($race_obj->href, "OddsUmLenFuku");
		__qnl_exa_qnp_tri_tro_check($race_obj->href, "OddsUmLenTan");
		__qnl_exa_qnp_tri_tro_check($race_obj->href, "OddsWide");
		__qnl_exa_qnp_tri_tro_check($race_obj->href, "Odds3LenTan", true, "tr.dbdata td span");
		__qnl_exa_qnp_tri_tro_check($race_obj->href, "Odds3LenFuku", true, "td.dbtbl tr td");
		__result_check($race_obj->href);
	}