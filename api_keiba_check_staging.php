<?php

function __get_staging_odds_time($meeting_id, $event_number, $case = "japan_jra", $tr_id = "")
{
	$odds_info = @file_get_contents("https://staging.dw.xtradeiom.com/api/markets?event_number=$event_number&meeting_id=$meeting_id");
	$jra_data = json_decode($odds_info);

	$time_info = new \stdClass;
	$time_info->meeting_id = $meeting_id;
	$time_info->event_number = $event_number;
	$time_info->id = $tr_id;

	$arr_flds = ["WIN", "PLC", "QNL", "EXA", "TRI"];
	foreach ($arr_flds as $value) {
		$fld1 = $value."_STATUS10";
		$fld2 = $value."_STATUS1";

		$time_info->$value = "";
		$time_info->$fld1 = 0;
		$time_info->$fld2 = 0;

		if(!isset($jra_data)) continue;
		if(!isset($jra_data->data)) continue;
		if(!isset($jra_data->data->$case)) continue;
		if(!isset($jra_data->data->$case->$value)) continue;
		if(!isset($jra_data->data->$case->$value->market)) continue;
		if(!isset($jra_data->data->$case->$value->market->timestamp)) continue;

		$time_info->$value = date("H:i:s", $jra_data->data->$case->$value->market->timestamp - date("Z") + 3600 * 9);	
		$time_info->$fld1 = (time() - $jra_data->data->$case->$value->market->timestamp > 60 * 10)?0:1;
		$time_info->$fld2 = (time() - $jra_data->data->$case->$value->market->timestamp > 60)?0:1;
	}

	return $time_info;
}

$case = "";
$meeting_id = "";
$event_number = "";
if(isset($_POST["site_case"])) $site_case = $_POST["site_case"];
if(($site_case == 1) || ($site_case == 2)) $case = "japan_nar";
else  $case = "japan_jra";
if(isset($_POST["meeting_id"])) $meeting_id = $_POST["meeting_id"];
if(($case == "") || ($meeting_id == "")){
	echo "{}";
	exit();
}
$arr_data = explode("EXE", $meeting_id);
$meeting_id = $arr_data[0];
$tr_id = "";
if(count($arr_data) > 1) $event_number = $arr_data[1];
if(count($arr_data) > 2) $tr_id = $arr_data[2];

echo json_encode(__get_staging_odds_time($meeting_id, $event_number, $case, $tr_id));

?>