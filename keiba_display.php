<?php

	require_once "library/common_lib.php";

	$dir = "";
	if(isset($_GET['dir'])) $dir = $_GET['dir'];
	if($dir){
		$arr_data = glob("$dir/*.json");
		foreach ($arr_data as $value) {
			$disp_value = __get_last_values($value, "/");
			if($disp_value != "log.json"){
				$time_value = date("Y-m-d H:i:s", intval( substr($disp_value, 0, strlen($disp_value) - 4)) + 3600 * 9 - date("Z") );
				echo sprintf("<a href='$value'>$time_value</a><br>");
			}
		}
	}

?>