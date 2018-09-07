<?php
require_once 'multi_curl.php';

class proxy_getter {

	public $arrayProxys = array();

	function __construct() {
		if(file_exists("proxies")) {
			$this->arrayProxys = json_decode(@file_get_contents("proxies"));
		} else {
			$multi_curl = new multi_curl();
			$from = 1;	// default 1
			$to = 15;	//default 15

			
			for($i=$from; $i<$to; $i++) {
			
				$url = sprintf("https://premproxy.com/list/ip-port/$i.htm");
				$multi_curl->add_curl($url);
			}

			$multi_curl->execute();

			for($i=$from; $i<$to; $i++) {

				$strResponse = $multi_curl->getResponseAt($i-1);


				if(!isset($strResponse) || $strResponse == '')
					continue;

				$table = str_get_html($strResponse)->find('pre', 0);
				if($table){
					$pre_text = $table->innertext();
					$proxy_arrs = explode(" ", $pre_text);
					for($j=5; $j<=34; $j++){
						if($j < count($proxy_arrs)){
							if($proxy_arrs[$j]) array_push($this->arrayProxys, $proxy_arrs[$j]);
						}
					}
				}
			}
			file_put_contents("proxies", json_encode($this->arrayProxys));
		}
	}

	public function getRndProxy() {
		$idx = rand(1, sizeof($this->arrayProxys))-1;
		if($idx >= 0)
			return $this->arrayProxys[$idx];
		return null;
	}

	public function removeProxy($p) {
		foreach ($this->arrayProxys as $key => $proxy) {
			if($p->getProxyUrl() == $proxy->getProxyUrl()) {
				array_slice($this->arrayProxys, $key,1);
				break;
			}
		}
	}

	public function dump() {
		echo sizeof($this->arrayProxys).'<br>';
		foreach ($this->arrayProxys as $key => $proxy) {
			echo $key.'['.$proxy->getProxyUrl().']'.$proxy->isUseful().'<br>';
		}
	}
}
