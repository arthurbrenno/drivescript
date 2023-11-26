<?php
/***********************************
 * Importante. Carregar o autoload *
 * do composer.                    *
 ***********************************/

use Aw\Drivescript\config\Config;

require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

$rotaApi = Config::ROTA_API;
$rotaDesejada = '/login';


/**************************************
 * COMO CHAMAR ALGUMA ROTA DO BACKEND *
 **************************************/
$ch = curl_init($rotaApi . $rotaDesejada);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'user' => 'admin',
    'password' => 'admin',
]));
$result = curl_exec($ch);
curl_close($ch);

var_dump($result);
