<?php
/***********************************
 * Importante. Carregar o autoload *
 * do composer.                    *
 ***********************************/

use Aw\Drivescript\config\Config;

require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

$rotaApi = Config::ROTA_API;



/**************************************
 * COMO CHAMAR ALGUMA ROTA DO BACKEND *
 **************************************/
$ch = curl_init($rotaApi);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
    'username' => 'admin',
    'password' => 'admin',
    'action' => 'login'
)));
$result = curl_exec($ch);
curl_close($ch);

echo $result;
