<?php
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
	ini_set('implicit_flush', 1);
	ob_implicit_flush(true);
	set_time_limit(0);

	header('Content-Type: text/html; charset=utf-8');

	include('library/common_lib.php');
	include('library/trans_lib.php');
	include('mailer/mailer.lib.php');
	$__to_email_address = "wangstar1031@hotmail.com";
	custom_mail_send($__to_email_address, "title", "<h3>Hello</h3>", "Regards.");
?>