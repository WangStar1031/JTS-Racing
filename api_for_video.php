<?php

	if(isset($_GET['p']))
		require_once("library/jra.php");
	else
		require_once("library/keiba.php");

	__get_race_datas();
?>