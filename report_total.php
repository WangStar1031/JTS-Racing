<?php	
	$today_events = glob("*.event");
	foreach ($today_events as $event) {
		$contents = file_get_contents($event);
		file_put_contents("logs/backup/" . $event, $contents);
	}
	$events = glob("logs/backup/*.event");
	// $events = array_merge($events, $today_events);
	// print_r($events);
	$cur_year = date("Y");
	$cur_month = date("n");
	if(isset($_POST["year"])) $cur_year = $_POST["year"];
	if(isset($_POST["month"])) $cur_month = $_POST["month"];
?>
<style type="text/css">
	a{text-decoration: none; color: green;}
	a:hover{color: red;}
	a{height: 24px; line-height: 24px;}
</style>
<h2>JRA Stewards Reports</h2>
<form method=post id="frmList" name="frmList">
<select name="year" id="year" onchange="javascript: frmList.submit();">
	<?php for($i=2017; $i<=date("Y"); $i++){?>
	<option value="<?=$i?>"<?php if($cur_year == $i) echo ' selected';?>><?=$i?></option>
	<?php }?>
</select>
/
<select name="month" id="month" onchange="javascript: frmList.submit();">
	<?php for($i=1; $i<=12; $i++){?>
	<option value="<?=$i?>"<?php if($cur_month == $i) echo ' selected';?>><?=$i?></option>
	<?php }?>
</select>
</form>
<?php
	$link_href = "api_keiba_notice.php?c=14&d_val=";
	foreach ($events as $event_data) {
		$event_data = substr(str_replace("logs/backup/", "", $event_data), 0, 8);
		// $event_data = substr($event_data, 12, 8);
		$event_date = substr($event_data,0,4).'-'.substr($event_data,4,2).'-'.substr($event_data,6,2);
		//@file_get_contents($link_href.$event_data.'&lang=en');
		if($cur_year != date("Y", strtotime($event_date))) continue;
		if($cur_month != date("n", strtotime($event_date))) continue;
		echo '<a href="'.$link_href.$event_data.'&lang=en" target="_blank">Report ('.date("F jS, Y", strtotime($event_date)).')</a><br>';
	}
?>