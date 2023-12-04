<?php
/***********************************
 * Importante. Carregar o autoload *
 * do composer.                    *
 ***********************************/
require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

session_start();
$usuario = $_SESSION['username'];
$id = $_SESSION['password'];

echo "Usuário: $usuario, ID: $id";


echo <<<HTML


<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Autoescola Brennende</title>
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
            <a class="nav-link active" href="alunoCadastro.php">Cadastrar Alunos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="carroCadastro.php">Cadastrar Carro</a>
        </li>
        </ul>

        <br><br><br>
        <h5>Insira a seguir os dados do novo aluno.</h5>
        <h5>Ou edite e exclua os dados de algum aluno existente.</h5>

        <div class="box">
        <form class="row g-3 needs-validation" novalidate>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Nome</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="nome" required>
                <span class="input-group-text" id="inputGroup-sizing-default">CPF</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="cpf" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Data de Nascimento</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="data" required>
                <span class="input-group-text" id="inputGroup-sizing-default">Telefone</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="telefone" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Endereço</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="endereco" required>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Número</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="numero" required>
                <span class="input-group-text" id="inputGroup-sizing-default">Bairro</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="bairro" required>
                <span class="input-group-text" id="inputGroup-sizing-default">Cidade</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="cidade" required>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Cadastrar</button>
                <button class="btn btn-warning" type="button" >Editar</button>
                <button class="btn btn-danger" type="button">Excluir</button>
            </div>
        </form>
        </div>

        <script src="" async defer></script>

</body>
</html>


HTML;