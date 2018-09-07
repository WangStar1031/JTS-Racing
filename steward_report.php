<?php

$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
if(($cur_hour < 18) || ($cur_hour > 19)) exit();

require "library/jra_00.php";

$ret = __get_race_schedule();
if(count($ret) > 0)
	__get_extra_events();

