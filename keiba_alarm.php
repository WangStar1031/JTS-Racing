<?php

	$date = date("Y-m-d");

	function __api_send__($__api, $__method, $obj){
	  $curl = curl_init();

	  curl_setopt_array($curl, array(
	    CURLOPT_URL => $__api,
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_ENCODING => "",
	    CURLOPT_MAXREDIRS => 10,
	    CURLOPT_TIMEOUT => 30,
	    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	    CURLOPT_CUSTOMREQUEST => $__method,
	    CURLOPT_POSTFIELDS => json_encode($obj),
	    CURLOPT_HTTPHEADER => array(
	      "cache-control: no-cache",
	      "content-type: application/json",
	    ),
	  ));

	  $response = curl_exec($curl);
	  $err = curl_error($curl);

	  $time = date("Y-m-d H:i:s", time()-date("Z")+3600*9);
	  $logFile = date("Ymd", time()-date("Z")+3600*9)."_betia_alarm.log";

	  $message = json_encode($obj);
	  file_put_contents($logFile, $time.' '.$message.PHP_EOL, FILE_APPEND | LOCK_EX);

	  file_put_contents($logFile, $time.' '.$response.PHP_EOL, FILE_APPEND | LOCK_EX);
	  
	  curl_close($curl);
	}

	function __correct_race_status($meeting_id, $event_number, $status = "OPEN") {	
	//{"meeting_id":200987,"event_number":5,"status":"OPEN","force":true}	
	  $final = new \stdClass;
	  $final->meeting_id = $meeting_id;
	  $final->event_number = $event_number;
	  $final->status = $status;
	  $final->force = true;
	  __api_send__("https://staging.dw.xtradeiom.com/api/events/xxx/status", "PUT", $final);
	}

    function __send_slack_function($url, $message = "This is Keiba Alarm") {
        $req = new \stdClass;
        $req->text = $message;

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_SSL_VERIFYPEER => false,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => json_encode($req),
          CURLOPT_HTTPHEADER => array(
            "Cache-Control: no-cache",
            "Content-Type: application/json"
          ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        return $response;
    }

	function __get_meeting_info($__date) {
		$proc_url = "https://staging.dw.xtradeiom.com/api/meetings?filters[meeting_date]=".$__date;
		$data = @file_get_contents($proc_url);
		$json_data = json_decode($data);

		$arr_meetings = [];
		if($json_data) {
			if(isset($json_data->data)){
				if(isset($json_data->data->meetings)) {
					$meetings = $json_data->data->meetings;

					foreach ($meetings as $key => $meeting) {
						if(($meeting->itsp_code == "JRA") || ($meeting->itsp_code == "NAR")) {
							$meeting_obj = new \stdClass;
							$meeting_obj->meeting_id = $meeting->meeting_id;
							$meeting_obj->itsp_code = "japan_".strtolower( $meeting->itsp_code );
							$meeting_obj->name = $meeting->name;
							$meeting_obj->meeting_date = $meeting->meeting_date;
							$meeting_obj->status = $meeting->status;
							$events = [];
							if(isset($meeting->events)){
								foreach ($meeting->events as $key => $event) {
									$event_obj = new \stdClass;
									$event_obj->meeting = $meeting_obj->name;
									$event_obj->event_id = $event->event_id;
									$event_obj->event_number = $event->number;
									$event_obj->start_time = $event->start_time;
									$event_obj->status = $event->status;
									$events[] = $event_obj;
								}
							}
							$meeting_obj->events = $events;

							$arr_meetings[] = $meeting_obj;
						}
					}
				}
			}
		}
		return $arr_meetings;
	}

	function __check_strange_for_meetings($meetings) {
		$cur_time = time();

		$arr_notice = [];
		foreach ($meetings as $meeting) {
			foreach ($meeting->events as $event) {
				if($event->status == "ABANDONED") continue;
				if($cur_time + 70 < $event->start_time) {
					if($event->status != "OPEN") {
						$event->notice_type = "Closed before race time";
						$arr_notice[] = $event;
						__correct_race_status($meeting->meeting_id, $event->event_number, "OPEN");
					}
				} else if($cur_time + 50 > $event->start_time && $cur_time < $event->start_time + 70) {
					if($event->status != "CLOSED") {
						$event->notice_type = "Not Closed normally";
						$arr_notice[] = $event;
						__correct_race_status($meeting->meeting_id, $event->event_number, "CLOSED");
					}
				} else if($cur_time > $event->start_time + 30 * 60) {
					if($event->status != "FINAL") {
						$event->notice_type = "Not Finished normally";
						$arr_notice[] = $event;
					}
				}
				if(($event->status != "OPEN") && ($event->status != "CLOSED") && ($event->status != "FINAL") && ($event->status != "ABANDONED")) {
					$event->notice_type = "Other Status (".$event->status.")";
					$arr_notice[] = $event;
				}
				
				if($event->status == "OPEN") {
					if($cur_time > $event->start_time) {
						$event->notice_type = "Not Closed and Re-Opened";
						$arr_notice[] = $event;
						__correct_race_status($meeting->meeting_id, $event->event_number, "CLOSED");
					} else if(($cur_time > $event->start_time - 3600 * 1) && ($cur_time < $event->start_time)) {
						$meeting_id = $meeting->meeting_id;
						$event_number = $event->event_number;
						$itsp_code = $meeting->itsp_code;

						$time_info = __get_staging_odds_time($meeting_id, $event_number, $itsp_code);
						if($time_info->error) {
							$time_status = "";
							$arr_flds = ["WIN", "PLC", "QNL", "EXA", "TRI"];
							foreach ($arr_flds as $key) {
								if($time_status) $time_status .= ", ";
								$time_status .= $key." : ".$time_info->$key;
							}
							$event->notice_type = "Odds Delayed -- ".$time_status;

							__send_slack_alarm($event);
						}
					}
				}
			}
		}

		return $arr_notice;
	}

	function __get_staging_odds_time($meeting_id, $event_number, $case = "japan_jra")
	{
		$odds_info = @file_get_contents("https://staging.dw.xtradeiom.com/api/markets?event_number=$event_number&meeting_id=$meeting_id");
		$jra_data = json_decode($odds_info);

		$time_info = new \stdClass;

		$arr_flds = ["WIN", "PLC", "QNL", "EXA", "TRI"];
		$time_info->error = 0;

		$err_count = 0;
		foreach ($arr_flds as $value) {
			$fld1 = $value."_STATUS";

			$time_info->$value = "Empty";
			$time_info->$fld1 = 0;

			if(!isset($jra_data)) { $err_count++; continue; }
			if(!isset($jra_data->data)) { $err_count++; continue; }
			if(!isset($jra_data->data->$case)) { $err_count++; continue; }
			if(!isset($jra_data->data->$case->$value)) { $err_count++; continue; }
			if(!isset($jra_data->data->$case->$value->market)) { $err_count++; continue; }
			if(!isset($jra_data->data->$case->$value->market->timestamp)) { $err_count++; continue; }

			$time_info->$value = date("H:i:s", $jra_data->data->$case->$value->market->timestamp - date("Z") + 3600 * 9);	
			$time_info->$fld1 = (time() - $jra_data->data->$case->$value->market->timestamp > 60 * 10)?0:1;
			if(time() - $jra_data->data->$case->$value->market->timestamp > 60 * 10) $err_count++;
		}

		if($err_count >= 4) $time_info->error = 1;

		return $time_info;
	}

	function __log_message($event) {
		$msg = $event->meeting." R ".$event->event_number." ( ".date("H:i:s", $event->start_time - date("Z") + 3600 * 9)." ) : ".$event->notice_type;
		echo $msg."<br>";
	}

	function __send_slack_alarm($event) {
		$msg = $event->meeting." R ".$event->event_number." ( ".date("H:i:s", $event->start_time - date("Z") + 3600 * 9)." ) : ".$event->notice_type;
	}

	$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
	if(($cur_hour < 9) || ($cur_hour > 21)) exit();

	$meetings = __get_meeting_info($date);
	$ret = __check_strange_for_meetings($meetings);
	foreach ($ret as $event) {
		__send_slack_alarm($event);
	}
?>