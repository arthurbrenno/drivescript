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
router.get("/:id?", async (req, res) => {

  if (!req.auth) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Você não está autenticado.",
    });
  }

  const id = req.params.id;

  let query = id
    ? "SELECT * FROM agendamentos WHERE id = ?"
    : "SELECT * FROM agendamentos";
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
        message: "Nenhum agendamento encontrado com o ID fornecido.",
      });
    } else {
      const response = { agendamentos: rows };
      res.json(response);
    }
  });
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
router.post("/criar", async (req, res) => {
  const requiredFields = ["aluno_id", "carro_id", "data_aula", "horario_aula"];

  const missingFields = requiredFields.filter(
    (field) => !req.body.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "Bad Request",
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const agendamento = {
    aluno_id: req.body.aluno_id,
    carro_id: req.body.carro_id,
    data_aula: moment(req.body.data_aula).format("YYYY-MM-DD"),
    horario_aula: req.body.horario_aula,
  };

  const query =
    "INSERT INTO agendamentos(aluno_id, carro_id, data_aula, horario_aula) VALUES(?, ?, ?, ?)";
  pool.query(
    query,
    [
      agendamento.aluno_id,
      agendamento.carro_id,
      agendamento.data_aula,
      agendamento.horario_aula,
    ],
    (error, rows) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Ocorreu um erro em tempo de execução.",
        });
      }

      const agendamentoInserido = { ...agendamento, id: rows.insertId };
      res.json({ status: "OK", data: agendamentoInserido });
    }
  );
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
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Nenhum campo fornecido para atualização.",
    });
  }

  const agendamento = {};

  for (const field in req.body) {
    if (req.body.hasOwnProperty(field)) {
      agendamento[field] =
        field === "data_aula"
          ? moment(req.body[field]).format("YYYY-MM-DD")
          : req.body[field];
    }
  }

  const query = "UPDATE agendamentos SET ? WHERE id = ?";
  pool.query(query, [agendamento, id], (error, rows) => {
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
        message: "Nenhum agendamento encontrado com o ID fornecido.",
      });
    }

    res.json({ status: "OK", data: agendamento });
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
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Parâmetro ID faltando.",
    });
  }

  const query = "DELETE FROM agendamentos WHERE id = ?";
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
        message: "Nenhum agendamento com o ID mencionado.",
      });
    }

    res.json({ status: "OK" });
  });
});

module.exports = router;
