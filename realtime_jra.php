<?php

	require_once("library/jra_00.php");

	$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
	if(($cur_hour < 5) || ($cur_hour >= 22)) exit();

	while(true) {
		$cur_hour = intval( date("H", time()-date("Z")+3600*9) );
		if(($cur_hour < 5) || ($cur_hour >= 22)) exit();

		$result = check_race_time_change();
		foreach ($result as $event_obj) {
			if(!(isset($event_obj->venue_id))) continue;
			if(!($event_obj->venue_id)) continue;
			if($event_obj->type == "time") {			
				$event = new \stdClass();
				$event->timestamp = time();
				$event->venue_id = $event_obj->venue_id;
				$event->venue_name = $event_obj->venue_name;
				$event->venue_type = $event_obj->venue_type;
				$event->meeting_date = $event_obj->meeting_date;
				$event_detail = new \stdClass;
				$event_detail->number = intval($event_obj->number);
				$event_detail->no_program_info = true;
				$event_detail->start_time = strtotime($event->meeting_date." ".$event_obj->time.":00")+date("Z")-3600*9;
				$events = [];
				$events[] = $event_detail;
				$event->events = $events;

				__api_send2__("http://staging.dw.xtradeiom.com/api/meetings", "POST", $event, "jra_time");

			} else {
				$event = new \stdClass();
				$event->timestamp = time();
				$event->venue_id = $event_obj->venue_id;
				$event->venue_name = $event_obj->venue_name;
				$event->venue_type = $event_obj->venue_type;
				$event->meeting_date = $event_obj->meeting_date;
				$event_detail = new \stdClass;
				$event_detail->number = intval($event_obj->event_number);
				$event_detail->no_program_info = true;
				$competitors = [];
				$scratched_info = new \stdClass;
				$scratched_horse = new \stdClass;
				$scratched_horse->number = intval($event_obj->number);
				$scratched_horse->scratched = true;
				$scratched_info->race_data = $scratched_horse;
				$competitors[] = $scratched_info;
				$event_detail->competitors = $competitors;
				$events = [];
				$events[] = $event_detail;
				$event->events = $events;
				$event_type = $event_obj->type;
				$log_event = $event;
				if(isset($event_obj->horse)) $log_event->horse = $event_obj->horse;

				__api_send2__("http://staging.dw.xtradeiom.com/api/meetings", "POST", $event, "jra_".$event_type, $log_event);
			}
		}
		sleep(5);
	}	
?>