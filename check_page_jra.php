<?php

include('library/common_lib.php');

function __generate_error_notice($url = "", $pattern = "Something Changed", $case = 0) {
  $message = $url." : [ ".$pattern." ]";
  __send_slack_function("https://hooks.slack.com/services/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", $message);

  include('email_list.php');
  foreach ($emails as $__to_email_address) {
    __send_email($__to_email_address, "JRA Site HTML Content Changed", $message);
  } 
  echo $message;
  echo "\n<br>-----------------------------------<br>\n";
}

function __get_page_data_by_guzzle( $url ){
  $body = "";
  try {
    $client = new GuzzleHttp\Client();
    $response = $client->request('GET', $url);
    $body = $response->getBody();
    $body = iconv("SJIS", "UTF-8", $body);
  } catch (GuzzleHttp\Exception\RequestException $e) {
    return "<html></html>";
  }
  return $body;
}

function __get_home_data(){
  return __get_page_data_by_guzzle("http://www.jra.go.jp/");
}

function __get_race_cnames(){
  $str_html = __get_home_data();
  $menu_html = str_get_html($str_html);
  
  $obj = new \stdClass;
  foreach($menu_html->find('a') as $menu_a) {
    if(trim($menu_a->innertext) == "オッズ"){      
        $obj->odds = __get_values($menu_a->onclick, ",'", "')");
    } else if(trim($menu_a->innertext) == "レース結果"){      
        $obj->result = __get_values($menu_a->onclick, ",'", "')");
    } else if(trim($menu_a->innertext) == "出馬表"){      
        $obj->schedule = __get_values($menu_a->onclick, ",'", "')");
    }
  }
  return $obj;
}

function __get_race_data($__id, $__pre = "S"){
  $body = "";
  try{
    $client = new GuzzleHttp\Client();
    $response = $client->request('POST', "http://www.jra.go.jp/JRADB/access".$__pre.".html", [ 'form_params' => [ 'cname' => $__id ] ]);
    $body = $response->getBody();
    $body = iconv("SJIS", "UTF-8", $body);
  } catch (GuzzleHttp\Exception\RequestException $e) {
    return "<html></html>";
  }
  return $body;
}

function __get_schedule_data(){
  $now_date = GetCurrentJapanTime();
  $date_str = date("Y/n/md", strtotime($now_date)-(7 + date("w", strtotime($now_date))) * 86400);
  return __get_page_data_by_guzzle( "http://www.jra.go.jp/keiba/calendar/".$date_str.".html" );
}

function __get_race_schedule(){
  $arr_result = array();
  $str_html = __get_schedule_data();
  $race_name = "";
  
  $race_html = str_get_html($str_html);
  foreach($race_html->find('table#rece-data td') as $race_table) {
    $race_table_string = str_get_html($race_table->innertext);
    if($race_table_string->find('.cal-racec-cell')){
      $race_name = $race_table_string->find('.cal-racec-cell', 0)->innertext;
      foreach($race_table_string->find('table.race-detail') as $race_table) {
        $race_table_string = str_get_html($race_table->innertext);
          foreach($race_table_string->find('tr') as $race_row) { 
            $race_row_string = str_get_html($race_row->innertext);
            if(!($race_row_string)) continue;
            if(!($race_row_string->find('th', 0))) continue;
            $race_obj = new \stdClass;
            $race_obj->race_num = $race_row_string->find('th', 0)->innertext;
            $race_obj->race_name = $race_name;
            $race_obj->race_time = $race_row_string->find('td.race-time', 0)->innertext;
            $race_obj->race_time = str_replace("時", ":", $race_obj->race_time);
            $race_obj->race_time = str_replace("分", ":00", $race_obj->race_time);
            $race_obj->race_time = date("H:i", strtotime($race_obj->race_time));

            array_push($arr_result, $race_obj);
          }
      }
    }
  }

  return $arr_result;
}

function __get_1r_cname($menu_cname) {
  $str_html = __get_race_data($menu_cname);
  $menu_html = str_get_html($str_html);
  $menu_a = $menu_html->find('td.racekekkaCol a', 0);
  if($menu_a){
    $menu_cname = __get_values($menu_a->onclick, ",'", "')");
    return $menu_cname;
  }
  return false;
}

function __get_today_result($menu_cname){
  $str_html = __get_race_data($menu_cname);
  $menu_html = str_get_html($str_html);

  $result_cname = [];
  foreach($menu_html->find('.kaisaiBtn a') as $menu_a) {
    $menu_desc = trim($menu_a->innertext);    
    $menu_cname = __get_values($menu_a->onclick, ",'", "')");
    return __get_1r_cname($menu_cname);
  }

  return false;
}

function __get_race_result($__id){
  $arr_result = array();
  $__arr_repay = array();
  $race_num = substr($__id, 19, 2);
  $str_html = __get_race_data($__id);
  $race_html = str_get_html($str_html);
  
  foreach($race_html->find('table.mainList') as $race_table) {
    $race_table_string = str_get_html($race_table->innertext);
      foreach($race_table_string->find('tr') as $race_row) { 
        $race_row_string = str_get_html($race_row->innertext);
        if($race_row_string->find('td.chakuCol', 0)){
          $chakuCol = $race_row_string->find('td.chakuCol', 0)->innertext;
          $umabanCol = $race_row_string->find('td.umabanCol', 0)->innertext;
          $race_obj = new \stdClass;
          $race_obj->event_number = intval(trim($race_num));
          $race_obj->runner_number = trim($umabanCol);
          $position_obj = new \stdClass;
          $position_obj->finish_position = trim($chakuCol);
          $race_obj->race_data = $position_obj;
          array_push($arr_result, $race_obj);
        }
      }
  }

  $__config_check = array( "馬単", "３連複", "３連単", "単勝", "複勝", "ワイド", "馬連" );
  $__config_pays = array( "馬単" => "EXA", "３連複" => "TRO", "３連単" => "TRI", "単勝" => "WIN", "複勝" => "PLC", "ワイド" => "QNP", "馬連" => "QNL" );

  foreach ($race_html->find(".haraimodoshiOutDiv tr") as $pay_tr) {
    if(str_get_html($pay_tr->innertext)->find("th", 0)){
      $pay_obj = new \stdClass;
      $pay_key = trim(str_get_html($pay_tr->innertext)->find("th", 0)->innertext);
      if(isset($__config_pays[$pay_key])){
        $pay_obj->kind = $__config_pays[$pay_key];
        $pay_obj->number = trim(str_get_html($pay_tr->innertext)->find("td", 0)->innertext);;
        $pay_obj->money = trim(str_get_html($pay_tr->innertext)->find("td", 1)->innertext);;
        array_push($__arr_repay, $pay_obj); 
      }
    } else {
      $pay_obj = new \stdClass;
      if(isset($__config_pays[$pay_key])){
        $pay_obj->kind = $__config_pays[$pay_key];
        $pay_obj->number = trim(str_get_html($pay_tr->innertext)->find("td", 0)->innertext);;
        $pay_obj->money = trim(str_get_html($pay_tr->innertext)->find("td", 1)->innertext);;
        array_push($__arr_repay, $pay_obj); 
      }      
    }
  }

  $ret = new \stdClass;
  $ret->result = $arr_result;
  $ret->payout = $__arr_repay;
  return $ret;
}

function __get_ingi_odds($__cname) 
{
  $str_html = __get_race_data($__cname, "O");
  if($str_html){
    $str_html = __get_values($str_html, 'Btn unBtn">', '</td>');
    $menu_html = str_get_html($str_html);
    if($menu_html){
      $a_obj = $menu_html->find('a', 0);
      if($a_obj) return __get_values($a_obj->onclick, ",'", "')");
    }
  }
  return "";
}

function __get_today_odds($menu_cname){
  $str_html = __get_race_data($menu_cname, "O");
  $menu_html = str_get_html($str_html);
  foreach($menu_html->find('.kaisaiBtn a') as $menu_a) {
    $menu_desc = trim($menu_a->innertext);        
    $arr_odds = [];
    $menu_cname = __get_values($menu_a->onclick, ",'", "')");
    $str_html = __get_race_data($menu_cname, "O");
    $arr_races = str_get_html($str_html)->find('.raceList2 tr');
    foreach ($arr_races as $race_obj) {
      $race_obj_html = str_get_html($race_obj->innertext);
      if($race_obj_html->find('td.raceNo', 0)){
        $race_number = intval( $race_obj_html->find('td.raceNo a img', 0)->alt );
        $odds_obj = new \stdClass;
        $odds_obj->race_number = $race_number;
        $WIN = ""; 
        $QNL = ""; 
        $QNP = ""; 
        $EXA = ""; 
        $TRO = ""; 
        $TRI = ""; 
        $arr_a = $race_obj_html->find('td a');
        foreach ($arr_a as $a_obj) {
          if(strpos($a_obj->innertext, "単勝複勝") !== false) $WIN = __get_ingi_odds(__get_values($a_obj->onclick, ",'", "')"));
          if(strpos($a_obj->innertext, "馬連") !== false) $QNL = __get_ingi_odds(__get_values($a_obj->onclick, ",'", "')"));
          if(strpos($a_obj->innertext, "ワイド") !== false) $QNP = __get_ingi_odds(__get_values($a_obj->onclick, ",'", "')"));
          if(strpos($a_obj->innertext, "馬単") !== false) $EXA = __get_ingi_odds(__get_values($a_obj->onclick, ",'", "')"));
          if(strpos($a_obj->innertext, "３連複") !== false) $TRO = __get_ingi_odds(__get_values($a_obj->onclick, ",'", "')"));
          if(strpos($a_obj->innertext, "３連単") !== false) $TRI = __get_ingi_odds(__get_values($a_obj->onclick, ",'", "')"));
        }
        $odds_obj->WIN = $WIN;
        $odds_obj->QNL = $QNL;
        $odds_obj->QNP = $QNP;
        $odds_obj->EXA = $EXA;
        $odds_obj->TRO = $TRO;
        $odds_obj->TRI = $TRI;
        return $odds_obj;
      }            
    }
  }
  return false;
}

function __get_time_cname($menu_cname) {
  $arr_changed = array();
  $str_html = __get_race_data($menu_cname);
  $menu_html = str_get_html($str_html);
  $menu_trs = $menu_html->find('tr');
  foreach ($menu_trs as $menu_tr) {
    $menu_tr_html = str_get_html($menu_tr);
    if($menu_tr_html->find("td a img.btnRaceNumberImage", 0)){
      $time_change = new \stdClass;
      $time_change->event_number = $menu_tr_html->find("td a img.btnRaceNumberImage", 0)->alt;
      $time_change->time = ($menu_tr_html->find("td.hassouColChanged strong", 0))?$menu_tr_html->find("td.hassouColChanged strong", 0)->innertext:$menu_tr_html->find("td.hassouCol", 0)->innertext;
      $time_change->changed = false;
      if($menu_tr_html->find(".hassouColChanged", 0)){
        $time_change->changed = true;
      }
      array_push($arr_changed, $time_change);
    }
  }
  return $arr_changed;
}

function get_odds_win_race($__cname)
{
  $str_html = __get_race_data($__cname, "O");
  $menu_html = str_get_html($str_html);
  $horse_arr = $menu_html->find("div.ozTanfukuTable tr");
  $win_ret = array();
  $plc_min_ret = array();
  $plc_max_ret = array();

  foreach ($horse_arr as $horse_obj) {
    $horse_obj_html = str_get_html($horse_obj->innertext);
    if($horse_obj_html->find('th.umaban', 0)){
      $win_obj = new \stdClass;
      $win_obj->horse_number = $horse_obj_html->find('th.umaban', 0)->innertext;
      $win_obj->price = trim($horse_obj_html->find('td.oztan', 0)->innertext);
      $win_obj->minPrice = trim($horse_obj_html->find('td.fukuMin', 0)->innertext);
      $win_obj->maxPrice = trim($horse_obj_html->find('td.fukuMax', 0)->innertext);
      $win_ret[$win_obj->horse_number] = floatval( $win_obj->price );
      $plc_min_ret[$win_obj->horse_number] = floatval( $win_obj->minPrice );
      $plc_max_ret[$win_obj->horse_number] = floatval( $win_obj->maxPrice );
    }
  }

  $ret = new \stdClass;
  $ret->win = $win_ret;
  $ret->plc_min = $plc_min_ret;
  $ret->plc_max = $plc_max_ret;
  return $ret;
}

function get_odds_qnl_race($__cname)
{
  $str_html = __get_race_data($__cname, "O");
  $menu_html = str_get_html($str_html);
  $horse_arr = $menu_html->find("div.ozNinkiINTable tr");
  $prices = array();

  foreach ($horse_arr as $horse_obj) {
    $horse_obj_html = str_get_html($horse_obj->innertext);
    if($horse_obj_html->find('th.thninki', 0)){
      $group_info = trim($horse_obj_html->find('th.thkumi', 0)->innertext);
      $group_value = trim($horse_obj_html->find('td.tdoz', 0)->innertext);
      $arr_group = explode("-", $group_info);
      if(count($arr_group) == 2){
        $key1 = $arr_group[0];
        $key2 = $arr_group[1];
        if(!isset($prices[$key1])) $prices[$key1] = [];
        $prices[$key1][$key2] = floatval( $group_value );
      }
    }
  }

  return $prices;
}

function get_odds_qnp_race($__cname)
{
  $str_html = __get_race_data($__cname, "O");
  $menu_html = str_get_html($str_html);
  $horse_arr = $menu_html->find("div.ozNinkiINTable tr");
  $prices = array();
  $prices2 = array();

  foreach ($horse_arr as $horse_obj) {
    $horse_obj_html = str_get_html($horse_obj->innertext);
    if($horse_obj_html->find('th.thninki', 0)){
      if(($horse_obj_html->find('th.thkumi', 0)) && ($horse_obj_html->find('td.wideMin', 0)) && ($horse_obj_html->find('td.wideMax', 0))){
        $group_info = trim($horse_obj_html->find('th.thkumi', 0)->innertext);
        $group_value = trim($horse_obj_html->find('td.wideMin', 0)->innertext);
        $group_value2 = trim($horse_obj_html->find('td.wideMax', 0)->innertext);
        $arr_group = explode("-", $group_info);
        if(count($arr_group) == 2){
          $key1 = $arr_group[0];
          $key2 = $arr_group[1];
          if(!isset($prices[$key1])) $prices[$key1] = [];
          if(!isset($prices2[$key1])) $prices2[$key1] = [];
          $prices[$key1][$key2] = floatval( $group_value );
          $prices2[$key1][$key2] = floatval( $group_value2 );
        }
      }
    }
  }

  $ret = new \stdClass;
  $ret->qnp_min = $prices;
  $ret->qnp_max = $prices2;
  return $ret;
}

function get_odds_exa_race($__cname)
{
  $str_html = __get_race_data($__cname, "O");
  $str_html = str_replace("票数なし", "0", $str_html);
  $menu_html = str_get_html($str_html);
  $horse_arr = $menu_html->find("div.ozNinkiINTable tr");
  $prices = array();

  foreach ($horse_arr as $horse_obj) {
    $horse_obj_html = str_get_html($horse_obj->innertext);
    if($horse_obj_html->find('th.thninki', 0)){
      $group_info = trim($horse_obj_html->find('th.thkumi', 0)->innertext);
      $group_value = trim($horse_obj_html->find('td.tdoz', 0)->innertext);
      $arr_group = explode("-", $group_info);
      if(count($arr_group) == 2){
        $key1 = $arr_group[0];
        $key2 = $arr_group[1];
        if(!isset($prices[$key1])) $prices[$key1] = [];
        $prices[$key1][$key2] = floatval( $group_value );
      }
    }
  }

  return $prices;
}

function get_odds_tro_race($__cname)
{
  $str_html = __get_race_data($__cname, "O");
  $menu_html = str_get_html($str_html);
  $horse_arr = $menu_html->find("div.ozNinkiINTable tr");
  $prices = array();

  foreach ($horse_arr as $horse_obj) {
    $horse_obj_html = str_get_html($horse_obj->innertext);
    if($horse_obj_html->find('th.thninki', 0)){
      $group_info = trim($horse_obj_html->find('th.thkumi', 0)->innertext);
      $group_value = trim($horse_obj_html->find('td.tdoz', 0)->innertext);
      $arr_group = explode("-", $group_info);
      if(count($arr_group) == 3){
        $key1 = $arr_group[0];
        $key2 = $arr_group[1];
        $key3 = $arr_group[2];
        if(!isset($prices[$key1])) $prices[$key1] = [];
        if(!isset($prices[$key1][$key2])) $prices[$key1][$key2] = [];
        $prices[$key1][$key2][$key3] = floatval( $group_value );
      }
    }
  }

  return $prices;
}

function get_odds_tri_race($__cname)
{
  $str_html = __get_race_data($__cname, "O");
  
  $str_html = __get_values($str_html, "oddslistArea", 'oddsSSIArea'); // Optimization
  $str_html = str_replace("票数なし", "0", $str_html);
  $str_html = str_replace("  ", " ", $str_html);
  while(strpos($str_html, "  ") !== false) $str_html = str_replace("  ", " ", $str_html);
  $str_html = __get_after_values($str_html, "oddsTop100Area");  
  $menu_html = str_get_html($str_html);

  $prices = array();
  if($menu_html){
    $horse_arr = $menu_html->find("div.ozNinkiINTable tr");
    foreach ($horse_arr as $horse_obj) {
      $horse_obj_html = str_get_html($horse_obj->innertext);
      if($horse_obj_html->find('th.thninki', 0)){
        $group_info = trim($horse_obj_html->find('th.thkumi', 0)->innertext);
        $group_value = trim($horse_obj_html->find('td.tdoz', 0)->innertext);
        $arr_group = explode("-", $group_info);
        if(count($arr_group) == 3){
          $key1 = $arr_group[0];
          $key2 = $arr_group[1];
          $key3 = $arr_group[2];
          if(!isset($prices[$key1])) $prices[$key1] = [];
          if(!isset($prices[$key1][$key2])) $prices[$key1][$key2] = [];
          $prices[$key1][$key2][$key3] = floatval( $group_value );
        }
      }
    }
  }

  return $prices;
}

function __get_schedule_change($menu_cname){
  $str_html = __get_race_data($menu_cname, "D");
  $menu_html = str_get_html($str_html);

  foreach($menu_html->find('.kaisaiBtn a') as $menu_a) {
    $menu_desc = trim($menu_a->innertext);    
    $menu_cname = __get_values($menu_a->onclick, ",'", "')");
    return __get_time_cname($menu_cname);
  }

  return false;
}

$now_date = GetCurrentJapanTime();
$date_str = date("Y/n/md", strtotime($now_date)-(7 + date("w", strtotime($now_date))) * 86400);
$schedule_url = "http://www.jra.go.jp/keiba/calendar/".$date_str.".html";
echo $schedule_url;
echo "\n<br>---------------------<br>\n";
$schedules = __get_race_schedule();
if(count($schedules)) {
  print_r($schedules);
  echo "\n<br>---------------------<br>\n";
} else {
  __generate_error_notice($schedule_url, "JRA Scheduler Parse Error");
}

$cnames = __get_race_cnames();
if(isset($cnames->schedule) && isset($cnames->schedule) && isset($cnames->schedule)) {
  print_r($cnames);
  echo "\n<br>---------------------<br>\n";
} else {
  __generate_error_notice("JRA", "CName Parse Error");
}

$result_cname = __get_today_result($cnames->result);
if($result_cname) {
  print_r($result_cname);
  echo "\n<br>---------------------<br>\n";
} else {
  __generate_error_notice("JRA", "Result CName Graber Error");
}

if($result_cname) $result = __get_race_result($result_cname);
if((count($result->result) > 5) && (count($result->payout) > 5)) {
  print_r($result);
  echo "\n<br>---------------------<br>\n";
} else {
  __generate_error_notice("JRA", "Result & Payout Graber Error");
}

if((date("w", strtotime($now_date)) >= 4) && (date("w", strtotime($now_date)) <= 5)) exit();
$time_array = __get_schedule_change($cnames->schedule);
if($time_array) {
  print_r($time_array);
  echo "\n<br>---------------------<br>\n";
} else {
  __generate_error_notice("JRA", "Race Time Graber Error");
}

$odds_cname = __get_today_odds($cnames->odds);
if(($odds_cname) && ($odds_cname->WIN) && ($odds_cname->QNL) && ($odds_cname->QNP) && ($odds_cname->EXA) && ($odds_cname->TRO) && ($odds_cname->TRI)) {
  print_r($odds_cname);
  echo "\n<br>---------------------<br>\n";
} else {
  __generate_error_notice("JRA", "Odds CName Graber Error");
}

if($odds_cname){
  if($odds_cname->WIN) {
    $odds = get_odds_win_race($odds_cname->WIN);
    if((count($odds->win)) && (count($odds->plc_min)) && (count($odds->plc_max))) {
      print_r($odds);
      echo "\n<br>---------------------<br>\n";
    } else {
      __generate_error_notice("JRA", "WIN & PLC Odds Graber Error");
    }
  }

  if($odds_cname->QNL) {
    $odds = get_odds_qnl_race($odds_cname->QNL);
    if(count($odds)) {
      print_r($odds);
      echo "\n<br>---------------------<br>\n";
    } else {
      __generate_error_notice("JRA", "QNL Odds Graber Error");
    }
  }

  if($odds_cname->QNP) {
    $odds = get_odds_qnp_race($odds_cname->QNP);
    if((count($odds->qnp_min)) && (count($odds->qnp_max))) {
      print_r($odds);
      echo "\n<br>---------------------<br>\n";
    } else {
      __generate_error_notice("JRA", "QNP Odds Graber Error");
    }
  }

  if($odds_cname->EXA) {
    $odds = get_odds_exa_race($odds_cname->EXA);
    if(count($odds)) {
      print_r($odds);
      echo "\n<br>---------------------<br>\n";
    } else {
      __generate_error_notice("JRA", "EXA Odds Graber Error");
    }
  }

  if($odds_cname->TRO) {
    $odds = get_odds_tro_race($odds_cname->TRO);
    if(count($odds)) {
      print_r($odds);
      echo "\n<br>---------------------<br>\n";
    } else {
      __generate_error_notice("JRA", "TRO Odds Graber Error");
    }
  }

  if($odds_cname->TRI) {
    $odds = get_odds_tri_race($odds_cname->TRI);
    if(count($odds)) {
      print_r($odds);
      echo "\n<br>---------------------<br>\n";
    } else {
      __generate_error_notice("JRA", "TRI Odds Graber Error");
    }
  }
}
?>