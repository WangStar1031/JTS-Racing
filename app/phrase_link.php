<?php
require "../library/trans_lib.php";
$data = '';

if(isset($_GET['data'])){
	$data = $_GET['data'];
	$arrBuf = explode("_", $data);
	$c = substr($arrBuf[0], 4);
	$result = getSentencesFromId( $arrBuf[1]);
	$pattern = $result[0];

	$Id = $aaa["Id"];
	$jpn = $aaa["jpn"];
	$eng = $aaa["eng"];
	$pos = $aaa["pos"];
	$wordstatus = $aaa["wordstatus"];
	$freq = $aaa["freq"];
	$log_dir = glob("../logs/backup/*.event");
	rsort($log_dir);
	foreach ($log_dir as $log_file) {
		$sentences = [];
		$data = @file_get_contents($log_file);
		if($data) {
			$data_json = json_decode($data);
			if($data_json) {
				foreach ($data_json as $event_json) {
					$event = $event_json->event;
					if(count($event) == 0) $sentences[] = "Nothing to report.";
					foreach ($event as $value) {
						$sentences[] = $value;
					}
				}
				$nContains = isContains( $sentences, $pattern);
				if( $nContains == 0)
					continue;
				$date = str_replace("../logs/backup/", "", $log_file);
				$date = str_replace(".event", "", $date);
				echo "<a target='_blank' href='http://dataminer.jts.ec/JTS/api_keiba_notice.php?c=14&d_val=" . $date ."&lang=en'>" . $date . "-" . $nContains . "</a>";
				echo "<br/>";
			}
		}
	};
}
?>