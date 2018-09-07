<?php
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
	ini_set('implicit_flush', 1);
	ob_implicit_flush(true);
	set_time_limit(0);

	header('Content-Type: text/html; charset=utf-8');

	include('library/common_lib.php');
	include('library/trans_lib.php');
	include('mailer/mailer.lib.php');
	
	$date = date("Y-m-d", time()-date("Z")+3600*9);
	if(isset($_GET['date'])) $date = $_GET['date'];

	function trans_horse_name($jpn) {
		$data = @file_get_contents("logs/backup/horse_db.json");
		if(!($data)) return __get_translate($jpn);
		$arr_horses = json_decode($data, true);
		foreach ($arr_horses as $horse_obj) {
			if($horse_obj["jpn"] == $jpn)
				return $horse_obj["eng"];
		}

		return __get_translate($jpn);
	}

	function __check_exists($arr, $obj) {
		foreach ($arr as $item) {
			if(($item->venue_name == $obj->venue_name) && ($item->event_number == $obj->event_number) && ($item->horse_number == $obj->horse_number))
				return false;
		}
		return true;
	}

	function __register_log($arr_events, $obj) {
		foreach ($arr_events as $key => $item) {
			if(($item->venue_name == $obj->venue_name) && ($item->event_number == $obj->event_number)) {
				if(!isset($item->log_time)){
					$arr_events[$key]->log_time = $obj->time;
					$arr_events[$key]->response = $obj->response;
					$arr_events[$key]->http_code = $obj->http_code;
				}
			}
		}
		return $arr_events;
	}

	function __get_race_time($meetings, $venue_name, $event_number)
	{
		foreach ($meetings as $meeting) {
			if($meeting->venue_info) {
				if($meeting->venue_info->venue_name == $venue_name) {
					$races = $meeting->races;
					foreach ($races as $race) {
						if($race->race_id == $event_number)
							return $race->time;
					}
					return "";
				}
			}
			if($meeting->meeting_name == $venue_name) {
				$races = $meeting->races;
				foreach ($races as $race) {
					if($race->race_id == $event_number)
						return $race->time;
				}
				return "";
			}
		}
		return "";
	}

	function __calc_time_diff($basis_time, $real_time) 
	{
		global $date;

		if(!($basis_time)) return false;
		if(!($real_time)) return false;
		if(strlen($real_time) < 19) return false;

		$basis_time = $date." ".$basis_time.":00";
		$real_time = substr($real_time, 0, 19);

		if(strtotime($real_time) > strtotime($basis_time))
			return date("+ H:i:s", strtotime("2018-01-01") + strtotime($real_time) - strtotime($basis_time));
		return date("- H:i:s", strtotime("2018-01-01") - strtotime($real_time) + strtotime($basis_time));
	}

	function get_logs($date, $type="scratched", $source="nar"){
		$file_name = date("Ymd", strtotime($date))."_".$source."_".$type.".log";

		$data = @file_get_contents($file_name);
		if(!($data)) $data = @file_get_contents("logs/backup/".$file_name);

		if(($source == "nar") || ($source == "nar2"))
			$meeting_file_name = date("Ymd", strtotime($date))."_keiba_00.json";
		else
			$meeting_file_name = date("Ymd", strtotime($date))."_jra.json";

		$meeting_data = @file_get_contents($meeting_file_name);
		if(!($meeting_data)) $meeting_data = @file_get_contents("logs/backup/".$meeting_file_name);

		$meetings = [];
		if($meeting_data) $meetings = json_decode($meeting_data);

		$arr_events = [];

		$arr_data = explode("\n", $data);
		for($i=0; $i<count($arr_data); $i++){
			$pos = strpos($arr_data[$i], "{");
			$pos_e = strrpos($arr_data[$i], "}");
			$http_code = 201;

			$proc_time = trim(substr($arr_data[$i], 0, $pos));
			if($pos_e !== false) {
				$str_code = substr($arr_data[$i], $pos_e + 1);
				$arr_data[$i] = substr($arr_data[$i], $pos, $pos_e - $pos + 1);
				if(trim($str_code)) {
					$http_code = trim(str_replace(")", "", substr($str_code, 7)));
				}
			}
			else $arr_data[$i] = substr($arr_data[$i], $pos);

			$event_obj = json_decode(trim($arr_data[$i]));
			if(isset($event_obj->timestamp)) {
				foreach ($event_obj->events as $event_value) {
					$competitors = $event_value->competitors;
					foreach ($competitors as $race_datas) {
						$event = new \stdClass;
						$event->source = "";
						if($source == "nar") $event->source = "Keiba-go";
						else if($source == "nar2") $event->source = "Keiba-go (2)";
						else if($source == "jra") $event->source = "Jra";
						else if($source == "jra2") $event->source = "Jra2";
						$event->type = ucfirst( $type );

						if($event->type == "Disqualified") $event->type = "Did not finish";

						$event->venue_name = $event_obj->venue_name;
						$event->event_number = $event_value->number;
						$event->horse_number = $race_datas->race_data->number;
						$event->horse_name = "";
						if(isset($event_obj->horse)) $event->horse_name = $event_obj->horse;
						$event->time = $proc_time;
						$event->race_time = __get_race_time($meetings, $event_obj->venue_name, $event_value->number);
						$event->race_time_diff = "";
						if($event->race_time) $event->race_time_diff = __calc_time_diff($event->race_time, $event->time);
						$event->warning = false;
						if($event->race_time_diff) {
							if(substr($event->race_time_diff,0, 1) == "+") $event->warning = true;
						}
						if(__check_exists($arr_events, $event)) $arr_events[] = $event;
					}
				}
			} else if(isset($event_obj->status)) {
				$meeting_info = $event_obj->data->meetings;
				foreach ($meeting_info as $meeting_obj) {
					$venue_name = $meeting_obj->name;
					$event_changes = $meeting_obj->event_changes;
					foreach ($event_changes as $key => $value) {
						$event_number = $key;
						$log_obj = new \stdClass;
						$log_obj->venue_name = $venue_name;
						$log_obj->event_number = $event_number;
						$log_obj->time = $proc_time;
						$log_obj->response = $event_obj->status;
						$log_obj->http_code = $http_code;
						$arr_events = __register_log($arr_events, $log_obj);
					}
				}
			}
		}

		return $arr_events;
	}

	function mail_send_check($event) {
		global $date;

		$file_name = date("Ymd", strtotime($date))."_mail_send.log";

		$data = @file_get_contents($file_name);
		if(!($data)) $data = @file_get_contents("logs/backup/".$file_name);

		$arr_events = [];
		if($data) {
			$arr_events = json_decode($data);
			foreach ($arr_events as $event_obj) {
				if(($event_obj->venue_name == $event->venue_name) &&
				($event_obj->event_number == $event->event_number) &&
				($event_obj->horse_number == $event->horse_number)) {
					return true;
				}
			}
		}
		$arr_events[] = $event;
		@file_put_contents($file_name, json_encode($arr_events));
		return false;
	}

	function process_time($__time) {
		$__time = date("Y-m-d H:i:s", strtotime(substr($__time, 0, 19)) - 5).substr($__time, 19);
		return $__time;
	}

	$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
	if(($cur_hour < 5) || ($cur_hour >= 22)) exit();

	while(true) {

		$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
		if(($cur_hour < 5) || ($cur_hour >= 22)) exit();

		$arr_events = get_logs($date, "scratched");
		$arr_events = array_merge($arr_events, get_logs($date, "withdrawn"));
		$arr_events = array_merge($arr_events, get_logs($date, "disqualified"));

		$arr_events = array_merge($arr_events, get_logs($date, "scratched", "nar2"));
		$arr_events = array_merge($arr_events, get_logs($date, "withdrawn", "nar2"));
		$arr_events = array_merge($arr_events, get_logs($date, "disqualified", "nar2"));

		$arr_events = array_merge($arr_events, get_logs($date, "scratched", "jra"));
		$arr_events = array_merge($arr_events, get_logs($date, "withdrawn", "jra"));
		$arr_events = array_merge($arr_events, get_logs($date, "disqualified", "jra"));

		$arr_events = array_merge($arr_events, get_logs($date, "scratched", "jra2"));
		$arr_events = array_merge($arr_events, get_logs($date, "withdrawn", "jra2"));
		$arr_events = array_merge($arr_events, get_logs($date, "disqualified", "jra2"));

		for($i=0; $i<count($arr_events); $i++) {
			if(!($arr_events[$i]->warning)) continue;
			for($j=0; $j<count($arr_events); $j++) {
				if($arr_events[$j]->warning) continue;
				if(($arr_events[$i]->venue_name == $arr_events[$j]->venue_name) &&
					($arr_events[$i]->event_number == $arr_events[$j]->event_number) &&
					($arr_events[$i]->horse_number == $arr_events[$j]->horse_number)) {
					$arr_events[$i]->warning = false;
					break;
				}
			}
		}

		for($i=0; $i<count($arr_events); $i++) {
			$arr_events[$i]->need = true;
			for($j=0; $j<count($arr_events); $j++) {
				if($i == $j) continue;
				if(($arr_events[$i]->venue_name == $arr_events[$j]->venue_name) &&
					($arr_events[$i]->event_number == $arr_events[$j]->event_number) &&
					($arr_events[$i]->horse_number == $arr_events[$j]->horse_number) &&
					($arr_events[$i]->time > $arr_events[$j]->time)) {
					$arr_events[$i]->need = false;
					break;
				}
			}
		}

		$title = "Scratch Notice";
		$alt_content = 'Hi,
';
		$content = '<html>
			<head>
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<style>
					*{font-size: 16px;}
					body{background-color: #f1f1f1; margin: 0;}
					.main_content { max-width: 375px; margin: 0px auto; min-height:100%; position: relative;}
					.mail_header{ background-color: #3d8aca; color: white; padding: 20px; font-size: 2rem; font-weight: bold; text-align: center;}
					.mail_footer{ background-color: #008cff; color: white; padding: 20px; font-size: 1.1rem; font-style: italic; text-align: center;}
					.mail_content{ line-height: 3rem; font-size:1.1rem; padding: 15px; font-family: Courier; color: #11285d; font-weight: bold;}
					.mail_background {
						opacity:0.3;
						top: 0;
					    left: 0;
					    width: 100%;
					    height: 100%;
					    z-index: -1;
					    display: block;
					    position: absolute;
						background-image: url(http://racingjapan.com/assets/bg.jpg);
						transition: all 300ms linear;
    					background-size: cover;
    					background-position: center center;
					}
				</style>
			</head>
			<body>
				<div class="main_content">
					<div class="mail_header">
						Scratching Notice
					</div>
					<div class="mail_content">
						Hi, <br>';
		$mail_check = false;
		$mail_template = "";

		foreach($arr_events as $event){
			if(is_null($event->venue_name)) continue;
			if(!($event->need)) continue;
			
			$horse_name = $event->horse_name;
			$horse_name_html = str_get_html($horse_name);
			if($horse_name_html){
				if($horse_name_html->find("span", 0))
					$horse_name = $horse_name_html->find("span", 0)->innertext;
			}

			//if(mail_send_check($event)) continue;

			//if($event->type == "Disqualified") continue;
			if(strlen($event->race_time_diff) < 1) continue;
			if(substr($event->race_time_diff,0,1) == "+") continue;

			if(strlen($event->time) >= 19) $event->time = substr($event->time, 0, 19);

			$horse_eng_name = trans_horse_name($horse_name);
			if($horse_eng_name) $horse_name = $horse_eng_name;

			$mail_template = 'Runner '.$event->horse_number.' ('.$horse_name.') in Race '.$event->event_number.' ('.$event->race_time.') at '.$event->venue_name.' was '.$event->type.' at '.$event->time.', '.$event->race_time_diff.' '.((substr($event->race_time_diff,0,1) == "+")?'after':'before').' the race.';

			$content .= $mail_template."<br><br>";
			$alt_content .= $mail_template.'

';
			$mail_check = true;
		}

		$content .= 'Regards,<br>Chris<br>
					</div>
					<div class="mail_background"></div>
					<div class="mail_footer">( This is an automated Email )</div>
				</div>
			</body>
		</html>';

		$alt_content .= 'Regards,

Chris

( This is an automated Email )';

		if($mail_check) {
			$emails = [ "mark.oriend.philip@outlook.com", "cg@jts.ec" ];

			foreach ($emails as $__to_email_address) {
		  		custom_mail_send($__to_email_address, $title, $content, $alt_content);
		  	}
		}
exit();
		sleep(7);
	}
