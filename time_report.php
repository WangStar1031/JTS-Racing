<?php
	header('Content-Type: text/html; charset=utf-8');

	$date = date("Y-m-d", time()-date("Z")+3600*9);
	if(isset($_GET['date'])) $date = $_GET['date'];

	function __check_exists($arr, $obj) {
		foreach ($arr as $item) {
			if(($item->venue_name == $obj->venue_name) && ($item->event_number == $obj->event_number)){
				if ($item->start_time == $obj->start_time)
					return 0;
			}
		}
		foreach ($arr as $item) {
			if(($item->venue_name == $obj->venue_name) && ($item->event_number == $obj->event_number)){
				return 1;
			}
		}
		return 2;
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

	function get_logs($date, $type="time", $source="nar"){
		$file_name = date("Ymd", strtotime($date))."_".$source."_".$type.".log";

		$data = @file_get_contents($file_name);
		if(!($data)) $data = @file_get_contents("logs/backup/".$file_name);

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
					if(!isset($event_obj->venue_name)) continue;
					$event = new \stdClass;
					$event->source = "";
					if($source == "nar") $event->source = "Keiba-go";
					else if($source == "jra") $event->source = "Jra";
					else if($source == "jra2") $event->source = "Jra2";

					$event->venue_name = $event_obj->venue_name;
					$event->event_number = $event_value->number;
					$event->start_time = $event_value->start_time;
					$event->time = $proc_time;
					$event->isFirst = false;
					$check_event = __check_exists($arr_events, $event);
					if(($source == "nar") && ($check_event == 2)) $event->isFirst = true;
					if($check_event) {
						$arr_events[] = $event;					
						//echo $source."===".$check_event."===".$event->start_time."<br>";
					} 
				}
			} else if(isset($event_obj->status)) {
				if(!isset($event_obj->data)) continue;
				$meeting_info = $event_obj->data->meetings;
				foreach ($meeting_info as $meeting_obj) {
					if(!isset($meeting_obj->name)) continue;
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

	function process_time($__time) {
		$__time = date("Y-m-d H:i:s", strtotime(substr($__time, 0, 19)) - 5).substr($__time, 19);
		return $__time;
	}

	$arr_events = get_logs($date, "time");
	$arr_events = array_merge($arr_events, get_logs($date, "time", "jra"));
	$arr_events = array_merge($arr_events, get_logs($date, "time", "jra2"));
?>
  <link rel='stylesheet prefetch' href='assets/bootstrap-4.0/bootstrap.min.css'>
  <link rel="stylesheet prefetch" type="text/css" href="assets/bootstrap-datepicker-1.6.4-dist/css/bootstrap-datepicker.min.css">
<style>
	table#tbl_data, #tbl_data td{border-collapse: collapse; border: solid 1px gray;text-align: center; font-size: 14px;}
	#tbl_data tr.header{ background-color: green; color: white; text-align: center;}
	#tbl_data td{ padding: 5px; }
</style>
<body style="margin: 0.5rem;">
	<h1 style="font-size: 2em;">Race Time Changed Notice</h1>
	<h4 style="font-size: 16px;">Report Date : <input type=text class="datepicker_obj" value="<?=$date?>" style="width: 110px; text-align: center; cursor: pointer;"></h4>
	<table id="tbl_data">
		<tr class="header"><td>Track</td><td>Race</td><td>Race TIME</td><td>Detected TIME</td><td>Signal SENT TIME</td><td>Betia Response TIME</td><td>HTTP Code</td><td>Response</td><td>Source</td></tr>
	<?php foreach($arr_events as $event){
		if(is_null($event->venue_name)) continue;
		if($event->isFirst) continue;
	?>
		<tr><td><?=$event->venue_name?></td><td><?=$event->event_number?></td><td><?=date("H:i", $event->start_time - date("Z") + 3600*9)?></td><td><?=process_time($event->time)?></td><td><?=$event->time?></td><td><?=$event->log_time?></td><td><?=$event->http_code?></td><td><?=$event->response?></td><td><?=$event->source?></td></tr>
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
    window.location.href = "time_report.php?date="+$(".datepicker_obj").prop("value");
});
</script>