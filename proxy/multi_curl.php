<?php

class curl {

	public $handle = null;

	function __construct($url) {
		$this->handle = curl_init();

		
		curl_setopt($this->handle, CURLOPT_SSL_VERIFYPEER, FALSE);
	    curl_setopt($this->handle, CURLOPT_HEADER, false);
	    curl_setopt($this->handle, CURLOPT_FOLLOWLOCATION, true);
	    curl_setopt($this->handle, CURLOPT_URL, $url);
	    curl_setopt($this->handle, CURLOPT_REFERER, $url);
	    curl_setopt($this->handle, CURLOPT_RETURNTRANSFER, TRUE);
	    curl_setopt($this->handle, CURLOPT_TIMEOUT_MS, 90000);
	    curl_setopt($this->handle, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.125 Safari/533.4");
	}

	function setProxy($proxy) {
		if($proxy != '') {
			curl_setopt($this->handle, CURLOPT_PROXY, $proxy);
		}
	}

	function getResponse() {
		return curl_multi_getcontent($this->handle);
	}
}

class multi_curl {
	public $arryCurls = array();
	public $mHandle = null;
	public $errors = array();

	function __construct() {
		
	}

	public function add_curl($url) {
		$curl = new curl($url);

		array_push($this->arryCurls, $curl);
	}

	public function add_curl_proxy($url, $proxy) {
		$curl = new curl($url);

		$curl->setProxy($proxy);

		array_push($this->arryCurls, $curl);
	}

	public function execute() {

		if(sizeof($this->arryCurls)) {

			$mHandle = curl_multi_init();

			//add curl
			foreach ($this->arryCurls as $crul) {
				curl_multi_add_handle($mHandle, $crul->handle);
			}

			//execute
			$running = null;
			do {
				curl_multi_exec($mHandle, $running);
			}while($running);

			//remove curl handle
			foreach ($this->arryCurls as $crul) {
				array_push($this->errors, curl_error($crul->handle));
				curl_multi_remove_handle($mHandle, $crul->handle);
			}

			//close multi curl handle
			curl_multi_close($mHandle);


		}
	}

	public function getResponseAt($at) {

		if($at < sizeof($this->arryCurls) && $at >=0 ) {

			return $this->arryCurls[$at]->getResponse();

		}
		return null;
	}

	public function getResponseAll() {
		$arryResponse = array();

		foreach ($this->arryCurls as $key => $curl) {
			array_push($arryResponse, $curl->getResponse());
		}
		return $arryResponse;
	}

	public function removeCurls() {
		unset($this->arryCurls);
		unset($this->errors);
	}

	public function errors() {
		return $this->errors;
	}

}
