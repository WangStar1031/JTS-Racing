<?php

$site_case = $_POST["site_case"];

if($site_case == 1) require_once 'library/keiba_00.php';
else if($site_case == 2) require_once 'library/keiba.php';
else if($site_case == 3) require_once 'library/jra_00.php';
else if($site_case == 4) require_once 'library/jra.php';
else exit();

$race_id = $_POST["race_id"];
$first_check = $_POST["first_check"];

$info = __get_race_results($race_id);
$result = $info->result;
$repay = $info->repay;

$site_case_name = "";
if($site_case == 1) $site_case_name = "keiba";
else if($site_case == 2) $site_case_name = "rakuten";
else if($site_case == 3) $site_case_name = "jra";
else if($site_case == 4) $site_case_name = "netkeiba";

$check_first_send = false;
$limit_5fp = 5;
if(($site_case == 1) || ($site_case == 2)) $limit_5fp = 4;

if($first_check){
  if(count($result)){

    $meeting_id = $result[0]->meeting_id;
    $event_number = $result[0]->event_number;
    __log_json_result($site_case_name, "5fp", $meeting_id, $event_number, $result);
    __log_json_result($site_case_name, "payout", $meeting_id, $event_number, $repay);

    for($i=0; $i<count($result); $i++)
    {
      if($i >= $limit_5fp) break;
      __api_send__("https://staging.dw.xtradeiom.com/api/event_competitors/18095615", "PATCH", $result[$i]);
    }
    $repay_out = __api_send__("https://staging.dw.xtradeiom.com/api/markets_results/", "POST", $repay, true);
    if($repay_out){
      $repay_out = json_decode($repay_out);
      if($repay_out->status == "OK"){
        $check_first_send = true;
        __log_json_result($site_case_name, "payout_check", $meeting_id, $event_number, $repay);
      }
    }
  }
}

for($i=$limit_5fp; $i<count($result); $i++)
{
  __api_send__("https://staging.dw.xtradeiom.com/api/event_competitors/18095615", "PATCH", $result[$i]);
}

if(count($result) > $limit_5fp){
  
  $meeting_id = $result[0]->meeting_id;
  $event_number = $result[0]->event_number;
  __log_json_result($site_case_name, "fp", $meeting_id, $event_number, $result);

  $final = new \stdClass;
  $final->meeting_id = $result[0]->meeting_id;
  $final->event_number = $result[0]->event_number;
  $final->status = "FINAL";
  __api_send__("https://staging.dw.xtradeiom.com/api/events/xxx/status", "PUT", $final);

  $ret = new \stdClass;
  $ret->status = "OK";
  $ret->datas = $result;
  $ret->repay = $repay;
  $ret->check_fp5 = true;
  $ret->check_pay = true;
  $ret->check_fpall = true;
  $ret->check_final = true;
  $ret->race_id = $race_id;
  echo json_encode($ret);
  exit();
}

$ret = new \stdClass;
$ret->check_fp5 = ($check_first_send && (count($result) > 0));
$ret->check_pay = ($check_first_send && (count($result) > 0));
$ret->check_fpall = false;
$ret->check_final = false;
$ret->status = "NO";
$ret->datas = $result;
$ret->race_id = $race_id;
$ret->repay = $repay;

echo json_encode($ret);