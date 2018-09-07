<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>JTS</title>
    <script type="text/javascript" charset="UTF-8" src="app/if.js"></script>
    <style type="text/css">
        html {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        body {
            height: 100%;
            position: relative;
            margin: 0;
            padding: 0;
        }
    </style>
    </head>
<body>
    <script type="text/javascript">
        function getUrlQuery() {
            var query = [];
            var query_tmp = "";
            var array_tmp = "";
            var url = window.location.search;

            query_tmp = url.slice(1).split('&');
            var max = query_tmp.length;

            for (var i = 0; i < max; i++) {
                array_tmp = query_tmp[i].split('=');
                query[array_tmp[0]] = array_tmp[1];
            }

            return query;
        }
      
        var query = getUrlQuery();
        var id = query['target'];
        var player = jstream_t3.PlayerFactoryIF.create({
        b:"eqd109zrse.eq.webcdn.stream.ne.jp/www50/eqd109zrse/jmc_pub/jmc_swf/player/",
        c:"MzQ5Mw==",
        opid:id,
        s:{
            dq:"2",
            el:"off",
            hp:360,
            il:"off",
            ip:"on",
            mdq:"1",
            rp:"fit",
            sn:"",
            tg:"off",
            va:"off",
            ti:"off",
            wd:"2",
            wp:640
        }});
    </script>
</body>
</html>
