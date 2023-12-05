<?php
$token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;
$api_base_url = 'http://localhost:3000/api/alunos/';

function makeRequest($method, $url, $data = null) {
    global $token;

    $headers = [
        'Content-Type: application/json',
        'x-access-token: ' . $token,
    ];

    $options = [
        'http' => [
            'header' => implode("\r\n", $headers),
            'method' => $method,
            'content' => $data ? json_encode($data) : null,
        ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    return json_decode($result, true);
}

// Função para exibir um aluno na forma de uma linha de tabela HTML
function displayAlunoRow($aluno) {
    echo "<tr>";
    echo "<td>{$aluno['id']}</td>";
    echo "<td>{$aluno['nome']}</td>";
    echo "<td>{$aluno['cpf']}</td>";
    echo "<td>{$aluno['data_nascimento']}</td>";
    echo "<td>{$aluno['endereco']}</td>";
    echo "<td>{$aluno['telefone']}</td>";
    echo "<td><button onclick='editAluno({$aluno['id']})'>Editar</button></td>";
    echo "<td><button onclick='deleteAluno({$aluno['id']})'>Excluir</button></td>";
    echo "</tr>";
}

// Listar todos os alunos
$alunos = makeRequest('GET', $api_base_url);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciamento de Alunos</title>
    <script>
        // Função para editar um aluno
        async function editAluno(id) {
            
        }

        // Função para excluir um aluno
        async function deleteAluno(id) {
            //make a DELETE request to the API http://localhost:3000/api/alunos/delete/{id}
            //use the fetch api
            //use the async/await syntax
            //use the try/catch syntax
            const response = await fetch('http://localhost:3000/api/alunos/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': '<?= $token ?>',
                },
            });
        }
    </script>
</head>
<body>
    <h2>Lista de Alunos</h2>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
        </thead>
        <tbody>
            <?php
                foreach ($alunos['alunos'] as $aluno) {
                    displayAlunoRow($aluno);
                }
            ?>
        </tbody>
    </table>
    <br>
    <button onclick="alert('Implemente a lógica para adicionar um novo aluno')">Adicionar Novo Aluno</button>
</body>
</html>
