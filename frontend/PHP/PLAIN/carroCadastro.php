<?php
/***********************************
 * Importante. Carregar o autoload *
 * do composer.                    *
 ***********************************/

session_start();
$usuario = $_SESSION['username'] ?? '';
$id = $_SESSION['password'] ?? '';


echo <<<HTML


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Autoescola DriveScript</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"></script>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="index.php">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="aulaAgendamento.php">Agendar Aulas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="alunoCadastro.php">Cadastrar Alunos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" href="carroCadastro.php">Cadastrar Carro</a>
        </li>
        </ul>

        <br><br><br>
        <h5>A seguir informe os dados do novo veículo.</h5>

        <div class="box">
            <form action="exemplo.php" method="post">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Modelo</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="modelo">
                <span class="input-group-text" id="inputGroup-sizing-default">Placa</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="placa">
            </div>
            <div class="input-group mb-3">
                <select class="form-select" aria-label="Disabled select example">
                    <option selected>Veículo</option>
                    <option value="1">Moto</option>
                    <option value="2">Carro</option>
                    <option value="3">Ônibus</option>
                    <option value="4">Caminhão</option>
                </select>
                <select class="form-select" aria-label="Disabled select example">
                    <option selected>Cor</option>
                    <option value="1">Preto</option>
                    <option value="2">Branco</option>
                    <option value="3">Vermelho</option>
                    <option value="4">Laranja</option>
                </select>
            </div>
            <input class="btn btn-primary" type="submit" value="Cadastrar">
            </form>
        </div>

        <script src="" async defer></script>

</body>
</html>


HTML;