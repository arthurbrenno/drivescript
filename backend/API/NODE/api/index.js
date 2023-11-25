
const express = require('express')
const app     = express();
const mysql   = require('mysql');
const moment   = require('moment');

require('dotenv').config()

const pool = mysql.createPool({
   host: process.env.HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DATABASE,
   connectionLimit: process.env.CONNECTION_LIMIT
});

app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const port = process.env.PORT;

app.listen(port, () => {
   console.log(`API na porta ${port}`);
});

app.get("/api/health", async (req, res) => {
   res.json({
       status: "API On Demand"
   });
   res.status(200).send();
});

app.get("/api/alunos", async (req, res) => {
    const query = "SELECT * FROM alunos";
    pool.query(query, [], (error, rows) => {
        if (error) {
            res.status(500).send('Something went wrong!');
        }
        res.json({"alunos": rows});
    });
});

app.post("/api/criarAluno", async (req, res) => {
    const aluno = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: moment(req.body.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        endereco: req.body.endereco,
        telefone: req.body.telefone
    };

    const query = "INSERT INTO alunos(nome, cpf, data_nascimento, endereco, telefone) VALUES(?, ?, ?, ?, ?)";
    pool.query(query, [aluno.nome, aluno.cpf, aluno.data_nascimento, aluno.endereco, aluno.telefone], (error, rows) => {

       if (error) {
           console.error(error);
           return res.status(500).send('Ocorreu um erro em tempo de execução.');
       }

       const alunoInserido = { ...aluno, id: rows.insertId }; 

       res.json({ status: "OK", data: alunoInserido });

    });
});

app.put("/api/updateAluno/:id", async (req, res) => {
    
    const id = req.params.id;
    const aluno = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: moment(req.body.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        endereco: req.body.endereco,
        telefone: req.body.telefone
    };

    const query = "UPDATE alunos SET nome = ?, cpf = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id = ?";
    pool.query(query, [aluno.nome, aluno.cpf, aluno.data_nascimento, aluno.endereco, aluno.telefone, id], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Ocorreu um erro em tempo de execução.");
        }

        if (rows.affectedRows === 0) {
            res.status(404).json({ status: "Not Found", message: "Nenhum aluno encontrado com o ID fornecido." });
        } 

        res.json({ status: "OK", data: aluno });
    });

});

app.delete("/api/deleteAluno/:id", async (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM alunos WHERE id = ?";
    pool.query(query, [id], (error, rows) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Ocorreu um erro em tempo de execução.");
        }
        
        if (rows && rows.affectedRows === 0) {
            return res.status(404).json({status: "Not Found", message: "Nenhum aluno com o ID mencionado."});
        }

        res.json({status: "OK"});
    });
});

