<?php
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
	ini_set('implicit_flush', 1);
	ob_implicit_flush(true);
	set_time_limit(0);

	require_once("library/common_lib.php");

	$arr_ips = [];
	$admin_ips = [];
	$arr_commands = [];
	$admin_commands = [];

	$data = @file_get_contents("/var/log/apache2/access.log");
	$lines = explode("\n", $data);
	foreach ($lines as $line) {
		$ip = __get_until_values($line, ' - - [');
		$command = __get_values($line, 'POST ', 'HTTP');
		if(!$command) $command = __get_values($line, 'GET ', 'HTTP');
		if(!in_array($ip, $arr_ips)) $arr_ips[] = $ip;
		if(strpos($line, 'POST /JTS/') !== false) {
			if(!in_array($ip, $admin_ips)) $admin_ips[] = $ip;
		}
		if($command) {
			if(in_array($ip, $admin_ips)) {
				if(!in_array($command, $admin_commands)) $admin_commands[] = $command;
			} else {				
				if(!in_array($command, $arr_commands)) $arr_commands[] = $command;
			}
		}
	}

	echo "Total User IP Count: ".count($arr_ips)."<br>";
	echo "Admin User IP Count: ".count($admin_ips)."<br>";
	echo "User Command Count: ".count($arr_commands)."<br>";
	echo "Admin Command Count: ".count($admin_commands)."<br>";

print_r($arr_ips);
echo "<br>";
print_r($admin_ips);
echo "<br>";
print_r($arr_commands);
echo "<br>";
print_r($admin_commands);

	exit();

?>