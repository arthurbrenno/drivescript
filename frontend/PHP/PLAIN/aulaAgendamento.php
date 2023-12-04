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
            <a class="nav-link active" href="aulaAgendamento.php">Agendar Aulas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="alunoCadastro.php">Cadastrar Alunos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="carroCadastro.php">Cadastrar Carro</a>
        </li>
        </ul>

        <br><br><br>
        <h5>Para marcar a sua próxima aula, selecione a seguir caso esteja disponível, o melhor dia e horário para você.</h5>
        <h5>Caso queira desmarcar a sua aula já agendada basta apenas você clicar no botão de desmarcar, que o sistema irá fazer isso de acordo com a aula marcada para o seu usuário.</h5>

        <div class="box">
            <form action="exemplo.php" method="post">
            <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Nome</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="nome">
            </div>
            <div class="input-group mb-3">
                <select class="form-select" aria-label="Disabled select example">
                    <option selected>Dia da semana</option>
                    <option value="1">Segunda-feira</option>
                    <option value="2">Terça-feira</option>
                    <option value="3">Quarta-feira</option>
                    <option value="4">Quinta-feira</option>
                    <option value="5">Sexta-feira</option>
                </select>
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
                    <option selected>Horário</option>
                    <option value="1">7:00</option>
                    <option value="2">8:00</option>
                    <option value="3">9:00</option>
                    <option value="4">10:00</option>
                    <option value="5">11:00</option>
                    <option value="6">13:00</option>
                    <option value="7">14:00</option>
                    <option value="8">15:00</option>
                    <option value="9">16:00</option>
                    <option value="10">17:00</option>
                    <option value="11">18:00</option>
                    <option value="12">19:00</option>
                    <option value="13">20:00</option>
                    <option value="14">21:00</option>
                </select>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary" type="button">Agendar</button>
                <button type="button" class="btn btn-danger">Desmarcar</button>
            </div>
            </form>
        </div>

        <script src="" async defer></script>

</body>
</html>


HTML;