<?php
	$date = date("Y-m-d", strtotime(date("Y-m-d H:i:s"))-date("Z")+3600*9);
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" media="all" type="text/css" href="app/app.css">
<script src="app/jquery-2.1.4.min.js"></script>
<script src="app/jquery.cookie.js"></script>
<script>
var flag_refresh = true;

$(function () {
	$("[data-action=nar]").click(function () { 
		$(".button").removeClass("active");
		$(this).addClass("active");
		$("#jra,#jra-info").hide(); $("#nar,#nar-info").show(); 
		$.cookie("L", "nar");
	});
	$("[data-action=jra]").click(function () { 
		$(".button").removeClass("active");
		$(this).addClass("active");
		$("#nar,#nar-info").hide(); $("#jra,#jra-info").show(); 
		$.cookie("L", "jra");
	});
	if ($.cookie("L")) {
		$("[data-action=" + $.cookie("L") + "]").click();
	} else {
		$("[data-action=nar]").click();
	}

	$("#selectedDate").change(function(){
		flag_refresh = true;
		grab_schedule_data();
		flag_refresh = ($(this).val() == "<?=$date?>");
	});

	$(".link_event").click(function(){
		var now_time = new Date();
		if(flag_refresh) window.open("api_keiba_notice.php?c=13&t_val=" + now_time.toJSON());
		else window.open("api_keiba_notice.php?c=14&d_val=" + $("#selectedDate").val());
	})

	function grab_schedule_data(){
		if(flag_refresh == false) return false;
		$.post("keiba_schedule.php", {"date": $("#selectedDate").val()}, function(data){
			$("#nar").html(data);
		});

		$.post("keiba_schedule.php?site_case=3", {"date": $("#selectedDate").val()}, function(data){
			$("#jra").html(data);
		});		
	}

	setInterval(function () { grab_schedule_data(); }, 60000);
	grab_schedule_data();
});
</script>
</head>
<body>

<div align="center" style="height: 75px; position: fixed; top: 0; left: 0; width: 100%; z-index: 999; background-color: white;">
	<div style="position: absolute; top: 0; left: 0; padding: 10px; line-height: 18px; text-align:left; font-size: 12px;">
		<a href="scratch_report.php" target="_blank" style="cursor:pointer; color: green; text-decoration: underline;">Scratched Notice</a>
		<br>
		<a href="time_report.php" target="_blank" style="cursor:pointer; color: green; text-decoration: underline;">Race Time Changed Notice</a>
		<br>
		<a href="report_total.php" target="_blank" style="cursor:pointer; color: green; text-decoration: underline;">Steward Report</a>
	<!--
		<img src="app/img/pegasus.png" width="77" height="48" align="absmiddle">
		<img src="app/img/japan.png" align="absmiddle" height="16" style="border: 1px solid #ccc;"> 
		<strong style="color: #777;">
			<?= $date ?>
		</strong>
	-->
	</div>
	<div style="padding-top: 10px; min-width: 900px;">
		<a href="javascript:void(0);" class="button" data-action="nar">
			<img src="app/img/nar-off.png" height="36" align="absmiddle" class="off">
			<img src="app/img/nar-on.png" height="36" align="absmiddle" class="on">
			<img src="app/img/nar-active.png" height="36" align="absmiddle" class="active">
		</a>
		<a href="javascript:void(0);" class="button" data-action="jra">
			<img src="app/img/jra-off.png" height="36" align="absmiddle" class="off">
			<img src="app/img/jra-on.png" height="36" align="absmiddle" class="on">
			<img src="app/img/jra-active.png" height="36" align="absmiddle" class="active">
		</a>
	</div>
	<div style="position: absolute; top: 25px; right: 10px;">
		<a class="link_event" style="cursor:pointer; color: green; text-decoration: underline;">View Event</a>
		&nbsp;
		<select id="selectedDate">
			<?php foreach (range(-7, 7) as $d) : ?>
				<?php $dd = date("Y-m-d", strtotime($date) + 86400 * $d); ?>
				<?php $dd2 = date("Ymd", strtotime($date) + 86400 * $d); ?>
				<option value="<?= $dd2 ?>"<?php if($dd == $date) echo " selected";?>><?= ($dd == $date) ? "Live" : $dd . " " . date("D", strtotime($dd)) ?><?= in_array(date("w", strtotime($dd)), array(0,6)) ? " *" : "" ?></option>
			<?php endforeach ?>
		</select>
	</div>
</div>

<div id="nar" style="<?= $_COOKIE['L'] != "nar" ? "display: none;" : "" ?> border-top: 1px solid #ccc; margin-top: 75px;">
</div>
<div id="jra" style="<?= $_COOKIE['L'] == "nar" ? "display: none;" : "" ?> border-top: 1px solid #ccc; margin-top: 75px;">
</div>

</body>
</html>
