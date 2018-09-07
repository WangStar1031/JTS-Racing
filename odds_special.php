<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('implicit_flush', 1);
ob_implicit_flush(true);
set_time_limit(0);

header('Content-Type: text/html; charset=utf-8');
echo "Please enter odds checking duration ( enter 0 for all races, or hours ) : \r\n";

$stdin = fopen('php://stdin', 'r');
$yes   = false;
$arr_input = [];

while (!$yes)
{
	$input = trim(fgets($stdin));
	if($input != "") $arr_input[] = $input;
	if(count($arr_input) == 0)
		echo "Please enter odds checking duration ( enter 0 for all races, or hours ) : \r\n";
	else if(count($arr_input) == 1)
		echo "Please enter meeting id ( enter 0 for all meetings, or meeting id ) : \r\n";
	else if(count($arr_input) == 2)
		echo "Please enter event number ( enter 0 for all races of above meeting, or event number ) : \r\n";
	else if(count($arr_input) == 3)
		echo "Please enter odds index for send ( WIN, PLC, QNL, QNP, EXA, TRI, TRO ): \r\n";
	else if(count($arr_input) == 4)
		echo "If you try to start odds app, then type JRA or NAR\r\n";
	else if(count($arr_input) > 5) {
		exit();
	}
	if ($input == 'JRA')
	{
		require_once "library/jra_00.php";

		break;
	}
	if ($input == 'NAR')
	{
		require_once "library/keiba_00.php";
		
		break;
	}
}

if(count($arr_input) < 3) exit();

echo "CHECKING SPECIAL ODDS\r\n";

$spec = new \stdClass;

if((count($arr_input) > 0) && ($arr_input[0] > 0)) $spec->duration = $arr_input[0];
if((count($arr_input) > 1) && ($arr_input[1] > 0)) 
{
	$spec->meeting_id = $arr_input[1];
	if((count($arr_input) > 2) && ($arr_input[2] > 0)) $spec->event_number = $arr_input[2];
}
$spec->log_data = ["win" => 1];
if(count($arr_input) > 3){
	$send_datas = ["win" => 0, "plc" => 0, "qnl" => 0, "qnp" => 0, "exa" => 0, "tri" => 0, "tro" => 0];
	$pos_i = 0;
	foreach ($send_datas as $key => $value) {
		if((strlen($arr_input[3]) > $pos_i) && (substr($arr_input[3], $pos_i, 1) == 1)) $send_datas[$key] = 1;
		$pos_i++;
	}

	$spec->send_data = $send_datas;
}

__get_race_odds_overall2($spec);

?>