<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include_once ( "block_ip.php" );

    if(!isset($_POST["odds"])) exit();

    $odds = json_decode($_POST["odds"]);
    $meeting_id = $_POST["meeting_id"];
    $event_number = $_POST["race_number"];
    $type = $_POST["type"];

	require_once("library/keiba_00.php");

	if($type == "TRI"){
		get_odds_tri_race_4ext($odds, $meeting_id, $event_number);
	} else if($type == "WIN"){
		get_odds_win_race_4ext($odds, $meeting_id, $event_number);
	} else if($type == "QNL"){
		get_odds_qnl_race_4ext($odds, $meeting_id, $event_number);
	} else if($type == "QNP"){
		get_odds_qnp_race_4ext($odds, $meeting_id, $event_number);
	} else if($type == "EXA"){
		get_odds_exa_race_4ext($odds, $meeting_id, $event_number);
	} else if($type == "TRO"){
		get_odds_tro_race_4ext($odds, $meeting_id, $event_number);
	}
?>