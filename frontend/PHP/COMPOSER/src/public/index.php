<?php
/***********************************
 * Importante. Carregar o autoload *
 * do composer.                    *
 ***********************************/

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
            <a class="nav-link active" aria-current="page" href="index.php">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="aulaAgendamento.php">Agendar Aulas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="alunoCadastro.php">Cadastrar Alunos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="carroCadastro.php">Cadastrar Carro</a>
        </li>
        </ul>
        <h1>Autoescola DriveScript</h1>

        <div class='box'>
            <form action="exemplo.php" method="post">
                <input type="text" name="username" placeholder="username">
                <input type="password" name="password" placeholder="password">
                <input class="btn btn-primary" type="submit" value="Login">
            </form>
        </div>
       

<script>
            async function login() {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await axios.post('http://localhost:3000/login', {
                        username: username,
                        password: password
                    });

                    // Obtendo o token do response
                    const token = response.data.token;

                    // Salvando o token nos cookies
                    Cookies.set('token', token);

                    // Exemplo de como fazer uma requisição autenticada
                    const fetchData = await axios.get('http://localhost:3000/sua-rota-aqui', {
                        headers: {
                            'x-access-token': token
                        }
                    });

                    // Aqui você pode manipular os dados retornados pela requisição autenticada
                    console.log('Dados da requisição:', fetchData.data);
                } catch (error) {
                    console.error('Erro ao fazer login:', error);
                }
            }
        </script>

       <!--<script src="" async defer></script>-->

    </body>
</html>


HTML;
