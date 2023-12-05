<?php
$token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;
$api_base_url = 'http://localhost:3000/api/alunos/';

// Função para fazer uma requisição à API
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

// Adicionar novo aluno
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'adicionar_aluno') {
    // Verificar se todos os campos estão presentes
    if (isset($_POST['nome'], $_POST['cpf'], $_POST['data_nascimento'], $_POST['endereco'], $_POST['telefone'])) {
        $novoAluno = [
            'nome' => $_POST['nome'],
            'cpf' => $_POST['cpf'],
            'data_nascimento' => $_POST['data_nascimento'],
            'endereco' => $_POST['endereco'],
            'telefone' => $_POST['telefone'],
        ];

        // Fazer uma requisição POST à API para adicionar o novo aluno
        makeRequest('POST', $api_base_url . 'criar', $novoAluno);
    }
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
        function editAluno(id) {
            // Implementar a lógica de edição conforme necessário
            alert('Implemente a lógica para editar o aluno com ID ' + id);
        }

        // Função para excluir um aluno
        function deleteAluno(id) {
            // Confirmar a exclusão com o usuário
            if (confirm('Deseja realmente excluir este aluno?')) {
                // Fazer uma requisição DELETE à API para excluir o aluno
                fetch('http://localhost:3000/api/alunos/delete/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': '<?= $token ?>',
                    },
                })
                .then(response => {
                    // Recarregar a página após a exclusão
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erro ao excluir aluno:', error);
                    alert('Erro ao excluir aluno. Por favor, tente novamente.');
                });
            }
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
    <!-- Adicionar novo aluno - Exibe uma caixa de diálogo para entrada de dados -->
    <button onclick="adicionarAluno()">Adicionar Novo Aluno</button>

    <script>
        function adicionarAluno() {
            // Exibir caixa de diálogo para entrada de dados do novo aluno
            const nome = prompt('Digite o nome do novo aluno:');
            const cpf = prompt('Digite o CPF do novo aluno:');
            const dataNascimento = prompt('Digite a data de nascimento do novo aluno:');
            const endereco = prompt('Digite o endereço do novo aluno:');
            const telefone = prompt('Digite o telefone do novo aluno:');

            // Verificar se o usuário inseriu informações
            if (nome && cpf && dataNascimento && endereco && telefone) {
                // Fazer uma requisição POST à API para adicionar o novo aluno
                fetch('http://localhost:3000/api/alunos/criar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': '<?= $token ?>',
                    },
                    body: JSON.stringify({
                        nome: nome,
                        cpf: cpf,
                        data_nascimento: dataNascimento,
                        endereco: endereco,
                        telefone: telefone,
                    }),
                })
                .then(response => {
                    // Recarregar a página após a adição
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erro ao adicionar aluno:', error);
                    alert('Erro ao adicionar aluno. Por favor, tente novamente.');
                });
            }
        }
    </script>
</body>
</html>
