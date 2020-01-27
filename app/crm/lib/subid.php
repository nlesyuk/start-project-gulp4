<?php 
use \Curl\Curl;

class Subid { 
	public function Send ($subid1) {
		if (!$subid1 || !SUBID_USE) return false;

		$curl = new Curl();
		$curl->setHeader('X-Requested-With', 'XMLHttpRequest');
		$curl->setReferrer(SITE_URL);
		$curl->setUserAgent($_SERVER['HTTP_USER_AGENT']);
		$curl->get('https://online7plus.com/c.php?cnv_id="'.$subid1.'"&payout=18&cnv_status=pending');

		
		if ($curl->error) {
		    echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
		    return false;
		} else {
		    return true;
		}
	}
}