<?php
/* Error status */
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

/* Get Redirect */
if(!$_POST){
	header("HTTP/1.1 301 Moved Permanently"); 
	header("Location: /kitchen/");
	die;
}

require 'crm/vendor/autoload.php';
include 'crm/lib/config.php';
require 'crm/lib/submit.php';

$Submit = new Submit();

return $Submit->Init();