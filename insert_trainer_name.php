<!DOCTYPE html>
<html>
<head>
	<title>Trainer Info Inserting to db</title>
</head>
<style type="text/css">
	table td{
		border: 1px solid black;
	}
</style>
<body>
	<h3>Trainer names</h3>
	<table>
		<tr>
			<th>No</th><th>Chinese Name</th><th>Japanese Name</th><th>English Name</th><th>State</th>
		</tr>
	</table>
</body>
<script type="text/javascript" src="./assets/jquery.min.js"></script>
<script type="text/javascript">
	var arrTrainer = [
"福島 信晴, フクシマ ノブハル, [Retired] Nobuharu Fukushima",];
var nCount = arrTrainer.length;
var nCurPos = -1;
function insertTrainerToDB(_chn, _jpn, _eng){
	$.post("http://dataminer.jts.ec/JTS/library/trans_api.php?case=2202&chn=" + _chn + "&jpn=" + _jpn + "&eng=" + _eng, function(data){
		console.log(data);
		var strHtml = "<tr>";
		strHtml += "<td>"+(nCurPos*1+1)+"</td>";
		strHtml += "<td>"+_chn+"</td>" + "<td>"+_jpn+"</td>" + "<td>"+_eng+"</td>";
		strHtml += "<td>"+data+"</td>";
		strHtml += "</tr>";
		$("table tr:last").after(strHtml);
		postData();
	});
}
function postData(){
	if( nCurPos >= nCount-1){
		alert("All Done");
		return;
	}
	nCurPos ++;
	var jockey = arrTrainer[nCurPos];
	var arrCur = jockey.split(",");
	insertTrainerToDB( arrCur[0], arrCur[1], arrCur[2]);
}
postData();
</script>
</html>