<?php
$servername = "localhost";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $databaseName = "drivescript";
    $sqlCreateDatabase = "CREATE DATABASE IF NOT EXISTS $databaseName";
    $conn->exec($sqlCreateDatabase);
    echo "Banco de dados criado com sucesso ou já existente.\n";

    $conn->exec("USE $databaseName");

    $sqlScripts = file_get_contents('drivescript.sql');
    $conn->exec($sqlScripts);
    echo "Scripts SQL executados com sucesso.\n";

    $sqlAddAdminUser = "INSERT INTO `usuarios` (`username`, `password`, `nivel_perm`) VALUES ('admin', 'admin', 0)";
    $conn->exec($sqlAddAdminUser);
    echo "Usuário 'admin' adicionado com sucesso.\n";

} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage() . "\n";
}

$conn = null;
