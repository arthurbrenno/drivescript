const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("../database");
const verificaToken = require("../middleware/auth");

/*
..######.
.##....##
.##......
.##......
.##......
.##....##
..######.
*/
router.post("/criar", verificaToken, async (req, res) => {

  if (!req.auth) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Você não está autenticado.",
    });
  }

  if (req.nivel_permissao !== 0) {
    return res.status(403).json({
      status: "Forbidden",
      message: "Você não tem permissão para criar alunos.",
    });
  }

  const requiredFields = [
    "nome",
    "cpf",
    "data_nascimento",
    "endereco",
    "telefone",
  ];

  const missingFields = requiredFields.filter(
    (field) => !req.body.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "Bad Request",
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

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
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Ocorreu um erro em tempo de execução.",
        });
      }

      const alunoInserido = { ...aluno, id: rows.insertId };

      res.json({ status: "OK", data: alunoInserido });
    }
  );
});

/*
.########.
.##.....##
.##.....##
.########.
.##...##..
.##....##.
.##.....##
*/
router.get("/:id?", verificaToken, async (req, res) => {

  if (!req.auth) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Você não está autenticado.",
    });
  }

  if (req.nivel_permissao !== 0) {
    return res.status(403).json({
      status: "Forbidden",
      message: "Você não tem permissão para listar alunos.",
    });
  }

  const id = req.params.id;

  let query = id ? "SELECT * FROM alunos WHERE id = ?" : "SELECT * FROM ALUNOS";
  let queryParams = id ? [id] : [];

  pool.query(query, queryParams, (error, rows) => {
    if (error) {
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Ocorreu um erro em tempo de execução.",
      });
    }

    if (id && rows.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "Nenhum aluno encontrado com o ID fornecido.",
      });
    } else {
      const response = { alunos: rows };
      res.json(response);
    }
  });
});

/*
.##.....##
.##.....##
.##.....##
.##.....##
.##.....##
.##.....##
..#######.
*/
router.put("/update/:id", verificaToken, async (req, res) => {

  if (!req.auth) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Você não está autenticado.",
    });
  }

  if (req.nivel_permissao !== 0) {
    return res.status(403).json({
      status: "Forbidden",
      message: "Você não tem permissão para alterar alunos.",
    });
  }

  const id = req.params.id;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Nenhum campo fornecido para atualização.",
    });
  }

  const aluno = {};

  for (const field in req.body) {
    if (req.body.hasOwnProperty(field)) {
      aluno[field] =
        field === "data_nascimento"
          ? moment(req.body[field], "DD/MM/YYYY").format("YYYY-MM-DD")
          : req.body[field];
    }
  }

  const query = "UPDATE alunos SET ? WHERE id = ?";
  pool.query(query, [aluno, id], (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Ocorreu um erro em tempo de execução.",
      });
    }

    if (rows.affectedRows === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "Nenhum aluno encontrado com o ID fornecido.",
      });
    }

    res.json({ status: "OK", data: aluno });
  });
});

/*
.########.
.##.....##
.##.....##
.##.....##
.##.....##
.##.....##
.########.
*/
router.delete("/delete/:id", verificaToken, async (req, res) => {

  if (!req.auth) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Você não está autenticado.",
    });
  }

  if (req.nivel_permissao !== 0) {
    return res.status(403).json({
      status: "Forbidden",
      message: "Você não tem permissão para deletar alunos.",
    });
  }

  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Parâmetro ID faltando.",
    });
  }

  const query = "DELETE FROM alunos WHERE id = ?";
  pool.query(query, [id], (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Ocorreu um erro em tempo de execução.",
      });
    }

    if (rows && rows.affectedRows === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "Nenhum aluno com o ID mencionado.",
      });
    }

    res.json({ status: "OK" });
  });
});

module.exports = router;
