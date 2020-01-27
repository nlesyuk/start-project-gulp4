<?php

class LpCrm {
	public function OrdersCreate ($data=false) {
		if($data) {
			$sender = urlencode(serialize($_SERVER));
			$data_ = array(
				'key'             => LP_CRM_API_KEY,
				'order_id'        => number_format(round(microtime(true)*10),0,'.',''),
				'country'         => 'UA',
				'office'          => LP_CRM_SHIPMENT_STORE,
				'products'        => array(),                   	   // массив с товарами в заказе
				'sender'          => $sender,                        
				'utm_source'      => $_SESSION['utms']['utm_source'],  // utm_source
				'utm_medium'      => $_SESSION['utms']['utm_medium'],  // utm_medium
				'utm_term'        => $_SESSION['utms']['utm_term'],    // utm_term
				'utm_content'     => $_SESSION['utms']['utm_content'], // utm_content
				'utm_campaign'    => $_SESSION['utms']['utm_campaign'],// utm_campaign
			);
			if (isset($data[FRM_INP_NAME]) && $data[FRM_INP_NAME]) $data_['bayer_name'] = $data[FRM_INP_NAME];
		    if (isset($data[FRM_INP_PHONE]) && $data[FRM_INP_PHONE]) $data_['phone'] = $data[FRM_INP_PHONE];
		    if (isset($data[FRM_INP_EMAIL]) && $data[FRM_INP_EMAIL]) $data_['email'] = $data[FRM_INP_EMAIL];
		    if (isset($data[FRM_INP_COMMENT]) && $data[FRM_INP_COMMENT]) $data_['comment'] = $data[FRM_INP_COMMENT];

		    if (isset($data['item']) && $data['item']) {
		    	array_push($data_['products'], array(
					"count" => isset($data['item'][FRM_INP_QUANTITY]) && $data['item'][FRM_INP_QUANTITY] ? $data['item'][FRM_INP_QUANTITY] : '1',
		    	));

			    if (isset($data['item'][FRM_INP_PRICE]) && $data['item'][FRM_INP_PRICE]) $data_['products'][0]['price'] = $data['item'][FRM_INP_PRICE];
			    if (isset($data['item']['id']) && $data['item']['id']) $data_['products'][0]['product_id'] = $data['item']['id'];
		    }

			$data_['products'] = urlencode(serialize($data_['products']));

			// запрос
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_URL, LP_CRM_URL);
			curl_setopt($curl, CURLOPT_POST, true);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data_);
			$out = curl_exec($curl);
			return $out;
		} else return false;
	}
}