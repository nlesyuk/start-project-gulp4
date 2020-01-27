<?php

class retailCrm {
	
	public function OrdersCreate($data=false) {
		if ($data) {
		    $client = new \RetailCrm\ApiClient(RETAIL_CRM_URL, RETAIL_CRM_API_KEY, \RetailCrm\ApiClient::V5);
		    $data_ = array(
				'shipmentStore' => RETAIL_CRM_SHIPMENT_STORE,
		    	'site' => array(
					'name' => SITE_NAME,
					'url' => SITE_URL,
				),
				'items' => array()
		    );

		    if (isset($data[FRM_INP_NAME]) && $data[FRM_INP_NAME]) $data_['firstName'] = $data[FRM_INP_NAME];
		    if (isset($data[FRM_INP_PHONE]) && $data[FRM_INP_PHONE]) $data_['phone'] = $data[FRM_INP_PHONE];
		    if (isset($data[FRM_INP_EMAIL]) && $data[FRM_INP_EMAIL]) $data_['email'] = $data[FRM_INP_EMAIL];
		    if (isset($data[FRM_INP_COMMENT]) && $data[FRM_INP_COMMENT]) $data_['customerComment'] = $data[FRM_INP_COMMENT];

		    if (isset($data['item']) && $data['item']) {
		    	array_push($data_['items'], array(
					"quantity" => isset($data['item'][FRM_INP_QUANTITY]) && $data['item'][FRM_INP_QUANTITY] ? $data['item'][FRM_INP_QUANTITY] : '1',
					'offer'=> array()
		    	));

			    if (isset($data['item'][FRM_INP_PRICE]) && $data['item'][FRM_INP_PRICE]) $data_['items'][0]['initialPrice'] = $data['item'][FRM_INP_PRICE];
			    if (isset($data['item']['id']) && $data['item']['id']) $data_['items'][0]['offer']['externalId'] = $data['item']['id'];
		    }


			try {
		        $externalId = 'o-create-' . time();
			    $response = $client->request->ordersCreate($data_);
			} catch (\RetailCrm\Exception\CurlException $e) {
			    echo "Connection error: " . $e->getMessage();
			}

			if ($response->isSuccessful() && 201 === $response->getStatusCode()) {
			    return $response->id;
			} else {
			    echo sprintf(
			        "Error: [HTTP-code %s] %s",
			        $response->getStatusCode(),
			        $response->getErrorMsg()
			    );
			}
		} else return false;
	}
}