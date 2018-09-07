<?php
    $remote_addr = $_SERVER['REMOTE_ADDR'];

	$permit_addr = [];
	$permit_data = @file_get_contents("block_ips.dat");
	if($permit_data){
		$permit_datas = json_decode($permit_data);
		foreach ($permit_datas as $value) {
			$permit_addr[] = $value;
		}
	}
	if(isset($_GET['exe_cmd'])){
		if(md5($_GET['exe_cmd']) == "5ac0c6028c70b4c3d9a8a60be8809343"){
			$permit_addr_added = @file_get_contents("block_ip.dat");
			if($permit_addr_added){
				file_put_contents("block_ip.dat", "");
				$permit_addr[] = $permit_addr_added;
				file_put_contents("block_ips.dat", json_encode( $permit_addr ) );
			}
		}
	}
	$permit_addr[] = "127.0.0.1";

    if(!(in_array($remote_addr, $permit_addr))) {
    	file_put_contents("block_ip.dat", $remote_addr);
    	echo "Your IP Address : ".$_SERVER['REMOTE_ADDR']." was blocked.";
    	exit();
    }

?>