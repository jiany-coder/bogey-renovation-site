<?php
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
if (!empty($_POST['_honey'])) { echo '{"ok":true}'; exit; }
function c($k){ return trim(strip_tags($_POST[$k] ?? '')); }
$nom=c('nom'); $tel=c('telephone'); $mail=c('email'); $commune=c('commune'); $service=c('service'); $msg=c('message');
if ($nom==='' || $tel==='' || strlen($nom)>120 || strlen($tel)>40) { http_response_code(422); echo '{"ok":false,"error":"champs"}'; exit; }
if ($mail!=='' && !filter_var($mail, FILTER_VALIDATE_EMAIL)) { $mail=''; }
$to='renovationartisan@gmail.com';
$subject='=?UTF-8?B?'.base64_encode('Demande de devis depuis bogeyrenovation.fr').'?=';
$body="Nouvelle demande de devis\n\nNom : $nom\nTéléphone : $tel\nEmail : ".($mail?:'non renseigné')."\nCommune : ".($commune?:'non renseignée')."\nTravaux : ".($service?:'non précisé')."\n\nMessage :\n".($msg?:'(aucun)')."\n\nPage : ".($_SERVER['HTTP_REFERER'] ?? '')."\n";
$h="From: Site Bogey Rénovation <devis@bogeyrenovation.fr>\r\n".($mail?"Reply-To: $mail\r\n":'')."Content-Type: text/plain; charset=UTF-8\r\n";
$ok=@mail($to,$subject,$body,$h,'-fdevis@bogeyrenovation.fr');
if(!$ok){ $ok=@mail($to,$subject,$body,$h); }
http_response_code($ok?200:500);
echo $ok?'{"ok":true}':'{"ok":false}';
