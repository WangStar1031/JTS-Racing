#!/usr/bin/env php
<?php

chdir(dirname(__FILE__));

$cur_hour = date("h", time()-date("Z")+3600*9);
if($cur_hour < 4) exit();
$now = date("Ymd", time()-date("Z")+3600*9);

$filename = "/var/www/html/JTS/".$now."_keiba_00.json";

$str = "#!/bin/sh\n\n";
$str .= "cd /var/www/html/JTS\n\n";

$data = @file_get_contents($filename);
if($data) {
	$arr_races = [];
	$tracks = json_decode($data);
	foreach ($tracks as $track) {
		if(!($track->venue_info)) continue;
		$meeting_id = $track->meeting_id;
		$races = $track->races;
		foreach ($races as $race) {
			$event_number = $race->race_id;
			$arr_races[] = $meeting_id." ".$event_number;
		}
	}
	
	foreach($arr_races as $race){
		$str .= "php odds_special_nar2.php 1 ".$race." > /dev/null 2>&1 &\n\n";
	}
}

@file_put_contents("start-nar-make-batch.sh", $str);