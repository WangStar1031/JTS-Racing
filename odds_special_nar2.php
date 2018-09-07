<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('implicit_flush', 1);
ob_implicit_flush(true);
set_time_limit(0);

$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
if(($cur_hour < 10) || ($cur_hour > 22)) exit();

$p = "";
if (defined('STDIN')) {
  $p = $argv[1];
} else { 
  if(isset($_GET["p"])) $p=$_GET["p"];
}

$duration = (strlen($p) > 0?substr($p, 0, 1):10);

require_once "library/keiba_00.php";
$spec = new \stdClass;
$spec->log_data = ["win" => 1];
$spec->send_data = ["win" => 1, "plc" => 1, "qnl" => 1, "qnp" => 0, "exa" => 1, "tri" => 1, "tro" => 0];
$spec->duration = $duration;

if (defined('STDIN')) {
	if(count($argv) > 2) $spec->meeting_id = $argv[2];
	if(count($argv) > 3) $spec->event_number = $argv[3];
}

__get_race_odds_overall2($spec);

?>