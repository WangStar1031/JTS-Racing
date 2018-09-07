<?php
require_once 'multi_curl.php';

class proxy_getters {

	public $arrayProxys = array();

	function __construct() {
		unlink("proxies_j");
		if(file_exists("proxies_j")) {
			$this->arrayProxys = json_decode(@file_get_contents("proxies_j"));
		} else {
			$multi_curl = new multi_curl();
			
			$url = sprintf("https://www.proxynova.com/proxy-server-list/");
			//$url = sprintf("https://www.proxynova.com/proxy-server-list/country-jp/");
			$multi_curl->add_curl($url);

			$multi_curl->execute();

			$strResponse = $multi_curl->getResponseAt(0);

			if(!isset($strResponse) || $strResponse == '') exit();

			$table = str_get_html($strResponse)->find('table#tbl_proxy_list', 0);
			if($table){
				$pre_text = $table->innertext();
				$tr_s = str_get_html($pre_text)->find('tr');
				foreach ($tr_s as $tr_obj) {
					if(str_get_html($tr_obj)->find('td abbr', 0)){
						$proxy_ip = trim(str_get_html($tr_obj)->find('td abbr', 0)->innertext);
						$proxy_ip = str_replace("<script>document.write('12345678", "", $proxy_ip);
						$proxy_ip = str_replace("');</script>", "", $proxy_ip);
						$proxy_ip = str_replace("'.substr(8) + '", "", $proxy_ip);
						$proxy_port = trim(str_get_html($tr_obj)->find('td', 1)->innertext);
						if(str_get_html($proxy_port)->find('a', 0)) $proxy_port = trim(str_get_html($proxy_port)->find('a', 0)->innertext);
						$proxy_addr = $proxy_ip.":".$proxy_port;

						$test_result = __call_safe_url_for_test__("https://keiba.rakuten.co.jp/odds/tanfuku/RACEID/".date("Ymd")."0000000000", $proxy_addr);
						if($test_result){
							file_put_contents(date("Ymd")."_proxy_test_".(str_replace(":", "_", $proxy_addr)), $test_result);
						 	array_push($this->arrayProxys, $proxy_addr);	
						}
					}
				}						
			}
			file_put_contents("proxies_j", json_encode($this->arrayProxys));
		}
	}

	public function getRndProxy() {
		if(sizeof($this->arrayProxys) == 0) return null;
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
