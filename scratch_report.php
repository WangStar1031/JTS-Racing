<?php
	header('Content-Type: text/html; charset=utf-8');
	
	$date = date("Y-m-d", time()-date("Z")+3600*9);
	if(isset($_GET['date'])) $date = $_GET['date'];

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
				if(!isset($item->log_time) || ($item->log_time == "")){
					$arr_events[$key]->log_time = $obj->time;
					$arr_events[$key]->response = $obj->response;
					$arr_events[$key]->http_code = $obj->http_code;
				}
			}
		}
		return $arr_events;
	}

	function __get_race_time($meetings, $venue_name, $event_number)	{
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

	function __calc_time_diff($basis_time, $real_time) {
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
						$event->log_time = "";
						$event->response = "";
						$event->http_code = "";
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
		if( $type == "scratched"){
			
		}
		return $arr_events;
	}
	function get_abandoned_races($date){
		$file_name = date("Y-m-d", strtotime($date)).".json";

		$data = @file_get_contents($file_name);
		if(!($data)) $data = @file_get_contents("../jraminer/meetings/".$file_name);
		print_r($data);
	}
	// get_abandoned_races($date);
	// exit();

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

	function process_time($__time) {
		$__time = date("Y-m-d H:i:s", strtotime(substr($__time, 0, 19)) - 5).substr($__time, 19);
		return $__time;
	}
?>
  <link rel='stylesheet prefetch' href='assets/bootstrap-4.0/bootstrap.min.css'>
  <link rel="stylesheet prefetch" type="text/css" href="assets/bootstrap-datepicker-1.6.4-dist/css/bootstrap-datepicker.min.css">
<style>
	table#tbl_data, #tbl_data td{border-collapse: collapse; border: solid 1px gray;text-align: center; font-size: 14px;}
	#tbl_data tr.header{ background-color: green; color: white; text-align: center;}
	#tbl_data td{ padding: 5px; }
	tr.late_scratch { 
		background-color: #ffdddd;
		color: red;
	}
</style>
<body style="margin: 0.5rem;">
	<h1 style="font-size: 2em;">Scratched Notice</h1>
	<h4 style="font-size: 16px;">Report Date : <input type=text class="datepicker_obj" value="<?=$date?>" style="width: 110px; text-align: center; cursor: pointer;"></h4>
	<table id="tbl_data">
		<tr class="header"><td>Track</td><td>Race</td><td>Race Time</td><td>Time Difference</td><td>Horse Number</td><td>Horse Name</td><td>Type</td><td>Detected TIME</td><td>Signal SENT TIME</td><td>Betia Response TIME</td><td>HTTP Code</td><td>Response</td><td>Source</td></tr>
	<?php foreach($arr_events as $event){
		if(is_null($event->venue_name)) continue;
		if(!($event->need)) continue;
	?>
		<tr<?php if($event->warning) echo ' class="late_scratch"';?>><td><?=$event->venue_name?></td><td><?=$event->event_number?></td><td><?=$event->race_time?></td><td><?=$event->race_time_diff?></td><td><?=$event->horse_number?></td><td><?=$event->horse_name?></td><td><?=$event->type?></td><td><?=process_time($event->time)?></td><td><?php if($event->log_time) echo $event->time;?></td><td><?=$event->log_time?></td><td><?=$event->http_code?></td><td><?=$event->response?></td><td><?=$event->source?></td></tr>
	<?php }?>
	</table>
</body>
<script src="assets/jquery.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/bootstrap-datepicker-1.6.4-dist/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript">
$('.datepicker_obj').datepicker({
    format: 'yyyy-mm-dd'
}).on('changeDate', function (ev) {
    window.location.href = "scratch_report.php?date="+$(".datepicker_obj").prop("value");
});
</script>