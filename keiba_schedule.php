<?php 

  $live = true;
  $cur_date = date("Ymd", strtotime( date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s"))-date("Z")+3600*9) ));
  $proc_date = $cur_date;
  $site_case = 1;
  $base_dir = "";

  if(isset($_GET['site_case'])) $site_case = $_GET['site_case'];
  if(isset($_POST['date'])) $proc_date = $_POST['date'];

  $live = ($proc_date == $cur_date);
  $date = substr($proc_date, 0, 4)."-".substr($proc_date, 4, 2)."-".substr($proc_date, 6, 2);
  $date_now = substr($cur_date, 0, 4)."-".substr($cur_date, 4, 2)."-".substr($cur_date, 6, 2);

  if(!is_numeric($site_case)) $site_case = 1;

  $s_time = 10;
  $e_time = 22;

  if($site_case == 2) {
    require_once 'library/keiba.php';

    $disp_cation = "NAR - Rakuten";
    $base_dir = "rakuten";
    $results = __get_race_datas($proc_date);

  } else if($site_case == 3) {
    require_once 'library/jra_00.php';

    $disp_cation = "JRA";
    $base_dir = "jra";
	$s_time = 9;
	$e_time = 18;
    $results = __get_race_schedule($proc_date);

  } else if($site_case == 4) {
    require_once 'library/jra.php';

    $disp_cation = "JRA - NetKeiba";
    $base_dir = "netkeiba";
	$s_time = 9;
	$e_time = 18;
    $results = __get_race_datas($proc_date);

  } else {
    require_once 'library/keiba_00.php';

    $disp_cation = "NAR";
    $base_dir = "keiba";
    $results = __get_race_datas($proc_date);
  }

	if (count($results) == 0) : ?>
	<div style="margin: 50px; text-align: center;">
		<h3><?=$disp_cation?> race schedule for Today not yet available.</h3>
	</div>
<?php else : ?>
<?php for($i=0; $i<count($results); $i++){ 
	$meeting = $results[$i];
	$total_width = ($e_time - $s_time) * 300 - 50;
?>
	<div style="position: relative; width: <?=$total_width?>px; height: 300px; border-bottom: 1px solid #ccc;">
		<div style="position: absolute; top: 0; left: 0; width: <?=$total_width?>px; height: 300px; background-color: #e8e8e8;">
			<?php foreach (range($s_time, $e_time - 1) as $h) : ?>
				<div class="special_00" style="left: <?= ($h - $s_time) * 60 * 5       ?>px; border-left: 2px solid  #aaa; color: #999; font-weight: bold;"><?= $h ?>:00</div>
				<div class="special_00" style="left: <?= ($h - $s_time) * 60 * 5 +  50 ?>px; border-left: 1px dotted #cdcdcd; color: #ccc;"></div>
				<div class="special_00" style="left: <?= ($h - $s_time) * 60 * 5 + 100 ?>px; border-left: 1px dotted #cdcdcd; color: #ccc;"></div>
				<div class="special_00" style="left: <?= ($h - $s_time) * 60 * 5 + 150 ?>px; border-left: 1px dashed #aaa; color: #999;"><?= $h ?>:30</div>
				<div class="special_00" style="left: <?= ($h - $s_time) * 60 * 5 + 200 ?>px; border-left: 1px dotted #cdcdcd; color: #ccc;"></div>
				<div class="special_00" style="left: <?= ($h - $s_time) * 60 * 5 + 250 ?>px; border-left: 1px dotted #cdcdcd; color: #ccc;"></div>
			<?php endforeach ?>
		</div>
	
		<?php if ($live && date("H", GetCurrentJapanTimeStamp()) >= $s_time && (date("H", GetCurrentJapanTimeStamp()) < $e_time)) : ?>
			<?php $timeoffset = ((date("H", GetCurrentJapanTimeStamp()) - $s_time) * 60 + date("i", GetCurrentJapanTimeStamp())) * 5 ?>
			<div style="position: absolute; top: 0; left: <?= $timeoffset - 2 ?>px; height: 300px; border-left: 6px solid yellow;"></div>
			<div style="position: absolute; top: 0; left: <?= $timeoffset ?>px;     height: 300px; border-left: 2px solid red;"><span style="background-color: red; color: white; font-weight: bold; padding: 2px 5px; display: inline-block;"><?= date("H:i", GetCurrentJapanTimeStamp()) ?></span></div>
			<script>setTimeout(function () { $(window).scrollLeft(<?= $timeoffset ?> - Math.floor($(window).width() / 2) + 7); }, 1000);</script>
		<?php endif ?>
		
		<h3 style="position: absolute; top: 5px; left: 5px; margin: 0; color: #777;">Track <?= $meeting->meeting_id ?> (<?= $meeting->meeting_name ?>)</h3>
		<?php 
			for($j=0; $j<count($meeting->races); $j++){
				$race_obj = $meeting->races[$j];
				$status = 0;
				$types = array(
					'win' => "WIN", 
					'plc' => "PLC", 
					'qnl' => "QNL",
					'exa' => "EXA",
					'qnp' => "QNP",
					'tri' => "TRI",
					'tro' => "TRO",
					'5fp' => "5 FP",
					'payout' => "PAYOUT",
					'payout_check' => "PAYOUT CHECK",
					'fp' => "FP",
				);
				$left = explode(":", $race_obj->time);
				$left = $left[0] * 60 + $left[1];
				$left-= $s_time * 60;
				$left*= 5;
			?>
				<?php if ($live) : ?>
				<div style="position: absolute; top: 0;    left: <?= $left - 50 ?>px; z-index: 10; height: 300px; border-left: 50px solid yellow; opacity: 0.2;"></div>
				<div style="position: absolute; top: 0;    left: <?= $left + 10 ?>px; z-index: 20; height: 300px; border-left: 10px solid yellow; opacity: 0.2;"></div>
				<?php endif ?>
				<div style="position: absolute; top: 0;    left: <?= $left      ?>px; z-index: 20; height: 300px; border-left: 10px solid lime;   opacity: 0.3;"></div>
				<div style="position: absolute; top: 30px; left: <?= $left + 0  ?>px; z-index: 30; width: 90px; padding: 5px 10px; margin-right: 2px; border: 1px solid gray; background-color: white;">
					<?php
						$n = explode(":", date("H:i", GetCurrentJapanTimeStamp()));
						$t = explode(":", $race_obj->time);
						$n = $n[0] * 60 + $n[1];
						$t = $t[0] * 60 + $t[1];
						if ($n < $t - 35) $status = 0;
						if ($n >= $t - 35 && $n <= $t + 5) $status = 1;
						if ($n > $t + 5) $status = 2;
						if (!$live) $status = 3;
						switch ($status) {
							case 0: $statuscolor = "red"; break;
							case 1: $statuscolor = "yellow"; break;
							case 2: $statuscolor = "green"; break;
							case 3: $statuscolor = "blue"; break;
						}
					?>
					<?php if (($site_case == 1)||($site_case == 2)) : ?>
						<?php if ($live || strtotime($date) < time()) : ?>
							<?php if ($status == 2 || strtotime($date) < strtotime($date_now)) : ?>
							<?php $race_id_str = __get_race_id($proc_date."_keiba.json", $meeting->meeting_id, $race_obj->id); ?>
								<a href="http://keiba.rakuten.co.jp/archivemovie/RACEID/<?= $race_id_str ?>" target="_blank" style="float: right;"><img src="app/img/video.png" width="16" height="16"></a>
							<?php else : ?>
								<a href="http://keiba.rakuten.co.jp/livemovie?course=<?= str_replace("kochi", "kouchi", strtolower( $meeting->meeting_name )) ?>" target="_blank" style="float: right;"><img src="app/img/video2.png" width="16" height="16"></a>
							<?php endif ?>
						<?php endif ?>
					<?php else : ?>
						<?php
							$race_id_str = substr(__get_race_id($proc_date."_netkeiba.json", $meeting->meeting_id, $race_obj->id),1);
							$race_id_str = substr($race_id_str, 0, 4).substr($race_id_str, 6, 2).substr($race_id_str, 4, 2).substr($race_id_str, 8);
						?>
						<a href="video.php?target=<?=$race_id_str?>" target="_blank" style="float: right;"><img src="app/img/video.png" width="16" height="16"></a>
					<?php endif ?>
					<a><strong><big>R <?= $race_obj->id ?></big></strong><br><?= $race_obj->time ?></a>
					<br><br>
					<?php foreach ($types as $type => $name) : ?>
						<?php
							$count = 0;
							if(file_exists("logs/$base_dir/$type/".$meeting->meeting_id."/".$race_obj->id)){
								$typedir = "logs/$base_dir/$type/".$meeting->meeting_id."/".$race_obj->id;
								$count = sizeof(glob("$typedir/*.json"));
								if($count) $count--;								
							}
						?>
						<div style="clear: right; font-size: 85%; color: #777;">
							<?php if ($count) : ?>
								<div style="float: right;">[<?= $count ?>]</div>
								<a href="keiba_display.php?dir=<?= $typedir ?>" target="_blank"><?= $name ?></a>
							<?php else : ?>
								<em><?= $name ?></em>
							<?php endif ?>
						</div>
					<?php endforeach ?>
					<div style="margin: -5px -10px; margin-top: 15px; background-color: <?= $statuscolor ?>;">&nbsp;</div>
				</div>
			<?php } ?>
	</div>
<?php }
	endif ?>
