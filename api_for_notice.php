<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once ( "block_ip.php" );

$c = 0;
if(isset($_GET['c'])) $c = $_GET['c'];

function __get_current_race($ret, $track_id) {	
	$curTime = GetCurrentJapanTimeStamp();
	$pre_time = $curTime + 900;
	$post_time = $curTime - 60;

	for($i=0; $i<count($ret); $i++){
		if($ret[$i]->meeting_id == 0) continue;
		for($j=0; $j<count($ret[$i]->races); $j++){
			$race_id = __regen_race_id_from_href( $ret[$i]->races[$j]->href );
			if($track_id != substr($race_id, -2)) break;
			$time = $ret[$i]->races[$j]->time;
			if(($track_id == "03") || ($track_id == "3")) continue;
			if(($time <= date("H:i", $pre_time)) && ($time >= date("H:i", $post_time))){
				$race_obj = new \stdClass;
				$race_obj->meeting_id = $ret[$i]->meeting_id;
				$race_obj->meeting_name = $ret[$i]->track_name;
				$race_obj->event_number = $ret[$i]->races[$j]->id;
				$race_obj->time = $time;
				$race_obj->race_id = $race_id;
				$race_obj->track_id = $track_id;

				return $race_obj;
			}			
		}
	}

	return false;
}

function __get_current_races($ret) {	
	$curTime = GetCurrentJapanTimeStamp();
	$pre_time = $curTime + 900;
	$post_time = $curTime - 60;

	$races = [];

	for($i=0; $i<count($ret); $i++){
		if($ret[$i]->meeting_id == 0) continue;
		for($j=0; $j<count($ret[$i]->races); $j++){
			$race_id = __regen_race_id_from_href( $ret[$i]->races[$j]->href );
			$track_id = substr($race_id, -2);
			$time = $ret[$i]->races[$j]->time;
			if(($track_id == "03") || ($track_id == "3")) continue;
			if(($time <= date("H:i", $pre_time)) && ($time >= date("H:i", $post_time))){
				$race_obj = new \stdClass;
				$race_obj->meeting_id = $ret[$i]->meeting_id;
				$race_obj->meeting_name = $ret[$i]->track_name;
				$race_obj->event_number = $ret[$i]->races[$j]->id;
				$race_obj->time = $time;
				$race_obj->race_id = $race_id;
				$race_obj->track_id = $track_id;

				$races[] = $race_obj;
			}			
		}
	}

	return $races;
}

if($c == 1){ // Check Race Time Change
	require_once("library/jra_00.php");

	$result = __get_schedule_change();
	echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
	for($i=0; $i<count($result); $i++)
	{
		if(count($result[$i]->races)){
			echo "<b>".$result[$i]->meeting_id."</b><br>";
			$races = $result[$i]->races;
			for($j=0; $j<count($races); $j++){
				echo $races[$j]->event_number." => ".$races[$j]->time."<br>";
			}
		}
	}
} else if($c == 2){ // Remove All Caches

	$dir = dirname($_SERVER['SCRIPT_FILENAME']);

	$now_time = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s"))-date("Z")+3600*9);
	$check_date = date("Y-m-d 00:00:00", strtotime($now_time));

	$check_date = strtotime($check_date) + 86400 * 2;

	function check_dir($dir) { 
		global $check_date;

	   if (is_dir($dir)) { 
	     $objects = scandir($dir); 
	     foreach ($objects as $file) { 
	     	if ($file != "." && $file != ".." && $file != "logs") { 
          		if(filemtime($dir."/".$file) < $check_date){
          			if(is_numeric(substr($file, 0, 1))){
          				if(@file_get_contents("logs/backup/".$file)){
							file_put_contents("logs/backup/".$file.".".time(), @file_get_contents($file));
          				} else {
	          				file_put_contents("logs/backup/".$file, @file_get_contents($file));
	          			}
          				//file_put_contents("logs/backup/".$file, @file_get_contents($file));
          				unlink($file);
				    }
				}
			}
	     }
	   } 
	 }

	 check_dir($dir);

} else if($c == 3){ // Store Settings

	$api_send = $_POST['api_send'];

	if($api_send){
		file_put_contents("api_send", date("Y-m-d H:i:s"));
	} else {
		if(file_exists("api_send")) unlink("api_send");
	}

} else if($c == 4){ // Grab CName For JRA First Race

	require_once "library/jra_00.php";

	__get_today_result();

} else if($c == 5){ // Send End Point Call For Race Status Change

	include('library/common_lib.php');

	$obj = new \stdClass;
	$obj->meeting_id = $_POST["meeting_id"];
	$obj->event_number = $_POST["event_number"];
	$obj->status = "ABANDONED";
	if(isset($_POST["status"])) $obj->status = $_POST["status"];
	if($obj->status == "CLOSED") $obj->force = true;

	$ret = __api_send__("https://staging.dw.xtradeiom.com/api/events/xxx/status", "PUT", $obj);
	$ret = json_decode($ret);
	$ret->race_id = $_POST["race_id"];
	echo json_encode($ret);

} else if($c == 6){ // Re-Generate Japan Proxies
	require_once "library/keiba.php";
	require_once "proxy/proxy_getters.php";

	$proxy_getter = new proxy_getters();
	$proxy = $proxy_getter->getRndProxy();
	file_put_contents("proxies_japan", $proxy);
	echo $proxy;
} else if($c == 7){ // Grabbing Odds CName
	require_once "library/jra_00.php";

	__get_today_odds();
} else if($c == 8){ // Grabbing Odds CName List
	require_once "library/jra_00.php";

	__get_today_odds_cname_4ext();
} else if($c == 9){ // Grabbing Odds CName List
	require_once "library/keiba.php";

	__get_today_odds_cname_4ext();
} else if($c == 10){ // Grabbing Odds CName List
	require_once "library/jra.php";

	__get_today_odds_cname_4ext();
} else if($c == 11){ // Grabbing Odds CName List
	require_once "library/keiba_00.php";

	__get_today_odds_cname_4ext();
} else if($c == 12){ // NAR Race Time Change Check
	require_once "library/keiba_00.php";

	$result = __get_schedule_change();

	echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
	foreach ($result as $races) {
		echo $races->meeting_name." ( ".$races->meeting_id." ) R".$races->event_number." : ".$races->time." => ".$races->new_time."<br><br>";
	}
} else if($c == 13){ // Grabing Race Event
	require "library/jra_00.php";

	$arr = __get_extra_events();
	echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
	echo "<b>Race Event List</b>";
	echo '<table>';
	foreach ($arr as $event) {
		echo '<tr><td>'.$event->meeting_id.'</td><td>'.$event->event_number.'</td><td>'.implode('<br><br>', $event->event).'</td><td></td></tr>';
	}
	echo '</table>';
} else if($c == 14){ // Display Race Event
	require "library/jra_00.php";
	require_once 'library/trans_lib.php';

	header('Content-Type: text/html; charset=utf-8');

	$patterns = get_word_patterns();
	$sentences = get_sentence_patterns();

	$date_str = date("Ymd");
	if(isset($_GET["d_val"])) $date_str = $_GET['d_val'];
	$meetings = [];
	$schedules =  __get_race_schedule($date_str);
	foreach ($schedules as $meeting) {
		$meetings[$meeting->meeting_id] = $meeting->meeting_name;
	}

	$dic_data = json_decode(@file_get_contents("logs/backup/competitors_".$date_str."_dic.json"));

	$lang = "jp";
	if(isset($_GET['lang'])) $lang = $_GET['lang'];

	$arr = __get_extra_events(true, $date_str);
	echo '<meta http-equiv="content-type" content="text/html; charset=utf-8">';
	echo '<style>table, td{border-collapse: collapse; border: solid 1px gray; padding: 4px;}</style>';
	$date_value = substr($date_str,0,4)."-".substr($date_str,4,2)."-".substr($date_str,6,2);
	echo "<b>".date("F jS, Y", strtotime($date_value))." JRA Stewards Reports</b>";
	$link_href = $_SERVER["REQUEST_URI"];
	if($lang == "en") $link_href = str_replace("&lang=en", "", $link_href);
	else $link_href .= "&lang=en";
	echo ' <a href="'.$link_href.'" style="text-decoration: none; color: green;"> ( '.(($lang == "en")?"English":"Japanese").' ) </a>';
	echo "<br>";
	
	$meeting_id = 0;
	foreach ($arr as $event) {
		$event_string = trim(implode("", $event->event));
		if(!($event_string)) $event->event = ["Nothing to report."];
		$event_string = trim(implode("", $event->event));
		if($event_string){

			if(isset($event->meeting_name)) $meeting_name = $event->meeting_name;
			else $meeting_name = $meetings[$event->meeting_id];
			if($lang == "en") {
				$event->event = process_event($event->event);
				$meeting_name = process_meeting($meeting_name);
			}
			if($meeting_id !== $event->meeting_id) {
				if($meeting_id) echo '</table>';
				$meeting_id = $event->meeting_id;
				echo '<br><h2><font color=blue>'.$meeting_name.'</font>';
				if(strlen($event->meeting_id) < 10) echo ' ( '.$event->meeting_id.' )';
				echo '</h2><table>';
			}

			echo '<tr><td style="width:80px; text-align: center;">Race '.$event->event_number.'</td><td>'.implode('<hr>', $event->event).'</td></tr>';
		}
	}
	echo '</table>';
} else if($c == 15){	// Grab Live Video Odds Data
	require "library/keiba_00.php";
	
	$arr_meeting = array("帯広ば" => "Obihiro", "門別" => "", "札幌" => "", "盛岡" => "", "水沢" => "Mizusawa", "浦和" => "Urawa", "船橋" => "Funabashi", "大井" => "Oi", "川崎" => "Kawasaki", "金沢" => "Kanazawa", "笠松" => "Kasamatsu", "名古屋" => "Nagoya", "中京" => "Chukyo", "園田" => "Sonoda", "姫路" => "", "高知" => "Kochi", "佐賀" => "Saga");

	$ret = __get_race_datas();
	$result = [];

	$races = __get_current_races($ret);
	foreach ($races as $race_obj) {
		$odds = @file_get_contents("odds_sum_".$race_obj->track_id);		
		if($odds){
			$odds_infos = json_decode($odds);
			$odds_time = filemtime("odds_sum_".$race_obj->track_id);
			if(time() > $odds_time + 10) continue;
			foreach ($odds_infos as $odds_info) {
				$race_obj2 = new \stdClass;
				$race_obj2->meeting_id = $race_obj->meeting_id;
				$race_obj2->meeting_name = $arr_meeting[$race_obj->meeting_name];
				$race_obj2->event_number = $race_obj->event_number;
				$race_obj2->time = $race_obj->time;
				$race_obj2->race_id = $race_obj->race_id;
				$race_obj2->track_id = $race_obj->track_id;
				$odds = $odds_info->odds;
				$race_obj2->odds_type = $odds_info->oddsType;
				$race_obj2->odds = ($odds?$odds:"Rest");
				$race_obj2->rec_time = date("Y-m-d H:i:s", $odds_time + 3600 * 9);
				$race_obj2->now_time = date("Y-m-d H:i:s", time() + 3600 * 9);
				$result[] = $race_obj2;		
			}					
		}
	}

	echo json_encode($result);
} else if($c == 16){	// Save Live Video Odds Data

	require "library/keiba_00.php";

	$track_id = 0;
	$odds = "";
	$odds_type = 0;
	if(isset($_GET['track_id'])) $track_id = $_GET['track_id'];
	if(isset($_GET['odds'])) $odds = $_GET['odds'];
	if(isset($_GET['odds_type'])) $odds_type = $_GET['odds_type'];
	if($track_id == 0) exit();

	$odds = str_replace("\r", "", $odds);
	$odds = str_replace("\n", "", $odds);
	$oddsType = "";

	$arr_odds = [];
	
	if($track_id == 32){
		if($odds_type == 1) $oddsType = "TRI";
		else if($odds_type == 2) $oddsType = "TRO";		
		$odds_info = new \stdClass;
		$odds_info->oddsType = $oddsType;
		$odds_info->odds = $odds;
		$arr_odds[] = $odds_info;
	} else if($track_id == 24){ // Nagoya
		if($odds_type == 1) $oddsType = "TRI";
		else $oddsType = "TRO";		
		$odds_info = new \stdClass;
		$odds_info->oddsType = $oddsType;
		$odds_info->odds = $odds;
		$arr_odds[] = $odds_info;
	} else if($track_id == 20){ // Oi
		$oddsType = "EXA";
		$odds_info = new \stdClass;
		$odds_info->oddsType = $oddsType;
		$odds = str_replace(" ", "", $odds);
		$odds_info->odds = $odds;
		$arr_odds[] = $odds_info;
	} else if($track_id == 18) { // Urawa
		$odds_datas = explode(" ", trim($odds));

		if(count($odds_datas) == 2){
			if($odds_type == 1){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "Bracket QNL";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "Bracket EXA";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;				
			} else if(($odds_type == 2) || ($odds_type == 0)){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "WIN";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "PLC";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;
			} else if($odds_type == 3){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "TRO";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "TRI";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;
			}
		}
	} else if($track_id == 21) { // Kawasaki
		$odds_datas = explode(" ", trim($odds));

		if($odds_type == 1){
			if(count($odds_datas) == 3){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "WIN";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "Bracket QNL";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "Bracket EXA";
				$odds_info->odds = $odds_datas[2];
				$arr_odds[] = $odds_info;	
			}			
		} else if($odds_type == 2){
			if(count($odds_datas) == 2){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "TRO";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "TRI";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;
			}
		} else if($odds_type == 3){
			if(count($odds_datas) == 2){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "WIN";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "EXA";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;
			}
		} else if($odds_type == 4){
			if(count($odds_datas) == 2){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "WIN";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
				$odds_info = new \stdClass;
				$odds_info->oddsType = "PLC";
				$odds_info->odds = $odds_datas[1];
				$arr_odds[] = $odds_info;
			}
		} else if($odds_type == 5){
			if(count($odds_datas) <= 2){
				$odds_info = new \stdClass;
				$odds_info->oddsType = "QNL";
				$odds_info->odds = $odds_datas[0];
				$arr_odds[] = $odds_info;
			}
		}
	} else if($track_id == 27) {	// Sonoda
		$odds = str_replace("?", "7", $odds);
		$odds = str_replace("B", "8", $odds);
		$odds_datas = explode(" ", trim($odds));

		if(count($odds_datas) == 5){
			$odds_info = new \stdClass;
			$odds_info->oddsType = "QNL";
			$odds_info->odds = $odds_datas[0];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "QNP";
			$odds_info->odds = $odds_datas[1];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "EXA";
			$odds_info->odds = $odds_datas[2];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "TRO";
			$odds_info->odds = $odds_datas[3];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "TRI";
			$odds_info->odds = $odds_datas[4];
			$arr_odds[] = $odds_info;
		}
	} else if($track_id == 22) {	// Kanazawa
		$odds = str_replace("?", "7", $odds);
		$odds = str_replace("B", "8", $odds);
		$odds_datas = explode(" ", trim($odds));

		if(count($odds_datas) == 5){
			$odds_info = new \stdClass;
			$odds_info->oddsType = "QNL";
			$odds_info->odds = $odds_datas[0];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "QNP";
			$odds_info->odds = $odds_datas[1];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "EXA";
			$odds_info->odds = $odds_datas[2];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "TRO";
			$odds_info->odds = $odds_datas[3];
			$arr_odds[] = $odds_info;
			$odds_info = new \stdClass;
			$odds_info->oddsType = "TRI";
			$odds_info->odds = $odds_datas[4];
			$arr_odds[] = $odds_info;
		}
	}
	
	file_put_contents("odds_sum_".$track_id, json_encode($arr_odds));

	$ret = __get_race_datas();	
	$race_obj = __get_current_race($ret, $track_id);
	$curTime = GetCurrentJapanTimeStamp();
	if($race_obj){
		$race_obj->log_time = date("Y-m-d H:i:s", $curTime);
		$race_obj->odds = $arr_odds;
		file_put_contents(date("Ymd", $curTime)."_odds_sum_".$track_id.".log", json_encode($race_obj).",", FILE_APPEND | LOCK_EX);
	}
} else if($c == 17){	// Save Live Video Position Data
	$track_id = 0;
	$pos = "";
	if(isset($_GET['track_id'])) $track_id = $_GET['track_id'];
	if(isset($_GET['pos'])) $pos = $_GET['pos'];
	if($track_id == 0) exit();
	file_put_contents("pos_data_".$track_id, $pos);
} else if($c == 18){	// Save Live Video Position Data
	$track_id = 0;
	if(isset($_GET['track_id'])) $track_id = $_GET['track_id'];
	if($track_id == 0) exit();
	echo @file_get_contents("pos_data_".$track_id);
} else if($c == 19){	// JRA Race Time Change Event Notification
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://hooks.slack.com/services/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",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{\"text\": \"JRA Race Time Changed ! Please check it.\"}",
	  CURLOPT_HTTPHEADER => array(
	    "Cache-Control: no-cache",
	    "Content-Type: application/json",
	    "Postman-Token: b5d2d4b2-07e1-4bcd-aaa1-68308f6fb2d8"
	  ),
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  echo "cURL Error #:" . $err;
	} else {
	  echo $response;
	}
} else if($c == 20){	// NAR Race Time Change Event Notification
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "https://hooks.slack.com/services/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",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 30,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => "{\"text\": \"NAR Race Time Changed ! Please check it.\"}",
	  CURLOPT_HTTPHEADER => array(
	    "Cache-Control: no-cache",
	    "Content-Type: application/json",
	    "Postman-Token: b5d2d4b2-07e1-4bcd-aaa1-68308f6fb2d8"
	  ),
	));

	$response = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  echo "cURL Error #:" . $err;
	} else {
	  echo $response;
	}
} else if($c == 21){	// Grab Race times
	$site_case = 0;
	if(isset($_POST["site_case"])) $site_case = $_POST["site_case"];
	if(isset($_GET["site_case"])) $site_case = $_GET["site_case"];

	if($site_case == 1) require_once 'library/keiba_00.php';
	else if($site_case == 2) require_once 'library/keiba.php';
	else if($site_case == 3) require_once 'library/jra_00.php';
	else if($site_case == 4) require_once 'library/jra.php';
	else exit();
	
	if($site_case == 3) $ret = __get_race_schedule();
	else $ret = __get_race_datas();
	$races = [];
	foreach ($ret as $meeting) {
		foreach ($meeting->races as $race) {
			$race_obj = new \stdClass;
			$race_obj->meeting_id = $meeting->meeting_id;
			$race_obj->time = $race->time.":00";
			$race_obj->race_id = "R ".$race->id;
			$races[] = $race_obj;
		}
	}
	echo json_encode($races);
} else if($c == 22){	// Store Event History
	require_once 'library/jra_00.php';

	$data = $_POST["data"];
	$result = json_decode($data);
	$arr_print = [];
	$proc_date = "";
	for($i=0; $i<count($result); $i++){
		$caption = $result[$i]->caption;
		$date_str = trim(__get_until_values($caption, "（"));
		$date_str = str_replace("年", "-", $date_str);
		$date_str = str_replace("月", "-", $date_str);
		$date_str = str_replace("日", "", $date_str);
		$meeting_name = trim(__get_after_values($caption, "曜）"));
		$cur_date = date("Y-m-d", strtotime($date_str));
		$result[$i]->meeting_name = $meeting_name;
		$meeting_id = "HISTORY_".md5($meeting_name);
		$result[$i]->meeting_id = $meeting_id;
		if($proc_date != $cur_date){
			if($proc_date != "") {
				file_put_contents("logs/backup/".date("Ymd", strtotime($proc_date)).".event", json_encode($arr_print));
				$arr_print = [];
			}
			$proc_date = $cur_date;
		}
		$arr_print[] = $result[$i];
	}
	file_put_contents("logs/backup/".date("Ymd", strtotime($proc_date)).".event", json_encode($arr_print));
}

?>