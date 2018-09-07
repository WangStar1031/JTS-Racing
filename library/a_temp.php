<?php

	require_once './html2fpdf/html2fpdf.php';
	require_once 'simple_html_dom.php';
	// $htmlFile = "http://dataminer.jts.ec/JTS/api_keiba_notice.php?c=14&d_val=20180714&lang=en";
	// $buffer = file_get_contents($htmlFile);
	// $html = str_get_html($buffer);
	// print_r($html->find(".pdfHiden"));
	// print_r($buffer);
	$html = "<h1 style='color:red;'>HHHH</h1>";
	$html .= "<table><tr><td>a</td><td>b</td></tr></table>";
	$pdf = new HTML2FPDF('P', 'mm', 'Legal');
	$pdf->AddPage();
	$adHtml = AdjustHTML($html);
	$pdf->WriteHTML($adHtml);
	$pdf->AddPage();
	$pdf->WriteHTML("<h1 style='color:red;'>HHHH</h1>");
	$pdf->WriteHTML("<table><tr><td>a</td><td>b</td></tr></table>");
	$pdf->Output('my.pdf', 'F');
	echo "done";
?>