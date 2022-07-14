<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Formulario 
$nombre=$_POST["nombre"];
$email=$_POST["email"];
$mensaje=$_POST["mensaje"];
$thank="gracias.html";

// https://github.com/PHPMailer/PHPMailer
// Gmail debes de permitir aplicaciones de confianzas segura : Debe estar SI.
// https://myaccount.google.com/lesssecureapps?gar=1&pli=1&rapt=AEjHL4Myfl30CtbMFUjnVidEVvOpxcS8xIM3e1RU9lTn3I80cV2BY3yTMkqUDYTXZ9aN0hAtF82f53uzRqSnhxP77K_j6kKrGQ

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                                       //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '46033387@certus.edu.pe';               //SMTP username
    $mail->Password   = 'prince32XD';                            //SMTP password
    $mail->SMTPSecure = 'tls';                                  //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('46033387@certus.edu.pe', 'Mario');         // Origen   
    $mail->addAddress('46033387@certus.edu.pe');          					    //Add a recipient (Destino) Pre-Requisito que el correo gmail EXISTA
  
  
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Sistema de ComputerZone - Mensajeria';
    $mail->Body    = 'De: '.$nombre.' <br>  Correo: '.$email.' <br>  Mensaje:'.$mensaje.'';

    $mail->send();
    //echo 'El mensaje se envio correctamente';
	header("location: $thank");
	
} catch (Exception $e) {
    echo "Hubo un error al enviar el mensaje: {$mail->ErrorInfo}";
}

?>