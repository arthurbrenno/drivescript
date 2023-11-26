<?php
/***********************************
 * Importante. Carregar o autoload *
 * do composer.                    *
 ***********************************/
require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

/***********************************
 * Página teste para demonstrar    *
 * como chamar a API               *
 ***********************************/
$ch = curl_init();
