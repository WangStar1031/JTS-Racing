<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('max_execution_time', 3600);
set_time_limit(0);

require_once __DIR__.'/vendor/autoload.php'; // load composer
require_once '../library/trans_lib.php';

$param_session = "";

$case = "";
if(isset($_GET['case'])) $case = $_GET['case'];
if(isset($_POST['case'])) $case = $_POST['case'];
$type = "words";
if(isset($_GET['type'])) $type = $_GET['type'];
if(isset($_POST['type'])) $type = $_POST['type'];
$type = strtolower($type);

$param_session .= $type;
if($case) $param_session .= " ".$case;

$file = $param_session.'.xls';

$data = __get_data_for_export($case, $type);

use PhpOffice\PhpSpreadsheet\Writer\Xls;

$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

$sheet->setCellValue('A1', 'Id');
$sheet->setCellValue('B1', 'Japanese');
$sheet->setCellValue('C1', 'English');
if($type == "words") {
	$sheet->setCellValue('D1', 'Status');
} else {
	$sheet->setCellValue('D1', 'Position');
	$sheet->setCellValue('E1', 'Status');	
}

$pos_i = 2;
for($i=0; $i<count($data); $i++) {
	if(isset($data[$i]["Id"])) {
		$row = $data[$i];
		$sheet->setCellValue('A'.$pos_i, $row['Id']);
		$sheet->setCellValue('B'.$pos_i, $row['jpn']);
		$sheet->setCellValue('C'.$pos_i, $row['eng']);
		if($type == "words") {
			$sheet->setCellValue('D'.$pos_i, $row['word_status']);
		} else {
			$sheet->setCellValue('D'.$pos_i, $row['pos']);
			$sheet->setCellValue('E'.$pos_i, $row['word_status']);	
		}
		$pos_i++;
	}
}

$writer = new Xls($spreadsheet);
$writer->save($file);

header('Content-Disposition: attachment; filename='.$file);
readfile($file);
unlink($file);