<!DOCTYPE html>
<html>
<head>
	<title>Jockey Info Inserting to db</title>
</head>
<style type="text/css">
	table td{
		border: 1px solid black;
	}
</style>
<body>
	<h3>Jockey names</h3>
	<table>
		<tr>
			<th>No</th><th>Chinese Name</th><th>Japanese Name</th><th>English Name</th><th>State</th>
		</tr>
	</table>
</body>
<script type="text/javascript" src="./assets/jquery.min.js"></script>
<script type="text/javascript">
	var arrJockey = ["Ｃ．ルメール, クリストフ ルメール, Christophe Lemaire","Ｍ．デムーロ, ミルコ デムーロ, Mirco Demuro","戸崎 圭太, トサキ ケイタ, Keita Tosaki","川田 将雅, カワダ ユウガ, Yuga Kawada","福永 祐一, フクナガ ユウイチ, Yuichi Fukunaga","田辺 裕信, タナベ ヒロノブ, Hironobu Tanabe","岩田 康誠, イワタ ヤスナリ, Yasunari Iwata","松山 弘平, マツヤマ コウヘイ, Kohei Matsuyama","北村 友一, キタムラ ユウイチ, Yuichi Kitamura","藤岡 佑介, フジオカ ユウスケ, Yusuke Fujioka","内田 博幸, ウチダ ヒロユキ, Hiroyuki Uchida","武 豊, タケ ユタカ, Yutaka Take","和田 竜二, ワダ リュウジ, Ryuji Wada","石橋 脩, イシバシ シュウ, Shu Ishibashi","三浦 皇成, ミウラ コウセイ, Kosei Miura","池添 謙一, イケゾエ ケンイチ, Kenichi Ikezoe","大野 拓弥, オオノ タクヤ, Takuya Ono","丸山 元気, マルヤマ ゲンキ, Genki Maruyama","北村 宏司, キタムラ ヒロシ, Hiroshi Kitamura","松若 風馬, マツワカ フウマ, Fuma Matsuwaka","幸 英明, ミユキ ヒデアキ, Hideaki Miyuki","藤岡 康太, フジオカ コウタ, Kota Fujioka","浜中 俊, ハマナカ スグル, Suguru Hamanaka","横山 典弘, ヨコヤマ ノリヒロ, Norihiro Yokoyama","武藤 雅, ムトウ ミヤビ, Miyabi Muto","津村 明秀, ツムラ アキヒデ, Akihide Tsumura","吉田 隼人, ヨシダ ハヤト, Hayato Yoshida","川又 賢治, カワマタ ケンジ, Kenji Kawamata","鮫島 克駿, サメシマ カツマ, Katsuma Sameshima","松岡 正海, マツオカ マサミ, Masami Matsuoka","蛯名 正義, エビナ マサヨシ, Masayoshi Ebina","横山 武史, ヨコヤマ タケシ, Takeshi Yokoyama","小崎 綾也, コザキ リョウヤ, Ryoya Kozaki","富田 暁, トミタ アカツキ, Akatsuki Tomita","古川 吉洋, フルカワ ヨシヒロ, Yoshihiro Furukawa","柴田 大知, シバタ ダイチ, Daichi Shibata","秋山 真一郎, アキヤマ シンイチロウ, Shinichiro Akiyama","酒井 学, サカイ マナブ, Manabu Sakai","田中 勝春, タナカ カツハル, Katsuharu Tanaka","菱田 裕二, ヒシダ ユウジ, Yuji Hishida","勝浦 正樹, カツウラ マサキ, Masaki Katsuura","国分 恭介, コクブン キョウスケ, Kyosuke Kokubun","荻野 極, オギノ キワム, Kiwamu Ogino","太宰 啓介, ダザイ ケイスケ, Keisuke Dazai","森 裕太朗, モリ ユウタロウ, Yutaro Mori","柴山 雄一, シバヤマ ユウイチ, Yuichi Shibayama","加藤 祥太, カトウ ショウタ, Shota Kato","四位 洋文, シイ ヒロフミ, Hirofumi Shii","藤田 菜七子, フジタ ナナコ, Nanako Fujita","丸田 恭介, マルタ キョウスケ, Kyosuke Maruta","城戸 義政, キド ヨシマサ, Yoshimasa Kido","木幡 巧也, コワタ タクヤ, Takuya Kowata","石川 裕紀人, イシカワ ユキト, Yukito Ishikawa","岩崎 翼, イワサキ ツバサ, Tsubasa Iwasaki","江田 照男, エダ テルオ, Teruo Eda","川須 栄彦, カワス ハルヒコ, Haruhiko Kawasu","中谷 雄太, ナカタニ ユウタ, Yuta Nakatani","木幡 育也, コワタ イクヤ, Ikuya Kowata","坂井 瑠星, サカイ リュウセイ, Ryusei Sakai","黛 弘人, マユズミ ヒロト, Hiroto Mayuzumi","菊沢 一樹, キクザワ カズキ, Kazuki Kikuzawa","林 満明, ハヤシ ミツアキ, Mitsuaki Hayashi","平沢 健治, ヒラサワ ケンジ, Kenji Hirasawa","国分 優作, コクブン ユウサク, Yusaku Kokubun","五十嵐 雄祐, イガラシ ユウスケ, Yusuke Igarashi","嘉藤 貴行, カトウ タカユキ, Takayuki Kato","岡田 祥嗣, オカダ ヨシツグ, Yoshitsugu Okada","杉原 誠人, スギハラ マコト, Makoto Sugihara","鮫島 良太, サメシマ リョウタ, Ryota Sameshima","Ｊ．モレイラ, ジョアン モレイラ, Joao Moreira","横山 和生, ヨコヤマ カズオ, Kazuo Yokoyama","丹内 祐次, タンナイ ユウジ, Yuji Tannai","高倉 稜, タカクラ リョウ, Ryo Takakura","武士沢 友治, ブシザワ トモハル, Tomoharu Bushizawa","田中 健, タナカ ケン, Ken Tanaka","伊藤 工真, イトウ タクマ, Takuma Ito","宮崎 北斗, ミヤザキ ホクト, Hokuto Miyazaki","岩部 純二, イワベ ジュンジ, Junji Iwabe","小牧 太, コマキ フトシ, Futoshi Komaki","柴田 善臣, シバタ ヨシトミ, Yoshitomi Shibata","西村 淳也, ニシムラ アツヤ, Atsuya Nishimura","木幡 初也, コワタ ハツヤ, Hatsuya Kowata","中井 裕二, ナカイ ユウジ, Yuji Nakai","川島 信二, カワシマ シンジ, Shinji Kawashima","植野 貴也, ウエノ タカヤ, Takaya Ueno","山本 康志, ヤマモト コウシ, Koshi Yamamoto","石神 深一, イシガミ シンイチ, Shinichi Ishigami","藤懸 貴志, フジカケ タカシ, Takashi Fujikake","山田 敬士, ヤマダ ケイシ, Keishi Yamada","井上 敏樹, イノウエ トシキ, Toshiki Inoue","松田 大作, マツダ ダイサク, Daisaku Matsuda","金子 光希, カネコ ミツキ, Mitsuki Kaneko","小坂 忠士, コサカ タダシ, Tadashi Kosaka","中村 将之, ナカムラ マサユキ, Masayuki Nakamura","高田 潤, タカダ ジュン, Jun Takada","北沢 伸也, キタザワ シンヤ, Shinya Kitazawa","白浜 雄造, シラハマ ユウゾウ, Yuzo Shirahama","荻野 琢真, オギノ タクマ, Takuma Ogino","西田 雄一郎, ニシダ ユウイチロウ, Yuichiro Nishida","嶋田 純次, シマダ ジュンジ, Junji Shimada","難波 剛健, ナンバ ヨシヤス, Yoshiyasu Namba","三津谷 隼人, ミツヤ ハヤト, Hayato Mitsuya","西谷 誠, ニシタニ マコト, Makoto Nishitani","森 一馬, モリ カズマ, Kazuma Mori","菅原 隆一, スガハラ リュウイチ, Ryuichi Sugahara","上野 翔, ウエノ ショウ, Sho Ueno","小林 徹弥, コバヤシ テツヤ, Tetsuya Kobayashi","佐久間 寛志, サクマ ヒロシ, Hiroshi Sakuma","小野寺 祐太, オノデラ ユウタ, Yuta Onodera","蓑島 靖典, ミノシマ ヤスノリ, Yasunori Minoshima","竹之下 智昭, タケノシタ トモアキ, Tomoaki Takenoshita","義 英真, ヨシ エイシン, Eishin Yoshi","水口 優也, ミズグチ ユウヤ, Yuya Mizuguchi","草野 太郎, クサノ タロウ, Taro Kusano","浜野谷 憲尚, ハマノヤ ノリヒサ, Norihisa Hamanoya","村田 一誠, ムラタ イッセイ, Issei Murata","野中 悠太郎, ノナカ ユウタロウ, Yutaro Nonaka","原田 和真, ハラダ カズマ, Kazuma Harada","木幡 初広, コワタ ハツヒロ, Hatsuhiro Kowata","鈴木 慶太, スズキ ケイタ, Keita Suzuki","二本柳 壮, ニホンヤナギ ソウ, So Nihonyanagi","熊沢 重文, クマザワ シゲフミ, Shigefumi Kumazawa","江田 勇亮, エダ ユウスケ, Yusuke Eda","大江原 圭, オオエハラ ケイ, Kei Oehara","大庭 和弥, オオバ カズヤ, Taichi Nishimura","西村 太一, ニシムラ タイチ, Kazuya Oba","高野 和馬, タカノ カズマ, Kazuma Takano","長岡 禎仁, ナガオカ ヨシヒト, Yoshihito Nagaoka","服部 寿希, ハットリ トシキ, Toshiki Hattori","田村 太雅, タムラ タイガ, Taiga Tamura","的場 勇人, マトバ ハヤト, Hayato Matoba","伴 啓太, バン ケイタ, Keita Ban","柴田 未崎, シバタ ミサキ, Misaki Shibata","畑端 省吾, ハタバタ ショウゴ, Shogo Hatabata","小島 太一, コジマ タイチ, Taichi Kojima","黒岩 悠, クロイワ ユウ, Sho Kakihara","吉田 豊, ヨシダ ユタカ, Yu Kuroiwa","大下 智, オオシタ サトシ, Satoshi Oshita"];
var nCount = arrJockey.length;
var nCurPos = -1;
function insertJockeyToDB(_chn, _jpn, _eng){
	$.post("http://dataminer.jts.ec/JTS/library/trans_api.php?case=2201&chn=" + _chn + "&jpn=" + _jpn + "&eng=" + _eng, function(data){
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
	var jockey = arrJockey[nCurPos];
	var arrCur = jockey.split(",");
	insertJockeyToDB( arrCur[0], arrCur[1], arrCur[2]);
}
postData();
</script>
</html>