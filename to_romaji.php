<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include('simple_html_dom.php');

$__key = "";
if(isset($_POST["k"])) $__key = $_POST["k"];
if(isset($_GET["k"])) $__key = $_GET["k"];

$__key = str_replace("ー", "=", $__key);

function convert_kata_roma($__str){

  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "http://www.alfabetos.net/japanese/conversor-japones-romaji/index-en.php",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "enviar=Convert to romaji&text=".$__str,
    CURLOPT_HTTPHEADER => array(
      "cache-control: no-cache",
      "content-type: application/x-www-form-urlencoded",
      "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  $ret_html = str_get_html($response);
  $obj_text = $ret_html->find('textarea', 1);
  if($obj_text){
  	$obj_text = $obj_text->innertext;
  	while(strpos($obj_text, "=") !== false){
  		$pos_i = strpos($obj_text, "=");
  		$switch_char = substr($obj_text, $pos_i - 1, 1);
  		$obj_text = substr($obj_text, 0, $pos_i).$switch_char.substr($obj_text, $pos_i + 1);
  	}
   	return strtoupper($obj_text);
  }
  return "";
}

echo convert_kata_roma($__key);