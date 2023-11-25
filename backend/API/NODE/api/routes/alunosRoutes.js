const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("../database");

router.get("/:id?", async (req, res) => {
  const id = req.params.id;

  let query = id ? "SELECT * FROM alunos WHERE id = ?" : "SELECT * FROM ALUNOS";
  let queryParams = id ? [id] : [];

  pool.query(query, queryParams, (error, rows) => {
    if (error) {
      res.status(500).send("Something went wrong!");
    }

    if (id && rows.length === 0) {
      res
        .status(404)
        .json({
          status: "Not Found",
          message: "Nenhum aluno encontrado com o ID fornecido.",
        });
    } else {
      const response = { alunos: rows };
      res.json(response);
    }
  });
});

router.post("/criarAluno", async (req, res) => {
  const aluno = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    data_nascimento: moment(req.body.data_nascimento, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    ),
    endereco: req.body.endereco,
    telefone: req.body.telefone,
  };

  const query =
    "INSERT INTO alunos(nome, cpf, data_nascimento, endereco, telefone) VALUES(?, ?, ?, ?, ?)";
  pool.query(
    query,
    [
      aluno.nome,
      aluno.cpf,
      aluno.data_nascimento,
      aluno.endereco,
      aluno.telefone,
    ],
    (error, rows) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Ocorreu um erro em tempo de execução.");
      }

      const alunoInserido = { ...aluno, id: rows.insertId };

      res.json({ status: "OK", data: alunoInserido });
    }
  );
});

router.put("/updateAluno/:id", async (req, res) => {
  const id = req.params.id;
  const aluno = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    data_nascimento: moment(req.body.data_nascimento, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    ),
    endereco: req.body.endereco,
    telefone: req.body.telefone,
  };

  const query =
    "UPDATE alunos SET nome = ?, cpf = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id = ?";
  pool.query(
    query,
    [
      aluno.nome,
      aluno.cpf,
      aluno.data_nascimento,
      aluno.endereco,
      aluno.telefone,
      id,
    ],
    (error, rows) => {
      if (error) {
        console.error(error);
        res.status(500).send("Ocorreu um erro em tempo de execução.");
      }

      if (rows.affectedRows === 0) {
        res
          .status(404)
          .json({
            status: "Not Found",
            message: "Nenhum aluno encontrado com o ID fornecido.",
          });
      }

      res.json({ status: "OK", data: aluno });
    }
  );
});

router.delete("/deleteAluno/:id", async (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM alunos WHERE id = ?";
  pool.query(query, [id], (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Ocorreu um erro em tempo de execução.");
    }

    if (rows && rows.affectedRows === 0) {
      return res
        .status(404)
        .json({
          status: "Not Found",
          message: "Nenhum aluno com o ID mencionado.",
        });
    }

    res.json({ status: "OK" });
  });
});

module.exports = router;
