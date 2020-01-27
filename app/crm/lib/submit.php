<?php


class Submit {
	public function Init () {
		$Post = $_POST;
		$mailStatus = !MAIL_USE;
		$crmStatus = !RETAIL_CRM_USE;
		$lpCrmStatus = !LP_CRM_USE;
		$SubidStatus = true;

		// Имя покупателя
		$userName = isset($Post[FRM_INP_NAME]) && !empty($Post[FRM_INP_NAME]) ? $Post[FRM_INP_NAME] : 'Не указано';
		// Номер телефона покупателя
		$userPhone = isset($Post[FRM_INP_PHONE]) && !empty($Post[FRM_INP_PHONE]) ? $Post[FRM_INP_PHONE] : false;
		// Комментарий покупателя
		$userComment = isset($Post[FRM_INP_COMMENT]) && !empty($Post[FRM_INP_COMMENT]) ? $Post[FRM_INP_COMMENT] : false;
		// E-mail покупателя
		$email = isset($Post[FRM_INP_EMAIL]) && !empty($Post[FRM_INP_EMAIL]) ? $Post[FRM_INP_EMAIL] : false;
		$comment = (isset($Post[FRM_INP_PRODUCT]) && !empty($Post[FRM_INP_PRODUCT]) ? $Post[FRM_INP_PRODUCT] . ' - ' : '') . ( isset($Post[FRM_INP_PRICE]) && !empty($Post[FRM_INP_PRICE]) ? $Post[FRM_INP_PRICE] . 'грн. ' : '') . (isset($Post[FRM_INP_QUANTITY]) && !empty($Post[FRM_INP_QUANTITY]) ? $Post[FRM_INP_QUANTITY] . 'ед. ' : '1 шт.') . ' Сайт: ' . SITE_NAME . ' ('.SITE_URL.')';

		$data = array(
			FRM_INP_NAME => $userName,
			FRM_INP_PHONE => $userPhone,	
			FRM_INP_EMAIL => $email,
			FRM_INP_COMMENT => $userComment ? $userComment : $comment,

			// Купленный товар
			'item' => array(
				// Внешний ID на складе CRM
				'id' => isset($Post[FRM_INP_PRODUCT_ID_RETAIL]) && !empty($Post[FRM_INP_PRODUCT_ID_RETAIL]) ? $Post[FRM_INP_PRODUCT_ID_RETAIL] : false,
				// Число строчным типом без доп. символов
				FRM_INP_PRICE => isset($Post[FRM_INP_PRICE]) && !empty($Post[FRM_INP_PRICE]) ? $Post[FRM_INP_PRICE] : false,
				// Кол-во купленных единиц товара. Число строчным типом без доп. символов
				FRM_INP_QUANTITY =>  isset($Post[FRM_INP_QUANTITY]) && !empty($Post[FRM_INP_QUANTITY]) ? $Post[FRM_INP_QUANTITY] : '1'
			)
		);

		if (isset($Post['subid1']) && $Post['subid1'] && SUBID_USE) {
			require 'lib/subid.php';
			$SubidStatus = false;

			$Subid = new Subid();
			$SubidStatus = $Subid->Send($Post['subid1']);
		}

		/* Mail */
		if (MAIL_USE) {
			require 'lib/mail.php';

			$eMail = new eMail();
			$dataMail = array(
				'emails' => array(),
				'subject' => "Новый заказ ".SITE_NAME. " " . time(),
				'from_name' => SITE_NAME." Site Admin",
				'from' => mb_strtolower(str_replace(' ', '-', SITE_NAME), 'UTF-8').'@markline.agency',
				'text' => '<div>'
						. '<h2>Поступил новый заказ </h2>'
						. ($userName ? '<div>От: '.$userName.'</div>' : 'Имя не указано')
						. ($userPhone ? '<div>Телефон: '.$userPhone.'</div>' : '')
						. ($comment ? '<div>Описание: '.$comment.'</div>' : '')
						. '</div>'
			);
			$emails = array(MAIL_MANAGER_1, MAIL_MANAGER_2, MAIL_MANAGER_3);
			foreach ($emails as $value) { if(strlen($value)) array_push($dataMail['emails'], $value); }
			$mailStatus = $eMail->Send($dataMail);
		}
		
		/* RETAIL CRM */
		if (RETAIL_CRM_USE) {
			require 'lib/RetailCrm.php';
			
			$retailCrm = new retailCrm();
			$crmStatus = $retailCrm->OrdersCreate($data);
		}

		/* RETAIL CRM */
		if (LP_CRM_USE) {
			session_start();
			require 'lib/LpCrm.php';

			$data['item']['id'] = isset($Post[FRM_INP_PRODUCT_ID_LP]) && !empty($Post[FRM_INP_PRODUCT_ID_LP]) ? $Post[FRM_INP_PRODUCT_ID_LP] : false;

			$lpCrm = new LpCrm();
			$lpCrmStatus = $lpCrm->OrdersCreate($data);
		}

		if (RETAIL_CRM_USE && $crmStatus) {
			header("HTTP/1.1 301 Moved Permanently");
			header("Location: success.html");
		}
		else if (LP_CRM_USE && $lpCrmStatus) {
			header("HTTP/1.1 301 Moved Permanently");
			header("Location: success.html");
		}
		else if (MAIL_USE && $mailStatus) {
			header("HTTP/1.1 301 Moved Permanently");
			header("Location: success.html");
		}
	}
}