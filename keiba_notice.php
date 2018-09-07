<?php

  $site_case = 1;
  $p = 60;

  if(isset($_GET['site_case'])) $site_case = $_GET['site_case'];
//  if(isset($_GET['p'])) $p = $_GET['p'];

  if(!is_numeric($site_case)) $site_case = 1;
//  if(!is_numeric($p)) $p = 60;

  if($site_case == 2) {
    require_once 'library/keiba.php';

    $disp_cation = "NAR - Rakuten";
    $arr_meetings = __get_nar_meeting_ids();
    $results = __get_race_datas();

  } else if($site_case == 3) {
    require_once 'library/jra_00.php';

    $disp_cation = "JRA";
    $arr_meetings = __get_meeting_ids();
    $results = __get_race_schedule();

  } else if($site_case == 4) {
    require_once 'library/jra.php';

    $disp_cation = "JRA - NetKeiba";
    $arr_meetings = __get_meeting_ids();  
    $results = __get_race_datas();

  } else {
    require_once 'library/keiba_00.php';

    $disp_cation = "NAR";
    $arr_meetings = __get_nar_meeting_ids_00();
    $results = __get_race_datas();

  }

?>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<script type="text/javascript" src="app/jquery-2.1.4.min.js"></script>
<link rel="stylesheet" media="all" type="text/css" href="library/nar.css?<?=date("YmdHis")?>">
<div style="display: none;"><select id="check_action"><option value="1" selected="">Enable</option><option value="0">Disable</option></select> <b><?=$disp_cation?></b></div>
<table><tr>
<?php
for($ii=0; $ii<count($results); $ii++){
  if($results[$ii]->meeting_id == "") continue;
  echo "<td style='vertical-align: text-bottom;'><b><font color=mediumblue>".((($site_case==3)||($site_case==4))?$results[$ii]->meeting_name:$results[$ii]->track_name)."</font></b>";
  echo " ( ".$results[$ii]->meeting_name." - ".$results[$ii]->meeting_id." ) <table class='data_table'>";
  echo '<tr class="payout_tr" style="text-align:center; background-color: green; color: white;"><td style="min-width:35px;">No.</td><td>Start</td><td>Remain</td><td>Status</td><td>Betia Closed</td><td>Action</td><td>5FP</td><td>PAY</td><td>FP</td><td>END</td><td>WIN</td><td>PLC</td><td>QNL</td><td>EXA</td><td>TRI</td></tr>';
  $races = $results[$ii]->races;
  for($i=0; $i<count($races); $i++){
?>  
    <tr class="open_tr" style="text-align: center;" meeting_id="<?=$results[$ii]->meeting_id?>" event_number="<?=$races[$i]->id?>" race_id="<?php if(($site_case==1)||($site_case==3)) echo $results[$ii]->meeting_id;?><?=$races[$i]->race_id?>" id="tr_<?php if(($site_case==1)||($site_case==3)) echo $results[$ii]->meeting_id;?><?=$races[$i]->race_id?>">
      <td>R <?=$races[$i]->id?></td><td><?=trim($races[$i]->time)?>:00</td><td></td><td style="background-color: green;">OPEN</td><td></td>
      <td><input type=button value="Cancel" onclick='cancelRace("<?php if(($site_case==1)||($site_case==3)) echo $results[$ii]->meeting_id;?><?=$races[$i]->race_id?>");'></td>
    </tr>
<?php
  }
  echo "</table></td>";
  echo '<td style="vertical-align: text-bottom;"><br><br><table style="min-width: 350px;" class="tbl_fp_result" id="tbl_fp_result'.$results[$ii]->meeting_id.'"><tbody></tbody></table></td>';
}
?>
</tr></table>
<script type="text/javascript">
  var arr_fp = [];
  var arr_meeting_name = [];
  var app_set_time_diff = <?=$p?>;
  var site_case = <?=$site_case?>;
<?php for($ii=0; $ii<count($results); $ii++){ if($results[$ii]->meeting_id == "") continue; ?>
  arr_meeting_name[<?=$results[$ii]->meeting_id?>] = "<?=$results[$ii]->meeting_name?>";
<?php } ?>
</script>
<script type="text/javascript" src="library/nar.js?<?=date("YmdHis")?>"></script>