<php

<?php

/*********************************************************************************
 * Aqui você pode brincar com as rotas pra ver o que está chegando.              *
 * Sempre use o curl porque é mais fácil. Se quiser pode usar javascript também! *
 *********************************************************************************/

$config = require_once 'config.php';
$rotaApi = $config['ROTA_API'];
$rotaDesejada = '???';

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