if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

      var result = []

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop)
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
        }
      }
      return result
    }
  })()
};function VANAY_CALLBACK(){}

// define indexOf method
// reference: https://developer.mozilla.org/ja/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
 
        if (this == null) {
            throw new TypeError();
        }
 
        var t = Object(this);
        var len = t.length >>> 0;
 
        if (len === 0) {
            return -1;
        }
 
        var n = 0;
 
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
 
        if (n >= len) {
            return -1;
        }
 
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
 
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

/******
* Analytics.js class
* 
******/


var Analytics_t3;
Analytics_t3 = (function(){
	
	function Analytics_t3(flag){
		this.init();
	}
	

	Analytics_t3.getDomain = function(){
	    var arr_uri = location.hostname.match(/^(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i);
	    if(arr_uri == null) return ".localhost";
    	arr_uri[2] = "." + arr_uri[2];
    	return arr_uri[2];
	};
	Analytics_t3.prototype.setBaseURL = function(value){
		this._baseURL = value;
	}
	Analytics_t3.prototype.getBaseURL = function(){
		return this._baseURL;
	};
	Analytics_t3.prototype.getVc = function(){
		return this._vc;
	};
	Analytics_t3.prototype.setVc = function(value){
		this._vc = value;
	};
	Analytics_t3.prototype.getSelf = function(){
		return this._self;
	};
	Analytics_t3.prototype.setSelf = function(value){
		this._self = value;
	};
	Analytics_t3.prototype.getCid = function(){
		return this._cid;
	};
	Analytics_t3.prototype.setCid = function(value){
		this._cid = value;
	};
	Analytics_t3.prototype.getSid = function(){
		return this._sid;
	};
	Analytics_t3.prototype.setSid = function(value){
		this._sid = value;
	};
	
	// set from external
	Analytics_t3.prototype.getUrl = function(){
		return this._url;
	};
	Analytics_t3.prototype.setUrl = function(value){
		this._url = value;
	};
	Analytics_t3.prototype.getRef = function(){
		return this._ref;
	};
	Analytics_t3.prototype.setRef = function(value){
		this._ref = value;
	};
	Analytics_t3.prototype.getSvcid = function(){
		return this._svcid;
	};
	Analytics_t3.prototype.setSvcid = function(value){
		this._svcid = value;
	};
	Analytics_t3.prototype.getVid = function(){
		return this._vid;
	};
	Analytics_t3.prototype.setVid = function(value){
		this._vid = value;
	};
	Analytics_t3.prototype.getUid = function(){
		return this._uid;
	};
	Analytics_t3.prototype.setUid = function(value){
		this._uid = value;
	};
	Analytics_t3.prototype.getTotal = function(){
		return this._total;
	};
	Analytics_t3.prototype.setTotal = function(value){
		this._total = value;
	};
	Analytics_t3.prototype.getPid = function(){
		return this._pid;
	};
	Analytics_t3.prototype.setPid = function(value){
		this._pid = value;
	};

	Analytics_t3.prototype.getTagType = function(){
		return this._tagType;
	};
	Analytics_t3.prototype.setTagType = function(value){
		this._tagType = value;
	};

	Analytics_t3.prototype.getObject = function () {
	    return this._object;
	}
	Analytics_t3.prototype.setObject = function (value) {
	    this._object = value;
	}
	Analytics_t3.prototype.getHistory = function () {
	    return this._history;
	}
	Analytics_t3.prototype.setHistory = function (value) {
	    this._history = value;
	}


	Analytics_t3.prototype.requestUpdate = function(req){
		this.requestExec(req);
	};

	Analytics_t3.prototype.lastBeacon = "";
	Analytics_t3.prototype.request = function(obj){
		if(this.lastBeacon == obj.stat){
			return;
		}
		this.lastBeacon = obj.stat;
		this.requestExec(obj);
	};
	Analytics_t3.prototype.request2 = function (obj) {
	    if (this.lastBeacon == obj.stat) {
	        return;
	    }
	    this.lastBeacon = obj.stat;
	    this.requestExec(obj);
	};

	Analytics_t3.prototype.requestExec = function(obj) {

		var urlstr = this.genURL(obj);
		if(urlstr != "")
			this.send(urlstr);
	}
	/**
	 * actual sending process
	 * @param urlstr URL(beacon)
	 */
	Analytics_t3.prototype.send = function(urlstr){
		var target = document.createElement("script");
		target.src = urlstr;
		document.body.appendChild(target);
		document.body.removeChild(target);
	};
	/**
	 * setup beacon url
	 * @param dataobj beacon object
	 */
	Analytics_t3.prototype.genURL = function(dataobj){
		jstream_t3.utils.Logger.stateLog({
			time: dataobj.playhead,
			va : dataobj.stat
		});
		jstream_t3.utils.Logger.log(dataobj.stat, ",,,");
		// set mandatory values
		var res = this.getBaseURL();
		if(this.getSvcid()  === undefined || this.getSvcid()  === null || this.getSvcid()  === "") return "";
		res += "?sv=" 	+ encodeURIComponent(this.getSvcid());
		if(dataobj.playhead === undefined || dataobj.playhead === null || dataobj.playhead === "") return "";
		res += "&s=" 	+ encodeURIComponent(dataobj.playhead);
		if (dataobj.stat    === undefined || dataobj.stat     === null || dataobj.stat     === "") return "";
		res += "&e=" 	+ encodeURIComponent(dataobj.stat);
		if (this.getVid()   === undefined || this.getVid()    === null || this.getVid()    === "") return "";
		res += "&v=" 	+ encodeURIComponent(this.getVid());
		res += "&lt="   + encodeURIComponent(new Date().getTime());

		if(this.getVc()){	   res += "&vc="      + encodeURIComponent(this.getVc());}
		if(this.getSid()){	   res += "&sd="      + encodeURIComponent(this.getSid());}
		if(this.getUid()){	   res += "&u="       + encodeURIComponent(this.getUid());}
		if(this.getPid()){	   res += "&p="       + encodeURIComponent(this.getPid());}
		
		if(this.getCid()){	   res += "&cd=" 	  + encodeURIComponent(this.getCid());}
		if(this.getRef()){	   res += "&rf=" 	  + encodeURIComponent(this.getRef());}
		if(this.getSelf()){    res += "&url="     + encodeURIComponent(this.getSelf()); }
        if(this.getObject()){  res += "&o="       + encodeURIComponent(this.getObject()); }
        if(this.getTagType()){ res += "&tagtype=" + encodeURIComponent(this.getTagType()); }

		res += "&t="	+ encodeURIComponent(this.getTotal());
		
		// set the rest of values
		var excludeParams = ["playhead", "stat"];
		for(var key in dataobj){
			var isExcludeParam = excludeParams.indexOf(key);
			if(isExcludeParam < 0){
				res += "&" + key + "=" + encodeURIComponent(dataobj[key]);
			}
		}
		
		return res;
	};
	
	Analytics_t3.prototype.setEvents = function(playerAPI)
	{
	    var _this = this;
	    var history = this.getHistory();
		//_this.api = playerAPI;
		playerAPI.addEventListener("change_state", function(e){

			var req = {
	            playhead: playerAPI.getCurrentTime(),
	            stat: playerAPI.state
			};
			if (/iP(hone|od|ad)/.test(navigator.platform)) {
			    var appVersion = window.navigator.appVersion.toLowerCase();
			    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			    var iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
			    if (iosVersion[0] < 8) {
			        if (req.stat == "paused" && req.playhead <= 0) {
			            req.playhead = playerAPI.last2Time;
			        }
			        if (req.stat == "playing" && playerAPI.video_event == "pause" && req.playhead <= 0) {
			            req.playhead = playerAPI.last2Time;
			        }
			    }
			}
			var enviroment = playerAPI.model.getEnvironmentType();
			if (enviroment == jstream_t3.EnviromentKind.PC_PROGRESSIVE || enviroment == jstream_t3.EnviromentKind.HLSJS) {
			    if (req.stat == "seek_start" || req.stat == "paused") {
			        req.playhead = playerAPI.lastTime;
			    }
			}
			if (history.length >= 5) {
			    return;
			}
			if (history.length == 0) {
			    setInterval(function () {
			        history = new Array();
			        _this.setHistory = history;
			    }, 1000)
			}
			switch(playerAPI.state){
				case "landing":
					_this.request(req);
					break;
				case "playing":
				    // playing
				    history.push(playerAPI.state);
					_this.request(req);
					break;
				case "paused":
				    // stopping
				    history.push(playerAPI.state);
					_this.request(req);
					break;
				case "seek_start":
				    // start seeking
				    history.push(playerAPI.state);
				    req.stat = "paused";
					_this.request(req);
					break;
				case "complete":
				    // complete
				    req.playhead = 0;
					_this.request(req);
					break;
				case "exit":
					// exit
					req.stat = "exit"
					_this.request(req);
					break;
			}
		});

		playerAPI.addEventListener("update",function(e){
			var req = {
	            playhead: playerAPI.getCurrentTime(),
	            stat: "updated"
	        };
			_this.requestUpdate(req);
		});

		playerAPI.addEventListener("exit", function(){
			var req = {
	            playhead: playerAPI.getCurrentTime(),
	            stat: "exit"
	        };
	        _this.request(req);
		})
	};

	Analytics_t3.prototype.sendClickBeacon = function(type, time) {
		// click beacon
		var clickReq = {
		    playhead: time,
		    c: type,
		    stat: "click"
		};
		if (clickReq.c == "replay") {
		    clickReq.playhead = 0;
		}
		this.requestUpdate(clickReq);
	};	
	
	/**
	 * initializing
	 * set values that Analytics_t3 class generates itself.
	 */
	Analytics_t3.prototype.init = function(){
		// initializing value
		this.setSelf(encodeURIComponent(document.location.href));
		this.setVc(Analytics_t3.random(4));
		
		// get from url
		var cid = this.getQuerystring("cid", "");
		var sid = this.getQuerystring("sid", "");
		
		// the case cannot get from url
		if(cid == ""){
			this.setCid(Analytics_t3.createCid());
		}else{
			this.setCid(cid);
		}
		if(sid == ""){
			this.setSid(Analytics_t3.createSid());
		}else{
			this.setSid(sid);
		}
		this.setHistory(new Array());
		// set baseURL
		this.initBaseURL();
	};
	/**
	 * set beacon url
	 */
	Analytics_t3.prototype.initBaseURL = function()
	{
		var protocol = "http";
		if(location.href.indexOf("https://") == 0){
			protocol = "https";
		}
		this._baseURL = protocol + '://eq-beacon.stream.co.jp/va/';
	};
	
	/**
	 * get value from url query
	 * @param key 
	 * @param default_ 
	 */
	Analytics_t3.prototype.getQuerystring = function(key, default_)
	{  
	   if (default_==null) default_="";  
	   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");  
	   var qs = regex.exec(window.location.href);  
	   if(qs == null)  
	    return default_;  
	   else  
	    return qs[1];  
	};
	
	return Analytics_t3;
})();

// static
Analytics_t3.setCookieSID = function(sid){
	var tmp = 'VA_SESSION_ID=' + sid + ';';  
	tmp += ' path=/;';
	if(Analytics_t3._domain) tmp += ' domain=' + Analytics_t3._domain + ';';
	document.cookie=tmp;
};
Analytics_t3.createSid = function(){
    if (document.cookie) {
    	// retrieve from cookie
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var str = cookies[i].split("=");
            if(str[0] == 'VA_SESSION_ID'){
                return str[1];
            }
        }
    }

	var sid = Analytics_t3.random(32);
	Analytics_t3.setCookieSID(sid);
    return sid;
};

// set value to cookie
Analytics_t3.setCookieCID = function(cid){
	var dt = new Date();
    dt.setFullYear(dt.getFullYear() + 1);
    var tmp = 'VA_CONV_ID=' + cid + ';';
    tmp += ' path=/;';
    tmp += ' expires=' + dt.toGMTString() + ';';
    if(Analytics_t3._domain) tmp += ' domain=' + Analytics_t3._domain + ';';
    document.cookie = tmp;
};
Analytics_t3.createCid = function(){
	Analytics_t3._domain = this.getDomain();
	if (document.cookie) {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var str = cookies[i].split("=");
            if(str[0] == 'VA_CONV_ID'){
                var _VANAY_CID = str[1];
                
                Analytics_t3.setCookieCID(_VANAY_CID);
                return str[1];
            }
        }
    }

    var cid = Analytics_t3.random(32);
    Analytics_t3.setCookieCID(cid);
    
    return cid;
};
/**
 * VANAY_RANDOM
 */
Analytics_t3.random = function(n){
	var seed = 'abcdefghijklmnopqrstuvwxyz'
	    + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	    + '0123456789';
	seed = seed.split('');
	var s = '';
    for (var i = 0; i < n; i++) {
        s += seed[Math.floor(Math.random() * seed.length)];
    }
    return s;
};
var JMCPlayer;

if (typeof JMCPlayer === "undefined" || JMCPlayer === null) {
	JMCPlayer = function(id, params) {
	if(this.isT3(params)){
		this.flashVars = params || new jstream_t3.model.EQPlayerMode();
			this.targetElementID = "eq-"+id;
	    this.fieldID = "eqField-"+id;
	    this.isMobile = jstream_t3.utils.Util.isMobileList();
	    this.accessor = jstream_t3.EQPlayerAccessAPIBuilder.create(this);

	    
	    this.objectID = this.accessor.objectID;
	    if(JMCPlayer.kinds == null) {
	      JMCPlayer.kinds = new jstream_t3.resource.LanguageResource().kinds;
	    }
	}else{
		this.flashVars = params || new jstream.model.EQPlayerMode();
			this.targetElementID = "eq-"+id;
	    this.fieldID = "eqField-"+id;
	    this.isMobile = jstream.utils.Util.isMobileList();
	    this.accessor = jstream.EQPlayerAccessAPIBuilder.create(this);

	    
	    this.objectID = this.accessor.objectID;
	    if(JMCPlayer.kinds == null) {
	      JMCPlayer.kinds = new jstream.resource.LanguageResource().kinds;
	    }
	}
    
		JMCPlayer.instance = this;
	};
	
	JMCPlayer.browserLanguage = function(obj) {
		if(obj === "v3"){
			return jstream_t3.utils.Util.browserLanguage();
		}else{
			return jstream.utils.Util.browserLanguage();
		}
	}

	JMCPlayer.getStartTime = function (){
		return location.hash.replace( /^#/, '' ); 
	}
  JMCPlayer.prototype.fieldID = "eqFieldID";
  JMCPlayer.prototype.targetElementID= "";
  JMCPlayer.prototype.flashVars= null;
  JMCPlayer.prototype.metaData= {};
  JMCPlayer.prototype.playerSetting= {};
  JMCPlayer.prototype.flashVarsList= [];

  JMCPlayer.prototype.create = function() {
    this.accessor.createPlayer();
  };


  JMCPlayer.prototype.getFlashVarsLength = function() {
    return this.flashVarsList.length;
  };

  JMCPlayer.prototype.getFlashVarsAt = function(index) {
    if(typeof(jstream_t3)!="undefined"){
		return jstream_t3.utils.Util.escapeObject(this.flashVarsList[index]);
    }else{
    	return jstream.utils.Util.escapeObject(this.flashVarsList[index]);
    }

  };
  
  JMCPlayer.prototype.getFlashVars = function() {
    return this.flashVars;
  };
  
  JMCPlayer.prototype.isT3 = function(params, i) {
  	var len;
	if(typeof(params.stype) == "undefined"){
		return false;
	}
	var majorVer=params.tagType.split("_")[1];
	if((params.stype == "s1" || params.stype == "s2")){
		if(params.tagType=="player_2_0_0beta_syn"){
			return false
		}
  		if(Number(majorVer) < 2){
			return false;
		}
  	}
  	//v3タグを使わないバージョンを列挙
  	var arr = ["player_1_0_0", "player_1_12_2", "player_1_12_3", "player_1_12_4", "player_1_15_0_syn"];
  	len = arr.length;
	i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
  	for ( ; i < len; i++ ) {
		// Skip accessing in sparse arrays
		if ( i in arr && arr[ i ] === params.tagType ) {
			return false;
		}
	}
	
	
	return true;
  };
 }/**
*	imba_t3.js ライブラリ
*
*	@author	いしかわ裕一郎
*	@version 0.10
*	@copyright Copyright (c) 2012 Alquimista Inc.
*	2013/07/04 kametani修正
*/
// charset="UTF-8"
(function(window)
{
	var	imba_t3 = {};
	var document = window.document;
	var _cb_on_init = [];
	var	_isReady = false;

	imba_t3.VERSION_TEXT = 'imba_t3.js version 0,10   Copyright 2012 Alquimista Inc.';

	/**
	*	この関数で登録した関数は、DOMが利用できるようになったら呼び出されます
	*/
	imba_t3.set_init_callback = function( fx_init )
	{
		if( _isReady ){
			fx_init() ;
		}
		else{
			_cb_on_init[_cb_on_init.length] = fx_init ;
		}
	}

	imba_t3._init_on_ready = function()
	{
		// kill the timer
		if (_timer) clearInterval(_timer);
		// quit if this function has already been called
		if( arguments.callee.done ) return;
		// flag this function so we don't do the same thing twice
		arguments.callee.done = true;
		// do stuff
		_isReady = true;

		for( var i = 0 ; i < _cb_on_init.length ; i ++ ){
			if( _cb_on_init[i] !== undefined ){
				_cb_on_init[i]();
				delete _cb_on_init[i];
			}
		}
	};

	if( document.addEventListener ){
		document.addEventListener("DOMContentLoaded", imba_t3._init_on_ready, false);
	}
	
	if( /WebKit/i.test(navigator.userAgent) ){
		var _timer = setInterval(	function()
									{
										if( /loaded|complete/.test(document.readyState) ){
											clearInterval(_timer);
											imba_t3._init_on_ready();
										}
									}, 
									10);
	}
	//window.onload = _init_on_ready;

	//////////////////////////////////////////////////////////////////////////////////
	//ユーティリティ関数
	imba_t3.util =
	{
		/**
		*	<を&lt;に、>を&gt;に置換します
		*	@param	string	src
		*	@return string
		*/
		sanitize:
			function( src )
			{
				return ( typeof src === 'string' ) ?
								src.toString().replace(/</g,'&lt;').replace(/>/g,'&gt;') :
								src ;
			}
	};	//imba.util
	//////////////////////////////////////////////////////////////////////////////////
	//node
	//DOMノードに関する各種作業
	//imba.nodeオブジェクトは、newでインスタンス化しません。
	//※imba.node.one/imba.node.allを呼び出して利用します。
	imba_t3.node = function( dom_node )
	{
		if( !dom_node ) throw( 'Illegal DOM node!' );
		//DOM node
		this.dom_node = dom_node ;
		//ユーザデータ（プログラマが自由に利用できます　see. setData/getData）
		this._data = {};
		//イベントcallback関数（こちらのリスナがすべて受けて、こちらから呼び出します）
		this._event_callbacks = {};
		//インスタンス化したノードは、保存しておく(DOM node から逆引きするため)
		if( !imba_t3.node.lookup( dom_node ) ){
			imba_t3.node._local_nodes[imba_t3.node._local_nodes.length] = this;
		}
	}

	/**
	*	オブジェクト名
	*	※toStringで返却される名前
	*/
	imba_t3.node._OBJECT_NAME = '[object imba_t3.node]';
	imba_t3.node.isImbaNode = function( _node )
	{
		if( _node && 
			_node.toString() == imba_t3.node._OBJECT_NAME ){
			return true ;
		}
		return false ;
	}

	/**
	*	document以下のノードを抽出
	*	
	*
	*/
	imba_t3.node.all = function( selector )
	{
		var rst = [];
		if( document.querySelectorAll ){
			var _nodes = document.querySelectorAll( selector );
			for( var i = 0 ; i < _nodes.length; i ++ ){
				rst[rst.length] = imba_t3.node.one( _nodes[i] );
			}
		}
		return rst ;
	}
	/**
	*	この関数でインスタンスを取得してください
	*	
	*/
	imba_t3.node.one = function( selector )
	{
		var _node = null ;
		if( selector ){
			if( imba_t3.node.isImbaNode( selector ) ) return selector ;
			
			if( selector.nodeType ){		//DOMNode
				_node = selector ;
			}
			else if( typeof selector === "string" ){	//文字列
				if( document.querySelector ){
					_node = document.querySelector( selector );	//セレクタでnodeを取得できる便利メソッド
				}
				else if( selector.match( /^#/ ) ){
					//querySelectorが定義されていないブラウザでは、Idによる取得のみ
					_node = document.getElementById( selector.substr( 1 ) );
				}
			}
		}
		if( _node ){
			var node = imba_t3.node.lookup( _node );
			if( node ){
				
				return node;
			}
			else{
				return new imba_t3.node( _node );
			}
		}
		return null;
	}

	imba_t3.node.remove = function( imbaNode )
	{
		if( imbaNode ){
			for( var i = 0 ; i < imba_t3.node._local_nodes.length ; i ++ ){
				if( imba_t3.node._local_nodes[i] &&
					imba_t3.node._local_nodes[i].DOMNode() == imbaNode ){
					delete imba_t3.node._local_nodes[i];
					delete imbaNode;
				}
			}
		}
	}

	imba_t3.node._local_nodes = [];	//imba.nodeでインスタンス化されているノード
	/**
	*	@param	object<DOMelement>	domNode	DOMのエレメント
	*	@return	imba.node		インスタンス化されていない場合にはnull
	*/
	imba_t3.node.lookup = function( domNode )
	{
		if( domNode ){
			for( var i = 0 ; i < imba_t3.node._local_nodes.length ; i ++ ){
				if( imba_t3.node._local_nodes[i] &&
					imba_t3.node._local_nodes[i].DOMNode() == domNode ){
					return imba_t3.node._local_nodes[i];
				}
			}
		}
		return null;
	}
	//imba.nodeのイベント用のハンドラ関数
	imba_t3.node._event_listener = function( e )
	{
		var node = imba_t3.node.lookup( this );
		if( node ){
			if( node._event_callbacks && node._event_callbacks[e.type] !== undefined){
				node._event_callbacks[e.type].call(node, new imba_t3.event(e) );

			}
		}
	}

	/**
	*	DOMノードを作成します
	*	※tagにclassを設定する場合、attributeのプロパティ名はclassNameとしてください
	*	@param	string	tag			HTMLタグ
	*	@param	object	attribute	このオブジェクトのプロパティをアトリビュートとしてセットします
	*	@param	string	inner_html	内部のHTML
	*/
	imba_t3.node.create = function( tag, attribute, inner_html )
	{
		var _node = document.createElement( tag );
		if( _node ){
			for( var _prop in attribute ){
				_node[_prop] = attribute[_prop];
			}
			if( inner_html ){
			    try {
                        _node.innerHTML = inner_html ;
				}
				catch( e ){
					//readOnly
					alert( inner_html );
				}
			}
		}
		return ( _node ) ?
					imba_t3.node.one( _node ) :
					null ;
	}

	//指定されたhtmlのタグを取得します
	imba_t3.node._extract_tag = function( text_html )
	{
		var rst = '';
		if( typeof text_html === 'string' ){
			var tag = text_html.match( /<([a-z]+)/i );
			if( tag && tag[1] ) rst = tag[1];
		}
		return rst ;
	}

	/**
	*	新しいノードを作成します
	*	@param string text_html		作成するHTMLテキスト
	*	@return object imba.node
	*/
	imba_t3.node.create2 = function( text_html )
	{
		var _tag = imba_t3.node._extract_tag( text_html );
		if( !_tag ) return null;
		
		var _inner = '';
		//divエレメントのinnerHTMLで使用できないものがあるので、それに関しては
		//fullで作成して、一部を抜き出す。
		//特に問題ないものは、そのまま使用する。
		switch( _tag.toLowerCase() )
		{
			case	'option':	//2番目に挿入する
				_inner = '<select><option></option>'+text_html+'</select>';
				break ;
			case	'tr':
				_inner = '<table><tbody>'+text_html+'</tbody></table>';
				break ;
			case	'td':
				_inner = '<table><tbody><tr>'+text_html+'</tr></tbody></table>';
				break ;
			case	'tbody':
			case	'thead':
				_inner = '<table>'+text_html+'</table>';
				break ;
			default:
				_inner = text_html;
				break ;
		}
		//div作成
		var _div = document.createElement( 'div' );
		try{
			_div.innerHTML = _inner ;
			var _children = _div.querySelectorAll( _tag );
			var rst = null ;
			if( _tag.toLowerCase() == 'option' ){//optionの場合は1つ目はdummyなので2つ目から取得する
				if( _children.length == 2 ) rst = imba_t3.node.one( _children[1] );
				else if( _children.length > 2 ){
					rst = [];
					for( var i = 1 ; i < _children.length ; i ++ ){
						rst[rst.length] = imba_t3.node.one( _children[i] );
					}
				}
			}
			else{
				if( _children.length == 1 ) rst = imba_t3.node.one( _children[0] );
				else if( _children.length > 1 ){
					rst = [];
					for( var i = 0 ; i < _children.length ; i ++ ){
						rst[rst.length] = imba_t3.node.one( _children[i] );
					}
				}
			}
		}
		catch(e){
			throw( 'Could no create['+e+']' );
		}
		return rst ;
	}

	//共通の内部関数(各インスタンスが共有する関数)
	//	※privateにしたい場合には、コンストラクタでthisのプロパティとして定義する
	imba_t3.node.prototype =
	{
		toString:
			function()
			{
				return imba_t3.node._OBJECT_NAME;
			},
		on:
			function( type, fx_callback )
			{
				if( this.dom_node ){
					this._event_callbacks[type] = fx_callback;
					if( this.dom_node.addEventListener ){
						this.dom_node.addEventListener( type, imba_t3.node._event_listener );
					}
					else if( this.dom_node.attachEvent ){	//for IE
						this.dom_node.attachEvent( type, imba_t3.node._event_listener );
					}
					else{
						throw( 'no EventListenerMethod' );
					}
				}
			},
		//ユーザデータ入出力
		setData:
			function( name, value )
			{
				if( this._data ){
					this._data[name] = value ;
				}
			},
		getData:
			function( name )
			{
				return ( this._data && this._data[name] !== undefined ) ?
												this._data[name] :
												null ;
			},
		setInner:
			function( inner_html )
			{
				this.set( 'innerHTML', inner_html );
			},
		getInner:
			function( sanitize )
			{
				var rst = this.get( 'innerHTML' );
				if( rst && sanitize ){
					rst = imba_t3.util.sanitize( rst );
				}
				return rst ;
			},
		getOuter:
			function( sanitize )
			{
				var rst = this.get( 'outerHTML' );
				if( rst && sanitize ){
					rst = imba_t3.util.sanitize( rst );
				}
				return rst ;
			},
		//DOM検索
		one:
			function( selector )
			{
				var rst = null ;
				if( this.dom_node && this.dom_node.querySelector ){
					var _node = this.dom_node.querySelector( selector );	//セレクタでnodeを取得できる便利メソッド
					if( _node != null ){
						rst = imba_t3.node.one( _node );
					}
				}
				return rst;
			},
		all:
			function( selector )
			{
				var rst = [];
				if( this.dom_node && this.dom_node.querySelectorAll ){
					var _nodes = this.dom_node.querySelectorAll( selector );
					for( var i = 0 ; i < _nodes.length; i ++ ){
						rst[rst.length] = imba_t3.node.one( _nodes[i] );
					}
				}
				return rst ;
			},
		//プロパティの入出力
		set:
			function( name, value )
			{
				if( this.dom_node ){
					this.dom_node[name] = value ;
				}
			},
		get:
			function( name )
			{
				if( this.dom_node ){
					return this.dom_node[name] ;
				}
				return undefined;
			},
		//スタイル関連の操作
		setStyle:
			function( name, value )
			{
				if( this.dom_node && this.dom_node.style ){
					this.dom_node.style[name] = value ;
				}
			},
		getStyle:
			function( name )
			{
				if( this.dom_node && this.dom_node.style ){
					return this.dom_node.style[name] ;
				}
				return undefined;
			},
		//nodeの階層操作
		appendChild:
			function( child )
			{
				if( this.dom_node && child.DOMNode ){
					this.dom_node.appendChild( child.DOMNode() );
				}
			},
		appendChilds:
			function( children )
			{
				//appendChildの配列対応（複数imba.node追加対応）
				if( this.dom_node ){
					if( typeof( children ) == 'object' && ( children instanceof Array ) ){
						for( var i = 0 ; i < children.length ; i ++ ){
							this.appendChild( children[i] );
						}
					}
					else{
						this.appendChild( children );
					}
				}
			},
		insertBefore:
			function( child, node_basis )
			{
				if( this.dom_node && child.DOMNode && node_basis.DOMNode ){
					this.dom_node.insertBefore( child.DOMNode(), node_basis.DOMNode() );
				}
			},
		removeChild:
			function( child )
			{
				if( this.dom_node && child.DOMNode ){
					this.dom_node.removeChild( child.DOMNode() );
				}
			},
		removeAllChild:
			function()
			{
				if( this.dom_node ){
					var childs = this.dom_node.childNodes ;
					for( var i = 0 ; i < childs.length ; i ++ ){
						this.dom_node.removeChild( childs[i] );
					}
				}
			},
		//class関連
		appendClass:
			function( cls )
			{
				if( !this.hasClass( cls ) ){
					if( this.dom_node ){
						if( !this.dom_node.className ){
							this.dom_node.className = cls ;
						}
						else{
							var tokens = this.dom_node.className.split( " " );
							tokens[tokens.length] = cls;
							this.dom_node.className = tokens.join(" ");
						}
					}
				}
			},
		removeClass:
			function( cls )
			{
				if( this.dom_node && this.dom_node.className ){
					var tokens = this.dom_node.className.split( " " );
					for( var i = 0 ; i < tokens.length ; i ++ ){
						if( tokens[i] == cls ){
							delete tokens[i];
							this.dom_node.className = tokens.join(" ");
							break;
						}
					}
				}
			},
		toggleClass:
			function( cls )
			{
				if( this.hasClass( cls ) ){
					this.removeClass( cls );
				}
				else{
					this.appendClass( cls );
				}
			},
		hasClass:
			function( cls )
			{
				var rst = false ;
				if( this.dom_node ){
					if( !this.dom_node.className ) this.dom_node.className = '';
					var tokens = this.dom_node.className.split( " " );
					for( var i = 0 ; i < tokens.length ; i ++ ){
						if( tokens[i] == cls ){
							rst = true ;
							break ;
						}
					}
				}
				return rst ;
			},
		DOMNode:
			function()
			{
				return this.dom_node;
			}

	};	//imba.node.prototype

	////////////////////////////////////////////////////////////////////////////////
	//event wrapper
	imba_t3.event = function( _event )
	{
		this._event = _event;
	}
	imba_t3.event._OBJECT_NAME = '[object imba_t3.event]';
	imba_t3.event.isImbaEvent = function( obj )
	{
		return (obj && 
				obj.toString() == imba_t3.event._OBJECT_NAME);
	}
	imba_t3.event.prototype = 
	{
		toString:
			function()
			{
				return imba_t3.event._OBJECT_NAME;
			},
		//プロパティの入出力
		set:
			function( name, value )
			{
				if( this._event ){
					this._event[name] = value ;
				}
			},
		get:
			function( name )
			{
				if( this._event ){
					return this._event[name] ;
				}
				return undefined;
			},
		//これ以上のバブリングをやめる
		stopBubble:
			function()
			{
				//イベントのこれ以上のバブルを禁止
				if( this._event ){
					if( this._event.stopPropagation ) this._event.stopPropagation();
					else this._event.cancelBubble = true ;	//for IE
				}
			},
		//デフォルトの処理をやめる
		stopDefault:
			function()
			{
				//このイベントに対するデフォルトの挙動を抑制
				if( this._event ){
					if( this._event.preventDefault ) this._event.preventDefault();
					else this._event.returnValue = false;		//for IE
				}
			},
		//targetをimba.nodeで取得します	
		getTarget:
			function()
			{
				return ( this._event && this._event.target ) ?
												imba_t3.node.one( this._event.target ) :
												null ;
			},
		//currentTargetをimba.nodeで取得します	
		getCurrentTarget:
			function()
			{
				return ( this._event && this._event.currentTarget ) ?
												imba_t3.node.one( this._event.currentTarget ) :
												null ;
			},
		getEvent:
			function()
			{
				return this._event;
			}

	};

	////////////////////////////////////////////////////////////////////////////////
	//imbaライブラリをwindowにセット
	window.imba_t3 = imba_t3;

})(window);
/**
	mekaライブラリ.
	2013/07/04
*/
(function(window)
{
	var	meka_t3 = {};
	var document = window.document;
	
	meka_t3.set_nodeStyleSize = function (node,width,height) 
	{
		if( width >= 0) node.setStyle('width' ,width + "px");
		if( height>= 0) node.setStyle('height',height+ "px");
	}

	meka_t3.set_nodeStylePosition = function (node,left,top) 
	{
		node.setStyle('left' ,left + "px");
		node.setStyle('top'  ,top  + "px");
	}
	
	meka_t3.set_nodeStyleBox =	function ( node,top,left,width,height )
	{
		meka_t3.set_nodeStylePosition (node,top,left);
		meka_t3.set_nodeStyleSize ( node,width,height);
	}
	
	/**
	*	スライダの生成
	*	@param object	config	スライダプロパティ
	*			プロパティ
	*					skin: 		string		スキン名(ユニークID）			default 'normal'
	*					parent: 	node		ハウジングするノード
	*					dir: 		string		方向							'horizontal'か'vertical'
	*					width: 		string		幅(横スライダのときに利用)		default '200px'
	*					height: 	string		高さ(縦スライダのときに利用)	default '200px'
	*					minValue: 	numeric		最小値
	*					maxValue: 	numeric		最大値
	*					init_value: numeric		初期値
	*					prefix:		string		設定するIDの接頭詞				default''
	*
	*/
	meka_t3.range = function(config){
		this.prop = {
						skin: 'normal',
						parent: null,				//imba.node
						dir: 'horizontal',			//or vertical
						width: '200px',				//horizontalのときに使用(スライダの表示サイズ)
						height: '200px',			//verticalのときに使用(スライダの表示サイズ)
						minValue: 0,				//最小値
						maxValue: 100,				//最大値
						init_value: 0,				//初期値
						value:50,
						prefix:''
					};

		// デフォルト値を指定値に入替
		if( config ){
			for( var _prop in config ){
				this.prop[_prop] = config[_prop] ;
			}
		}
		
		// 初期値設定
		this.value = this.prop.init_value;
		
		// スライダーノードの生成
		this.node_slider_rail = this._createNode();
		
		// ノードの登録
		this.prop.parent.appendChild( this.node_slider_rail );
		
		// ノードの詳細保存
		this.node_slider_rail  = document.getElementById( this.prop.prefix + this._getBaseClassName() + '_rail');
		this.node_slider_thumb = document.getElementById( this.prop.prefix + this._getBaseClassName() + '_thumb');
		this.node_slider_dist = document.getElementById(this.prop.prefix + this._getBaseClassName() + '_dist');
		this.node_slider_area = this.prop.parent.parentElement.parentElement.childNodes[0];

		//サイズセット
		if( this.isHorizontal() )	this.node_slider_rail.style[ 'width' ] = this.prop.width ;
		else						this.node_slider_rail.style[ 'height'] = this.prop.height ;
		
		this.fx_update_callback = null ;						//更新通知関数
		//initial update
		
		var ctx = this;
		setTimeout(	function(){meka_t3.range._initial_update.call( ctx );}, 10 );
		
	    // イベント登録
		if (this.node_slider_rail.addEventListener) {
		    var ua = window.navigator.userAgent.toLowerCase();
		    if ((ua.indexOf('iphone') > 0
                || ua.indexOf('ipad') > 0
                || (ua.indexOf('android') > 0) 
                || ua.indexOf('windows phone') > 0)) {
		        this.node_slider_rail.addEventListener('touchstart', _handle_touch, false);
		        this.node_slider_rail.addEventListener('touchmove', _handle_touch, false);
				if(this.prop.skin == "movie"){
		        	this.node_slider_area.addEventListener('touchstart', _handle_touch, false);
		        	this.node_slider_area.addEventListener('touchmove', _handle_touch, false);
				}
		    } else {
		        //PC対応
		        this.node_slider_rail.addEventListener('dragend', _handle_dragend, false);
		        this.node_slider_rail.addEventListener('mousedown', _handle_mousedown, false);
		        //this.node_slider_rail.addEventListener('mouseup', _handle_mouseup, false);
				if(this.prop.skin == "movie"){
		        	this.node_slider_area.addEventListener('dragend', _handle_dragend, false);
		        	this.node_slider_area.addEventListener('mousedown', _handle_mousedown, false);
				}
		        document.addEventListener("mousemove", MouseMoveFunc);
		    }
		} else {
		    this.node_slider_rail.attachEvent('ontouchstart', _handle_touch, false);
		    this.node_slider_rail.attachEvent('ontouchmove', _handle_touch, false);
		    
		    //PC対応
		    //this.node_slider_rail.attachEvent('drag', _handle_mouse, false);
		    this.node_slider_rail.attachEvent('ondragend', _handle_dragend, false);
		    this.node_slider_rail.attachEvent('onmousedown', _handle_mousedown, false);
		    this.node_slider_rail.attachEvent('onmouseup', _handle_mouseup, false);
			if(this.prop.skin == "movie"){
				this.node_slider_area.attachEvent('ontouchstart', _handle_touch, false);
		    	this.node_slider_area.attachEvent('ontouchmove', _handle_touch, false);
				this.node_slider_area.attachEvent('ondragend', _handle_dragend, false);
				this.node_slider_area.attachEvent('onmousedown', _handle_mousedown, false);
				this.node_slider_area.attachEvent('onmouseup', _handle_mouseup, false);
			}
		    document.attachEvent('onmouseup', _handle_mouseup, false);
		    document.attachEvent("onmousemove", MouseMoveFunc);
		}
		
		this.node_slider_rail.style["draggable"] = "false";
		this.node_slider_rail.style["cursor"] = "pointer";
		ctx.paint();
		var mouse_x;
		var mouse_y;
		var timer;
        var val

		function MouseMoveFunc(e){

		    mouse_x = e.clientX;
		    mouse_y = e.clientY;
		}
		
		function _handle_mousedown(event) {
		    clearInterval(timer);
		    _handle_mouse()
		    timer = setInterval(_handle_mouse, 100);
		    document.addEventListener('mouseup', _handle_mouseup, false);
		    ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/msie/) || ua.match(/trident/) || !!ua.match(/mozilla\/.+windows nt 10\.[0-9].+chrome.+safari.+edge\/[0-9\.]+/i)) {
		        document.body.addEventListener('mouseleave', _handle_mouseup, false);
		    }
		    //console.log("mousedown");
		}

		function _handle_mouseup(event) {
		    clearInterval(timer);
		    document.removeEventListener('mouseup', _handle_mouseup, false);
		    ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/msie/) || ua.match(/trident/) || !!ua.match(/mozilla\/.+windows nt 10\.[0-9].+chrome.+safari.+edge\/[0-9\.]+/i)) {
		        document.body.removeEventListener('mouseleave', _handle_mouseup, false);
		    }
		    ctx.fx_update_callback(ctx._dp2lp(val));
		    //console.log("mouseup");
		}
		function _handle_dragend(event) {
		    clearInterval(timer);
		    document.removeEventListener('mouseup', _handle_mouseup, false);
		    //console.log("dragend");
		}

		function _handle_touch(event)
		{
			event.preventDefault();
			ev = event.touches[0];

			thumb = document.getElementById(ctx.prop.prefix+  ctx._getBaseClassName() + '_thumb');
			obj   = document.getElementById(ctx.prop.prefix+  ctx._getBaseClassName() + '_rail');
			dist  = document.getElementById(ctx.prop.prefix+  ctx._getBaseClassName() + '_dist');

			palRect = ctx.node_slider_rail.getBoundingClientRect();
			thumbRect = ctx.node_slider_thumb.getBoundingClientRect();
			_value = 0;
			thumb.style.opacity = 0.5;
			
			if( ctx.isHorizontal() ){	// 横
				// 親オブジェクトのサイズ
				w  = ctx.node_slider_rail.clientWidth;
				// スライダーのサイズ
				tw = ctx.node_slider_thumb.clientWidth;
				
				// スクリーンスクロール考慮
				var scrL = document.documentElement.scrollLeft || document.body.scrollLeft;
				// 親オブジェクト基準の新座標
				mx = parseInt(ev.pageX,10) - palRect['left'] -scrL ;
//				mx = parseInt(ev.pageX,10) - ctx.node_slider_rail.offsetLeft ;
				if( mx < 0 ) mx = 0;
				if( mx > w ) mx = w;
				
				// 座標更新
				_value = mx;
				ctx.node_slider_thumb.style.left = (mx-tw/2) +"px";
				
				// distの幅も更新
				ctx.node_slider_dist.style.width = mx + "px";
			}else{
				// 縦
				// 親オブジェクトのサイズ
				h  = ctx.node_slider_rail.clientHeight;
				
				// スライダーのサイズ
				th = ctx.node_slider_thumb.clientHeight;
				
				// スクリーンスクロール考慮
				var scrT = document.documentElement.scrollTop || document.body.scrollTop;
				
				// 親オブジェクト基準の新座標
				my = parseInt(ev.pageY,10) - palRect['top' ] -scrT;
//				my = parseInt(ev.pageY,10) - ctx.node_slider_rail.offsetTop;
				if( my < 0 ) my = 0;
				if( my > h ) my = h;
				
				// distの幅も更新
				dist.style['top'] = my + "px";
				dist.style['height'] = (h-my) + "px";
				
				// 座標更新
				_value = my;
				
				// 座標更新
				_value = my;
				ctx.node_slider_thumb.style.top = (my - th/2) +"px";
				
				// distの幅/高さも更新
				ctx.node_slider_dist.style.top    = my + "px";
				ctx.node_slider_dist.style.height = (h-my) + "px";
			}
						thumb.style.opacity = 1;

			ctx.fx_update_callback( ctx._dp2lp(_value));
		}

		function _handle_mouse()
		{
		    //console.log(mouse_x + "," + mouse_y);
		    //event.preventDefault();
		    //ev = event.touches[0];
		    //ev = event;

		    thumb = document.getElementById(ctx.prop.prefix+  ctx._getBaseClassName() + '_thumb');
		    obj   = document.getElementById(ctx.prop.prefix+  ctx._getBaseClassName() + '_rail');
		    dist  = document.getElementById(ctx.prop.prefix+  ctx._getBaseClassName() + '_dist');

		    palRect = ctx.node_slider_rail.getBoundingClientRect();
		    thumbRect = ctx.node_slider_thumb.getBoundingClientRect();
		    _value = 0;
		    thumb.style.opacity = 0.5;
			
		    if( ctx.isHorizontal() ){	// 横
		        // 親オブジェクトのサイズ
		        w  = ctx.node_slider_rail.clientWidth;
		        // スライダーのサイズ
		        tw = ctx.node_slider_thumb.clientWidth;
				
		        // スクリーンスクロール考慮
		        var scrL = document.documentElement.scrollLeft || document.body.scrollLeft;
		        // 親オブジェクト基準の新座標
		        mx = parseInt(mouse_x, 10) - palRect['left'] - scrL;
		        //				mx = parseInt(ev.pageX,10) - ctx.node_slider_rail.offsetLeft ;
		        if( mx < 0 ) mx = 0;
		        if( mx > w ) mx = w;
				
		        // 座標更新
		        _value = mx;
		        ctx.node_slider_thumb.style.left = (mx-tw/2) +"px";
				
		        // distの幅も更新
		        ctx.node_slider_dist.style.width = mx + "px";
		    }else{
		        // 縦
		        // 親オブジェクトのサイズ
		        h  = ctx.node_slider_rail.clientHeight;
				
		        // スライダーのサイズ
		        th = ctx.node_slider_thumb.clientHeight;
				
		        // スクリーンスクロール考慮
		        var scrT = document.documentElement.scrollTop || document.body.scrollTop;
				
		        // 親オブジェクト基準の新座標
		        my = parseInt(mouse_x, 10) - palRect['top'] - scrT;
		        //				my = parseInt(ev.pageY,10) - ctx.node_slider_rail.offsetTop;
		        if( my < 0 ) my = 0;
		        if( my > h ) my = h;
				
		        // distの幅も更新
		        dist.style['top'] = my + "px";
		        dist.style['height'] = (h-my) + "px";
				
		        // 座標更新
		        _value = my;
				
		        // 座標更新
		        _value = my;
		        ctx.node_slider_thumb.style.top = (my - th/2) +"px";
				
		        // distの幅/高さも更新
		        ctx.node_slider_dist.style.top    = my + "px";
		        ctx.node_slider_dist.style.height = (h-my) + "px";
		    }
		    thumb.style.opacity = 1;

            val=_value
		    //ctx.fx_update_callback( ctx._dp2lp(_value));
		}
	
	}

	
	meka_t3.range.prototype = 
	{
	_getBaseClassName:
		function()
		{
			var rst = '';
			try{
				rst = 'slider-'+this.prop.skin+'-'+( this.isHorizontal() ? 'h' : 'v' );
			}
			catch(e){
				rst = '';
			}
			return rst;
		},
	_createNode :
		function() 
		{
			cls_name = this._getBaseClassName();
			node = document.createElement( 'div' );
			node.innerHTML = '<div id="'+ this.prop.prefix + cls_name +'_dist" class="'+ cls_name +'_dist" ></div><div id="'+ this.prop.prefix + cls_name+'_thumb" class="'+ cls_name+'_thumb"></div>';
			node['id'] = this.prop.prefix + cls_name + "_rail";
			node['className'] = cls_name + "_rail";
			return node;
		},
	
	//値をピクセルに変更します(指定値が表示上どの位置なのかを取得)
	_lp2dp:
		function( logical_pos )
		{
			var device_range = this.getMotionRange();
			var dp = ( logical_pos - this.prop.minValue ) *  device_range / ( this.prop.maxValue - this.prop.minValue ) ;
			return ( this.isHorizontal() ) ?
									dp :
									( device_range - dp );
			
		},
	//ピクセルを値に変更します(表示位置に対する値を取得します)
	_dp2lp:
		function( device_pos )
		{
			var device_range = this.getMotionRange();
			var lp = device_pos * ( this.prop.maxValue - this.prop.minValue )  * 1 / device_range + this.prop.minValue ;
			return ( this.isHorizontal() ) ?
									lp :
									( ( this.prop.maxValue - this.prop.minValue ) - lp );
		},
	
	//コントロールのスクリーン上の可動範囲(幅)(pixel数)を取得します
	getMotionRange:
		function()
		{
			var rail_size	= 0;
			if( this.isHorizontal() ){
				rail_size	= this.node_slider_rail.clientWidth;
			}
			else{
				rail_size	= this.node_slider_rail.clientHeight;
			}
			return	rail_size;
		},
	/**
	*	再描画します
	*/
	paint:
		function()
		{
			var pos = this._lp2dp( this.value ) ;
			
			if( this.isHorizontal() ){
				this.node_slider_thumb.style['left'] = (pos - (this.node_slider_thumb.clientWidth)/2) +'px' ;
				this.node_slider_dist.style['width'] = pos +'px';
			}
			else{
				this.node_slider_thumb.style['top'] = (pos + (this.node_slider_thumb.clientWidth)/2 )+'px' ;
				this.node_slider_dist.style['top'] = pos +'px';
				this.node_slider_dist.style['height'] = (this.node_slider_rail.clientHeight - pos)+'px';
			}
		},
	/**
	*	値をセットします
	*	@param	numeric	value		値  (minValue～maxValueの範囲外の場合は、範囲内に丸められます)
	*	@param	boolean	no_redraw	true..再描画しない　※つまみがドラッグされたときなどは、再描画する必要はありません
	*	@param	boolean	do_callback	true..値をセットした後に更新コールバックが呼び出されます
	*/	
	setValue:
		function( value, no_redraw, do_callback )
		{
			if( this.prop.maxValue < value )		this.value = this.prop.maxValue ;
			else if( this.prop.minValue > value )	this.value = this.prop.minValue ;
			else									this.value = value;
			
			if( !no_redraw ) this.paint();
			if( do_callback && 
				this.fx_update_callback ){
				this.fx_update_callback.call( this, this.value );
			}
		}, 
	/**
	*	値を取得します
	*/	
	getValue:
		function()
		{
			return this.value ;
		},
	/**
	*	更新コールバックのセット
	*	@param function(numeric)	fx_callback		setValueのdo_callbackをtrueにしたときのオペレーションで呼び出される関数
	*/
	setUpdateCallback:
		function( fx_callback )
		{
			this.fx_update_callback = fx_callback ;
		},
	//横スライダ？
	isHorizontal:
		function()
		{
			return ( this.prop && this.prop.dir && ( this.prop.dir == 'horizontal' ) );
		},
	//縦スライダ？
	isVertical:
		function()
		{
			return ( this.prop && this.prop.dir && ( this.prop.dir == 'vertical' ) );
		},
	// 最大値更新
	setLimitValue:
		function(minValue,maxValue)
		{
			this.prop.maxValue = maxValue;
			this.prop.minValue = minValue;
		}
	}
	
	/**
	*	初回更新
	*	※表示位置やサイズが確定した段階で、描画して終了
	*/
	meka_t3.range._initial_update = function()
	{
		var ctx = this ;
		if( meka_t3.range.prototype.getMotionRange.call( ctx ) == 0 ){
			setTimeout(	function(){ meka_t3.range._initial_update.call( ctx );},10 );
		}
		
		meka_t3.range.prototype.paint.call( ctx );
	}
	
	window.meka_t3 = meka_t3;
	
})(window);

/**
	2013/10/17	再生完了後のpause制御
*/
/*=========================================================*/

"use strict";
// Date.now未実装対策
Date.now || (Date.now = function () { return +new Date; });

function HTML5Player_t3() {
    imba_t3._init_on_ready();
    var _my = this;
    _my._nodes = new Object();
    _my._values = new Object();
    _my._defVals = new Object();

    //--------------------------------------------------
    _my._values.title_use = false;
    _my._values.replay_use = false;
    _my._values.exlink_use = false;
    _my._values.sns_use = false;
    _my._values.viraltag_use = false;
    _my._values.relatedMovie_use = false;
    _my._values.play_use = false;
    _my._values.time_use = false;
    _my._values.seek_use = false;
    _my._values.multibitrate_use = false;
    _my._values.fullscreen_use = false;
    _my._values.footer_use = false;
    _my._values.watermark_design = 1;
    _my._values.watermark_use = true;
    _my._values.volume_use = true;
    _my._values.caption_use = true;
    _my._values.playbackRate_use = true;

    _my._values.header_use = true;
    _my._values.ctrl_use = true;
    _my._values.loading_use = true;
    _my._values.is_iphone = false;
    _my._values.is_Chrome = false;
    _my._values.is_android = false;
    _my._values.is_android_40x = false;

    _my._values.responsive = "off";
    _my._values.start_time = 0;
    _my._values.loadedmetadata = false;
    _my._values.fullscreen = false;
    _my._values.movie_auth = false;
    _my._values.auth_input = false;
    _my._values.authed = false;
    _my._values.a = null;
    _my._values.resumeEnable = "off";
    _my._values.isPlaying = false;

    _my._values.isLive = false;
    _my._values.LiveErrorCount = 0;
    _my._values.volume = 100;
    _my._values.preVolume = _my._values.volume;
    _my._values.init_play = false;
    _my._values.first_play = true;
    _my._values.isSeeking = false;
    _my._values.preSeekPlaying = false;
    _my._languageResource;
    _my._values.playbackRate = 1;
    _my._values.platform;

    _my._values.ctrl_color = "rgba(34, 34, 34, 0.8)";
    _my._values.seekbar_color = "linear-gradient(to bottom, #f8cb08, #ea7e01)"
    _my._values.font_color = "white";
    _my._values.font_family = "arial,sans-serif";

    _my._values.isSettingMenu_showing = false;
    _my._values.isSelectMenu_showing = false;

    _my._values.isStoped = false;
    //--------------------------------------------------
    // プレイヤータイプ定数
    _my.PS_NORMAL = 1;
    _my.PS_MIDDLE = 2;
    _my.PS_MINIMUM = 3;
    //--------------------------------------------------
    // 初期化
    // @param	jmcPlayer	情報が設定されたJMCPlayer
    // @param	videoID		videoタグに設定するID
    _my.init = function (jmcPlayer, videoID) {
        // debug-------------------------
        _my.version = "2.0_000";
        //-------------------------------


        var nodeName = '#' + jmcPlayer.fieldID;
        // プレイヤーの作成

        _my.videoID = videoID;
        _my.playerID = videoID;
        _my._values.movie_w = Math.floor(jmcPlayer.flashVars.movie_width);
        _my._values.movie_h = Math.floor(jmcPlayer.flashVars.movie_height);
        _my._values.width = _my._values.movie_w;
        _my._values.height = _my._values.movie_h;

        _my._values.jmcPlayer = jmcPlayer;
        _my._values.platform = jmcPlayer.flashVars.platform;
        _my._load_values();

        var playerNode = imba_t3.node.create('div',
            {
                id: _my.playerID + "player_main",
                className: "player_main"
            });
        playerNode.id = _my.playerID + "player_main";
        playerNode.className = "player_main";
        var videoMain = _my._create_tag()
        playerNode.dom_node.appendChild(videoMain);
        if (_my._values.footer_use) {
            var footer = _my._createTag("div", _my.playerID + "footer", "eq-footer", playerNode.dom_node);
            var footer_text = _my._createTag("div", _my.playerID + "footer_text", "footer_text", footer);
        }

        if (_my._values.responsive == "on") {
            var aspect = _my._values.movie_h / _my._values.movie_w * 100;
            playerNode.setStyle('padding-bottom', aspect + "%");
        } else if (_my._values.responsive == "fit") {
            playerNode.setStyle("width", "100%");
            playerNode.setStyle("height", "100%");
        } else {
            playerNode.setStyle('width', _my._values.movie_w + "px");
            playerNode.setStyle('height', _my._values.movie_h + "px");
        }


        var pnode = imba_t3.node.one(nodeName);
        //var pnode=document.getElementById(nodeName)
        if (pnode == null) return pnode;
        var live_mark = document.getElementById(_my.playerID + "live_mark");
        pnode.appendChild(playerNode);
        if (live_mark) {
            videoMain.insertBefore(live_mark, videoMain.firstChild);
        }
        pnode.set('className', 'jstream-eqPlayer h5_player ');
        
        _my._nodes.player_main = playerNode;
        if (jmcPlayer.flashVars.platform["isIE"] && Number(jmcPlayer.flashVars.platform["browser"]["version"]) == 9) {
            var video_main = document.getElementById(_my.playerID + "video_main");
            var video = document.createElement("video");
            video.id = _my.videoID;
            video.className = "h5_video";
            video_main.appendChild(video);
        }

        _my._init_nodes();
        _my._init_video();
        _my._init_video_state();
        _my._init_text();
        //fallback用Flash
        if (jstream_t3.utils.Util.isFlash()) {
            var swfHeight = (jmcPlayer.flashVars.isFooder() && !(jmcPlayer.flashVars.responsive == "on" || jmcPlayer.flashVars.responsive == "fit") ? jmcPlayer.flashVars.height - 20 : jmcPlayer.flashVars.height);
            if (!jmcPlayer.flashVars.isLive) {
                var q = "";
                if (jmcPlayer.flashVars.stype) {
                    q = "?stype=" + jmcPlayer.flashVars.stype;
                }
                var width = String(jmcPlayer.flashVars.width);
                var height = String(swfHeight);
                if (jmcPlayer.flashVars.responsive == "on" || jmcPlayer.flashVars.responsive == "fit") {
                    width = "100%";
                    height = "100%";
                }

                jstream_t3.utils.EmbedSwf.fallbackEmbed(_my.playerID, jmcPlayer.flashVars.playerDir + "EQPlayer.swf" + q, width, height, jmcPlayer.flashVars.thumbnail_url);
            } else {
                jstream_t3.utils.EmbedSwf.fallbackEmbed(_my.playerID, jmcPlayer.flashVars.playerDir + "EQLivePlayer.swf", String(jmcPlayer.flashVars.width), String(swfHeight));
            }
        }
        _my._nodes.player_main.dom_node.onmouseover = function () {
            _my._set_navi_visibled(true);
        };
        _my._nodes.player_main.dom_node.onmousemove = function () {
            _my._set_navi_visibled(true);
        }
        if (_my._values.jmcPlayer.accessor.model.isConnectionEneble() && (_my._values.platform["isSP"] || _my._values.platform["isTablet"])) {
            _my._values.init_play = false;
            _my._values.jmcPlayer.accessor.playCall();
        }
        if (_my._values.init_play && !(_my._values.platform["isSP"] || _my._values.platform["isTablet"])) {
            _my._values.init_play = false;
            if (_my._values.jmcPlayer.accessor.state == "landing" && !_my._values.jmcPlayer.accessor.model.isLightbox) {
                if (_my._values.jmcPlayer.flashVars.platform["isTablet"] || _my._values.jmcPlayer.flashVars.platform["isSP"]) {
                    if (_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable()) {
                        if (_my._values.auth_input) {
                            _my._set_login_visibled(true);
                        } else {
                            _my._values.jmcPlayer.accessor.login(null, null);
                        }

                    }
                } else {
                    setTimeout(function () { h5p.play(); }, 1000);
                }
            } else {
                _my._values.jmcPlayer.accessor.addEventListener("landing", function () {
                    if (_my._values.jmcPlayer.flashVars.platform["isTablet"] || _my._values.jmcPlayer.flashVars.platform["isSP"]) {
                        if (_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable()) {
                            if (_my._values.auth_input) {
                                _my._set_login_visibled(true);
                            } else {
                                _my._values.jmcPlayer.accessor.login(null, null);
                            }

                        }
                    } else {
                        setTimeout(function () { h5p.play(); }, 500);
                    }
                });
                _my._values.jmcPlayer.accessor.addEventListener("lightboxReady", function () {
                    if (_my._values.jmcPlayer.flashVars.platform["isTablet"] || _my._values.jmcPlayer.flashVars.platform["isSP"]) {
                        if (_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable()) {
                            if (_my._values.auth_input) {
                                _my._set_login_visibled(true);
                            } else {
                                _my._values.jmcPlayer.accessor.login(null, null);
                            }

                        }
                    } else {
                        setTimeout(function () { h5p.play(); }, 500);
                    }
                });
            }
        }
    };

    //--------------------------------------------------
    // タグ生成関連
    _my._create_tag = function () {
        var cssType = _my._get_css_suffix();
        var cssTypeWidth = _my._get_css_suffix("width");
        var cssTypeHeight = _my._get_css_suffix("height");
        var lang = "ja";
        if (jstream_t3.utils.Util.browserLanguage() != "ja") {
            lang = "en";
        }

        _my._languageResource = new jstream_t3.resource.LanguageResource(_my._values.jmcPlayer.flashVars["language_resource_" + lang]);
        var docfrag = document.createDocumentFragment();
        //main
        var videoMain = document.createElement("div");
        videoMain.id = _my.playerID + "video_main";
        videoMain.className = "video_main";

        //video
        var video = _my._createTag("video", _my.playerID, "h5_video", videoMain);
        video.setAttribute("preload", "metadata");
        if (!_my._values.jmcPlayer.accessor.model.platform["isSP"] && !_my._values.jmcPlayer.accessor.model.platform["isTablet"]) {
            video.crossOrigin = "Anonymous";
        }
        if (!_my._values.jmcPlayer.accessor.model.isLightbox) {
            video.setAttribute("playsinline", "");
        }

        //components
        var video_operation = _my._createTag("div", _my.playerID + "video_operation", "video_operation", videoMain);

        //watermark
        var play = _my._createTag("div", _my.playerID + "play", "play", video_operation);

        var play_state = _my._createTag("div", _my.playerID + "play_state", "play_state", play);

        if (_my._values.watermark_use) {
            if (_my._values.watermark_design == "1") {
                var play_state_wait = _my._createTag("div", _my.playerID + "play_state_wait", "play_state_wait1" + cssType, play_state);
            } else {
                var play_state_wait = _my._createTag("div", _my.playerID + "play_state_wait", "play_state_wait" + cssType, play_state);
            }
        }

        if (_my._values.loading_use) {
            var play_state_loading = _my._createTag("div", _my.playerID + "play_state_loading", "play_state_loading" + cssType, play_state);
        }

        if (_my._values.watermark_use) {
            var play_state_play = _my._createTag("div", _my.playerID + "play_state_play", null, play_state);

            play_state_play.id = _my.playerID + "play_state_play";
            if (_my._values.watermark_design == "1") {
                play_state_play.className = "play_state_play1" + cssType;
            } else {
                play_state_play.className = "play_state_play" + cssType;
            }

            var play_state_pause = _my._createTag("div", _my.playerID + "play_state_pause", "play_state_pause" + cssType, play_state);
        }
        if (_my._values.jmcPlayer.accessor.model.isLive && (_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS)) {
            var play_state_liveWait = _my._createTag("div", _my.playerID + "play_state_liveWait", "play_state_liveWait" + cssType, play_state);
            play_state_liveWait.textContent = "Liveに接続しています。しばらくお待ちください。";
            play_state_liveWait.style.color = "white";
        }
        //video button
        var btn_operation = _my._createTag("div", _my.playerID + "btn_operation", "btn_operation", video_operation);
        //controlls
        if (_my._values.ctrl_use) {
            var ctrl = _my._createTag("div", _my.playerID + "ctrl", "ctrl", video_operation);
            ctrl.style.backgroundColor = _my._values.ctrl_color;
            if (_my._values.seek_use) {
                var ctrl_video_seek_wrap = _my._createTag("div", _my.playerID + "ctrl_video_seek_wrap", "ctrl_video_seek_wrap", ctrl);
                var ctrl_video_seek_class = "ctrl_video_seek" + cssTypeWidth;
                if (!(_my._values.jmcPlayer.flashVars.platform["isTablet"] || _my._values.jmcPlayer.flashVars.platform["isSP"])) {
                    ctrl_video_seek_class += " seek_tooltip";
                }
                var ctrl_video_seek_area = _my._createTag("div", _my.playerID + "ctrl_video_seek_area", "ctrl_video_seek_area", ctrl_video_seek_wrap);
                var ctrl_video_seek = _my._createTag("div", _my.playerID + "ctrl_video_seek", ctrl_video_seek_class, ctrl_video_seek_wrap);

                var seek_tooltip = _my._createTag("span", _my.playerID + "seek_tooltip", null, ctrl_video_seek);
                seek_tooltip.style.display = "none";

                var ctrl_video_seek_cover = _my._createTag("div", _my.playerID + "ctrl_video_seek_cover", "ctrl_video_seek_cover", ctrl_video_seek);

                var ctrl_video_seek_slider = _my._createTag("div", _my.playerID + "ctrl_video_seek_slider", "ctrl_video_seek_slider", ctrl_video_seek);
            }

            var ctrl_left_wrap = _my._createTag("div", _my.playerID + "ctrl_left_wrap", null, ctrl);
            ctrl_left_wrap.id = _my.playerID + "ctrl_left_wrap";
            if (_my._values.play_use) {
                var ctrl_play = _my._createTag("div", _my.playerID + "ctrl_play", "ctrl_play" + cssTypeWidth, ctrl_left_wrap);
            }
            if (_my._values.volume_use) {
                var ctrl_volume_wrap = _my._createTag("div", _my.playerID + "ctrl_volume_wrap", "ctrl_volume_wrap", ctrl_left_wrap);

                var ctrl_volume_button = _my._createTag("div", _my.playerID + "ctrl_volume_button", "ctrl_volume_button" + cssTypeWidth, ctrl_volume_wrap);
                if (!(_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
                    var ctrl_volume = _my._createTag("div", _my.playerID + "ctrl_volume", "ctrl_volume_slider" + cssTypeWidth, ctrl_volume_wrap);

                    var ctrl_volume_slider = _my._createTag("div", _my.playerID + "ctrl_volume_slider", null, ctrl_volume);
                    ctrl_volume_slider.id = _my.playerID + "ctrl_volume_slider";
                }

            }
            if (_my._values.time_use) {
                var ctrl_video_time = _my._createTag("div", _my.playerID + "ctrl_video_time", "ctrl_video_time" + cssTypeWidth, ctrl_left_wrap);
                var video_play_time = _my._createTag("span", _my.playerID + "video_play_time", "video_time", ctrl_video_time);
                video_play_time.textContent = "0:00:00";
                var per = _my._createTag("span", null, null, ctrl_video_time);
                per.textContent = " / ";
                var video_total_time = _my._createTag("span", _my.playerID + "video_total_time", "video_time", ctrl_video_time);
                video_total_time.textContent = "0:00:00";
            }
            //ctrl_right
            var ctrl_right_wrap = _my._createTag("div", _my.playerID + "ctrl_right_wrap", null, ctrl);
            if (_my._values.fullscreen_use) {
                var ctrl_full_wrap = _my._createTag("div", _my.playerID + "ctrl_full_wrap", "ctrl_full_wrap", ctrl_right_wrap);
                var ctrl_full = _my._createTag("div", _my.playerID + "ctrl_full", "ctrl_full", ctrl_full_wrap);
                if (_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"]) {
                    var ctrl_full_cover = _my._createTag("div", _my.playerID + "ctrl_full_cover", "ctrl_full_cover", ctrl_full_wrap);
                }
            }

            var ctrl_setting = _my._createTag("div", _my.playerID + "ctrl_setting", "ctrl_setting", ctrl_right_wrap);
            var ctrl_setting_icon = _my._createTag("div", _my.playerID + "ctrl_setting_icon", "ctrl_setting_icon", ctrl_setting);
        }
        var ctrl_cover = _my._createTag("div", _my.playerID + "ctrl_cover", "ctrl_cover", video_operation);
        //header
        if (_my._values.header_use) {
            var header = _my._createTag("div", _my.playerID + "header", "eq-header" + cssTypeHeight, video_operation);
            header.style.backgroundColor = _my._values.ctrl_color;
            var video_title = _my._createTag("div", _my.playerID + "video_title", "video_title" + cssTypeHeight, header);

            var video_title_text_cover = _my._createTag("div", _my.playerID + "video_title_text_cover", "video_title_text_cover", video_title);
            video_title_text_cover.style = "width:100%;float:left;";

            var video_title_text = _my._createTag("div", _my.playerID + "video_title_text", "video_title_text" + cssTypeHeight, video_title_text_cover);
            video_title_text.style = "height:30px;margin-right:80px;float:none;";



        }

        //navigation
        if (_my._values.exlink_use || _my._values.sns_use || _my._values.viraltag_use || _my._values.relatedMovie_use) {
            var navi = _my._createTag("div", _my.playerID + 'navi', "navi", video_operation);
            if (_my._values.exlink_use) {
                var navi_outlink = _my._createTag("div", _my.playerID + "navi_outlink", "navi_outlink", navi);
            }
            if (_my._values.sns_use || _my._values.viraltag_use) {
                var navi_share = _my._createTag("div", _my.playerID + "navi_share", "navi_share" + cssTypeHeight, navi);
            }
            //if (_my._values.viraltag_use) {
            //    var navi_viral = _my._createTag("div", _my.playerID + "navi_viral", "navi_viral", navi);
            //    if (_my._values.sns_use) {
            //        navi_viral.style.display = "none";
            //    }
            //}
            if (_my._values.relatedMovie_use) {
                var navi_related = _my._createTag("div", _my.playerID + "navi_related", "navi_related", navi);
            }
        }
        //info
        var info = _my._createTag("div", _my.playerID + "info", "info", video_operation);
        info.style.display = "none;"

        var info_header = _my._createTag("div", _my.playerID + "info_header", "info_header", info);

        var info_icon = _my._createTag("div", _my.playerID + "info_icon", "info_icon", info_header);

        var info_title = _my._createTag("div", _my.playerID + "info_title", "info_title" + cssTypeWidth, info_header);

        var info_close = _my._createTag("div", _my.playerID + "info_close", "info_icon_close info_icon", info_header);
        info_close.id = _my.playerID + "info_close";
        info_close.className = "info_icon_close info_icon";
        info_header.appendChild(info_close);

        var info_main = _my._createTag("div", _my.playerID + "info_main", "info_main", info);

        if (_my._values.exlink_use) {
            var info_outlink = _my._createTag("div", _my.playerID + "info_outlink", "info_outlink" + cssTypeHeight, info_main);
        }
        if (_my._values.sns_use) {
            var info_share = _my._createTag("div", _my.playerID + "info_share", "info_share", info_main);
        }
        if (_my._values.viraltag_use) {
            var info_viral = _my._createTag("div", _my.playerID + "info_viral", "info_viral", info_main);
        }
        if (_my._values.relatedMovie_use) {
            var info_related = _my._createTag("div", _my.playerID + "info_related", "info_related", info_main);
        }

        //login
        if (_my._values.jmcPlayer.accessor.model.isAuthEnable() && ((_my._values.platform["os"]["name"] == "iOS" && _my._values.platform["isSP"]) || !_my._values.jmcPlayer.accessor.model.isLightbox)) {
            var block_layer = _my._createTag("div", _my.playerID + "block_layer", "block_layer", video_operation);

            var login = _my._createTag("div", _my.playerID + "login", "info", video_operation);

            var login_header = _my._createTag("div", _my.playerID + "login_header", "info_header", login);

            var login_icon = _my._createTag("div", _my.playerID + "login_icon", "info_icon_outlink info_icon", login_header);

            var login_title = _my._createTag("div", _my.playerID + "login_title", "info_title" + cssType, login_header);

            var login_main = _my._createTag("div", _my.playerID + "login_main", "info_main", login);

            var loginform = _my._createTag("div", _my.playerID + "loginform", "info_auth", login_main);

            var login_text_input_id = _my._createTag("div", null, "login_text_input", loginform);
            var text = _my._createTag("input", _my.playerID + "loginID", null, login_text_input_id);
            text.id = _my.playerID + "loginID";
            text.type = "text";
            text.align = "left";
            if (cssType == "_ss") {
                text.size = 15;
            } else {
                text.size = 25;
            }

            text.value = (_my._values.a_id || "");
            text.placeholder = _my._languageResource.kinds.ID;

            var login_text_input_pass = _my._createTag("div", null, "login_text_input", loginform);
            var password = _my._createTag("input", _my.playerID + "loginPASS", null, login_text_input_pass);
            password.id = _my.playerID + "loginPASS";
            password.name = "pass";
            password.type = "password";
            password.align = "left";
            if (cssType == "_ss") {
                password.size = 15;
            } else {
                password.size = 25;
            }

            password.placeholder = _my._languageResource.kinds.PASS;

            var loginButton = _my._createTag("button", _my.playerID + "loginButton", "login_button_input", loginform);
            loginButton.textContent = _my._languageResource.kinds.PLAY;
        }
        //setting_menu
        var setting_menu = _my._createTag("div", _my.playerID + "setting_menu", "setting_menu popup_menu", video_operation);

        var setting_panel = _my._createTag("div", _my.playerID + "setting_panel", "setting_panel", setting_menu);

        var setting_panel_menu = _my._createTag("div", _my.playerID + "setting_panel_menu", "setting_panel_menu", setting_panel);

        var playbackrate_item = _my._createTag("div", _my.playerID + "playbackrate_item", "setting_panel_menu_item", setting_panel_menu);
        var closedcaption_item = _my._createTag("div", _my.playerID + "closedcaption_item", "setting_panel_menu_item", setting_panel_menu);
        var quality_item = _my._createTag("div", _my.playerID + "quality_item", "setting_panel_menu_item", setting_panel_menu);

        var playbackrate_item_label = _my._createTag("div", null, "setting_panel_menu_item_label", playbackrate_item);
        playbackrate_item_label.textContent = _my._languageResource.kinds.Speed;;
        var playbackrate_item_content = _my._createTag("div", null, "setting_panel_menu_item_content", playbackrate_item);
        playbackrate_item_content.textContent = "";
        var playbackrate_item_content = _my._createTag("div", null, "setting_panel_menu_item_icon", playbackrate_item);
        playbackrate_item_content.textContent = ">";

        var closedcaption_item_label = _my._createTag("div", null, "setting_panel_menu_item_label", closedcaption_item);
        closedcaption_item_label.textContent = "字幕";
        var closedcaption_item_content = _my._createTag("div", null, "setting_panel_menu_item_content", closedcaption_item);
        closedcaption_item_content.textContent = "";
        var closedcaption_item_content = _my._createTag("div", null, "setting_panel_menu_item_icon", closedcaption_item);
        closedcaption_item_content.textContent = ">";

        var quality_item_label = _my._createTag("div", null, "setting_panel_menu_item_label", quality_item);
        quality_item_label.textContent = _my._languageResource.kinds.Quality;
        var quality_item_content = _my._createTag("div", null, "setting_panel_menu_item_content", quality_item);
        quality_item_content.textContent = "";
        var quality_item_content = _my._createTag("div", null, "setting_panel_menu_item_icon", quality_item);
        if (_my._values.multibitrate_use) {
            quality_item_content.textContent = ">";
        }

        var select_menu = _my._createTag("div", _my.playerID + "select_menu", "select_menu popup_menu", video_operation);

        var select_panel = _my._createTag("div", _my.playerID + "select_panel", "select_panel", select_menu);

        var select_panel_menu = _my._createTag("div", _my.playerID + "select_panel_menu", "select_panel_menu", select_panel);

        var panel_header = _my._createTag("div", _my.playerID + "panel_header", "panel_header", select_panel_menu);
        var panel_header_icon = _my._createTag("div", _my.playerID + "panel_header_icon", "panel_header_icon", panel_header);
        panel_header_icon.textContent = "<";
        var panel_header_content = _my._createTag("div", _my.playerID + "panel_header_content", "panel_header_content", panel_header);
        //replay
        if (_my._values.replay_use) {
            var ctrl_replay = _my._createTag("div", _my.playerID + "ctrl_replay", "ctrl_replay" + cssTypeWidth, video_operation);
            ctrl_replay.style = "background: none";


            var ctrl_replay_icon = _my._createTag("div", _my.playerID + "ctrl_replay_icon", "ctrl_replay_icon" + cssTypeWidth, ctrl_replay);

            var ctrl_replay_text = _my._createTag("div", _my.playerID + "ctrl_replay_text", "ctrl_replay_text" + cssTypeWidth, ctrl_replay);
            ctrl_replay_text.textContent = _my._languageResource.kinds.Replay;
        }


        return videoMain;
    };
    //tagType, id, className, parent
    _my._createTag = function (tagType, id, className, parent) {
        var element = document.createElement(tagType);
        if (id != null) element.id = id;
        if (className != null) element.className = className;
        parent.appendChild(element);
        return element;
    }

    // サイズ別プレイヤー種別
    _my._getPlayerStyle = function (type) {
        var w = _my._values.movie_w;
        var h = _my._values.movie_h;//- _my._values.footerSize;
        if (_my._values.responsive != "on" && _my._values.responsive != "fit") {
            h -= _my._values.footerSize;
        } else {
            var pEl = document.getElementById(_my._values.jmcPlayer.fieldID);
            if (_my._values.fullscreen) {
                pEl = document.getElementById(_my.playerID + "video_main");
            }
            var size = pEl.getBoundingClientRect();
            w = size.width;
            h = size.height;
        }

        if (type == "width") {
            h = 999;
        } else if (type == "height") {
            w = 999;
        }

        if ((w < 240) || (h < 180)) return _my.PS_MINIMUM;
        else if ((w < 320) || (h < 240)) return _my.PS_MIDDLE;
        else return _my.PS_NORMAL;
    }

    // サイズ別CSSサフィックス
    _my._get_css_suffix = function (type) {
        var style = _my._getPlayerStyle(type);
        if (style == _my.PS_MINIMUM) return "_ss"
        else if (style == _my.PS_MIDDLE) return "_s"

        return "";
    }

    // 認証画面設定
    _my._set_auth = function () {
        var cssType = _my._get_css_suffix();

        //タイトル設定
        var titleNode = imba_t3.node.one('#' + _my.playerID + 'login_title');
        titleNode.setInner(_my._languageResource.kinds.AUTH);
        //ボタン
        var button_node = imba_t3.node.one('#' + _my.playerID + 'loginButton');
        var pnode = imba_t3.node.one('#' + _my.playerID + 'login_main');
        button_node.setStyle('width', "90px");
        button_node.setStyle('height', "20px");


        var dom = button_node.DOMNode();
        var idNode = imba_t3.node.one('#' + _my.playerID + 'loginID');
        var passNode = imba_t3.node.one('#' + _my.playerID + 'loginPASS')
        if (cssType == "_s" || cssType == "_ss") {
            var height = "";
            var font_size = "";
            if (_my._values.jmcPlayer.accessor.model.getEnvironmentType() == "mobileStreaming" && _my._values.jmcPlayer.accessor.model.isIframe === true && cssType == "_ss") {
                idNode.set("className", "login_text_input_ss_iOS");
                passNode.set("className", "login_text_input_ss_iOS");
            }
        }
        dom.onclick = (function () {
            _my._set_login_visibled(false);
            var idText = idNode.dom_node.value;
            var passText = passNode.dom_node.value;
            _my._values.jmcPlayer.accessor.login(idText, passText);
        });
        idNode.dom_node.onkeydown = (function () {
            if (event.keyCode == 13) {
                var idText = idNode.dom_node.value;
                var passText = passNode.dom_node.value;
                if (idText && passText) {
                    _my._set_login_visibled(false);
                    _my._values.jmcPlayer.accessor.login(idText, passText);
                }
            }
        });
        passNode.dom_node.onkeydown = (function () {
            if (event.keyCode == 13) {
                var idText = idNode.dom_node.value;
                var passText = passNode.dom_node.value;
                if (idText && passText) {
                    _my._set_login_visibled(false);
                    _my._values.jmcPlayer.accessor.login(idText, passText);
                }
            }
        });
    };

    // 外部リンク設定
    _my._set_outlink = function (index, text, url) {
        _my._values.linkset['exlink' + index] = url;
        var cssType = _my._get_css_suffix();

        var innerHTML = text;
        var outlink_node = imba_t3.node.create('div',
            {
                className: "outlink_url" + cssType
            },
            innerHTML);

        outlink_node.setStyle("width", Math.floor(_my._values.info_w * 0.9) + "px");
        outlink_node.setStyle("margin", "auto");
        var pnode = imba_t3.node.one('#' + _my.playerID + 'info_outlink');
        pnode.appendChild(outlink_node);

        var dom = outlink_node.DOMNode();
        dom.onclick = (function (index) { return function () { _my._link_action("exlink" + index) } })(index);
    };

    // シェア設定
    _my._set_share = function () {
        var i;
        for (i = 0; i < _my._values.share.length; i++) {
            var url = "";
            var share_class = "";
            switch (_my._values.share[i]) {
                case "facebook":
                    share_class = "facebook";
                    url = "http://www.facebook.com/share.php"
                        + "?u=" + encodeURIComponent(_my._values.parent_url);
                    break;
                case "twitter":
                    share_class = "twitter";
                    url = "http://twitter.com/share"
                        + "?text=" + encodeURIComponent(_my._values.movie_title)
                        + "&url=" + encodeURIComponent(_my._values.parent_url);
                    //				+ "&via="  + escape("whaison")
                    break;
                case "mixi":
                    share_class = "mixi";
                    var passCode = "071c06559d69bb3a64cfd0b2bba0c96e08c8e28d";
                    url = "http://mixi.jp/share.pl"
                        + "?u=" + encodeURIComponent(_my._values.parent_url)
                        + "&k=" + passCode;
                    break;
                case "google":
                    share_class = "google_plus";
                    url = "https://plusone.google.com/share?url=" + encodeURIComponent(_my._values.parent_url);
                    break;
                case "LINE":
                    share_class = "line";
                    query = _my._values.movie_title + " " + _my._values.parent_url;
                    query = encodeURIComponent(query);
                    url = "http://line.me/R/msg/text/?" + query;
                    break;
            }

            if (url.length) {
                _my._values.linkset[_my._values.share[i]] = url;
                _my._create_share_link(_my._values.share[i], url, share_class);
            }
        }
    };
    _my._set_viral = function () {
        var pnode = document.getElementById(_my.playerID + "info_viral");
        if (pnode == null) {
            return;
        }
        if (document.getElementById(_my.playerID + "viralText") != null) return;
        var title = _my._createTag("p", _my.playerID + "viral_title", "viral_title", pnode);
        title.textContent = _my._languageResource.kinds.VIRALTAG_TITLE;
        var textarea = document.createElement("textarea");
        textarea.id = _my.playerID + "viralText";
        textarea.innerText = _my._values.jmcPlayer.flashVars["tag_text"];
        var textareaHeight = 27;
        textarea.setAttribute('readonly', '');
        pnode.appendChild(textarea);

        if (_my._get_css_suffix("height") == "" && !(_my._values.jmcPlayer.flashVars.platform["isSafari"] && _my._values.jmcPlayer.flashVars.platform["os"]["name"] == "Macintosh")) {
            var div = document.createElement("div");
            pnode.appendChild(div);
            var button = document.createElement("button");
            button.classList.add("info_viral_btn");
            button.innerText = _my._languageResource.kinds.VIRALTAG_BTN;
            button.addEventListener("click", function (e) {
                e.preventDefault();
                _my._click_button(35);
            });
            div.appendChild(button);
        }
        textarea.setAttribute('style', 'width: 98%;max-width:400px;height: ' + textareaHeight + 'px;margin-top: 10px;color:black;');
    }
    //_my._set_suggest = function () {
    //    var pnode = document.getElementById(_my.playerID + "info_suggest");
    //    if (pnode == null) {
    //        return;
    //    }
    //    var debug_movie_array = [1, 7, 5, 6];
    //    var movie_array;
    //    movie_array = _my._values.jmcPlayer.accessor.model.suggest_movie_list;
    //    var item;
    //    var img;
    //    var source;
    //    var suggestMovie_length = movie_array.length;
    //    for (var index = 0; index < suggestMovie_length; index++) {
    //        item = document.createElement("div");
    //        item.className = "suggest_item suggest_item_" + suggestMovie_length.toString();
    //        item.dataset.mid = movie_array[index]["meta_id"].toString();
    //        item.addEventListener("click", function () {
    //            //フラグ初期化
    //            _my._values.jmcPlayer.accessor.model.isAuthPassed = false;
    //            _my._values.jmcPlayer.accessor.model.hostCheckResult = "";
    //            _my._values.jmcPlayer.accessor.model.isCheckConnectionPassed = false;
    //            _my._values.jmcPlayer.accessor.hostCheckService2.isLoad = true;
    //            //要素初期化
    //            _my._values.jmcPlayer.accessor.model.setThumbnailURL("");
    //            _my._unset_outlink();
    //            _my._values.jmcPlayer.accessor.model.exlink = [];
    //            _my._unset_suggest();
    //            _my._values.jmcPlayer.accessor.model.suggest_movie_list = [];
    //            _my._values.jmcPlayer.accessor.model.suggest_mid_list = [];
    //            _my._values.jmcPlayer.accessor.model.suggest_mid = null;
    //            var meta;
    //            if (event.target.tagName == "div") {
    //                meta = Number(event.target.dataset["mid"]);
    //            } else {
    //                meta = Number(event.target.parentElement.dataset["mid"]);
    //            }
    //            _my._values.jmcPlayer.accessor.model.meta_id = meta;
    //            _my._values.jmcPlayer.accessor.loadMetaData(function(){
    //                _my._values.jmcPlayer.accessor.loadHostCheck2(function () {
    //                    _my._getMetaData(function () {
    //                        if (_my._values.exlink_use) {
    //                            _my._values.outlink = _my._values.jmcPlayer.accessor.model.exlink;
    //                            if (_my._values.outlink) {
    //                                for (i = 0; i < _my._values.outlink.length; i++)
    //                                    if (_my._values.outlink[i]) _my._set_outlink((i + 1), _my._values.outlink[i].text, _my._values.outlink[i].url);
    //                            }
    //                        }
    //                        if (_my._values.suggestMovie_use) {
    //                            _my._set_suggest();
    //                        }
    //                        _my._values.jmcPlayer.accessor.createPlayer();
    //                        _my._set_video_thumb(_my._values.jmcPlayer.accessor.model.thumbnail_url);
    //                    });
    //                });
    //            });
    //        });
    //        source = movie_array[index]["thumbnail"];
    //        img = document.createElement("div");
    //        img.style.backgroundImage = 'url("' + source + '")';
    //        img.style.backgroundImage = "contain";
    //        img.className = "suggest_img";
    //        item.appendChild(img);
    //        pnode.appendChild(item);
    //    }

    //}
    //_my._getMetaData = function (callback) {
    //    var _this = _my._values.jmcPlayer.accessor;
    //    var get = function () {
    //        var suggest_mid_list = _this.model.suggest_mid_list;
    //        _this.model.getMetaData_suggest = true;
    //        if (!suggest_mid_list || suggest_mid_list.length < 1) {
    //            _this.model.getMetaData_suggest = false;
    //            callback();
    //            return;
    //        }
    //        if (!_this.model.suggest_mid) {
    //            _this.model.suggest_mid = suggest_mid_list[0];
    //        }
    //        else {
    //            var index = suggest_mid_list.indexOf(_this.model.suggest_mid);
    //            if (index == -1) {
    //                _this.model.getMetaData_suggest = false;
    //                callback();
    //                return;
    //            }
    //            index += 1;
    //            if (suggest_mid_list.length <= index) {
    //                _this.model.getMetaData_suggest = false;
    //                callback();
    //                return;
    //            }
    //            _this.model.suggest_mid = suggest_mid_list[index];
    //        }
    //        _this.loadGetMetaData(get);
    //    };
    //    get();
    //}
    //関連リンク要素を削除
    //_my._unset_outlink = function () {
    //    var pnode = document.getElementById(_my.playerID + 'info_outlink');
    //    if (!pnode) {
    //        return;
    //    }
    //    while (pnode.childNodes.length > 0) {
    //        pnode.removeChild(pnode.childNodes[0]);
    //    }
    //}
    //関連動画要素を削除
    //_my._unset_suggest = function () {
    //    var pnode = document.getElementById(_my.playerID + 'info_suggest');
    //    if (!pnode) {
    //        return;
    //    }
    //    while (pnode.childNodes.length > 0) {
    //        pnode.removeChild(pnode.childNodes[0]);
    //    }
    //}
    // シェアノード作成
    _my._create_share_link = function (text, url, share_class) {
        var cssType = _my._get_css_suffix();
        if (text == "google") {
            text = "Google+";
        }
        var share_node = imba_t3.node.create('div',
            {
                className: "info_share_link" + cssType
            },
            '<span class="info_share_link_icon info_share_' + share_class + cssType + '"></span>' + text);

        var pnode = imba_t3.node.one('#' + _my.playerID + 'info_share');

        if (text == "LINE") {
            var share_link = imba_t3.node.create('a',
                {
                    href: url,
                    target: "_parent"
                });
            share_link.appendChild(share_node);
            pnode.appendChild(share_link);
            var dom = share_link.DOMNode();

        } else {
            pnode.appendChild(share_node);
            var dom = share_node.DOMNode();
        }
        dom.onclick = (function (text) { return function () { _my._link_action(text) } })(text);
    };

    // サムネイル画像の設定。
    _my._set_video_thumb = function (filePath) {
        if (filePath && filePath.length > 0 && !(_my._values.init_play == true && !(_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])))
            _my._nodes.video_main.setStyle('background-image', 'url(' + filePath + ')');
        else
            _my._nodes.video_main.setStyle('background-image', '');
    };

    // タイトルの設定。
    _my._set_video_title = function () {
        if (_my._values.title_use) {
            _my._nodes.video_title_text = imba_t3.node.one('#' + _my.playerID + 'video_title_text');
            //_my._nodes.video_title_text.setInner(_my._values.movie_title);
        }

        _my._values.rep_w = 0;
        if (_my._values.replay_use) {
            // リプレイの幅設定
            if (_my._getPlayerStyle("height") == _my.PS_NORMAL) {
                _my._values.rep_w = 85;
            } else {
                _my._values.rep_w = 30;
            }

            var replay_icon = document.getElementById(_my.playerID + "ctrl_replay").children[0];
            var replay_text = document.getElementById(_my.playerID + "ctrl_replay").children[1];
            _my._nodes.ctrl_replay.setStyle('right', 30 + "px");
            _my._nodes.ctrl_replay.on("mouseover",
                function () {
                    if (replay_icon) {
                        replay_icon.className = "ctrl_replay_icon" + _my._get_css_suffix("width") + "_hover";
                    }
                    if (replay_text) {
                        replay_text.className = "ctrl_replay_text" + _my._get_css_suffix("width") + "_hover";
                    }

                }
            );
            _my._nodes.ctrl_replay.on("mouseleave",
                function () {
                    if (replay_icon) replay_icon.className = "ctrl_replay_icon" + _my._get_css_suffix("width");
                    if (replay_text) replay_text.className = "ctrl_replay_text" + _my._get_css_suffix("width");
                }
            );

        }

        if (_my._values.title_use) {
            _my._nodes.video_title_text.setStyle('margin-right', '0px');
        }
    };
    //設定ウィンドウ初期化
    _my._set_setting = function () {
        _my._values.setting = false;
        _my._values.menu = false;
        _my._nodes.setting_menu = imba_t3.node.one('#' + _my.playerID + 'setting_menu');
        _my._nodes.setting_panel = imba_t3.node.one('#' + _my.playerID + 'setting_panel');
        var height = 102;

        _my._nodes.select_menu = imba_t3.node.one('#' + _my.playerID + 'select_menu');
        _my._nodes.select_panel = imba_t3.node.one('#' + _my.playerID + 'select_panel');

        var select_height = 255;
        _my._nodes.select_menu.setStyle("height", select_height + "px");
        _my._nodes.select_menu.setStyle("display", "none");


        _my._nodes.panel_header = imba_t3.node.one('#' + _my.playerID + 'panel_header');
        _my._nodes.panel_header.dom_node.onclick = (function () {
            _my.setSettingVisible(true);
        });
        //playbackRate
        _my._nodes.playbackrate_item = imba_t3.node.one('#' + _my.playerID + 'playbackrate_item');
        _my._values.rate_list = _my._values.jmcPlayer.flashVars.playbackRate_list;
        if (_my._values.playbackRate_use) {
            _my._nodes.playbackrate_item.dom_node.children[1].textContent = _my._values.rate_list[_my._values.rate_index];
            _my._nodes.playbackrate_item.dom_node.addEventListener("click", function () { _my._show_select_menu("playbackrate"); })
        } else {
            _my._nodes.playbackrate_item.setStyle("display", "none");
            height -= 34;
        }
        //closedCaption
        _my._nodes.closedcaption_item = imba_t3.node.one('#' + _my.playerID + 'closedcaption_item');
        _my._values.caption_list = _my._values.jmcPlayer.flashVars.caption_list;
        if (_my._values.caption_use) {
            _my._nodes.closedcaption_item.dom_node.children[1].textContent = _my._values.caption_list[_my._values.caption_index].text;

        } else {
            _my._nodes.closedcaption_item.setStyle("display", "none");
            height -= 34;
        }

        _my._nodes.closedcaption_item.dom_node.addEventListener("click", function () { _my._show_select_menu("caption"); })

        //quality

        _my._nodes.quality_item = imba_t3.node.one('#' + _my.playerID + 'quality_item');
        _my._values.movie_list = _my._values.jmcPlayer.flashVars.movie_list;
        var val = _my._get_movie_list_val(_my._values.movie_list[_my._values.movie_index].text);
        _my._nodes.quality_item.dom_node.children[1].textContent = (_my._set_movie_list_text(val));
        if (_my._values.multibitrate_use) {
            _my._nodes.quality_item.dom_node.addEventListener("click", function () { _my._show_select_menu("quality"); })
        }

        _my._nodes.setting_menu.setStyle("height", height + "px");
        _my._nodes.setting_menu.setStyle("display", "none");

    }
    //セレクトメニュー表示
    _my._show_select_menu = function (type) {
        _my._values.menu = true;
        _my.setSettingVisible(false);
        _my._nodes.select_menu = imba_t3.node.one('#' + _my.playerID + 'select_menu');
        _my._nodes.select_panel = imba_t3.node.one('#' + _my.playerID + 'select_panel');
        var width = 97;
        var height = 145;
        var itemHeight = 25;
        var headerHeight = 30;
        var fullscreen = "";

        if (_my._values.fullscreen) {
            itemHeight = 37.5;
            headerHeight = 37.5;
            fullscreen = "_fullscreen";
        }

        switch (type) {
            case "quality":
                _my._nodes.select_menu.dom_node.className = "select_menu popup_menu quality" + fullscreen;
                _my._show_quality_select_menu();
                height = _my._values.movie_list.length * itemHeight + headerHeight;
                break;
            case "caption":
                _my._show_caption_select_menu();
                height = _my._values.caption_list.length * itemHeight + headerHeight;
                break;
            case "playbackrate":
                _my._nodes.select_menu.dom_node.className = "select_menu popup_menu playbackRate" + fullscreen
                _my._show_playbackrate_select_menu();
                height = _my._values.rate_list.length * itemHeight + headerHeight;
                break;
            default:
        }
        //表示位置bottom 40 top 30
        if (_my._nodes.video_main.dom_node.clientHeight - 40 - 30 < height) {
            height = _my._nodes.video_main.dom_node.clientHeight - 40 - 30 - 10;
        }
        _my._nodes.select_menu.setStyle("height", height + "px");
        _my._nodes.select_menu.setStyle("display", "block");

    }
    _my._close_select_menu = function () {
        _my._values.menu = false;
        _my._nodes.select_menu = imba_t3.node.one('#' + _my.playerID + 'select_menu');
        _my._nodes.select_panel_menu = imba_t3.node.one('#' + _my.playerID + 'select_panel_menu');

        var length = _my._nodes.select_panel_menu.dom_node.children.length;
        for (i = length - 1; i > 0; i--) {
            _my._nodes.select_panel_menu.dom_node.removeChild(_my._nodes.select_panel_menu.dom_node.children[i]);
        }
        _my._nodes.select_menu.setStyle("display", "none");
    }
    _my._show_quality_select_menu = function () {
        _my._nodes.select_panel_menu = imba_t3.node.one('#' + _my.playerID + 'select_panel_menu');
        _my._nodes.panel_header_content = imba_t3.node.one('#' + _my.playerID + 'panel_header_content');

        _my._nodes.panel_header_content.dom_node.textContent = _my._languageResource.kinds.Quality;
        for (i = 0; i < _my._values.movie_list.length; i++) {
            var item = _my._createTag("div", _my.playerID + "ctrl_select_list_" + i, "ctrl_select_default", _my._nodes.select_panel_menu.dom_node);
            if (i == _my._values.movie_index) {
                item.className = "ctrl_select_selected";
            }
            var val = _my._get_movie_list_val(_my._values.movie_list[i].text);
            item.textContent = _my._set_movie_list_text(val);
            item.onclick = (function (i) {
                return function () {
                    if (_my._values.jmcPlayer.accessor.model.isAuthEnable()) {
                        _my.setCurrentMovieURL(_my._values.movie_list[i].url);
                    } else {
                        _my._click_movie_select(i);
                    }
                    _my._values.movie_index = i;
                    for (j = 1; j < _my._nodes.select_panel_menu.dom_node.children.length; j++) {
                        if (j - 1 == i) {
                            _my._nodes.select_panel_menu.dom_node.children[j].className = "ctrl_select_selected";
                        } else {
                            _my._nodes.select_panel_menu.dom_node.children[j].className = "ctrl_select_default";
                        }

                    }
                    _my._close_select_menu();
                }
            })(i);
        }
    }
    _my._show_caption_select_menu = function () {
        _my._nodes.select_panel_menu = imba_t3.node.one('#' + _my.playerID + 'select_panel_menu');
        _my._nodes.panel_header_content = imba_t3.node.one('#' + _my.playerID + 'panel_header_content');

        _my._nodes.panel_header_content.dom_node.textContent = "字幕";
        for (i = 0; i < _my._values.caption_list.length; i++) {
            var item = _my._createTag("div", _my.playerID + "ctrl_select_list_" + i, "ctrl_select_default", _my._nodes.select_panel_menu.dom_node);
            if (i == _my._values.caption_index) {
                item.className = "ctrl_select_selected";
                _my._click_caption_select(i)
            }
            item.textContent = _my._values.caption_list[i].text;
            item.onclick = (function (i) {
                return function () {
                    _my._click_caption_select(i)
                    _my._nodes.closedcaption_item.dom_node.children[1].textContent = _my._values.caption_list[i].text;
                    for (j = 1; j < _my._nodes.select_panel_menu.dom_node.children.length; j++) {
                        if (j - 1 == i) {
                            _my._nodes.select_panel_menu.dom_node.children[j].className = "ctrl_select_selected";
                        } else {
                            _my._nodes.select_panel_menu.dom_node.children[j].className = "ctrl_select_default";
                        }

                    }
                }
            })(i);
        }
    }
    _my._show_playbackrate_select_menu = function () {
        _my._nodes.select_panel_menu = imba_t3.node.one('#' + _my.playerID + 'select_panel_menu');
        _my._nodes.panel_header_content = imba_t3.node.one('#' + _my.playerID + 'panel_header_content');

        _my._nodes.panel_header_content.dom_node.textContent = _my._languageResource.kinds.Speed;


        for (i = 0; i < _my._values.rate_list.length; i++) {
            var item = _my._createTag("div", _my.playerID + "ctrl_select_list_" + i, "ctrl_select_default", _my._nodes.select_panel_menu.dom_node);
            if (i == _my._values.rate_index) {
                item.className = "ctrl_select_selected";
            }
            item.textContent = _my._values.rate_list[i];
            item.onclick = (function (i) {
                return function () {
                    _my._changePlaybackRate(_my._values.rate_list[i]);

                }
            })(i);
        }
    }
    _my._changePlaybackRate = function (rate) {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (!isFinite(rate)) return;
        rate = Math.floor(rate * 10) / 10;
        if (rate < 0) return;
        //if (rate < 0.5 || rate > 2.0) return;
        _my._values.playbackRate = rate;
        video.playbackRate = _my._values.playbackRate;
        _my._nodes.select_panel_menu = imba_t3.node.one('#' + _my.playerID + 'select_panel_menu');
        if (!_my._nodes.select_panel_menu) return;
        i = _my._values.rate_list.indexOf(rate);
        _my._values.rate_index = i;
        _my._nodes.playbackrate_item.dom_node.children[1].textContent = rate;
        for (j = 1; j < _my._nodes.select_panel_menu.dom_node.children.length; j++) {
            if (j - 1 == i) {
                _my._nodes.select_panel_menu.dom_node.children[j].className = "ctrl_select_selected";
            } else {
                _my._nodes.select_panel_menu.dom_node.children[j].className = "ctrl_select_default";
            }

        }
    }
    //--------------------------------------------------
    // 各データのロード（読込・設定）
    _my._load_values = function () {
        // 値読取
        var jmcPlayer = _my._values.jmcPlayer;
        // 時間表示とリプレイはデフォルトでON
        _my._values.time_use = true;
        _my._values.replay_use = true;

        if (jmcPlayer.flashVars.seak_use == 'on') _my._values.seek_use = true;
        if (jmcPlayer.flashVars.fullscreen_use == 'on') _my._values.fullscreen_use = true;
        if (jmcPlayer.flashVars.title_use == 'on') _my._values.title_use = true;
        if (jmcPlayer.flashVars.exlink_use == 'on') _my._values.exlink_use = true;
        if (jmcPlayer.flashVars.sns_use == 'on') _my._values.sns_use = true;
        if (jmcPlayer.flashVars.tag_use == 'on' && !jmcPlayer.flashVars.platform["isSP"] && !jmcPlayer.flashVars.platform["isTablet"]) _my._values.viraltag_use = true;
        if (jmcPlayer.flashVars.multibitrate_use == 'on') _my._values.multibitrate_use = true;
        if (jmcPlayer.flashVars.play_use == 'on') _my._values.play_use = true;
        if (jmcPlayer.flashVars.footer_use == 'on' && jmcPlayer.flashVars.responsive != "on" && jmcPlayer.flashVars.responsive != "fit") _my._values.footer_use = true;

        if (jmcPlayer.flashVars.ctrlbar_use == 'off' || jmcPlayer.flashVars.controlbar_use == 'off') {
            _my._values.ctrl_use = false;
            _my._values.play_use = false;
            _my._values.time_use = false;
            _my._values.seek_use = false;
            _my._values.fullscreen_use = false;
            _my._values.multibitrate_use = false;
        }
        if (jmcPlayer.flashVars.platform["isIE"] && Number(jmcPlayer.flashVars.platform["browser"]["version"]) == 10) _my._values.fullscreen_use = false;
        if (jmcPlayer.flashVars.time_use == 'off') _my._values.time_use = false;
        if (jmcPlayer.flashVars.replay_use == 'off' || jmcPlayer.flashVars.replaybtn_use == 'off') _my._values.replay_use = false;
        if (jmcPlayer.flashVars.watermark_use == 'off') _my._values.watermark_use = false;
        if (jmcPlayer.flashVars.watermark_design == '2') _my._values.watermark_design = "2";
        if (jmcPlayer.flashVars.start_time) _my._values.start_time = jmcPlayer.flashVars.start_time;
        if (jmcPlayer.flashVars.duration) _my._values.duration = jmcPlayer.flashVars.duration;
        if (jmcPlayer.flashVars.auth == '1' && ((_my._values.platform["os"]["name"] == "iOS" && _my._values.platform["isSP"]) || !_my._values.jmcPlayer.accessor.model.isLightbox)) {
            _my._values.movie_auth = true;
            if (typeof (jmcPlayer.flashVars.a) == "undefined" || jmcPlayer.flashVars.a == null || jmcPlayer.flashVars.a.indexOf(':') == -1 || jmcPlayer.flashVars.a.split(":")[1].length < 1) {
                _my._values.auth_input = true;
                if (typeof (jmcPlayer.flashVars.a) != "undefined" && jmcPlayer.flashVars.a != null) {
                    if (jmcPlayer.flashVars.a.indexOf(":") != -1) {
                        jmcPlayer.flashVars.a = jmcPlayer.flashVars.a.split(":")[0];
                    }
                    _my._values.a_id = (jmcPlayer.flashVars.a);
                }
            }
        }
        if (jmcPlayer.flashVars.responsive != "off") _my._values.responsive = jmcPlayer.flashVars.responsive;
        if (jmcPlayer.flashVars.init_play == "on") _my._values.init_play = true;
        // ライブモード確認
        if (jmcPlayer.flashVars.isLive == true) _my._values.isLive = true;
        if (jmcPlayer.flashVars.volume_use == "off") _my._values.volume_use = false;
        // フッタデフォルト値設定
        _my._values.footerSize = 0;
        if (_my._values.footer_use) _my._values.footerSize = 20;

        // 画面表示制御
        _my._setPlayerStyle();

        // 初期フラグ別途保存
        _my._saveDefalutValues();

        // 動画名
        _my._values.movie_title = jmcPlayer.flashVars.title;
        if (_my._values.title_use) {
            if (!_my._values.movie_title) _my._values.movie_title = "";
        }

        // フッター
        if (_my._values.footer_use) {
            _my._values.movie_footer = jmcPlayer.flashVars.footer_text;
            _my._values.footer_align = jmcPlayer.flashVars.footer_align;
            if (!_my._values.movie_footer) _my._values.movie_footer = "";
        }

        // ビデオファイルパス
        _my._values.movie_filepath = jmcPlayer.flashVars.movie_url;

        // サムネイル画像
        _my._values.thumb_filePath = jmcPlayer.flashVars.thumbnail_url;
        if (!_my._values.thumb_filePath) _my._values.thumb_filePath = "";

        // 画質選択
        _my._values.movie_index = 0;
        _my._values.movie_list = jmcPlayer.flashVars.movie_list;

        if (!_my._values.movie_list || (_my._values.movie_list.length <= 0)) {
            _my._values.multibitrate_use = false;
            _my._values.movie_list = [];
        } else {
            //デフォルト画質ラベル設定
            for (var i = 0; i < _my._values.movie_list.length; i++) {
                if (_my._values.movie_filepath == _my._values.movie_list[i].url) {
                    _my._values.movie_index = i;
                    break;
                }
            }
        }

        _my._values.rate_index = jmcPlayer.flashVars.playbackRate_index;
        _my._values.rate_list = jmcPlayer.flashVars.playbackRate_list;
        if (_my._values.playbackRate_use) {
            if (!_my._values.rate_list || (_my._values.rate_list.length <= 1)) {
                _my._values.playbackRate_use = false;
            }
            //Win8.1 IE11問題対策
        }
        _my._values.caption_index = jmcPlayer.flashVars.caption_index;
        _my._values.caption_list = jmcPlayer.flashVars.caption_list;
        if (_my._values.caption_use) {
            if (!_my._values.caption_list || (_my._values.caption_list.length <= 1)) {
                _my._values.caption_use = false;
                _my._values.caption_list = [];
            }
        }

        // 外部リンク
        if (_my._values.exlink_use) {
            _my._values.outlink = jmcPlayer.flashVars.exlink;
            if (!_my._values.outlink || (_my._values.outlink.length <= 0)) {
                _my._values.exlink_use = false;
                _my._values.outlink = [];
            }
        }

        // 共有
        if (_my._values.sns_use) {
            _my._values.share = jmcPlayer.flashVars.sns_id_list;
            if (!_my._values.share || (_my._values.share.length <= 0)) {
                _my._values.sns_use = false;
                _my._values.share = [];
            }
        }

        _my._values.linkset = [];

        _my._values.vid = jmcPlayer.flashVars.contract_id + "-" + jmcPlayer.flashVars.meta_id + "-" + jmcPlayer.flashVars.file_id;
        _my._values.svcid = jmcPlayer.flashVars.contract_id;
        _my._values.mn = "c" + jmcPlayer.flashVars.contract_id + "m" + _my._values.vid;

        _my._values.parent_url = jmcPlayer.flashVars.parent_url;


        // 操作画面表示管理用
        _my._values.operation = [];
        _my._values.operation._view = true;			// コントローラの表示有無
        _my._values.operation._time = Date.now();	// 最終操作時間

        _my._values.progressTimer = null;			// 再生時フレーム処理用
        _my._values.load_currentTime = 0;

        _my._values.movie_status = '';

        // スケーリング設定
        _my._values.seek_scale = 1000;
        // 
        _my._values.play_start = false;
        _my._values.fullscreenTimer = null;

        //レジューム処理
        var resume_time = Number(jstream_t3.utils.Util.GetCookie("EQPlayer_resume_CurrentTime_" + jmcPlayer.flashVars.meta_id + "_" + jmcPlayer.flashVars.contract_id));
        if (_my._values.start_time <= 0 && jmcPlayer.flashVars.resumeEnable == "on" && resume_time != null && isFinite(resume_time)) _my._values.start_time = resume_time;

    };

    // 表示制御処理
    _my._setPlayerStyle = function () {
        var playerType = _my._values.jmcPlayer.accessor.getEnvironmentType();
        var style = _my._getPlayerStyle();
        var style_width = _my._getPlayerStyle("width");
        var style_height = _my._getPlayerStyle("height");
        var platform = _my._values.jmcPlayer.flashVars.platform;
        if (_my._values.responsive != "on" && _my._values.responsive != "fit") {
            // 画面サイズ別制御
            if (style_width == _my.PS_MIDDLE) {
                _my._values.time_use = false;
            } else if (style_width == _my.PS_MINIMUM) {
                // 最小
                _my._values.play_use = false;
                //_my._values.seek_use = false;
                _my._values.multibitrate_use = false;
                _my._values.time_use = false;
            }
            if (style_height == _my.PS_MINIMUM) {
                _my._values.viraltag_use = false;
                _my._values.sns_use = false;
                _my._values.title_use = false;
                //_my._values.time_use = false;
                _my._values.replay_use = false;
            }
        }
        if (playerType == jstream_t3.EnviromentKind.PC_PROGRESSIVE || playerType == jstream_t3.EnviromentKind.HLSJS || playerType == jstream_t3.EnviromentKind.PC_HTML5HLS) {
            //_my._values.volume_use = true;
        } else if (!(platform["isSafari"] && platform["os"]["name"] == "iOS" && Number(platform["os"]["version"].split(".")[0]) >= 10)
            && platform["os"]["name"] == "iOS" && Number(platform["os"]["version"].split(".")[0]) <= 9 && !platform["isTablet"]) {
            //iPhone9以下

            _my._values.is_iphone = true;
            _my._values.play_use = false;
            _my._values.time_use = false;
            _my._values.seek_use = false;
            _my._values.multibitrate_use = false;
            _my._values.fullscreen_use = false;
            _my._values.exlink_use = false;
            _my._values.viraltag_use = false;
            _my._values.sns_use = false;
            _my._values.replay_use = false;

            _my._values.ctrl_use = false;

        } else if (platform["os"]["name"] == "Android") {
            // Android
            _my._values.is_android = true;

            if (platform["isChrome"]) {
                // ローディング制御(android/Chromeのみ）
                //_my._values.loading_use = false;
                _my._values.is_Chrome = true;
            }
            var version = Number(platform["os"]["version"].split(".")[0]) + (Number(platform["os"]["version"].split(".")[1]) * 0.1);
            if (version <= 4.0) {
                // Android4.0.x以前
                _my._values.is_android_40x = true;
            };
        }

        if (_my._values.header_use)
            _my._values.header_use = _my._values.title_use | _my._values.replay_use;

        //if (_my._values.ctrl_use)
        //_my._values.ctrl_use = _my._values.play_use | _my._values.time_use | _my._values.seek_use | _my._values.multibitrate_use | _my._values.fullscreen_use;
    }

    // 初期値保存
    _my._saveDefalutValues = function () {
        _my._defVals.title_use = _my._values.title_use;
        _my._defVals.replay_use = _my._values.replay_use;
        _my._defVals.exlink_use = _my._values.exlink_use;
        _my._defVals.sns_use = _my._values.sns_use;
        _my._defVals.play_use = _my._values.play_use;
        _my._defVals.time_use = _my._values.time_use;
        _my._defVals.seek_use = _my._values.seek_use;
        _my._defVals.multibitrate_use = _my._values.multibitrate_use;
        _my._defVals.fullscreen_use = _my._values.fullscreen_use;
        _my._defVals.footer_use = _my._values.footer_use;

        _my._defVals.header_use = _my._values.header_use;
        _my._defVals.ctrl_use = _my._values.ctrl_use;
        _my._defVals.loading_use = _my._values.loading_use;

        _my._defVals.movie_w = _my._values.movie_w;
        _my._defVals.movie_h = _my._values.movie_h;

    }

    //--------------------------------------------------
    // ノード情報の初期化
    _my._init_nodes = function () {
        // 再生時間設定
        if (_my._values.time_use) {
            _my._nodes.video_total_time = imba_t3.node.one('#' + _my.playerID + 'video_total_time');
            //_my._nodes.video_total_time.setInner(_get_timeString(Math.floor(_my._values.duration)));
            _my._nodes.video_play_time = imba_t3.node.one('#' + _my.playerID + 'video_play_time');
        } else {
            _my._nodes.video_total_time = false;
            _my._nodes.video_play_time = false;
        }
        _my._nodes.video_main = imba_t3.node.one('#' + _my.playerID + 'video_main');

        // 画面ボタン
        _my._nodes.btn_operation = imba_t3.node.one('#' + _my.playerID + 'btn_operation');
        _my._nodes.btn_operation.on('click', function (e) { _my._click_button(40); });
        _my._nodes.block_layer = imba_t3.node.one('#' + _my.playerID + 'block_layer');
        if (!!_my._nodes.block_layer) {
            _my._nodes.block_layer.on('click', function (e) { _my._click_button(40); });
        }
        //再生WM
        if (document.getElementById(_my.playerID + "play_state_wait")) {
            document.getElementById(_my.playerID + "play_state_wait").addEventListener("click", function (e) { _my._click_button(40); });
        }
        if (_my._values.header_use) {
            _my._nodes.header = imba_t3.node.one('#' + _my.playerID + 'header');
            _my._values.header_h = 30;
            if (!_my._values.title_use) {
                _my._nodes.header.setStyle('display', 'none');
            }
        } else {
            _my._nodes.header = false;
        }

        // リプレイ
        if (_my._values.replay_use) {
            _my._nodes.ctrl_replay = imba_t3.node.one('#' + _my.playerID + 'ctrl_replay');
            _my._nodes.ctrl_replay.on('click', function (e) { _my._click_button(15); });
        } else {
            _my._nodes.ctrl_replay = false;
        }

        if (_my._values.ctrl_use) {
            // コントローラ関連
            _my._nodes.ctrl_cover = imba_t3.node.one('#' + _my.playerID + 'ctrl_cover');
            _my._nodes.ctrl_cover.setStyle('display', 'none');
            _my._nodes.ctrl_cover.on('click', function (e) { _my._click_button(33); });

            // 再生ボタン
            if (_my._values.play_use) {
                _my._nodes.ctrl_play = imba_t3.node.one('#' + _my.playerID + 'ctrl_play');
                _my._nodes.ctrl_play.on('click', function (e) { _my._click_button(11); });
            } else {
                _my._nodes.ctrl_play = false;
            }

            // 画質切替
            //if (_my._values.multibitrate_use) {
            //    _my._nodes.ctrl_select_now = imba_t3.node.one('#' + _my.playerID + 'ctrl_select_now');
            //} else {
            //    _my._nodes.ctrl_select_now = false;
            //}
            // フルスクリーン
            if (_my._values.fullscreen_use) {
                _my._nodes.ctrl_full = imba_t3.node.one('#' + _my.playerID + 'ctrl_full');
                _my._nodes.ctrl_full.on('click', function (e) {
                    _my._click_button(13);
                });
            }
            // ビデオコントローラ設定
            if (_my._values.ctrl_use) {
                _my._nodes.ctrl = imba_t3.node.one('#' + _my.playerID + 'ctrl');
            } else {
                _my._nodes.ctrl = false;
            }

            if (_my._values.seek_use) {
                _my._nodes.ctrl_video_seek_slider = imba_t3.node.one('#' + _my.playerID + 'ctrl_video_seek_slider');
                _my._nodes.ctrl_video_seek_cover = imba_t3.node.one('#' + _my.playerID + 'ctrl_video_seek_cover');
            }
            if (_my._values.volume_use) {
                //音量
                if (!(_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
                    _my._nodes.ctrl_volume_slider = imba_t3.node.one('#' + _my.playerID + 'ctrl_volume_slider');
                }
            }
            //設定ボタン
            if (true) {
                _my._nodes.ctrl_setting = imba_t3.node.one('#' + _my.playerID + 'ctrl_setting');
                _my._nodes.ctrl_setting.on('click', function (e) {
                    _my._click_button(14);
                });
            }

        }
        // 認証ウィンドウ用
        _my._nodes.movie_auth = imba_t3.node.one('#' + _my.playerID + 'login');
        // ナビウィンドウコントロール用
        _my._nodes.info = imba_t3.node.one('#' + _my.playerID + 'info');
        _my._nodes.info_icon = imba_t3.node.one('#' + _my.playerID + 'info_icon');
        _my._nodes.info_title = imba_t3.node.one('#' + _my.playerID + 'info_title');

        var info_close = imba_t3.node.one('#' + _my.playerID + 'info_close');
        info_close.on('click', function () { _my._click_button(33); });

        if (_my._values.exlink_use || _my._values.sns_use || _my._values.viraltag_use) {
            _my._nodes.navi = imba_t3.node.one('#' + _my.playerID + 'navi');
            _my._values.info = false;

            if (_my._values.exlink_use) {
                _my._nodes.info_outlink = imba_t3.node.one('#' + _my.playerID + 'info_outlink');
                _my._nodes.navi_outlink = imba_t3.node.one('#' + _my.playerID + 'navi_outlink');
                _my._nodes.navi_outlink.on('click', function (e) { _my._click_button(31); });
            } else {
                _my._nodes.info_outlink = false;
            }

            if (_my._values.sns_use || _my._values.viraltag_use) {
                _my._nodes.info_share = imba_t3.node.one('#' + _my.playerID + 'info_share');
                _my._nodes.navi_share = imba_t3.node.one('#' + _my.playerID + 'navi_share');
                _my._nodes.navi_share.on('click', function () { _my._click_button(32); });
            } else {
                _my._nodes.info_share = false;
            }
            if (_my._values.viraltag_use) {
                _my._nodes.info_viral = imba_t3.node.one('#' + _my.playerID + 'info_viral');
            } else {
                _my._nodes.info_viral = false;
            }
        } else {
            _my._nodes.navi = false;
            _my._nodes.info_outlink = false;
            _my._nodes.info_share = false;
        }
        _my._setting_display();

    };
    //element.styleにdisplay設定
    _my._setting_display = function () {

        if (_my._nodes.player_main) {
            _my._nodes.player_main.setStyle("display", "block");
        }
        _my._nodes.video_operation = imba_t3.node.one('#' + _my.playerID + 'video_operation');
        if (_my._nodes.video_operation) {
            _my._nodes.video_operation.setStyle("display", "table");
        }
        _my._nodes.play = imba_t3.node.one('#' + _my.playerID + 'play');
        if (_my._nodes.play) {
            _my._nodes.play.setStyle("display", "table-cell");
        }
        _my._nodes.info = imba_t3.node.one('#' + _my.playerID + 'info');
        if (_my._nodes.info) {
            _my._nodes.info.setStyle("display", "none");
        }
        _my._nodes.info_header = imba_t3.node.one('#' + _my.playerID + 'info_header');
        if (_my._nodes.info_header) {
            _my._nodes.info_header.setStyle("display", "table");
        }
        _my._nodes.info_title = imba_t3.node.one('#' + _my.playerID + 'info_title');
        if (_my._nodes.info_title) {
            _my._nodes.info_title.setStyle("display", "table-cell");
        }
        _my._nodes.setting_panel_menu = imba_t3.node.one('#' + _my.playerID + 'setting_panel_menu');
        if (_my._nodes.setting_panel_menu) {
            _my._nodes.setting_panel_menu.setStyle("display", "table");
        }
        _my._nodes.playbackrate_item = imba_t3.node.one('#' + _my.playerID + 'playbackrate_item');
        if (_my._nodes.playbackrate_item) {
            if (_my._nodes.playbackrate_item.getStyle("display") != "none;")
                _my._nodes.playbackrate_item.setStyle("display", "table-row");
        }
        _my._nodes.closedcaption_item = imba_t3.node.one('#' + _my.playerID + 'closedcaption_item');
        if (_my._nodes.closedcaption_item) {
            if (_my._nodes.closedcaption_item.getStyle("display") != "none;")
                _my._nodes.closedcaption_item.setStyle("display", "table-row");
        }
        _my._nodes.quality_item = imba_t3.node.one('#' + _my.playerID + 'quality_item');
        if (_my._nodes.quality_item) {
            if (_my._nodes.quality_item.getStyle("display") != "none;")
                _my._nodes.quality_item.setStyle("display", "table-row");
        }
        _my._nodes.select_panel_menu = imba_t3.node.one('#' + _my.playerID + 'select_panel_menu');
        if (_my._nodes.select_panel_menu) {
            _my._nodes.select_panel_menu.setStyle("display", "table");
        }
        _my._nodes.ctrl_replay = imba_t3.node.one('#' + _my.playerID + 'ctrl_replay');
        if (_my._nodes.ctrl_replay) {
            _my._nodes.ctrl_replay.setStyle("display", "none");
        }
        _my._nodes.ctrl_replay_icon = imba_t3.node.one('#' + _my.playerID + 'ctrl_replay_icon');
        if (_my._nodes.ctrl_replay_icon) {
            _my._nodes.ctrl_replay_icon.setStyle("display", "table-cell");
        }
        _my._nodes.ctrl_replay_text = imba_t3.node.one('#' + _my.playerID + 'ctrl_replay_text');
        if (_my._nodes.ctrl_replay_text) {
            _my._nodes.ctrl_replay_text.setStyle("display", "table-cell");
        }
    }
    // ビデオ初期化
    _my._init_video = function () {

        _my._nodes.video = imba_t3.node.one('#' + _my.videoID);
        _my._nodes.video.setStyle('opacity', 0);

        _my._nodes.video.on('loadstart', function (e) { _my._set_movie_status('loadstart'); });
        _my._nodes.video.on('progress', function (e) {
            _my._set_movie_status('progress');
        });
        _my._nodes.video.on('loadeddata', function (e) {
            _my._set_movie_status('loadeddata');
            if (_my._values.first_play == true) {

            }
        });
        _my._nodes.video.on('canplay', function (e) { _my._set_movie_status('canplay'); });
        _my._nodes.video.on('loadend', function (e) { _my._set_movie_status('loadend'); });
        _my._nodes.video.on('abort', function (e) { _my._set_movie_status('abort'); });
        _my._nodes.video.on('seeking', function (e) { _my._set_movie_status('seeking'); });

        _my._nodes.video.on('loadedmetadata', function (e) {
            //ユーザーエージェントがメディアリソースの長さと寸法を判定した
            _my._set_movie_status('loadedmetadata');
            //初回のみ初期化（イベント多重登録になるため）
            if (!document.getElementById(_my.playerID + "slider-movie-h_rail")) _my._init_video_seek();

            _my._ready();
        });
        _my._nodes.video.on('canplaythrough', function (e) {
            //ユーザーエージェントは、今すぐに再生を開始しても、
            //コンテンツのさらなるバッファリングのために停止することなく
            //メディアリソースを現在の再生速度で最後までレンダリングできると予測している
            // _my._set_movie_status('canplaythrough');

        });
        _my._nodes.video.on('suspend', function (e) {
            //ユーザーエージェントが意図的にメディアデータのフェッチを現在行っていないが、
            //メディアリソース全体のダウンロードが済んでいるわけでもない
            //画面を消した場合も発生
            //_my._set_movie_status('suspend');
        });
        _my._nodes.video.on('error', function (e) {
            //メディアデータのフェッチ実行中にエラーが発生
            _my._set_movie_status('error');
            if (_my._values.jmcPlayer.accessor.isDebug) {
                console.log("Error " + e._event.target.error.code + "; details: " + e._event.target.error.message);
            }
            if (!_my._values.isLive) {

                _my._set_info_error(e._event.target.error.code);
            }

        });
        _my._nodes.video.on('playing', function (e) {
            //再生が開始された
            // stalledから復帰のplay実行時には発火しないので注意
            _my._set_movie_status('playing');
            //if (_my._values.jmcPlayer.flashVars.platform["isIE"]) {
            _my._nodes.video.dom_node.playbackRate = _my._values.playbackRate;
            //}
            //ios10 inline再生対策
            if (_my._values.jmcPlayer.flashVars.platform["isSafari"] && _my._values.jmcPlayer.flashVars.platform["os"]["name"] == "iOS") {
                if (Number(_my._values.jmcPlayer.flashVars.platform["os"]["version"].split(".")[0]) >= 10) {
                    _my._nodes.video.setStyle("visibility", "hidden");
                }
            }
            _my._play();
        });
        _my._nodes.video.on('waiting', function (e) {
            //次のフレームが利用不可のため再生を停止したが、
            //ユーザーエージェントはそのフレームがやがて利用可能になると想定している
            _my._set_movie_status('waiting');

        });
        _my._nodes.video.on('seeking', function (e) {
            //サムネイル表示の時video表示にする
            //if ((_my._values.jmcPlayer.flashVars.platform["isIE"]) && _my._nodes.video.getStyle("width") == "1px" && _my._nodes.video.getStyle("height") == "1px") {
            //    var video = _my._nodes.video.DOMNode();
            //    video.pause();
            //    video.play();
            //}
        });
        _my._nodes.video.on('seeked', function (e) {
            //IDL属性のseekingがfalseに変化した
            if (!_my._values.isReplay) {
                _my._set_movie_status('seeked');
            }
            _my._seeked();

        });
        _my._nodes.video.on('ended', function (e) {
            //メディアリソースの終端に達したので再生が停止した
            _my._set_movie_status('ended');
            _my._end();
        });
        _my._nodes.video.on('durationchange', function (e) {
            //duration属性が更新された
            _my._set_movie_status('durationchange');
            _my._set_duration();

        });
        _my._nodes.video.on('timeupdate', function (e) {
            //現在の再生位置の変化が、通常の再生に伴って、
            //あるいは特に興味深い形（不連続的な変化など）で起こった
            //_my._set_movie_status('timeupdate');
        });
        _my._nodes.video.on('play', function (e) {
            //再生が開始された。play()メソッドからの復帰後に発生する
            _my._nodes.video.dom_node.removeAttribute("controls");
            _my._set_movie_status('play');
        });
        _my._nodes.video.on('pause', function (e) {
            //再生が一時停止された。pauseメソッドからの復帰後に発生する
            _my._nodes.video.dom_node.removeAttribute("controls");
            _my._set_movie_status('pause');
            _my._pause();

        });
        _my._nodes.video.on('stalled', function (e) {
            //ユーザーエージェントがメディアデータのフェッチを試みたが、
            //データがまだ用意されていない
            // 他ビデオ再生時にも発生
            _my._set_movie_status('stalled');

        });
    };

    // 読み込んだ情報を反映
    _my._init_video_state = function () {
        _my._values.currentTime = 0;
        _my._values.stalledTime = 0;

        // サムネイル設定
        _my._set_video_thumb(_my._values.thumb_filePath);

        // タイトル設定（ヘッダ設定）
        _my._set_video_title();

        // ビデオ表示設定
        _my._values.video_w = _my._values.movie_w;
        _my._values.video_h = _my._values.movie_h;
        _my._values.video_x = 0;
        _my._values.video_y = 0;
        _my._nodes.video.setStyle("bottom", "0px");
        _my._nodes.video.setStyle("right", "0px");
        _my._nodes.video.setStyle("width", "1px");
        _my._nodes.video.setStyle("height", "1px");
        _my._nodes.video.setStyle("z-index", "1");
        _my._nodes.video.setStyle("display", "block");

        // VA関連設定
        var elem = document.getElementById(_my.videoID);
        elem.setAttribute("vid", _my._values.vid);
        elem.setAttribute("svcid", _my._values.svcid);
        elem.setAttribute("mn", _my._values.mn);

        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (_my._values.thumb_filePath) {
            //video.poster = _my._values.thumb_filePath;
        }

        //サムネイル領域
        if (_my._values.responsive == "on" || _my._values.responsive == "fit") {
            _my._nodes.btn_operation.setStyle("left", "0px");
            _my._nodes.btn_operation.setStyle("top", "0px");
            _my._nodes.btn_operation.setStyle("width", "100%");
            _my._nodes.btn_operation.setStyle("height", "100%");
        } else {
            meka_t3.set_nodeStyleBox(_my._nodes.btn_operation, 0, 0, _my._values.movie_w, _my._values.movie_h - _my._values.footerSize);
        }
        _my._nodes.btn_operation.setStyle("left", "0px");
        _my._nodes.btn_operation.setStyle("top", "0px");
        _my._nodes.btn_operation.setStyle("width", "100%");
        _my._nodes.btn_operation.setStyle("height", "100%");
        if (_my._values.responsive == "on" || _my._values.responsive == "fit") {
            _my._nodes.video_main.setStyle("width", "100%");
            _my._nodes.video_main.setStyle("height", "100%");
            _my._nodes.video_main.setStyle("position", "absolute");
        } else {
            meka_t3.set_nodeStyleSize(_my._nodes.video_main, _my._values.movie_w, _my._values.movie_h - _my._values.footerSize);
        }

        // フッター設定
        if (_my._values.movie_footer && (_my._values.movie_footer.length > 0) && (_my._values.responsive != "on" && _my._values.responsive != "fit")) {
            var footer_text = imba_t3.node.one('#' + _my.playerID + 'footer_text');
            //footer_text.setInner(_my._values.movie_footer);
            footer_text.setStyle("text-align", _my._values.footer_align);
            footer_text.setStyle("max-width", _my._values.movie_w + "px");
        }

        // if (_my._values.multibitrate_use) _my._init_movie_select();

        // コントローラは画面下部へ(フッターの上）：SI/SO用に位置保存[30:ctrl_h]
        if (_my._values.ctrl_use) {
            _my._nodes.ctrl.setStyle("left", "0px");
            _my._nodes.ctrl.setStyle("width", "100%");
            _my._nodes.ctrl.setStyle("bottom", "0px");
        }
        _my._values.ctrl_y = _my._values.movie_h - _my._values.footerSize - 30;

        //----------------------------------
        // 各情報ウィンドウサイズ[h=H30/F20]
        _my._values.info_w = Math.max(_my._values.movie_w * 0.8, 150);
        _my._values.info_h = Math.max((_my._values.movie_h - _my._values.footerSize - 50) * 0.8, 136 - 30)
        var info_x = (_my._values.movie_w - _my._values.info_w) / 2;
        var info_y = (_my._values.movie_h - _my._values.footerSize - _my._values.info_h) / 2;

        // outlink流し込み
        var i;
        if (_my._values.exlink_use && _my._values.outlink) {
            for (i = 0; i < _my._values.outlink.length; i++)
                if (_my._values.outlink[i]) _my._set_outlink((i + 1), _my._values.outlink[i].text, _my._values.outlink[i].url);
        }
        //認証 iPhoneはlightbox扱いしない
        if (_my._values.jmcPlayer.accessor.model.isAuthEnable() && ((_my._values.platform["os"]["name"] == "iOS" && _my._values.platform["isSP"]) || !_my._values.jmcPlayer.accessor.model.isLightbox)) {
            _my._set_auth();
            var auth_h = _my._get_css_suffix() == _my.PS_MINIMUM ? _my._values.movie_h : _my._values.info_h;
            var auth_y = _my._get_css_suffix() == _my.PS_MINIMUM ? 0 : info_y;
            var login = imba_t3.node.one('#' + _my.playerID + 'login');
            var login_main = imba_t3.node.one('#' + _my.playerID + 'login_main');
        }
        // シェア流し込み
        if (_my._values.sns_use) _my._set_share();

        var info = imba_t3.node.one('#' + _my.playerID + 'info');
        var info_main = imba_t3.node.one('#' + _my.playerID + 'info_main');
        info.setStyle("width", "100%");
        info.setStyle("height", "100%");
        info.setStyle("left", "0px");
        info.setStyle("top", "0px");
        // infoウィンドウ-ヘッダサイズ：30px
        meka_t3.set_nodeStyleSize(info_main, _my._values.info_w, _my._values.info_h - 30);
        info_main.setStyle("width", "100%");
        info_main.setStyle("height", "100%");
        //info_main.setStyle("margin", "18% 0 0 0");
        info_main.setStyle("display", "table");
        info_main.setStyle("padding-top", "30px");
        _my._set_setting();
        _my._init_status_icon();
        _my._init_ctrl_video_seek();
        _my._init_ctrl_volume();
        _my._init_volume();
        _my._init_caption();

        _my._nodes.video_main.setStyle('display', 'block');
    };
    _my._init_text = function () {
        if (_my._values.title_use) {
            _my._nodes.video_title_text.setInner(_my._values.movie_title);
        }
        if (_my._values.time_use) {
            _my._nodes.video_total_time.setInner(_get_timeString(Math.floor(_my._values.duration)));
        }
        if (_my._values.movie_footer && (_my._values.movie_footer.length > 0) && (_my._values.responsive != "on" && _my._values.responsive != "fit")) {
            var footer_text = imba_t3.node.one('#' + _my.playerID + 'footer_text');
            footer_text.setInner(_my._values.movie_footer);
        }
    }
    // ボタンイベント。
    //14:setting
    //15:replay
    //31:outlink
    //32:share
    //33:info_close
    //34:navi_viral
    //35:viraltag_copy
    _my._click_button = function (index) {
        if (_my._values.movie_status == 'error') return;

        if (((index != 31) && (index != 32) && (index != 33) && (index != 15) && (index != 14) && (index != 34) && (index != 35)) && _my._values.info) return;

        if (_my._values.fullscreenTimer) {
            _my._values.fullscreen = false;
            _my._update_fullscreen();
        }
        _my._log("[click idx]" + index);
        switch (index) {
            case 11:	// play/pause/stop
                _my._video_change_ctrl();
                break;

            case 13:	// full
                //認証ありで認証通過前のフルスクリーン操作は再生と同じ
                if (_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable()) {
                    if (_my._values.auth_input) {
                        _my._set_login_visibled(true);
                    } else {
                        _my._values.jmcPlayer.accessor.login(null, null);
                    }
                    return;
                }
                if (_my._values.setting) {
                    _my.setSettingVisible(false);
                }
                if (_my._values.menu) {
                    _my._close_select_menu();
                }
                _my._fullscreen();
                break;
            case 14:
                if (_my._values.setting) {
                    _my.setSettingVisible(false);
                } else {
                    _my.setSettingVisible(true);
                }
                break;

            case 15:	// replay
                _my._replay();
                break;

            case 31:	// outlink
                //if (_my._values.setting || _my._values.menu) {
                //    _my._click_button(40);
                //    return
                //}
                if (_my._values.setting) {
                    _my.setSettingVisible(false);
                }
                if (_my._values.menu) {
                    _my._close_select_menu();
                }
                if (!_my._values.info) {
                    _my._values.info_type = 31;
                    _my._set_info_outlink();
                    _my._set_info_visibled(true);
                } else {
                    if (_my._values.info_type == 31) {
                        _my._set_info_visibled(false);
                    } else {
                        _my._values.info_type = 31;
                        _my._set_info_outlink();
                    }
                }
                break;
            case 32:	// share
                //if (_my._values.setting || _my._values.menu) {
                //    _my._click_button(40);
                //    return
                //}
                if (_my._values.setting) {
                    _my.setSettingVisible(false);
                }
                if (_my._values.menu) {
                    _my._close_select_menu();
                }

                if (!_my._values.info) {
                    _my._values.info_type = 32;
                    _my._set_info_share();
                    _my._set_info_visibled(true);
                } else {
                    if (_my._values.info_type == 32) {
                        _my._set_info_visibled(false);
                    } else {
                        _my._values.info_type = 32;
                        _my._set_info_share();
                    }
                }
                break;
            case 33:// infoウィンドウ閉じる
                _my._set_info_visibled(false);
                break;
            case 34:
                //if (_my._values.setting || _my._values.menu) {
                //    _my._click_button(40);
                //    return
                //}
                if (_my._values.setting) {
                    _my.setSettingVisible(false);
                }
                if (_my._values.menu) {
                    _my._close_select_menu();
                }
                if (!_my._values.info) {
                    _my._values.info_type = 34;
                    _my._set_info_viral();
                    _my._set_info_visibled(true);
                } else {
                    if (_my._values.info_type == 34) {
                        _my._set_info_visibled(false);
                    } else {
                        _my._values.info_type = 34;
                        _my._set_info_viral();
                    }
                }
                break;
            case 35:
                var userAgent = window.navigator.userAgent.toLowerCase();
                var textarea = document.getElementById(_my.playerID + "viralText");
                var text = textarea.textContent;
                var successful = false;
                if (_my._values.jmcPlayer.flashVars.platform["isIE"]) {
                    window.clipboardData.setData("Text", text); // IE
                    successful = (window.clipboardData.getData("Text") == text);
                } else {
                    textarea.select();
                    try {
                        successful = document.execCommand('copy');
                    } catch (er) {
                        successful = false;
                    }
                }
                if (successful) {
                    window.alert("コピーしました。")
                } else {
                    window.alert("コピーに失敗しました。")
                }
                break;
            case 40:	// 画面全体
                // コントローラ・タイトルを表示
                if (_my._values.info) return;
                if (_my._values.setting) {
                    _my.setSettingVisible(false);
                }
                if (_my._values.menu) {
                    _my._close_select_menu();
                }
                if (!_my._values.operation._view) {
                    _my._set_navi_visibled(true);
                }
                if (_my._values.platform["isSP"] || _my._values.platform["isTablet"]) {
                    var video = _my._nodes.video.DOMNode();
                    if (!_my._values.ctrl_use || video.paused || _my._values.operation._view) {
                        _my._video_change_ctrl();
                    }
                } else {
                    _my._video_change_ctrl();
                }

                break;
        }

        _my._setOperationTime();

    };
    _my._remove_ctrl_full_cover = function () {
        var full_cover = document.getElementById(_my.playerID + "ctrl_full_cover");
        if (full_cover) {
            full_cover.style.display = "none";
        }
    }

    // フルスクリーン処理
    _my._fullscreen = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;

        if (_my._values.first_play == true && (_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
            return;
        }
        if (_my._values.fullscreenTimer) {
            _my._values.fullscreen = false;
            _my._update_fullscreen();
        }
        var isSPMode = true;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/samsungbrowser/)) {
            isSPMode = false;
        } else if (_my._values.platform["os"]["name"] == "Android" && ((_my._values.platform["browser"]["name"] == "Chrome" && Number(_my._values.platform["browser"]["version"].split(".")[0]) >= 55) || _my._values.platform["browser"]["name"] == "Firefox")) {
            isSPMode = false;
        } else if (!_my._values.jmcPlayer.flashVars.platform["isSP"] && !_my._values.jmcPlayer.flashVars.platform["isTablet"]) {
            isSPMode = false;
        }

        //if (!isSPMode) {
        //    if (_my._values.responsive == "on" || _my._values.responsive == "fit") {
        //        _my._nodes.video_main.dom_node.style.position = "relative";
        //    }
        //    _my._nodes.video.setStyle("top", "0px");
        //    _my._nodes.video.setStyle("left", "0px");
        //    _my._nodes.video.setStyle("width", "100%");
        //    var appVersion = window.navigator.appVersion.toLowerCase();
        //    var iosVersion = null;
        //    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        //        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        //        iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
        //    }
        //    if (iosVersion == null) {
        //        _my._nodes.video.setStyle("height", "100%");
        //    } else if (iosVersion[0] < 8) {
        //        _my._nodes.video.setStyle("height", "100%");
        //    } else {
        //        _my._nodes.video.setStyle("height", "100%");
        //        _my._nodes.video.setStyle("margin", "auto");
        //    }
        //    if (_my._values.fullscreen_use) {
        //        var fullscreen_btn = document.getElementById(_my.playerID + "ctrl_full");
        //        fullscreen_btn.className = "ctrl_full_off";
        //    }

        //    _my._nodes.video.setStyle("opacity", "1");
        //    _my._nodes.video.setStyle("z-index", "10");
        //    if (!_my._values.first_play) {
        //        _my._set_video_thumb("");
        //    }
        //    if (_my._getPlayerStyle("width") == _my.PS_MINIMUM) {
        //        var ctrl_right = imba_t3.node.one('#' + _my.playerID + 'ctrl_right_wrap');
        //        ctrl_right.setStyle("width", 60 + "px");
        //    }

        //}


        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            if (document.exitFullscreen != null) { document.exitFullscreen(); }
            else if (document.mozCancelFullScreen != null) { document.mozCancelFullScreen(); }
            else if (document.webkitCancelFullScreen != null) { document.webkitCancelFullScreen(); }
            else if (document.msExitFullscreen != null) { document.msExitFullscreen(); }
            return;
        }
        //スマートフォン・タブレットはvideoタグを最大化
        //PD SP Tablet Chrome ver55以上
        var flg = false;
        if (isSPMode) {
            if (_my._nodes.video.dom_node.requestFullScreen != null) { _my._nodes.video.dom_node.requestFullScreen(); }
            else if (_my._nodes.video.dom_node.msRequestFullscreen != null) { _my._nodes.video.dom_node.msRequestFullscreen(); }
            else if (_my._nodes.video.dom_node.mozRequestFullScreen != null) { _my._nodes.video.dom_node.mozRequestFullScreen(); }
            else if (_my._nodes.video.dom_node.webkitRequestFullScreen != null) { _my._nodes.video.dom_node.webkitRequestFullScreen(); }
            else if (_my._nodes.video.dom_node.webkitEnterFullScreen != null) {
                _my._nodes.video.dom_node.webkitEnterFullScreen();
                _my._values.fullscreen = false;
            }
        } else {

            if (_my._nodes.video_main.dom_node.requestFullScreen != null) {
                _my._nodes.video_main.dom_node.requestFullScreen();
                flg = true;
            }
            else if (_my._nodes.video_main.dom_node.msRequestFullscreen != null) {
                _my._nodes.video_main.dom_node.msRequestFullscreen();
                flg = true;
            }
            else if (_my._nodes.video_main.dom_node.mozRequestFullScreen != null) {
                _my._nodes.video_main.dom_node.mozRequestFullScreen();
                flg = true;
            }
            else if (_my._nodes.video_main.dom_node.webkitRequestFullScreen != null) {
                _my._nodes.video_main.dom_node.webkitRequestFullScreen();
                flg = true;
            }
            else if (_my._nodes.video_main.dom_node.webkitEnterFullScreen != null) {
                _my._nodes.video_main.dom_node.webkitEnterFullScreen();
                _my._values.fullscreen = false;
                flg = true;
            }
            else if (_my._nodes.video.dom_node.requestFullScreen != null) { _my._nodes.video.dom_node.requestFullScreen(); }
            else if (_my._nodes.video.dom_node.msRequestFullscreen != null) { _my._nodes.video.dom_node.msRequestFullscreen(); }
            else if (_my._nodes.video.dom_node.mozRequestFullScreen != null) { _my._nodes.video.dom_node.mozRequestFullScreen(); }
            else if (_my._nodes.video.dom_node.webkitRequestFullScreen != null) { _my._nodes.video.dom_node.webkitRequestFullScreen(); }
            else if (_my._nodes.video.dom_node.webkitEnterFullScreen != null) {
                _my._nodes.video.dom_node.webkitEnterFullScreen();
                _my._values.fullscreen = false;
            }
        }
        //var flg = false;
        //if (_my._nodes.video_main.dom_node.requestFullScreen != null) {
        //    _my._nodes.video_main.dom_node.requestFullScreen();
        //    flg = true;
        //}
        //else if (_my._nodes.video_main.dom_node.msRequestFullscreen != null) {
        //    _my._nodes.video_main.dom_node.msRequestFullscreen();
        //    flg = true;
        //}
        //else if (_my._nodes.video_main.dom_node.mozRequestFullScreen != null) {
        //    _my._nodes.video_main.dom_node.mozRequestFullScreen();
        //    flg = true;
        //}
        //else if (_my._nodes.video_main.dom_node.webkitRequestFullScreen != null) {
        //    _my._nodes.video_main.dom_node.webkitRequestFullScreen();
        //    flg = true;
        //}
        //    else if (_my._nodes.video_main.dom_node.webkitEnterFullScreen != null) {
        //        _my._nodes.video_main.dom_node.webkitEnterFullScreen();
        //        _my._values.fullscreen = false;
        //        flg = true;
        //    } else if (_my._nodes.video.dom_node.requestFullScreen != null) { _my._nodes.video.dom_node.requestFullScreen(); }
        //    else if (_my._nodes.video.dom_node.msRequestFullscreen != null) { _my._nodes.video.dom_node.msRequestFullscreen(); }
        //    else if (_my._nodes.video.dom_node.mozRequestFullScreen != null) { _my._nodes.video.dom_node.mozRequestFullScreen(); }
        //    else if (_my._nodes.video.dom_node.webkitRequestFullScreen != null) { _my._nodes.video.dom_node.webkitRequestFullScreen(); }
        //    else if (_my._nodes.video.dom_node.webkitEnterFullScreen != null) {
        //        _my._nodes.video.dom_node.webkitEnterFullScreen();
        //        _my._values.fullscreen = false;
        //    }
        if (flg) {
            if (_my._values.responsive == "on" || _my._values.responsive == "fit") {
                _my._nodes.video_main.dom_node.style.position = "relative";
            }
            _my._nodes.video.setStyle("top", "0px");
            _my._nodes.video.setStyle("left", "0px");
            _my._nodes.video.setStyle("width", "100%");
            var appVersion = window.navigator.appVersion.toLowerCase();
            var iosVersion = null;
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
            }
            if (iosVersion == null) {
                _my._nodes.video.setStyle("height", "100%");
            } else if (iosVersion[0] < 8) {
                _my._nodes.video.setStyle("height", "100%");
            } else {
                _my._nodes.video.setStyle("height", "100%");
                _my._nodes.video.setStyle("margin", "auto");
            }
            if (_my._values.fullscreen_use) {
                var fullscreen_btn = document.getElementById(_my.playerID + "ctrl_full");
                fullscreen_btn.className = "ctrl_full_off";
            }

            _my._nodes.video.setStyle("opacity", "1");
            _my._nodes.video.setStyle("z-index", "10");
            if (!_my._values.first_play) {
                _my._set_video_thumb("");
            }
            if (_my._getPlayerStyle("width") == _my.PS_MINIMUM) {
                var ctrl_right = imba_t3.node.one('#' + _my.playerID + 'ctrl_right_wrap');
                ctrl_right.setStyle("width", 60 + "px");
            }

        }
        _my._values.fullscreenTimer = setInterval(_my._update_fullscreen, 1000 / 10);
    }

    _my._update_fullscreen = function (isVisible) {
        _my._update_time();

        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        var flg = false;
        if (_my._nodes.video_main.dom_node.requestFullScreen != null ||
            _my._nodes.video_main.dom_node.msRequestFullscreen != null ||
            _my._nodes.video_main.dom_node.mozRequestFullScreen != null ||
            _my._nodes.video_main.dom_node.webkitRequestFullScreen != null ||
            _my._nodes.video_main.dom_node.webkitEnterFullScreen != null) {
            flg = true;
        }
        var isSPMode = true;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/samsungbrowser/)) {
            isSPMode = false;
        } else if (_my._values.platform["os"]["name"] == "Android" && ((_my._values.platform["browser"]["name"] == "Chrome" && Number(_my._values.platform["browser"]["version"].split(".")[0]) >= 55) || _my._values.platform["browser"]["name"] == "Firefox")) {
            isSPMode = false;
        } else if (!_my._values.jmcPlayer.flashVars.platform["isSP"] && !_my._values.jmcPlayer.flashVars.platform["isTablet"]) {
            isSPMode = false;
        }
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            _my._values.fullscreen = true;
            if (!(_my._values.responsive == "on" || _my._values.responsive == "fit")) {
                _my._nodes.btn_operation.setStyle("left", "0px");
                _my._nodes.btn_operation.setStyle("top", "0px");
                _my._nodes.btn_operation.setStyle("width", "100%");
                _my._nodes.btn_operation.setStyle("height", "100%");
                _my._nodes.video_main.setStyle("width", "100%");
                _my._nodes.video_main.setStyle("height", "100%");
            }
            return
        } else if (_my._values.fullscreen == true) {
            _my._values.fullscreen = false;
            _my._values.preVolume = video.volume;
            clearInterval(_my._values.fullscreenTimer);
            _my._values.fullscreenTimer = null;
            if (_my._values.setting) {
                _my.setSettingVisible(false);
            }
            if (_my._values.menu) {
                _my._close_select_menu();
            }
            if (_my._values.fullscreen_use) {
                var fullscreen_btn = document.getElementById(_my.playerID + "ctrl_full");
                fullscreen_btn.className = "ctrl_full";
            }
            //サムネイル出す
            _my._nodes.video.setStyle("bottom", "0px");
            _my._nodes.video.setStyle("right", "0px");
            _my._nodes.video.setStyle("top", null);
            _my._nodes.video.setStyle("left", null);
            _my._nodes.video.setStyle("width", "1px");
            _my._nodes.video.setStyle("height", "1px");
            _my._nodes.video.setStyle("opacity", "0");
            _my._nodes.video.setStyle("z-index", "1");
            _my._set_video_thumb(_my._values.thumb_filePath);
            _my._nodes.video.setStyle("top", "0px");
            _my._nodes.video.setStyle("left", "0px");
            _my._nodes.video.setStyle("width", "100%");
            var appVersion = window.navigator.appVersion.toLowerCase();
            var iosVersion = null;
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
            }
            if (iosVersion == null) {
                _my._nodes.video.setStyle("height", "100%");
            } else if (iosVersion[0] < 8) {
                _my._nodes.video.setStyle("height", "100%");
            } else {
                _my._nodes.video.setStyle("height", "100%");
                _my._nodes.video.setStyle("margin", "auto");
            }
            if (!(_my._values.responsive == "on" || _my._values.responsive == "fit")) {
                meka_t3.set_nodeStyleBox(_my._nodes.video, _my._values.video_x, _my._values.video_y, _my._values.video_w, _my._values.video_h);
                meka_t3.set_nodeStyleBox(_my._nodes.btn_operation, 0, 0, _my._values.movie_w, _my._values.movie_h - _my._values.footerSize);
                meka_t3.set_nodeStyleSize(_my._nodes.video_main, _my._values.movie_w, _my._values.movie_h - _my._values.footerSize);
            }
            if (flg) {
                if (_my._values.responsive == "on" || _my._values.responsive == "fit") {
                    _my._nodes.video_main.dom_node.style.position = "absolute";
                }
                if (_my._getPlayerStyle("width") == _my.PS_MINIMUM) {
                    var ctrl_right = imba_t3.node.one('#' + _my.playerID + 'ctrl_right_wrap');
                    ctrl_right.setStyle("width", 30 + "px");
                }
            }
            //if (!isSPMode) {
            //    if(_my._values.responsive == "on" || _my._values.responsive == "fit"){
            //        _my._nodes.video_main.dom_node.style.position = "absolute";
            //    }
            //    if (_my._getPlayerStyle("width") == _my.PS_MINIMUM) {
            //        var ctrl_right = imba_t3.node.one('#' + _my.playerID + 'ctrl_right_wrap');
            //        ctrl_right.setStyle("width", 30 + "px");
            //    }
            //}
            _my._nodes.video.setStyle("opacity", "1");
            _my._nodes.video.setStyle("z-index", "10");
            if (!_my._values.first_play) {
                _my._set_video_thumb("");
            }
            video.removeAttribute("controls");
            video.style.display = "inline-block";
            _my._setMuteButton();
            setTimeout(function () {
                video.style.display = "block";
            }, 1000);
            setTimeout(function () { _my._set_videoseek_slider(); }, 500)
        }

    }

    // ナビ（ヘッダ＋コントローラ）アニメーション処理（スライドイン・スライドアウト）
    _my._set_navi_visibled = function (isVisible) {
        if (_my._values.operation._view == isVisible) return;
        clearTimeout(_my._values.navitimer);

        var ani_ms = 500;

        if (isVisible) {
            // スライドイン
            _my._values.animation = true;
            if (_my._values.header_use) {
                _my._nodes.header.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                _my._nodes.header.setStyle('-webkit-animation-name', 'h5p_header-slide_in');
                _my._nodes.header.setStyle('animation-duration', ani_ms + 'ms');
                _my._nodes.header.setStyle('animation-name', 'h5p_header-slide_in');
                _my._nodes.header.setStyle('opacity', '1');
            }

            if (_my._values.ctrl_use) {
                _my._nodes.ctrl.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                _my._nodes.ctrl.setStyle('-webkit-animation-name', 'h5p_ctrl-slide_in');
                _my._nodes.ctrl.setStyle('animation-duration', ani_ms + 'ms');
                _my._nodes.ctrl.setStyle('animation-name', 'h5p_ctrl-slide_in');
                _my._nodes.ctrl.setStyle('opacity', '1');
            }

            if (_my._nodes.navi) {
                _my._nodes.navi.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                _my._nodes.navi.setStyle('-webkit-animation-name', 'h5p_fade_in');
                _my._nodes.navi.setStyle('animation-duration', ani_ms + 'ms');
                _my._nodes.navi.setStyle('animation-name', 'h5p_fade_in');
                _my._nodes.navi.setStyle('opacity', '1');
            }
            if (_my._values.isLive) {
                var liveMark = imba_t3.node.one('#' + _my.playerID + 'live_mark');
                if (!!liveMark) {
                    liveMark.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                    liveMark.setStyle('-webkit-animation-name', 'h5p_fade_in');
                    liveMark.setStyle('animation-duration', ani_ms + 'ms');
                    liveMark.setStyle('animation-name', 'h5p_fade_in');
                    liveMark.setStyle('opacity', '1');
                    //liveMark.style = "-webkit-animation-duration: " + ani_ms + "ms;-webkit-animation-name:h5p_fade_in;"+"animation-duration: " + ani_ms + "ms;animation-name:h5p_fade_in;"+"opacity:1;";
                }
            }

            _my._set_videoseek_slider();
            _my._values.navitimer = setTimeout(_my._set_navi_visibled_in, ani_ms - 10);


        } else {
            // スライドアウト
            var duration = Number(_my._values.duration);
            if (!isFinite(duration) && !_my._values.isLive) return;
            if (!_my._values.isLive && (duration - _my._values.currentTime) <= 1) {
                // 現在の再生位置が残り1秒未満なら処理しない
            } else {
                _my._values.animation = true;
                //_my._set_ctrl_select_list_visibled(false);

                if (_my._values.header_use) {
                    _my._nodes.header.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                    _my._nodes.header.setStyle('-webkit-animation-name', 'h5p_header-slide_out');
                    _my._nodes.header.setStyle('animation-duration', ani_ms + 'ms');
                    _my._nodes.header.setStyle('animation-name', 'h5p_header-slide_out');
                }

                if (_my._values.ctrl_use) {
                    _my._nodes.ctrl.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                    _my._nodes.ctrl.setStyle('-webkit-animation-name', 'h5p_ctrl-slide_out');
                    _my._nodes.ctrl.setStyle('animation-duration', ani_ms + 'ms');
                    _my._nodes.ctrl.setStyle('animation-name', 'h5p_ctrl-slide_out');
                }

                if (_my._nodes.navi) {
                    _my._nodes.navi.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                    _my._nodes.navi.setStyle('-webkit-animation-name', 'h5p_fade_out');
                    _my._nodes.navi.setStyle('animation-duration', ani_ms + 'ms');
                    _my._nodes.navi.setStyle('animation-name', 'h5p_fade_out');
                }
                if (_my._values.isLive) {
                    var liveMark = imba_t3.node.one('#' + _my.playerID + 'live_mark');
                    if (!!liveMark) {
                        liveMark.setStyle('-webkit-animation-duration', ani_ms + 'ms');
                        liveMark.setStyle('-webkit-animation-name', 'h5p_fade_out');
                        liveMark.setStyle('animation-duration', ani_ms + 'ms');
                        liveMark.setStyle('animation-name', 'h5p_fade_out');
                        //liveMark.style = "-webkit-animation-duration: " + ani_ms + "ms;-webkit-animation-name:h5p_fade_out;"+"animation-duration: " + ani_ms + "ms;animation-name:h5p_fade_out;";
                        //liveMark.style.display="none";
                    }
                }

                _my._values.navitimer = setTimeout(_my._set_navi_visibled_out, ani_ms);
            }

        }
    };

    // スライドイン完了
    _my._set_navi_visibled_in = function () {
        _my._values.animation = false;
        _my._values.operation._view = true;
        _my._values.navitimer = 0;
        _my._setOperationTime();
    };

    // スライドアウト完了
    _my._set_navi_visibled_out = function () {
        if (_my._values.header_use) _my._nodes.header.setStyle('opacity', '0');
        if (_my._values.ctrl_use) _my._nodes.ctrl.setStyle('opacity', '0');
        if (_my._nodes.navi) _my._nodes.navi.setStyle('opacity', '0');
        var liveMark = imba_t3.node.one('#' + _my.playerID + 'live_mark');
        if (liveMark) {
            liveMark.setStyle('opacity', '0');
        }

        _my._values.animation = false;
        _my._values.operation._view = false;
        _my._values.navitimer = 0;
    };

    // 画質変更
    _my._click_movie_select = function (index) {
        if (_my._values.movie_status == 'error') return;
        // 選択項目切替
        _my._close_select_menu();
        var i;
        _my._values.movie_index = index;

        if (_my._values.progressTimer) {
            clearInterval(_my._values.progressTimer);

            _my._values.progressTimer = null;
            _my._values.is_play = true;	// 「再生」状態保持
        } else {
            _my._values.is_play = false;
        }

        // 再生位置設定
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (_my._values.multibitrate_use) {
            var val = _my._get_movie_list_val(_my._values.movie_list[index].text);
            //_my._nodes.ctrl_select_now.setInner(_my._set_movie_list_text(val));
            _my._nodes.quality_item.dom_node.children[1].textContent = _my._set_movie_list_text(val);
        }
        //_my._set_ctrl_select_list_visibled(false);
        _my._values.movie_filepath = _my._values.movie_list[index].url;
        if (_my._values.isLive && _my._values.jmcPlayer.accessor.model.isKollectiveEnable()) {
            _my._values.jmcPlayer.accessor.hls.destroy();
            _my._values.first_play = true;
            var config = {
                debug: false,
                //startPosition: ct,
                startLevel: -1,
                highBufferWatchdogPeriod: 30
            }
            _my._values.jmcPlayer.accessor.hls = new Hls(config);
            _my._values.jmcPlayer.accessor.setErrorHandler();
            _my._values.jmcPlayer.accessor.addEventListener("canPlayHls", function () {
                if (_my._values.is_play) {
                    video.play();
                }
            });
            _my._values.jmcPlayer.accessor.tryLoadMedia(_my._values.movie_filepath);
            return;
        }
        if (_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS) {
            if (_my._values.first_play) {
                var seek_tooltip = document.getElementById(_my.playerID + "seek_tooltip");
                if (seek_tooltip)
                    seek_tooltip.style.display = "inherit";

                _my._remove_ctrl_full_cover();
            }
            var forEdge = function () {
                video.removeEventListener("play", forEdge);
                setTimeout(function () {
                    video.addEventListener("pause", switchMovieSource);
                    video.pause();
                }, 100);
            }
            var switchMovieSource = function () {
                if (video.removeEventListener) {
                    video.removeEventListener("pause", switchMovieSource);
                    _my._values.jmcPlayer.accessor.edgeSwitchMovieSourceFlg = false;
                }
                var ct = 0;
                if (_my._values.first_play) {
                    if (_my._values.start_time > 0) {
                        ct = _my._values.start_time;
                    }
                } else {
                    ct = _my._values.jmcPlayer.accessor.hls.media.currentTime;
                }

                if (!_my._values.isLive) {
                    var duration = Number(_my._values.duration);
                    if (!isFinite(duration)) return;
                    if ((_my._values.movie_status == "ended") || (_my._values.currentTime >= duration)) {
                        _my._values.is_play = false;
                        _my.setCurrentTime(0);
                        ct = 0;
                    }
                }

                _my._values.jmcPlayer.accessor.hls.destroy();
                _my._values.first_play = false;
                var config = {
                    debug: false,
                    //startPosition: ct,
                    startLevel: -1,
                    highBufferWatchdogPeriod: 30
                }
                _my._values.jmcPlayer.accessor.hls = new Hls(config);
                _my._values.jmcPlayer.accessor.setErrorHandler();
                _my._values.jmcPlayer.accessor.hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    _my._values.jmcPlayer.accessor.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                        var handler = function () {
                            video.removeEventListener("loadeddata", handler);
                            if (!_my._values.isLive) {
                                video.currentTime = ct;
                                video.playbackRate = _my._values.playbackRate;
                            }
                        }
                        video.addEventListener("loadeddata", handler);
                    });
                    _my._values.jmcPlayer.accessor.hls.loadSource(_my._values.movie_filepath);
                });
                _my._values.jmcPlayer.accessor.hls.attachMedia(document.getElementById(_my._values.jmcPlayer.accessor.model.objectID));
                if (_my._values.is_play) {
                    video.play();
                }
            }
            if (_my._values.is_play) {
                if (video.addEventListener) {
                    video.addEventListener("pause", switchMovieSource);
                }
                video.pause();
            } else {
                if (_my._values.platform["isEdge"] && _my._values.first_play) {
                    _my._values.jmcPlayer.accessor.edgeSwitchMovieSourceFlg = true;
                    video.addEventListener("play", forEdge);
                    _my.play();
                } else {
                    switchMovieSource();
                }
            }
        } else {
            if (_my._values.first_play == false) {
                var duration = Number(_my._values.duration);
                if (!isFinite(duration) && !_my._values.isLive) return;
                if ((_my._values.movie_status == "ended") || (_my._values.currentTime >= duration)) {
                    _my._values.is_play = false;
                    _my.setCurrentTime(0);
                    _my._values.currentTime = 0;
                    _my._values.load_currentTime = 0;
                } else {
                    if (_my._values.isLive) {
                        // Liveモード中は何もしない
                        _my._values.load_currentTime = 0;
                        _my._values.currentTime = 0;
                        video.currentTime = 0;
                        _my.videoseek_update_callback(0);
                    } else {
                        // 最後まで再生されていない
                        if (_my._values.load_currentTime >= 0)
                            _my._values.load_currentTime = video.currentTime;
                    }
                }
            } else {
                _my._values.load_currentTime = 0;
                if (_my._values.start_time > 0) {
                    _my._values.load_currentTime = _my._values.start_time;
                }
            }
            video.src = _my._values.movie_list[index].url;
            var loadeddata = function (e) {
                _my._set_movie_status('loadeddata');
                if (video.removeEventListener) {
                    video.removeEventListener("loadeddata", loadeddata);
                } else {
                    video.detachEvent("loadeddata", loadeddata);
                }


                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    video.addEventListener("timeupdate", timeupdate);
                    video.currentTime = _my._values.load_currentTime;
                } else {
                    video.currentTime = _my._values.load_currentTime;
                    if (_my._values.is_play) {
                        _my.play();
                    }
                }


            }
            var timeupdate = function (e) {
                if (Math.ceil(video.currentTime) >= Math.ceil(_my._values.load_currentTime)) {
                    video.removeEventListener("timeupdate", timeupdate);
                    if (_my._values.is_play) {
                        _my.play();
                    }
                }
            }

            if (video.addEventListener) {
                video.addEventListener("loadeddata", loadeddata);
            } else {
                video.attachEvent("onloadeddata", loadeddata);
            }

            video.load();

        }
        _my._set_videoseek_slider();
        if (_my._values.is_play) {
            _my._set_play_state('loading');
        }
    };



    // 関連ページウィンドウ設定
    _my._set_info_outlink = function () {
        //_my._set_ctrl_select_list_visibled(false);

        _my._nodes.info_icon.set('className', 'info_icon_outlink info_icon' + _my._get_css_suffix());
        _my._nodes.info_title.dom_node.className = "info_title" + _my._get_css_suffix();
        _my._nodes.info_title.setInner(_my._languageResource.kinds.LINKS);
        _my._nodes.navi_outlink.set('className', 'navi_outlink_selected');
        _my._nodes.info_outlink.setStyle('display', 'table-cell');
        _my._nodes.info_outlink.setStyle("width", "100%");
        _my._nodes.info_outlink.setStyle("padding-bottom", "50px");
        _my._nodes.info_outlink.setStyle("vertical-align", "middle");
        _my._nodes.info_outlink.dom_node.className = "info_outlink" + _my._get_css_suffix();
        var length = _my._nodes.info_outlink.dom_node.children.length;
        for (var i = 0; i < length; i++) {
            _my._nodes.info_outlink.dom_node.children[i].className = "outlink_url" + _my._get_css_suffix();
        }

        if (_my._values.sns_use) {
            _my._nodes.info_share.setStyle('display', 'none');
            _my._nodes.navi_share.set('className', 'navi_share' + _my._get_css_suffix("height"));
        }
        if (_my._values.viraltag_use) {
            _my._nodes.info_viral.setStyle('display', 'none');
            _my._nodes.navi_share.set('className', 'navi_share' + _my._get_css_suffix("height"));
            //_my._nodes.navi_viral.set('className', 'navi_viral' + _my._get_css_suffix("height"));

        }
    }

    // 共有ウィンドウ設定
    _my._set_info_share = function () {
        //_my._set_ctrl_select_list_visibled(false);
        _my._nodes.info_icon.set('className', 'info_icon_share info_icon' + _my._get_css_suffix());
        _my._nodes.info_title.dom_node.className = "info_title" + _my._get_css_suffix();
        _my._nodes.info_title.setInner(_my._languageResource.kinds.SHARE_MOVIE);
        _my._nodes.navi_share.set('className', 'navi_share_selected' + _my._get_css_suffix("height"));
        if (_my._values.sns_use) {
            _my._nodes.info_share.dom_node.className = "info_share" + _my._get_css_suffix();
            _my._nodes.info_share.setStyle('display', 'table-cell');
            _my._nodes.info_share.setStyle("width", "100%");
            var length = _my._nodes.info_share.dom_node.children.length;
            for (var i = 0; i < length; i++) {
                _my._nodes.info_share.dom_node.children[i].className = "info_share_link" + _my._get_css_suffix();
                var childName = _my._nodes.info_share.dom_node.children[i].children[0].className;

                if (childName.indexOf("twitter") != -1) {
                    childName = "info_share_link_icon info_share_twitter" + _my._get_css_suffix();
                } else if (childName.indexOf("facebook") != -1) {
                    childName = "info_share_link_icon info_share_facebook" + _my._get_css_suffix();
                } else if (childName.indexOf("google_plus") != -1) {
                    childName = "info_share_link_icon info_share_google_plus" + _my._get_css_suffix();
                }
                _my._nodes.info_share.dom_node.children[i].children[0].className = childName;
                if (_my._nodes.info_share.dom_node.children[i].tagName == "A") {
                    _my._nodes.info_share.dom_node.children[i].children[0].className = "info_share_link" + _my._get_css_suffix();
                    _my._nodes.info_share.dom_node.children[i].children[0].children[0].className = "info_share_link_icon info_share_line" + _my._get_css_suffix();
                }
            }
        }

        if (_my._values.exlink_use) {
            _my._nodes.info_outlink.setStyle('display', 'none');
            _my._nodes.navi_outlink.set('className', 'navi_outlink');
        }
        if (_my._values.viraltag_use) {
            _my._set_viral();
            if (_my._values.sns_use) {
                _my._nodes.info_viral.setStyle('display', 'table-row');
            } else {
                _my._nodes.info_viral.setStyle('display', 'table-cell');
                _my._nodes.info_viral.setStyle('padding-bottom', '30px');
                _my._nodes.info_viral.setStyle('vertical-align', 'middle');
            }
            _my._nodes.info_viral.dom_node.className = "info_viral" + _my._get_css_suffix();
            //if ((_my._values.jmcPlayer.flashVars.platform["isSafari"] && Number(_my._values.jmcPlayer.flashVars.platform["os"]["name"]) == "Macintosh") || _my._getPlayerStyle("height") != _my.PS_NORMAL) {
            var targetTag = document.getElementById(_my.playerID + "viralText");
            if (_my._values.jmcPlayer.flashVars.platform["isIE"] || _my._values.jmcPlayer.flashVars.platform["isEdge"]) {
                setTimeout(function () {
                    targetTag.select();
                }, 300);
            } else {
                setTimeout(function () {

                    targetTag.focus();
                    targetTag.select();
                }, 300)
            }
            //}
            //_my._nodes.navi_viral.set('className', 'navi_viral' + _my._get_css_suffix("height"));

        }
    }
    // バイラルタグウィンドウ設定
    _my._set_info_viral = function () {
        //_my._set_ctrl_select_list_visibled(false);

        _my._nodes.info_icon.set('className', 'info_icon_viral info_icon' + _my._get_css_suffix());
        _my._nodes.info_title.setInner(_my._languageResource.kinds.VIRALTAG);

        //_my._nodes.navi_viral.set('className', 'navi_viral_selected' + _my._get_css_suffix("height"));
        _my._nodes.info_viral.setStyle('display', 'table-cell');
        _my._nodes.info_viral.setStyle("width", "100%");
        if (_my._values.exlink_use) {
            _my._nodes.info_outlink.setStyle('display', 'none');
            _my._nodes.navi_outlink.set('className', 'navi_outlink');
        }
        if (_my._values.sns_use) {
            _my._nodes.info_share.setStyle('display', 'none');
            _my._nodes.navi_share.set('className', 'navi_share' + _my._get_css_suffix("height"));
        }
        if ((_my._values.jmcPlayer.flashVars.platform["isSafari"] && Number(_my._values.jmcPlayer.flashVars.platform["os"]["name"]) == "Macintosh") || _my._getPlayerStyle("height") != _my.PS_NORMAL) {
            setTimeout(function () {
                var targetTag = document.getElementById(_my.playerID + "viralText");
                targetTag.focus();
                targetTag.select();
            }, 300)
            var targetTag = document.getElementById(_my.playerID + "viralText");
            targetTag.focus();
            targetTag.select();
        }
    }
    //設定ウィンドウ表示切り替え
    _my.setSettingVisible = function (visible) {
        _my._nodes.setting_menu = imba_t3.node.one('#' + _my.playerID + 'setting_menu');
        if (visible) {
            _my._close_select_menu();
            display = "block";
            _my._values.setting = true;
            if (_my._values.fullscreen) {
                _my._nodes.setting_menu.dom_node.className = "setting_menu popup_menu setting_menu_fullscreen";
            } else {
                _my._nodes.setting_menu.dom_node.className = "setting_menu popup_menu";
            }
        } else {
            display = "none";
            _my._values.setting = false;
        }
        _my._nodes.setting_menu.setStyle("display", display);
    }

    // エラー表示設定
    _my._set_info_error = function (message) {
        _my._nodes.info_icon.set('className', 'info_icon_alert info_icon' + _my._get_css_suffix());
        _my._nodes.info_title.setInner(_my._languageResource.kinds.ERROR_TITLE);

        if (!_my.info_main) _my.info_main = imba_t3.node.one('#' + _my.playerID + 'info_main');

        if (_my._values.isLive) {
            if (message) {
                var title;
                var info;
                switch (message) {
                    case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                        title = _my._languageResource.kinds.P8001T;
                        info = _my._languageResource.kinds.P8001M;
                        break;
                    case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
                        title = _my._languageResource.kinds.P8002T;
                        info = _my._languageResource.kinds.P8002M;
                        break;
                    case Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
                        title = _my._languageResource.kinds.P8003T;
                        info = _my._languageResource.kinds.P8003M;
                        break;
                    case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
                        title = _my._languageResource.kinds.P8004T;
                        info = _my._languageResource.kinds.P8004M;
                        break;
                    case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                        title = _my._languageResource.kinds.P8005T;
                        info = _my._languageResource.kinds.P8005M;
                        break;
                    case Hls.ErrorDetails.LEVEL_SWITCH_ERROR:
                        title = _my._languageResource.kinds.P8006T;
                        info = _my._languageResource.kinds.P8006M;
                        break;
                    case Hls.ErrorDetails.FRAG_LOAD_ERROR:
                        title = _my._languageResource.kinds.P8007T;
                        info = _my._languageResource.kinds.P8007M;
                        break;
                    case Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                        title = _my._languageResource.kinds.P8008T;
                        info = _my._languageResource.kinds.P8008M;
                        break;
                    case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
                        title = _my._languageResource.kinds.P8009T;
                        info = _my._languageResource.kinds.P8009M;
                        break;
                    case Hls.ErrorDetails.FRAG_PARSING_ERROR:
                        title = _my._languageResource.kinds.P8010T;
                        info = _my._languageResource.kinds.P8010M;
                        break;
                    case Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR:
                        title = _my._languageResource.kinds.P8011T;
                        info = _my._languageResource.kinds.P8011M;
                        break;
                    case Hls.ErrorDetails.BUFFER_ADD_CODEC_ERROR:
                        title = _my._languageResource.kinds.P8012T;
                        info = _my._languageResource.kinds.P8012M;
                        break;
                    case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
                        title = _my._languageResource.kinds.P8013T;
                        info = _my._languageResource.kinds.P8013M;
                        break;
                    case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
                        title = _my._languageResource.kinds.P8014T;
                        info = _my._languageResource.kinds.P8014M;
                        break;
                    case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
                        title = _my._languageResource.kinds.P8015T;
                        info = _my._languageResource.kinds.P8015M;
                        break;
                    case Hls.ErrorDetails.BUFFER_FULL_ERROR:
                        title = _my._languageResource.kinds.P8016T;
                        info = _my._languageResource.kinds.P8016M;
                        break;
                    case Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE:
                        title = _my._languageResource.kinds.P8017T;
                        info = _my._languageResource.kinds.P8017M;
                        break;
                    case Hls.ErrorDetails.OTHER_ERROR:
                        title = _my._languageResource.kinds.P8018T;
                        info = _my._languageResource.kinds.P8018M;
                        break;
                    case MediaError.MEDIA_ERR_ABORTED:
                        title = _my._languageResource.kinds.P8019T;
                        info = _my._languageResource.kinds.P8019M;
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        title = _my._languageResource.kinds.P8020T;
                        info = _my._languageResource.kinds.P8020M;
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        title = _my._languageResource.kinds.P8021T;
                        info = _my._languageResource.kinds.P8021M;
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        title = _my._languageResource.kinds.P8022T;
                        info = _my._languageResource.kinds.P8022M;
                        break;
                    default:
                        title = _my._languageResource.kinds.P8001T;
                        info = _my._languageResource.kinds.P8001M + "<br>" + message;
                }
                _my._nodes.info_title.setInner(title);
                _my.info_main.setInner(info);
            } else {
                _my.info_main.setInner(_my._languageResource.kinds.ERROR_LIVE_RELOAD);
            }
        } else {
            if (message) {
                var title;
                var info;
                switch (message) {
                    case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                        title = _my._languageResource.kinds.P8001T;
                        info = _my._languageResource.kinds.P8001M;
                        break;
                    case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
                        title = _my._languageResource.kinds.P8002T;
                        info = _my._languageResource.kinds.P8002M;
                        break;
                    case Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
                        title = _my._languageResource.kinds.P8003T;
                        info = _my._languageResource.kinds.P8003M;
                        break;
                    case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
                        title = _my._languageResource.kinds.P8004T;
                        info = _my._languageResource.kinds.P8004M;
                        break;
                    case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                        title = _my._languageResource.kinds.P8005T;
                        info = _my._languageResource.kinds.P8005M;
                        break;
                    case Hls.ErrorDetails.LEVEL_SWITCH_ERROR:
                        title = _my._languageResource.kinds.P8006T;
                        info = _my._languageResource.kinds.P8006M;
                        break;
                    case Hls.ErrorDetails.FRAG_LOAD_ERROR:
                        title = _my._languageResource.kinds.P8007T;
                        info = _my._languageResource.kinds.P8007M;
                        break;
                    case Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                        title = _my._languageResource.kinds.P8008T;
                        info = _my._languageResource.kinds.P8008M;
                        break;
                    case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
                        title = _my._languageResource.kinds.P8009T;
                        info = _my._languageResource.kinds.P8009M;
                        break;
                    case Hls.ErrorDetails.FRAG_PARSING_ERROR:
                        title = _my._languageResource.kinds.P8010T;
                        info = _my._languageResource.kinds.P8010M;
                        break;
                    case Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR:
                        title = _my._languageResource.kinds.P8011T;
                        info = _my._languageResource.kinds.P8011M;
                        break;
                    case Hls.ErrorDetails.BUFFER_ADD_CODEC_ERROR:
                        title = _my._languageResource.kinds.P8012T;
                        info = _my._languageResource.kinds.P8012M;
                        break;
                    case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
                        title = _my._languageResource.kinds.P8013T;
                        info = _my._languageResource.kinds.P8013M;
                        break;
                    case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
                        title = _my._languageResource.kinds.P8014T;
                        info = _my._languageResource.kinds.P8014M;
                        break;
                    case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
                        title = _my._languageResource.kinds.P8015T;
                        info = _my._languageResource.kinds.P8015M;
                        break;
                    case Hls.ErrorDetails.BUFFER_FULL_ERROR:
                        title = _my._languageResource.kinds.P8016T;
                        info = _my._languageResource.kinds.P8016M;
                        break;
                    case Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE:
                        title = _my._languageResource.kinds.P8017T;
                        info = _my._languageResource.kinds.P8017M;
                        break;
                    case Hls.ErrorDetails.OTHER_ERROR:
                        title = _my._languageResource.kinds.P8018T;
                        info = _my._languageResource.kinds.P8018M;
                        break;
                    case MediaError.MEDIA_ERR_ABORTED:
                        title = _my._languageResource.kinds.P8019T;
                        info = _my._languageResource.kinds.P8019M;
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        title = _my._languageResource.kinds.P8020T;
                        info = _my._languageResource.kinds.P8020M;
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        title = _my._languageResource.kinds.P8021T;
                        info = _my._languageResource.kinds.P8021M;
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        title = _my._languageResource.kinds.P8022T;
                        info = _my._languageResource.kinds.P8022M;
                        break;
                    default:
                        title = _my._languageResource.kinds.P8001T;
                        info = _my._languageResource.kinds.P8001M + "<br>" + message;
                }
                _my._nodes.info_title.setInner(title);
                _my.info_main.setInner(info);
            } else {
                _my.info_main.setInner(_my._languageResource.kinds.ERROR_MOVIE_NOT_FOUND);
            }
        }

        _my.info_main.setStyle('margin', '5px');

        if (_my._nodes.navi) _my._nodes.navi.setStyle('display', 'none');

        if (_my._values.progressTimer) _my._pause();

        _my._set_info_visibled(true);
        _my._values.is_play = false;
    }

    // ステータスアイコン（画面中央大アイコン）表示処理
    _my._set_play_state = function (state) {
        if (_my._values.play_status == state) return;
        _my._values.play_status = state;
        if (_my._values.watermark_use == false) return;
        _my._nodes.play_state_wait.setStyle('display', 'none');
        _my._nodes.play_state_play.setStyle('display', 'none');
        _my._nodes.play_state_pause.setStyle('display', 'none');

        if (_my._values.loading_use) _my._nodes.play_state_loading.setStyle('display', 'none');

        if (_my._values.isSeeking == true) return;
        switch (state) {
            case 'loading':
                if (_my._values.loading_use) {
                    _my._nodes.play_state_loading.setStyle('display', 'block');
                    _my._nodes.play_state_loading.setStyle('opacity', '1');
                }
                break;
            case 'play':
                _my._nodes.play_state_play.setStyle('display', 'block');
                _my._nodes.play_state_play.setStyle('-webkit-animation-name', 'h5p_play_state-out');
                _my._nodes.play_state_play.setStyle('animation-name', 'h5p_play_state-out');
                break;
            case 'pause':
                _my._nodes.play_state_pause.setStyle('display', 'block');
                _my._nodes.play_state_pause.setStyle('-webkit-animation-name', 'h5p_play_state-out');
                _my._nodes.play_state_pause.setStyle('animation-name', 'h5p_play_state-out');
                break;
            case 'wait':
                _my._nodes.play_state_wait.setStyle('display', 'block');
                break;
        }
    }

    // 操作経過時間管理用。
    _my._setOperationTime = function () {
        _my._values.operation._time = Date.now();	// 最終操作時間
    };

    // オペレーション画面表示切替処理
    // 最終操作から5秒経過：FO&SO
    _my._set_operation = function () {
        _my._values.operation._time = 0;

        // オペレーション画面非表示中は処理を行わない。
        if (!_my._values.operation._view) return;

        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (video.paused || video.ended) return;

        // タイトル・コントローラをOFFに
        _my._set_navi_visibled(false);
    };

    // 再生・停止処理
    _my._video_change_ctrl = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;

        _my._values.fullscreen = false;

        if (video.ended) {
            _my._replay();
            return;
        }

        if (!_my._values.progressTimer) {
            if (_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable()) {
                if (_my._values.auth_input) {
                    _my._set_login_visibled(true);
                } else {
                    _my._values.jmcPlayer.accessor.login(null, null);
                }

            } else {

                _my.play();
                _my._set_play_state('loading');

                // stalledからの復帰：playイベント未発火対策
                if (_my._values.movie_status == 'stalled') {
                    _my._play();
                }
                // 再生開始時間保存
                _my._values.play_start = true;
            }
        }
        else {
            _my.pause();
        }
    };
    //字幕追加・初期化
    _my._init_caption = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        for (var i = 1; i < _my._values.caption_list.length; i++) {
            var cap = _my._createTag("track", null, null, video);
            cap.kind = "captions";
            cap.label = _my._values.caption_list[i].text;
            cap.srclang = _my._values.caption_list[i].text;
            cap.src = _my._values.caption_list[i].url;
            if (i == _my._values.caption_index) {
                cap.setAttribute("default", true);
            }
        }

    }

    // 画質選択初期化
    _my._init_movie_select = function () {
        if (!_my._defVals.multibitrate_use) return;


        _my._values.isSelected = false;

    };

    _my._set_movie_list_text = function (index) {
        var text = "";
        switch (index) {
            case 0:
                text = _my._languageResource.kinds.Label_Auto;
                break;
            case 1:
                text = _my._languageResource.kinds.Label_Low;
                break;
            case 2:
                text = _my._languageResource.kinds.Label_Standard;
                break;
            case 3:
                text = _my._languageResource.kinds.Label_High;
                break;
            case 4:
                text = _my._languageResource.kinds.Label_HD;
                break;
            case 5:
                text = _my._languageResource.kinds.Label_FullHD;
                break;
            case 6:
                text = _my._languageResource.kinds.Label_4K;
                break;
            default:
                break;
        }
        return text;
    }
    _my._get_movie_list_val = function (text) {
        var val = 0;
        switch (text) {
            case ("自動"):
            case ("AUTO"):
            case (_my._languageResource.kinds.Label_Auto):
                val = 0;
                break;
            case ("低画質"):
            case ("Low"):
            case (_my._languageResource.kinds.Label_Low):
                val = 1;
                break;
            case ("標準画質"):
            case ("Standard"):
            case (_my._languageResource.kinds.Label_Standard):
                val = 2;
                break;
            case ("高画質"):
            case ("High"):
            case (_my._languageResource.kinds.Label_High):
                val = 3;
                break;
            case ("ＨＤ画質"):
            case ("HD"):
            case (_my._languageResource.kinds.Label_HD):
                val = 4;
                break;
            case ("フルＨＤ"):
            case ("FullHD"):
            case (_my._languageResource.kinds.Label_FullHD):
                val = 5;
                break;
            case ("４Ｋ画質"):
            case ("4K"):
            case (_my._languageResource.kinds.Label_4K):
                val = 6;
                break;
            default:
                break;
        }
        return val;
    }

    _my._convert_movie_url_to_movie_val = function (url, list) {
        var val = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].url == url) {
                val = _my._get_movie_list_val(list[i].text);
                break;
            }
        }
        return val;
    }

    // 動画スライダーの値を設定
    _my._set_videoseek_slider = function () {
        if (!_my._values.seek_use) return;
        if (!_my._nodes.ctrl_video_seek_slider) return;
        if (!_my._values.movie_slider_obj) return;
        _my._values.movie_slider_obj.setValue(Math.floor(_my._values.currentTime * _my._values.seek_scale), false, false);

    };
    //音量スライダーの値を設定
    _my._set_Volume_slider = function (value) {
        if (!_my._values.volume_use) return;
        if (!_my._nodes.ctrl_volume_slider) return;
        if (!_my._values.volume_slider_obj) return;

        _my._values.volume_slider_obj.setValue(Math.floor(value * _my._values.volume), false, false);
        var volume_button = document.getElementById(_my.playerID + "ctrl_volume_button");
        volume_button.className = "ctrl_volume_button";

    };

    // 動画スライダーの値が更新された
    _my.videoseek_update_callback = function (value) {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;

        var currentTime = value / _my._values.seek_scale;
        if (_my._values.time_use)
            _my._nodes.video_play_time.setInner(_get_timeString(Math.floor(currentTime)));

        if ((_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS) && _my._values.first_play) {
            return;
        }
        if (_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.PC_PROGRESSIVE || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS)
            _my._values.jmcPlayer.accessor.setState("seek_start");
        _my._values.currentTime = currentTime;
        _my._values.isSeeking = true;
        video.currentTime = currentTime;
        var appVersion = window.navigator.appVersion.toLowerCase();
        var iosVersion = null;
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
        }
        if (iosVersion == null || iosVersion[0] != 8) {
            _my._set_play_state('loading');
            var seekCompleted = function () {
                _my._set_play_state('wait');
                video.removeEventListener("seeked", seekCompleted);
                if (_my._values.preSeekPlaying && video.currentTime <= video.duration - 0.01) {
                    _my.play();
                }
                _my._values.isSeeking = false
            }
            video.addEventListener("seeked", seekCompleted);
            //setTimeout(function () {
            //    if (_my._values.preSeekPlaying && video.currentTime <= video.duration - 0.01) {
            //        _my.play();
            //    }
            //    _my._values.isSeeking = false
            //}, 100);
        } else {
            setTimeout(function () {
                _my._values.isSeeking = false
            }, 500);
        }


        _my._setOperationTime();
    }
    _my.volume_update_callback = function (value) {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (_my._values.volume_use) {
            if (!(_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
                var val = value / 100;
                video.muted = false;
                var volume_button = document.getElementById(_my.playerID + "ctrl_volume_button");
                volume_button.className = "ctrl_volume_button";
                video.volume = val;
                _my._setOperationTime();
            }
        }
    }

    // ステータスアイコンセット初期化
    _my._init_status_icon = function () {
        // 画面中央の再生状態アイコン（大）
        // アニメーションの関係上、各独立。
        _my._nodes.play_state = imba_t3.node.one('#' + _my.playerID + 'play_state');
        _my._nodes.play_state_wait = imba_t3.node.one('#' + _my.playerID + 'play_state_wait');
        _my._nodes.play_state_play = imba_t3.node.one('#' + _my.playerID + 'play_state_play');
        _my._nodes.play_state_pause = imba_t3.node.one('#' + _my.playerID + 'play_state_pause');
        _my._nodes.play_state_liveWait = imba_t3.node.one('#' + _my.playerID + 'play_state_liveWait');

        if (_my._values.loading_use)
            _my._nodes.play_state_loading = imba_t3.node.one('#' + _my.playerID + 'play_state_loading');
        if (_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS) {
            //id/pass認証利用時はローディングマークを出さない
            if (!(_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable())) {
                if (!_my._values.jmcPlayer.accessor.canPlayHls) {
                    _my._set_play_state('loading');
                    var mobileLoadingTimer = setInterval(function () {
                        if (_my._values.jmcPlayer.accessor.canPlayHls) {
                            clearInterval(mobileLoadingTimer);
                            if (_my._nodes.play_state_liveWait) {
                                _my._nodes.play_state_liveWait.setStyle("display", "none");
                            }
                            _my._set_play_state('wait');
                        }
                    }, 100);
                } else {
                    _my._set_play_state('wait');
                }
            }
        } else {
            _my._set_play_state('wait');
        }
    };

    _my._init_ctrl_video_seek = function () {
        if (!_my._values.ctrl_use && !_my._values.seek_use) return;
        var ctrl_video_seek = imba_t3.node.one('#' + _my.playerID + 'ctrl_video_seek');

        var rightElem = 10;
        var leftElem = 10;
        _my._values.seekWidth = 0;// - ( 30 + 14 );	// 「再生」＋「つまみ」
        if (_my._values.play_use && _my._getPlayerStyle("width") != _my.PS_MINIMUM) leftElem += 28;		// 再生/一時停止
        if (_my._values.fullscreen_use) rightElem += 30;		// フルスクリーン
        if (_my._values.volume_use) {//音量
            if ((_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
                leftElem += 38;
            } else {
                leftElem += 98;
            }
        }
        if (_my._values.time_use && _my._getPlayerStyle("width") == _my.PS_NORMAL) leftElem += 100;		// 再生時間(ノーマル時のみ）
        if (_my._getPlayerStyle("width") != _my.PS_MINIMUM) rightElem += 30;//設定ボタン
        _my._values.seekWidth = rightElem + leftElem;

        //seekバーのスタイルセット
        if (!!_my._values.seek_use) {
            //seekバー領域のスタイル
            var ctrl_seek = imba_t3.node.one('#' + _my.playerID + 'ctrl_video_seek_wrap');
            ctrl_seek.setStyle("width", "100%");
            ctrl_seek.setStyle("height", "6px");
            ctrl_video_seek.setStyle('height', "6px");
            ctrl_video_seek.setStyle('float', 'none');
        }
        if (!!_my._values.ctrl_use) {
            //左側の要素
            var ctrl_left = imba_t3.node.one('#' + _my.playerID + 'ctrl_left_wrap');
            ctrl_left.setStyle("float", "left");
            ctrl_left.setStyle("width", leftElem + "px");
            //右側の要素
            var ctrl_right = imba_t3.node.one('#' + _my.playerID + 'ctrl_right_wrap');
            ctrl_right.setStyle("float", "right");
            ctrl_right.setStyle("width", rightElem + "px");
        }
        if (!_my._values.seek_use) {
            _my._nodes.ctrl.setStyle("height", "30px");
        }

    };
    _my._init_ctrl_volume = function () {
        if (!_my._values.ctrl_use || !_my._values.volume_use) return;
        if (!(_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
            var ctrl_volume = imba_t3.node.one('#' + _my.playerID + 'ctrl_volume');
            ctrl_volume.setStyle("width", "50px");
        }

    };

    // SNS/リンクウィンドウ表示切替処理
    _my._set_info_visibled = function (isVisible) {
        if (isVisible == _my._values.info) return;

        _my._values.info = isVisible;

        var ani_ms = 100; //ms
        if (isVisible) {
            // スライドイン	
            _my._nodes.info.setStyle("display", "block");
            _my._nodes.info.setStyle('-webkit-animation-name', 'h5p_fade_in,h5p_scale_in');
            _my._nodes.info.setStyle('-webkit-animation-duration', ani_ms + 'ms');
            _my._nodes.info.setStyle('animation-name', 'h5p_fade_in,h5p_scale_in');
            _my._nodes.info.setStyle('animation-duration', ani_ms + 'ms');

            // 再生中か否かを保存
            if (_my._values.progressTimer) _my._values.is_play = true;
            else _my._values.is_play = false;

            // 動画を一時停止
            if (_my._values.is_play)
                _my.pause();
            if (_my._values.ctrl_use)
                _my._nodes.ctrl_cover.setStyle('display', 'block');
        } else {
            // スライドアウト
            _my._nodes.info.setStyle('-webkit-animation-name', 'h5p_fade_out,h5p_scale_out');
            _my._nodes.info.setStyle('-webkit-animation-duration', ani_ms + 'ms');
            _my._nodes.info.setStyle('animation-name', 'h5p_fade_out,h5p_scale_out');
            _my._nodes.info.setStyle('animation-duration', ani_ms + 'ms');

            setTimeout(function () {
                _my._nodes.info.setStyle("display", "none");
            }, ani_ms);

            if (_my._values.sns_use || _my._values.viraltag_use) _my._nodes.navi_share.set('className', 'navi_share' + _my._get_css_suffix("height"));
            if (_my._values.exlink_use) _my._nodes.navi_outlink.set('className', 'navi_outlink');
            //if (_my._values.viraltag_use) _my._nodes.navi_viral.set('className', 'navi_viral' + _my._get_css_suffix("height"));
            // 表示時にプレイ中だったなら再生再開
            if (_my._values.is_play) {
                _my.play();
                _my._set_play_state('loading');
            }
            if (_my._values.ctrl_use)
                _my._nodes.ctrl_cover.setStyle('display', 'none');
        }

    };

    //認証ウィンドウ表示切替
    _my._set_login_visibled = function (isVisible) {
        //if (isVisible == _my._values.movie_auth) return;

        //_my._values.movie_auth = isVisible;

        if (isVisible) {
            _my._nodes.movie_auth.setStyle("display", "block");
            document.getElementById(_my.playerID + "block_layer").style.display = "block";
            document.getElementById(_my.playerID + 'loginID').focus();
        } else {
            _my._nodes.movie_auth.setStyle("display", "none");
            document.getElementById(_my.playerID + "block_layer").style.display = "none";
            document.getElementById(_my.playerID + 'loginID').blur();
            document.getElementById(_my.playerID + 'loginPASS').blur();
        }

    }

    // 総再生時間設定
    _my._set_duration = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (video.duration <= 1) return;

        // 総再生時間
        // _my._values.duration = video.duration;

        if (_my._values.movie_slider_obj)
            _my._values.movie_slider_obj.setLimitValue(0, _my._values.duration * _my._values.seek_scale);


        // Android/標準ブラウザ
        //if (!_my._values.is_Chrome)
        //    if (_my._loadReserveCT(true)) _my._values.load_currentTime = 0;

        // サイズ設定
        var asp = video.videoHeight / (_my._values.movie_h - _my._values.footerSize);
        _my._values.video_w = _my._values.movie_w;
        _my._values.video_h = _my._values.movie_h - _my._values.footerSize;
        _my._values.video_x = 0;
        _my._values.video_y = 0;

        if (asp < (video.videoWidth / _my._values.movie_w)) {
            // 横基準
            asp = video.videoWidth / _my._values.movie_w;
            _my._values.video_h = Math.floor(video.videoHeight / asp);
            _my._values.video_y = (_my._values.movie_h - _my._values.footerSize - _my._values.video_h) / 2.0;
        } else {
            // 縦基準
            _my._values.video_w = Math.floor(video.videoWidth / asp);
            _my._values.video_x = (_my._values.movie_w - _my._values.video_w) / 2.0;
        }

        if (_my._values.progressTimer) {
            _my._nodes.video.setStyle("top", "0px");
            _my._nodes.video.setStyle("left", "0px");
            _my._nodes.video.setStyle("width", "100%");
            var appVersion = window.navigator.appVersion.toLowerCase();
            var iosVersion = null;
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
            }
            if (iosVersion == null) {
                _my._nodes.video.setStyle("height", "100%");
            } else if (iosVersion[0] < 8) {
                _my._nodes.video.setStyle("height", "100%");
            } else {
                _my._nodes.video.setStyle("height", "100%");
                _my._nodes.video.setStyle("margin", "auto");
            }
        }

        _my._set_videoseek_slider();

    };

    // 再生時間・シークバーの更新
    _my._update_time = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (_my._values.isSeeking) return;//シーク完了まで更新しない
        if (_my._values.load_currentTime > 0) {
            //if (_my._loadReserveCT(false)) _my._values.load_currentTime = 0;
        }

        // 再生情報読取
        var duration = Number(_my._values.duration);
        if (!isFinite(duration)) return;
        var time = video.currentTime;
        if (time > duration) time = duration;
        if (time <= 0.1) return;

        _my._values.currentTime = time;
        // 再生時間設定
        if (_my._values.ctrl_use && _my._values.time_use) {
            _my._nodes.video_play_time.setInner(_get_timeString(Math.floor(_my._values.currentTime)));
            _my._nodes.video_total_time.setInner(_get_timeString(Math.floor(_my._values.duration)));
        }
        // シークバーの値更新
        _my._set_videoseek_slider();
    }

    // ステータス更新処理
    _my._update_status = function () {

        _my._update_time();

        // コントローラ調整
        if (_my._values.operation._time) {
            var time = Date.now();
            if ((time - _my._values.operation._time) > 3000) {
                if (_my._values.setting != true && _my._values.menu != true) {
                    _my._set_operation();
                }
            }
        }

        // 再生開始までの時間確認（loading表示）
        if (_my._values.play_start) {
            _my._values.play_start = false;
            _my._set_play_state('play');
        }
    };

    // 動画スライダーの初期化
    _my._init_video_seek = function () {
        if (!_my._values.ctrl_use || !_my._values.seek_use) return;
        if (document.getElementById(_my.playerID + "slider-movie-h_rail")) return;

        var totalTime = Math.round(_my._values.duration * _my._values.seek_scale);


        _my._values.movie_slider_obj = new meka_t3.range({
            skin: 'movie',
            parent: document.getElementById(_my.playerID + 'ctrl_video_seek_slider'),
            dir: 'horizontal',
            width: "100%",
            ninValue: 0,
            maxValue: totalTime,
            init_value: 0,
            prefix: _my.playerID
        });
        _my._values.movie_slider_obj.setUpdateCallback(_my.videoseek_update_callback);
        //buffer追加
        _my._nodes.ctrl_video_buffer_slider = document.createElement("div");
        _my._nodes.ctrl_video_buffer_slider.className = "slider-movie-buffer";
        _my._values.movie_slider_obj.node_slider_rail.insertBefore(_my._nodes.ctrl_video_buffer_slider, _my._values.movie_slider_obj.node_slider_rail.firstChild);
        setInterval(function () {
            _my._buffer_checker();
        }, 100);
        var seek = document.getElementById(_my.playerID + "ctrl_video_seek");
        seek.addEventListener("mousemove", _my._seek_tooltip_update);
        seek.addEventListener("mousedown", _my._seek_mouseDown_hundler);
        // スライダー制御用カバー
        if (_my._nodes.ctrl_video_seek_cover) {
            _my._nodes.ctrl_video_seek_cover.setStyle('width', "100%");
            _my._nodes.ctrl_video_seek_slider.setStyle("display", "none");
        }
        document.getElementById(_my.playerID + "slider-movie-h_dist").style.backgroundColor = _my._values.seekbar_color;
        var slider_area = document.getElementById(_my.playerID + "ctrl_video_seek_area");
        if (_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"]) {
            _my._values.movie_slider_obj.node_slider_rail.addEventListener("touch", function () { _my.seek_state_checker(); })
            slider_area.addEventListener("touch", function () { _my.seek_state_checker(); })
        } else {
            _my._values.movie_slider_obj.node_slider_rail.addEventListener("mousedown", function () { _my.seek_state_checker(); })
            slider_area.addEventListener("mousedown", function () { _my.seek_state_checker(); })
        }

    };

    _my.seek_state_checker = function () {
        if (_my._values.movie_status != "stalled") {
            //_my._values.preSeekPlaying = _my._values.movie_status == "playing" || _my._values.movie_status == "progress";
            _my._values.preSeekPlaying = _my._values.isPlaying;
        }
        //console.log(_my._values.movie_status);
        _my._values.isSeeking = true;
        _my.pause();
    }

    _my._seek_mouseDown_hundler = function (e) {
        document.getElementById(_my.playerID + "ctrl_video_seek").addEventListener("mouseup", _my._seek_mouseUp_hundler);

        document.addEventListener("mouseup", _my._seek_mouseUp_hundler);
        if (_my._values.jmcPlayer.flashVars.platform["isIE"] || _my._values.jmcPlayer.flashVars.platform["isEdge"]) {
            document.body.addEventListener("mouseleave", _my._seek_mouseUp_hundler);
        }
        document.addEventListener("mousemove", _my._seek_tooltip_update);
        if (_my._values.jmcPlayer.flashVars.platform["isIE"]) {
            var seek = document.getElementById(_my.playerID + "ctrl_video_seek");
            seek.className = "ctrl_video_seek seek_tooltip seek_tooltip_active";
        }
    }
    _my._seek_mouseUp_hundler = function (e) {
        document.getElementById(_my.playerID + "ctrl_video_seek").removeEventListener("mouseup", _my._seek_mouseUp_hundler);
        document.removeEventListener("mouseup", _my._seek_mouseUp_hundler);
        if (_my._values.jmcPlayer.flashVars.platform["isIE"] || _my._values.jmcPlayer.flashVars.platform["isEdge"]) {
            document.body.removeEventListener("mouseleave", _my._seek_mouseUp_hundler);
        }
        document.removeEventListener("mousemove", _my._seek_tooltip_update);
        if (_my._values.jmcPlayer.flashVars.platform["isIE"]) {
            var seek = document.getElementById(_my.playerID + "ctrl_video_seek");
            seek.className = "ctrl_video_seek seek_tooltip";
        }
    }
    _my._seek_tooltip_update = function (e) {
        if (_my._values.jmcPlayer.flashVars.platform["isTablet"] || _my._values.jmcPlayer.flashVars.platform["isSP"]) {
            return;
        }
        if (!_my._values.first_play) {
            var seek_tooltip = document.getElementById(_my.playerID + "seek_tooltip");
            var seek = document.getElementById(_my.playerID + "ctrl_video_seek");
            var scrL = document.documentElement.scrollLeft || document.body.scrollLeft;
            palRect = seek.getBoundingClientRect();
            var mx = parseInt(e.clientX, 10) - palRect['left'] - scrL;
            var left = mx - 25;
            var time = mx / seek.clientWidth * _my._values.duration;
            if (time < 0) {
                time = 0;
            } else if (time > _my._values.duration) {
                time = _my._values.duration;
            }
            seek_tooltip.innerText = _get_timeString(Math.floor(time));
            if (left < 0) {
                left = 0;
            }
            if (palRect['width'] - 50 - scrL <= left) {
                left = palRect['width'] - 50 - scrL;
            }
            seek_tooltip.style.left = left + "px";
        }
    }
    _my._buffer_checker = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (!_my._nodes.ctrl_video_buffer_slider) return;
        if (video.buffered.length < 1) return;
        var currentTime = video.currentTime;
        var onBufferIndex = 0;

        for (var index = 0; index < video.buffered.length; index++) {
            if (video.currentTime >= video.buffered.start(index) && video.currentTime <= video.buffered.end(index)) {
                onBufferIndex = index;
                break;
            }
        }
        var bufferLength = (video.buffered.end(onBufferIndex) - video.buffered.start(onBufferIndex)) / video.duration;
        var bufferLeft = video.buffered.start(onBufferIndex) / video.duration;
        _my._nodes.ctrl_video_buffer_slider.style.width = bufferLength * 100 + "%";
        _my._nodes.ctrl_video_buffer_slider.style.left = bufferLeft * 100 + "%";
    }

    _my._init_volume = function () {
        if (!_my._values.ctrl_use || !_my._values.volume_use) return;
        if (document.getElementById(_my.playerID + "slider-volume-h_rail")) return;
        var volume_button = document.getElementById(_my.playerID + "ctrl_volume_button");
        if (volume_button.addEventListener) {
            volume_button.addEventListener("click", _my._click_volume_button);
        } else {
            volume_button.attachEvent("onclick", _my._click_volume_button);
        }
        var slider = document.getElementById(_my.playerID + 'ctrl_volume_slider');
        if (!slider) return;
        slider.style.display = "none";
        _my._values.volume_slider_obj = new meka_t3.range({
            skin: 'volume',
            parent: document.getElementById(_my.playerID + 'ctrl_volume_slider'),
            dir: 'horizontal',
            width: "50px",
            ninValue: 0,
            maxValue: 100,
            init_value: 100,
            prefix: _my.playerID
        });
        document.getElementById(_my.playerID + "slider-volume-h_dist").style.backgroundColor = _my._values.seekbar_color;
        _my._values.volume_slider_obj.setUpdateCallback(_my.volume_update_callback);
        _my._values.volume_slider_obj.setValue(100, false, true);

    };

    _my._click_volume_button = function (e) {
        var volume_button = document.getElementById(_my.playerID + "ctrl_volume_button");
        var video = _my._nodes.video.DOMNode();
        if (volume_button.className == "ctrl_volume_button_mute") {
            video.muted = false;
        } else {
            video.muted = true;
        }
        _my._setMuteButton();
    }
    _my._setMuteButton = function () {
        var volume_button = document.getElementById(_my.playerID + "ctrl_volume_button");
        var video = _my._nodes.video.DOMNode();
        if (volume_button) {
            if (video.muted == true) {
                _my._values.preVolume = video.volume;
                _my._set_Volume_slider(0);
                volume_button.className = "ctrl_volume_button_mute";
            } else {
                _my._set_Volume_slider(_my._values.preVolume);
                if (_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"]) {
                    video.volume = 1;
                    volume_button.className = "ctrl_volume_button";
                }
            }
        }
    }
    _my._click_caption_select = function (index) {
        var video = _my._nodes.video.DOMNode();
        if (index == 0) {
            for (var i = 0; i < video.textTracks.length; i++) {
                video.textTracks[i].mode = "disabled";
            }
        } else {
            for (var i = 0; i < video.textTracks.length; i++) {
                if (i == index - 1) {
                    video.textTracks[i].mode = "showing";
                } else {
                    video.textTracks[i].mode = "disabled";
                }
            }
        }
    }

    // リンクアクション（ビーコン発射用）
    _my._link_action = function (tag) {
        if (tag == "Google+") {
            tag = "google"
        }
        if (_my._values.linkset[tag] && tag != "LINE") {
            var w = window.open("", "_blank");
            w.location.href = _my._values.linkset[tag];
        }

        if (tag == "Google+") tag = "google";
        if (tag == "LINE") tag = "line";

        // ビーコン発射
        _my._values.jmcPlayer.accessor.sendClickBeacon(tag);
    };

    // 動画ステータス管理用
    // 常に最後のステータスを保持
    _my._set_movie_status = function (state) {
        if (_my._values.movie_status != state) {
            _my._log(state + "::" + _my._values.currentTime + "(" + _my._values.load_currentTime + ") / " + _my._values.duration);
        }
        _my._values.movie_status = state;
        if (!_my._values.isSeeking) {
            if (state == "play" || state == "playing") {
                _my._values.isPlaying = true;
            } else if (state == "pause" || state == "ended" || state == "error") {
                _my._values.isPlaying = false;
            }
        }

    };

    // 再生終了。
    _my._end = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;

        if (_my._values.isLive) {
            // ライブモード
            //_my._set_info_error();
            return;
        }
        var cssTypeWidth = _my._get_css_suffix("width");
        var style_height = _my._getPlayerStyle("height");
        var style_width = _my._getPlayerStyle("width");
        // 以下通常モード
        if (_my._values.replay_use && style_height != _my.PS_MINIMUM) {
            // 「リプレイ」表示

            _my._nodes.header.setStyle('display', 'block');
            _my._nodes.ctrl_replay.setStyle('display', 'table');
            _my._nodes.ctrl_replay.dom_node.className = "ctrl_replay" + cssTypeWidth;
            var replay_icon = document.getElementById(_my.playerID + "ctrl_replay").children[0];
            var replay_text = document.getElementById(_my.playerID + "ctrl_replay").children[1];
            if (replay_icon) {
                replay_icon.className = "ctrl_replay_icon" + _my._get_css_suffix("width");
            }
            if (replay_text) {
                replay_text.className = "ctrl_replay_text" + _my._get_css_suffix("width");
                if (style_width == _my.PS_MINIMUM || style_width == _my.PS_MIDDLE) {
                    replay_text.style.display = "none";
                }
            }

            if (_my._values.title_use) {
                if (style_height == _my.PS_MINIMUM) {
                    _my._nodes.video_title_text.setStyle('margin-right', '20px');
                } else if (style_width == _my.PS_MINIMUM || style_width == _my.PS_MIDDLE) {
                    _my._nodes.video_title_text.setStyle('margin-right', '50px');
                } else {
                    _my._nodes.video_title_text.setStyle('margin-right', '130px');
                }
                _my._values.header_use = true;
            }
        }

        // 「停止」状態に
        if (_my._nodes.play_use) _my._nodes.ctrl_play.set('className', 'ctrl_play' + cssTypeWidth);
        _my._set_navi_visibled(true);
        clearInterval(_my._values.progressTimer);
        _my._values.progressTimer = null;

        _my._values.currentTime = _my._values.duration;
        _my._values.load_currentTime = 0;
        _my._values.is_play = false;

        // 再生時間設定
        if (_my._values.time_use)
            _my._nodes.video_play_time.setInner(_get_timeString(Math.floor(_my._values.currentTime)));

        // シークバーの値更新
        _my._set_videoseek_slider();

        var rail = imba_t3.node.one("#" + _my.playerID + "slider-movie-h_rail");
        var dist = imba_t3.node.one("#" + _my.playerID + "slider-movie-h_dist");
        var thumb = imba_t3.node.one("#" + _my.playerID + "slider-movie-h_thumb");
        if (rail != null) rail.setStyle("width", "100%");
        if (dist != null) dist.setStyle("width", "100%");
        if (thumb != null) thumb.setStyle("left", "98%");

        // 関連ページor共有ウィンドウ表示
        if (_my._values.jmcPlayer.accessor.model.loop_use != "on") {
            if (_my._values.exlink_use) {
                // 関連ページ
                _my._set_info_outlink();
                _my._set_info_visibled(true);
            } else {
                if (!(style_height == _my.PS_MINIMUM)) {
                    if (_my._values.sns_use || _my._values.viraltag_use) {
                        // 共有
                        _my._set_info_share();
                        _my._set_info_visibled(true);
                    }
                }
            }
        }

        if (!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement)) {
            // サムネイル表示
            //meka.set_nodeStyleBox(_my._nodes.video, _my._values.movie_w - 1, _my._values.movie_h - 1, 1, 1);
            _my._set_video_thumb(_my._values.thumb_filePath);
            _my._nodes.video.setStyle("bottom", "0px");
            _my._nodes.video.setStyle("right", "0px");
            _my._nodes.video.setStyle("top", null);
            _my._nodes.video.setStyle("left", null);
            _my._nodes.video.setStyle("width", "1px");
            _my._nodes.video.setStyle("height", "1px");
            _my._nodes.video.setStyle("opacity", "0");
            _my._nodes.video.setStyle("z-index", "1");
        }
        //設定メニュー閉じる
        if (_my._values.setting) {
            _my.setSettingVisible(false);
        }
        if (_my._values.menu) {
            _my._close_select_menu();
        }


        _my._set_play_state('wait');
        _my._pause();
        _my.cb_ended();
    };

    // 「ロード」
    _my._loading = function () {
        var cssTypeWidth = _my._get_css_suffix("width");
        if (_my._nodes.play_use) _my._nodes.ctrl_play.set('className', 'ctrl_play' + cssTypeWidth);
        _my.set_play_state('loading');
    }

    // リプレイ
    _my._replay = function () {
        _my._link_action("replay");

        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        //タイトルoffでリプレイボタンonの時ヘッダーを隠す
        if (!_my._values.title_use && _my._values.replay_use) {
            _my._nodes.header.setStyle('display', 'none');
        }
        _my._values.isReplay = true;
        if (_my._values.replay_use) {
            _my._nodes.ctrl_replay.setStyle('display', 'none');
        }
        _my.cb_replay();
        if (!_my._values.platform["isIE"]) {
            video.currentTime = 0;
        }
        _my.play();
        _my._set_play_state('loading');
        setTimeout(function () {
            // stalledからの復帰：playイベント未発火対策
            if (_my._values.movie_status != 'play') {
                _my._play();
            }
            // 再生開始時間保存
            //		_my._values.play_start = Date.now();
            _my._values.play_start = true;
            if (_my._values.jmcPlayer.accessor.hls) {
                _my._values.jmcPlayer.accessor.hls.startLoad(-1);
            }
        }, 500)
        if (_my._values.platform["isIE"] && _my._values.jmcPlayer.accessor.getQuality() == "0") {
            setTimeout(function () {
                if (_my._values.jmcPlayer.accessor.hls) {
                    _my._values.jmcPlayer.accessor.hls.startLoad(-1);
                }
            }, 1000);
        }

    }
    _my._setloop = function () {


        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        //タイトルoffでリプレイボタンonの時ヘッダーを隠す
        if (!_my._values.title_use && _my._values.replay_use) {
            _my._nodes.header.setStyle('display', 'none');
        }
        _my._values.isReplay = true;
        if (_my._values.replay_use) {
            _my._nodes.ctrl_replay.setStyle('display', 'none');
        }
        _my.cb_replay();
        if (!_my._values.platform["isIE"]) {
            video.currentTime = 0;
        }
        _my.play();
        _my._set_play_state('loading');
        setTimeout(function () {
            // stalledからの復帰：playイベント未発火対策
            if (_my._values.movie_status != 'play') {
                _my._play();
            }
            // 再生開始時間保存
            //		_my._values.play_start = Date.now();
            _my._values.play_start = true;
            if (_my._values.jmcPlayer.accessor.hls) {
                _my._values.jmcPlayer.accessor.hls.startLoad(-1);
            }
        }, 500)
        if (_my._values.platform["isIE"] && _my._values.jmcPlayer.accessor.getQuality() == "0") {
            setTimeout(function () {
                if (_my._values.jmcPlayer.accessor.hls) {
                    _my._values.jmcPlayer.accessor.hls.startLoad(-1);
                }
            }, 1000);
        }

    }
    // コンテンツ未取得
    _my._stalled = function () {
        if (!_my._values.progressTimer) return;
    }

    function _get_timeString(sec) {
        // 整数化
        if (!sec) sec = 0;
        var s = sec % 60;		// 秒
        var m = Math.round((sec - s) / 60) % 60;		// 分
        var t = Math.round((sec - (m * 60 + s)) / (60 * 60)) % 60;		// 時

        var setStr = "";
        setStr = String(t) + ":";
        setStr += ("0" + String(m)).slice(-2) + ":";
        setStr += ("0" + String(s)).slice(-2);

        return setStr;
    }
    _my._waitLanding = function () {
        _my._set_play_state('loading');
        _my._values.jmcPlayer.accessor.addEventListener("landing", function () {
            _my._checkPlayable();
        })
    }
    _my._waitDurationChange = function () {
        _my._set_play_state('loading');
        if (!_my._values.jmcPlayer.accessor.canPlayHls) {
            _my._values.jmcPlayer.accessor.addEventListener("canPlayHls", _my._onCanPlayHls);
        }
    }
    _my._onCanPlayHls = function () {
        _my._values.jmcPlayer.accessor.removeEventListener("canPlayHls", _my._onCanPlayHls);
        //setTimeout(_my._checkPlayable,100);
        _my._checkPlayable();
    }
    //初回再生時のイベントハンドラー
    var setCurrentTime = function () {
        var video = _my._nodes.video.DOMNode();
        if (_my._values.first_play == true) {
            if (video.addEventListener) {
                video.addEventListener("timeupdate", seeked);
            } else {
                video.attachEvent("ontimeupdate", seeked);
            }
            var r = _my._setCurrentTime(_my._values.start_time);
        }
    }
    var preSeek = function () {
        var video = _my._nodes.video.DOMNode();
        if (_my._values.first_play == true) {
            //video.removeEventListener("playing", preSeek);
            if (video.addEventListener) {
                video.addEventListener("pause", setCurrentTime);
            } else {
                video.attachEvent("onpause", setCurrentTime);
            }

            video.pause();
        }

    }
    var seeked = function () {
        var video = _my._nodes.video.DOMNode();
        var seek_tooltip = document.getElementById(_my.playerID + "seek_tooltip");
        if (_my._values.first_play == true) {
            if (seek_tooltip)
                seek_tooltip.style.display = "inherit";
            if (true) {
                if (Math.floor(video.currentTime) >= Math.floor(_my._values.start_time)) {
                    //video.removeEventListener("timeupdate", seeked);
                    _my._values.first_play = false;
                    _my._values.jmcPlayer.accessor.model.isFirstPlay = false;
                    _my._remove_ctrl_full_cover();
                    video.play();
                }
            }
            // else {
            //     _my._values.first_play = false;
            //     _my._remove_ctrl_full_cover();
            //     video.play();
            // }
        }
    }
    var pause = function () {
        var seek_tooltip = document.getElementById(_my.playerID + "seek_tooltip");
        var video = _my._nodes.video.DOMNode();
        video.removeEventListener("playing", pause);
        video.pause();
        var seekTimer = setInterval(function () {
            if (video.seekable.end(0) > 0) {
                if (seek_tooltip)
                    seek_tooltip.style.display = "inherit";
                _my._values.first_play = false;
                _my._remove_ctrl_full_cover();
                video.currentTime = _my._values.start_time;
                video.play();
                clearInterval(seekTimer);
            }
        }, 100);
    };
    _my._firstPlay = function (video) {
        if (!_my._values.jmcPlayer.accessor.isLanding && !(_my._values.platform["isSP"] || _my._values.platform["isTablet"])) {
            _my._waitLanding();
            return;
        }
        var seek_tooltip = document.getElementById(_my.playerID + "seek_tooltip");

        if (_my._values.jmcPlayer.accessor.model.isLive && _my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_STREAMING && _my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.PC_HTML5HLS) {
            if (_my._values.first_play) {
                if (seek_tooltip)
                    seek_tooltip.style.display = "inherit";
                _my._values.first_play = false;
                _my._remove_ctrl_full_cover();
            }
            video.play();
            return;
        }
        //hlsjs
        if ((_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS)) {
            //if (_my._values.platform["isIE"]) {
            _my._waitDurationChange();
            //}
            video.playbackRate = _my._values.playbackRate;
            var loadPosition = -1;

            if (_my._values.start_time > 0) {
                loadPosition = _my._values.start_time;
            }

            if ((_my._values.platform["isSP"] || _my._values.platform["isTablet"])) {
                if (_my._values.start_time > 0) {
                    video.currentTime = _my._values.start_time;
                }

                video.play();
                video.addEventListener("play", function () {
                    if (_my._values.first_play) {
                        if (seek_tooltip)
                            seek_tooltip.style.display = "inherit";
                        _my._values.first_play = false;
                        _my._remove_ctrl_full_cover();
                        _my._values.jmcPlayer.accessor.hls.startLoad(-1);
                        video.playbackRate = _my._values.playbackRate;
                    }
                });
            } else {
                if (_my._values.jmcPlayer.accessor.model.default_quality == "0") {
                    if (loadPosition < 0) {
                        loadPosition = 0;
                    }
                    var canLoadTimer = setInterval(function () {
                        if (_my._values.jmcPlayer.accessor.canLoad) {
                            clearInterval(canLoadTimer);
                            if (_my._values.start_time > 0) {
                                video.currentTime = _my._values.start_time;
                            }
                            _my._values.jmcPlayer.accessor.hls.startLoad(loadPosition);
                        }
                    }, 50);
                }
                var canplayTimer = setInterval(function () {
                    if (_my._values.jmcPlayer.accessor.canPlayHls) {
                        clearInterval(canplayTimer);
                        if (seek_tooltip)
                            seek_tooltip.style.display = "inherit";
                        _my._remove_ctrl_full_cover();
                        if (_my._values.jmcPlayer.accessor.model.default_quality == "0" && _my._values.platform["isIE"]) {
                            if (_my._values.start_time > 0) {
                                video.addEventListener("play", function () {
                                    if (_my._values.first_play) {
                                        _my._values.first_play = false;
                                        _my._values.jmcPlayer.accessor.hls.startLoad(loadPosition);
                                        video.currentTime = loadPosition;
                                    }
                                });
                            } else {
                                _my._values.first_play = false;
                            }
                        } else {
                            _my._values.jmcPlayer.accessor.hls.startLoad(loadPosition);
                            if (_my._values.start_time > 0) {
                                video.currentTime = _my._values.start_time;
                            }
                            _my._values.first_play = false;
                        }
                        if (_my._values.start_time > 0) {
                            setTimeout(function () {
                                video.play();
                                video.playbackRate = _my._values.playbackRate;
                            }, 1000);
                        } else {
                            video.play();
                            video.playbackRate = _my._values.playbackRate;
                        }
                    }
                }, 50);
            }
            return;
        }
        //hlsjs以外
        video.src = _my._values.movie_filepath;
        video.load();

        if (!_my._values.start_time || _my._values.start_time <= 0) {
            if (seek_tooltip)
                seek_tooltip.style.display = "inherit";
            _my._values.first_play = false;
            _my._remove_ctrl_full_cover();
            if (!_my._values.platform["isSP"] && !_my._values.platform["isTablet"]) {
                setTimeout(function () { video.play(); }, 1000);

            } else {
                //alert("play")
                video.play();

            }
        } else if (_my._values.platform["os"]["name"] == "iOS") {
            _my._values.jmcPlayer.accessor.model.isFirstPlay = true;
            video.addEventListener("playing", preSeek);
            video.addEventListener("pause", setCurrentTime);
            video.addEventListener("timeupdate", seeked);
            //video.addEventListener("seeked", seeked);
            video.play();
        } else if (_my._values.platform["os"]["name"] == "Android") {
            video.addEventListener("playing", pause);

            video.play();
        } else {
            if (video.addEventListener) {
                video.addEventListener("playing", preSeek);
            } else {
                video.attachEvent("onplaying", preSeek);
            }
            if (!_my._values.platform["isSP"] && !_my._values.platform["isTablet"]) {
                setTimeout(function () {
                    video.play();
                }, 1000);

            } else {
                video.play();
            }
        }
    }
    _my._checkPlayable = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (_my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable()) {
            if (_my._values.auth_input) {
                _my._set_login_visibled(true);
            } else {
                _my._values.jmcPlayer.accessor.login(null, null);
            }
        } else if (_my._values.jmcPlayer.accessor.model.isConnectionEneble()) {
            if ((_my._values.platform["isSP"] || _my._values.platform["isTablet"]) && _my._values.jmcPlayer.accessor.isWait) {
                if (_my._values.jmcPlayer.accessor.limit_error) {
                    _my._values.jmcPlayer.accessor.showLimitError();
                    return;
                }
            }
            _my._values.jmcPlayer.accessor.playCall();
        } else {
            if (_my._values.jmcPlayer.accessor.isStoped) {
                // _my._values.jmcPlayer.accessor.hls.destroy();
                // _my._values.jmcPlayer.accessor.hls = null;
                // _my._values.jmcPlayer.accessor.tryHlsLoad();
                video.currentTime = video.seekable.end(0) - 30
                _my._values.jmcPlayer.accessor.isStoped = false;
            }
            //play連打対策
            if (!(video.paused || video.ended)) return;
            if ((_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS) && !_my._values.jmcPlayer.accessor.canPlayHls) {
                _my._waitDurationChange();
                return;
            }
            _my._set_play_state('loading');

            if (_my._values.first_play == true) {
                _my._firstPlay(video);
            } else {
                if (!_my._values.jmcPlayer.flashVars.platform["isSP"] && !_my._values.jmcPlayer.flashVars.platform["isTablet"]) {
                    setTimeout(function () {
                        video.play();
                    }, 1000);
                } else {
                    video.play();
                }
            }
        }
    }

    // デバッグ用
    _my._log = function (msg) {
        //	console.log("["+ _my.playerID+"]" + msg); 
    };

    //--------------------------------------------------
    //	再生開始完了処理。
    _my._play = function () {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        _my._set_info_visibled(false);
        var cssTypeWidth = _my._get_css_suffix("width");
        if (_my._values.ctrl_use) {
            //_my._set_ctrl_select_list_visibled(false);

            if (_my._values.play_use)
                _my._nodes.ctrl_play.set('className', 'ctrl_pause' + cssTypeWidth);
        }
        if (_my._values.header_use) {
            if (_my._values.replay_use) {
                _my._nodes.ctrl_replay.setStyle('display', 'none');
                var replay_icon = document.getElementById(_my.playerID + "ctrl_replay").children[0];
                var replay_text = document.getElementById(_my.playerID + "ctrl_replay").children[1];
                if (replay_icon) replay_icon.className = "ctrl_replay_icon" + _my._get_css_suffix("width");
                if (replay_text) replay_text.className = "ctrl_replay_text" + _my._get_css_suffix("width");
                if (_my._values.title_use) {
                    _my._nodes.video_title_text.setStyle('margin-right', '0px');
                }
            }
        }

        if (_my._values.header_use && !_my._values.title_use) {
            _my._nodes.header.setStyle('display', 'none');
        }
        _my._nodes.video.setStyle("top", "0px");
        _my._nodes.video.setStyle("left", "0px");
        _my._nodes.video.setStyle("width", "100%");
        _my._nodes.video.setStyle("opacity", "1");
        _my._nodes.video.setStyle("z-index", "10");
        var appVersion = window.navigator.appVersion.toLowerCase();
        var iosVersion = null;
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
        }
        if (_my._values.jmcPlayer.flashVars.platform["isSafari"] && _my._values.jmcPlayer.flashVars.platform["os"]["name"] == "iOS") {
            if (Number(_my._values.jmcPlayer.flashVars.platform["os"]["version"].split(".")[0]) >= 10) {
                _my._nodes.video.setStyle("visibility", "hidden");
                setTimeout(function () {
                    _my._nodes.video.setStyle("height", "100%");
                    _my._nodes.video.setStyle("visibility", "visible");
                }, 100);
            } else if (Number(_my._values.jmcPlayer.flashVars.platform["os"]["version"].split(".")[0]) < 8) {
                _my._nodes.video.setStyle("height", "100%");
            } else {
                _my._nodes.video.setStyle("height", "100%");
                _my._nodes.video.setStyle("margin", "auto");
            }
        } else {
            _my._nodes.video.setStyle("height", "100%");
        }
        _my._set_video_thumb("");

        _my._set_play_state('play');
        // 操作画面表示管理用：最終操作時間
        _my._setOperationTime();

        if (_my._nodes.ctrl_video_seek_cover) {
            _my._nodes.ctrl_video_seek_cover.setStyle('display', 'none');
            _my._nodes.ctrl_video_seek_slider.setStyle("display", "block");
        }

        if (_my._values.progressTimer) return;
        _my._values.progressTimer = setInterval(_my._progress, 1000 / 20);
        _my._set_duration();
        // 再生時間設定
        if (_my._values.time_use) {
            _my._nodes.video_play_time.setInner(_get_timeString(Math.floor(_my._values.currentTime)));
            _my._nodes.video_total_time.setInner(_get_timeString(Math.floor(_my._values.duration)));
        }

        _my.cb_playing();
    };

    //	一時停止。
    _my._pause = function () {
        var cssTypeWidth = _my._get_css_suffix("width");

        if (_my._values.play_use) _my._nodes.ctrl_play.set('className', 'ctrl_play' + cssTypeWidth);
        _my._set_navi_visibled(true);
        if (_my._values.progressTimer) {
            clearInterval(_my._values.progressTimer);
            _my._values.progressTimer = null;
        }
        if (_my._values.isLive) {
            _my._set_play_state('pause');
            // _my._values.jmcPlayer.accessor.canPlayHls = false;
            // //DVRならDRVsrcに変更する？
            // if (_my._values.jmcPlayer.accessor.hls) {
            //     //_my._values.jmcPlayer.accessor.hls.stopLoad();
            _my._values.jmcPlayer.accessor.isStoped = true;
            //     _my._values.first_play = true;
            // } else {
            //     _my._values.first_play = true;
            // }
            setTimeout(function () {
                if (_my._values.play_status == "pause") {
                    _my._set_play_state('wait');
                }
            }, 750);
            return;
        }
        var duration = Number(_my._values.duration);
        if (!isFinite(duration)) return;
        if (_my._values.currentTime < duration)
            _my._set_play_state('pause');

        // 再生時間設定
        _my._update_time();

        _my.cb_pause();
    };

    // 予約時間適用
    _my._loadReserveCT = function (isStarted) {

        var video = _my._nodes.video.DOMNode();
        if (!video) return false;

        if (_my._values.load_currentTime <= 0) return true;
        var duration = Number(_my._values.duration);
        if (!isFinite(duration)) return;
        if (duration <= 1) return true;
        if (isStarted && (video.currentTime <= 0)) return false;

        video.currentTime = _my._values.load_currentTime;
        if (Math.floor(video.currentTime) == Math.floor(_my._values.load_currentTime))
            return true;

        return false;
    }

    // 再生時間指定
    // 指定できた場合指定した時間/失敗時は0/エラー時は-1
    _my._setCurrentTime = function (time) {
        var video = _my._nodes.video.DOMNode();
        if (!video) return false;

        if (_my._values.movie_status == 'error') return -1;

        var duration = Number(_my._values.duration);
        if (!isFinite(duration)) return;
        if (duration > 0) {
            // duration以上を指定された場合はduration値に置換
            if (time > duration) time = duration - 1;
        }



        // スライダー設定
        var appVersion = window.navigator.appVersion.toLowerCase();
        var iosVersion = null;
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt((v[3] || "0"), 10)];
        }
        if (iosVersion == null || iosVersion[0] != 8) {
            //再生前はパラメーターに反映させるだけ
            _my._values.start_time = time;

            _my._values.currentTime = time;
            _my._values.load_currentTime = time;
            // 時間設定(再生時間反映)
            _my.videoseek_update_callback(_my._values.currentTime * _my._values.seek_scale);

            // スライダー設定
            _my._set_videoseek_slider();
        } else {
            _my._set_videoseek_slider();
            _my._values.isSeeking = true;
            //再生前はパラメーターに反映させるだけ
            var isPlaying = false;
            if (_my._values.progressTimer) {
                video.pause();
                isPlaying = true;
            }
            _my._values.start_time = time;

            _my._values.currentTime = time;
            _my._values.load_currentTime = time;
            _my.videoseek_update_callback(_my._values.currentTime * _my._values.seek_scale);
            setTimeout(function () {
                _my._values.isSeeking = false
                if (isPlaying) {
                    isPlaying = false;
                    video.play();
                }
            }, 1000);
        }


        return time;
    };

    // 再生時定期コール関数
    _my._progress = function () {
        if (_my._values.movie_status == 'error') return;
        _my._update_status();
        var video = _my._nodes.video.DOMNode();
        var duration = Number(_my._values.duration);
        if (!isFinite(duration)) return;
        if (_my._values.movie_status != "ended" && video.currentTime >= _my._values.jmcPlayer.accessor.getTotalTime() - 0.05) {//-0.05sまで許容
            _my._set_movie_status('ended');
            var forceEvent = new Event("ended", { cancelable: true });
            video.dispatchEvent(forceEvent);
            _my._end();
        }
    };

    // シーク完了
    _my._seeked = function () {
        _my.cb_seeked();
    }

    // loadmetadata発生
    _my._ready = function () {
        _my._values.loadedmetadata = true;

        _my.cb_ready();
    }
    _my._displayRefresh = function () {
        var cssType = _my._get_css_suffix();
        var cssTypeWidth = _my._get_css_suffix("width");
        var cssTypeHeight = _my._get_css_suffix("height");
        //header
        if (document.getElementById(_my.playerID + "header")) {
            if (cssTypeHeight == "_ss") {
                document.getElementById(_my.playerID + "header").style.display = "none";
            } else {
                document.getElementById(_my.playerID + "header").style.display = "block";
                document.getElementById(_my.playerID + "header").className = "eq-header" + cssTypeHeight;
            }
            if (_my._values.header_use && !_my._values.title_use) {
                document.getElementById(_my.playerID + "header").style.display = "none";
            }
        }
        ////title height
        if (document.getElementById(_my.playerID + "video_title_text")) {
            if (cssTypeHeight == "_ss") {
                document.getElementById(_my.playerID + "video_title_text").style.display = "none";
            } else {
                document.getElementById(_my.playerID + "video_title_text").style.display = "block";
                document.getElementById(_my.playerID + "video_title_text").className = "video_title_text" + cssTypeHeight;
            }
        }
        //ctrl
        ////left
        //////play width
        if (document.getElementById(_my.playerID + "ctrl_play")) {
            document.getElementById(_my.playerID + "ctrl_play").className = "ctrl_play" + cssTypeWidth;
        }
        //////time width
        if (document.getElementById(_my.playerID + "ctrl_video_time")) {
            document.getElementById(_my.playerID + "ctrl_video_time").className = "ctrl_video_time" + cssTypeWidth;
        }
        ////right
        var rightElem = 10;
        var leftElem = 10;

        if (_my._values.play_use && _my._getPlayerStyle("width") != _my.PS_MINIMUM) leftElem += 28;		// 再生/一時停止
        if (_my._values.fullscreen_use) rightElem += 30;		// フルスクリーン
        if (_my._values.volume_use) {//音量
            if ((_my._values.jmcPlayer.flashVars.platform["isSP"] || _my._values.jmcPlayer.flashVars.platform["isTablet"])) {
                leftElem += 38;
            } else {
                leftElem += 98;
            }
        }
        if (_my._values.time_use && _my._getPlayerStyle("width") == _my.PS_NORMAL) leftElem += 100;		// 再生時間(ノーマル時のみ）
        if (_my._getPlayerStyle("width") != _my.PS_MINIMUM) rightElem += 30;//設定ボタン

        if (!!_my._values.ctrl_use) {
            //左側の要素
            var ctrl_left = imba_t3.node.one('#' + _my.playerID + 'ctrl_left_wrap');
            ctrl_left.setStyle("float", "left");
            ctrl_left.setStyle("width", leftElem + "px");
            //右側の要素
            var ctrl_right = imba_t3.node.one('#' + _my.playerID + 'ctrl_right_wrap');
            ctrl_right.setStyle("float", "right");
            ctrl_right.setStyle("width", rightElem + "px");
        }
        //navi
        ////outlink height
        if (document.getElementById(_my.playerID + "navi_outlink")) {
            document.getElementById(_my.playerID + "navi_outlink").className = "navi_outlink" + cssTypeHeight;
        }
        ////share height
        if (document.getElementById(_my.playerID + "navi_share")) {
            document.getElementById(_my.playerID + "navi_share").className = "navi_share" + cssTypeHeight;
        }
        //playstate

    }
    //---------------------------------------------------------------//
    var h5p = _my;
    h5p.prefix = "h5p_pd_";

    // 最後に発生したムービーのステータスを取得します。
    h5p.getStatus = function () { return _my._values.movie_status; };

    // 設定されているプレイヤーIDを取得します。
    h5p.getPlayerID = function () { return _my.playerID; };

    // 設定されているビデオIDを取得します。
    h5p.getVideoID = function () { return _my.videoID; };

    // ビデオステータスが「loadedmetadata」になった時に呼び出されます。
    // （loadedmetadataはビデオのメタ情報の読込が完了した時点で発生するイベントです。）
    h5p.ready = function () { };	// 廃止予定
    h5p.cb_ready = function () { return _my.ready(); };

    // ビデオのシーク完了時に呼び出されます。
    h5p.seeked = function () { };	// 廃止予定
    h5p.cb_seeked = function () { return _my.seeked(); };

    // pauseイベント発生時に呼び出されます。
    h5p.cb_pause = function () { };

    // playingイベント発生時に呼び出されます。
    h5p.cb_playing = function () { };

    // endedイベント発生時に呼び出されます。
    h5p.cb_ended = function () { };

    // replay時に呼び出されます。
    h5p.cb_replay = function () { };

    // ビデオの現在の再生時間を設定します。
    // @param	time	再生を開始する時間（秒）
    // @return	指定できた場合、指定した時間（time)/失敗時は0/エラー時は-1
    h5p.setCurrentTime = function (time) {
        time = Number(time);
        if (!isFinite(time)) return;
        if (_my._values.first_play) {
            _my._values.start_time = time;
            _my._values.currentTime = time;
            _my._values.load_currentTime = time;
            _my._values.jmcPlayer.accessor.lastTime = time;
            return time;
        }
        _my.seek_state_checker();
        if ((_my._values.platform["isIE"] || _my._values.platform["isEdge"]) && (_my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS || _my._values.jmcPlayer.accessor.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS)) {
            var video = _my._nodes.video.DOMNode();
            var IEpause = function () {
                video.removeEventListener("playing", IEpause);
                if (!_my._values.preSeekPlaying) {
                    video.pause();
                }
            }
            if (_my._values.platform["isIE"]) {
                video.addEventListener("playing", IEpause);
            }
            _my._values.jmcPlayer.accessor.hls.startLoad(time);
        }
        return _my._setCurrentTime(time);
    };

    // 現在の再生時間を取得します。
    // @return 再生時間（秒）
    h5p.getCurrentTime = function () {
        if (_my._values.first_play) {
            return _my._values.currentTime;
        }
        var video = _my._nodes.video.DOMNode();
        if (!video) return _my._values.currentTime;
        return video.currentTime
    };

    // 再生中のムービーを一時停止します。
    h5p.pause = function () {
        if (_my._values.movie_status == 'error') return;
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        video.pause();
    };

    // 設定されているムービーを再生します。
    h5p.play = function () {
        if (_my._values.movie_status == 'error') return;
        //_my._set_play_state('loading');
        _my._checkPlayable();
        //
    };


    h5p.reloadMovie = function () {
        _my._pause();

        // タイトル設定
        _my._values.movie_title = jmcPlayer.flashVars.title;
        if (_my._values.title_use) {

            _my._nodes.video_title_text.setInner(_my._values.movie_title);
        }

        // 	各種時間
        _my._values.duration = 0;
        _my._values.currentTime = 0;
        _my._values.stalledTime = 0;

        // ビデオファイルパス
        _my._values.movie_filepath = jmcPlayer.flashVars.movie_url;

        // サムネイル設定
        _my._set_video_thumb(_my._values.thumb_filePath);

        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        //video.poster = _my._values.thumb_filePath;
        //iOS系でなく、認証を利用しない場合は動画のソースを先にロードしておく
        if (!(_my._values.jmcPlayer.accessor.model.getEnvironmentType() == "mobileStreaming" && _my._values.movie_auth && !_my._values.authed && _my._values.jmcPlayer.accessor.model.isAuthEnable())) {
            //hlsjs利用時以外
            if (_my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.HLSJS && _my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_HLSJS) {
                video.src = _my._values.movie_filepath;
                video.load();
            }
        }
        // 画質選択設定
        if (_my._defVals.multibitrate_use) {
            _my._values.movie_index = 0;
            _my._values.movie_list = jmcPlayer.flashVars.movie_list;
            if (!_my._values.movie_list || (_my._values.movie_list.length <= 0)) {
                _my._values.multibitrate_use = false;
                _my._values.movie_list = [
                    {
                        "url": _my._values.movie_filepath,
                        "text": ""
                    }
                ];
            } else {
                _my._values.multibitrate_use = true;
                //デフォルト画質ラベル設定
                for (var i = 0; i < _my._values.movie_list.length; i++) {
                    if (_my._values.movie_filepath == _my._values.movie_list[i].url) {
                        _my._values.movie_index = i;
                        break;
                    }
                }
            }
        }

        _my._set_navi_visibled(true);

        // info閉
        _my._set_info_visibled(false);
        _my._nodes.ctrl_replay.setStyle('display', 'none');

        // duration設定
        if (_my._values.time_use) {
            _my._nodes.video_play_time.setInner(_get_timeString(Math.floor(0)));
            _my._nodes.video_total_time.setInner(_get_timeString(Math.floor(0)));
        }
    };

    h5p.changeQuality = function (movieURL) {
        var idx = -1;

        var i;
        for (i = 0; i < _my._values.movie_list.length; i++) {
            if (_my._values.movie_list[i].url == movieURL) {
                idx = i;
                break;
            }
        }

        if (idx < 0) return false;
        _my._click_movie_select(idx);

        return true;
    };
    h5p.getCurrentMovieURL = function () {
        return _my._values.movie_filepath;
    }
    h5p.setCurrentMovieURL = function (src) {
        _my._values.movie_filepath = src;
        var val = _my._values.jmcPlayer.accessor.getQuality();
        _my._close_select_menu();
        _my._nodes.quality_item.dom_node.children[1].textContent = _my._set_movie_list_text(val);
    }
    h5p.authResult = function (isAuthed) {
        _my._values.authed = isAuthed;
        if (!isAuthed) {
            //メッセージ追加
            if (_my._values.auth_input) {

            } else {
                _my._values.auth_input = true;
            }
            var titleNode = imba_t3.node.one('#' + _my.playerID + 'login_title');
            titleNode.setInner(_my._languageResource.kinds.ERROR_AUTH);
            titleNode.setStyle("color", "#FF7474")
            _my._video_change_ctrl();
        } else {
            if (!_my._values.platform["isSP"] && !_my._values.platform["isTablet"]) {
                _my._checkPlayable();
            }
        }

    }
    h5p.setMute = function (value) {
        var video = _my._nodes.video.DOMNode();
        video.muted = value;
        _my._setMuteButton();
    }
    h5p.setVolume = function (value) {
        var video = _my._nodes.video.DOMNode();
        h5p.setMute(false);
        video.volume = value;
        _my._set_Volume_slider(value)
    }

    h5p.authResult_native = function (isAuthed) {
        _my._values.authed = isAuthed;
        //動画情報を更新する
        this._values.movie_filepath = JMCPlayer.instance.flashVars.movie_url;
        _my._init_video();
        var video = _my._nodes.video.DOMNode();
        if (!video) return;

        //video.poster = _my._values.thumb_filePath;
        if (_my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.HLSJS && _my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_HLSJS) {
            video.src = _my._values.movie_filepath;
            video.load();
        }
        video.pause();
    }

    h5p.updateVideoURL = function (movie_url, isAuthed) {
        //動画情報を更新する
        _my._values.authed = isAuthed;
        if (isAuthed) {
            this._values.movie_filepath = movie_url;
            _my._init_video();
            var video = _my._nodes.video.DOMNode();
            if (!video) return;

            video.poster = _my._values.thumb_filePath;
            if (_my._values.jmcPlayer.accessor.getEnvironmentType() != jstream_t3.EnviromentKind.HLSJS) {
                video.src = _my._values.movie_filepath;
                video.load();
            }
            video.pause();
        } else {
            var titleNode = imba_t3.node.one('#' + _my.playerID + 'login_title');
            titleNode.setInner(_my._languageResource.kinds.ERROR_AUTH);
            titleNode.setStyle("color", "#FF7474")
            _my._set_login_visibled(true);
        }

    }

    h5p.setAuthVisible = function (visiblity) {
        _my._set_login_visibled(visiblity);
    }

    h5p.changePlaybackRate = function (rate) {
        _my._changePlaybackRate(rate);
    }

    h5p.changeCaption = function (label) {
        var video = _my._nodes.video.DOMNode();
        if (!video) return;
        if (!label) return;
    }

    h5p.setCaptionVisiblity = function (visiblity) {
        if (visiblity) {
            textTrack.mode = "showing";
        } else {
            textTrack.mode = "disabled";
        }
    }
    h5p.set_info_error = function (message) {
        _my._set_info_error(message);
    }
    h5p.setloop = function () {
        _my._setloop();
    }
    h5p.displayRefresh = function () {
        _my._displayRefresh();
    }
};var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var jstream_t3;
(function (jstream_t3) {
    var utils;
    (function (utils) {
        var Util = (function () {
            function Util() {
            }
            Util.getCanonical = function () {
                var linkList = document.getElementsByTagName("link");
                for (var i = 0; i < linkList.length; i++) {
                    if (linkList[i].rel == "canonical") {
                        var aaa = "aaa";
                        return linkList[i].href;
                    }
                }
                return null;
            };
            Util.getAPIServerURL = function (url) {
                return url + "/apiservice/";
            };
            Util.parse_uri = function (uri) {
                var reg = /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
                var m = uri.match(reg);
                if (m) {
                    return { "scheme": m[1], "authority": m[2], "path": m[3], "query": m[4], "fragment": m[5] };
                }
                else {
                    return null;
                }
            };
            Util.encode = function (value) {
                if (value == null)
                    return value;
                return value.split("&").join("__and__");
            };
            Util.decode = function (value) {
                if (value == null)
                    return value;
                return value.split("__and__").join("&");
            };
            Util.decodeHTMLEncode = function (src) {
                if (src == null)
                    return src;
                return src.split("&lt;").join("<").split("&gt;").join(">").split("&amp;").join("&").split("&quot;").join("\"").split("&nbsp;").join(" ");
            };
            Util.encodeHTMLEncode = function (str) {
                if (str == null)
                    return str;
                str = str.replace(/&/g, '&amp;');
                str = str.replace(/\"/g, '&quot;');
                str = str.replace(/\'/g, '&#039;');
                str = str.replace(/</g, '&lt;');
                str = str.replace(/>/g, '&gt;');
                return str;
            };
            Util.isFlash = function () {
                return jstream_t3.utils.EmbedSwf.detectFlashVer(10, 1, 0);
            };
            Util.browserLanguage = function () {
                if (Util.isMobileList().Android2) {
                    return navigator.appVersion.indexOf("ja-jp") >= 0 ? "ja" : "en";
                }
                if (document.all) {
                    return navigator.browserLanguage.split("-")[0];
                }
                var language = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;
                return language.split("-")[0];
            };
            Util.getOSVersion = function () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.indexOf("nt 6.1") != -1) {
                    return "Win7";
                }
                return "other";
            };
            Util.getUserAgent = function () {
                var ua = window.navigator.userAgent.toLowerCase();
                var appVersion = window.navigator.appVersion.toLowerCase();
                if (ua.indexOf("msie") > -1 || ua.indexOf('trident') > -1) {
                    if (appVersion.indexOf("msie 6.") != -1) {
                        return 'ie6';
                    }
                    else if (appVersion.indexOf("msie 7.") != -1) {
                        return 'ie7';
                    }
                    else if (appVersion.indexOf("msie 8.") != -1) {
                        return 'ie8';
                    }
                    else if (appVersion.indexOf("msie 9.") != -1) {
                        return 'ie9';
                    }
                    else if (appVersion.indexOf("msie 10.") != -1) {
                        return 'ie10';
                    }
                    return "IE";
                }
                else if (ua.indexOf("edge") > -1) {
                    return "edge";
                }
                else if (ua.indexOf("firefox") > -1) {
                    return "Firefox";
                }
                else if (ua.indexOf("opera") > -1) {
                    return "opera";
                }
                else if (ua.indexOf("netscape") > -1) {
                    return "netscape";
                }
                else if (ua.indexOf("chrome") > -1) {
                    return "Chrome";
                }
                else if (ua.indexOf("safari") > -1 && ua.indexOf("mobile") == -1) {
                    var re = /version\/(\d+)/;
                    var ver = parseInt(re.exec(appVersion)[1]);
                    if (ver >= 9) {
                        return "Safari";
                    }
                    else {
                        return "oldSafari";
                    }
                }
                else {
                    return "Unknown";
                }
            };
            Util.isMobileList = function (userAgent) {
                if (userAgent === void 0) { userAgent = null; }
                if (Util["isMobile"] == null) {
                    Util["isMobile"] = new MobileAgentList(userAgent);
                }
                return Util["isMobile"];
            };
            Util.isLegacyBrowser = function (os, browser) {
                return false;
            };
            Util.isPC = function () {
                var ua = window.navigator.userAgent.toLowerCase();
                if ((ua.indexOf('iphone') > 0
                    || ua.indexOf('ipad') > 0
                    || (ua.indexOf('android') > 0) && (ua.indexOf('mobile') > 0)
                    || ua.indexOf('windows phone') > 0))
                    return false;
                return true;
            };
            Util.getOS = function () {
                var os = "";
                var ua = window.navigator.platform.toLowerCase();
                return os;
            };
            Util.deleteNullItem = function (myArray) {
                var i, len, _results;
                if (!myArray) {
                    return;
                }
                len = myArray.length - 1;
                i = len;
                _results = [];
                while (i >= 0) {
                    if (!myArray[i]) {
                        myArray.splice(i, 1);
                    }
                    _results.push(i--);
                }
                return _results;
            };
            Util.isFunction = function (value) {
                return typeof value == "function";
            };
            Util.isObject = function (value) {
                return typeof value == "object";
            };
            Util.escapeObject = function (value) {
                if (value == null || typeof value == "function")
                    return null;
                if (typeof value == "string") {
                    return window["escape"](value);
                }
                if (typeof value == "number" || typeof value == "boolean") {
                    return value;
                }
                var result;
                if (value instanceof Array) {
                    result = [];
                }
                else {
                    result = {};
                }
                for (var prop in value) {
                    result[prop] = Util.escapeObject(value[prop]);
                }
                return result;
            };
            Util.changeParamName = function (params) {
                params.base = params.b;
                params.contract_id = params.c;
                params.meta_id = params.m;
                params.partner_id = params.pcid;
                params.maker_id = params.mkid;
                params.product_id = params.pdid;
                params.start_time = params.t;
                params.plugins = params.p;
                params.va_url = params.v;
                params.width = params.s.wp;
                params.height = params.s.hp;
                if (!isNaN(parseFloat(params.s.wt)))
                    params.s.wt = parseFloat(params.s.wt);
                params.thumb_width = params.s.wt;
                if (!isNaN(parseFloat(params.s.ht)))
                    params.s.ht = parseFloat(params.s.ht);
                params.thumb_height = params.s.ht;
                params.responsive = params.s.rp;
                params.default_quality = params.s.dq || 2;
                params.auth = params.a;
                params.optionId = params.opid;
                params.onetimeTag = params.ot;
                params.line = params.s.line;
                return params;
            };
            Util.unObfuscate = function (str) {
                str = decodeURIComponent(str);
                str = this.base64decode(str).toString();
                return str;
            };
            Util.obfuscate = function (str) {
                str = this.base64encode(str);
                str = encodeURIComponent(str);
                return str;
            };
            Util.base64encode = function (s) {
                var t = '';
                var p = -6;
                var a = 0;
                var i = 0;
                var v = 0;
                var c;
                var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                while ((i < s.length) || (p > -6)) {
                    if (p < 0) {
                        if (i < s.length) {
                            c = s.charCodeAt(i++);
                            v += 8;
                        }
                        else {
                            c = 0;
                        }
                        a = ((a & 255) << 8) | (c & 255);
                        p += 8;
                    }
                    t += BASE64_CHARS.charAt((v > 0) ? (a >> p) & 63 : 64);
                    p -= 6;
                    v -= 6;
                }
                return t;
            };
            Util.base64decode = function (s) {
                var t = '';
                var p = -8;
                var a = 0;
                var c;
                var d;
                var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                for (var i = 0; i < s.length; i++) {
                    if ((c = BASE64_CHARS.indexOf(s.charAt(i))) < 0)
                        continue;
                    a = (a << 6) | (c & 63);
                    if ((p += 6) >= 0) {
                        d = (a >> p) & 255;
                        if (c != 64)
                            t += String.fromCharCode(d);
                        a &= 63;
                        p -= 8;
                    }
                }
                return t;
            };
            Util.toJSON = function (obj) {
                var buff = [];
                var read = function (o) {
                    if (typeof (o) == "function") {
                        return;
                    }
                    else if (typeof (o) == "string" || o instanceof String) {
                        return '"' + o + '"';
                    }
                    else if (typeof (o) == "number" || o instanceof Number) {
                        return o;
                    }
                    else if (o instanceof Array) {
                        if (o) {
                            buff.push('[');
                            for (var idx in o) {
                                buff.push(read(o[idx]));
                                buff.push(', ');
                            }
                            if (o.length > 0)
                                delete buff[buff.length - 1];
                            buff.push(']');
                        }
                    }
                    else if (o instanceof Object) {
                        if (o) {
                            buff.push('{');
                            for (var key in o) {
                                buff.push(key + ': ');
                                buff.push(read(o[key]));
                                buff.push(',');
                            }
                            delete buff[buff.length - 1];
                            buff.push('}');
                        }
                    }
                };
                read(obj);
                return buff.join('');
            };
            Util.toJSONforCustomVA = function (obj) {
                var buff = [];
                var read = function (o) {
                    if (typeof (o) == "function") {
                        return;
                    }
                    else if (typeof (o) == "string" || o instanceof String) {
                        return '"' + o + '"';
                    }
                    else if (typeof (o) == "number" || o instanceof Number) {
                        return o;
                    }
                    else if (o instanceof Array) {
                        if (o) {
                            buff.push('[');
                            for (var idx in o) {
                                buff.push(read(o[idx]));
                                buff.push(', ');
                            }
                            if (o.length > 0)
                                delete buff[buff.length - 1];
                            buff.push(']');
                        }
                    }
                    else if (o instanceof Object) {
                        if (o) {
                            buff.push('{');
                            for (var key in o) {
                                buff.push('"' + key + '": ');
                                buff.push(read(o[key]));
                                buff.push(',');
                            }
                            delete buff[buff.length - 1];
                            buff.push('}');
                        }
                    }
                };
                read(obj);
                return buff.join('');
            };
            Util.toQuery = function (obj) {
                var buff = [];
                var read = function (o) {
                    if (typeof (o) == "function") {
                        return;
                    }
                    else if (typeof (o) == "string" || o instanceof String) {
                        return o;
                    }
                    else if (typeof (o) == "number" || o instanceof Number) {
                        return o;
                    }
                    else if (o instanceof Array) {
                        if (o) {
                            buff.push('[');
                            for (var idx in o) {
                                buff.push(read(o[idx]));
                                buff.push(', ');
                            }
                            if (o.length > 0)
                                delete buff[buff.length - 1];
                            buff.push(']');
                        }
                    }
                    else if (o instanceof Object) {
                        if (o) {
                            buff.push('{');
                            for (var key in o) {
                                buff.push(key + ': ');
                                buff.push(read(o[key]));
                                buff.push(',');
                            }
                            delete buff[buff.length - 1];
                            buff.push('}');
                        }
                    }
                };
                read(obj);
                return buff.join('');
            };
            Util.GetCookie = function (name) {
                var result = null;
                var cookieName = name + '=';
                var allcookies = window.document.cookie;
                var position = allcookies.indexOf(cookieName);
                if (position != -1) {
                    var startIndex = position + cookieName.length;
                    var endIndex = allcookies.indexOf(';', startIndex);
                    if (endIndex == -1) {
                        endIndex = allcookies.length;
                    }
                    result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
                }
                return result;
            };
            Util.SetCookie = function (name, value, path, period, domain) {
                if (period === void 0) { period = null; }
                if (domain === void 0) { domain = null; }
                if (domain == null) {
                    domain == "";
                }
                else {
                    domain = "domain=" + domain + ";";
                }
                if (period != null) {
                    var date = new Date();
                    date.setTime(date.getTime() + period * 60 * 60 * 24 * 1000);
                    var nowtime = new Date().getTime();
                    var clear_time = new Date(nowtime + (60 * 60 * 24 * 1000 * (period)));
                    var expires = date.toUTCString();
                    var max_age = 60 * 60 * 24 * period;
                    window.document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;" + domain + "max-age=" + max_age + ";expires=" + expires;
                }
                else {
                    window.document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;" + domain;
                }
            };
            Util.CheckOverCookie = function (key, name, max) {
                var cookies = window.document.cookie.split(";");
                if (window.document.cookie.indexOf(name) != -1) {
                    return null;
                }
                var firstCookie = null;
                var cookieCount = 0;
                for (var i = 0; i < cookies.length; i++) {
                    if (cookies[i].indexOf(key) != -1) {
                        if (firstCookie == null) {
                            firstCookie = cookies[i].split("=")[0];
                        }
                        cookieCount++;
                    }
                }
                return cookieCount >= max ? firstCookie : null;
            };
            Util.DeleteCookie = function (name, domain) {
                if (domain === void 0) { domain = null; }
                if (domain == null) {
                    domain == "";
                }
                else {
                    domain = "domain=" + domain + ";";
                }
                var date1 = new Date();
                date1.setTime(0);
                window.document.cookie = name + "=;path=/;" + domain + " expires=" + date1.toDateString();
            };
            Util.ReplaceHtmltagWithString = function (originString, htmlTagName, newString) {
                var pattern = "/<" + htmlTagName + "[^>]+?\/>|<" + htmlTagName + "(.|\s)*?\/" + htmlTagName + ">/gi";
                return originString.replace(pattern, newString);
            };
            Util.messageConvertForLegacy = function (msg, value, iframeID) {
                var stringMessage;
                stringMessage = msg;
                if (typeof (value) == "string") {
                    stringMessage += "," + value;
                }
                else {
                    for (var prop in value) {
                        stringMessage += "," + value[prop];
                    }
                }
                stringMessage += "," + iframeID;
                return stringMessage;
            };
            Util.messageRevertForLagacy = function (data) {
                var returnObject = {
                    msg: "",
                    value: "",
                    iframeID: ""
                };
                var parseData = data.split(",");
                if (parseData.length == 3) {
                    returnObject["msg"] = parseData[0];
                    returnObject["value"] = parseData[1];
                    returnObject["iframeID"] = parseData[2];
                }
                else {
                    returnObject["msg"] = parseData[0];
                    var value = {
                        currentTime: parseData[1],
                        totalTime: parseData[2],
                        quality: parseData[3],
                        isMute: parseData[4],
                        volume: parseData[5],
                        playbackRate: parseData[6],
                        currentAPI: parseData[7]
                    };
                    returnObject["value"] = value;
                    returnObject["iframeID"] = parseData[parseData.length - 1];
                }
                return returnObject;
            };
            return Util;
        }());
        utils.Util = Util;
        var MobileAgentList = (function () {
            function MobileAgentList(userAgent) {
                if (userAgent === void 0) { userAgent = null; }
                this.iOSP = false;
                this.iOST = false;
                this.Android1 = false;
                this.Android2 = false;
                this.Android3 = false;
                this.Android4 = false;
                this.BlackBerry = false;
                this.Windows = false;
                this.WindowsPC = false;
                this.Firefox = false;
                var agent = userAgent || navigator.userAgent;
                var navMatch = function (exp) {
                    return agent.match(exp) ? true : false;
                };
                this.iOSP = navMatch(/iPhone|iPod/i);
                this.iOST = navMatch(/iPad/i);
                this.Android1 = navMatch(/Android 1/i);
                this.Android2 = navMatch(/Android 2/i);
                this.Android3 = navMatch(/Android 3/i);
                this.Android4 = (navMatch(/Android [4-9]/i)) || (navMatch(/Silk/i));
                this.BlackBerry = navMatch(/BlackBerry/i);
                this.Windows = navMatch(/Windows Phone/i);
                this.WindowsPC = navMatch(/Windows NT/i);
                this.Firefox = navMatch(/Firefox/i) && navMatch(/Mobile|Tablet/i);
            }
            return MobileAgentList;
        }());
        utils.MobileAgentList = MobileAgentList;
        var Trace = (function () {
            function Trace() {
            }
            Trace.write = function (str) {
                var targetElement = "debug";
                var el = document.getElementById(targetElement);
                if (el) {
                    var dt = new Date();
                    var HHMMSS = String(dt.getHours() + 100).substr(1) + ":" + String(dt.getMinutes() + 100).substr(1) + ":" + String(dt.getSeconds() + 100).substr(1) + "." + String(dt.getMilliseconds() + 1000).substr(1);
                    var tmpStr = el.innerText;
                    el.innerText = HHMMSS + " " + str + "\n" + tmpStr;
                }
                return;
            };
            return Trace;
        }());
        utils.Trace = Trace;
        var EmbedSwf = (function () {
            function EmbedSwf() {
            }
            EmbedSwf.embed = function (id, path, width, height, thumb) {
                if (thumb === void 0) { thumb = null; }
                var params = {
                    quality: "high",
                    bgcolor: "#000000",
                    play: "true",
                    loop: "false",
                    wmode: "opaque",
                    scale: "noScale",
                    menu: "false",
                    devicefont: "false",
                    salign: "TL",
                    allowscriptaccess: "always",
                    allowfullscreen: "true"
                };
                var target = document.getElementById(id);
                var win = window;
                if (win.ActiveXObject) {
                    var objectTag = "";
                    var paramTags = "";
                    for (var key in params) {
                        paramTags += '<param name="' + key + '" value="' + params[key] + '" />';
                    }
                    paramTags += '<param name="movie" value="' + path + '" />';
                    objectTag = '<object id="' + id + '" name="' + id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + String(width) + '" height="' + String(height) + '">' + paramTags + '</object>';
                    target.outerHTML = objectTag;
                    var object = document.getElementById(id);
                }
                else {
                    var parent = target.parentElement;
                    parent.removeChild(target);
                    var object = document.createElement("object");
                    object.id = id;
                    object.setAttribute("name", id);
                    object.setAttribute("type", "application/x-shockwave-flash");
                    object.setAttribute("width", String(width));
                    object.setAttribute("height", String(height));
                    object.setAttribute("data", path);
                    for (var key in params) {
                        var param = document.createElement("param");
                        param.setAttribute("name", key);
                        param.setAttribute("value", params[key]);
                        object.appendChild(param);
                    }
                    var w = -1;
                    var h = -1;
                    if (width != null) {
                        if (width == "100%") {
                            w = parent.clientWidth;
                        }
                        else {
                            w = parseInt(width);
                        }
                    }
                    if (height != null) {
                        if (height == "100%") {
                            h = parent.clientHeight;
                        }
                        else {
                            h = parseInt(height);
                        }
                    }
                    if (thumb != null && (w < 398 || h < 298)) {
                        var img = document.createElement("param");
                        img.setAttribute("name", "poster");
                        img.setAttribute("value", thumb);
                        object.appendChild(img);
                    }
                    parent.appendChild(object);
                }
            };
            EmbedSwf.fallbackEmbed = function (id, path, width, height, thumb) {
                if (thumb === void 0) { thumb = null; }
                var params = {
                    quality: "high",
                    bgcolor: "#000000",
                    play: "true",
                    loop: "false",
                    wmode: "opaque",
                    scale: "noScale",
                    menu: "false",
                    devicefont: "false",
                    salign: "TL",
                    allowscriptaccess: "always",
                    allowfullscreen: "true"
                };
                var target = document.getElementById(id);
                var win = window;
                if (win.ActiveXObject) {
                    var objectTag = "";
                    var paramTags = "";
                    for (var key in params) {
                        paramTags += '<param name="' + key + '" value="' + params[key] + '" />';
                    }
                    paramTags += '<param name="movie" value="' + path + '" />';
                    objectTag = '<object id="' + id + '" name="' + id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + String(width) + '" height="' + String(height) + '">' + paramTags + '</object>';
                    target.innerHTML = objectTag;
                    var object = document.getElementById(id);
                }
                else {
                    var parent = target.parentElement;
                    var object = document.createElement("object");
                    object.id = id + "fallback";
                    object.setAttribute("name", id + "fallback");
                    object.setAttribute("type", "application/x-shockwave-flash");
                    object.setAttribute("width", String(width));
                    object.setAttribute("height", String(height));
                    object.setAttribute("data", path);
                    for (var key in params) {
                        var param = document.createElement("param");
                        param.setAttribute("name", key);
                        param.setAttribute("value", params[key]);
                        object.appendChild(param);
                    }
                    var w = -1;
                    var h = -1;
                    if (width != null) {
                        if (width == "100%") {
                            w = parent.clientWidth;
                        }
                        else {
                            w = parseInt(width);
                        }
                    }
                    if (height != null) {
                        if (height == "100%") {
                            h = parent.clientHeight;
                        }
                        else {
                            h = parseInt(height);
                        }
                    }
                    if (thumb != null && (w < 398 || h < 298)) {
                        var img = document.createElement("param");
                        img.setAttribute("name", "poster");
                        img.setAttribute("value", thumb);
                        object.appendChild(img);
                    }
                    target.appendChild(object);
                }
            };
            EmbedSwf.getFpVer = function () {
                var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
                var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
                var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
                var flashVer = "-1";
                if (navigator.plugins != null && navigator.plugins.length > 0) {
                    if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
                        var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
                        var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
                        var descArray = flashDescription.split(" ");
                        var tempArrayMajor = descArray[2].split(".");
                        var versionMajor = tempArrayMajor[0];
                        var versionMinor = tempArrayMajor[1];
                        var versionRevision = descArray[3];
                        if (versionRevision == "") {
                            versionRevision = descArray[4];
                        }
                        if (versionRevision[0] == "d") {
                            versionRevision = versionRevision.substring(1);
                        }
                        else if (versionRevision[0] == "r") {
                            versionRevision = versionRevision.substring(1);
                            if (versionRevision.indexOf("d") > 0) {
                                versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
                            }
                        }
                        var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
                    }
                }
                else if (isIE && isWin && !isOpera) {
                    flashVer = this.controlVersion();
                }
                return flashVer;
            };
            EmbedSwf.controlVersion = function () {
                var version;
                var axo;
                var e;
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                    version = axo.GetVariable("$version");
                }
                catch (e) {
                }
                if (!version) {
                    try {
                        axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        version = "WIN 6,0,21,0";
                        axo.AllowScriptAccess = "always";
                        version = axo.GetVariable("$version");
                    }
                    catch (e) {
                        version = -1;
                    }
                }
                return version;
            };
            EmbedSwf.detectFlashVer = function (reqMajorVer, reqMinorVer, reqRevision) {
                var versionStr = this.getFpVer();
                if (versionStr == "-1") {
                    return false;
                }
                else if (versionStr != "0") {
                    if (versionStr.match(/ /)) {
                        var tmpArray = versionStr.split(" ");
                        versionStr = String(tmpArray[1]);
                    }
                    var versionArray = versionStr.replace(/,/g, ".").split(".");
                    var versionMajor = versionArray[0];
                    var versionMinor = versionArray[1];
                    var versionRevision = versionArray[2];
                    if (versionMajor > parseFloat(reqMajorVer)) {
                        return true;
                    }
                    else if (versionMajor == parseFloat(reqMajorVer)) {
                        if (versionMinor > parseFloat(reqMinorVer))
                            return true;
                        else if (versionMinor == parseFloat(reqMinorVer)) {
                            if (versionRevision >= parseFloat(reqRevision))
                                return true;
                        }
                    }
                    return false;
                }
            };
            return EmbedSwf;
        }());
        utils.EmbedSwf = EmbedSwf;
    })(utils = jstream_t3.utils || (jstream_t3.utils = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var QueController = (function () {
        function QueController(queType) {
            this.queType = queType;
        }
        QueController.prototype.getQueGlobal = function () {
            if (window["jstream_que_global"] == null) {
                window["jstream_que_global"] = {
                    queList: {},
                    currentQue: {}
                };
            }
            return window["jstream_que_global"];
        };
        QueController.prototype.getQueList = function () {
            if (this.getQueGlobal().queList[this.queType] == null) {
                this.getQueGlobal().queList[this.queType] = [];
            }
            return this.getQueGlobal().queList[this.queType];
        };
        QueController.prototype.currentQue = function (value) {
            if (value != null) {
                this.getQueGlobal().currentQue[this.queType] = value;
            }
            return this.getQueGlobal().currentQue[this.queType];
        };
        QueController.prototype.resetCurrentQue = function () {
            this.getQueGlobal().currentQue[this.queType] = null;
        };
        QueController.prototype.setQue = function () {
            this.getQueList().push(this);
            if (this.currentQue() == null) {
                this.next();
            }
        };
        QueController.prototype.next = function () {
            var _this = this;
            if (this.getQueList().length == 0) {
                this.resetCurrentQue();
                return;
            }
            this.currentQue(this.getQueList().shift());
            setTimeout(function () {
                var a = _this.currentQue();
                if (a) {
                    a.exec();
                }
            }, 100);
        };
        QueController.prototype.exec = function () {
        };
        return QueController;
    }());
    jstream_t3.QueController = QueController;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var utils;
    (function (utils) {
        var PlayerSetting = (function () {
            function PlayerSetting() {
            }
            PlayerSetting.setPlayerPreSetting = function (plyerId, params) {
                var setting;
                switch (plyerId.toString()) {
                    case "1":
                        setting = {
                            "name": "Syndication01",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "off",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "on",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "off"
                        };
                        break;
                    case "2":
                        setting = {
                            "name": "Syndication02",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "off",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "on",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "on",
                            "sns_id_list": ["facebook", "twitter", "line", "google"]
                        };
                        break;
                    case "3":
                        setting = {
                            "name": "Syndication03",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "off",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "on",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "off"
                        };
                        break;
                    case "4":
                        setting = {
                            "name": "Syndication04",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "off",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "off",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "on",
                            "sns_id_list": ["facebook", "twitter", "line", "google"]
                        };
                        break;
                    case "5":
                        setting = {
                            "name": "Syndication05",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "off",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "off",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "off"
                        };
                        break;
                    case "101":
                        setting = {
                            "name": "Syndication101",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "on",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "on",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "off"
                        };
                        break;
                    case "102":
                        setting = {
                            "name": "Syndication102",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "on",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "on",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "on",
                            "sns_id_list": ["facebook", "twitter", "line", "google"]
                        };
                        break;
                    case "103":
                        setting = {
                            "name": "Syndication103",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "on",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "on",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "off"
                        };
                        break;
                    case "104":
                        setting = {
                            "name": "Syndication104",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "on",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "off",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "on",
                            "sns_id_list": ["facebook", "twitter", "line", "google"]
                        };
                        break;
                    case "105":
                        setting = {
                            "name": "Syndication105",
                            "movie_width": "640",
                            "movie_height": "360",
                            "movie_aspect": "16:9",
                            "movie_protocol": "rtmp",
                            "play_use": "on",
                            "volume_use": "on",
                            "seak_use": "on",
                            "fullscreen_use": "on",
                            "footer_use": "off",
                            "title_use": "on",
                            "init_sound": "on",
                            "init_play": "on",
                            "embed_width": "640",
                            "embed_height": "360",
                            "va_use": "on",
                            "exlink_use": "off",
                            "tag_use": "off",
                            "multibitrate_use": "on",
                            "sns_use": "off"
                        };
                        break;
                }
                for (var key in setting) {
                    params[key] = setting[key];
                }
            };
            return PlayerSetting;
        }());
        utils.PlayerSetting = PlayerSetting;
    })(utils = jstream_t3.utils || (jstream_t3.utils = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var model;
    (function (model) {
        var NetServiceModel = (function () {
            function NetServiceModel() {
            }
            return NetServiceModel;
        }());
        model.NetServiceModel = NetServiceModel;
    })(model = jstream_t3.model || (jstream_t3.model = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var view;
    (function (view) {
        var AlertView = (function () {
            function AlertView() {
            }
            AlertView.show = function (message, title, parentElementId, cssDir) {
                if (title === void 0) { title = ""; }
                if (parentElementId === void 0) { parentElementId = null; }
                if (cssDir === void 0) { cssDir = ""; }
                var errorAlert = '<div class="errorDialog" style="top:0px;left:0px;right:0px;bottom:0px;margin:auto;height:134px"><div class="errorDialogHeader"><div class="hl"><img src="' + cssDir + 'e_ico.png"" style="margin-right:10px;" />#head</div><div class="hr"></div></div><div class="errorContent"><div class="bl"><p id="jsterrormessage">#message</p></div><div class="br"></div></div></div>';
                var targetElement = !parentElementId ? document.body : document.getElementById(parentElementId);
                if (targetElement.clientWidth < 240 || targetElement.clientHeight < 180) {
                    errorAlert = errorAlert.split("#head").join("");
                    errorAlert = errorAlert.split("#message").join(message);
                }
                else {
                    errorAlert = errorAlert.split("#head").join(title);
                    errorAlert = errorAlert.split("#message").join(message);
                }
                targetElement.innerHTML = errorAlert;
                var bl = targetElement.getElementsByTagName("p")[0];
                bl.style.top = ((84 - bl.clientHeight) / 2).toString() + 'px';
            };
            return AlertView;
        }());
        view.AlertView = AlertView;
    })(view = jstream_t3.view || (jstream_t3.view = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var resource;
    (function (resource) {
        var LanguageKinds = (function () {
            function LanguageKinds() {
            }
            return LanguageKinds;
        }());
        resource.LanguageKinds = LanguageKinds;
        var LanguageResource = (function () {
            function LanguageResource(languageResouce) {
                if (languageResouce === void 0) { languageResouce = null; }
                this.kinds = new LanguageKinds();
                this.setUp();
                if (languageResouce != null) {
                    this.setUpResource(languageResouce);
                }
            }
            LanguageResource.kinds = function () {
                if (jstream_t3.resource["LanguageResource_kinds"] == null) {
                    var language = new LanguageResource();
                    jstream_t3.resource["LanguageResource_kinds"] = language.kinds;
                }
                return jstream_t3.resource["LanguageResource_kinds"];
            };
            LanguageResource.prototype.getMessage = function (type) {
                return this.kinds[type];
            };
            LanguageResource.prototype.setUp = function () {
                if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                    this.kinds.ERROR_LIMIT = "現在、非公開です。";
                    this.kinds.ERROR_LIMIT_MESSAGE = "この動画は現在公開されておりません(P5001)";
                    this.kinds.ERROR_LIMIT_PRE_TITLE = "公開期間前です。";
                    this.kinds.ERROR_LIMIT_PRE_MESSAGE = "この動画はまだ公開されておりません(P5002)";
                    this.kinds.ERROR_LIMIT_OVER_TITLE = "公開が終了しています。";
                    this.kinds.ERROR_LIMIT_OVER_MESSAGE = "この動画の公開は終了しました(P5003)";
                    this.kinds.ERROR_META_DATA_TITLE = "動画情報の読み込みに失敗しました。";
                    this.kinds.ERROR_META_DATA_MESSAGE = "この動画は配信者によって削除されたか、現在、変換処理中の可能性があります。(P1001)";
                    this.kinds.ERROR_SETTING_TITLE = "プレイヤー設定情報の読み込みに失敗しました";
                    this.kinds.ERROR_SETTING_DELETE = "このプレイヤーは配信者によって削除された可能性があります。(P0501)";
                    this.kinds.ERROR_ENV_TITLE = "再生が許可されていません。";
                    this.kinds.ERROR_ENV_MESSAGE = "この動画は、再生が許可されていません。(P5101:_STATUS_)";
                    this.kinds.ERROR_CID_ILLEGAL_TITLE = "動画情報の読み込みに失敗しました。";
                    this.kinds.ERROR_CID_ILLEGAL_MESSAGE = "動画情報が正しくありませんでした。(P0201)";
                    this.kinds.SHARE_MOVIE = "この動画を共有";
                    this.kinds.LINKS = "関連ページ";
                    this.kinds.VIRALTAG_TITLE = "バイラルタグで共有";
                    this.kinds.VIRALTAG = "バイラルタグを取得";
                    this.kinds.VIRALTAG_BTN = "バイラルタグをコピー";
                    this.kinds.AUTH = "入力してください";
                    this.kinds.ERROR_AUTH = "認証に失敗しました";
                    this.kinds.ID = "ID";
                    this.kinds.PASS = "パスワード";
                    this.kinds.PLAY = "PLAY";
                    this.kinds.Replay = "もう一度見る";
                    this.kinds.Speed = "速度";
                    this.kinds.Quality = "画質";
                    this.kinds.Label_Low = "低画質";
                    this.kinds.Label_Standard = "標準画質";
                    this.kinds.Label_High = "高画質";
                    this.kinds.Label_HD = "ＨＤ";
                    this.kinds.Label_FullHD = "フルＨＤ";
                    this.kinds.Label_4K = "４Ｋ";
                    this.kinds.Label_Auto = "自動";
                    this.kinds.ERROR_TITLE = "エラー";
                    this.kinds.ERROR_MOVIE_NOT_FOUND = "動画ファイルが見つかりません。(P7011)";
                    this.kinds.ERROR_MOVIE_NOT_FOUND_2 = "動画ファイルが見つかりません。(P7012)";
                    this.kinds.ERROR_NO_FLASH_TITLE = "FlashPlayerがみつかりません。";
                    this.kinds.ERROR_NO_FLASH_MESSAGE = '<span style="color:#fff">動画の再生にはFlash Playerが必要です。<br /><a target="_blank" href="//www.adobe.com/go/getflashplayer" style="color:#ff0;" >Flash Playerをインストールしてください。</a>(P0102)</span>';
                    this.kinds.ERROR_NO_FLASH_ANDROID_TITLE = "FlashPlayerがみつかりません。";
                    this.kinds.ERROR_NO_FLASH_ANDROID_MESSAGE = "お使いの端末ではFlash Playerがサポートされていないため、動画を視聴することができません。(P0103)";
                    this.kinds.ERROR_SERVICE_TITLE = "サービス設定情報の読み込みに失敗しました";
                    this.kinds.ERROR_SERVICE_DELETE = "サービス設定情報の読み込みに失敗しました(P2001)";
                    this.kinds.ERROR_LIVE_RELOAD = "ライブが中断されました。<br />しばらくしてからリロードをお試し下さい。(P7101)";
                    this.kinds.P1201T = "ライブ情報の読み込みに失敗しました。";
                    this.kinds.P1201M = "このライブ配信はキャンセルされた可能性があります。(P1201)";
                    this.kinds.P3001T = "ライブ状態の読み込みに失敗しました。";
                    this.kinds.P3001M = "ページのリロードをお試しください。(P3001)";
                    this.kinds.P3501T = "ライブ状態の読み込みに失敗しました。";
                    this.kinds.P3501M = "ページのリロードをお試しください。(P3501)";
                    this.kinds.P3502M = "ページをリロード頂くか、しばらくたってからアクセスしなおしてください。(P3502)";
                    this.kinds.P3502T = "ライブ情報の読み込みができませんでした";
                    this.kinds.P8001T = "ネットワークエラー";
                    this.kinds.P8001M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8001)";
                    this.kinds.P8002T = "ネットワークエラー";
                    this.kinds.P8002M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8002)";
                    this.kinds.P8003T = "ネットワークエラー";
                    this.kinds.P8003M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8003)";
                    this.kinds.P8004T = "ネットワークエラー";
                    this.kinds.P8004M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8004)";
                    this.kinds.P8005T = "ネットワークエラー";
                    this.kinds.P8005M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8005)";
                    this.kinds.P8006T = "ネットワークエラー";
                    this.kinds.P8006M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8006)";
                    this.kinds.P8007T = "ネットワークエラー";
                    this.kinds.P8007M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8007)";
                    this.kinds.P8008T = "ネットワークエラー";
                    this.kinds.P8008M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8008)";
                    this.kinds.P8009T = "ネットワークエラー";
                    this.kinds.P8009M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8009)";
                    this.kinds.P8010T = "ネットワークエラー";
                    this.kinds.P8010M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8010)";
                    this.kinds.P8011T = "メディアエラー";
                    this.kinds.P8011M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8011)";
                    this.kinds.P8012T = "メディアエラー";
                    this.kinds.P8012M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8012)";
                    this.kinds.P8013T = "メディアエラー";
                    this.kinds.P8013M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8013)";
                    this.kinds.P8014T = "メディアエラー";
                    this.kinds.P8014M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8014)";
                    this.kinds.P8015T = "メディアエラー";
                    this.kinds.P8015M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8015)";
                    this.kinds.P8016T = "メディアエラー";
                    this.kinds.P8016M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8016)";
                    this.kinds.P8017T = "メディアエラー";
                    this.kinds.P8017M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8017)";
                    this.kinds.P8018T = "エラー";
                    this.kinds.P8018M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8018)";
                    this.kinds.P8019T = "メディアエラー";
                    this.kinds.P8019M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8019)";
                    this.kinds.P8020T = "メディアエラー";
                    this.kinds.P8020M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8020)";
                    this.kinds.P8021T = "メディアエラー";
                    this.kinds.P8021M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8021)";
                    this.kinds.P8022T = "エラー";
                    this.kinds.P8022M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8022)";
                    this.kinds.P8000T = "エラー";
                    this.kinds.P8000M = "読み込みに失敗しました。ネットワーク環境をご確認頂き、リロードをお試しください。(P8000)";
                    return;
                }
                else {
                    this.kinds.ERROR_LIMIT = "Content Not Available";
                    this.kinds.ERROR_LIMIT_MESSAGE = "This content is not currently available.<br />This content is only available for a limited term.(P5001)";
                    this.kinds.ERROR_LIMIT_PRE_TITLE = "Content Not Available";
                    this.kinds.ERROR_LIMIT_PRE_MESSAGE = "This content is not in public yet.<br />This content will be available in the near future.(P5002)";
                    this.kinds.ERROR_LIMIT_OVER_TITLE = "Content Not Available";
                    this.kinds.ERROR_LIMIT_OVER_MESSAGE = "This content has been expired.<br />This content was only available for a limited term(P5003)";
                    this.kinds.ERROR_META_DATA_TITLE = "Player failed to load this content information";
                    this.kinds.ERROR_SETTING_TITLE = "Failed to load configuration files of this player";
                    this.kinds.ERROR_SETTING_DELETE = "This player configuration may have been deleted by the publisher.(P0501)";
                    this.kinds.ERROR_ENV_TITLE = "Unauthorized content.";
                    this.kinds.ERROR_ENV_MESSAGE = "Unauthorized content.(P5101:_STATUS_)";
                    this.kinds.SHARE_MOVIE = "Share This Content";
                    this.kinds.ERROR_META_DATA_MESSAGE = "This content has been deleted or is being converted. (P1001)";
                    this.kinds.ERROR_CID_ILLEGAL_TITLE = "Failed to load this content information";
                    this.kinds.ERROR_CID_ILLEGAL_MESSAGE = "Illegal data exists in content information.(P0201)";
                    this.kinds.LINKS = "Related Link";
                    this.kinds.VIRALTAG_TITLE = "Viral Tag";
                    this.kinds.VIRALTAG = "Viral Tag";
                    this.kinds.VIRALTAG_BTN = "Copy Viral Tag";
                    this.kinds.AUTH = "Enter ID/PW";
                    this.kinds.ERROR_AUTH = "Invalid ID or PW";
                    this.kinds.ID = "ID";
                    this.kinds.PASS = "PASSWORD";
                    this.kinds.PLAY = "PLAY";
                    this.kinds.Label_Low = "Low";
                    this.kinds.Label_Standard = "Standard";
                    this.kinds.Label_High = "High";
                    this.kinds.Label_HD = "HD";
                    this.kinds.Label_FullHD = "FullHD";
                    this.kinds.Label_4K = "4K";
                    this.kinds.Label_Auto = "AUTO";
                    this.kinds.Replay = "Replay";
                    this.kinds.Speed = "Speed";
                    this.kinds.Quality = "Quality";
                    this.kinds.ERROR_TITLE = "Error";
                    this.kinds.ERROR_MOVIE_NOT_FOUND = "Movie not found(P7011)";
                    this.kinds.ERROR_MOVIE_NOT_FOUND_2 = "Movie not found(P7012)";
                    this.kinds.ERROR_NO_FLASH_TITLE = "flashPlayer not found";
                    this.kinds.ERROR_NO_FLASH_MESSAGE = '<span style="color:#fff">Require "Flash Player" to play this content. Please<br /><a target="_blank" href="//www.adobe.com/go/getflashplayer" style="color:#ff0">install the Flash Player.</a>(P0102)</span>';
                    this.kinds.ERROR_NO_FLASH_ANDROID_TITLE = "flashPlayer not found";
                    this.kinds.ERROR_NO_FLASH_ANDROID_MESSAGE = "This content is unavailable to you because your device doesn't support Flash Player.(P0103)";
                    this.kinds.ERROR_SERVICE_TITLE = "Failed to load configuration files of this serivce";
                    this.kinds.ERROR_SERVICE_DELETE = "This service configuration may have been deleted by the publisher.(P2001)";
                    this.kinds.ERROR_LIVE_RELOAD = "Live broadcast is interrupted.<br />Please try reload this page.(P7101)";
                    this.kinds.P1201T = "Player failed to load this live information";
                    this.kinds.P1201M = "This live may be canceled.(P1201)";
                    this.kinds.P3001T = "Player failed to load live status.";
                    this.kinds.P3001M = "Please try reload this page.(P3001)";
                    this.kinds.P3501T = "Player failed to load live status.";
                    this.kinds.P3501M = "Please try reload this page.(P3501)";
                    this.kinds.P3502M = "Please reload the page or access it again after a while.(P3502)";
                    this.kinds.P3502T = "Player failed to load live status.";
                    this.kinds.P8001T = "Network Error";
                    this.kinds.P8001M = "Failed to load.<br>To recconect the session, reload this page please.(P8001)";
                    this.kinds.P8002T = "Network Error";
                    this.kinds.P8002M = "Failed to load.<br>To recconect the session, reload this page please.(P8002)";
                    this.kinds.P8003T = "Network Error";
                    this.kinds.P8003M = "Failed to load.<br>To recconect the session, reload this page please.(P8003)";
                    this.kinds.P8004T = "Network Error";
                    this.kinds.P8004M = "Failed to load.<br>To recconect the session, reload this page please.(P8004)";
                    this.kinds.P8005T = "Network Error";
                    this.kinds.P8005M = "Failed to load.<br>To recconect the session, reload this page please.(P8005)";
                    this.kinds.P8006T = "Network Error";
                    this.kinds.P8006M = "Failed to load.<br>To recconect the session, reload this page please.(P8006)";
                    this.kinds.P8007T = "Network Error";
                    this.kinds.P8007M = "Failed to load.<br>To recconect the session, reload this page please.(P8007)";
                    this.kinds.P8008T = "Network Error";
                    this.kinds.P8008M = "Failed to load.<br>To recconect the session, reload this page please.(P8008)";
                    this.kinds.P8009T = "Network Error";
                    this.kinds.P8009M = "Failed to load.<br>To recconect the session, reload this page please.(P8009)";
                    this.kinds.P8010T = "Network Error";
                    this.kinds.P8010M = "Failed to load.<br>To recconect the session, reload this page please.(P8010)";
                    this.kinds.P8011T = "Media Error";
                    this.kinds.P8011M = "Failed to load.<br>To recconect the session, reload this page please.(P8011)";
                    this.kinds.P8012T = "Media Error";
                    this.kinds.P8012M = "Failed to load.<br>To recconect the session, reload this page please.(P8012)";
                    this.kinds.P8013T = "Media Error";
                    this.kinds.P8013M = "Failed to load.<br>To recconect the session, reload this page please.(P8013)";
                    this.kinds.P8014T = "Media Error";
                    this.kinds.P8014M = "Failed to load.<br>To recconect the session, reload this page please.(P8014)";
                    this.kinds.P8015T = "Media Error";
                    this.kinds.P8015M = "Failed to load.<br>To recconect the session, reload this page please.(P8015)";
                    this.kinds.P8016T = "Media Error";
                    this.kinds.P8016M = "Failed to load.<br>To recconect the session, reload this page please.(P8016)";
                    this.kinds.P8017T = "Media Error";
                    this.kinds.P8017M = "Failed to load.<br>To recconect the session, reload this page please.(P8017)";
                    this.kinds.P8018T = "Other Error";
                    this.kinds.P8018M = "Failed to load.<br>To recconect the session, reload this page please.(P8018)";
                    this.kinds.P8019T = "Other Error";
                    this.kinds.P8019M = "Failed to load.<br>To recconect the session, reload this page please.(P8019)";
                    this.kinds.P8020T = "Other Error";
                    this.kinds.P8020M = "Failed to load.<br>To recconect the session, reload this page please.(P8020)";
                    this.kinds.P8021T = "Other Error";
                    this.kinds.P8021M = "Failed to load.<br>To recconect the session, reload this page please.(P8021)";
                    this.kinds.P8022T = "Other Error";
                    this.kinds.P8022M = "Failed to load.<br>To recconect the session, reload this page please.(P8022)";
                    this.kinds.P8000T = "Other Error";
                    this.kinds.P8000M = "Failed to load.<br>To recconect the session, reload this page please.(P8000)";
                }
            };
            LanguageResource.prototype.setUpResource = function (languageResouce) {
                this.kinds.ERROR_LIMIT = (languageResouce["title_P5001"] != null) ? languageResouce["title_P5001"] : this.kinds.ERROR_LIMIT;
                this.kinds.ERROR_LIMIT_MESSAGE = (languageResouce["info_P5001"] != null) ? languageResouce["info_P5001"] : this.kinds.ERROR_LIMIT_MESSAGE;
                this.kinds.ERROR_LIMIT_PRE_TITLE = (languageResouce["title_P5002"] != null) ? languageResouce["title_P5002"] : this.kinds.ERROR_LIMIT_PRE_TITLE;
                this.kinds.ERROR_LIMIT_PRE_MESSAGE = (languageResouce["info_P5002"] != null) ? languageResouce["info_P5002"] : this.kinds.ERROR_LIMIT_PRE_MESSAGE;
                this.kinds.ERROR_LIMIT_OVER_TITLE = (languageResouce["title_P5003"] != null) ? languageResouce["title_P5003"] : this.kinds.ERROR_LIMIT_OVER_TITLE;
                this.kinds.ERROR_LIMIT_OVER_MESSAGE = (languageResouce["info_P5003"] != null) ? languageResouce["info_P5003"] : this.kinds.ERROR_LIMIT_OVER_MESSAGE;
                this.kinds.ERROR_META_DATA_TITLE = (languageResouce["title_P1001"] != null) ? languageResouce["title_P1001"] : this.kinds.ERROR_META_DATA_TITLE;
                this.kinds.ERROR_META_DATA_MESSAGE = (languageResouce["info_P1001"] != null) ? languageResouce["info_P1001"] : this.kinds.ERROR_META_DATA_MESSAGE;
                this.kinds.ERROR_SETTING_TITLE = (languageResouce["title_P0501"] != null) ? languageResouce["title_P0501"] : this.kinds.ERROR_SETTING_TITLE;
                this.kinds.ERROR_SETTING_DELETE = (languageResouce["info_P0501"] != null) ? languageResouce["info_P0501"] : this.kinds.ERROR_SETTING_DELETE;
                this.kinds.ERROR_ENV_TITLE = (languageResouce["title_P5101"] != null) ? languageResouce["title_P5101"] : this.kinds.ERROR_ENV_TITLE;
                this.kinds.ERROR_ENV_MESSAGE = (languageResouce["info_P5101"] != null) ? languageResouce["info_P5101"] : this.kinds.ERROR_ENV_MESSAGE;
                this.kinds.ERROR_CID_ILLEGAL_TITLE = this.kinds.ERROR_CID_ILLEGAL_TITLE;
                this.kinds.ERROR_CID_ILLEGAL_MESSAGE = this.kinds.ERROR_CID_ILLEGAL_MESSAGE;
                this.kinds.SHARE_MOVIE = (languageResouce["title_share_movie"] != null) ? languageResouce["title_share_movie"] : this.kinds.ERROR_LIMIT;
                this.kinds.LINKS = (languageResouce["title_links"] != null) ? languageResouce["title_links"] : this.kinds.LINKS;
                this.kinds.VIRALTAG_TITLE = (languageResouce["viral_tag_title"] != null) ? languageResouce["viral_tag_title"] : this.kinds.VIRALTAG_TITLE;
                this.kinds.VIRALTAG = (languageResouce["title_viral_tag"] != null) ? languageResouce["title_viral_tag"] : this.kinds.VIRALTAG;
                this.kinds.VIRALTAG_BTN = (languageResouce["btn_viral_tag"] != null) ? languageResouce["btn_viral_tag"] : this.kinds.VIRALTAG_BTN;
                this.kinds.AUTH = (languageResouce["title_auth"] != null) ? languageResouce["title_auth"] : this.kinds.AUTH;
                this.kinds.ERROR_AUTH = (languageResouce["title_auth_error"] != null) ? languageResouce["title_auth_error"] : this.kinds.ERROR_AUTH;
                this.kinds.ID = (languageResouce["hint_id"] != null) ? languageResouce["hint_id"] : this.kinds.ID;
                this.kinds.PASS = (languageResouce["hint_pass"] != null) ? languageResouce["hint_pass"] : this.kinds.PASS;
                this.kinds.PLAY = (languageResouce["btn_play"] != null) ? languageResouce["btn_play"] : this.kinds.PLAY;
                this.kinds.Label_Low = (languageResouce["label_Low"] != null) ? languageResouce["label_Low"] : this.kinds.Label_Low;
                this.kinds.Label_Standard = (languageResouce["label_Standard"] != null) ? languageResouce["label_Standard"] : this.kinds.Label_Standard;
                this.kinds.Label_High = (languageResouce["label_High"] != null) ? languageResouce["label_High"] : this.kinds.Label_High;
                this.kinds.Label_HD = (languageResouce["label_HD"] != null) ? languageResouce["label_HD"] : this.kinds.Label_HD;
                this.kinds.Label_FullHD = (languageResouce["label_FullHD"] != null) ? languageResouce["label_FullHD"] : this.kinds.Label_FullHD;
                this.kinds.Label_4K = (languageResouce["label_4K"] != null) ? languageResouce["label_4K"] : this.kinds.Label_4K;
                this.kinds.Label_4K = (languageResouce["label_Auto"] != null) ? languageResouce["label_Auto"] : this.kinds.Label_Auto;
                this.kinds.Replay = (languageResouce["label_replay"] != null) ? languageResouce["label_replay"] : this.kinds.Replay;
                this.kinds.Speed = (languageResouce["label_speed"] != null) ? languageResouce["label_speed"] : this.kinds.Speed;
                this.kinds.Quality = (languageResouce["label_quality"] != null) ? languageResouce["label_quality"] : this.kinds.Quality;
                this.kinds.ERROR_TITLE = (languageResouce["title_P7011"] != null) ? languageResouce["title_P7011"] : this.kinds.ERROR_TITLE;
                this.kinds.ERROR_MOVIE_NOT_FOUND = (languageResouce["info_P7011"] != null) ? languageResouce["info_P7011"] : this.kinds.ERROR_MOVIE_NOT_FOUND;
                this.kinds.ERROR_MOVIE_NOT_FOUND = (languageResouce["info_P7012"] != null) ? languageResouce["info_P7012"] : this.kinds.ERROR_MOVIE_NOT_FOUND_2;
                this.kinds.ERROR_NO_FLASH_TITLE = (languageResouce["title_P0102"] != null) ? languageResouce["title_P0102"] : this.kinds.ERROR_NO_FLASH_TITLE;
                this.kinds.ERROR_NO_FLASH_MESSAGE = (languageResouce["info_P0102"] != null) ? languageResouce["info_P0102"] : this.kinds.ERROR_NO_FLASH_MESSAGE;
                this.kinds.ERROR_NO_FLASH_ANDROID_TITLE = (languageResouce["title_P0103"] != null) ? languageResouce["title_P0103"] : this.kinds.ERROR_NO_FLASH_ANDROID_TITLE;
                this.kinds.ERROR_NO_FLASH_ANDROID_MESSAGE = (languageResouce["info_P0103"] != null) ? languageResouce["info_P0103"] : this.kinds.ERROR_NO_FLASH_ANDROID_MESSAGE;
                this.kinds.ERROR_SERVICE_TITLE = (languageResouce["title_P2001"] != null) ? languageResouce["title_P2001"] : this.kinds.ERROR_SERVICE_TITLE;
                this.kinds.ERROR_SERVICE_DELETE = (languageResouce["info_P2001"] != null) ? languageResouce["info_P2001"] : this.kinds.ERROR_SERVICE_DELETE;
                this.kinds.ERROR_LIVE_RELOAD = (languageResouce["info_P7101"] != null) ? languageResouce["info_P7101"] : this.kinds.ERROR_LIVE_RELOAD;
                this.kinds.P1201T = (languageResouce["title_P1201"] != null) ? languageResouce["title_P1201"] : this.kinds.P1201T;
                this.kinds.P1201M = (languageResouce["info_P1201"] != null) ? languageResouce["info_P1201"] : this.kinds.P1201M;
                this.kinds.P3501T = (languageResouce["title_P3501"] != null) ? languageResouce["title_P3501"] : this.kinds.P3501T;
                this.kinds.P3501M = (languageResouce["info_P3501"] != null) ? languageResouce["info_P3501"] : this.kinds.P3501M;
                this.kinds.P8001T = (languageResouce["title_P8001"] != null) ? languageResouce["title_P8001"] : this.kinds.P8001T;
                this.kinds.P8001M = (languageResouce["info_P8001"] != null) ? languageResouce["info_P8001"] : this.kinds.P8001M;
                this.kinds.P8002T = (languageResouce["title_P8002"] != null) ? languageResouce["title_P8002"] : this.kinds.P8002T;
                this.kinds.P8002M = (languageResouce["info_P8002"] != null) ? languageResouce["info_P8002"] : this.kinds.P8002M;
                this.kinds.P8003T = (languageResouce["title_P8003"] != null) ? languageResouce["title_P8003"] : this.kinds.P8003T;
                this.kinds.P8003M = (languageResouce["info_P8003"] != null) ? languageResouce["info_P8003"] : this.kinds.P8003M;
                this.kinds.P8004T = (languageResouce["title_P8004"] != null) ? languageResouce["title_P8004"] : this.kinds.P8004T;
                this.kinds.P8004M = (languageResouce["info_P8004"] != null) ? languageResouce["info_P8004"] : this.kinds.P8004M;
                this.kinds.P8005T = (languageResouce["title_P8005"] != null) ? languageResouce["title_P8005"] : this.kinds.P8005T;
                this.kinds.P8005M = (languageResouce["info_P8005"] != null) ? languageResouce["info_P8005"] : this.kinds.P8005M;
                this.kinds.P8006T = (languageResouce["title_P8006"] != null) ? languageResouce["title_P8006"] : this.kinds.P8006T;
                this.kinds.P8006M = (languageResouce["info_P8006"] != null) ? languageResouce["info_P8006"] : this.kinds.P8006M;
                this.kinds.P8007T = (languageResouce["title_P8007"] != null) ? languageResouce["title_P8007"] : this.kinds.P8007T;
                this.kinds.P8007M = (languageResouce["info_P8007"] != null) ? languageResouce["info_P8007"] : this.kinds.P8007M;
                this.kinds.P8008T = (languageResouce["title_P8008"] != null) ? languageResouce["title_P8008"] : this.kinds.P8008T;
                this.kinds.P8008M = (languageResouce["info_P8008"] != null) ? languageResouce["info_P8008"] : this.kinds.P8008M;
                this.kinds.P8009T = (languageResouce["title_P8009"] != null) ? languageResouce["title_P8009"] : this.kinds.P8009T;
                this.kinds.P8009M = (languageResouce["info_P8009"] != null) ? languageResouce["info_P8009"] : this.kinds.P8009M;
                this.kinds.P8010T = (languageResouce["title_P8010"] != null) ? languageResouce["title_P8010"] : this.kinds.P8010T;
                this.kinds.P8010M = (languageResouce["info_P8010"] != null) ? languageResouce["info_P8010"] : this.kinds.P8010M;
                this.kinds.P8011T = (languageResouce["title_P8011"] != null) ? languageResouce["title_P8011"] : this.kinds.P8011T;
                this.kinds.P8011M = (languageResouce["info_P8014"] != null) ? languageResouce["info_P8011"] : this.kinds.P8011M;
                this.kinds.P8012T = (languageResouce["title_P8012"] != null) ? languageResouce["title_P8012"] : this.kinds.P8012T;
                this.kinds.P8012M = (languageResouce["info_P8012"] != null) ? languageResouce["info_P8012"] : this.kinds.P8012M;
                this.kinds.P8013T = (languageResouce["title_P8013"] != null) ? languageResouce["title_P8013"] : this.kinds.P8013T;
                this.kinds.P8013M = (languageResouce["info_P8013"] != null) ? languageResouce["info_P8013"] : this.kinds.P8013M;
                this.kinds.P8014T = (languageResouce["title_P8014"] != null) ? languageResouce["title_P8014"] : this.kinds.P8014T;
                this.kinds.P8014M = (languageResouce["info_P8014"] != null) ? languageResouce["info_P8014"] : this.kinds.P8014M;
                this.kinds.P8015T = (languageResouce["title_P8015"] != null) ? languageResouce["title_P8015"] : this.kinds.P8015T;
                this.kinds.P8015M = (languageResouce["info_P8015"] != null) ? languageResouce["info_P8015"] : this.kinds.P8015M;
                this.kinds.P8016T = (languageResouce["title_P8016"] != null) ? languageResouce["title_P8016"] : this.kinds.P8016T;
                this.kinds.P8016M = (languageResouce["info_P8016"] != null) ? languageResouce["info_P8016"] : this.kinds.P8016M;
                this.kinds.P8017T = (languageResouce["title_P8017"] != null) ? languageResouce["title_P8017"] : this.kinds.P8017T;
                this.kinds.P8017M = (languageResouce["info_P8017"] != null) ? languageResouce["info_P8017"] : this.kinds.P8017M;
                this.kinds.P8018T = (languageResouce["title_P8018"] != null) ? languageResouce["title_P8018"] : this.kinds.P8018T;
                this.kinds.P8018M = (languageResouce["info_P8018"] != null) ? languageResouce["info_P8018"] : this.kinds.P8018M;
                this.kinds.P8019T = (languageResouce["title_P8019"] != null) ? languageResouce["title_P8019"] : this.kinds.P8019T;
                this.kinds.P8019M = (languageResouce["info_P8019"] != null) ? languageResouce["info_P8019"] : this.kinds.P8019M;
                this.kinds.P8020T = (languageResouce["title_P8020"] != null) ? languageResouce["title_P8020"] : this.kinds.P8020T;
                this.kinds.P8020M = (languageResouce["info_P8020"] != null) ? languageResouce["info_P8020"] : this.kinds.P8020M;
                this.kinds.P8021T = (languageResouce["title_P8021"] != null) ? languageResouce["title_P8021"] : this.kinds.P8021T;
                this.kinds.P8021M = (languageResouce["info_P8021"] != null) ? languageResouce["info_P8021"] : this.kinds.P8021M;
                this.kinds.P8022T = (languageResouce["title_P8022"] != null) ? languageResouce["title_P8022"] : this.kinds.P8022T;
                this.kinds.P8022M = (languageResouce["info_P8022"] != null) ? languageResouce["info_P8022"] : this.kinds.P8022M;
                this.kinds.P8000T = (languageResouce["title_P8000"] != null) ? languageResouce["title_P8000"] : this.kinds.P8000T;
                this.kinds.P8000M = (languageResouce["info_P8000"] != null) ? languageResouce["info_P8000"] : this.kinds.P8000M;
                return;
            };
            return LanguageResource;
        }());
        resource.LanguageResource = LanguageResource;
    })(resource = jstream_t3.resource || (jstream_t3.resource = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var parser;
    (function (parser) {
        var EmbedTagBuilder = (function () {
            function EmbedTagBuilder() {
            }
            EmbedTagBuilder.create = function (params) {
                var Class;
                if (params.tagType == "player_1_0_0") {
                    if (params.stype == null) {
                        Class = Onetag10;
                    }
                    else {
                        Class = Syn10;
                    }
                }
                else {
                    if (params.stype == null) {
                        Class = Onetag16;
                    }
                    else {
                        Class = Syn16;
                    }
                }
                var result = new Class();
                result.createTag(params);
                return result;
            };
            return EmbedTagBuilder;
        }());
        parser.EmbedTagBuilder = EmbedTagBuilder;
        var TagBase = (function () {
            function TagBase() {
            }
            TagBase.prototype.getTag = function () {
                return this.tag;
            };
            return TagBase;
        }());
        parser.TagBase = TagBase;
        var Onetag10 = (function (_super) {
            __extends(Onetag10, _super);
            function Onetag10() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Onetag10.prototype.createTag = function (params) {
                var list, source, url;
                list = window.location.href.split("/");
                url = "http://" + list[4] + "." + "webcdn.stream.ne.jp/" + list.slice(3).join("/").split("?")[0];
                source = "<script language=\"javascript\">document.write('<iframe frameborder=\"0\" src=\"" + url + "?c=#contract_id&m=#meta_id&s=#setting##start_time##plugins##va_url#&file_id=#file_id&parent_url='+encodeURIComponent(window.location.href) +'&ref=' + encodeURIComponent(document.referrer) + '\" width=\"" + params.width + "\" height=\"" + params.height + "\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden;\" allowtransparency=\"true\"></iframe>');</script>";
                source = source.split("#contract_id").join(jstream_t3.utils.Util.obfuscate(params.contract_id))
                    .split("#meta_id").join(jstream_t3.utils.Util.obfuscate(params.meta_id))
                    .split("#file_id").join(params.file_id);
                var settings = "";
                if (params.s) {
                    if (params.s.ft) {
                        params.s.ft = decodeURIComponent(params.s.ft);
                    }
                    settings = jstream_t3.utils.Util.toJSON(params.s);
                    settings = encodeURIComponent(settings);
                }
                source = source.split("#setting#").join(settings);
                if (params.start_time) {
                    source = source.split("#start_time#").join(", t: " + params.start_time);
                }
                else {
                    source = source.split("#start_time#").join("");
                }
                if (params.plugins) {
                    source = source.split("#plugins#").join(", p: \"" + params.plugins + "\"");
                }
                else {
                    source = source.split("#plugins#").join("");
                }
                if (params.va_url) {
                    source = source.split("#va_url#").join(", v: \"" + params.va_url + "\"");
                }
                else {
                    source = source.split("#va_url#").join("");
                }
                this.tag = source;
            };
            Onetag10.prototype.getTag = function () {
                return this.tag;
            };
            return Onetag10;
        }(TagBase));
        parser.Onetag10 = Onetag10;
        var Onetag16 = (function (_super) {
            __extends(Onetag16, _super);
            function Onetag16() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Onetag16.prototype.createTag = function (params) {
                var source = '<script type="text/javascript" src="https://ssl-cache.stream.ne.jp/#playerDir#t3/#type_exp#.js" charset="UTF-8"></script><script type="text/javascript">jstream_t3.PlayerFactory#type#.create({b: "#playerURI#",c: "#contract_id#",m: "#meta_id#",s: #setting##start_time##plugins##va_url##object#});</script>';
                if (params.isIframe) {
                    source = source.split("#type_exp#").join("if");
                    source = source.split("#type#").join("IF");
                }
                else {
                    source = source.split("#type_exp#").join("obj");
                    source = source.split("#type#").join("OBJ");
                }
                source = source.split("#playerDir#").join(params.base.split("://")[1].split("/").slice(1).join("/"));
                source = source.split("#playerURI#").join(params.base.split("://")[1]);
                source = source.split("#contract_id#").join(jstream_t3.utils.Util.base64encode(params.contract_id));
                source = source.split("#meta_id#").join(jstream_t3.utils.Util.base64encode(params.meta_id));
                var settings = "";
                if (params.s) {
                    if (params.s.ft) {
                        params.s.ft = decodeURIComponent(params.s.ft);
                    }
                    if (params.s.rp == "on" || params.s.rp == "fit") {
                        params.s.rp = "off";
                        params.s.hp = 270;
                        params.s.wp = 480;
                    }
                    settings = jstream_t3.utils.Util.toJSON(params.s);
                }
                source = source.split("#setting#").join(settings);
                if (params.start_time) {
                    source = source.split("#start_time#").join(", t: " + params.start_time);
                }
                else {
                    source = source.split("#start_time#").join("");
                }
                if (params.plugins) {
                    source = source.split("#plugins#").join(", p: \"" + params.plugins + "\"");
                }
                else {
                    source = source.split("#plugins#").join("");
                }
                if (params.va_url) {
                    source = source.split("#va_url#").join(", v: \"" + params.va_url + "\"");
                }
                else {
                    source = source.split("#va_url#").join("");
                }
                var objects = "";
                if (params.o) {
                    objects = jstream_t3.utils.Util.toJSONforCustomVA(params.o);
                    source = source.split("#object#").join(", o: " + objects);
                }
                else {
                    source = source.split("#object#").join("");
                }
                if (params.useInboundLink()) {
                    source += '<br><a href="' + params.inbound_link["url"] + '">' + params.inbound_link["link"] + '</a>';
                }
                this.tag = source;
            };
            return Onetag16;
        }(TagBase));
        parser.Onetag16 = Onetag16;
        var Syn10 = (function (_super) {
            __extends(Syn10, _super);
            function Syn10() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Syn10.prototype.createTag = function (params) {
                this.tag = "";
            };
            return Syn10;
        }(TagBase));
        parser.Syn10 = Syn10;
        var Syn16 = (function (_super) {
            __extends(Syn16, _super);
            function Syn16() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Syn16.prototype.createTag = function (params) {
                this.tag = "";
            };
            return Syn16;
        }(TagBase));
        parser.Syn16 = Syn16;
    })(parser = jstream_t3.parser || (jstream_t3.parser = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var events;
    (function (events) {
        var Event = (function () {
            function Event(type, data) {
                if (type === void 0) { type = null; }
                if (data === void 0) { data = null; }
                this.type = type;
                this.data = data;
            }
            return Event;
        }());
        Event.LOADED = "loaded";
        Event.ERROR = "error";
        events.Event = Event;
    })(events = jstream_t3.events || (jstream_t3.events = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var events;
    (function (events) {
        var ErrorEvent = (function (_super) {
            __extends(ErrorEvent, _super);
            function ErrorEvent(code, message, subject) {
                if (message === void 0) { message = ""; }
                if (subject === void 0) { subject = ""; }
                var _this = _super.call(this, "error") || this;
                _this.code = code;
                _this.message = message;
                _this.subject = subject;
                return _this;
            }
            return ErrorEvent;
        }(events.Event));
        ErrorEvent.METAINFO_LOAD_ERROR = "MetaInfo.LoadError";
        ErrorEvent.SETTINGS_LOAD_ERROR = "PlayerSettings.LoadError";
        ErrorEvent.SERVICE_SETTING_ERROR = "ServiceSettings.LoadError";
        ErrorEvent.VIEWLIMIT_DISABLED = "ViewLimit.Disabled";
        ErrorEvent.SERVER_MEDIA_ERROR = "Server.MediaError";
        ErrorEvent.FLASHPLAYER_VERSION_ERROR = "FlashPlayer.VersionError";
        ErrorEvent.LIVELIMIT_LOAD_ERROR = "LiveLimit.LoadError";
        ErrorEvent.LIDSETTINGS_LOAD_ERROR = "LidSettings.LoadError";
        ErrorEvent.AUTHENTICATION_FAILED = "Authentication.Failed";
        ErrorEvent.OTHER_ERROR = "Other.Error";
        events.ErrorEvent = ErrorEvent;
    })(events = jstream_t3.events || (jstream_t3.events = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var model;
    (function (model) {
        var EQPlayerModel = (function () {
            function EQPlayerModel(params) {
                if (params === void 0) { params = null; }
                this.isLightbox = false;
                this.isMSEnable = true;
                this.isHlsjsSupported = false;
                this.ssl_url = "https://ssl-cache.stream.ne.jp";
                this.time_use = "on";
                this.isLive = false;
                this.auth = "0";
                this.a = "";
                this.auth_mode = "and";
                this.hostCheckResult = "none";
                this.isAuthPassed = false;
                this.api_url = "api01-platform.stream.co.jp";
                this.syndicationapi_url = "syndication-api.stream.co.jp/ec/";
                this.isThumbnail = false;
                this.vc = null;
                this.resumeEnable = "off";
                this.resumeVolumeEnable = "on";
                this.inCookieCurrentTime = "0";
                this.inCookieVolume = "100";
                this.ot = "";
                this.isDebug = false;
                this.connection_limit = -1;
                this.CheckConnectionService = false;
                this.isCheckConnectionPassed = "undefined";
                this.checkconnection_url = "count01-platform.stream.co.jp";
                this.checkconnection_filename = "/index.php";
                this.stat = "";
                this.connectionCheckEndpoint = "";
                this.kollective_flg = "0";
                this.info_dir = "";
                this.loop_use = "off";
                this.isInIframe = false;
                this.device_profile_id = "0";
                this._thumbnailURL = null;
                var prop;
                for (prop in params) {
                    if (prop == "isAuthPassed") {
                        var authPassedParam = jstream_t3.utils.Util.base64decode(params[prop]);
                        var date = new Date();
                        var toDay = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString();
                        var passedKey = "true" + toDay;
                        if (authPassedParam == passedKey) {
                            this[prop] = true;
                        }
                        else {
                            this[prop] = false;
                        }
                    }
                    else {
                        this[prop] = params[prop];
                    }
                }
                try {
                    var ms = new MediaSource();
                }
                catch (e) {
                    this.isMSEnable = false;
                }
            }
            EQPlayerModel.prototype.setEnviroment = function () {
                var ua = navigator.userAgent.toLowerCase(), matches = [], platform = {
                    browser: {
                        name: '',
                        version: '',
                        engine: ''
                    },
                    os: {
                        name: '',
                        version: ''
                    },
                    isIE: false,
                    isEdge: false,
                    isFirefox: false,
                    isSafari: false,
                    isChrome: false,
                    isOpera: false,
                    isSP: false,
                    isTablet: false
                };
                if (ua.match(/msie/) || ua.match(/trident/)) {
                    platform.browser.name = 'Internet Explorer';
                    matches = ua.match(/(msie|rv:?)\s?([\d\.]+)/);
                    if (matches && matches.length > 0 && matches[2]) {
                        platform.browser.version = matches[2];
                    }
                    platform.isIE = true;
                }
                else if (ua.match(/mozilla\/.+windows nt 10\.[0-9].+chrome.+safari.+edge\/[0-9\.]+/i)) {
                    platform.browser.name = 'Edge';
                    matches = ua.match(/mozilla\/.+windows nt 10\.[0-9].+chrome.+safari.+edge\/([0-9\.]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        platform.browser.version = matches[1];
                    }
                    platform.isEdge = true;
                }
                else if (ua.match(/opera|opr/)) {
                    platform.browser.name = 'Opera';
                    if (ua.match(/version\//)) {
                        matches = ua.match(/version\/([\d\.]+)/);
                        if (matches && matches.length > 0 && matches[1]) {
                            platform.browser.version = matches[1];
                        }
                    }
                    else {
                        matches = ua.match(/(opera(\s|\/)|opr\/)([\d\.]+)/);
                        if (matches && matches.length > 0 && matches[3]) {
                            platform.browser.version = matches[3];
                        }
                    }
                    platform.isOpera = true;
                }
                else if (ua.match(/firefox/)) {
                    platform.browser.name = 'Firefox';
                    matches = ua.match(/firefox\/([\d\.]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        platform.browser.version = matches[1];
                    }
                    platform.isFirefox = true;
                }
                else if (ua.match(/chrome/)) {
                    platform.browser.name = 'Chrome';
                    matches = ua.match(/chrome\/([\d\.]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        platform.browser.version = matches[1];
                    }
                    platform.isChrome = true;
                }
                else if (ua.match(/safari/)) {
                    platform.browser.name = 'Safari';
                    matches = ua.match(/version\/([\d\.]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        platform.browser.version = matches[1];
                    }
                    platform.isSafari = true;
                }
                else {
                    platform.browser.name = 'Unknown';
                }
                if (ua.match(/trident/)) {
                    platform.browser.engine = 'Trident';
                }
                else if (ua.match(/blink/)) {
                    platform.browser.engine = 'Blink';
                }
                else if (ua.match(/webkit/)) {
                    platform.browser.engine = 'Webkit';
                }
                else if (ua.match(/khtml/)) {
                    platform.browser.engine = 'KHTML';
                }
                else if (ua.match(/gecko/)) {
                    platform.browser.engine = 'Gecko';
                }
                else if (ua.match(/presto/)) {
                    platform.browser.engine = 'Presto';
                }
                else {
                    platform.browser.engine = 'Unknown';
                }
                if (ua.match(/windows phone/)) {
                    platform.os.name = 'Windows Phone';
                }
                else if (ua.match(/windows/)) {
                    platform.os.name = 'Windows';
                    matches = ua.match(/windows nt ([\d\.]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        if (matches[1].match(/10\.[0-9]/)) {
                            platform.os.version = matches[1];
                        }
                        else if (matches[1] === '6.3') {
                            platform.os.version = '8.1';
                        }
                        else if (matches[1] === '6.2') {
                            platform.os.version = '8.0';
                        }
                        else if (matches[1] === '6.1') {
                            platform.os.version = '7';
                        }
                        else if (matches[1] === '6.1') {
                            platform.os.version = '7';
                        }
                        else if (matches[1] === '6.0') {
                            platform.os.version = 'Vista';
                        }
                        else if (matches[1] === '5.2' || matches[1] === '5.1') {
                            platform.os.version = 'XP';
                        }
                        else if (matches[1] === '5.0') {
                            platform.os.version = '2000';
                        }
                    }
                    matches = ua.match(/windows ([\d]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        if (matches[1] === '98' && ua.match(/9x/)) {
                            platform.os.version = 'Me';
                        }
                        else if (matches[1] === '98') {
                            platform.os.version = '98';
                        }
                        else if (matches[1] === '95') {
                            platform.os.version = '95';
                        }
                        else if (matches[1] === '3.1') {
                            platform.os.version = '3.1';
                        }
                    }
                }
                else if (ua.match(/ios|iphone|ipad|ipod/)) {
                    platform.os.name = 'iOS';
                    matches = ua.match(/((iphone)? os) ([\d_]+)/);
                    if (matches && matches.length > 0 && matches[3]) {
                        platform.os.version = matches[3].replace(/_/g, '.');
                    }
                }
                else if (ua.match(/mac os|mac_powerpc|macintosh/)) {
                    platform.os.name = 'Macintosh';
                }
                else if (ua.match(/android/)) {
                    platform.os.name = 'Android';
                    matches = ua.match(/android ([\d\.]+)/);
                    if (matches && matches.length > 0 && matches[1]) {
                        platform.os.version = matches[1];
                    }
                }
                else if (ua.match(/linux/)) {
                    platform.os.name = 'Linux';
                }
                else if (ua.match(/firefox/) && ua.match(/mobile|tablet/)) {
                    platform.os.name = 'Firefox OS';
                }
                else {
                    platform.os.name = 'Unknown';
                }
                if (ua.match(/iphone/) || ua.match(/ipod/) || (ua.match(/android/) && ua.match(/mobile/)) || ua.match(/windows phone/)) {
                    platform.isSP = true;
                }
                else if (ua.match(/ipad/) || ua.match(/android/) && !ua.match(/mobile/)) {
                    platform.isTablet = true;
                }
                this.platform = platform;
            };
            EQPlayerModel.prototype.getSSLDomain = function () {
                var p = jstream_t3.utils.Util.parse_uri(this.ssl_url);
                return p.authority;
            };
            EQPlayerModel.prototype.useInboundLink = function () {
                return (this.inboundlink_use == "on" && this.inbound_link && this.inbound_link["link"] != null && this.inbound_link["url"] != null);
            };
            EQPlayerModel.prototype.isPDPlayerEnable = function () {
                return this.pd_enable == "1";
            };
            EQPlayerModel.prototype.isAuthEnable = function () {
                if (this.auth == "1" && !this.isAuthPassed) {
                    if (!((this.auth_mode == "or" && this.hostCheckResult == "ok") || (this.auth_mode == "and" && this.hostCheckResult == "ng")))
                        return true;
                }
                return false;
            };
            EQPlayerModel.prototype.isMobilePlayer = function () {
                var env = this.getEnvironmentType();
                return env == jstream_t3.EnviromentKind.MOBILE_STREAMING || env == jstream_t3.EnviromentKind.MOBILE_PROGRESSIVE || env == jstream_t3.EnviromentKind.MOBILE_NATIVE || env == jstream_t3.EnviromentKind.MOBILE_HLSJS;
            };
            EQPlayerModel.prototype.isConnectionEneble = function () {
                return (this.connection_limit > 0 && this.checkconnection_url != "off" && (this.isCheckConnectionPassed == "NG" || this.isCheckConnectionPassed == "undefined"));
            };
            EQPlayerModel.prototype.getConnectionURL = function () {
                return this.checkconnection_url + this.checkconnection_filename;
            };
            EQPlayerModel.prototype.isKollectiveEnable = function () {
                return this.kollective_flg == "1" && this.kontikiAgent.isInstalled() && !(this.platform["isSP"] || this.platform["isTablet"]) && !(this.line == 1 || this.line == 2);
            };
            EQPlayerModel.prototype.createServiceModel = function () {
                return new model.EQPlayerServiceModel(this);
            };
            EQPlayerModel.prototype.clone = function () {
                var result = new EQPlayerModel();
                var prop;
                for (prop in this) {
                    if (typeof this[prop] == "function") {
                        continue;
                    }
                    result[prop] = this[prop];
                }
                return result;
            };
            EQPlayerModel.prototype.onError = function (code, title, message) {
            };
            EQPlayerModel.prototype.parce = function () {
                var lang = "ja";
                if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                    lang = "en";
                }
                var messages = new jstream_t3.resource.LanguageResource(this["language_resource_" + lang]);
                if (this.enable !== "1") {
                    this.onError(jstream_t3.events.ErrorEvent.VIEWLIMIT_DISABLED, messages.kinds.ERROR_LIMIT, messages.kinds.ERROR_LIMIT_MESSAGE);
                    return false;
                }
                if (this.parent_url == null || this.parent_url.indexOf("file") == 0 || this.parent_url.indexOf("http://localhost") == 0) {
                    this.va_use = "off";
                }
                if (typeof this.start_time == "string") {
                    this.start_time = parseInt(this.start_time);
                    if (isNaN(this.start_time)) {
                        this.start_time = 0;
                    }
                }
                if (this.start_time > parseInt(this.duration)) {
                    this.start_time = 0;
                }
                this.thumbnail_url = this.getThumbnailURL();
                this.convertMP4Path();
                jstream_t3.utils.Util.deleteNullItem(this.exlink);
                jstream_t3.utils.Util.deleteNullItem(this.multibitrate_list);
                this.tag_text = this.createTagText();
                this.setFooterAlign();
                if (this.stype != "s1" && this.stype != "s2") {
                    this.setDefaultMovie();
                    if (this.movie_list.length < 1) {
                        var language = null;
                        if (language == null) {
                            var lang = "ja";
                            if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                                lang = "en";
                            }
                            language = new jstream_t3.resource.LanguageResource(this["language_resource_" + lang]);
                        }
                        jstream_t3.view.AlertView.show(language.kinds.ERROR_MOVIE_NOT_FOUND_2, language.kinds.ERROR_TITLE, this.fieldID, this.cssDir);
                        return false;
                    }
                }
                else {
                    this.setDefaultMovieForSyndication();
                }
                if (!this.isAuthPassed) {
                    this.setMovieMobileURL();
                }
                if (this.isAuthPassed) {
                    this.setMovieMobileURL_AfterAuth();
                }
                this.setQualityLabel();
                this.encodeText();
                return true;
            };
            EQPlayerModel.prototype.setFooterAlign = function () {
                switch (this.footer_align) {
                    case "L":
                        this.footer_align = "left";
                        break;
                    case "C":
                        this.footer_align = "center";
                        break;
                    case "R":
                        this.footer_align = "right";
                }
            };
            EQPlayerModel.prototype.getListFormat = function () {
                var result = [];
                for (var prop in this) {
                    if (typeof this[prop] != "function") {
                        var item = {};
                        item[prop] = this[prop];
                        result.push(item);
                    }
                }
                return result;
            };
            EQPlayerModel.prototype.getThumbnailURL = function () {
                if (!this.thumbnail_url) {
                    return "";
                }
                if (this._thumbnailURL == null) {
                    if (this.thumbnail_url.indexOf("http") === -1) {
                        this._thumbnailURL = "../../jmc_thumb/" + this.thumbnail_url;
                    }
                    else if (window.location.protocol === "https:" && this.thumbnail_url.indexOf("https:") != 0) {
                        var list = this.thumbnail_url.split("http").join("https").split("/");
                        list[2] = this.getSSLDomain();
                        this._thumbnailURL = list.join("/");
                    }
                    else {
                        this._thumbnailURL = this.thumbnail_url;
                    }
                }
                return this._thumbnailURL;
            };
            EQPlayerModel.prototype.getEnvironmentType = function () {
                if (this.mode == "flash") {
                    return jstream_t3.EnviromentKind.PC_STREAMING;
                }
                if (this.platform["isTablet"] || this.platform["isSP"]) {
                    if (!document.createElement('video').canPlayType) {
                        if (jstream_t3.utils.Util.isFlash()) {
                            return jstream_t3.EnviromentKind.PC_STREAMING;
                        }
                        else {
                            return jstream_t3.EnviromentKind.NO_FLASH;
                        }
                    }
                    if (this.platform["os"]["name"] == "iOS" && (this.platform["isTablet"] || this.platform["isSP"])) {
                        if (this.isPDPlayerEnable()) {
                            return jstream_t3.EnviromentKind.MOBILE_PROGRESSIVE;
                        }
                        else {
                            return jstream_t3.EnviromentKind.MOBILE_STREAMING;
                        }
                    }
                    else if (this.platform["os"]["name"] == "Android") {
                        if ((this.platform["os"]["name"] == "Android" && (Number(this.platform["os"]["version"].split(".")[0]) >= 4 && (this.platform["isTablet"] || this.platform["isSP"])) || this.platform["isFirefox"])) {
                            if (this.isPDPlayerEnable()) {
                                return jstream_t3.EnviromentKind.MOBILE_PROGRESSIVE;
                            }
                            else {
                                if (this.isMSEnable && this.isHlsjsSupported) {
                                    return jstream_t3.EnviromentKind.MOBILE_HLSJS;
                                }
                                else {
                                    return jstream_t3.EnviromentKind.MOBILE_NATIVE;
                                }
                            }
                        }
                        else {
                            if (jstream_t3.utils.Util.isFlash()) {
                                return jstream_t3.EnviromentKind.PC_STREAMING;
                            }
                            else {
                                return jstream_t3.EnviromentKind.NO_FLASH;
                            }
                        }
                    }
                    else {
                        if (this.isPDPlayerEnable()) {
                            return jstream_t3.EnviromentKind.MOBILE_PROGRESSIVE;
                        }
                        else {
                            return jstream_t3.EnviromentKind.MOBILE_STREAMING;
                        }
                    }
                }
                else {
                    if (!document.createElement('video').canPlayType) {
                        if (jstream_t3.utils.Util.isFlash()) {
                            return jstream_t3.EnviromentKind.PC_STREAMING;
                        }
                        else {
                            return jstream_t3.EnviromentKind.NO_FLASH;
                        }
                    }
                    if (this.isPDPlayerEnable()) {
                        if ((this.platform["isIE"] && Number(this.platform["browser"]["version"]) <= 9) || (this.platform["isSafari"] && this.platform["os"]["name"] == "Macintosh" && Number(this.platform["browser"]["version"].split(".")[0]) <= 8)) {
                            if (jstream_t3.utils.Util.isFlash()) {
                                return jstream_t3.EnviromentKind.PC_STREAMING;
                            }
                            else {
                                return jstream_t3.EnviromentKind.NO_FLASH;
                            }
                        }
                        else {
                            return jstream_t3.EnviromentKind.PC_PROGRESSIVE;
                        }
                    }
                    else {
                        if (this.platform["isIE"] &&
                            ((this.platform["browser"]["version"] == "11.0" && this.platform["os"]["name"] == "Windows" && this.platform["os"]["version"] == "7")
                                || Number(this.platform["browser"]["version"]) <= 10) || (this.platform["isSafari"] && this.platform["os"]["name"] == "Macintosh" && Number(this.platform["browser"]["version"].split(".")[0]) <= 8)) {
                            if (jstream_t3.utils.Util.isFlash()) {
                                return jstream_t3.EnviromentKind.PC_STREAMING;
                            }
                            else {
                                return jstream_t3.EnviromentKind.NO_FLASH;
                            }
                        }
                        else if (this.platform["isSafari"]) {
                            return jstream_t3.EnviromentKind.PC_HTML5HLS;
                        }
                        else if (this.isMSEnable == false || this.isHlsjsSupported == false) {
                            if (jstream_t3.utils.Util.isFlash()) {
                                return jstream_t3.EnviromentKind.PC_STREAMING;
                            }
                            else {
                                return jstream_t3.EnviromentKind.NO_FLASH;
                            }
                        }
                        else {
                            return jstream_t3.EnviromentKind.HLSJS;
                        }
                    }
                }
            };
            EQPlayerModel.prototype.encodeText = function () {
                if (this.isMobilePlayer()) {
                    this.title = jstream_t3.utils.Util.encodeHTMLEncode(this.title);
                }
                this.footer_text = jstream_t3.utils.Util.encodeHTMLEncode(this.footer_text);
            };
            EQPlayerModel.prototype.convertMP4Path = function () {
                var convert, i, _results;
                convert = function (src) {
                    var list;
                    if (src && src.indexOf("mp4:") > -1) {
                        return src;
                    }
                    if (src && src.indexOf("rtmp") > -1 && src.indexOf(".mp4") > -1) {
                        list = src.split("_definst_/");
                        list[1] = "mp4:" + list[1];
                        src = list.join("_definst_/");
                    }
                    return src;
                };
                this.movie_url = convert(this.movie_url);
                if (!this.movie_list) {
                    return;
                }
                i = 0;
                _results = [];
                while (i < this.movie_list.length) {
                    this.movie_list[i].url = convert(this.movie_list[i].url);
                    _results.push(i++);
                }
                return _results;
            };
            EQPlayerModel.prototype.convertPDPath = function () {
                var convert, i, results;
                if (this.movie_url_pd) {
                    this.movie_url = this.movie_url_pd;
                }
                results = [];
                if (this.movie_list_pd) {
                    this.movie_list = this.movie_list_pd;
                }
                return results;
            };
            EQPlayerModel.prototype.createTagText = function () {
                var tagCreator = jstream_t3.parser.EmbedTagBuilder.create(this);
                return tagCreator.getTag();
            };
            EQPlayerModel.prototype.setDefaultMovie = function () {
                var qualityList = ["lq", "sq", "hq", "hd", "fh", "4k"];
                var isMobile = false;
                var movie_list = [];
                var movie_url = "";
                var useQualityList;
                var default_quality;
                var userDir;
                var auto = "";
                this.movie_url = "";
                if (this.movie_list == undefined) {
                    this.movie_list = [];
                }
                if (this.platform["isSP"] || this.platform["isTablet"]) {
                    useQualityList = this.sp;
                    this.default_quality = this.mobile_default_quality;
                    default_quality = this.mobile_default_quality;
                    auto = "auto_sp";
                }
                else {
                    useQualityList = this.pc;
                    default_quality = this.default_quality;
                    auto = "auto_pc";
                }
                if (this.isPDPlayerEnable()) {
                    movie_list = this.movie_list_pd;
                    qualityList.unshift(auto);
                }
                else {
                    movie_list = this.movie_list_hls;
                    useQualityList.unshift(auto);
                    qualityList.unshift(auto);
                }
                userDir = window.location.protocol + "//" + this["b"].split("/").slice(0, -3).join("/") + "/";
                for (var index = 0; index < useQualityList.length; index++) {
                    for (var movie_listIndex = 0; movie_listIndex < movie_list.length; movie_listIndex++) {
                        if (movie_list[movie_listIndex].text == useQualityList[index]) {
                            var movie_data = { "url": "", "text": "" };
                            movie_data.url = userDir + movie_list[movie_listIndex].url;
                            movie_data.text = movie_list[movie_listIndex].text;
                            this.movie_list.push(movie_data);
                        }
                    }
                }
                for (var movie_listIndex = 0; movie_listIndex < this.movie_list.length; movie_listIndex++) {
                    if (this.movie_list[movie_listIndex].text == qualityList[Number(default_quality)]) {
                        this.movie_url = this.movie_list[movie_listIndex].url;
                    }
                }
                if (!this.movie_url) {
                    for (var qualityListIndex = 0; qualityListIndex < qualityList.length; qualityListIndex++) {
                        for (var index = 0; index < this.movie_list.length; index++) {
                            if (qualityList[qualityListIndex] == this.movie_list[index].text) {
                                this.movie_url = this.movie_list[index].url;
                                this.default_quality = qualityListIndex.toString();
                                this.mobile_default_quality = qualityListIndex.toString();
                            }
                        }
                    }
                }
            };
            EQPlayerModel.prototype.setDefaultMovieForSyndication = function () {
                var qualityList = ["自動", "低画質", "標準画質", "高画質", "ＨＤ画質", "フルＨＤ画質", "４Ｋ画質"];
                function getQualityURL(list, key) {
                    if (typeof (list) == "undefined")
                        return null;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].text == key) {
                            return list[i].url;
                        }
                    }
                    return null;
                }
                var qualityKey = qualityList[this.default_quality];
                if (this.movie_list) {
                    var qualityURL = getQualityURL(this.movie_list, qualityKey);
                    if (qualityURL == null) {
                        var i = 1;
                        qualityURL = getQualityURL(this.movie_list, qualityList[2]);
                        while (qualityURL == null && i < 7) {
                            qualityURL = getQualityURL(this.movie_list, qualityList[i]);
                            qualityKey = qualityList[this.default_quality];
                            i++;
                        }
                    }
                    if (qualityURL) {
                        this.movie_url = qualityURL;
                    }
                }
                if (this.movie_list_mobile) {
                    var qualityURL_mobile = getQualityURL(this.movie_list_mobile, qualityList[this.default_quality]);
                    if (qualityURL_mobile == null) {
                        var i = 1;
                        qualityURL_mobile = getQualityURL(this.movie_list_mobile, qualityList[2]);
                        while (qualityURL_mobile == null && i < 7) {
                            qualityURL_mobile = getQualityURL(this.movie_list_mobile, qualityList[i]);
                            qualityKey = qualityList[this.default_quality];
                            i++;
                        }
                    }
                    if (qualityURL_mobile) {
                        this.movie_url_mobile = qualityURL_mobile;
                    }
                }
                if (this.movie_list_pd) {
                    if (this.movie_url_pd != null) {
                        var qualityURL_pd = getQualityURL(this.movie_list_pd, qualityList[this.default_quality]);
                        if (!qualityURL_pd) {
                            var i = 1;
                            qualityURL_pd = getQualityURL(this.movie_list_pd, qualityList[2]);
                            while (qualityURL_pd == null && i < 7) {
                                qualityURL_pd = getQualityURL(this.movie_list_pd, qualityList[i]);
                                qualityKey = qualityList[this.default_quality];
                                i++;
                            }
                        }
                        if (qualityURL_pd) {
                            this.movie_url_pd = qualityURL_pd;
                        }
                    }
                }
                if (this.isPDPlayerEnable()) {
                    this.movie_url = this.movie_url_pd;
                    this.movie_list = this.movie_list_pd;
                }
                else {
                    this.movie_url = this.movie_url_mobile;
                    this.movie_list = this.movie_list_mobile;
                }
            };
            EQPlayerModel.prototype.setQualityLabel = function () {
                var changeQualityLabel = function (item) {
                    switch (item.text) {
                        case "4k":
                        case "４Ｋ画質":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "４Ｋ";
                            }
                            else {
                                item.text = "4K";
                            }
                            break;
                        case "fh":
                        case "フルＨＤ":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "フルＨＤ";
                            }
                            else {
                                item.text = "FullHD";
                            }
                            break;
                        case "hd":
                        case "ＨＤ画質":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "ＨＤ画質";
                            }
                            else {
                                item.text = "HD";
                            }
                            break;
                        case "hq":
                        case "高画質":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "高画質";
                            }
                            else {
                                item.text = "High";
                            }
                            break;
                        case "sq":
                        case "標準画質":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "標準画質";
                            }
                            else {
                                item.text = "Standard";
                            }
                            break;
                        case "lq":
                        case "低画質":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "低画質";
                            }
                            else {
                                item.text = "Low";
                            }
                            break;
                        case "auto_pc":
                        case "auto_sp":
                        case "自動":
                            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                                item.text = "自動";
                            }
                            else {
                                item.text = "AUTO";
                            }
                            break;
                    }
                };
                var i = 0;
                var movie_list = this.movie_list;
                for (i = 0; i < movie_list.length; i++) {
                    changeQualityLabel(movie_list[i]);
                }
            };
            EQPlayerModel.prototype.changeMovieMobileURL = function (item, api, cid, mid, tk, dq) {
                var url = item;
                var quality;
                if (dq == "自動" || dq == "AUTO" || dq == "auto_pc" || dq == "auto_sp" || dq == "0") {
                    quality = "0";
                }
                else {
                    quality = item.split("/").pop().split("_").pop().split(".", 1);
                }
                if (item.split("/")[4])
                    url = "http://" + api.split("/").slice(0, 2).join("/") + "/getPlayList/" + cid + "/" + mid + "/" + quality + "/" + tk + ".m3u8";
                return url;
            };
            EQPlayerModel.prototype.setMovieMobileURL = function () {
                var enviroment = this.getEnvironmentType();
                if ((enviroment != jstream_t3.EnviromentKind.MOBILE_STREAMING && enviroment != jstream_t3.EnviromentKind.MOBILE_NATIVE && enviroment != jstream_t3.EnviromentKind.HLSJS && enviroment != jstream_t3.EnviromentKind.MOBILE_HLSJS && this.isPDPlayerEnable())
                    || !this.tk
                    || (this.tk && this.viewlimit_flg != "1")
                    || this.tk == "_NG_"
                    || (this.tk && this.auth_mode == "and" && this.auth == "1")) {
                    this.changeMovieMobileURLforM3U8();
                    return;
                }
                if ((this.movie_list == undefined || this.movie_list == null || this.movie_list.length == undefined || this.movie_list.length < 1)) {
                    return;
                }
                var cid = this.contract_id || this.maker_id;
                this.movie_url = this.changeMovieMobileURL(this.movie_url, jstream_t3.utils.Util.getAPIServerURL(this.api_url), cid, this.meta_id, this.tk, this.default_quality);
                for (var i = 0; i < this.movie_list.length; i++) {
                    this.movie_list[i].url = this.changeMovieMobileURL(this.movie_list[i].url, jstream_t3.utils.Util.getAPIServerURL(this.api_url), cid, this.meta_id, this.tk, this.movie_list[i].text);
                }
                this.changeMovieMobileURLforM3U8();
            };
            EQPlayerModel.prototype.setMovieMobileURL_AfterAuth = function () {
                var enviroment = this.getEnvironmentType();
                if ((enviroment != jstream_t3.EnviromentKind.MOBILE_STREAMING && enviroment != jstream_t3.EnviromentKind.MOBILE_NATIVE && enviroment != jstream_t3.EnviromentKind.HLSJS && enviroment != jstream_t3.EnviromentKind.MOBILE_HLSJS && this.isPDPlayerEnable())
                    || !this.tk) {
                    return;
                }
                var cid = this.contract_id || this.maker_id;
                this.movie_url = this.changeMovieMobileURL(this.movie_url, jstream_t3.utils.Util.getAPIServerURL(this.api_url), cid, this.meta_id, this.tk, this.default_quality);
                for (var i = 0; i < this.movie_list.length; i++) {
                    this.movie_list[i].url = this.changeMovieMobileURL(this.movie_list[i].url, jstream_t3.utils.Util.getAPIServerURL(this.api_url), cid, this.meta_id, this.tk, this.movie_list[i].text);
                }
                this.changeMovieMobileURLforM3U8();
            };
            EQPlayerModel.prototype.changeMovieMobileURLforM3U8 = function () {
                if (window.location.protocol === "https:") {
                    var env = this.getEnvironmentType();
                    if (env == jstream_t3.EnviromentKind.MOBILE_STREAMING || env == jstream_t3.EnviromentKind.HLSJS || env == jstream_t3.EnviromentKind.PC_HTML5HLS || env == jstream_t3.EnviromentKind.MOBILE_NATIVE || env == jstream_t3.EnviromentKind.MOBILE_HLSJS) {
                        for (var i = 0; i < this.movie_list.length; i++) {
                            this.movie_list[i].url = this.replaceToSSL(this.movie_list[i].url);
                        }
                        this.movie_url = this.replaceToSSL(this.movie_url);
                    }
                    else if (env == jstream_t3.EnviromentKind.PC_PROGRESSIVE || env == jstream_t3.EnviromentKind.MOBILE_PROGRESSIVE) {
                        for (var i = 0; i < this.movie_list.length; i++) {
                            this.movie_list[i].url = this.replaceToSSL(this.movie_list[i].url);
                        }
                        this.movie_url = this.replaceToSSL(this.movie_url);
                    }
                }
            };
            EQPlayerModel.prototype.replaceToSSL = function (url) {
                var replacedUrl;
                var reg = /^http:/;
                replacedUrl = url.replace(reg, "https:");
                return replacedUrl;
            };
            EQPlayerModel.prototype.replaceToHttp = function (url) {
                var replacedUrl;
                var reg = /^https:/;
                replacedUrl = url.replace(reg, "http:");
                return replacedUrl;
            };
            EQPlayerModel.prototype.isFooder = function () {
                return this.footer_use === "on" && (this.footer_text != null) && this.footer_text !== "";
            };
            EQPlayerModel.prototype.isVa = function () {
                if (this.tagType == "player_1_0_0" && this.isMobilePlayer()) {
                    return false;
                }
                return (this.va_use == "on" && (window.location.protocol.indexOf("file") != 0));
            };
            EQPlayerModel.prototype.createVarsParam = function () {
                return jstream_t3.utils.Util.escapeObject(this);
            };
            EQPlayerModel.prototype.setTagSize = function (fieldID) {
                var movieWidth = this.movie_width || 150;
                var movieHeight = this.movie_height || 136;
                var divTagID = fieldID;
                var divTag = document.getElementById(divTagID);
                var divTagMaxWidth;
                var divTagMaxHeight;
                var divTagWidth = divTag.clientWidth;
                var divTagHeight = divTag.clientHeight;
                var setW = this.width;
                var setH = this.height;
                var ftHeight = (this.footer_use === 'on') ? 20 : 0;
                if (setW == "eq-auto" || setH == "eq-auto") {
                    if (divTagWidth <= 0 || divTagWidth == null) {
                        divTagMaxWidth = Number(movieWidth);
                        divTagMaxHeight = Number(movieHeight) + ftHeight;
                    }
                    else if (divTagHeight <= 24 || divTagHeight == null) {
                        divTagMaxWidth = Number(divTagWidth);
                        divTagMaxHeight = Math.ceil((movieHeight / movieWidth) * divTagWidth) + ftHeight;
                    }
                    else {
                        divTagMaxWidth = Number(divTagWidth);
                        divTagMaxHeight = Number(divTagHeight);
                    }
                }
                else if (!isNaN(parseInt(setW)) && !isNaN(parseInt(setH))) {
                    setW = parseInt(setW);
                    setH = parseInt(setH);
                    if (setW > divTagWidth && divTagWidth > 150) {
                        divTagMaxWidth = Number(divTagWidth);
                        divTagMaxHeight = Math.ceil((movieHeight / movieWidth) * divTagWidth) + ftHeight;
                    }
                    else {
                        divTagMaxWidth = Number(setW);
                        divTagMaxHeight = Number(setH);
                    }
                }
                else {
                    divTagMaxWidth = Number(movieWidth);
                    divTagMaxHeight = Number(movieHeight) + ftHeight;
                }
                this.width = divTagMaxWidth;
                this.height = divTagMaxHeight;
            };
            EQPlayerModel.prototype.destroy = function () {
                for (var prop in this) {
                    this[prop] = null;
                }
            };
            return EQPlayerModel;
        }());
        model.EQPlayerModel = EQPlayerModel;
    })(model = jstream_t3.model || (jstream_t3.model = {}));
})(jstream_t3 || (jstream_t3 = {}));
(function (jstream_t3) {
    var EnviromentKind = (function () {
        function EnviromentKind() {
        }
        return EnviromentKind;
    }());
    EnviromentKind.HLSJS = "HlsJS";
    EnviromentKind.PC_STREAMING = "pcStreaming";
    EnviromentKind.MOBILE_STREAMING = "mobileStreaming";
    EnviromentKind.MOBILE_PROGRESSIVE = "mobileProgressive";
    EnviromentKind.MOBILE_HLSJS = "mobile_hlsjs";
    EnviromentKind.MOBILE_NATIVE = "mobileNative";
    EnviromentKind.PC_HTML5HLS = "pcHls";
    EnviromentKind.PC_PROGRESSIVE = "pcProgressive";
    EnviromentKind.NO_FLASH = "noFlash";
    jstream_t3.EnviromentKind = EnviromentKind;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var jstream_player_version = "player_2_3_0";
    var version = (function () {
        function version() {
        }
        version.getVersion = function () {
            return "player_2_3_0";
        };
        version.getAsemVersion = function () {
            return "2.3.2r2017072801";
        };
        return version;
    }());
    jstream_t3.version = version;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var model;
    (function (model) {
        var EQPlayerLiveModel = (function (_super) {
            __extends(EQPlayerLiveModel, _super);
            function EQPlayerLiveModel(params) {
                if (params === void 0) { params = null; }
                var _this = _super.call(this, params) || this;
                _this.isLive = true;
                _this.interval = 0;
                _this.MaxRetryLid = 0;
                _this._liveLidURL = null;
                return _this;
            }
            EQPlayerLiveModel.prototype.parseLive = function () {
                this.seak_use = "off";
                this.time_use = "off";
                this.title_use = "off";
                this.va_use = "off";
                this.tag_use = "off";
                this.init_play = "on";
                this.playbackRate = "";
                if (this.start_time) {
                    this.start_time = 0;
                }
                this.setFooterAlign();
                this.setDefaultQuality();
                this.setLiveList();
                this.setLiveHTML5List();
                this.setLiveHLSUrl();
                this.setLiveKollectiveHLSUrl();
                this.setLiveNestedKollectiveHLSUrl();
                this.setLivePreviewList();
                return true;
            };
            EQPlayerLiveModel.prototype.createLiveServiceModel = function () {
                return new model.EQPlayerLiveServiceModel(this);
            };
            EQPlayerLiveModel.prototype.getPlayerVersion = function () {
                return jstream_t3.version.getVersion();
                ;
            };
            EQPlayerLiveModel.prototype.setDefaultQuality = function () {
                var def_quality;
                if (this.default_quality != null && (parseInt(this.default_quality) > 0 && parseInt(this.default_quality) <= 3)) {
                    def_quality = this.default_quality;
                }
                else {
                    def_quality = '2';
                }
                var len = this.getPropertyNum(this.quality);
                for (var i = def_quality; i > 0; i--) {
                    if (this.quality.hasOwnProperty(i)) {
                        this.default_quality = i;
                        return;
                    }
                }
                for (var i = def_quality; i < 4; i++) {
                    if (this.quality.hasOwnProperty(i)) {
                        this.default_quality = i;
                        return;
                    }
                }
            };
            EQPlayerLiveModel.prototype.setLiveList = function () {
                var i, prop;
                var liveListAll = [];
                var codec = "hds";
                var qualityLen = this.getPropertyNum(this.quality);
                var streamIndex = 0;
                if (this.list[codec]) {
                    while (streamIndex < 2) {
                        var liveList = [];
                        i = 1;
                        for (prop in this.quality) {
                            var liveURLSetting = {};
                            liveURLSetting = {
                                "quality": prop,
                                "url": this.list[codec][prop][streamIndex],
                                "text": this.quality[prop].ja,
                                "text_en": this.quality[prop].en
                            };
                            liveList[qualityLen - i] = liveURLSetting;
                            i++;
                        }
                        liveListAll[streamIndex] = liveList;
                        streamIndex++;
                    }
                    this.movie_list = liveListAll;
                }
            };
            EQPlayerLiveModel.prototype.setLiveHTML5List = function () {
                if (this.getEnvironmentType() != jstream_t3.EnviromentKind.PC_STREAMING && this.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_STREAMING && this.getEnvironmentType() != jstream_t3.EnviromentKind.PC_HTML5HLS && this.getEnvironmentType() != jstream_t3.EnviromentKind.HLSJS && this.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_HLSJS) {
                    return;
                }
                var i, prop;
                var codec = "nested_hls";
                var qualityLen = this.getPropertyNum(this.quality);
                this.movie_url_mobile = this.list[codec][this.default_quality][0];
                if (window.location.protocol === "https:") {
                    this.movie_url_mobile = _super.prototype.replaceToSSL.call(this, this.movie_url_mobile);
                }
                var movieListMobileAll = [];
                i = 1;
                for (prop in this.quality) {
                    var liveMobileURLSetting = {};
                    var url = this.list[codec][prop][0];
                    if (window.location.protocol === "https:") {
                        url = _super.prototype.replaceToSSL.call(this, url);
                    }
                    liveMobileURLSetting = {
                        "url": url,
                        "text": this.quality[prop].ja
                    };
                    movieListMobileAll[qualityLen - i] = liveMobileURLSetting;
                    i++;
                }
                this.movie_list_mobile = movieListMobileAll;
            };
            EQPlayerLiveModel.prototype.setLiveHLSUrl = function () {
                if (this.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_NATIVE) {
                    return;
                }
                var codec = "hls";
                var streamIndex = 0;
                if (this.list[codec][this.default_quality].length > 1) {
                    var streamNum = this.list[codec][this.default_quality].length;
                    var round = Math.floor(Math.random() * 100) % streamNum;
                    this.movie_url_mobile = this.list[codec][this.default_quality][round];
                }
                else {
                    this.movie_url_mobile = this.list[codec][this.default_quality][streamIndex];
                }
                if (window.location.protocol === "https:") {
                    this.movie_url_mobile = _super.prototype.replaceToSSL.call(this, this.movie_url_mobile);
                }
            };
            EQPlayerLiveModel.prototype.setLiveKollectiveHLSUrl = function () {
                if (this.kollective_flg != "1" || this.getEnvironmentType() != jstream_t3.EnviromentKind.PC_STREAMING && this.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_STREAMING && this.getEnvironmentType() != jstream_t3.EnviromentKind.PC_HTML5HLS && this.getEnvironmentType() != jstream_t3.EnviromentKind.HLSJS && this.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_HLSJS) {
                    return;
                }
                var codec = "nested_kollective_hls";
                var i, prop;
                var qualityLen = this.getPropertyNum(this.quality);
                this.kollective_url = this.list[codec][this.default_quality][0];
                if (window.location.protocol === "https:") {
                    this.kollective_url = _super.prototype.replaceToSSL.call(this, this.kollective_url);
                }
                var movieListMobileAll = [];
                i = 1;
                for (prop in this.quality) {
                    var liveMobileURLSetting = {};
                    var url = this.list[codec][prop][0];
                    if (window.location.protocol === "https:") {
                        url = _super.prototype.replaceToSSL.call(this, url);
                    }
                    liveMobileURLSetting = {
                        "url": url,
                        "text": this.quality[prop].ja
                    };
                    movieListMobileAll[qualityLen - i] = liveMobileURLSetting;
                    i++;
                }
                this.kollective_list = movieListMobileAll;
            };
            EQPlayerLiveModel.prototype.setLiveNestedKollectiveHLSUrl = function () {
                if (this.kollective_flg != "1" || this.getEnvironmentType() != jstream_t3.EnviromentKind.MOBILE_NATIVE) {
                    return;
                }
                var codec = "setLiveNestedKollectiveHLSUrl";
                var streamIndex = 0;
                if (this.list[codec][this.default_quality].length > 1) {
                    var streamNum = this.list[codec][this.default_quality].length;
                    var round = Math.floor(Math.random() * 100) % streamNum;
                    this.kollective_url = this.list[codec][this.default_quality][round];
                }
                else {
                    this.kollective_url = this.list[codec][this.default_quality][streamIndex];
                }
                if (window.location.protocol === "https:") {
                    this.kollective_url = _super.prototype.replaceToSSL.call(this, this.movie_url_mobile);
                }
            };
            EQPlayerLiveModel.prototype.getLiveLidURL = function () {
                if (!this.img) {
                    return "";
                }
                if (this.img.indexOf("http") === -1) {
                    this._liveLidURL = "../../jmc_thumb/" + this.img;
                }
                else if (window.location.protocol === "https:" && this.img.indexOf("https:") != 0) {
                    var list = this.img.split("http").join("https").split("/");
                    list[2] = this.getSSLDomain();
                    this._liveLidURL = list.join("/");
                }
                else {
                    this._liveLidURL = this.img;
                }
                return this._liveLidURL;
            };
            EQPlayerLiveModel.prototype.setLivePreviewList = function () {
                if (this.line !== 1 && this.line !== 2) {
                    return;
                }
                var i, prop, streamIndex, previewStreamIndex, codec, url;
                var liveListAll = [];
                var qualityLen = this.getPropertyNum(this.quality);
                if (this.line === 1) {
                    previewStreamIndex = 0;
                }
                else if (this.line === 2) {
                    previewStreamIndex = 1;
                }
                if (this.getEnvironmentType() == jstream_t3.EnviromentKind.PC_STREAMING || this.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_STREAMING || this.getEnvironmentType() == jstream_t3.EnviromentKind.PC_HTML5HLS || this.getEnvironmentType() == jstream_t3.EnviromentKind.HLSJS || this.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_HLSJS) {
                    codec = "hls";
                    streamIndex = 0;
                    while (streamIndex < 2) {
                        var liveList = [];
                        i = 1;
                        for (prop in this.quality) {
                            url = this.list[codec][prop][previewStreamIndex];
                            if (window.location.protocol === "https:") {
                                url = _super.prototype.replaceToSSL.call(this, url);
                            }
                            var liveURLSetting = {};
                            liveURLSetting = {
                                "quality": prop,
                                "url": url,
                                "text": this.quality[prop].ja,
                                "text_en": this.quality[prop].en
                            };
                            liveList[qualityLen - i] = liveURLSetting;
                            i++;
                        }
                        liveListAll[streamIndex] = liveList;
                        streamIndex++;
                    }
                    this.movie_url_mobile = this.list[codec][this.default_quality][previewStreamIndex];
                    if (window.location.protocol === "https:") {
                        this.movie_url_mobile = _super.prototype.replaceToSSL.call(this, this.movie_url_mobile);
                    }
                    this.movie_list_mobile = liveListAll[previewStreamIndex];
                    return;
                }
                codec = "hds";
                streamIndex = 0;
                while (streamIndex < 2) {
                    var liveList = [];
                    i = 1;
                    for (prop in this.quality) {
                        var liveURLSetting = {};
                        liveURLSetting = {
                            "quality": prop,
                            "url": this.list[codec][prop][previewStreamIndex],
                            "text": this.quality[prop].ja,
                            "text_en": this.quality[prop].en
                        };
                        liveList[qualityLen - i] = liveURLSetting;
                        i++;
                    }
                    liveListAll[streamIndex] = liveList;
                    streamIndex++;
                }
                this.movie_list = liveListAll;
            };
            EQPlayerLiveModel.prototype.getPropertyNum = function (obj) {
                var len = 0;
                for (var key in obj) {
                    ++len;
                }
                return len;
            };
            EQPlayerLiveModel.prototype.getPreviewMode = function () {
                if (this.line !== 1 && this.line !== 2) {
                    return false;
                }
                else {
                    return true;
                }
            };
            return EQPlayerLiveModel;
        }(model.EQPlayerModel));
        model.EQPlayerLiveModel = EQPlayerLiveModel;
    })(model = jstream_t3.model || (jstream_t3.model = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var model;
    (function (model) {
        var EQPlayerServiceModel = (function (_super) {
            __extends(EQPlayerServiceModel, _super);
            function EQPlayerServiceModel(value) {
                var _this = _super.call(this) || this;
                value = value || {};
                _this.stype = value.stype || "";
                _this.playerDir = value.playerDir || "";
                _this.contract_id = value.contract_id || "";
                _this.player_id = value.player_id || "";
                _this.meta_id = value.meta_id || "";
                _this.partner_id = value.partner_id || "";
                _this.maker_id = value.maker_id || "";
                _this.product_id = value.product_id || "";
                _this.type = value.type || "";
                _this.viewlimit_flg = value.viewlimit_flg || "";
                _this.viewlimit_url = value.viewlimit_url || "";
                if (value.isIframe) {
                    _this.domain = value.domain || value.parent_url;
                }
                else {
                    _this.domain = location.href;
                }
                _this.auth = value.auth || "";
                _this.a = value.a || "";
                _this.auth_mode = value.auth_mode || "and";
                _this.resultObject = value;
                _this.opid = value.optionId || "";
                return _this;
            }
            return EQPlayerServiceModel;
        }(model.NetServiceModel));
        model.EQPlayerServiceModel = EQPlayerServiceModel;
        var EQPlayerLiveServiceModel = (function (_super) {
            __extends(EQPlayerLiveServiceModel, _super);
            function EQPlayerLiveServiceModel(value) {
                var _this = _super.call(this) || this;
                value = value || {};
                _this.playerDir = value.playerDir || "";
                _this.contract_id = value.contract_id || "";
                _this.player_id = value.player_id || "";
                _this.type = value.type || "";
                _this.viewlimit_flg = value.viewlimit_flg || "";
                _this.viewlimit_url = value.viewlimit_url || "";
                if (value.isIframe) {
                    _this.domain = value.domain || value.parent_url;
                }
                else {
                    _this.domain = location.href;
                }
                _this.lpid = value.lpid || "";
                _this.isLive = value.isLive || false;
                _this.resultObject = value;
                return _this;
            }
            return EQPlayerLiveServiceModel;
        }(model.NetServiceModel));
        model.EQPlayerLiveServiceModel = EQPlayerLiveServiceModel;
    })(model = jstream_t3.model || (jstream_t3.model = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3_1) {
    var PlayerManger = (function () {
        function PlayerManger() {
        }
        PlayerManger.addPlayerAPI = function (player) {
            var jstream_t3 = window["jstream_t3"];
            var players = jstream_t3.PlayerManger_players;
            if (jstream_t3.PlayerManger_players == null) {
                jstream_t3.PlayerManger_players = {};
            }
            jstream_t3.PlayerManger_players[player.objectID] = player;
        };
        PlayerManger.removePlayerAPI = function (objectID) {
            var api = PlayerManger.getPlayer(objectID);
            if (api) {
                PlayerManger.getPlayer(objectID).destroy();
                delete window["jstream_t3"].PlayerManger_players[objectID];
            }
        };
        PlayerManger.getPlayer = function (objectID) {
            var jstream_t3 = window["jstream_t3"];
            var players = jstream_t3.PlayerManger_players;
            if (jstream_t3.PlayerManger_players == null) {
                jstream_t3.PlayerManger_players = {};
            }
            return jstream_t3.PlayerManger_players[objectID];
        };
        PlayerManger.getFlashVars = function (objectID) {
            return PlayerManger.getPlayer(objectID).eqPlayer.getFlashVars().createVarsParam();
        };
        PlayerManger.getFlashVarsLength = function (objectID) {
            return PlayerManger.getPlayer(objectID).eqPlayer.getFlashVarsLength();
        };
        PlayerManger.getFlashVarsAt = function (objectID, index) {
            return PlayerManger.getPlayer(objectID).eqPlayer.getFlashVarsAt(index);
        };
        PlayerManger.dispatchEvent = function (objectID, type) {
            PlayerManger.getPlayer(objectID).dispatchEvent(type);
        };
        PlayerManger.setState = function (objectID, state) {
            PlayerManger.getPlayer(objectID).setState(state);
        };
        PlayerManger.sendClickBeacon = function (objectID, state) {
            PlayerManger.getPlayer(objectID).sendClickBeacon(state);
        };
        return PlayerManger;
    }());
    jstream_t3_1.PlayerManger = PlayerManger;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var events;
    (function (events) {
        var EventDispatcher = (function () {
            function EventDispatcher() {
                this.listeners = {};
            }
            EventDispatcher.prototype.dispatchEvent = function (event) {
                var e;
                var type;
                if (event instanceof events.Event) {
                    type = event.type;
                    e = event;
                }
                else {
                    type = event;
                    e = new events.Event(type);
                }
                if (this.listeners[type] != null) {
                    e.currentTarget = this;
                    for (var i = 0; i < this.listeners[type].length; i++) {
                        var listener = this.listeners[type][i];
                        try {
                            listener.handler(e);
                        }
                        catch (error) {
                            if (window.console) {
                                console.error(error.stack);
                            }
                        }
                    }
                }
            };
            EventDispatcher.prototype.dispatchCustomEvent = function (event) {
                var e;
                var type;
                if (event instanceof CustomEvent) {
                    type = event.type;
                    e = event;
                }
                if (this.listeners[type] != null) {
                    for (var i = 0; i < this.listeners[type].length; i++) {
                        var listener = this.listeners[type][i];
                        try {
                            listener.handler(e);
                        }
                        catch (error) {
                            if (window.console) {
                                console.error(error.stack);
                            }
                        }
                    }
                }
            };
            EventDispatcher.prototype.addEventListener = function (type, callback, priolity) {
                if (priolity === void 0) { priolity = 0; }
                if (this.listeners[type] == null) {
                    this.listeners[type] = [];
                }
                this.listeners[type].push(new EventListener(type, callback, priolity));
                this.listeners[type].sort(function (listerner1, listener2) {
                    return listener2.priolity - listerner1.priolity;
                });
            };
            EventDispatcher.prototype.removeEventListener = function (type, callback) {
                if (this.hasEventListener(type, callback)) {
                    for (var i = 0; i < this.listeners[type].length; i++) {
                        var listener = this.listeners[type][i];
                        if (listener.equalCurrentListener(type, callback)) {
                            listener.handler = null;
                            this.listeners[type].splice(i, 1);
                            return;
                        }
                    }
                }
            };
            EventDispatcher.prototype.clearEventListener = function () {
                this.listeners = {};
            };
            EventDispatcher.prototype.containEventListener = function (type) {
                if (this.listeners[type] == null)
                    return false;
                return this.listeners[type].length > 0;
            };
            EventDispatcher.prototype.hasEventListener = function (type, callback) {
                if (this.listeners[type] == null)
                    return false;
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    if (listener.equalCurrentListener(type, callback)) {
                        return true;
                    }
                }
                return false;
            };
            return EventDispatcher;
        }());
        events.EventDispatcher = EventDispatcher;
        var EventListener = (function () {
            function EventListener(type, handler, priolity) {
                if (type === void 0) { type = null; }
                if (handler === void 0) { handler = null; }
                if (priolity === void 0) { priolity = 0; }
                this.type = type;
                this.handler = handler;
                this.priolity = priolity;
            }
            EventListener.prototype.equalCurrentListener = function (type, handler) {
                if (this.type == type && this.handler == handler) {
                    return true;
                }
                return false;
            };
            return EventListener;
        }());
    })(events = jstream_t3.events || (jstream_t3.events = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var utils;
    (function (utils) {
        var Timer = (function (_super) {
            __extends(Timer, _super);
            function Timer(interval, repeateCount) {
                if (repeateCount === void 0) { repeateCount = 0; }
                var _this = _super.call(this) || this;
                _this.interval = interval;
                _this.repeateCount = repeateCount;
                _this.running = false;
                return _this;
            }
            Timer.prototype.start = function () {
                var _this = this;
                this.running = true;
                this.currentCount = 0;
                this.intervalID = setInterval(function () {
                    if (_this.repeateCount > 0 && _this.currentCount > _this.repeateCount) {
                        _this.dispatchEvent(Timer.TIMER_COMPLETE);
                        _this.stop();
                        return;
                    }
                    _this.dispatchEvent(Timer.TIMER);
                    _this.currentCount++;
                }, this.interval);
            };
            Timer.prototype.stop = function () {
                clearInterval(this.intervalID);
                this.running = false;
            };
            Timer.prototype.reset = function () {
                this.stop();
                this.currentCount = 0;
            };
            return Timer;
        }(jstream_t3.events.EventDispatcher));
        Timer.TIMER = "time";
        Timer.TIMER_COMPLETE = "timeComplete";
        utils.Timer = Timer;
    })(utils = jstream_t3.utils || (jstream_t3.utils = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var utils;
    (function (utils) {
        var HashChecker = (function (_super) {
            __extends(HashChecker, _super);
            function HashChecker(checkInterval) {
                if (checkInterval === void 0) { checkInterval = 300; }
                var _this = _super.call(this) || this;
                _this.timer = new utils.Timer(checkInterval);
                _this.timer.addEventListener("time", function () { _this.checkHash(); });
                _this.checkHash();
                return _this;
            }
            HashChecker.prototype.checkHash = function () {
                var hash = window.location.hash.slice(1);
                if (this.currentHash != hash) {
                    this.currentHash = hash;
                    this.dispatchEvent("chenge");
                }
            };
            HashChecker.prototype.start = function () {
                this.timer.start();
            };
            HashChecker.prototype.stop = function () {
                this.timer.stop();
            };
            return HashChecker;
        }(jstream_t3.events.EventDispatcher));
        utils.HashChecker = HashChecker;
    })(utils = jstream_t3.utils || (jstream_t3.utils = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var geom;
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.racio = function () {
                return this.y / this.x;
            };
            return Point;
        }());
        geom.Point = Point;
    })(geom = jstream_t3.geom || (jstream_t3.geom = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var geom;
    (function (geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            Rectangle.prototype.fexedZoom = function (width, height) {
                var xScale = width / this.width;
                var yScale = height / this.height;
                var scale = (xScale > yScale) ? yScale : xScale;
                this.zoom(scale);
                return this;
            };
            Rectangle.prototype.centerXY = function (width, height, basePosition) {
                if (basePosition === void 0) { basePosition = null; }
                if (basePosition == null) {
                    basePosition = new geom.Point();
                }
                this.x = Math.floor((width - this.width) / 2) + basePosition.x;
                this.y = Math.floor((height - this.height) / 2) + basePosition.y;
                return this;
            };
            Rectangle.prototype.zoom = function (scale) {
                this.width *= scale;
                this.height *= scale;
                return this;
            };
            return Rectangle;
        }());
        geom.Rectangle = Rectangle;
    })(geom = jstream_t3.geom || (jstream_t3.geom = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var view;
    (function (view) {
        var ViewElement = (function (_super) {
            __extends(ViewElement, _super);
            function ViewElement(dom, style) {
                if (dom === void 0) { dom = null; }
                if (style === void 0) { style = null; }
                var _this = _super.call(this) || this;
                _this.parent = null;
                _this.id = _this.createID();
                _this.children = [];
                _this.childrenHash = {};
                _this.dom = _this.createDom(dom);
                if (!dom) {
                    _this.initStyle(style);
                }
                return _this;
            }
            ViewElement.prototype.createID = function () {
                return "t" + Math.floor(Math.random() * new Date().getTime());
            };
            ViewElement.prototype.createDom = function (dom) {
                if (dom === void 0) { dom = null; }
                if (dom == null) {
                    dom = document.createElement("div");
                }
                this.setUpEvent(dom);
                return dom;
            };
            ViewElement.prototype.useHandCursole = function (value) {
                this.dom.style.cursor = value ? "pointer" : null;
            };
            ViewElement.prototype.setUpEvent = function (dom) {
                var _this = this;
                dom.onload = function () {
                    _this.dispatchEvent(DOMEventKind.LOAD);
                };
                dom.onclick = function () {
                    _this.dispatchEvent(MouseEventKind.CLICK);
                };
                dom.onmouseout = function () {
                    _this.dispatchEvent(MouseEventKind.MOUSE_OUT);
                };
                dom.onmouseover = function () {
                    _this.dispatchEvent(MouseEventKind.MOUSE_OVER);
                };
                dom.onmousemove = function () {
                    _this.dispatchEvent(MouseEventKind.MOUSE_MOVE);
                };
                dom.onmousedown = function () {
                    _this.dispatchEvent(MouseEventKind.MOUSE_DOWN);
                };
                dom.onmouseup = function () {
                    _this.dispatchEvent(MouseEventKind.MOUSE_UP);
                };
            };
            ViewElement.prototype.initStyle = function (style) {
                if (style === void 0) { style = null; }
                if (style == null)
                    style = {};
                this.dom.style.position = style.position || "absolute";
                this.dom.style.margin = style.margin || "0px";
                this.dom.style.padding = style.padding || "0px";
                this.dom.style.left = style.left || "0px";
                this.dom.style.top = style.top || "0px";
            };
            ViewElement.prototype.setNumberStyle = function (type, value) {
                if (value === void 0) { value = null; }
                if (value != null) {
                    this.dom.style[type] = value.toString() + "px";
                }
                return this.getNumberStyle(type);
            };
            ViewElement.prototype.setStringStyle = function (type, value) {
                if (value === void 0) { value = null; }
                if (value != null) {
                    this.dom.style[type] = value;
                }
                return this.getStringStyle(type);
            };
            ViewElement.prototype.getNumberStyle = function (type) {
                if (!this.dom.style[type])
                    return 0;
                return parseInt(this.dom.style[type].slice(0, -2));
            };
            ViewElement.prototype.getStringStyle = function (type) {
                if (!this.dom.style[type])
                    return "";
                return (this.dom.style[type]);
            };
            ViewElement.prototype.left = function (value) {
                if (value === void 0) { value = null; }
                return this.setNumberStyle("left", value);
            };
            ViewElement.prototype.top = function (value) {
                if (value === void 0) { value = null; }
                return this.setNumberStyle("top", value);
            };
            ViewElement.prototype.right = function (value) {
                if (value === void 0) { value = null; }
                return this.setNumberStyle("right", value);
            };
            ViewElement.prototype.bottom = function (value) {
                if (value === void 0) { value = null; }
                return this.setNumberStyle("bottom", value);
            };
            ViewElement.prototype.width = function (value) {
                if (value === void 0) { value = null; }
                if (value != null)
                    this.dom.style.width = value + "px";
                return this.dom.offsetWidth - this.getNumberStyle("borderLeftWidth") - this.getNumberStyle("borderRightWidth") - this.getNumberStyle("paddingLeft") - this.getNumberStyle("paddingRight");
            };
            ViewElement.prototype.outerWidth = function () {
                return this.dom.offsetWidth;
            };
            ViewElement.prototype.height = function (value) {
                if (value === void 0) { value = null; }
                if (value != null)
                    this.dom.style.height = value + "px";
                return this.dom.offsetHeight;
            };
            ViewElement.prototype.outerHeight = function () {
                return this.dom.offsetHeight;
            };
            ViewElement.prototype.innerHeight = function () {
                return this.dom.offsetHeight;
            };
            ViewElement.prototype.borderVisible = function (value) {
                if (value === void 0) { value = null; }
                if (value != null) {
                    this.dom.style.border = !value ? "none" : value;
                }
                return this.dom.style.border != "none";
            };
            ViewElement.prototype.visible = function (value) {
                if (value === void 0) { value = null; }
                if (value != null) {
                    this.dom.style.visibility = value ? "visible" : "hidden";
                }
                return this.dom.style.visibility == "visible";
            };
            ViewElement.prototype.alpha = function (value) {
                if (value === void 0) { value = null; }
                if (value != null) {
                    this.dom.style.opacity = value.toString();
                }
                return parseFloat(this.dom.style.opacity);
            };
            ViewElement.prototype.getElement = function () {
                return this.dom;
            };
            ViewElement.prototype.addChild = function (value) {
                if (this.childrenHash[value.id] == null) {
                    this.children.push(value);
                    this.childrenHash[value.id] = value;
                    this.dom.appendChild(value.getElement());
                    value.parent = this;
                }
            };
            ViewElement.prototype.removeChild = function (value) {
                if (this.childrenHash[value.id]) {
                    delete this.childrenHash[value.id];
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i].id == value.id) {
                            this.children.splice(i, 1);
                            this.dom.removeChild(value.getElement());
                            value.parent = null;
                            return;
                        }
                    }
                }
            };
            ViewElement.prototype.parentDom = function () {
                return this.dom.parentElement;
            };
            return ViewElement;
        }(jstream_t3.events.EventDispatcher));
        view.ViewElement = ViewElement;
        var MouseEventKind = (function () {
            function MouseEventKind() {
            }
            return MouseEventKind;
        }());
        MouseEventKind.MOUSE_UP = "mouseup";
        MouseEventKind.MOUSE_DOWN = "mosuedown";
        MouseEventKind.MOUSE_MOVE = "mousemove";
        MouseEventKind.CLICK = "click";
        MouseEventKind.MOUSE_OUT = "mouseout";
        MouseEventKind.MOUSE_OVER = "mouseover";
        view.MouseEventKind = MouseEventKind;
        var DOMEventKind = (function () {
            function DOMEventKind() {
            }
            return DOMEventKind;
        }());
        DOMEventKind.LOAD = "load";
        view.DOMEventKind = DOMEventKind;
    })(view = jstream_t3.view || (jstream_t3.view = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var view;
    (function (view) {
        var ImageView = (function (_super) {
            __extends(ImageView, _super);
            function ImageView(fit) {
                if (fit === void 0) { fit = true; }
                var _this = _super.call(this) || this;
                _this.fit = fit;
                _this.isLoading = false;
                _this._rawHeigt = 0;
                _this._rawWidth = 0;
                _this.setupRawSize();
                _this.addEventListener(view.DOMEventKind.LOAD, _this.onload);
                return _this;
            }
            ImageView.prototype.createDom = function (dom) {
                if (dom === void 0) { dom = null; }
                var img = document.createElement("img");
                var element = _super.prototype.createDom.call(this, img);
                return element;
            };
            ImageView.prototype.onload = function (e) {
                var _this = e.currentTarget;
                _this.isLoading = true;
                if (_this.fit) {
                    _this.resize(e);
                }
                _this.visible(true);
            };
            ImageView.prototype.rawHeight = function () {
                return this.getElement().naturalHeight;
            };
            ImageView.prototype.rawWidth = function () {
                return this.getElement().naturalWidth;
            };
            ImageView.prototype.load = function (src) {
                var _this = this;
                this.isLoading = true;
                this.visible(false);
                this._rawWidth = 0;
                this._rawHeigt = 0;
                this.getElement().src = src;
                if (!("naturalWidth" in this.getElement())) {
                    setTimeout(function () {
                        if (_this.isLoading && _this.getElement()["width"] != 0) {
                            _this.dispatchEvent(view.DOMEventKind.LOAD);
                        }
                    }, 33);
                }
            };
            ImageView.prototype.resize = function (e) {
                var _this = e.currentTarget;
                _this.IEResize();
                var rect = new jstream_t3.geom.Rectangle(0, 0, _this.rawWidth(), _this.rawHeight());
                rect.fexedZoom(_this.parent.width(), _this.parent.height());
                rect.centerXY(_this.parent.width(), _this.parent.height());
                _this.left(rect.x);
                _this.top(rect.y);
                _this.width(rect.width);
                _this.height(rect.height);
            };
            ImageView.prototype.IEResize = function () {
                var image = this.getElement();
                if ("naturalWidth" in image) {
                    return;
                }
                var run = image.runtimeStyle;
                var mem = { w: run.width, h: run.height };
                run.width = "auto";
                run.height = "auto";
                this._rawWidth = image.width;
                this._rawHeigt = image.height;
                run.width = mem.w;
                run.height = mem.h;
            };
            ImageView.prototype.setupRawSize = function () {
                var _this = this;
                if ("naturalWidth" in this.getElement()) {
                    return;
                }
                this.rawHeight = function () { return _this._rawHeigt; };
                this.rawWidth = function () { return _this._rawWidth; };
            };
            return ImageView;
        }(view.ViewElement));
        view.ImageView = ImageView;
    })(view = jstream_t3.view || (jstream_t3.view = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var view;
    (function (view) {
        var ThumbnailView = (function () {
            function ThumbnailView() {
                this.thumbnail = new view.ImageView();
                this.wMark = new view.ImageView(false);
                this.base = new view.ViewElement(null, { position: "relative" });
            }
            ThumbnailView.prototype.createElement = function (thumbnailURL, wmarkPath, width, height) {
                if (width === void 0) { width = 100; }
                if (height === void 0) { height = 100; }
                this.base.width(width);
                this.base.height(height);
                this.base.addChild(this.thumbnail);
                this.thumbnail.useHandCursole(true);
                this.thumbnail.load(thumbnailURL);
                this.thumbnailImage = new Image();
                this.thumbnailImage.src = thumbnailURL;
                var wSize = 99;
                if (width < 240 || height < 180) {
                    wSize = 49;
                }
                this.waterMarkSize = wSize;
                var left;
                var top;
                left = Math.floor(width / 2 - wSize / 2);
                top = Math.floor(height / 2 - wSize / 2);
                if (wmarkPath != null) {
                    this.wMark.left(left);
                    this.wMark.top(top);
                    this.wMark.width(wSize);
                    this.wMark.height(wSize);
                    this.wMark.load(wmarkPath);
                    this.wMark.useHandCursole(true);
                    this.base.addChild(this.wMark);
                }
                return this.base;
            };
            ThumbnailView.prototype.setSize = function (width, height) {
                this.base.width(width);
                this.base.height(height);
                this.wMark.left(Math.floor(width / 2 - this.wMark.width() / 2));
                this.wMark.top(Math.floor(height / 2 - this.wMark.height() / 2));
            };
            ThumbnailView.prototype.setSizeResponsive = function (responsive) {
                if (responsive == "on") {
                    this.base.setStringStyle("position", "absolute");
                }
                var userAgent = window.navigator.userAgent.toLowerCase();
                var appVersion = window.navigator.appVersion.toLowerCase();
                if (appVersion.indexOf("msie 6.") != -1 || appVersion.indexOf("msie 7.") != -1 || appVersion.indexOf("msie 8.") != -1) {
                    var clientHeight;
                    var clientWidth;
                    if (document.compatMode == "BackCompat") {
                        clientWidth = document.body.clientWidth;
                        clientHeight = document.body.clientHeight;
                    }
                    else {
                        clientWidth = document.documentElement.clientWidth;
                        clientHeight = document.documentElement.clientHeight;
                    }
                    var thumbOriginWidth = this.thumbnailImage.width;
                    var thumbOriginHeight = this.thumbnailImage.height;
                    var thumbnailAspect = thumbOriginHeight / thumbOriginWidth;
                    this.base.setStringStyle("width", "100%");
                    this.base.setStringStyle("height", "100%");
                    this.base.setStringStyle("cursor", "pointer");
                    this.thumbnail.setStringStyle("max-width", "100%");
                    this.wMark.setStringStyle("left", "50%");
                    this.wMark.setStringStyle("top", "50%");
                    this.wMark.setStringStyle("margin", this.waterMarkSize / 2 * -1 + "px 0 0 " + this.waterMarkSize / 2 * -1 + "px");
                }
                else {
                    this.base.setStringStyle("width", "100%");
                    this.base.setStringStyle("height", "100%");
                    this.base.setStringStyle("background-image", "url(" + this.thumbnailImage.src + ")");
                    this.base.setStringStyle("background-size", "contain");
                    this.base.setStringStyle("background-repeat", "no-repeat");
                    this.base.setStringStyle("background-position", "center");
                    this.base.setStringStyle("cursor", "pointer");
                    this.thumbnail.getElement().onload = null;
                    this.thumbnail.visible(false);
                    this.thumbnail.setStringStyle("display", "none");
                    this.wMark.setStringStyle("left", "50%");
                    this.wMark.setStringStyle("top", "50%");
                    this.wMark.setStringStyle("margin", this.waterMarkSize / 2 * -1 + "px 0 0 " + this.waterMarkSize / 2 * -1 + "px");
                }
            };
            ThumbnailView.prototype.getElement = function () {
                return this.base.getElement();
            };
            ThumbnailView.prototype.getWaterMark = function () {
                return this.wMark;
            };
            return ThumbnailView;
        }());
        view.ThumbnailView = ThumbnailView;
    })(view = jstream_t3.view || (jstream_t3.view = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var PlatformBuilder = (function () {
        function PlatformBuilder(model, accessor) {
            if (accessor === void 0) { accessor = null; }
            this.model = model;
            this.accessor = accessor;
        }
        PlatformBuilder.prototype.build = function () {
        };
        PlatformBuilder.prototype.createMark = function () {
            var mark = "";
            var style = "eq-livemark_useHeader";
            var useCTRL = "useCTRL";
            var margin = "";
            if (this.model.isLive && this.model.livemark_use != "off" && this.model.getEnvironmentType() != jstream_t3.EnviromentKind.PC_STREAMING) {
                if (this.model.title_use != "on" && this.model.replay_use != "on") {
                    style = "eq-livemark_noHeader";
                }
                mark += '<div id="' + this.model.objectID + 'live_mark" class="eq-livemark ' + style + '">LIVE</div>';
            }
            if (this.model.info_dir == "testing") {
                if (this.model.controlbar_use != "on") {
                    useCTRL = "noCTRL";
                }
                if (this.model.isFooder() && !(this.model.responsive == "on" || this.model.responsive == "fit")) {
                    margin = 'style="margin-bottom:20px;"';
                }
                mark += '<div class="eq-testmark ' + useCTRL + '" ' + margin + '>検証モード</div>';
            }
            return mark;
        };
        PlatformBuilder.prototype.createFooter = function () {
            var footer = document.getElementById("footer-" + this.model.objectID);
            footer.innerHTML = "<span>" + this.model.footer_text + "</span>";
            footer.className = "jstream-eqPlayer-footer " + jstream_t3.utils.Util.getUserAgent();
            footer.style.textAlign = this.model.footer_align;
            if (this.model.deviceType === "android") {
                footer.style.fontSize = "10px";
            }
        };
        return PlatformBuilder;
    }());
    jstream_t3.PlatformBuilder = PlatformBuilder;
    var SWFBuilder = (function (_super) {
        __extends(SWFBuilder, _super);
        function SWFBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SWFBuilder.prototype.build = function () {
            var tag = '<div id="' + this.model.objectID + '"></div>';
            document.getElementById(this.model.fieldID).innerHTML = tag;
            document.getElementById(this.model.fieldID).innerHTML += this.createMark();
            if (this.model.isFooder() && !(this.model.responsive == "on" || this.model.responsive == "fit")) {
                var footer = '<div id="footer-' + this.model.objectID + '" > </div>';
                document.getElementById(this.model.fieldID).innerHTML += footer;
                this.createFooter();
            }
            var swfHeight = (this.model.isFooder() && !(this.model.responsive == "on" || this.model.responsive == "fit") ? this.model.height - 20 : this.model.height);
            var width = String(this.model.width);
            var height = String(swfHeight);
            if (this.model.responsive == "on" || this.model.responsive == "fit") {
                width = "100%";
                height = "100%";
            }
            if (!this.model.isLive) {
                if (this.model.isPDPlayerEnable()) {
                }
                else {
                }
                var q = "";
                if (this.model.stype) {
                    q = "?stype=" + this.model.stype;
                }
                var width = String(this.model.width);
                var height = String(swfHeight);
                if (this.model.responsive == "on" || this.model.responsive == "fit") {
                    width = "100%";
                    height = "100%";
                }
                jstream_t3.PlayerManger.getPlayer(this.model.objectID).eqPlayer.flashVarsList = this.model.getListFormat();
                jstream_t3.utils.EmbedSwf.embed(this.model.objectID, this.model.playerDir + "EQPlayer.swf" + q, width, height, this.model.thumbnail_url);
            }
            else {
                this.model.pd_enable = "0";
                this.model.movie_url = this.model.movie_url_mobile;
                this.model.movie_list = this.model.movie_list_mobile;
                var width = String(this.model.width);
                var height = String(swfHeight);
                if (this.model.responsive == "on" || this.model.responsive == "fit") {
                    width = "100%";
                    height = "100%";
                }
                jstream_t3.PlayerManger.getPlayer(this.model.objectID).eqPlayer.flashVarsList = this.model.getListFormat();
                jstream_t3.utils.EmbedSwf.embed(this.model.objectID, this.model.playerDir + "EQLivePlayer.swf", width, height);
            }
        };
        return SWFBuilder;
    }(PlatformBuilder));
    jstream_t3.SWFBuilder = SWFBuilder;
    var HTML5PDBuilder = (function (_super) {
        __extends(HTML5PDBuilder, _super);
        function HTML5PDBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HTML5PDBuilder.prototype.build = function () {
            var tag = '<link rel = "stylesheet" href = "' + this.model.cssDir + 'html5player.css" / >';
            document.getElementById(this.model.fieldID).innerHTML = tag;
            document.getElementById(this.model.fieldID).innerHTML += this.createMark();
            this.model.movie_width = this.model.width;
            this.model.movie_height = this.model.height;
            var eqPlayer = jstream_t3.PlayerManger.getPlayer(this.model.objectID).eqPlayer;
            eqPlayer.fieldID = eqPlayer.fieldID;
            eqPlayer.html5Player = new HTML5Player_t3();
            eqPlayer.html5Player.init(eqPlayer, this.model.objectID);
            eqPlayer.accessor.dispatchEvent("playerInit");
        };
        return HTML5PDBuilder;
    }(PlatformBuilder));
    jstream_t3.HTML5PDBuilder = HTML5PDBuilder;
    var HTML5HLSBuilder = (function (_super) {
        __extends(HTML5HLSBuilder, _super);
        function HTML5HLSBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HTML5HLSBuilder.prototype.build = function () {
            var tag = '<link rel = "stylesheet" href = "' + this.model.cssDir + 'html5player.css" / >';
            document.getElementById(this.model.fieldID).innerHTML = tag;
            document.getElementById(this.model.fieldID).innerHTML += this.createMark();
            if (this.model.isKollectiveEnable()) {
                this.model.movie_url = this.model.kollective_url;
                this.model.movie_list = this.model.kollective_list;
            }
            else if (this.model.isLive) {
                this.model.movie_url = this.model.movie_url_mobile;
                this.model.movie_list = this.model.movie_list_mobile;
            }
            this.model.movie_width = this.model.width;
            this.model.movie_height = this.model.height;
            var eqPlayer = jstream_t3.PlayerManger.getPlayer(this.model.objectID).eqPlayer;
            eqPlayer.fieldID = eqPlayer.fieldID;
            eqPlayer.html5Player = new HTML5Player_t3();
            eqPlayer.html5Player.init(eqPlayer, this.model.objectID);
            eqPlayer.accessor.dispatchEvent("playerInit");
        };
        return HTML5HLSBuilder;
    }(PlatformBuilder));
    jstream_t3.HTML5HLSBuilder = HTML5HLSBuilder;
    var HTML5HlsJSBuilder = (function (_super) {
        __extends(HTML5HlsJSBuilder, _super);
        function HTML5HlsJSBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HTML5HlsJSBuilder.prototype.build = function () {
            var tag = '<link rel = "stylesheet" href = "' + this.model.cssDir + 'html5player.css" / >';
            document.getElementById(this.model.fieldID).innerHTML = tag;
            document.getElementById(this.model.fieldID).innerHTML += this.createMark();
            var eqPlayer = jstream_t3.PlayerManger.getPlayer(this.model.objectID).eqPlayer;
            this.model.movie_width = this.model.width;
            this.model.movie_height = this.model.height;
            if (this.model.isKollectiveEnable()) {
                this.model.movie_url = this.model.kollective_url;
                this.model.movie_list = this.model.kollective_list;
            }
            else if (this.model.isLive) {
                this.model.movie_url = this.model.movie_url_mobile;
                this.model.movie_list = this.model.movie_list_mobile;
            }
            if (this.model.movie_url && this.model.movie_list) {
                eqPlayer.fieldID = eqPlayer.fieldID;
                eqPlayer.html5Player = new HTML5Player_t3();
                eqPlayer.html5Player.init(eqPlayer, this.model.objectID);
                eqPlayer.accessor.dispatchEvent("HlsPlayerInit");
            }
            else {
                eqPlayer.accessor.showError(jstream_t3.events.ErrorEvent.OTHER_ERROR, eqPlayer.accessor.LanguageResource.kinds.ERROR_MOVIE_NOT_FOUND, eqPlayer.accessor.LanguageResource.kinds.ERROR_TITLE);
            }
        };
        return HTML5HlsJSBuilder;
    }(PlatformBuilder));
    jstream_t3.HTML5HlsJSBuilder = HTML5HlsJSBuilder;
    var NativeHlsBuilder = (function (_super) {
        __extends(NativeHlsBuilder, _super);
        function NativeHlsBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NativeHlsBuilder.prototype.build = function () {
            var _this = this;
            var tag = '<div id="' + this.model.objectID + '"></div><div id="footer-' + this.model.objectID + '"></div>';
            document.getElementById(this.model.fieldID).innerHTML = tag;
            document.getElementById(this.model.fieldID).innerHTML += this.createMark();
            if (this.model.isFooder() && (this.model.responsive != "on" && this.model.responsive != "fit")) {
                this.createFooter();
            }
            if (this.model.isLive) {
                this.model.movie_url = this.model.movie_url_mobile;
            }
            var movieURL = this.model.movie_url;
            var thumbnail = new jstream_t3.view.ThumbnailView();
            var height = (this.model.isFooder() && (this.model.responsive != "on" && this.model.responsive != "fit") ? this.model.height - 20 : this.model.height);
            var wmPath = this.model.cssDir + "wm_play.png";
            thumbnail.createElement(this.model.getThumbnailURL(), null, this.model.width, height);
            if (this.model.responsive == "on" || this.model.responsive == "fit") {
                thumbnail.setSizeResponsive(this.model.responsive);
                if (this.model.watermark_use != "off") {
                    var display_area = document.createElement("div");
                    display_area.style.width = "100%";
                    display_area.style.height = "100%";
                    display_area.style.display = "table";
                    thumbnail.getElement().appendChild(display_area);
                    var water_mark_wrapper = document.createElement("div");
                    water_mark_wrapper.setAttribute("class", "water_mark_wrapper");
                    display_area.appendChild(water_mark_wrapper);
                    var water_mark = document.createElement("div");
                    var classList = "";
                    if (this.model.watermark_design == "2") {
                        classList = "water_mark";
                    }
                    else {
                        classList = "water_mark_square";
                    }
                    var width = this.model.thumb_width;
                    var height = this.model.thumb_height;
                    if (height <= 180 || this.model.width <= 240) {
                        classList += " water_mark_small";
                    }
                    water_mark.setAttribute("class", classList);
                    water_mark_wrapper.appendChild(water_mark);
                }
            }
            else {
                thumbnail.getElement().style.display = "table";
                if (this.model.watermark_use != "off") {
                    var water_mark_wrapper = document.createElement("div");
                    water_mark_wrapper.setAttribute("class", "water_mark_wrapper");
                    thumbnail.getElement().appendChild(water_mark_wrapper);
                    var water_mark = document.createElement("div");
                    var classList = "";
                    if (this.model.watermark_design == "2") {
                        classList = "water_mark";
                    }
                    else {
                        classList = "water_mark_square";
                    }
                    if (height <= 180 || this.model.width <= 240) {
                        classList += " water_mark_small";
                    }
                    water_mark.setAttribute("class", classList);
                    water_mark_wrapper.appendChild(water_mark);
                }
            }
            if (this.accessor.model.isAuthEnable()) {
                var thDiv = thumbnail.getElement();
                thDiv.onclick = function () {
                    _this.accessor.setAuth();
                };
                document.getElementById(this.model.fieldID).appendChild(thDiv);
            }
            else {
                var a = document.createElement("a");
                a.href = movieURL;
                a.target = "_parent";
                a.appendChild(thumbnail.getElement());
                document.getElementById(this.model.fieldID).appendChild(a);
            }
            var eqPlayer = jstream_t3.PlayerManger.getPlayer(this.model.objectID).eqPlayer;
            eqPlayer.accessor.initInIFrameAPI();
            eqPlayer.accessor.dispatchEvent("playerReady");
            eqPlayer.accessor.isLanding = true;
            eqPlayer.accessor.setState("landing");
        };
        return NativeHlsBuilder;
    }(PlatformBuilder));
    jstream_t3.NativeHlsBuilder = NativeHlsBuilder;
    var NoFlashBuilder = (function (_super) {
        __extends(NoFlashBuilder, _super);
        function NoFlashBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NoFlashBuilder.prototype.build = function () {
            var language = null;
            if (language == null) {
                var lang = "ja";
                if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                    lang = "en";
                }
                language = new jstream_t3.resource.LanguageResource(this.model["language_resource_" + lang]);
            }
            if (jstream_t3.utils.Util.isMobileList().Android2 || jstream_t3.utils.Util.isMobileList().Android3) {
                jstream_t3.view.AlertView.show(language.kinds.ERROR_NO_FLASH_ANDROID_MESSAGE, language.kinds.ERROR_NO_FLASH_ANDROID_TITLE, this.model.fieldID, this.model.cssDir);
            }
            else {
                jstream_t3.view.AlertView.show(language.kinds.ERROR_NO_FLASH_MESSAGE, language.kinds.ERROR_NO_FLASH_TITLE, this.model.fieldID, this.model.cssDir);
            }
        };
        return NoFlashBuilder;
    }(PlatformBuilder));
    jstream_t3.NoFlashBuilder = NoFlashBuilder;
    var PlatformBuilderFactory = (function () {
        function PlatformBuilderFactory() {
        }
        PlatformBuilderFactory.create = function (model, accessor) {
            if (accessor === void 0) { accessor = null; }
            var type = model.getEnvironmentType();
            var result;
            switch (type) {
                case jstream_t3.EnviromentKind.MOBILE_NATIVE:
                    result = new NativeHlsBuilder(model, accessor);
                    break;
                case jstream_t3.EnviromentKind.MOBILE_PROGRESSIVE:
                case jstream_t3.EnviromentKind.PC_PROGRESSIVE:
                    result = new HTML5PDBuilder(model);
                    break;
                case jstream_t3.EnviromentKind.PC_HTML5HLS:
                case jstream_t3.EnviromentKind.MOBILE_STREAMING:
                    result = new HTML5HLSBuilder(model);
                    break;
                case jstream_t3.EnviromentKind.NO_FLASH:
                    result = new NoFlashBuilder(model);
                    break;
                case jstream_t3.EnviromentKind.PC_STREAMING:
                    result = new SWFBuilder(model);
                    break;
                case jstream_t3.EnviromentKind.HLSJS:
                case jstream_t3.EnviromentKind.MOBILE_HLSJS:
                    result = new HTML5HlsJSBuilder(model);
                    break;
            }
            return result;
        };
        return PlatformBuilderFactory;
    }());
    jstream_t3.PlatformBuilderFactory = PlatformBuilderFactory;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var utils;
    (function (utils) {
        var Logger = (function () {
            function Logger() {
            }
            Logger.logSetup = function () {
                if (!console) {
                    var win = window;
                    win["console"] = {
                        log: function (str) { }
                    };
                }
            };
            Logger.log = function (str) {
                Logger._log += str + "\n";
            };
            Logger.stateLog = function (value) {
                var date = new Date();
                value.date = (date.getHours() * 60 + date.getMinutes()) + "." + date.getSeconds() + "." + date.getMilliseconds();
                Logger._stateLog.push(value);
            };
            Logger.publishStateLog = function () {
                if (utils.Util.isFlash()) {
                    return Logger.publishLog(["date", "time", "va", "api", "eq", "strobe", "strobeMethod", "action"]);
                }
                else {
                    return Logger.publishLog(["date", "time", "va", "api", "video", "action"]);
                }
            };
            Logger.publishLog = function (stateList) {
                var result = "";
                var lines = [];
                var i;
                for (i = 0; i < stateList.length; i++) {
                    lines[i] = [stateList[i]];
                }
                for (i = 0; i < Logger._stateLog.length; i++) {
                    var item = Logger._stateLog[i];
                    for (var n = 0; n < stateList.length; n++) {
                        var value = item[stateList[n]];
                        if (typeof value == "number") {
                            value = "" + value;
                        }
                        lines[n].push(value || "");
                    }
                }
                for (i = 0; i < stateList.length; i++) {
                    result += lines[i].join(",") + "\n";
                }
                return result;
            };
            Logger.getLogBuf = function () {
                return Logger._log;
            };
            Logger.getAllLog = function () {
                return Logger._log;
            };
            return Logger;
        }());
        Logger._log = "";
        Logger._stateLog = [];
        utils.Logger = Logger;
    })(utils = jstream_t3.utils || (jstream_t3.utils = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var EQPlayerAccessAPI = (function (_super) {
        __extends(EQPlayerAccessAPI, _super);
        function EQPlayerAccessAPI(eqPlayer) {
            var _this = _super.call(this) || this;
            _this.inited = false;
            _this.objectID = eqPlayer.targetElementID;
            _this.eqPlayer = eqPlayer;
            _this.progressRate = 10;
            _this.preSeek = true;
            jstream_t3.PlayerManger.addPlayerAPI(_this);
            _this.addEventListener("playerInit", function () { _this.playerInit(); }, 1000);
            _this.addEventListener("HlsPlayerInit", function () { _this.HlsPlayerInit(); }, 1000);
            _this.analytics = _this.createAnalytics();
            _this.model = eqPlayer.flashVars;
            _this.model.sid = _this.analytics.getSid();
            _this.model.objectID = _this.objectID;
            _this.model.fieldID = eqPlayer.fieldID;
            _this.model.onError = function (code, title, message) {
                _this.showError(code, message, title);
            };
            _this.liveModel = eqPlayer.flashVars;
            _this.liveModel.objectID = _this.objectID;
            _this.liveModel.fieldID = eqPlayer.fieldID;
            _this.liveModel.onError = function (code, title, message) {
                _this.showError(code, message, title);
            };
            _this.settingService = new jstream_t3.SettingService();
            _this.settingService.fault = function () {
                _this.showError(jstream_t3.events.ErrorEvent.SETTINGS_LOAD_ERROR, JMCPlayer.kinds.ERROR_SETTING_DELETE, JMCPlayer.kinds.ERROR_SETTING_TITLE);
                _this.eqPlayer.errorHandler("error");
            };
            _this.metaDataService = new jstream_t3.MetaService();
            _this.metaDataService.fault = function () {
                if (_this.LanguageResource == null) {
                    var lang = "ja";
                    if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                        lang = "en";
                    }
                    _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
                }
                _this.showError(jstream_t3.events.ErrorEvent.METAINFO_LOAD_ERROR, _this.LanguageResource.kinds.ERROR_META_DATA_MESSAGE, _this.LanguageResource.kinds.ERROR_META_DATA_TITLE);
                _this.eqPlayer.errorHandler("error");
            };
            _this.deviceService = new jstream_t3.deviceService();
            _this.deviceService.fault = function () {
                if (_this.LanguageResource == null) {
                    var lang = "ja";
                    if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                        lang = "en";
                    }
                    _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
                }
                _this.showError(jstream_t3.events.ErrorEvent.METAINFO_LOAD_ERROR, _this.LanguageResource.kinds.ERROR_META_DATA_MESSAGE, _this.LanguageResource.kinds.ERROR_META_DATA_TITLE);
                _this.eqPlayer.errorHandler("error");
            };
            _this.liveMetaDataService = new jstream_t3.LiveMetaService();
            _this.liveMetaDataService.fault = function () {
                _this.showError(jstream_t3.events.ErrorEvent.METAINFO_LOAD_ERROR, JMCPlayer.kinds.P1201M, JMCPlayer.kinds.P1201T);
                _this.eqPlayer.errorHandler("error");
            };
            _this.serviceSettingService = new jstream_t3.ServiceSettingService();
            _this.serviceSettingService.fault = function (status) {
                if (status == "illegal") {
                    _this.showError(jstream_t3.events.ErrorEvent.SERVICE_SETTING_ERROR, JMCPlayer.kinds.ERROR_CID_ILLEGAL_MESSAGE, JMCPlayer.kinds.ERROR_CID_ILLEGAL_TITLE);
                }
                else {
                    _this.showError(jstream_t3.events.ErrorEvent.SERVICE_SETTING_ERROR, JMCPlayer.kinds.ERROR_SERVICE_DELETE, JMCPlayer.kinds.ERROR_SERVICE_TITLE);
                }
                _this.eqPlayer.errorHandler("error");
            };
            _this.hostCheckService2 = new jstream_t3.HostCheckService2();
            var _model = _this.model;
            _this.hostCheckService2.fault = function (status) {
                if (_this.LanguageResource == null) {
                    var lang = "ja";
                    if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                        lang = "en";
                    }
                    _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
                }
                switch (status) {
                    case 2001:
                        _this.model.hostCheckResult = "ng";
                        if (!(_model.auth_mode == "or" && _model.auth == "1")) {
                            _this.showError(jstream_t3.events.ErrorEvent.VIEWLIMIT_DISABLED, _this.LanguageResource.kinds.ERROR_ENV_MESSAGE.replace("_STATUS_", status), _this.LanguageResource.kinds.ERROR_ENV_TITLE);
                            _this.eqPlayer.errorHandler("error");
                        }
                        break;
                    case 2002:
                        _this.model.hostCheckResult = "ng";
                        if (!(_model.auth_mode == "or" && _model.auth == "1")) {
                            _this.showError(jstream_t3.events.ErrorEvent.VIEWLIMIT_DISABLED, _this.LanguageResource.kinds.ERROR_ENV_MESSAGE.replace("_STATUS_", status), _this.LanguageResource.kinds.ERROR_ENV_TITLE);
                            _this.eqPlayer.errorHandler("error");
                        }
                        break;
                    case 2003:
                        _this.model.hostCheckResult = "ng";
                        _this.showError(jstream_t3.events.ErrorEvent.VIEWLIMIT_DISABLED, _this.LanguageResource.kinds.ERROR_LIMIT_PRE_MESSAGE, _this.LanguageResource.kinds.ERROR_LIMIT_PRE_TITLE);
                        _this.eqPlayer.errorHandler("error");
                        break;
                    case 2004:
                        _this.model.hostCheckResult = "ng";
                        _this.showError(jstream_t3.events.ErrorEvent.VIEWLIMIT_DISABLED, _this.LanguageResource.kinds.ERROR_LIMIT_OVER_MESSAGE, _this.LanguageResource.kinds.ERROR_LIMIT_OVER_TITLE);
                        _this.eqPlayer.errorHandler("error");
                        break;
                    default:
                        _this.model.hostCheckResult = "ng";
                        if (!(_model.auth_mode == "or" && _model.auth == "1")) {
                            _this.showError(jstream_t3.events.ErrorEvent.VIEWLIMIT_DISABLED, _this.LanguageResource.kinds.ERROR_ENV_MESSAGE.replace("_STATUS_", status), _this.LanguageResource.kinds.ERROR_ENV_TITLE);
                            _this.eqPlayer.errorHandler("error");
                        }
                }
            };
            _this.authCheckService = new jstream_t3.AuthenticationService();
            _this.CheckConnectionService = new jstream_t3.CheckConnectionService();
            _this.CheckConnectionService.fault = function () {
                if (_this.LanguageResource == null) {
                    var lang = "ja";
                    if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                        lang = "en";
                    }
                    _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
                }
                _this.showError(jstream_t3.events.ErrorEvent.LIVELIMIT_LOAD_ERROR, _this.LanguageResource.kinds.P3501M, _this.LanguageResource.kinds.P3501T);
            };
            _this.CheckConnectionResultService = new jstream_t3.CheckConnectionResultService();
            _this.CheckConnectionResultService.fault = function () {
                if (_this.LanguageResource == null) {
                    var lang = "ja";
                    if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                        lang = "en";
                    }
                    _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
                }
                _this.showError(jstream_t3.events.ErrorEvent.LIVELIMIT_LOAD_ERROR, _this.LanguageResource.kinds.P3501M, _this.LanguageResource.kinds.P3501T);
            };
            _this.DirInfoService = new jstream_t3.DirInfoService();
            _this.DirInfoService.fault = function () {
                _this.model.info_dir = "release";
            };
            return _this;
        }
        EQPlayerAccessAPI.prototype.loadMetaData = function (resultHandller) {
            this.metaDataService.result = resultHandller;
            this.metaDataService.syndicationapi_url = this.model.syndicationapi_url;
            this.metaDataService.setModel(this.model.createServiceModel());
            this.metaDataService.load();
        };
        EQPlayerAccessAPI.prototype.loadDeviceSetting = function (resultHandller) {
            this.deviceService.result = resultHandller;
            this.deviceService.setModel(this.model.createServiceModel());
            this.deviceService.load();
        };
        EQPlayerAccessAPI.prototype.loadLiveMetaData = function (resultHandller) {
            this.liveMetaDataService.result = resultHandller;
            this.liveMetaDataService.setModel(this.liveModel.createLiveServiceModel());
            this.liveMetaDataService.load();
        };
        EQPlayerAccessAPI.prototype.loadSettingData = function (resultHandller) {
            this.settingService.result = resultHandller;
            this.settingService.ssl_url = this.model.ssl_url;
            this.settingService.setModel(this.model.createServiceModel());
            this.settingService.load();
        };
        EQPlayerAccessAPI.prototype.loadPDSetting = function (resultHandller) {
            this.serviceSettingService.setModel(this.model.createServiceModel());
            this.serviceSettingService.result = resultHandller;
            this.serviceSettingService.load();
        };
        EQPlayerAccessAPI.prototype.loadHostCheck2 = function (resultHandler) {
            this.hostCheckService2.setModel(this.model.createServiceModel());
            this.hostCheckService2.result = resultHandler;
            this.hostCheckService2.load();
        };
        EQPlayerAccessAPI.prototype.loadLiveHostCheck = function (resultHandler) {
            this.hostCheckService2.setModel(this.liveModel.createLiveServiceModel());
            this.hostCheckService2.result = resultHandler;
            this.hostCheckService2.load();
        };
        EQPlayerAccessAPI.prototype.loadAuthCheck = function (resultHandler) {
            this.authCheckService.setModel(this.model.createServiceModel());
            this.authCheckService.result = resultHandler;
            this.authCheckService.fault = resultHandler;
            this.authCheckService.load();
        };
        EQPlayerAccessAPI.prototype.loadCheckConnection = function (resultHandler) {
            this.CheckConnectionService.setModel(this.model.createServiceModel());
            this.CheckConnectionService.result = resultHandler;
            this.CheckConnectionService.fault = resultHandler;
            this.CheckConnectionService.load();
        };
        EQPlayerAccessAPI.prototype.loadCheckConnectionResult = function (resultHandler) {
            this.CheckConnectionResultService.setModel(this.model.createServiceModel());
            this.CheckConnectionResultService.result = resultHandler;
            this.CheckConnectionResultService.fault = resultHandler;
            this.CheckConnectionResultService.load();
        };
        EQPlayerAccessAPI.prototype.loadDirInfoService = function (resultHandler) {
            this.DirInfoService.setModel(this.model.createServiceModel());
            this.DirInfoService.result = resultHandler;
            this.DirInfoService.fault = resultHandler;
            this.DirInfoService.load();
        };
        EQPlayerAccessAPI.prototype.showError = function (code, message, title) {
            if (title === void 0) { title = ""; }
            if (this.model.responsive == "on" || this.model.responsive == "fit") {
                if (this.model.isLive && document.getElementById(this.eqPlayer.fieldID).clientHeight < 150) {
                    this.liveModel.setTagSize(this.eqPlayer.fieldID);
                }
            }
            jstream_t3.view.AlertView.show(message, title, this.eqPlayer.fieldID, this.model.cssDir);
            this.dispatchEvent(new jstream_t3.events.ErrorEvent(code, message, title));
        };
        EQPlayerAccessAPI.prototype.createAnalytics = function () {
            var analytics = new Analytics_t3(true);
            return analytics;
        };
        EQPlayerAccessAPI.prototype.addEventListener = function (type, handler, priolity) {
            if (priolity === void 0) { priolity = 0; }
            _super.prototype.addEventListener.call(this, type, handler, priolity);
            if (type == "progress" || this.state == "playing") {
                this.startProgress();
            }
        };
        EQPlayerAccessAPI.prototype.startProgress = function () {
            var _this = this;
            if (this.progressItervalID != null)
                return;
            this.updateTime = new Date().getTime();
            this.connectionCheckTime = new Date().getTime();
            var progressRate = this.progressRate;
            this.progressItervalID = setInterval(function () {
                if (_this.state == "playing") {
                    _this.dispatchEvent("progress");
                    var time = new Date().getTime();
                    if (time - _this.updateTime > 5000) {
                        _this.dispatchEvent("update");
                        _this.updateTime = time;
                        if (_this.model.resumeEnable == "on") {
                            var name = "EQPlayer_resume_CurrentTime_" + _this.model.meta_id + "_" + _this.model.contract_id;
                            var value = _this.getCurrentTime().toString();
                            var path = '/';
                            var period = 30;
                            var max = 20;
                            var overflowCookie = jstream_t3.utils.Util.CheckOverCookie("EQPlayer_resume_CurrentTime_", name, max);
                            if (overflowCookie != null) {
                                jstream_t3.utils.Util.DeleteCookie(overflowCookie, _this.model.CookieDomain);
                            }
                            jstream_t3.utils.Util.SetCookie(name, value, path, period, _this.model.CookieDomain);
                        }
                    }
                    if (time - _this.connectionCheckTime > 30000) {
                        _this.connectionCheckTime = time;
                        if (_this.model.connection_limit > 0 && _this.model.checkconnection_url != "off") {
                            _this.playCall("update");
                        }
                    }
                }
                else {
                    _this.stopProgress();
                }
            }, 1000 / progressRate);
        };
        EQPlayerAccessAPI.prototype.setEvents = function () {
            var _this = this;
            this.addEventListener("landing", function () {
                if (_this.model.platform["isIE"] && _this.model.platform["browser"]["version"] < 10) {
                    _this.eq_host.postMessage(jstream_t3.utils.Util.messageConvertForLegacy("setState", "landing", _this.iframeID), _this.embed_origin);
                }
                else {
                    _this.eq_host.postMessage({ msg: "setState", value: "landing", iframeID: _this.iframeID }, _this.embed_origin);
                }
            });
            this.addEventListener("progress", function () {
                _this.sendPlayerValues();
            });
        };
        EQPlayerAccessAPI.prototype.sendPlayerValues = function () {
            if (!this.model.isInIframe) {
                return;
            }
            var currentTime = this.getCurrentTime();
            var totalTime = this.getTotalTime();
            var quality = this.getQuality();
            var isMute = this.isMuted();
            var volume = this.getVolume();
            var playbackRate = this.getPlaybackRate();
            var currentAPI = this.getCurrentAPI();
            var value = {
                currentTime: currentTime,
                totalTime: totalTime,
                quality: quality,
                isMute: isMute,
                volume: volume,
                playbackRate: playbackRate,
                currentAPI: currentAPI
            };
            if (this.model.platform["isIE"] && this.model.platform["browser"]["version"] < 10) {
                this.eq_host.postMessage(jstream_t3.utils.Util.messageConvertForLegacy("progress", value, this.iframeID), this.embed_origin);
            }
            else {
                this.eq_host.postMessage({
                    msg: "progress",
                    value: value,
                    iframeID: this.iframeID
                }, this.embed_origin);
            }
        };
        EQPlayerAccessAPI.prototype.execIframeAPI = function (func, arg, event) {
            switch (func) {
                case "play":
                    this.play();
                    break;
                case "pause":
                    this.pause();
                    break;
                case "setCurrentTime":
                    this.setCurrentTime(Number(arg));
                    this.sendPlayerValues();
                    break;
                case "setStartTime":
                    this.setStartTime(Number(arg));
                    this.sendPlayerValues();
                    break;
                case "changeQuality":
                    this.changeQuality(Number(arg));
                    this.sendPlayerValues();
                    break;
                case "mute":
                    if (typeof (arg) != "boolean") {
                        arg = arg == "true" ? true : false;
                    }
                    this.mute(arg);
                    this.sendPlayerValues();
                    break;
                case "setVolume":
                    this.setVolume(Number(arg));
                    this.sendPlayerValues();
                    break;
                case "setPlaybackRate":
                    this.setPlaybackRate(Number(arg));
                    this.sendPlayerValues();
                    break;
                case "displayRefresh":
                    this.displayRefresh();
                    break;
                case "apiReady":
                    this.eq_host = event["source"];
                    this.embed_origin = event["origin"];
                    this.iframeID = arg;
                    this.setEvents();
                    if (!this.eq_host) {
                        return;
                    }
                    break;
                default:
                    return;
            }
        };
        EQPlayerAccessAPI.prototype.initInIFrameAPI = function () {
            var _this = this;
            if (this.model.isInIframe) {
                if (this.model.platform["isIE"] && this.model.platform["browser"]["version"] < 9) {
                    window.attachEvent("onmessage", function (event) {
                        try {
                            var p = jstream_t3.utils.Util.parse_uri(_this.model.domain);
                            var origin = p.scheme + "://" + p.authority;
                            if (event["origin"] !== origin) {
                                return;
                            }
                            var func;
                            var arg;
                            if (_this.model.platform["isIE"] && _this.model.platform["browser"]["version"] < 10) {
                                var parseData = (event["data"]).split(",");
                                func = parseData[0];
                                arg = parseData[1];
                            }
                            else {
                                func = event["data"]["func"];
                                arg = event["data"]["arg"];
                            }
                            _this.execIframeAPI(func, arg, event);
                        }
                        catch (err) {
                        }
                        finally {
                            return;
                        }
                    });
                }
                window.addEventListener("message", function (event) {
                    try {
                        var p = jstream_t3.utils.Util.parse_uri(_this.model.domain);
                        var origin = p.scheme + "://" + p.authority;
                        if (event.origin !== origin) {
                            return;
                        }
                        var func;
                        var arg;
                        if (_this.model.platform["isIE"] && _this.model.platform["browser"]["version"] < 10) {
                            var parseData = (event.data).split(",");
                            func = parseData[0];
                            arg = parseData[1];
                        }
                        else {
                            func = event.data.func;
                            arg = event.data.arg;
                        }
                        _this.execIframeAPI(func, arg, event);
                    }
                    catch (err) {
                    }
                });
            }
        };
        EQPlayerAccessAPI.prototype.stopProgress = function () {
            clearInterval(this.progressItervalID);
            this.progressItervalID = null;
        };
        EQPlayerAccessAPI.prototype.getElement = function () {
            return document.getElementById(this.objectID) || {};
        };
        EQPlayerAccessAPI.prototype.getCurrentTime = function () {
            return 0;
        };
        EQPlayerAccessAPI.prototype.validateSeek = function (value) {
            if (isNaN(value) || value < 0 || value > this.getTotalTime()) {
                return false;
            }
            return true;
        };
        EQPlayerAccessAPI.prototype.setCurrentTime = function (time) { };
        EQPlayerAccessAPI.prototype.setStartTime = function (time) { };
        EQPlayerAccessAPI.prototype.setState = function (state) {
            var _this = this;
            if (this.state == state) {
                return;
            }
            this.preState = this.state;
            this.state = state;
            if (state == "playing") {
                this.isPlayed = true;
            }
            if (state == "landing" && (this.model["isLightbox"] == true && this.model.isThumbnail == false)) {
                this.dispatchEvent("lightboxReady");
                return;
            }
            if (this.model.isInIframe && !this.model.isLightbox) {
                if (this.state == "landing") {
                    if (!this.eq_host) {
                        var apiReadyTimer = setInterval(function () {
                            if (_this.eq_host) {
                                clearInterval(apiReadyTimer);
                                _this.sendPlayerValues();
                                if (_this.model.platform["isIE"] && _this.model.platform["browser"]["version"] < 10) {
                                    _this.eq_host.postMessage(jstream_t3.utils.Util.messageConvertForLegacy("setState", _this.state, _this.iframeID), _this.embed_origin);
                                }
                                else {
                                    _this.eq_host.postMessage({ msg: "setState", value: _this.state, iframeID: _this.iframeID }, _this.embed_origin);
                                }
                            }
                        }, 100);
                    }
                    else {
                        this.sendPlayerValues();
                        if (this.model.platform["isIE"] && this.model.platform["browser"]["version"] < 10) {
                            this.eq_host.postMessage(jstream_t3.utils.Util.messageConvertForLegacy("setState", this.state, this.iframeID), this.embed_origin);
                        }
                        else {
                            this.eq_host.postMessage({ msg: "setState", value: this.state, iframeID: this.iframeID }, this.embed_origin);
                        }
                    }
                }
                else {
                    if (this.model.platform["isIE"] && this.model.platform["browser"]["version"] < 10) {
                        this.eq_host.postMessage(jstream_t3.utils.Util.messageConvertForLegacy("setState", this.state, this.iframeID), this.embed_origin);
                    }
                    else {
                        this.eq_host.postMessage({ msg: "setState", value: this.state, iframeID: this.iframeID }, this.embed_origin);
                    }
                }
            }
            this.dispatchEvent("change_state");
            this.dispatchEvent(this.state);
            if (state != "exit" && state != "complete" && state != "landing") {
                if (this.model.resumeEnable == "on") {
                    var name = "EQPlayer_resume_CurrentTime_" + this.model.meta_id + "_" + this.model.contract_id;
                    var value = this.getCurrentTime().toString();
                    var path = '/';
                    var period = 30;
                    var max = 20;
                    var overflowCookie = jstream_t3.utils.Util.CheckOverCookie("EQPlayer_resume_CurrentTime_", name, max);
                    if (overflowCookie != null) {
                        jstream_t3.utils.Util.DeleteCookie(overflowCookie, this.model.CookieDomain);
                    }
                    jstream_t3.utils.Util.SetCookie(name, value, path, period, this.model.CookieDomain);
                }
            }
            else if (state == "complete" && !this.model.isLive) {
                if (this.model.resumeEnable == "on") {
                    var name = "EQPlayer_resume_CurrentTime_" + this.model.meta_id + "_" + this.model.contract_id;
                    var value = "0";
                    var path = '/';
                    var period = 30;
                    jstream_t3.utils.Util.DeleteCookie(name, this.model.CookieDomain);
                    setTimeout(function () {
                        jstream_t3.utils.Util.DeleteCookie(name, _this.model.CookieDomain);
                    }, 10);
                }
            }
            if (state == "playing") {
                this.startProgress();
            }
            else {
                this.stopProgress();
            }
        };
        EQPlayerAccessAPI.prototype.getEnvironmentType = function () {
            return this.model.getEnvironmentType();
        };
        EQPlayerAccessAPI.prototype.playCall = function (stat) {
            if (stat === void 0) { stat = ""; }
        };
        EQPlayerAccessAPI.prototype.play = function () { };
        EQPlayerAccessAPI.prototype.pause = function () { };
        EQPlayerAccessAPI.prototype.getTotalTime = function () { return; };
        EQPlayerAccessAPI.prototype.playerInit = function (instance) {
            if (instance === void 0) { instance = null; }
            this.setAnalyticsConfig();
            this.initInIFrameAPI();
        };
        EQPlayerAccessAPI.prototype.HlsPlayerInit = function (instance) {
            if (instance === void 0) { instance = null; }
            this.setAnalyticsConfig();
            this.initInIFrameAPI();
        };
        EQPlayerAccessAPI.prototype.setAnalyticsConfig = function () {
            var vars = this.eqPlayer.flashVars;
            this.analyticsEnabled = vars.isVa();
            var cvaLength = 5;
            if (!this.analyticsEnabled) {
                return;
            }
            this.analytics.setSelf(vars.parent_url);
            this.analytics.setRef(vars.ref);
            var svcid = vars.contract_id || vars.maker_id;
            var vid = svcid + "-" + (vars.meta_id || vars.lpid) + "-" + vars.file_id;
            var uid = "";
            var pid = vars.partner_id;
            var o = "";
            var i = 1;
            for (var key in vars.o) {
                if (i > cvaLength) {
                    break;
                }
                o += key + "=" + vars.o[key] + "&";
                i++;
            }
            if (o.length > 1)
                o = o.slice(0, -1);
            this.analytics.setSvcid(svcid);
            this.analytics.setVid(vid);
            this.analytics.setUid(uid);
            this.analytics.setTotal(vars.duration);
            this.analytics.setTagType(vars.tagType);
            this.analytics.setPid(vars.partner_id);
            this.analytics.setObject(o);
            if (this.model.va_url)
                this.analytics.setBaseURL(this.model.va_url);
            if (this.model.vc)
                this.analytics.setVc(this.model.vc);
            this.analytics.setEvents(this);
        };
        EQPlayerAccessAPI.prototype.sendClickBeacon = function (type) {
            if (!this.analyticsEnabled) {
                return;
            }
            this.analytics.sendClickBeacon(type, this.getCurrentTime());
        };
        EQPlayerAccessAPI.prototype.createPlayer = function () {
        };
        EQPlayerAccessAPI.prototype.changeMedia = function (meta_id, autoPlay) {
            if (autoPlay === void 0) { autoPlay = true; }
        };
        EQPlayerAccessAPI.prototype.changeQuality = function (quality) {
        };
        EQPlayerAccessAPI.prototype.getQuality = function () {
            return 0;
        };
        EQPlayerAccessAPI.prototype.mute = function (value) {
            return false;
        };
        EQPlayerAccessAPI.prototype.isMuted = function () {
            return false;
        };
        EQPlayerAccessAPI.prototype.setVolume = function (volume) {
        };
        EQPlayerAccessAPI.prototype.getVolume = function () {
            return 0;
        };
        EQPlayerAccessAPI.prototype.getCurrentAPI = function () {
            return;
        };
        EQPlayerAccessAPI.prototype.getPlaybackRate = function () {
            return;
        };
        EQPlayerAccessAPI.prototype.setPlaybackRate = function (pr) {
        };
        EQPlayerAccessAPI.prototype.playerSkinConfig = function (config) {
        };
        EQPlayerAccessAPI.prototype.displayRefresh = function () {
        };
        EQPlayerAccessAPI.prototype.destroy = function () {
            this.removeEventListener;
            this.startProgress();
            this.metaDataService = null;
            this.settingService = null;
            this.serviceSettingService = null;
            this.objectID = null;
            this.inited = null;
            this.eqPlayer.flashVars = null;
            this.eqPlayer.flashVarsList = null;
            this.progressRate = null;
            this.state = null;
            this.analytics = null;
            this.analyticsEnabled = null;
            this.isPlayed = null;
            this.hashChecker = null;
            jstream_t3.PlayerManger.getPlayer;
            this.model.destroy();
            this.model = null;
            this.clearEventListener();
        };
        return EQPlayerAccessAPI;
    }(jstream_t3.events.EventDispatcher));
    jstream_t3.EQPlayerAccessAPI = EQPlayerAccessAPI;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var SWFAccessAPI = (function (_super) {
        __extends(SWFAccessAPI, _super);
        function SWFAccessAPI(eqPlayer) {
            var _this = _super.call(this, eqPlayer) || this;
            _this.playCallTimeout = null;
            _this.addEventListener("mediaError", function (e) {
                if (!_this.liveModel.isLive) {
                    _this.dispatchEvent(new jstream_t3.events.ErrorEvent(jstream_t3.events.ErrorEvent.SERVER_MEDIA_ERROR));
                }
                else {
                    _this.setState("interrupted");
                }
            });
            var swfAccessAPI = _this;
            return _this;
        }
        SWFAccessAPI.prototype.StandByLoop = function () {
            var _this = this;
            this.setCurrentTime(0);
            setTimeout(function () {
                _this.play();
            }, 10);
        };
        SWFAccessAPI.prototype.setState = function (state) {
            if (state == "landing") {
                this.inited = true;
            }
            if (state != "exit" && state != "landing") {
                var swfAccessAPI = this;
                if (swfAccessAPI.model.resumeVolumeEnable == "on") {
                    if (this.model.CookieDomain) {
                        var name = "EQPlayer_resume_Volume";
                        var value;
                        var path = '/';
                        var period;
                        if (swfAccessAPI.isMuted && swfAccessAPI.isMuted()) {
                            value = "mute";
                        }
                        else {
                            value = swfAccessAPI.getVolume().toString();
                        }
                        jstream_t3.utils.Util.SetCookie(name, value, path, period, this.model.CookieDomain);
                    }
                }
            }
            if (state == "complete") {
                if (this.model.loop_use == "on") {
                    this.StandByLoop();
                }
            }
            _super.prototype.setState.call(this, state);
        };
        SWFAccessAPI.prototype.getCurrentTime = function () {
            if (!this.inited)
                return 0;
            if (this.model.isThumbnail)
                return 0;
            if (this.liveModel.isLive) {
                return this.getElement().getCurrentTime();
            }
            else {
                return this.getElement().getCurrentTime();
            }
        };
        SWFAccessAPI.prototype.getTotalTime = function () {
            if (!this.inited)
                return 0;
            if (this.liveModel.isLive) {
                return this.getElement().getTotalTime();
            }
            else {
                return Math.floor(this.getElement().getTotalTime() * 1000) / 1000;
            }
        };
        SWFAccessAPI.prototype.setStartTime = function (time) {
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.setStartTime"
            });
            if (!this.validateSeek(time)) {
                return;
            }
            if (!this.liveModel.isLive) {
                this.getElement().setStartTime(time);
            }
        };
        SWFAccessAPI.prototype.setCurrentTime = function (time) {
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.setCurrentTime"
            });
            if (!this.validateSeek(time)) {
                return;
            }
            if (!this.liveModel.isLive) {
                this.getElement().seek(time);
            }
        };
        SWFAccessAPI.prototype.playCall = function (stat) {
            var _this = this;
            if (stat === void 0) { stat = ""; }
            this.model.stat = (stat == "update" ? "2" : "1");
            _super.prototype.loadCheckConnection.call(this, function (result) {
                _this.getElement().setConnectionStat(_this.model.isCheckConnectionPassed);
                if (stat == "update") {
                    if (_this.model.isCheckConnectionPassed != "NG") {
                        _this.model.isCheckConnectionPassed = "OK";
                    }
                    if (!_this.playCallTimeout) {
                        _this.playCallTimeout = setTimeout(function () {
                            _this.model.isCheckConnectionPassed = "NG";
                            _this.getElement().setConnectionStat(_this.model.isCheckConnectionPassed);
                            _this.playCallTimeout = null;
                        }, 30000);
                    }
                    return;
                }
                if (_this.model.isCheckConnectionPassed != "NG") {
                    if (stat != "update") {
                        _this.play();
                    }
                    if (!_this.playCallTimeout) {
                        _this.playCallTimeout = setTimeout(function () {
                            _this.model.isCheckConnectionPassed = "NG";
                            _this.getElement().setConnectionStat(_this.model.isCheckConnectionPassed);
                            _this.playCallTimeout = null;
                        }, 30000);
                    }
                }
                else {
                    if (_this.LanguageResource == null) {
                        var lang = "ja";
                        if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                            lang = "en";
                        }
                        _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
                    }
                    if (_this.model.isLive) {
                        _this.liveModel.liveLid = _this.liveModel.getLiveLidURL();
                        var lidthumb = new jstream_t3.view.LiveLidView();
                        lidthumb.createElement(_this.liveModel.liveLid, _this.liveModel.width, _this.liveModel.height);
                        if (_this.liveModel.responsive == "on" || _this.liveModel.responsive == "fit") {
                            lidthumb.setSizeResponsive(_this.liveModel.responsive);
                        }
                        var field = document.getElementById(_this.liveModel.fieldID);
                        if (field.hasChildNodes()) {
                            for (var i = 0, len = field.childNodes.length; i < len; i++) {
                                field.removeChild(field.childNodes[0]);
                            }
                        }
                        field.appendChild(lidthumb.getElement());
                        _this.liveModel.isPlayer = false;
                        _this.setState("complete");
                    }
                }
            });
        };
        SWFAccessAPI.prototype.play = function () {
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.play"
            });
            this.getElement().play2();
            _super.prototype.play.call(this);
        };
        SWFAccessAPI.prototype.pause = function () {
            if (!this.isPlayed)
                return;
            if (this.state == "complete" || this.state == "paused") {
                return;
            }
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.pause"
            });
            this.getElement().pause();
            _super.prototype.pause.call(this);
        };
        SWFAccessAPI.prototype.createPlayer = function () {
            var success;
            if (!this.liveModel.isLive) {
                success = this.model.parce();
            }
            else {
                success = this.liveModel.parseLive();
            }
            if (!success) {
                return;
            }
            this.eqPlayer.flashVarsList = this.model.getListFormat();
            jstream_t3.PlatformBuilderFactory.create(this.model).build();
            if (!jstream_t3.utils.Util.isFlash()) {
                this.dispatchEvent(new jstream_t3.events.ErrorEvent(jstream_t3.events.ErrorEvent.FLASHPLAYER_VERSION_ERROR));
            }
        };
        SWFAccessAPI.prototype.changeQuality = function (value) {
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.changeQuality"
            });
            this.getElement().changeQuality(value);
        };
        SWFAccessAPI.prototype.getQuality = function () {
            return this.getElement().getQuality();
        };
        SWFAccessAPI.prototype.mute = function (value) {
            if (typeof value === "boolean") {
                jstream_t3.utils.Logger.stateLog({
                    time: this.getCurrentTime(),
                    action: "api.mute"
                });
                return this.getElement().mute(value);
            }
            else {
                return this.isMuted();
            }
        };
        SWFAccessAPI.prototype.isMuted = function () {
            if (this.getElement().isMute) {
                return this.getElement().isMute();
            }
            else {
                return false;
            }
        };
        SWFAccessAPI.prototype.setVolume = function (volume) {
            if (typeof volume === "number" && volume >= 0 && volume <= 100 && volume % 1 == 0) {
                jstream_t3.utils.Logger.stateLog({
                    time: this.getCurrentTime(),
                    action: "api.setVolume"
                });
                if (this.getElement().setVolume) {
                    this.getElement().setVolume(volume / 100);
                }
            }
        };
        SWFAccessAPI.prototype.getVolume = function () {
            if (this.getElement().getVolume) {
                return Math.floor(this.getElement().getVolume() * 100);
            }
            else {
                return 100;
            }
        };
        SWFAccessAPI.prototype.getCurrentAPI = function () {
            return "SWFAPI";
        };
        return SWFAccessAPI;
    }(jstream_t3.EQPlayerAccessAPI));
    jstream_t3.SWFAccessAPI = SWFAccessAPI;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var view;
    (function (view) {
        var LiveLidView = (function () {
            function LiveLidView() {
                this.thumbnail = new view.ImageView();
                this.base = new view.ViewElement(null, { position: "relative" });
            }
            LiveLidView.prototype.createElement = function (thumbnailURL, width, height) {
                if (width === void 0) { width = 100; }
                if (height === void 0) { height = 100; }
                this.base.width(width);
                this.base.height(height);
                this.base.addChild(this.thumbnail);
                this.thumbnail.load(thumbnailURL);
                this.thumbnailImage = new Image();
                this.thumbnailImage.src = thumbnailURL;
                return this.base;
            };
            LiveLidView.prototype.setSize = function (width, height) {
                this.base.width(width);
                this.base.height(height);
            };
            LiveLidView.prototype.setSizeResponsive = function (responsive) {
                if (responsive == "on") {
                    this.base.setStringStyle("position", "absolute");
                }
                var userAgent = window.navigator.userAgent.toLowerCase();
                var appVersion = window.navigator.appVersion.toLowerCase();
                if (appVersion.indexOf("msie 6.") != -1 || appVersion.indexOf("msie 7.") != -1 || appVersion.indexOf("msie 8.") != -1) {
                    var clientHeight;
                    var clientWidth;
                    if (document.compatMode == "BackCompat") {
                        clientWidth = document.body.clientWidth;
                        clientHeight = document.body.clientHeight;
                    }
                    else {
                        clientWidth = document.documentElement.clientWidth;
                        clientHeight = document.documentElement.clientHeight;
                    }
                    var thumbOriginWidth = this.thumbnailImage.width;
                    var thumbOriginHeight = this.thumbnailImage.height;
                    var thumbnailAspect = thumbOriginHeight / thumbOriginWidth;
                    this.base.setStringStyle("width", "100%");
                    this.base.setStringStyle("height", "100%");
                    this.base.setStringStyle("cursor", "pointer");
                    this.thumbnail.setStringStyle("max-width", "100%");
                }
                else {
                    this.base.setStringStyle("width", "100%");
                    this.base.setStringStyle("height", "100%");
                    this.base.setStringStyle("background-image", "url(" + this.thumbnailImage.src + ")");
                    this.base.setStringStyle("background-size", "contain");
                    this.base.setStringStyle("background-repeat", "no-repeat");
                    this.base.setStringStyle("background-position", "center");
                    this.base.setStringStyle("cursor", "pointer");
                    this.thumbnail.getElement().onload = null;
                    this.thumbnail.visible(false);
                    this.thumbnail.setStringStyle("display", "none");
                }
            };
            LiveLidView.prototype.getElement = function () {
                return this.base.getElement();
            };
            return LiveLidView;
        }());
        view.LiveLidView = LiveLidView;
    })(view = jstream_t3.view || (jstream_t3.view = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var HTML5AccessAPI = (function (_super) {
        __extends(HTML5AccessAPI, _super);
        function HTML5AccessAPI(player) {
            var _this = _super.call(this, player) || this;
            _this.UseHlsJs = false;
            _this.isSeeking = false;
            _this.isQuealitySelecting = false;
            _this.QuealitySelect_startTime = 0;
            _this.isFirstPlay = false;
            _this.video_event = "";
            _this.playCallTimeout = null;
            _this.LiveErrorCount = 0;
            _this.maxErrorCount = 3;
            _this.retryCount = 0;
            _this.retryDelay = 1000;
            _this.isTouching = false;
            _this.MOVIE_QUALITY_LIST_JA = ["自動", "低画質", "標準画質", "高画質", "ＨＤ画質", "フルＨＤ", "４Ｋ画質"];
            _this.MOVIE_QUALITY_LIST_EN = ["AUTO", "Low", "Standard", "High", "HD", "FullHD", "4K"];
            _this.isLanding = false;
            _this.canPlayHls = false;
            _this.canLoad = false;
            _this.edgeSwitchMovieSourceFlg = false;
            _this.waitChangeDurationTimeout = 8000;
            _this.limit_error = false;
            _this.isPaused = true;
            _this.isWait = true;
            _this.isStoped = false;
            _this.cntTryAttach = 0;
            _this.lastTime = 0;
            _this.last2Time = 0;
            _this.jmcPlayer = player;
            if (_this.LanguageResource == null) {
                var lang = "ja";
                if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                    lang = "en";
                }
                _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
            }
            return _this;
        }
        HTML5AccessAPI.prototype.setAuth = function () {
            if (!this.model.isAuthPassed) {
                if (this.model.a.indexOf(':') == -1 || this.model.a.split(":")[1].length < 1) {
                    this.showLoginForm();
                }
                else {
                    this.login(null, null);
                }
            }
            else {
                parent.location.href = this.model.movie_url;
            }
        };
        HTML5AccessAPI.prototype.showLoginForm = function (errorMessage) {
            if (errorMessage === void 0) { errorMessage = false; }
            if (this.model.responsive == "on" || this.model.responsive == "fit") {
            }
            var cssDir = this.model.playerDir + "resource/style/";
            jstream_t3.view.LoginFormView.show(this, this.model.fieldID, cssDir, errorMessage);
        };
        HTML5AccessAPI.prototype.login = function (id, pass) {
            var _this = this;
            var isPreSetAuthParam = false;
            var hashedPass = "";
            var orignePass = pass || "";
            if (id != null && pass != null) {
                var isAuthed = false;
                var md5_hexstr = MD5_hexhash(pass);
                id = jstream_t3.utils.Util.base64encode(id);
                hashedPass = md5_hexstr;
            }
            else if (id == null && pass == null) {
                isPreSetAuthParam = true;
                var splitAuthParam = this.model.a.split(":");
                id = jstream_t3.utils.Util.base64encode(splitAuthParam[0]);
                hashedPass = splitAuthParam[1];
            }
            this.model.a = encodeURIComponent(id + ":" + hashedPass);
            _super.prototype.loadAuthCheck.call(this, function (result) {
                if (isPreSetAuthParam) {
                    _this.model.a = "";
                }
                else {
                    _this.model.a = decodeURIComponent(_this.model.a);
                    var splitAuthParam = _this.model.a.split(":");
                    var id = jstream_t3.utils.Util.base64decode(splitAuthParam[0]);
                    var pass = orignePass;
                    _this.model.a = id + ":" + pass;
                }
                _this.authResult(result);
            });
        };
        HTML5AccessAPI.prototype.authResult = function (result) {
            if (this.model.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_NATIVE) {
                if (result) {
                    this.model.isAuthPassed = true;
                    this.model.setMovieMobileURL_AfterAuth();
                    parent.location.href = this.model.movie_url;
                }
                else {
                    this.showLoginForm(true);
                }
            }
            else if (this.model.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_STREAMING) {
                this.model.a = null;
                if (result) {
                    this.model.setMovieMobileURL_AfterAuth();
                    this.eqPlayer.html5Player.updateVideoURL(this.model.movie_url, true);
                }
                else {
                    this.eqPlayer.html5Player.updateVideoURL(null, false);
                }
            }
            else {
                if (result) {
                    if (this.UseHlsJs) {
                        this.model.isAuthPassed = true;
                        this.model.setMovieMobileURL_AfterAuth();
                        this.model.movie_url = this.model.movie_url;
                        this.eqPlayer.html5Player.setCurrentMovieURL(this.model.movie_url);
                        this.tryHlsLoad();
                    }
                    else {
                        this.model.setMovieMobileURL_AfterAuth();
                    }
                }
                this.model.a = null;
                this.eqPlayer.html5Player.authResult(result);
            }
        };
        HTML5AccessAPI.prototype.playerEnd = function (e) {
            this.videoLog(e);
            this.video_event = e.type;
            this.isPaused = true;
            this.chengeState(e);
            this.preSeekState = "complete";
            if (this.model.loop_use == "on") {
                this.StandByLoop();
            }
        };
        HTML5AccessAPI.prototype.playerInit = function () {
            var _this = this;
            _super.prototype.playerInit.call(this);
            if (this.model.platform["isSP"] || this.model.platform["isTablet"]) {
                this.isFirstPlay = true;
            }
            var video = this.getElement();
            video.addEventListener("playing", function (e) {
                _this.videoLog(e);
                _this.chengeState(e);
                _this.isPaused = false;
                _this.video_event = e.type;
                _this.preSeekState = "playing";
            });
            video.addEventListener("pause", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                if ((!_this.liveModel.isLive) && (_this.getTotalTime() - _this.getCurrentTime() <= 0.05)) {
                    return;
                }
                _this.isPaused = true;
                _this.chengeState(e);
                _this.preSeekState = "paused";
            });
            video.addEventListener("seeking", function (e) {
                _this.videoLog(e);
                if (_this.preSeekState == "landing" || _this.preSeekState == "complete")
                    return;
                _this.video_event = e.type;
                if (_this.isSeeking || _this.isTouching)
                    return;
                if (jstream_t3.utils.Util.isMobileList().Android4 || jstream_t3.utils.Util.isMobileList().Firefox)
                    return;
                _this.startSeek();
            });
            video.addEventListener("seeked", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                if (_this.isQuealitySelecting)
                    _this.isQuealitySelecting = false;
                if (_this.isTouching || !_this.isSeeking)
                    return;
                _this.completeSeek();
            });
            video.addEventListener("ended", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                _this.isPaused = true;
                _this.chengeState(e);
                _this.preSeekState = "complete";
                if (_this.model.loop_use == "on") {
                    _this.StandByLoop();
                }
            });
            video.addEventListener("timeupdate", function (e) {
                _this.video_event = e.type;
                var delay = 500;
                if (_this.model.platform["isSafari"]) {
                    delay = 1000;
                }
                setTimeout(function () {
                    _this.last2Time = _this.lastTime;
                    _this.lastTime = _this.eqPlayer.html5Player.getCurrentTime();
                }, delay);
                _this.videoLog(e);
                if (_this.isQuealitySelecting) {
                    _this.chengeState(e);
                }
            });
            video.addEventListener("loadeddata", function (e) {
                _this.videoLog(e);
            });
            video.addEventListener("loadedmetadata", function (e) {
                _this.videoLog(e);
            });
            video.addEventListener("error", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                if (!_this.liveModel.isLive) {
                    _this.dispatchEvent(new jstream_t3.events.ErrorEvent(jstream_t3.events.ErrorEvent.SERVER_MEDIA_ERROR));
                }
                else {
                    _this.setState("interrupted");
                }
            });
            var html5Player = this.eqPlayer.html5Player;
            var __setCurrentTime = html5Player.setCurrentTime;
            var initSeek = html5Player._init_video_seek;
            html5Player._init_video_seek = function () {
                initSeek();
                if (!html5Player._values.seek_use)
                    return;
                var rail = html5Player._values.movie_slider_obj.node_slider_rail;
                rail.addEventListener("touchstart", function (e) {
                    _this.seekStart();
                }, true);
                rail.addEventListener("touchend", function (e) {
                    _this.seekEnd();
                });
            };
            var selectQuality = html5Player._click_movie_select;
            html5Player._click_movie_select = function (index) {
                _this.QuealitySelect_startTime = video.currentTime;
                _this.isQuealitySelecting = true;
                _this.stopProgress();
                selectQuality(index);
            };
            var timer = setTimeout(function () {
                if (_this.model.inCookieVolume == "mute") {
                    _this.mute(true);
                }
                else {
                    var volume = parseInt(_this.model.inCookieVolume);
                    _this.setVolume(volume);
                }
                var slider = document.getElementById(_this.model.objectID + 'ctrl_volume_slider');
                if (slider) {
                    slider.style.display = "block";
                }
                _this.isLanding = true;
                _this.setState("landing");
            }, 1000);
        };
        HTML5AccessAPI.prototype.HlsPlayerInit = function (instance) {
            var _this = this;
            if (instance === void 0) { instance = null; }
            _super.prototype.playerInit.call(this);
            this.UseHlsJs = true;
            var video = this.getElement();
            video.addEventListener("playing", function (e) {
                if (!_this.edgeSwitchMovieSourceFlg) {
                    _this.videoLog(e);
                    _this.chengeState(e);
                    _this.isPaused = false;
                    _this.video_event = e.type;
                    _this.preSeekState = "playing";
                }
            });
            video.addEventListener("play", function (e) {
                if (_this.model.isLive) {
                    _this.LiveErrorCount = 0;
                }
            });
            video.addEventListener("pause", function (e) {
                if (!_this.edgeSwitchMovieSourceFlg) {
                    _this.videoLog(e);
                    _this.video_event = e.type;
                    _this.isPaused = true;
                    if ((!_this.liveModel.isLive) && (_this.getTotalTime() - _this.getCurrentTime() <= 0.05)) {
                        return;
                    }
                    _this.chengeState(e);
                    _this.preSeekState = "pause";
                }
            });
            video.addEventListener("seeking", function (e) {
                if (_this.preSeekState == "landing" || _this.preSeekState == "complete")
                    return;
                _this.videoLog(e);
                _this.video_event = e.type;
                if (_this.isSeeking || _this.isTouching)
                    return;
                if (jstream_t3.utils.Util.isMobileList().Android4 || jstream_t3.utils.Util.isMobileList().Firefox)
                    return;
                _this.startSeek();
            });
            video.addEventListener("seeked", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                if (_this.isQuealitySelecting)
                    _this.isQuealitySelecting = false;
                if (_this.isTouching || !_this.isSeeking)
                    return;
                _this.completeSeek();
            });
            video.addEventListener("ended", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                _this.isPaused = true;
                _this.chengeState(e);
                _this.preSeekState = "complete";
                if (_this.model.loop_use == "on") {
                    _this.StandByLoop();
                }
            });
            video.addEventListener("timeupdate", function (e) {
                _this.video_event = e.type;
                setTimeout(function () {
                    _this.last2Time = _this.lastTime;
                    _this.lastTime = video.currentTime;
                }, 500);
                _this.videoLog(e);
                if (_this.isQuealitySelecting) {
                    _this.chengeState(e);
                }
            });
            video.addEventListener("loadeddata", function (e) {
                _this.videoLog(e);
            });
            video.addEventListener("loadedmetadata", function (e) {
                _this.videoLog(e);
            });
            video.addEventListener("error", function (e) {
                _this.videoLog(e);
                _this.video_event = e.type;
                if (!_this.liveModel.isLive) {
                    _this.dispatchEvent(new jstream_t3.events.ErrorEvent(jstream_t3.events.ErrorEvent.SERVER_MEDIA_ERROR));
                }
                else {
                    _this.setState("interrupted");
                }
            });
            var html5Player = this.eqPlayer.html5Player;
            var __setCurrentTime = html5Player.setCurrentTime;
            var initSeek = html5Player._init_video_seek;
            html5Player._init_video_seek = function () {
                initSeek();
                if (!html5Player._values.seek_use)
                    return;
                var rail = html5Player._values.movie_slider_obj.node_slider_rail;
                rail.addEventListener("touchstart", function (e) {
                    _this.seekStart();
                }, true);
                rail.addEventListener("touchend", function (e) {
                    _this.seekEnd();
                });
            };
            var selectQuality = html5Player._click_movie_select;
            html5Player._click_movie_select = function (index) {
                _this.QuealitySelect_startTime = video.currentTime;
                _this.isQuealitySelecting = true;
                _this.stopProgress();
                selectQuality(index);
            };
            if (!this.model.isAuthEnable()) {
                this.loadingTimer = setInterval(function () {
                    _this.tryHlsLoad();
                }, 300);
            }
            else {
                this.landing();
            }
        };
        HTML5AccessAPI.prototype.tryHlsLoad = function () {
            var _this = this;
            try {
                var config;
                config = {
                    debug: this.model.isDebug,
                    startLevel: -1,
                    highBufferWatchdogPeriod: 30
                };
                this.hls = new Hls(config);
                this.setErrorHandler();
                this.hls.on("hlsMediaAttached", function () {
                    _this.landing();
                    _this.tryLoadMedia(_this.model.movie_url);
                });
                this.cntTryAttach++;
                this.hls.attachMedia(document.getElementById(this.model.objectID));
                clearInterval(this.loadingTimer);
            }
            catch (e) {
                if (this.cntTryAttach > 10) {
                    clearInterval(this.loadingTimer);
                }
            }
        };
        HTML5AccessAPI.prototype.tryLoadMedia = function (movie_url) {
            var _this = this;
            this.hls.on("hlsManifestParsed", function () {
                if (_this.model.isLive) {
                    _this.canPlayHls = true;
                    _this.canLoad = true;
                    _this.dispatchEvent("canPlayHls");
                }
                else {
                    var stopLoadHls = function () {
                        _this.hls.stopLoad();
                        _this.hls.off("hlsFragParsed", stopLoadHls);
                        _this.canLoad = true;
                    };
                    var firstFragBuffered = function () {
                        _this.hls.off("hlsFragBuffered", firstFragBuffered);
                        if (_this.model.default_quality == "0") {
                            _this.canPlayHls = true;
                        }
                        if (_this.model.isDebug) {
                            console.log("[debug] > frag buffered");
                        }
                    };
                    var firstFragSeeked = function () {
                        _this.getElement().removeEventListener("seeked", firstFragSeeked);
                        _this.canPlayHls = true;
                        if (_this.model.isDebug) {
                            console.log("[debug] > video seeked");
                            console.log("[debug] > can play hls");
                        }
                    };
                    var durationChanged = function () {
                        clearTimeout(_this.waitChangeDurationTimer);
                        _this.hls["media"].removeEventListener("durationchange", durationChanged);
                        _this.hls.stopLoad();
                        _this.canPlayHls = true;
                        _this.canLoad = true;
                        _this.dispatchEvent("canPlayHls");
                        if (_this.model.isDebug) {
                            console.log("[debug] > can play hls");
                        }
                    };
                    _this.hls["media"].addEventListener("durationchange", durationChanged);
                    _this.waitChangeDurationTimer = setTimeout(function () {
                        _this.hls["media"].removeEventListener("durationchange", durationChanged);
                        _this.hls.stopLoad();
                        _this.canPlayHls = true;
                        _this.canLoad = true;
                        _this.dispatchEvent("canPlayHls");
                        if (_this.model.isDebug) {
                            console.log("[debug] > durationchange timeout");
                        }
                    }, _this.waitChangeDurationTimeout);
                    _this.getElement().addEventListener("seeked", firstFragSeeked);
                }
            });
            this.hls.loadSource(movie_url);
        };
        HTML5AccessAPI.prototype.setErrorHandler = function () {
            var _this = this;
            try {
                this.hls.on("hlsError", function (event, data) {
                    var hlsErrorEvent = new CustomEvent("hlsError", {
                        detail: {
                            detail: hlsErrorEvent,
                            type: data.type,
                            fatal: data.fatal
                        }
                    });
                    _this.dispatchCustomEvent(hlsErrorEvent);
                    var errorType = data.type;
                    var errorDetails = data.details;
                    var errorFatal = data.fatal;
                    var errorEvent = data.event;
                    if (errorFatal) {
                        if (_this.model.isLive && errorType == "networkError") {
                            var waitElement = document.getElementById(_this.model.objectID + "play_state_liveWait");
                            if (!!waitElement) {
                                waitElement.style.display = "block";
                                var timeOut = 1000;
                                if (_this.model.isKollectiveEnable()) {
                                    timeOut = 5000;
                                }
                                setTimeout(function () {
                                    waitElement.style.display = "none";
                                    _this.hls.loadSource(_this.eqPlayer.html5Player.getCurrentMovieURL());
                                }, timeOut);
                            }
                            if (_this.model.isKollectiveEnable()) {
                            }
                            return;
                        }
                        _this.recoverTimer = setInterval(function () {
                            this.retryCount = 0;
                        }, _this.retryDelay * 4);
                        if (!!_this.errorData && _this.errorData.type == errorType) {
                            _this.retryCount += 1;
                        }
                        else {
                            _this.retryCount = 1;
                        }
                        _this.errorData = data;
                        switch (data.type) {
                            case "networkError":
                                if (_this.retryCount > _this.maxErrorCount) {
                                    _this.retryCount = 0;
                                    _this.eqPlayer.html5Player.set_info_error(errorDetails);
                                    return;
                                }
                                setTimeout(function () {
                                    _this.hls.startLoad();
                                }, _this.retryDelay);
                                break;
                            case "mediaError":
                                if (_this.retryCount > _this.maxErrorCount) {
                                    _this.retryCount = 0;
                                    _this.eqPlayer.html5Player.set_info_error(errorDetails);
                                    return;
                                }
                                setTimeout(function () {
                                    _this.hls.recoverMediaError();
                                }, _this.retryDelay);
                                break;
                            default:
                                _this.eqPlayer.html5Player.set_info_error(errorDetails);
                                _this.hls.destroy();
                                break;
                        }
                        return;
                    }
                    else {
                        switch (data.details) {
                            case "bufferStalledError":
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
            catch (e) {
            }
        };
        HTML5AccessAPI.prototype.landing = function () {
            var _this = this;
            if (!this.isLanding) {
                var timer = setTimeout(function () {
                    if (_this.model.inCookieVolume == "mute") {
                        _this.mute(true);
                    }
                    else {
                        var volume = parseInt(_this.model.inCookieVolume);
                        _this.setVolume(volume);
                    }
                    var slider = document.getElementById(_this.model.objectID + 'ctrl_volume_slider');
                    if (slider) {
                        slider.style.display = "block";
                    }
                    _this.isLanding = true;
                    _this.setState("landing");
                    _this.preSeekState = _this.state;
                }, 1000);
            }
        };
        HTML5AccessAPI.prototype.videoLog = function (e) {
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                video: e.type
            });
        };
        HTML5AccessAPI.prototype.startSeek = function () {
            if (this.preSeekState != "playing" && this.preSeekState != null) {
                this.preSeekState = this.state;
            }
            this.isSeeking = true;
            if (!this.isQuealitySelecting)
                this.setState("seek_start");
        };
        HTML5AccessAPI.prototype.completeSeek = function () {
            this.isSeeking = false;
            if (!this.isQuealitySelecting)
                this.setState(this.preSeekState == "playing" ? "playing" : "paused");
            this.preSeekState = this.state;
        };
        HTML5AccessAPI.prototype.seekStart = function () {
            this.isTouching = true;
            this.startSeek();
        };
        HTML5AccessAPI.prototype.seekEnd = function () {
            this.isTouching = false;
            if (this.isSeeking) {
                this.completeSeek();
            }
        };
        HTML5AccessAPI.prototype.timeupdate = function (e) {
            this.lastTime = this.getElement().currentTime;
        };
        HTML5AccessAPI.prototype.chengeState = function (e) {
            if (e.type == "timeupdate") {
                if (this.isQuealitySelecting && this.lastTime + 2 >= this.QuealitySelect_startTime) {
                    this.isQuealitySelecting = false;
                    if (this.state == "playing") {
                        this.startProgress();
                    }
                    else {
                    }
                }
                else {
                    if (!this.isQuealitySelecting) {
                    }
                    else if (!(this.lastTime + 2 >= this.QuealitySelect_startTime)) {
                    }
                }
                return;
            }
            if (this.isQuealitySelecting) {
                return;
            }
            if (this.isSeeking && e.type == "playing") {
                return;
            }
            if ((!this.liveModel.isLive) && (e.type == "pause" && this.getCurrentTime() == this.getTotalTime())) {
                return;
            }
            if (this.state == "complete" && e.type != "playing") {
                return;
            }
            if (e.type == "playing" && this.getCurrentTime() == 0) {
                this.inited = true;
            }
            if (this.liveModel.isLive)
                this.inited = true;
            if ((this.liveModel.isLive) && (e.type == "ended")) {
                this.setState("interrupted");
                return;
            }
            var labels = {
                playing: "playing",
                pause: "paused",
                ended: "complete"
            };
            var state = labels[e.type];
            this.setState(state);
        };
        HTML5AccessAPI.prototype.setState = function (state) {
            if (state != this.state) {
                if (state != "exit" && state != "landing") {
                    var AccessAPI = this;
                    if (AccessAPI.model.resumeVolumeEnable == "on") {
                        if (this.model.CookieDomain) {
                            var name = "EQPlayer_resume_Volume";
                            var value;
                            var path = '/';
                            var period;
                            if (AccessAPI.isMuted && AccessAPI.isMuted()) {
                                value = "mute";
                            }
                            else {
                                value = AccessAPI.getVolume().toString();
                            }
                            jstream_t3.utils.Util.SetCookie(name, value, path, period, this.model.CookieDomain);
                        }
                    }
                }
                _super.prototype.setState.call(this, state);
            }
        };
        HTML5AccessAPI.prototype._getCurrentTime = function () {
            var video = this.getElement();
            var time = this.eqPlayer.html5Player ? this.eqPlayer.html5Player.getCurrentTime() : -1;
            return Math.floor(time * 1000) / 1000;
        };
        HTML5AccessAPI.prototype.getCurrentTime = function () {
            if (this.liveModel.isLive) {
                return this._getCurrentTime();
            }
            else {
                var playhead = this._getCurrentTime();
                return playhead;
            }
        };
        HTML5AccessAPI.prototype.getTotalTime = function () {
            var time = this.getElement().duration;
            if (!isFinite(time) || time > Number(this.model.duration) + 1 || time < Number(this.model.duration) - 1) {
                time = Number(this.model.duration);
            }
            if (this.liveModel.isLive) {
                return Math.floor(time * 1000) / 1000;
            }
            else {
                return Math.floor(time * 1000) / 1000;
            }
        };
        HTML5AccessAPI.prototype.setStartTime = function (time) {
            if (!this.validateSeek(time)) {
                return;
            }
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.setStartTime"
            });
            if (!this.liveModel.isLive) {
                this.setCurrentTime(time);
                this.play();
            }
            if (this.progressItervalID) {
                this.sendPlayerValues();
            }
        };
        HTML5AccessAPI.prototype.setCurrentTime = function (time) {
            if (!this.validateSeek(time)) {
                return;
            }
            if (time == 0) {
                time = 0.1;
            }
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.setCurrentTime"
            });
            if (!this.liveModel.isLive) {
                this.eqPlayer.html5Player.setCurrentTime(time);
            }
            if (this.progressItervalID) {
                this.sendPlayerValues();
            }
        };
        HTML5AccessAPI.prototype.showLimitError = function () {
            if (this.LanguageResource == null) {
                var lang = "ja";
                if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                    lang = "en";
                }
                this.LanguageResource = new jstream_t3.resource.LanguageResource(this.model["language_resource_" + lang]);
            }
            if (this.model.isLive) {
                this.liveModel.liveLid = this.liveModel.getLiveLidURL();
                this.showError(jstream_t3.events.ErrorEvent.LIVELIMIT_LOAD_ERROR, this.LanguageResource.kinds.P3502M, this.LanguageResource.kinds.P3502T);
                this.setState("complete");
                if (this.hls) {
                    this.hls.destroy();
                }
            }
            else {
                this.showError(jstream_t3.events.ErrorEvent.LIVELIMIT_LOAD_ERROR, this.LanguageResource.kinds.P3502M, this.LanguageResource.kinds.P3502T);
            }
        };
        HTML5AccessAPI.prototype.playCall = function (stat) {
            var _this = this;
            if (stat === void 0) { stat = ""; }
            this.model.stat = (stat == "update" ? "2" : "1");
            if ((this.model.platform["isSP"] || this.model.platform["isTablet"]) && (this.model.isCheckConnectionPassed == "NG" || this.model.isCheckConnectionPassed == "undefined") && stat != "update") {
                if (this.isPaused) {
                    _super.prototype.loadCheckConnectionResult.call(this, function (result) {
                        if (_this.model.connection_limit > _this.model.currentConnecting) {
                            _this.model.isCheckConnectionPassed = "OK";
                            _this.limit_error = false;
                        }
                        else {
                            if (stat != "wait") {
                                _this.showLimitError();
                                _this.hls.stopLoad();
                                _this.hls.destroy();
                                return;
                            }
                            else {
                                _this.limit_error = true;
                            }
                        }
                        if (!_this.playCallTimeout) {
                            _this.playCallTimeout = setTimeout(function () {
                                _this.playCallTimeout = null;
                                _this.model.isCheckConnectionPassed = "NG";
                                if (_this.isPaused) {
                                    _this.isWait = true;
                                }
                                else {
                                    _this.isWait = false;
                                }
                                _this.playCall("result");
                            }, 30000);
                        }
                    });
                }
                if (!this.playCallTimeout) {
                    this.playCallTimeout = setTimeout(function () {
                        _this.playCallTimeout = null;
                        _this.model.isCheckConnectionPassed = "NG";
                        if (_this.isPaused) {
                            _this.isWait = true;
                        }
                        else {
                            _this.isWait = false;
                        }
                        _this.playCall("result");
                    }, 30000);
                }
            }
            else {
                _super.prototype.loadCheckConnection.call(this, function (result) {
                    if (stat == "update") {
                        if (_this.model.isCheckConnectionPassed != "NG") {
                            _this.model.isCheckConnectionPassed = "OK";
                        }
                        if (!_this.playCallTimeout) {
                            _this.playCallTimeout = setTimeout(function () {
                                _this.model.isCheckConnectionPassed = "NG";
                                _this.playCallTimeout = null;
                                if (_this.model.platform["isSP"] || _this.model.platform["isTablet"]) {
                                    if (_this.isPaused) {
                                        _this.isWait = true;
                                    }
                                    else {
                                        _this.isWait = false;
                                    }
                                    _this.playCall("result");
                                }
                            }, 30000);
                        }
                        return;
                    }
                    if (_this.model.isCheckConnectionPassed != "NG") {
                        _this.model.isCheckConnectionPassed = "OK";
                        _this.isWait = false;
                        if (stat != "update") {
                            if (!(_this.model.platform["isSP"] || _this.model.platform["isTablet"])) {
                                _this.play();
                            }
                        }
                        if (!_this.playCallTimeout) {
                            _this.playCallTimeout = setTimeout(function () {
                                _this.model.isCheckConnectionPassed = "NG";
                                _this.playCallTimeout = null;
                            }, 30000);
                        }
                    }
                    else {
                        _this.showLimitError();
                    }
                });
            }
        };
        HTML5AccessAPI.prototype.StandByLoop = function () {
            var _this = this;
            setTimeout(function () {
                _this.eqPlayer.html5Player.setloop();
            }, 10);
        };
        HTML5AccessAPI.prototype.play = function () {
            this.eqPlayer.html5Player.play();
        };
        HTML5AccessAPI.prototype.pause = function () {
            if (!this.isPlayed)
                return;
            if (this.state == "complete" || this.state == "paused") {
                return;
            }
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                action: "api.pause"
            });
            this.eqPlayer.html5Player.pause();
            _super.prototype.pause.call(this);
            if (this.progressItervalID) {
                this.sendPlayerValues();
            }
        };
        HTML5AccessAPI.prototype.createPlayer = function () {
            var success;
            if (!this.liveModel.isLive) {
                success = this.model.parce();
            }
            else {
                success = this.liveModel.parseLive();
            }
            if (!success) {
                return;
            }
            jstream_t3.PlatformBuilderFactory.create(this.model, this).build();
        };
        HTML5AccessAPI.prototype.changeQuality = function (value) {
            if (value == this.getQuality()) {
                return;
            }
            if (typeof value == "number" && value >= 0 && value < 7) {
                jstream_t3.utils.Logger.stateLog({
                    time: this.getCurrentTime(),
                    action: "api.changeQuality"
                });
                var index = this.getQualityLabel(value);
                if (index >= 0) {
                    if (this.model.isAuthEnable()) {
                        this.eqPlayer.html5Player.setCurrentMovieURL(this.model.movie_list[index].url);
                    }
                    else {
                        this.eqPlayer.html5Player.changeQuality(this.model.movie_list[index].url);
                    }
                }
                else {
                }
            }
            if (this.progressItervalID) {
                this.sendPlayerValues();
            }
        };
        HTML5AccessAPI.prototype.getQualityLabel = function (index) {
            var movie_quality_list;
            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                movie_quality_list = this.MOVIE_QUALITY_LIST_JA;
            }
            else {
                movie_quality_list = this.MOVIE_QUALITY_LIST_EN;
            }
            for (var i = 0; i < this.model.movie_list.length; i++) {
                if (this.model.movie_list[i].text == movie_quality_list[index]) {
                    return i;
                }
            }
            return -1;
        };
        HTML5AccessAPI.prototype.getQualityVal = function (text) {
            var movie_quality_list;
            if (jstream_t3.utils.Util.browserLanguage() == "ja") {
                movie_quality_list = this.MOVIE_QUALITY_LIST_JA;
            }
            else {
                movie_quality_list = this.MOVIE_QUALITY_LIST_EN;
            }
            for (var i = 0; i < movie_quality_list.length; i++) {
                if (movie_quality_list[i] == text) {
                    return i;
                }
            }
            return -1;
        };
        HTML5AccessAPI.prototype.getQuality = function () {
            if (this.eqPlayer.html5Player) {
                var src = this.eqPlayer.html5Player.getCurrentMovieURL();
                for (var i = 0; i < this.model.movie_list.length; i++) {
                    if (this.model.movie_list[i].url == src) {
                        var val = this.getQualityVal(this.model.movie_list[i].text);
                        return val;
                    }
                }
            }
            return -1;
        };
        HTML5AccessAPI.prototype.mute = function (value) {
            if (typeof value === "boolean") {
                jstream_t3.utils.Logger.stateLog({
                    time: this.getCurrentTime(),
                    action: "api.mute"
                });
                if (this.progressItervalID) {
                    this.sendPlayerValues();
                }
                return this.eqPlayer.html5Player.setMute(value);
            }
            else {
                return this.isMuted();
            }
        };
        HTML5AccessAPI.prototype.isMuted = function () {
            if (this.getElement()) {
                return this.getElement().muted;
            }
            else {
                return false;
            }
        };
        HTML5AccessAPI.prototype.setVolume = function (volume) {
            if (typeof volume === "number" && volume >= 0 && volume <= 100 && volume % 1 == 0) {
                jstream_t3.utils.Logger.stateLog({
                    time: this.getCurrentTime(),
                    action: "api.setVolume"
                });
                if (this.eqPlayer.html5Player.setVolume) {
                    this.eqPlayer.html5Player.setVolume(volume / 100);
                }
            }
            if (this.progressItervalID) {
                this.sendPlayerValues();
            }
        };
        HTML5AccessAPI.prototype.getVolume = function () {
            if (this.getElement()) {
                return Math.floor(this.getElement().volume * 100);
            }
            else {
                return 100;
            }
        };
        HTML5AccessAPI.prototype.getPlaybackRate = function () {
            if (this.getElement()) {
                return Number(this.getElement().playbackRate);
            }
            return;
        };
        HTML5AccessAPI.prototype.setPlaybackRate = function (pr) {
            if (!this.liveModel.isLive)
                this.eqPlayer.html5Player.changePlaybackRate(pr);
            if (this.progressItervalID) {
                this.sendPlayerValues();
            }
        };
        HTML5AccessAPI.prototype.getCurrentAPI = function () {
            if (!this.isLanding) {
                return "isNotReady";
            }
            if (this.model.getEnvironmentType() == jstream_t3.EnviromentKind.MOBILE_NATIVE) {
                return "NativeHLS";
            }
            return "HTML5API";
        };
        HTML5AccessAPI.prototype.displayRefresh = function () {
            this.eqPlayer.html5Player.displayRefresh();
        };
        HTML5AccessAPI.prototype.playerSkinConfig = function (config) {
            var configObj = {
                color: {
                    controlbar: "rgba(34,34,34,0.8)",
                    seekbar: "#f8cb08",
                    titlebar: "rgba(34,34,34,0.8)",
                    highlight: "#FFAA00"
                },
                font: {
                    color: "white",
                    family: "arial,sans-serif"
                },
                thumbnail: this.model.thumbnail_url
            };
            for (var prop in config) {
                switch (prop) {
                    case "color":
                        for (var colorProp in config[prop]) {
                            configObj.color[colorProp] = config[prop][colorProp];
                        }
                        break;
                    case "font":
                        for (var fontProp in config[prop]) {
                            configObj.color[fontProp] = config[prop][fontProp];
                        }
                        break;
                    case "thumbnail":
                        configObj[prop] = config[prop];
                        break;
                }
            }
        };
        HTML5AccessAPI.prototype.destroy = function () {
            this.canPlayHls = false;
            this.isFirstPlay = false;
            this.canLoad = false;
            this.edgeSwitchMovieSourceFlg = false;
            this.isWait = true;
        };
        return HTML5AccessAPI;
    }(jstream_t3.EQPlayerAccessAPI));
    jstream_t3.HTML5AccessAPI = HTML5AccessAPI;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var IFrameAccsessAPI = (function (_super) {
        __extends(IFrameAccsessAPI, _super);
        function IFrameAccsessAPI(player) {
            var _this = _super.call(this, player) || this;
            _this.UseHlsJs = false;
            _this.isSeeking = false;
            _this.isQuealitySelecting = false;
            _this.QuealitySelect_startTime = 0;
            _this.isFirstPlay = true;
            _this.video_event = "";
            _this.playCallTimeout = null;
            _this.LiveErrorCount = 0;
            _this.isTouching = false;
            _this.MOVIE_QUALITY_LIST_JA = ["自動", "低画質", "標準画質", "高画質", "ＨＤ画質", "フルＨＤ", "４Ｋ画質"];
            _this.MOVIE_QUALITY_LIST_EN = ["AUTO", "Low", "Standard", "High", "HD", "FullHD", "4K"];
            _this.isLanding = false;
            _this.jmcPlayer = player;
            if (_this.LanguageResource == null) {
                var lang = "ja";
                if (jstream_t3.utils.Util.browserLanguage() != "ja") {
                    lang = "en";
                }
                _this.LanguageResource = new jstream_t3.resource.LanguageResource(_this.model["language_resource_" + lang]);
            }
            _this.setWindowMessage();
            return _this;
        }
        IFrameAccsessAPI.prototype.setWindowMessage = function () {
            var _this = this;
            if (this.model.platform["isIE"] && this.model.platform["browser"]["version"] < 9) {
                try {
                    this.tryGetIframeElement();
                    if (!!this.iframeElement && !!this.iframeElement.src) {
                        var msg = this.generateMessage("apiReady", this.model.iframeID);
                        this.sendMessage(msg);
                        var landingTimer = setInterval(function () {
                            if (!_this.isLanding) {
                                _this.sendMessage(msg);
                            }
                        }, 100);
                    }
                    else {
                        var timer = setInterval(function () {
                            _this.tryGetIframeElement();
                            if (!!_this.iframeElement && !!_this.iframeElement.src) {
                                clearInterval(timer);
                                var msg = _this.generateMessage("apiReady", _this.model.iframeID);
                                _this.sendMessage(msg);
                                var landingTimer = setInterval(function () {
                                    if (!_this.isLanding) {
                                        _this.sendMessage(msg);
                                    }
                                }, 100);
                            }
                        }, 100);
                    }
                }
                catch (err) {
                }
                window.attachEvent("onmessage", function (event) {
                    try {
                        var p = jstream_t3.utils.Util.parse_uri(_this.iframeElement.src);
                        var origin = p.scheme + "://" + p.authority;
                        if (event["origin"] !== origin) {
                            return;
                        }
                        if (event["srcElement"]["location"]["href"] != _this.iframeElement.src) {
                            return;
                        }
                        var data;
                        if (_this.model.platform["isIE"] && _this.model.platform["browser"]["version"] < 10) {
                            data = jstream_t3.utils.Util.messageRevertForLagacy(event["data"]);
                        }
                        else {
                            data = event["data"];
                        }
                        if (data.iframeID != _this.model.iframeID) {
                            return;
                        }
                        switch (data.msg) {
                            case "setState":
                                if (data.value == "landing") {
                                    _this.isLanding = true;
                                }
                                _this.setState(data.value);
                                break;
                            case "progress":
                                _this.setPlayerValue(data.value);
                                break;
                        }
                    }
                    catch (err) {
                    }
                });
            }
            else {
                try {
                    this.tryGetIframeElement();
                    if (!!this.iframeElement && !!this.iframeElement.src) {
                        var msg = this.generateMessage("apiReady", this.model.iframeID);
                        this.sendMessage(msg);
                        var landingTimer = setInterval(function () {
                            if (!_this.isLanding) {
                                _this.sendMessage(msg);
                            }
                        }, 100);
                    }
                    else {
                        var timer = setInterval(function () {
                            _this.tryGetIframeElement();
                            if (!!_this.iframeElement && !!_this.iframeElement.src) {
                                clearInterval(timer);
                                var msg = _this.generateMessage("apiReady", _this.model.iframeID);
                                _this.sendMessage(msg);
                                var landingTimer = setInterval(function () {
                                    if (!_this.isLanding) {
                                        _this.sendMessage(msg);
                                    }
                                }, 100);
                            }
                        }, 100);
                    }
                }
                catch (err) {
                }
                window.addEventListener("message", function (event) {
                    try {
                        var p = jstream_t3.utils.Util.parse_uri(_this.iframeElement.src);
                        var origin = p.scheme + "://" + p.authority;
                        if (event.origin !== origin) {
                            return;
                        }
                        var data;
                        if (_this.model.platform["isIE"] && _this.model.platform["browser"]["version"] < 10) {
                            data = jstream_t3.utils.Util.messageRevertForLagacy(event.data);
                        }
                        else {
                            data = event.data;
                        }
                        if (data.iframeID != _this.model.iframeID) {
                            return;
                        }
                        switch (data.msg) {
                            case "setState":
                                if (data.value == "landing") {
                                    _this.isLanding = true;
                                }
                                _this.setState(data.value);
                                break;
                            case "progress":
                                _this.setPlayerValue(data.value);
                                break;
                        }
                    }
                    catch (err) {
                    }
                });
            }
        };
        IFrameAccsessAPI.prototype.playerInit = function () {
            _super.prototype.playerInit.call(this);
        };
        IFrameAccsessAPI.prototype.tryGetIframeElement = function () {
            try {
                this.iframeElement = document.getElementById(this.model.iframeID);
            }
            catch (err) {
            }
        };
        IFrameAccsessAPI.prototype.sendMessage = function (msg) {
            try {
            	/*
                if (!!this.iframeElement && !!this.iframeElement.contentWindow) {
                    if (this.model.platform["isIE"] && this.model.platform["browser"]["version"] < 10) {
                        this.iframeElement.contentWindow.postMessage(msg.convertForLegacy(), this.iframeElement.src);
                    }
                    else {
                        this.iframeElement.contentWindow.postMessage(msg, this.iframeElement.src);
                    }
                }
                */
            }
            catch (err) {
            }
        };
        IFrameAccsessAPI.prototype.generateMessage = function (func, arg) {
            var msg = new sendMessageModel(func, arg);
            return msg;
        };
        IFrameAccsessAPI.prototype.setPlayerValue = function (values) {
            this.currentTime = Number(values.currentTime);
            this.totalTime = Number(values.totalTime);
            this.quality = Number(values.quality);
            this.isMute = values.isMute;
            this.volume = Number(values.volume);
            this.playbackRate = Number(values.playbackRate);
            this.currentAPI = values.currentAPI.toString();
        };
        IFrameAccsessAPI.prototype.setState = function (state) {
            if (state != this.state) {
                if (state != "exit" && state != "landing") {
                    var AccessAPI = this;
                    if (AccessAPI.model.resumeVolumeEnable == "on") {
                        if (this.model.CookieDomain) {
                            var name = "EQPlayer_resume_Volume";
                            var value;
                            var path = '/';
                            var period;
                            if (AccessAPI.isMuted && AccessAPI.isMuted()) {
                                value = "mute";
                            }
                            else {
                                value = AccessAPI.getVolume().toString();
                            }
                            jstream_t3.utils.Util.SetCookie(name, value, path, period, this.model.CookieDomain);
                        }
                    }
                }
                _super.prototype.setState.call(this, state);
            }
        };
        IFrameAccsessAPI.prototype.videoLog = function (e) {
            jstream_t3.utils.Logger.stateLog({
                time: this.getCurrentTime(),
                video: e.type
            });
        };
        IFrameAccsessAPI.prototype.getCurrentTime = function () {
            return this.currentTime;
        };
        IFrameAccsessAPI.prototype.getTotalTime = function () {
            return this.totalTime;
        };
        IFrameAccsessAPI.prototype.setStartTime = function (time) {
            var msg = this.generateMessage("setStartTime", time);
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.setCurrentTime = function (time) {
            var msg = this.generateMessage("setCurrentTime", time);
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.playCall = function (stat) {
            if (stat === void 0) { stat = ""; }
        };
        IFrameAccsessAPI.prototype.play = function () {
            var msg = this.generateMessage("play");
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.pause = function () {
            var msg = this.generateMessage("pause");
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.createPlayer = function () {
        };
        IFrameAccsessAPI.prototype.changeQuality = function (value) {
            var msg = this.generateMessage("changeQuality", value);
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.getQualityLabel = function (index) {
            return;
        };
        IFrameAccsessAPI.prototype.getQualityVal = function (text) {
            return;
        };
        IFrameAccsessAPI.prototype.getQuality = function () {
            return this.quality;
        };
        IFrameAccsessAPI.prototype.mute = function (value) {
            var msg = this.generateMessage("mute", value);
            this.sendMessage(msg);
            return;
        };
        IFrameAccsessAPI.prototype.isMuted = function () {
            return this.isMute;
        };
        IFrameAccsessAPI.prototype.setVolume = function (volume) {
            var msg = this.generateMessage("setVolume", volume);
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.getVolume = function () {
            return this.volume;
        };
        IFrameAccsessAPI.prototype.getPlaybackRate = function () {
            return this.playbackRate;
        };
        IFrameAccsessAPI.prototype.setPlaybackRate = function (pr) {
            var msg = this.generateMessage("setPlaybackRate", pr);
            this.sendMessage(msg);
        };
        IFrameAccsessAPI.prototype.getCurrentAPI = function () {
            return this.currentAPI;
        };
        IFrameAccsessAPI.prototype.displayRefresh = function () {
            var msg = this.generateMessage("displayRefresh");
            this.sendMessage(msg);
        };
        return IFrameAccsessAPI;
    }(jstream_t3.EQPlayerAccessAPI));
    jstream_t3.IFrameAccsessAPI = IFrameAccsessAPI;
    var sendMessageModel = (function () {
        function sendMessageModel(functionName, args) {
            this.func = functionName;
            this.arg = args;
        }
        sendMessageModel.prototype.convertForLegacy = function () {
            var stringMessage = "";
            stringMessage = this.func + "," + this.arg;
            return stringMessage;
        };
        return sendMessageModel;
    }());
    jstream_t3.sendMessageModel = sendMessageModel;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var EQPlayerAccessAPIBuilder = (function () {
        function EQPlayerAccessAPIBuilder() {
        }
        EQPlayerAccessAPIBuilder.create = function (eqPlayer) {
            var api;
            if (eqPlayer.flashVars.isIframe && !eqPlayer.flashVars.isInIframe) {
                return new jstream_t3.IFrameAccsessAPI(eqPlayer);
            }
            if (eqPlayer.flashVars.mode == "flash") {
                return new jstream_t3.SWFAccessAPI(eqPlayer);
            }
            var platform = eqPlayer.flashVars.platform;
            if (eqPlayer.flashVars.pd_enable == undefined) {
                if (platform["isSP"] || platform["isTablet"]) {
                    if (document.createElement('video').canPlayType) {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                    else if (jstream_t3.utils.Util.isFlash()) {
                        api = new jstream_t3.SWFAccessAPI(eqPlayer);
                    }
                    else {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                }
                else if (!document.createElement('video').canPlayType) {
                    api = new jstream_t3.SWFAccessAPI(eqPlayer);
                }
                else if (platform["isIE"] &&
                    ((platform["browser"]["version"] == "11.0" && platform["os"]["name"] == "Windows" && platform["os"]["version"] == "7")
                        || Number(platform["browser"]["version"]) <= 10) || (platform["isSafari"] && platform["os"]["name"] == "Macintosh" && Number(platform["browser"]["version"].split(".")[0]) <= 8)) {
                    api = new jstream_t3.SWFAccessAPI(eqPlayer);
                }
                else {
                    api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                }
            }
            else {
                if (platform["isSP"] || platform["isTablet"]) {
                    if (document.createElement('video').canPlayType) {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                    else if (jstream_t3.utils.Util.isFlash()) {
                        api = new jstream_t3.SWFAccessAPI(eqPlayer);
                    }
                    else {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                }
                else if (!document.createElement('video').canPlayType) {
                    api = new jstream_t3.SWFAccessAPI(eqPlayer);
                }
                else if (eqPlayer.flashVars.pd_enable == "1") {
                    if ((platform["isIE"] && Number(platform["browser"]["version"]) < 10) || (platform["isSafari"] && platform["os"]["name"] == "Macintosh" && Number(platform["browser"]["version"].split(".")[0]) <= 8)) {
                        api = new jstream_t3.SWFAccessAPI(eqPlayer);
                    }
                    else {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                }
                else {
                    if (platform["isIE"] &&
                        ((platform["browser"]["version"] == "11.0" && platform["os"]["name"] == "Windows" && platform["os"]["version"] == "7")
                            || Number(platform["browser"]["version"]) <= 10) || (platform["isSafari"] && platform["os"]["name"] == "Macintosh" && Number(platform["browser"]["version"].split(".")[0]) <= 8)) {
                        api = new jstream_t3.SWFAccessAPI(eqPlayer);
                    }
                    else if ((platform["isSafari"] && platform["os"]["name"] == "Macintosh" && Number(platform["browser"]["version"].split(".")[0]) >= 9)) {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                    else {
                        api = new jstream_t3.HTML5AccessAPI(eqPlayer);
                    }
                }
            }
            return api;
        };
        return EQPlayerAccessAPIBuilder;
    }());
    jstream_t3.EQPlayerAccessAPIBuilder = EQPlayerAccessAPIBuilder;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var view;
    (function (view) {
        var LoginFormView = (function () {
            function LoginFormView() {
            }
            LoginFormView.show = function (accesser, parentElementId, cssDir, errorMessage) {
                if (parentElementId === void 0) { parentElementId = null; }
                if (cssDir === void 0) { cssDir = ""; }
                if (errorMessage === void 0) { errorMessage = false; }
                var errorAlert = '<div id=#IDlogin class="info" style="top:#top;left:#left; width:#width#; display:inline; position:absolute;"><div class="info_header"><div class="info_title">動画認証</div></div><div class="info_main" style="display: table-cell !important;"><div id = "loginform" ><div>ID <input type="text" name="id" value=""/ ></div><div>PASS <input type="text" name="pass" value=""/ ></div></div></div></div>';
                var targetElement = !parentElementId ? document.body : document.getElementById(parentElementId + "video_operation");
                targetElement = !targetElement ? document.getElementById(parentElementId) : targetElement;
                var blockElement = document.createElement("div");
                blockElement.id = parentElementId + "block_layer";
                blockElement.style.display = "block";
                blockElement.style.position = "absolute";
                blockElement.style.height = "100%";
                blockElement.style.width = "100%";
                blockElement.style.left = "0";
                blockElement.style.top = "0";
                targetElement.appendChild(blockElement);
                var w = targetElement.clientWidth;
                var h = targetElement.clientHeight;
                var width = Math.max(w * 0.8, 150);
                var height = Math.max((h - 30 - 50) * 0.8, 136 - 30);
                var left = (w - width) / 2;
                var top = (h - height) / 2;
                var cssType = "";
                var size = 14;
                if (w < 240 || h < 180) {
                    cssType = "_ss";
                    size = 12;
                    height = h;
                    top = 0;
                }
                else if (w < 320 || h < 240) {
                    cssType = "_s";
                    size = 14;
                }
                var headerHeight = cssType == "" ? 40 : 30;
                var splitAuthParam = accesser.model.a.split(":");
                var id = splitAuthParam[0];
                var pass = splitAuthParam.length >= 2 ? splitAuthParam[1] : "";
                var languageResource = new jstream_t3.resource.LanguageResource();
                var headerText = languageResource.kinds.AUTH;
                var color = '#FFFFFF';
                if (errorMessage) {
                    headerText = languageResource.kinds.ERROR_AUTH;
                    color = '#FF7474';
                }
                var div = document.createElement("div");
                div.id = parentElementId + "login";
                div.className = "info";
                div.style.left = left + "px";
                div.style.top = top + "px";
                div.style.width = width + "px";
                div.style.height = height + "px";
                div.style.display = "block";
                div.style.position = "absolute";
                div.style.overflow = "hidden";
                if (accesser.model.platform["isIE"] && Number(accesser.model.platform["browser"]["version"]) < 10) {
                    div.style.background = "rgb(34,34,34)";
                }
                else {
                    div.style.background = "rgba(34,34,34,0.8)";
                }
                div.style.borderColor = "rgb(94,94,94)";
                div.style.borderStyle = "solid";
                div.style.borderWidth = "1px";
                div.style.zIndex = "50";
                targetElement.appendChild(div);
                var info_header = document.createElement("div");
                info_header.id = parentElementId + 'login_header';
                info_header.className = 'info_header' + cssType;
                div.appendChild(info_header);
                var info_iocn = document.createElement("div");
                info_iocn.id = parentElementId + 'login_header';
                info_iocn.className = 'info_icon_alert';
                info_header.appendChild(info_iocn);
                var info_title = document.createElement("div");
                info_title.id = parentElementId + 'login_title';
                info_title.className = 'info_title' + cssType;
                info_title.style.color = color;
                info_title.innerText = headerText;
                info_header.appendChild(info_title);
                var info_main = document.createElement("div");
                info_main.id = parentElementId + 'login_main';
                info_main.className = 'info_main' + cssType;
                info_main.style.width = width + 'px';
                info_main.style.height = height - headerHeight + 'px';
                info_main.style.left = left + 'px';
                info_main.style.top = top + 'px';
                div.appendChild(info_main);
                var info_auth = document.createElement("div");
                info_auth.id = parentElementId + 'loginform';
                info_auth.className = 'info_auth';
                info_auth.style.position = 'relative';
                info_main.appendChild(info_auth);
                var id_text_div = document.createElement("div");
                id_text_div.className = 'login_text_input' + cssType;
                info_auth.appendChild(id_text_div);
                var loginID = document.createElement("input");
                loginID.id = parentElementId + 'loginID';
                loginID.name = 'id';
                loginID.type = 'text';
                loginID.align = 'left';
                loginID.placeholder = languageResource.kinds.ID;
                loginID.size = size;
                id_text_div.appendChild(loginID);
                var pass_text_div = document.createElement("div");
                pass_text_div.className = 'login_text_input' + cssType;
                info_auth.appendChild(pass_text_div);
                var loginPASS = document.createElement("input");
                loginPASS.id = parentElementId + 'loginID';
                loginPASS.name = 'id';
                loginPASS.type = 'password';
                loginPASS.align = 'left';
                loginPASS.placeholder = languageResource.kinds.PASS;
                loginPASS.size = size;
                pass_text_div.appendChild(loginPASS);
                var login_button = document.createElement('button');
                login_button.className = 'login_button_input' + cssType;
                login_button.id = parentElementId + 'login_btn';
                login_button.style.width = "90px";
                login_button.style.height = "20px";
                login_button.innerText = languageResource.kinds.PLAY;
                info_main.appendChild(login_button);
                if (accesser.model.platform["isIE"] && Number(accesser.model.platform["browser"]["version"]) < 10) {
                    info_auth.style.marginTop = ((height - headerHeight) / 2 - (72 / 2)) + "px";
                }
                var form = document.getElementById(parentElementId + "loginform");
                var button = document.getElementById(parentElementId + "login_btn");
                var idText = loginID;
                var passText = loginPASS;
                idText.focus();
                button.onclick = function (e) {
                    var loginElement = document.getElementById(parentElementId + "login");
                    targetElement.removeChild(loginElement);
                    var blockElement = document.getElementById(parentElementId + "block_layer");
                    targetElement.removeChild(blockElement);
                    var id = idText.value;
                    var pass = passText.value;
                    accesser.login(id, pass);
                };
                idText.onkeydown = function (e) {
                    if (e == null || e == undefined) {
                        if (e.keyCode == 13) {
                            var loginElement = document.getElementById(parentElementId + "login");
                            targetElement.removeChild(loginElement);
                            var blockElement = document.getElementById(parentElementId + "block_layer");
                            targetElement.removeChild(blockElement);
                            var id = idText.value;
                            var pass = passText.value;
                            accesser.login(id, pass);
                        }
                    }
                    else {
                        if (e.keyCode == 13) {
                            var loginElement = document.getElementById(parentElementId + "login");
                            targetElement.removeChild(loginElement);
                            var blockElement = document.getElementById(parentElementId + "block_layer");
                            targetElement.removeChild(blockElement);
                            var id = idText.value;
                            var pass = passText.value;
                            accesser.login(id, pass);
                        }
                    }
                };
                passText.onkeydown = function (e) {
                    if (e == null || e == undefined) {
                        if (e.keyCode == 13) {
                            var loginElement = document.getElementById(parentElementId + "login");
                            targetElement.removeChild(loginElement);
                            var blockElement = document.getElementById(parentElementId + "block_layer");
                            targetElement.removeChild(blockElement);
                            var id = idText.value;
                            var pass = passText.value;
                            accesser.login(id, pass);
                        }
                    }
                    else {
                        if (e.keyCode == 13) {
                            var loginElement = document.getElementById(parentElementId + "login");
                            targetElement.removeChild(loginElement);
                            var blockElement = document.getElementById(parentElementId + "block_layer");
                            targetElement.removeChild(blockElement);
                            var id = idText.value;
                            var pass = passText.value;
                            accesser.login(id, pass);
                        }
                    }
                };
                document.getElementById(parentElementId + "loginform").appendChild(button);
            };
            return LoginFormView;
        }());
        view.LoginFormView = LoginFormView;
    })(view = jstream_t3.view || (jstream_t3.view = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var NetService = (function () {
        function NetService() {
            this.d_hashList = ["44e98f98e536cdafbae856e39d55e59f", "1e5359952c511952eb056d3067fda4db", "973972a65c74b4f2dcd69d11a22a2cbf", "4277f84d88ae3a1e67111f062426ea10", "3e11bd70a8f2567f41d8bd68cf7559c9", "57f56bdc88a4b57dd762ed843ca0b386", "e538ecfb8e431d3fabf3ecaa45d82ea1"];
            this.p_hashList = ["c629722cf33adb04e52ef5adeb61e5a6", "eadbb9116952e42cd59aab00b0e4e11a", "90e8da89bb462061b421c1cb7191de14"];
            this.maxRetryCount = 3;
            this.errCount = 0;
        }
        NetService.prototype.load = function () { };
        NetService.prototype.setModel = function (model) {
            this.model = model;
        };
        NetService.prototype.loadJsonp = function (url, result, errResult, checkTarget) {
            var _this = this;
            try {
                var dt = new Date().getTime();
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.charset = 'utf-8';
                script.async = true;
                script.defer = true;
                if (result === "accessControlResultEq") {
                    dt = Math.round(dt / (1000 * 60));
                    script.src = url + '&callback=' + result + '&_' + dt + '=';
                }
                else {
                    script.src = url + '?callback=' + result + '&_' + dt + '=';
                }
                if (script.addEventListener) {
                    script.onload = function () {
                        clearTimeout(timer);
                    };
                    script.onerror = function (ev) {
                        clearTimeout(timer);
                        if (_this.errCount >= _this.maxRetryCount) {
                            errResult();
                        }
                        else {
                            _this.errCount += 1;
                            setTimeout(function () { _this.loadJsonp(url, result, errResult, checkTarget); }, 500);
                        }
                    };
                }
                else if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === 'loaded') {
                            if ((_this.model.resultObject[checkTarget] === undefined && result === result)) {
                                script.onreadystatechange = null;
                                clearTimeout(timer);
                                if (_this.errCount >= _this.maxRetryCount) {
                                    errResult();
                                }
                                else {
                                    _this.errCount += 1;
                                    setTimeout(function () { _this.loadJsonp(url, result, errResult, checkTarget); }, 500);
                                }
                            }
                            else {
                                script.onreadystatechange = null;
                                clearTimeout(timer);
                            }
                        }
                    };
                }
                document.body.appendChild(script);
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    errResult();
                }, 13000);
            }
            catch (e) {
                script.src = null;
                clearTimeout(timer);
                if (this.errCount != 0) {
                    errResult();
                }
                else {
                    this.errCount += 1;
                    this.loadJsonp(url, result, errResult, checkTarget);
                }
            }
        };
        NetService.prototype.loadJsonp_auth = function (url, result, errResult, checkTarget) {
            var _this = this;
            try {
                var dt = new Date().getTime();
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.charset = 'utf-8';
                script.async = true;
                script.defer = true;
                script.src = url + '&callback=' + result + '&_' + dt + '=';
                if (script.addEventListener) {
                    script.onload = function () {
                        clearTimeout(timer);
                    };
                    script.onerror = function (ev) {
                        clearTimeout(timer);
                        if (_this.errCount >= _this.maxRetryCount) {
                            errResult();
                        }
                        else {
                            _this.errCount += 1;
                            setTimeout(function () { _this.loadJsonp_auth(url, result, errResult, checkTarget); }, 500);
                        }
                    };
                }
                else if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === 'loaded') {
                            if ((_this.model.resultObject[checkTarget] === undefined && result === result)) {
                                script.onreadystatechange = null;
                                clearTimeout(timer);
                                errResult();
                            }
                            else {
                                script.onreadystatechange = null;
                                clearTimeout(timer);
                            }
                        }
                    };
                }
                document.body.appendChild(script);
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    errResult();
                }, 13000);
            }
            catch (e) {
                script.src = null;
                clearTimeout(timer);
                if (this.errCount != 0) {
                    errResult();
                }
                else {
                    this.errCount += 1;
                    this.loadJsonp_auth(url, result, errResult, checkTarget);
                }
            }
        };
        return NetService;
    }());
    jstream_t3.NetService = NetService;
    var deviceService = (function (_super) {
        __extends(deviceService, _super);
        function deviceService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        deviceService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var dir = params.playerDir.split("/").slice(0, -4).join("/");
            this.url = dir + "/eq_meta/v1_s/" + _this.model.resultObject["device_profile_id"] + ".jsonp";
            var win = window;
            win.deviceResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var i, prop;
                for (prop in json) {
                    switch (prop) {
                        case "pc":
                        case "sp":
                            if (json[prop]) {
                                for (i = 0; i < json[prop].length; i++) {
                                    json[prop][i] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop][i]);
                                }
                            }
                            break;
                        default:
                            json[prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop]);
                            break;
                    }
                    _this.model.resultObject[prop] = json[prop];
                }
                _this.result();
            };
        };
        deviceService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "deviceResult";
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "pc");
        };
        return deviceService;
    }(NetService));
    jstream_t3.deviceService = deviceService;
    var MetaService = (function (_super) {
        __extends(MetaService, _super);
        function MetaService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.syndicationapi_url = "syndication-api.stream.co.jp/ec/";
            return _this;
        }
        MetaService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var synDir = "http://" + this.syndicationapi_url;
            if (window.location.protocol == "https:") {
                synDir = "https://" + this.syndicationapi_url;
            }
            if (!params.stype) {
                var dir = params.playerDir.split("/").slice(0, -4).join("/");
                if (!_this.model.resultObject["optionId"] || _this.model.resultObject["optionId"] == "") {
                    this.url = dir + "/eq_meta/v1/" + params.meta_id + ".jsonp";
                }
                else {
                    this.url = dir + "/eq_meta/v1_o/" + _this.model.resultObject["optionId"] + ".jsonp";
                }
            }
            else if (params.stype == "s1") {
                this.url = synDir + "get_metainfo_by_product_id?partner_id=" + params.partner_id + "&maker_id=" + params.maker_id + "&product_id=" + params.product_id + "&type=" + params.type;
            }
            else if (params.stype == "s2") {
                this.url = synDir + "get_metainfo?partner_id=" + params.partner_id + "&maker_id=" + params.maker_id + "&meta_id=" + params.meta_id + "&type=" + params.type;
            }
            var win = window;
            win.metaDataResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var i, prop;
                json = json.movie;
                for (prop in json) {
                    switch (prop) {
                        case "inbound_link":
                        case "movie_list":
                        case "movie_list_mobile":
                        case "movie_list_pd":
                        case "movie_list_hls":
                        case "exlink":
                            i = 0;
                            if (json[prop]) {
                                while (i < json[prop].length) {
                                    json[prop][i].text = jstream_t3.utils.Util.decodeHTMLEncode(json[prop][i].text);
                                    i++;
                                }
                            }
                            break;
                        case "pc":
                        case "sp":
                            if (json[prop]) {
                                for (i = 0; i < json[prop].length; i++) {
                                    json[prop][i] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop][i]);
                                }
                            }
                            break;
                        default:
                            json[prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop]);
                            break;
                    }
                    _this.model.resultObject[prop] = json[prop];
                }
                var p = jstream_t3.utils.Util.parse_uri(params.domain);
                var d = document.domain;
                for (var j = 0; j < _this.d_hashList.length; j++) {
                    if (MD5_hexhash(d) == _this.d_hashList[j]) {
                        _this.model.resultObject["auth"] = 0;
                        _this.model.resultObject["hostCheckResult"] = "ok";
                        _this.model.resultObject["enable"] = "1";
                    }
                }
                _this.result();
            };
        };
        MetaService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "metaDataResult";
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "movie_url");
        };
        return MetaService;
    }(NetService));
    jstream_t3.MetaService = MetaService;
    var LiveMetaService = (function (_super) {
        __extends(LiveMetaService, _super);
        function LiveMetaService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LiveMetaService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var dir = params.playerDir.split("/").slice(0, -4).join("/");
            this.url = dir + "/livemeta/" + params.lpid + ".jsonp";
            var win = window;
            win.metaDataResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var i, prop, prop2;
                json = json.movie;
                for (prop in json) {
                    if (typeof json[prop] != "number") {
                        switch (prop) {
                            case "quality":
                                for (prop2 in json[prop]) {
                                    json[prop][prop2].ja = jstream_t3.utils.Util.decodeHTMLEncode(json[prop][prop2].ja);
                                }
                                break;
                            case "exlink":
                                i = 0;
                                while (i < json[prop].length) {
                                    json[prop][i].text = jstream_t3.utils.Util.decodeHTMLEncode(json[prop][i].text);
                                    i++;
                                }
                                break;
                            case "list":
                                break;
                            default:
                                json[prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop]);
                                break;
                        }
                    }
                    _this.model.resultObject[prop] = json[prop];
                }
                _this.result();
            };
        };
        LiveMetaService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "metaDataResult";
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "list");
        };
        return LiveMetaService;
    }(NetService));
    jstream_t3.LiveMetaService = LiveMetaService;
    var DirInfoService = (function (_super) {
        __extends(DirInfoService, _super);
        function DirInfoService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DirInfoService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var synDir = params.playerDir.split("/").slice(0, -2).join("/") + "/dirinfo.jsonp";
            var dir = params.playerDir.split("/").slice(0, -4).join("/");
            if (_this.model.resultObject["isLive"]) {
                this.url = dir + "/jmc_swf/liveplayer/dirinfo.jsonp";
            }
            else if (params.stype == "s1" || params.stype == "s2") {
                this.url = synDir;
            }
            else {
                this.url = dir + "/jmc_swf/player/dirinfo.jsonp";
            }
            var win = window;
            win.DirInfoResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var info = json.info;
                _this.model.resultObject["info_dir"] = info["dir"];
                _this.result();
            };
        };
        DirInfoService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "DirInfoResult";
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "info");
        };
        return DirInfoService;
    }(NetService));
    jstream_t3.DirInfoService = DirInfoService;
    var SettingService = (function (_super) {
        __extends(SettingService, _super);
        function SettingService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ssl_url = "https://ssl-cache.stream.ne.jp";
            return _this;
        }
        SettingService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            if (!params.stype) {
                var dir = params.playerDir.split("/").slice(0, -3).join("/");
                this.url = dir + "/setting/player.jsonp";
            }
            else if (params.stype == "s1" || params.stype == "s2") {
                var synDir = "http://syndication.webcdn.stream.ne.jp/www50/syndication/setting/";
                if (window.location.protocol == "https:") {
                    synDir = this.ssl_url + "/www50/syndication/setting/";
                }
                this.url = synDir + "player.jsonp";
            }
            var win = window;
            win.settingResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var prop;
                json = json.Player;
                if (json == undefined) {
                    _this.fault();
                    return;
                }
                if (json[params.player_id] == null) {
                    _this.fault();
                    return;
                }
                for (prop in json[params.player_id]) {
                    if (typeof json[params.player_id][prop] === "string") {
                        json[params.player_id][prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[params.player_id][prop]);
                    }
                    _this.model.resultObject[prop] = json[params.player_id][prop];
                }
                _this.setPlayerSetting(_this.model.resultObject);
                _this.result();
            };
        };
        SettingService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "settingResult";
            var errorHandler = this.fault;
            this.setPlayerSetting(this.model.resultObject);
            this.result();
        };
        SettingService.prototype.setPlayerSetting = function (params) {
            var key;
            var settings = {
                "pb": ["play_use", "on"],
                "vc": ["volume_use", "on"],
                "sb": ["seak_use", "on"],
                "fs": ["fullscreen_use", "on"],
                "ft": ["footer_text", ""],
                "fa": ["footer_align", "right"],
                "ti": ["title_use", "on"],
                "is": ["init_sound", "on"],
                "ip": ["init_play", "off"],
                "va": ["va_use", "on"],
                "el": ["exlink_use", "on"],
                "tg": ["tag_use", "on"],
                "mb": ["multibitrate_use", "on"],
                "il": ["inboundlink_use", "on"],
                "rb": ["replaybtn_use", "on"],
                "wm": ["watermark_use", "on"],
                "wd": ["watermark_design", "1"],
                "cp": ["controlbar_use", "on"],
                "rs": ["resumeEnable", "off"],
                "rv": ["resumeVolumeEnable", "on"],
                "ot": ["onetimeTag", ""],
                "cc": ["closedCaption", "on"],
                "pr": ["playbackRate", ""],
                "lu": ["loop_use", "off"],
                "mdq": ["mobile_default_quality", "2"],
                "lm": ["livemark_use", "on"]
            };
            for (key in settings) {
                if (typeof params.s[key] === "string") {
                    params.s[key] = jstream_t3.utils.Util.decodeHTMLEncode(params.s[key]);
                }
                if (key == "mdq" && !params.s["mdq"] && !!params.s["dq"]) {
                    params.s[key] = params.s["dq"];
                }
                params[settings[key][0]] = params.s[key] || settings[key][1];
            }
            if (params.stype == "s1" || params.stype == "s2") {
                params["tag_use"] = "off";
            }
            if (params["footer_text"] == "") {
                params["footer_use"] = "off";
            }
            else {
                params["footer_use"] = "on";
                params.s["ft"] = encodeURIComponent(params["footer_text"]);
                params["footer_text"] = decodeURIComponent(params["footer_text"]);
            }
            this.setSnsList(params.s);
            if (params.isLive) {
                this.model.resultObject["playbackRate_list"] = [1];
                this.model.resultObject["playbackRate_index"] = this.model.resultObject["playbackRate_list"].indexOf(1);
                this.model.resultObject["caption_list"] = [];
                this.model.resultObject["caption_index"] = 0;
                this.model.resultObject["caption_list"].push({ url: null, text: "なし" });
            }
            else {
                this.setPlaybackList(params.s);
                this.setCaptionList(params.s);
            }
        };
        SettingService.prototype.setPlaybackList = function (params) {
            this.model.resultObject["playbackRate_list"] = [1];
            if (params["pr"] && typeof (params["pr"]) == "string") {
                var prList = params["pr"].split(',');
                for (var i = 0; i < prList.length; i++) {
                    var item = Number(prList[i]);
                    if (isFinite(item)) {
                        this.model.resultObject["playbackRate_list"].push(item);
                    }
                }
                this.model.resultObject["playbackRate_list"].sort(function (a, b) {
                    if (a > b)
                        return -1;
                    if (a < b)
                        return 1;
                    return 0;
                });
            }
            this.model.resultObject["playbackRate_index"] = this.model.resultObject["playbackRate_list"].indexOf(1);
        };
        SettingService.prototype.setCaptionList = function (params) {
            this.model.resultObject["caption_list"] = [];
            this.model.resultObject["caption_index"] = 0;
            this.model.resultObject["caption_list"].push({ url: null, text: "なし" });
            if (params["cu"]) {
                for (var i = 0; i < params["cu"].length; i++) {
                    this.model.resultObject["caption_list"].push(params["cu"][i]);
                    if (params["cu"][i]["default"] == "true")
                        this.model.resultObject["caption_index"] = i + 1;
                }
            }
        };
        SettingService.prototype.setSnsList = function (params) {
            if (params["sn"] && typeof (params["sn"]) == "string") {
                var snsSites = ["facebook", "twitter", "LINE", "google", "mixi"];
                var snsList = params["sn"].split(",");
                this.model.resultObject["sns_id_list"] = [];
                var tempList = [];
                for (var i = 0; i < snsList.length; i++) {
                    if (snsList[i] == "f") {
                        tempList.push("facebook");
                    }
                    else if (snsList[i] == "t") {
                        tempList.push("twitter");
                    }
                    else if (snsList[i] == "m") {
                    }
                    else if (snsList[i] == "g") {
                        tempList.push("google");
                    }
                    else if (snsList[i] == "l") {
                        tempList.push("LINE");
                    }
                    else {
                        tempList = [];
                        break;
                    }
                }
                if (tempList.length > 0) {
                    if (tempList.length > 4) {
                        tempList.splice(4, 1);
                    }
                    for (var i = 0; i < snsSites.length; i++) {
                        for (var j = 0; j < tempList.length; j++) {
                            if (snsSites[i] == tempList[j]) {
                                if (!(tempList[j] == "LINE" && (!this.model.resultObject.platform["isSP"] && !this.model.resultObject.platform["isTablet"]))) {
                                    this.model.resultObject["sns_id_list"].push(snsSites[i]);
                                }
                            }
                        }
                    }
                }
            }
            else if (params["sn"] == "") {
                this.model.resultObject["sns_id_list"] = [];
            }
            else {
                if (this.model.resultObject.platform["isSP"] || this.model.resultObject.platform["isTablet"]) {
                    this.model.resultObject["sns_id_list"] = ["facebook", "twitter", "google", "LINE"];
                }
                else {
                    this.model.resultObject["sns_id_list"] = ["facebook", "twitter", "google"];
                }
            }
            if (this.model.resultObject["sns_id_list"].length == 0) {
                this.model.resultObject["sns_use"] = "off";
            }
            else {
                this.model.resultObject["sns_use"] = "on";
            }
        };
        return SettingService;
    }(NetService));
    jstream_t3.SettingService = SettingService;
    var ServiceSettingService = (function (_super) {
        __extends(ServiceSettingService, _super);
        function ServiceSettingService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServiceSettingService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var dir = params.playerDir.split("/").slice(0, -3).join("/");
            this.url = dir + "/setting/service.jsonp";
            var win = window;
            win.serviceResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var prop;
                json = json.service;
                for (prop in json) {
                    if (typeof json[prop] === "string") {
                        json[prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop]);
                    }
                    _this.model.resultObject[prop] = json[prop];
                    if (prop == "cid" && json[prop] != params.contract_id) {
                        _this.fault("illegal");
                        return;
                    }
                }
                _this.result();
            };
        };
        ServiceSettingService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "serviceResult";
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "pd_enable");
        };
        return ServiceSettingService;
    }(NetService));
    jstream_t3.ServiceSettingService = ServiceSettingService;
    var AuthenticationService = (function (_super) {
        __extends(AuthenticationService, _super);
        function AuthenticationService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLoad = true;
            _this.isLive = false;
            _this.callbackNum = 0;
            _this.unixTimes = Math.round(new Date().getTime() / 1000);
            _this.api_domain = "api01-platform.stream.co.jp";
            return _this;
        }
        AuthenticationService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            this.cid = params.contract_id || params.maker_id;
            if (params.isLive == true) {
                this.isLive = params.isLive;
                this.lpid = params.lpid;
                var qstring = "?cid=" + this.cid + "&lpid=" + this.lpid;
            }
            else {
                this.mid = params.meta_id;
                var qstring = "?cid=" + this.cid + "&mid=" + this.mid;
            }
            var _this = this;
            var qstring = qstring + "&a=" + params.a;
            this.callbackNum = parseInt(this.cid + this.mid);
            if (this.model.resultObject.api_url && this.model.resultObject.api_url.length > 0) {
                this.api_domain = this.model.resultObject.api_url;
            }
            this.url = "https://" + this.api_domain + "/apiservice/checkAuth/" + qstring;
            var win = window;
            win.authResult = function (json) {
                _this.result(false);
            };
            var win = window;
            win['checkauthresulteq' + this.callbackNum] = function (json) {
                var response = json.response;
                var responseStatus = json.response_status;
                if (json.error != null) {
                    _this.model.resultObject["tk"] = "_NG_";
                    _this.result(false);
                    return;
                }
                if (this.isLive == true) {
                    if (response === "OK") {
                        _this.result(true);
                    }
                    else {
                        _this.model.resultObject["tk"] = "_NG_";
                        _this.result(false);
                    }
                }
                else {
                    var tk = json.tk;
                    if ((response === "OK") && (tk !== "")) {
                        if (typeof json["tk"] === "string") {
                            json["tk"] = jstream_t3.utils.Util.decodeHTMLEncode(json["tk"]);
                        }
                        _this.model.resultObject["tk"] = json["tk"];
                        _this.result(true);
                    }
                    else {
                        _this.model.resultObject["tk"] = "_NG_";
                        _this.result(false);
                    }
                }
            };
        };
        AuthenticationService.prototype.load = function () {
            var url = this.url;
            var resultHandller = 'checkauthresulteq' + this.callbackNum;
            var errorHandler = this.fault;
            this.loadJsonp_auth(url, resultHandller, errorHandler, "tk");
        };
        return AuthenticationService;
    }(NetService));
    jstream_t3.AuthenticationService = AuthenticationService;
    var HostCheckService2 = (function (_super) {
        __extends(HostCheckService2, _super);
        function HostCheckService2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLoad = true;
            _this.isLive = false;
            _this.api_domain = "api01-platform.stream.co.jp";
            return _this;
        }
        HostCheckService2.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            if ((params.viewlimit_flg != "1" || !params.viewlimit_url) && (!params.resultObject.start_date && !params.resultObject.end_date) || params.resultObject.hostCheckResult == "ok") {
                this.isLoad = false;
                params.resultObject.hostCheckResult = "ok";
                return;
            }
            this.cid = params.contract_id || params.maker_id;
            var p = jstream_t3.utils.Util.parse_uri(params.domain);
            var domain = p.scheme + "://" + p.authority + p.path;
            if (params.isLive == true) {
                this.isLive = params.isLive;
                this.lpid = params.lpid;
                var qstring = "?cid=" + this.cid + "&lpid=" + this.lpid;
            }
            else {
                this.mid = params.meta_id;
                var qstring = "?cid=" + this.cid + "&mid=" + this.mid;
            }
            qstring = qstring + "&ot=" + params.resultObject.ot + "&domain=" + domain;
            if (this.model.resultObject.api_url && this.model.resultObject.api_url.length > 0) {
                this.api_domain = this.model.resultObject.api_url;
            }
            this.url = "https://" + this.api_domain + "/apiservice/getAccessControl/" + qstring;
            var win = window;
            win.accessControlResultEq = function (json) {
                var response = json.response;
                var responseStatus = json.response_status;
                if (json.error != null) {
                    _this.model.resultObject["tk"] = "_NG_";
                    params.hostCheckResult = "ng";
                    _this.fault(responseStatus || "");
                    if (params.auth_mode == "or" && params.auth == "1" && responseStatus != "2003" && responseStatus != "2004")
                        _this.result();
                    return;
                }
                if (this.isLive == true) {
                    if (response === "OK") {
                        _this.result();
                    }
                    else {
                        _this.model.resultObject["tk"] = "_NG_";
                        _this.fault(responseStatus || "");
                    }
                }
                else {
                    var tk = json.tk;
                    if ((response === "OK") && (tk !== "")) {
                        if (typeof json["tk"] === "string") {
                            json["tk"] = jstream_t3.utils.Util.decodeHTMLEncode(json["tk"]);
                        }
                        _this.model.resultObject["tk"] = json["tk"];
                        params.hostCheckResult = "ok";
                        _this.model.resultObject.hostCheckResult = "ok";
                        _this.result();
                    }
                    else {
                        _this.model.resultObject["tk"] = "_NG_";
                        params.hostCheckResult = "ng";
                        _this.fault(responseStatus || "");
                        if (params.auth_mode == "or" && params.auth == "1" && responseStatus != "2003" && responseStatus != "2004")
                            _this.result();
                    }
                }
            };
        };
        HostCheckService2.prototype.load = function () {
            if (!this.isLoad) {
                this.result();
                return;
            }
            else {
                var url = this.url;
                var resultHandller = "accessControlResultEq";
                var errorHandler = this.fault;
                this.loadJsonp(url, resultHandller, errorHandler, "tk");
            }
        };
        return HostCheckService2;
    }(NetService));
    jstream_t3.HostCheckService2 = HostCheckService2;
    var CheckConnectionService = (function (_super) {
        __extends(CheckConnectionService, _super);
        function CheckConnectionService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLoad = true;
            _this.unixTimes = Math.round(new Date().getTime() / 1000);
            _this.endPoint = "count01-platform.stream.co.jp/index.php";
            return _this;
        }
        CheckConnectionService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            this.url = this.model.resultObject["getConnectionURL"]();
            if (window.location.protocol === "http:") {
                this.url = "http://" + this.url;
            }
            else {
                this.url = "https://" + this.url;
            }
            this.cid = params.contract_id || params.maker_id;
            this.isLive = this.model.resultObject.isLive ? "2" : "1";
            this.sid = this.model.resultObject.sid;
            if (!this.sid) {
                this.fault();
                ;
            }
            this.sv = params.contract_id || params.maker_id;
            this.v = (params.meta_id || this.model.resultObject.lpid);
            var qstring = "?sv=" + this.sv +
                "&e=" + this.model.resultObject.stat +
                "&v=" + this.v +
                "&sd=" + this.sid +
                "&mode=" + (this.isLive);
            this.url += qstring;
            this.callbackNum = (this.sv + "_" + this.v);
            var win = window;
            win.connectionResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var prop;
                if (json.result != "OK") {
                    this.fault();
                    return;
                }
                _this.result();
            };
            win['connectionResult' + this.callbackNum] = function (json) {
                var result = json.result;
                var now = json.now;
                var total = json.total;
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                _this.model.resultObject["isCheckConnectionPassed"] = result;
                _this.model.resultObject["currentConnecting"] = now;
                _this.model.resultObject["totalConnectiong"] = total;
                if (result != "OK") {
                    _this.fault();
                    return;
                }
                _this.result();
            };
        };
        CheckConnectionService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "connectionResult";
            var errorHandler = this.fault;
            this.loadJsonp_auth(url, resultHandller, errorHandler, "result");
        };
        return CheckConnectionService;
    }(NetService));
    jstream_t3.CheckConnectionService = CheckConnectionService;
    var CheckConnectionResultService = (function (_super) {
        __extends(CheckConnectionResultService, _super);
        function CheckConnectionResultService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLoad = true;
            _this.unixTimes = Math.round(new Date().getTime() / 1000);
            _this.endPoint = "count01-platform.stream.co.jp/index.php";
            return _this;
        }
        CheckConnectionResultService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            this.url = this.model.resultObject["getConnectionURL"]();
            this.url = this.url.replace("index.php", "result.php");
            if (window.location.protocol === "http:") {
                this.url = "http://" + this.url;
            }
            else {
                this.url = "https://" + this.url;
            }
            this.cid = params.contract_id || params.maker_id;
            this.isLive = this.model.resultObject.isLive ? "2" : "1";
            this.sid = this.model.resultObject.sid;
            if (!this.sid) {
                this.fault();
            }
            this.sv = params.contract_id || params.maker_id;
            this.v = (params.meta_id || this.model.resultObject.lpid);
            var qstring = "?sv=" + this.sv +
                "&e=" + this.model.resultObject.stat +
                "&v=" + this.v +
                "&sd=" + this.sid +
                "&mode=" + (this.isLive);
            this.url += qstring;
            this.callbackNum = (this.sv + "_" + this.v);
            var win = window;
            win.connectionResult = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var prop;
                if (json.result != "OK") {
                    this.fault();
                    return;
                }
                _this.result();
            };
            win['connectionResult' + this.callbackNum] = function (json) {
                var result = json.result;
                var nowCount = json.nowCount;
                var total = json.total;
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                _this.model.resultObject["currentConnecting"] = nowCount;
                if (result != "OK") {
                    _this.fault();
                    return;
                }
                _this.result();
            };
        };
        CheckConnectionResultService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "connectionResult";
            var errorHandler = this.fault;
            this.loadJsonp_auth(url, resultHandller, errorHandler, "result");
        };
        return CheckConnectionResultService;
    }(NetService));
    jstream_t3.CheckConnectionResultService = CheckConnectionResultService;
    var ConnectionCheckService = (function (_super) {
        __extends(ConnectionCheckService, _super);
        function ConnectionCheckService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConnectionCheckService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var dir = params.playerDir.split("/").slice(0, -4).join("/");
            this.mid = params.lpid;
            this.url = dir + "/livelimit/" + params.lpid + ".jsonp";
            var lpid = ('00000' + this.mid).slice(-5);
            eval("connectionResult" + lpid + "= function (json) { if (json.error != null) { _this.fault(); return; } var prop; for (prop in json) { if (typeof json[prop] === 'string') { json[prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop]); } _this.model.resultObject[prop] = json[prop]; } _this.result(); }");
        };
        ConnectionCheckService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "connectionResult" + ('00000' + this.mid).slice(-5);
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "connection");
        };
        return ConnectionCheckService;
    }(NetService));
    jstream_t3.ConnectionCheckService = ConnectionCheckService;
    var LiveStatusService = (function (_super) {
        __extends(LiveStatusService, _super);
        function LiveStatusService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LiveStatusService.prototype.setModel = function (params) {
            _super.prototype.setModel.call(this, params);
            var _this = this;
            var dir = params.playerDir.split("/").slice(0, -4).join("/");
            this.mid = params.lpid;
            this.url = dir + "/livelid/" + params.lpid + ".jsonp";
            var win = window;
            win["lidResult" + this.mid] = function (json) {
                if (json.error != null) {
                    _this.fault();
                    return;
                }
                var prop;
                for (prop in json) {
                    if (typeof json[prop] === 'string') {
                        json[prop] = jstream_t3.utils.Util.decodeHTMLEncode(json[prop]);
                    }
                    _this.model.resultObject[prop] = json[prop];
                }
                _this.result();
            };
        };
        LiveStatusService.prototype.load = function () {
            var url = this.url;
            var resultHandller = "lidResult" + this.mid;
            var errorHandler = this.fault;
            this.loadJsonp(url, resultHandller, errorHandler, "enabled");
        };
        return LiveStatusService;
    }(NetService));
    jstream_t3.LiveStatusService = LiveStatusService;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var model;
    (function (model) {
        var EQPlayerIFModel = (function (_super) {
            __extends(EQPlayerIFModel, _super);
            function EQPlayerIFModel(params) {
                if (params === void 0) { params = null; }
                var _this = _super.call(this, params) || this;
                _this.parse(params);
                return _this;
            }
            EQPlayerIFModel.prototype.parse = function (params) {
                this.contract_id = this.parseNumber(params.contract_id);
                this.meta_id = this.parseNumber(params.meta_id);
                this.player_id = this.parseNumber(params.player_id);
                this.start_time = this.parseNumber(params.start_time);
                this.cid = Analytics_t3.createCid();
                this.sid = Analytics_t3.createSid();
                this.tagType = jstream_t3.version.getVersion();
                this.parent_url = encodeURIComponent(jstream_t3.utils.Util.getCanonical() || (window.location.href));
                this.file_id = this.parseNumber(params.file_id);
                this.width = params.width || 100;
                this.height = params.height || 100;
                this.default_quality = params.default_quality || "";
                this.domain = encodeURIComponent(location.href);
                this.ref = encodeURIComponent(document.referrer || "");
                this.maker_id = this.parseNumber(params.maker_id);
                this.partner_id = this.parseNumber(params.partner_id);
                this.product_id = this.parseNumber(params.product_id);
                this.va_url = encodeURIComponent(params.va_url || "");
                this.setting = params.s;
            };
            EQPlayerIFModel.prototype.parseNumber = function (value) {
                if (typeof (value) == "undefined") {
                    return "";
                }
                return value.toString();
            };
            EQPlayerIFModel.prototype.getBase = function () {
                var path = this.base;
                if (window.location.protocol === "https:") {
                    var paths = path.split("/");
                    paths.shift();
                    return this.ssl_url + "/" + paths.join("/");
                }
                else {
                    return "http://" + path;
                }
            };
            EQPlayerIFModel.prototype.getPlayerVersion = function () {
                return jstream_t3.version.getVersion();
            };
            EQPlayerIFModel.prototype.toURL = function () {
                var url = this.base + this.fileName + "?";
                if (this.stype == "s1" || this.stype == "s2") {
                    if (this.contract_id)
                        url += "contract_id=" + this.contract_id + "&";
                    if (this.meta_id)
                        url += "meta_id=" + this.meta_id + "&";
                    if (this.plugins)
                        url += "plugins=" + this.plugins + "&";
                    if (this.va_url)
                        url += "va_url=" + this.va_url + "&";
                }
                else {
                    url += "b=" + this["b"] + "&";
                    if (this.contract_id)
                        url += "c=" + jstream_t3.utils.Util.obfuscate(this.contract_id) + "&";
                    if (this.meta_id)
                        url += "m=" + jstream_t3.utils.Util.obfuscate(this.meta_id) + "&";
                    if (this.plugins)
                        url += "p=" + this.plugins + "&";
                    if (this.va_url)
                        url += "v=" + this.va_url + "&";
                    if (this.setting)
                        url += "s=" + encodeURIComponent(jstream_t3.utils.Util.toQuery(this.setting)) + "&";
                }
                if (this.player_id)
                    url += "player_id=" + this.player_id + "&";
                if (this.start_time)
                    url += "t=" + this.start_time + "&";
                if (this.cid)
                    url += "cid=" + this.cid + "&";
                if (this.sid)
                    url += "sid=" + this.sid + "&";
                if (this.file_id)
                    url += "file_id=" + this.file_id + "&";
                if (this.maker_id)
                    url += "maker_id=" + this.maker_id + "&";
                if (this.partner_id)
                    url += "partner_id=" + this.partner_id + "&";
                if (this.product_id)
                    url += "product_id=" + this.product_id + "&";
                if (this.default_quality)
                    url += "default_quality=" + this.default_quality + "&";
                if (this.parent_url)
                    url += "parent_url=" + this.parent_url + "&";
                if (this.domain)
                    url += "domain=" + this.domain + "&";
                if (this.ref)
                    url += "ref=" + this.ref + "&";
                if (this.o)
                    url += "o=" + encodeURIComponent(jstream_t3.utils.Util.toQuery(this.o)) + "&";
                if (this.a)
                    url += "a=" + this.a + "&";
                if (this.ot)
                    url += "ot=" + encodeURIComponent(this.ot) + "&";
                if (this.optionId)
                    url += "opid=" + encodeURIComponent(this.optionId) + "&";
                this.inCookieVer = jstream_t3.utils.Util.GetCookie("EQPlayerVer");
                if (this.inCookieVer)
                    url += "inCookieVer=" + this.inCookieVer + "&";
                this.inCookieCurrentTime = jstream_t3.utils.Util.GetCookie("EQPlayer_resume_CurrentTime_" + this.meta_id + "_" + this.contract_id);
                if (this.inCookieCurrentTime)
                    url += "inCookieCurrentTime=" + this.inCookieCurrentTime + "&";
                this.inCookieVolume = jstream_t3.utils.Util.GetCookie("EQPlayer_resume_Volume");
                if (this.inCookieVolume)
                    url += "inCookieVolume=" + this.inCookieVolume + "&";
                var arr_uri = location.hostname.match(/^(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i);
                if (arr_uri == null) {
                    this.CookieDomain = ".localhost";
                }
                else {
                    this.CookieDomain = "." + arr_uri[2];
                }
                if (this.CookieDomain)
                    url += "CookieDomain=" + this.CookieDomain + "&";
                url += "tagType=" + this.getPlayerVersion();
                return url;
            };
            return EQPlayerIFModel;
        }(model.EQPlayerModel));
        model.EQPlayerIFModel = EQPlayerIFModel;
    })(model = jstream_t3.model || (jstream_t3.model = {}));
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var PlayerFactoryIFBase = (function (_super) {
        __extends(PlayerFactoryIFBase, _super);
        function PlayerFactoryIFBase(params, embedTagID) {
            if (embedTagID === void 0) { embedTagID = null; }
            var _this = _super.call(this, "playerFactory") || this;
            _this.setUp(params, embedTagID);
            _this.parentDivID = params.parentDivID;
            _this.addTag();
            _this.setQue();
            return _this;
        }
        PlayerFactoryIFBase.prototype.getPlayerVersion = function () {
            return jstream_t3.version.getVersion();
            ;
        };
        PlayerFactoryIFBase.prototype.setUp = function (in_params, embedTagID) {
            if (embedTagID === void 0) { embedTagID = null; }
            this.params = new jstream_t3.model.EQPlayerIFModel(in_params);
            this.embedTagID = embedTagID;
            this.params.fileName = this.createFileName();
            this.createURLQuery();
            this.params.playerDir = this.params.base + this.getPlayerVersion() + "/";
            this.params.cssDir = this.params.playerDir + "resource/style/";
            this.params.stype = this.getStype();
            this.params.setEnviroment();
            this.id = "eq-" + Math.floor(Math.random() * new Date().getTime()).toString();
            this.params.iframeID = this.id;
            this.params.isIframe = true;
            this.jmcPlayer = new JMCPlayer(this.id, this.params);
        };
        PlayerFactoryIFBase.prototype.createBaseURL = function (path) {
            if (window.location.protocol === "https:") {
                var paths = path.split("/");
                paths.shift();
                return "https://ssl-cache.stream.ne.jp/" + paths.join("/");
            }
            else {
                return "http://" + path;
            }
        };
        PlayerFactoryIFBase.prototype.createURLQuery = function () {
            var params = this.params;
            params.base = this.createBaseURL(params.base);
            if (!params.isIframe) {
                params.ref = encodeURIComponent(document.referrer || "");
                params.parent_url = encodeURIComponent(jstream_t3.utils.Util.getCanonical() || window.location.href);
            }
        };
        PlayerFactoryIFBase.prototype.getStype = function () {
            return null;
        };
        PlayerFactoryIFBase.prototype.createFileName = function () {
            return "";
        };
        PlayerFactoryIFBase.prototype.addTag = function () {
            var params = this.params;
            var tag = this.createHtmlTag();
            if (this.embedTagID == null) {
                document.write(tag);
            }
            else {
                document.getElementById(this.embedTagID).innerHTML = tag;
            }
        };
        PlayerFactoryIFBase.prototype.createHtmlTag = function () {
            var params = this.params;
            var iframe = '<iframe id="' + this.id + '" frameBorder="0" style="width:#width#; height:#height#; borderStyle:none;#position#" allowfullscreen=true scrolling="no"></iframe>';
            if (params.responsive == "on") {
                if (params.width == "eq-auto" || params.height == "eq-auto") {
                    iframe = iframe.split("#width#").join("100%");
                    iframe = iframe.split("#height#").join("100%");
                }
                else {
                    iframe = iframe.split("#width#").join("100%");
                    iframe = iframe.split("#height#").join("100%");
                    var aspect = "56.25%";
                    if (params.height && params.width && params.height > 0 && params.width > 0)
                        aspect = (params.height / params.width) * 100 + "%";
                    iframe = iframe.split("#position#").join("position:absolute");
                    iframe = '<div style="max-width:' + params.width + 'px; max-height:' + params.height + 'px;"><div id="iframeplayer" style="position: relative; padding-bottom: ' + aspect + '">' + iframe + "</div></div>";
                }
            }
            else if (params.responsive == "fit") {
                iframe = iframe.split("#width#").join("100%");
                iframe = iframe.split("#height#").join("100%");
                iframe = iframe.split("#position#").join("position:absolute");
            }
            else {
                iframe = iframe.split("#width#").join(params.width + "px");
                iframe = iframe.split("#height#").join(params.height + "px");
                iframe = iframe.split("#position#").join("");
            }
            return iframe;
        };
        PlayerFactoryIFBase.prototype.setPlayerURL = function () {
            document.getElementById(this.id).src = this.params.toURL();
        };
        PlayerFactoryIFBase.prototype.exec = function () {
            this.loadServiceSettingService();
        };
        PlayerFactoryIFBase.prototype.loadServiceSettingService = function () {
            var _this = this;
            var serviceSettingService = new jstream_t3.ServiceSettingService();
            serviceSettingService.setModel(this.params.createServiceModel());
            serviceSettingService.fault = function () {
                if (_this.params.responsive == "on" || _this.params.responsive == "fit") {
                    _this.setTagSize();
                }
                _this.setPlayerURL();
                _this.next();
            };
            serviceSettingService.result = function () {
                _this.loadSettingService();
            };
            serviceSettingService.load();
        };
        PlayerFactoryIFBase.prototype.loadSettingService = function () {
            var _this = this;
            var settingService = new jstream_t3.SettingService();
            settingService.ssl_url = this.params.ssl_url;
            settingService.setModel(this.params.createServiceModel());
            settingService.fault = function () {
                if (_this.params.responsive == "on" || _this.params.responsive == "fit") {
                    _this.setTagSize();
                }
                _this.setPlayerURL();
                _this.next();
            };
            settingService.result = function () {
                _this.settingResult();
            };
            settingService.load();
        };
        PlayerFactoryIFBase.prototype.settingResult = function () {
            if (this.params.responsive == "on" || this.params.responsive == "fit") {
                this.setTagSize();
            }
            this.setPlayerURL();
            this.next();
        };
        PlayerFactoryIFBase.prototype.setTagSize = function () {
            var params = this.params;
            var movieWidth = this.params.width;
            var movieHeight = this.params.height;
            if (this.params.footer_use == "on")
                movieHeight = movieHeight - 20;
            var iframeID = this.id;
            var iframeTagMaxWidth;
            var iframeTagMaxHeight;
            var iframeTag = document.getElementById(iframeID);
            var iframeTagWidth = iframeTag.clientWidth;
            var iframeTagHeight = iframeTag.clientHeight;
            var ftHeight = (params.footer_use === 'on') ? 20 : 0;
            if (params.width == "eq-auto" || params.height == "eq-auto") {
                if (iframeTagWidth <= 0 || iframeTagWidth == null) {
                    iframeTagMaxWidth = Number(movieWidth);
                    iframeTagMaxHeight = Number(movieHeight) + ftHeight;
                }
                else if (iframeTagHeight <= 24 || iframeTagHeight == null) {
                    iframeTagMaxWidth = Number(iframeTagWidth);
                    iframeTagMaxHeight = Math.ceil((movieHeight / movieWidth) * iframeTagWidth) + ftHeight;
                }
                else {
                    iframeTagMaxWidth = Number(iframeTagWidth);
                    iframeTagMaxHeight = Number(iframeTagHeight);
                }
            }
            else if (!isNaN(parseInt(params.width)) && !isNaN(parseInt(params.height))) {
                params.width = parseInt(params.width);
                params.height = parseInt(params.height);
                if (Number(this.params.width) > iframeTagWidth && iframeTagWidth > 150) {
                    iframeTagMaxWidth = Number(iframeTagWidth);
                    iframeTagMaxHeight = Math.ceil((movieHeight / movieWidth) * iframeTagWidth) + ftHeight;
                }
                else {
                    iframeTagMaxWidth = Number(this.params.width);
                    iframeTagMaxHeight = Number(this.params.height);
                }
            }
            else {
                iframeTagMaxWidth = Number(movieWidth);
                iframeTagMaxHeight = Number(movieHeight) + ftHeight;
            }
            this.params.width = iframeTagMaxWidth;
            this.params.height = iframeTagMaxHeight;
        };
        return PlayerFactoryIFBase;
    }(jstream_t3.QueController));
    jstream_t3.PlayerFactoryIFBase = PlayerFactoryIFBase;
})(jstream_t3 || (jstream_t3 = {}));
var jstream_t3;
(function (jstream_t3) {
    var PlayerFactoryIF = (function (_super) {
        __extends(PlayerFactoryIF, _super);
        function PlayerFactoryIF(params, embedTagID) {
            if (embedTagID === void 0) { embedTagID = null; }
            return _super.call(this, params, embedTagID) || this;
        }
        PlayerFactoryIF.version = function () {
            return jstream_t3.version.getVersion();
            ;
        };
        PlayerFactoryIF.create = function (params, embedTagID) {
            if (embedTagID === void 0) { embedTagID = null; }
            jstream_t3.utils.Util.changeParamName(params);
            if (params.meta_id && isNaN(params.meta_id)) {
                params.meta_id = jstream_t3.utils.Util.unObfuscate(params.meta_id);
            }
            if (params.contract_id && isNaN(params.contract_id)) {
                params.contract_id = jstream_t3.utils.Util.unObfuscate(params.contract_id);
            }
            if (params.start_time != undefined && params.start_time > 0) {
                params.inCookieCurrentTime = params.start_time;
            }
            else {
                params.inCookieCurrentTime = jstream_t3.utils.Util.GetCookie("EQPlayer_resume_CurrentTime_" + params.meta_id + "_" + params.contract_id);
            }
            if (params.s.is == undefined) {
                params.inCookieVolume = jstream_t3.utils.Util.GetCookie("EQPlayer_resume_Volume");
            }
            else if (params.s.is != undefined && params.s.is == "off") {
                params.inCookieVolume = "mute";
            }
            else {
                params.inCookieVolume = jstream_t3.utils.Util.GetCookie("EQPlayer_resume_Volume");
                if (params.inCookieVolume == "mute") {
                    params.inCookieVolume = "100";
                }
            }
            var arr_uri = location.hostname.match(/^(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i);
            if (arr_uri == null) {
                params.CookieDomain = ".localhost";
            }
            else {
                params.CookieDomain = "." + arr_uri[2];
            }
            var baseURL = params.b;
            if (window.location.protocol === "https:") {
                var paths = baseURL.split("/");
                paths.shift();
                baseURL = "https://ssl-cache.stream.ne.jp/" + paths.join("/");
            }
            else {
                baseURL = "http://" + baseURL;
            }
            var instance = new PlayerFactoryIF(params, embedTagID);
            return instance.jmcPlayer;
        };
        PlayerFactoryIF.createPlayer = function (params, embedTagID) {
            if (embedTagID === void 0) { embedTagID = null; }
            var instance = new PlayerFactoryIF(params, embedTagID);
        };
        PlayerFactoryIF.prototype.createFileName = function () {
            return "onetag_t3.html";
        };
        return PlayerFactoryIF;
    }(jstream_t3.PlayerFactoryIFBase));
    jstream_t3.PlayerFactoryIF = PlayerFactoryIF;
})(jstream_t3 || (jstream_t3 = {}));
/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorism.
 */

/* Interface:
 * md5_128bits = MD5_hash(data);
 * md5_hexstr = MD5_hexhash(data);
 */

/* ChangeLog
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */


//    md5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0);
var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db,
		      0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
		      0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1,
		      0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
		      0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51,
		      0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681,
		      0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
		      0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9,
		      0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
		      0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60,
		      0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
		      0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8,
		      0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7,
		      0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
		      0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314,
		      0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
		      0xeb86d391);

var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2),
			   new Array( 2,17, 3), new Array( 3,22, 4),
			   new Array( 4, 7, 5), new Array( 5,12, 6),
			   new Array( 6,17, 7), new Array( 7,22, 8),
			   new Array( 8, 7, 9), new Array( 9,12,10),
			   new Array(10,17,11), new Array(11,22,12),
			   new Array(12, 7,13), new Array(13,12,14),
			   new Array(14,17,15), new Array(15,22,16));

var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18),
			   new Array(11,14,19), new Array( 0,20,20),
			   new Array( 5, 5,21), new Array(10, 9,22),
			   new Array(15,14,23), new Array( 4,20,24),
			   new Array( 9, 5,25), new Array(14, 9,26),
			   new Array( 3,14,27), new Array( 8,20,28),
			   new Array(13, 5,29), new Array( 2, 9,30),
			   new Array( 7,14,31), new Array(12,20,32));

var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34),
			   new Array(11,16,35), new Array(14,23,36),
			   new Array( 1, 4,37), new Array( 4,11,38),
			   new Array( 7,16,39), new Array(10,23,40),
			   new Array(13, 4,41), new Array( 0,11,42),
			   new Array( 3,16,43), new Array( 6,23,44),
			   new Array( 9, 4,45), new Array(12,11,46),
			   new Array(15,16,47), new Array( 2,23,48));

var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50),
			   new Array(14,15,51), new Array( 5,21,52),
			   new Array(12, 6,53), new Array( 3,10,54),
			   new Array(10,15,55), new Array( 1,21,56),
			   new Array( 8, 6,57), new Array(15,10,58),
			   new Array( 6,15,59), new Array(13,21,60),
			   new Array( 4, 6,61), new Array(11,10,62),
			   new Array( 2,15,63), new Array( 9,21,64));

function MD5_F(x, y, z) { return (x & y) | (~x & z); }
function MD5_G(x, y, z) { return (x & z) | (y & ~z); }
function MD5_H(x, y, z) { return x ^ y ^ z;          }
function MD5_I(x, y, z) { return y ^ (x | ~z);       }

var MD5_round = new Array(new Array(MD5_F, MD5_round1),
			  new Array(MD5_G, MD5_round2),
			  new Array(MD5_H, MD5_round3),
			  new Array(MD5_I, MD5_round4));

function MD5_pack(n32) {
  return String.fromCharCode(n32 & 0xff) +
	 String.fromCharCode((n32 >>> 8) & 0xff) +
	 String.fromCharCode((n32 >>> 16) & 0xff) +
	 String.fromCharCode((n32 >>> 24) & 0xff);
}

function MD5_unpack(s4) {
  return  s4.charCodeAt(0)        |
	 (s4.charCodeAt(1) <<  8) |
	 (s4.charCodeAt(2) << 16) |
	 (s4.charCodeAt(3) << 24);
}

function MD5_number(n) {
  while (n < 0)
    n += 4294967296;
  while (n > 4294967295)
    n -= 4294967296;
  return n;
}

function MD5_apply_round(x, s, f, abcd, r) {
  var a, b, c, d;
  var kk, ss, ii;
  var t, u;

  a = abcd[0];
  b = abcd[1];
  c = abcd[2];
  d = abcd[3];
  kk = r[0];
  ss = r[1];
  ii = r[2];

  u = f(s[b], s[c], s[d]);
  t = s[a] + u + x[kk] + MD5_T[ii];
  t = MD5_number(t);
  t = ((t<<ss) | (t>>>(32-ss)));
  t += s[b];
  s[a] = MD5_number(t);
}

function MD5_hash(data) {
  var abcd, x, state, s;
  var len, index, padLen, f, r;
  var i, j, k;
  var tmp;

  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
  len = data.length;
  index = len & 0x3f;
  padLen = (index < 56) ? (56 - index) : (120 - index);
  if(padLen > 0) {
    data += "\x80";
    for(i = 0; i < padLen - 1; i++)
      data += "\x00";
  }
  data += MD5_pack(len * 8);
  data += MD5_pack(0);
  len  += padLen + 8;
  abcd = new Array(0, 1, 2, 3);
  x    = new Array(16);
  s    = new Array(4);

  for(k = 0; k < len; k += 64) {
    for(i = 0, j = k; i < 16; i++, j += 4) {
      x[i] = data.charCodeAt(j) |
	    (data.charCodeAt(j + 1) <<  8) |
	    (data.charCodeAt(j + 2) << 16) |
	    (data.charCodeAt(j + 3) << 24);
    }
    for(i = 0; i < 4; i++)
      s[i] = state[i];
    for(i = 0; i < 4; i++) {
      f = MD5_round[i][0];
      r = MD5_round[i][1];
      for(j = 0; j < 16; j++) {
	MD5_apply_round(x, s, f, abcd, r[j]);
	tmp = abcd[0];
	abcd[0] = abcd[3];
	abcd[3] = abcd[2];
	abcd[2] = abcd[1];
	abcd[1] = tmp;
      }
    }

    for(i = 0; i < 4; i++) {
      state[i] += s[i];
      state[i] = MD5_number(state[i]);
    }
  }

  return MD5_pack(state[0]) +
	 MD5_pack(state[1]) +
	 MD5_pack(state[2]) +
	 MD5_pack(state[3]);
}

function MD5_hexhash(data) {
    var i, out, c;
    var bit128;

    bit128 = MD5_hash(data);
    out = "";
    for(i = 0; i < 16; i++) {
	c = bit128.charCodeAt(i);
	out += "0123456789abcdef".charAt((c>>4) & 0xf);
	out += "0123456789abcdef".charAt(c & 0xf);
    }
    return out;
}
