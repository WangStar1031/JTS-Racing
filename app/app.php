<?php
	/*
	$key = "";
	if(isset($_GET['key'])) $key = $_GET["key"];
	$key_gen = "";
	if(file_exists("key_gen")) $key_gen = @file_get_contents("key_gen");
	file_put_contents("key_gen", md5(date("Ymd")."1976"));
	if($key_gen == "") exit();
	if($key != $key_gen) exit();
	*/
?>
<script type="text/javascript" src="jquery-2.1.4.min.js"></script>
<div style="display: none;">
API SEND
<select id="api_send">
<option value="1" selected="">Enable</option>
<option value="0">Disable</option>
</select>
&nbsp;
<input type="button" class="action" id="btnApply" value="Apply Setting">
&nbsp;
Time Diff: <input type=text id="t_d" name="t_d" value="10" style="width:50px;">
&nbsp;
</div>
<input type="button" class="action" id="btnNotice" value="JRA">
<!--<input type="button" class="action" id="btnNoticeKeiba" value="JRA - NetKeiba">-->
<input type="button" class="action" id="btnNarNotice00" value="NAR">
<!--<input type="button" class="action" id="btnNarNotice" value="NAR - Rakuten">-->
<!--<input type="button" class="action" id="btnRegister" value="Grab Result CName">-->
<!--<input type="button" class="action" id="btnGrabOdds" value="Grab Odds CName">-->
<input type="button" class="action" id="btnClearLog" value="Clear Log">
<!--<input type="button" class="action" id="btnCheckTime" value="JRA Time Change">-->
<!--<input type="button" class="action" id="btnCheckTime2" value="NAR Time Change">-->
<input type="button" class="action" id="btnClearCache" value="Clear Cache">
<!--<input type="button" class="action" id="btnGenProxies" value="Japan Proxies">-->
<input type="button" class="action" id="btnOpenHome" value="Open Home">
<div style="height: 10px; line-height: 10px;"></div>
<div id="ifr_result"></div>
<script type="text/javascript">
    var pro_now_date = new Date();
    var pro_n = pro_now_date.getTimezoneOffset();
    var pro_diff_zone = 9 + pro_n / 60;
    var video_proc = true;

    function __process_time_proc() {
    	pro_now_date = new Date();
    	pro_hour = (pro_now_date.getHours() + pro_diff_zone) % 24;
    	pro_min = pro_now_date.getMinutes();
    	//console.log(pro_hour + ":" + pro_min);

    	if(pro_hour >= 22) {
    		if((pro_min >= 10)&&($("#ifr_result iframe").length)) {
    			$("#btnClearLog").click();
    			$("#btnClearCache").click();
    		}    			
    		video_proc = true;
    	} else if(pro_hour >= 6) {
    		if($("#ifr_result iframe").length == 0) {
    			$("#btnNarNotice00").click();
    			$("#btnNotice").click();
    		}
    		if(video_proc) {
    			video_proc = false;
    			$.post("../api_for_video.php", { }, function(data){		});
    			$.post("../api_for_video.php?p=1", { }, function(data){		});
    		}

			$.post("../api_keiba_notice.php?c=4", { }, function(data){		});
			$.post("../api_keiba_notice.php?c=1", { }, function(data){		});
			$.post("../api_keiba_notice.php?c=12", { }, function(data){		});
    	}
    }

	notice_address = "../keiba_notice.php?d=";

	function check_nar_jra_odds_log() {
    	pro_now_date = new Date();
    	pro_hour = (pro_now_date.getHours() + pro_diff_zone) % 24;
    	pro_min = pro_now_date.getMinutes();
    	if(pro_hour >= 23) return false;
    	if(pro_hour <= 4) return false;

		__process_time_proc();
	}
	
	setInterval(function(){
		check_nar_jra_odds_log();
	}, 60000);
	

	$("#btnOpenHome").click(function(){
		window.open("../");
	});
	$("#btnCheckTime").click(function(){
		window.open("../api_keiba_notice.php?c=1");
	});
	$("#btnCheckTime2").click(function(){
		window.open("../api_keiba_notice.php?c=12");
	});
	$("#btnGenProxies").click(function(){
		if(confirm("Are you really regenerate Japan Proxies?")){
			$.post("../api_keiba_notice.php?c=6", { }, function(data){
				alert("Sample Proxy : " + data);
			});
		}
	});
	$("#btnClearCache").click(function(){
		//if(confirm("Are you really delete all caches?")){
			$.post("../api_keiba_notice.php?c=2", { }, function(){
			});
		//}
	});
	$("#btnApply").click(function(){
		$.post("../api_keiba_notice.php?c=3", {"api_send": $("#api_send").prop("value")}, function(){
		});
	});
	$("#btnApply").click();
	$("#btnNoticeKeiba").click(function(){
		$("#ifr_result").append('<iframe src="'+notice_address+$("#t_d").prop("value")+'&site_case=4" style="width:100%; height: 650px; border:0; border-bottom: solid 1px gray;"></iframe>');
		$("#btnClearLog").unbind("click").click(function(){
			$("iframe").remove();
		});
	});
	$("#btnNotice").click(function(){
		$("#ifr_result").append('<iframe src="'+notice_address+$("#t_d").prop("value")+'&site_case=3" style="width:100%; height: 650px; border:0; border-bottom: solid 1px gray;"></iframe>');
		$("#btnClearLog").unbind("click").click(function(){
			$("iframe").remove();
		});
	});
	$("#btnNarNotice").click(function(){
		$("#ifr_result").append('<iframe src="'+notice_address+$("#t_d").prop("value")+'&site_case=2" style="width:100%; height: 650px; border:0; border-bottom: solid 1px gray;"></iframe>');
		$("#btnClearLog").unbind("click").click(function(){
			$("iframe").remove();
		});
	});
	$("#btnNarNotice00").click(function(){
		$("#ifr_result").append('<iframe src="'+notice_address+$("#t_d").prop("value")+'&site_case=1" style="width:100%; height: 650px; border:0; border-bottom: solid 1px gray;"></iframe>');
		$("#btnClearLog").unbind("click").click(function(){
			$("iframe").remove();
		});
	});
	$("#btnRegister").click(function(){
		$.post("../api_keiba_notice.php?c=4", { }, function(data){		});
	});
	$("#btnGrabOdds").click(function(){
		$.post("../api_keiba_notice.php?c=7", { }, function(data){		});
	});


</script>