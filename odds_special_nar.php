<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('implicit_flush', 1);
ob_implicit_flush(true);
set_time_limit(0);

$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
if(($cur_hour < 10) || ($cur_hour > 22)) exit();

require_once "library/keiba_00.php";
$spec = new \stdClass;
$spec->log_data = ["win" => 1];
$spec->send_data = ["win" => 1, "plc" => 1, "qnl" => 1, "qnp" => 0, "exa" => 1, "tri" => 1, "tro" => 0];
__get_race_odds_overall2($spec);

?>