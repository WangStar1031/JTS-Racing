  $("table tr").each(function(){ if(!($(this).hasClass("payout_tr"))) $(this).append('<td><img class="hidden check_fp5" src="app/ok.png" style="width: 14px;" title="FP5"></td><td><img class="hidden check_pay" src="app/ok.png" style="width: 14px;" title="PAYOUT"></td><td><img class="hidden check_fpall" src="app/ok.png" style="width: 14px;" title="FP ALL"></td><td><img class="hidden check_final" src="app/ok.png" style="width: 14px;" title="FINAL"></td><td class="WIN"></td><td class="PLC"></td><td class="QNL"></td><td class="EXA"></td><td class="TRI"></td>');});
  $("table.data_table").each(function(){
    if($(this).children("tbody").children("tr").length > 0)
      $(this).append('<tr class="payout_tr" id="payout_'+$(this).children("tbody").children("tr:last").attr("meeting_id")+'"><td colspan=15 class="payout_result" style="max-width: 440px;">Payout Results</td></tr>');
  });

  function cancelRace(race_id){
    if(confirm("Are you sure to cancel this race?")){
      $("#tr_" + race_id).addClass("finished");
      $("#tr_" + race_id).removeClass("open_tr");
      $("#tr_" + race_id).children("td").eq(2).html("");
      $("#tr_" + race_id).children("td").eq(3).html("ABANDONED");
      $("#tr_" + race_id).children("td").eq(3).css("background-color", "white");
      $("#tr_" + race_id).children("td").eq(4).html('<img src="app/ok.png" style="width: 14px;" title="ABANDONED">');

      if($("#check_action").prop("value") == "0") {
        $("#tr_" + race_id).children("td").eq(5).html("");
      } else {
        $.post("api_keiba_notice.php?c=5", {"meeting_id": $("#tr_" + race_id).attr("meeting_id"), "event_number": $("#tr_" + race_id).attr("event_number"), "race_id": race_id}, function(data){
            ret_obj = JSON.parse(data);
            if(ret_obj.status == "OK"){
              $("#tr_" + ret_obj.race_id).children("td").eq(4).html('<img src="app/ok.png" style="width: 14px;" title="ABANDONED">');
              $("#tr_" + ret_obj.race_id).children("td").eq(5).html("");
            }
        });
      }
    }
  }
  function send_fp(){
    if($("#check_action").prop("value") == "0") return;
  	arr_fp = [];
  	for(i=0; i<$(".data_table tr").length; i++){
  		if($(".data_table tr").eq(i).hasClass("open_tr")) continue;
      if($(".data_table tr").eq(i).hasClass("payout_tr")) continue;
      if($(".data_table tr").eq(i).hasClass("finished")) continue;
      
  		check_exist = false;
  		for(j=0; j<arr_fp.length; j++){
  			if($(".data_table tr").eq(i).attr("meeting_id") == arr_fp[j].attr("meeting_id")) {
  				arr_fp[j] = $(".data_table tr").eq(i);
  				check_exist = true;
  			}
  		}
  		if(!check_exist) arr_fp[arr_fp.length] = $(".data_table tr").eq(i);
      
      //arr_fp[arr_fp.length] = $(".data_table tr").eq(i);
  	}

	for(j=0; j<arr_fp.length; j++){  	
		fp_send_tr = arr_fp[j];
    if(fp_send_tr.hasClass("finished")) continue;
	  	$.post("api_send_keiba_fp.php", {"race_id": fp_send_tr.attr("race_id"), "site_case": site_case, "first_check": (fp_send_tr.hasClass("check_fp5")?0:1)}, function(data){
        ret_data0 = JSON.parse(data);
        if(ret_data0.status == "OK"){
          $("#tr_" + ret_data0.race_id).addClass("finished");
        }
        if(ret_data0.check_fp5) $("#tr_" + ret_data0.race_id).addClass("check_fp5");
        if(ret_data0.check_pay) $("#tr_" + ret_data0.race_id).addClass("check_pay");
        if(ret_data0.check_fpall) $("#tr_" + ret_data0.race_id).addClass("check_fpall");
        if(ret_data0.check_final) $("#tr_" + ret_data0.race_id).addClass("check_final");
        if(ret_data0.check_pay) {
          $("#payout_" + ret_data0.repay.meeting_id +" td").html("Payout Results ( <b>R "+$("#tr_" + ret_data0.race_id).attr("event_number")+"</b> )<br>" + JSON.stringify(ret_data0.repay.provider_results_data));
        }
	  		ret_datas = ret_data0.datas;
	  		if(ret_datas.length > 0){
	  			ret_meeting_id = ret_datas[0].meeting_id;
	  			$("#tbl_fp_result"+ret_meeting_id+" tbody").html('<tr style="text-align:center; background-color: green; color: white;"><td>Track</td><td>Race</td><td>Position</td><td>Runner</td></tr>');
	  			for(r_i=0; r_i<ret_datas.length; r_i++){
	  				ret_meeting_id = ret_datas[r_i].meeting_id;
	  				ret_event_number = ret_datas[r_i].event_number;
	  				ret_finish_position = ret_datas[r_i].race_data.finish_position;
	  				ret_runner_number = ret_datas[r_i].runner_number;
	  				$("#tbl_fp_result"+ret_meeting_id+" tbody").append('<tr style="text-align:center;"><td>'+arr_meeting_name[ret_meeting_id]+'</td><td>R '+ret_event_number+'</td><td class="red">'+ret_finish_position+'</td><td>'+ret_runner_number+'</td></tr>');
	  			}  	  		
        }
	  		
	    });
	}
  }

  setInterval(function(){
  	send_fp();
  }, 7777);

  function send_status(race_id){
      $.post("api_keiba_notice.php?c=5", {"meeting_id": $("#tr_" + race_id).attr("meeting_id"), "event_number": $("#tr_" + race_id).attr("event_number"), "race_id": race_id, "status": "CLOSED"}, function(data){
          ret_obj = JSON.parse(data);
          if((ret_obj.status == "OK") || (ret_obj.status == "ERROR")){
            $("#tr_" + ret_obj.race_id).removeClass("open_tr");
            $("#tr_" + ret_obj.race_id).children("td").eq(2).html("");
            $("#tr_" + ret_obj.race_id).children("td").eq(3).html("CLOSED");
            $("#tr_" + ret_obj.race_id).children("td").eq(3).css("background-color", "white");
            $("#tr_" + ret_obj.race_id).children("td").eq(4).html('<img src="app/ok.png" style="width: 14px;" title="CLOSED">');
            $("#tr_" + ret_obj.race_id).children("td").eq(5).html("");
          }
      });
  }

	var now_date = new Date();
	var n = now_date.getTimezoneOffset();
	var diff_zone = 9 + n / 60;
	$(".data_table tr.open_tr").each(function(){
	  time_str_data = $(this).children("td").eq(1).html();
	  time_arr_data = time_str_data.split(":");

	  cur_time = new Date(2018, 1, 1, ((now_date.getHours() + diff_zone) % 24), now_date.getMinutes(), now_date.getSeconds());
	  reserve_time = new Date(2018, 1, 1, time_arr_data[0], time_arr_data[1], time_arr_data[2]);
	  diff = (reserve_time.getTime() - cur_time.getTime()) / 1000;
	  if(diff <= app_set_time_diff){
	    $(this).removeClass("open_tr");
        $(this).children("td").eq(2).html("");
        $(this).children("td").eq(3).html("CLOSED");
        $(this).children("td").eq(3).css("background-color", "white");
        $(this).children("td").eq(4).html('<img src="app/ok.png" style="width: 14px;" title="CLOSED">');
        $(this).children("td").eq(5).html("");
	  } else {
	    remain_val = "";
	    h_val = (diff - diff % 3600) / 3600;
	    remain_val += ((h_val < 10)?"0":"")+h_val;
	    m_val = ((diff - diff % 60) / 60) % 60;
	    remain_val += ":"+((m_val < 10)?"0":"")+m_val;
	    s_val = (diff) % 60;
	    remain_val += ":"+((s_val < 10)?"0":"")+s_val;
	    $(this).children("td").eq(2).html(remain_val);
	  }
	});

  setInterval(function(){
    var now_date = new Date();
    var n = now_date.getTimezoneOffset();
    var diff_zone = 9 + n / 60;
    for(i=0; i<$(".data_table tr.open_tr").length;i++){
      time_str_data = $(".data_table tr.open_tr").eq(i).children("td").eq(1).html();
      time_arr_data = time_str_data.split(":");

      cur_time = new Date(2018, 1, 1, ((now_date.getHours() + diff_zone) % 24), now_date.getMinutes(), now_date.getSeconds());
      reserve_time = new Date(2018, 1, 1, time_arr_data[0], time_arr_data[1], time_arr_data[2]);
      diff = (reserve_time.getTime() - cur_time.getTime()) / 1000;
      if(diff <= app_set_time_diff){
        send_status($(".data_table tr.open_tr").eq(i).attr("race_id"));
      } else {
        remain_val = "";
        h_val = (diff - diff % 3600) / 3600;
        remain_val += ((h_val < 10)?"0":"")+h_val;
        m_val = ((diff - diff % 60) / 60) % 60;
        remain_val += ":"+((m_val < 10)?"0":"")+m_val;
        s_val = (diff) % 60;
        remain_val += ":"+((s_val < 10)?"0":"")+s_val;
        $(".data_table tr.open_tr").eq(i).children("td").eq(2).html(remain_val);
      }
    }
  }, 1000);

  var staging_check_arr = [];

  setInterval(function(){
    var now_date = new Date();
    var n = now_date.getTimezoneOffset();
    var diff_zone = 9 + n / 60;
    for(i=0; i<$(".data_table tr.open_tr").length;i++){
      time_str_data = $(".data_table tr.open_tr").eq(i).children("td").eq(1).html();
      time_arr_data = time_str_data.split(":");

      cur_time = new Date(2018, 1, 1, ((now_date.getHours() + diff_zone) % 24), now_date.getMinutes(), now_date.getSeconds());
      reserve_time = new Date(2018, 1, 1, time_arr_data[0], time_arr_data[1], time_arr_data[2]);
      diff = (reserve_time.getTime() - cur_time.getTime()) / 1000;
      if(diff > app_set_time_diff){
        if(staging_check_arr.length > 200) staging_check_arr = [];
        staging_check_arr[staging_check_arr.length] = $(".data_table tr.open_tr").eq(i).attr("meeting_id") + "EXE" + $(".data_table tr.open_tr").eq(i).attr("event_number") + "EXE" + $(".data_table tr.open_tr").eq(i).attr("id");
      }
    }
  }, 60000);

  setInterval(function(){
    $.post("api_keiba_notice.php?c=21", {"site_case": site_case}, function(data){
      if(data != ""){
        ret_obj = JSON.parse(data);
        for(i=0; i<ret_obj.length; i++){
          $("tr").each(function(){
            if(($(this).attr("meeting_id") == ret_obj[i].meeting_id) && ($(this).children("td").eq(0).text() == ret_obj[i].race_id)){
              if(ret_obj[i].time) $(this).children("td").eq(1).text(ret_obj[i].time);
            }
          });
        }
      }
    });
  }, 60000);

  setInterval(function(){
    if(staging_check_arr.length > 0) {
      send_data = staging_check_arr.shift();
      $.post("api_keiba_check_staging.php", {"site_case": site_case, "meeting_id": send_data}, function(data){
        ret_obj = JSON.parse(data);
        if((typeof ret_obj.id != "undefined") && (typeof ret_obj.meeting_id != "undefined") && (typeof ret_obj.event_number != "undefined")){
          $("#"+ret_obj.id).children("td.WIN").html(ret_obj.WIN).css("background-color", "white");
          $("#"+ret_obj.id).children("td.PLC").html(ret_obj.PLC).css("background-color", "white");
          $("#"+ret_obj.id).children("td.QNL").html(ret_obj.QNL).css("background-color", "white");
          $("#"+ret_obj.id).children("td.EXA").html(ret_obj.EXA).css("background-color", "white");
          $("#"+ret_obj.id).children("td.TRI").html(ret_obj.TRI).css("background-color", "white");
          if(ret_obj.WIN_STATUS10 == 0) $("#"+ret_obj.id).children("td.WIN").css("background-color", "red"); else if(ret_obj.WIN_STATUS1 == 0) $("#"+ret_obj.id).children("td.WIN").css("background-color", "yellow");
          if(ret_obj.PLC_STATUS10 == 0) $("#"+ret_obj.id).children("td.PLC").css("background-color", "red"); else if(ret_obj.PLC_STATUS1 == 0) $("#"+ret_obj.id).children("td.PLC").css("background-color", "yellow");
          if(ret_obj.QNL_STATUS10 == 0) $("#"+ret_obj.id).children("td.QNL").css("background-color", "red"); else if(ret_obj.QNL_STATUS1 == 0) $("#"+ret_obj.id).children("td.QNL").css("background-color", "yellow");
          if(ret_obj.EXA_STATUS10 == 0) $("#"+ret_obj.id).children("td.EXA").css("background-color", "red"); else if(ret_obj.EXA_STATUS1 == 0) $("#"+ret_obj.id).children("td.EXA").css("background-color", "yellow");
          if(ret_obj.TRI_STATUS10 == 0) $("#"+ret_obj.id).children("td.TRI").css("background-color", "red"); else if(ret_obj.TRI_STATUS1 == 0) $("#"+ret_obj.id).children("td.TRI").css("background-color", "yellow");
        }
      });
    }
  }, 5000);