<?php 

/* PRIMARY*/
define("SITE_NAME", 'kitchen');
define("SITE_URL", 'https://best-new.online/kitchen/');

/* FORM */
// имена полей
define("FRM_INP_NAME", 'name');
define("FRM_INP_PHONE", 'phone');
define("FRM_INP_EMAIL", 'email');
define("FRM_INP_COMMENT", 'comment');
define("FRM_INP_PRODUCT_ID_RETAIL", 'product_retail');
define("FRM_INP_PRODUCT_ID_LP", 'product_lp');
define("FRM_INP_PRODUCT", 'product_name');
define("FRM_INP_QUANTITY", 'quantity', 1);	// кол-во
define("FRM_INP_TYPE", 'type');
define("FRM_INP_PRICE", 'price');

/* EMAIL */
define("MAIL_USE", true);	// Использовать отправку заказа на почту
define("MAIL_MANAGER_1", 'sasha_v_v@ukr.net');					// Email 1
define("MAIL_MANAGER_2", 'ivan@traforce.com');	// Email 2
define("MAIL_MANAGER_3", '');									// Email 3


/* RETAIL CRM */
define("RETAIL_CRM_USE", true);	// Использовать отправку заказа в RETAIL CRM
define("RETAIL_CRM_URL", 'https://startstudio.retailcrm.ru/');
define("RETAIL_CRM_API_KEY", 'cgKkRbXe3X1dpzp17k5pYD8pxnFESfweNzID');
define("RETAIL_CRM_SHIPMENT_STORE", '01');

/* LP CRM */
define("LP_CRM_USE", false);	// Использовать отправку заказа в LP CRM
define("LP_CRM_URL", 'http://marklinelex.lp-crm.biz/api/addNewOrder.html');
define("LP_CRM_API_KEY", 'adf21a54ed7d966df31400b2d51b67c3NzID');
define("LP_CRM_SHIPMENT_STORE", '1');

/* SUBID */
define("SUBID_USE", false);	// Использовать отправку SUBID
