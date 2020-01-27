<?php
	
class eMail {
	public function Send ($data=false) {
		if($data){
			$subject = $data['subject'];

			$Charset = "utf-8";
			$ContentType = "text/html";

			$HTMLHeaders = "MIME-Version: 1.0\r\nContent-type: ".$ContentType."; charset=".$Charset."\r\n";
			$HTMLHeaders .= "From: ". $data['from_name'] ." <". $data['from'] .">\r\n";

			$mail_to = "";
			$i = 0;
			foreach($data['emails'] AS $Email){
				$Separator = $i == 0 ? "" : ", ";
				$mail_to .= $Separator . "<" . $Email . ">";
				$i++;
			}

			$mail = mail($mail_to, $subject, $data['text'], $HTMLHeaders);
			return true;
		} else return false;
	}
}