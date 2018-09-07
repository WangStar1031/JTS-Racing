<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set('implicit_flush', 1);
ob_implicit_flush(true);
set_time_limit(0);

while(true){
	sleep(2);
	echo exec('sudo ~/tunnel/proxy');
	if (ob_get_level() > 0)
	{
		ob_flush();
	}
	flush();
}

?>