<?php
$Result = array(
	"status" => "ERROR",
	"error" => "Data is empty",
	"data" => "",
);
$MailList = array("sasha_v_v@ukr.net", "pronaza@gmail.com");
$FromName = "Лыжная маска Animal";
$subject = $FromName." ".time();
$From = "order-zodiac@markline.agency";

$Charset = "utf-8";
$ContentType = "text/html";

$HTMLHeaders = "MIME-Version: 1.0\r\nContent-type: ".$ContentType."; charset=".$Charset."\r\n";
$HTMLHeaders .= "From: ". $FromName ." <". $From .">\r\n";

$mail_to = "";
$i = 0;
foreach($MailList AS $Email){
	$Separator = $i == 0 ? "" : ", ";
	$mail_to .= $Separator . "<" . $Email . ">";
	$i++;
}

$Name = isset($_POST['name']) && !empty($_POST['name']) ? trim($_POST['name']) : "Фиг его знает кто";
$Phone = isset($_POST['phone']) && !empty($_POST['phone']) ? trim($_POST['phone']) : "Хоть в рельсу звони";
$Products = count($_POST['product']) ? $_POST['product'] : 'Клиент ничего не выбрал';

$text = "";
$text .= '<div>'
		. '<h2>Поступил новый заказ </h2>'
		. '<div>От: '.$Name.'</div>'
		. '<div>Телефон: '.$Phone.'</div>'
		. '<div>Товар: '.$FromName.'</div>'
		. '<div>Какие: ';
		foreach($Products as $key => $value){ $text .= $value .", ";}
	$text .= '</div></div>';

if(isset($_POST) && !empty($_POST)){
	if(mail($mail_to, $subject, $text, $HTMLHeaders)){
		$Result['status'] = "OK";
		$Result['error'] = "Сообщение отправлено успешно";
	}
}

Header('Location: success.html'); 