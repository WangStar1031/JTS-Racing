<?php

include('mailer/mailer.lib.php');

if( isset($_POST['sendMail'])){
	$title = $_POST['sendMail'];
	$type = $_POST['type'];
	$_contents = @file_get_contents("library/customerInfo.txt");
	$customers = json_decode($_contents);
	for( $i = 0; $i < count($customers); $i++){
		$curInfo = $customers[$i];
		$firstName = $curInfo->firstName;
		$email = $curInfo->email;
		// $email = 'wangstar1031@hotmail.com';
		$content = 'Hi, 
		Dear ' . $firstName . '!<br>
		This is the JRA Steward Reports.<br>
		Please check the attached file.<br>
		';
		$alt_content = 'Regards,
		Chris.
		';
		custom_mail_send_file($email, $title, $content, $alt_content, $title . '_'.$type.'.pdf');
	}
}
?>