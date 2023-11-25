const express = require("express");
const router = express.Router();
const pool = require("../database");

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
  const id = req.params.id;

  let query = id ? "SELECT * FROM carros WHERE id = ?" : "SELECT * FROM CARROS";
  let queryParams = id ? [id] : [];

  pool.query(query, queryParams, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Ocorreu um erro em tempo de execução.",
      });
    }

    res.json({ carros: data });
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
  const requiredParams = [
    "marca",
    "modelo",
    "ano",
    "placa",
    "capacidade_de_passageiros",
  ];

  const missingParams = requiredParams.filter(
    (param) => !req.body.hasOwnProperty(param)
  );

  if (missingParams.length > 0) {
    return res.status(400).json({
      status: "Bad Request",
      message: `Missing required parameters: ${missingParams.join(", ")}`,
    });
  }

  const carro = {
    marca: req.body.marca,
    modelo: req.body.modelo,
    ano: req.body.ano,
    placa: req.body.placa,
    capacidade_de_passageiros: req.body.capacidade_de_passageiros,
  };

  const query =
    "INSERT INTO carros(marca, modelo, ano, placa, capacidade_passageiros) VALUES(?, ?, ?, ?, ?)";
  pool.query(
    query,
    [
      carro.marca,
      carro.modelo,
      carro.ano,
      carro.placa,
      carro.capacidade_de_passageiros,
    ],
    (error, rows) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Ocorreu um erro em tempo de execução.",
        });
      }

      const carroInserido = { ...carro, id: rows.insertId };
      res.json({ status: "OK", data: carroInserido });
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

  const carro = {};

  for (const field in req.body) {
    if (req.body.hasOwnProperty(field)) {
      carro[field] = req.body[field];
    }
  }

  const query = "UPDATE carros SET ? WHERE id = ?";
  pool.query(query, [carro, id], (error, rows) => {
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
        message: "Nenhum carro encontrado com o ID fornecido.",
      });
    }

    res.json({ status: "OK", data: carro });
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

  const query = "DELETE FROM carros WHERE id = ?";
  pool.query(query, [id], (error, rows) => {
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
        message: "Nenhum carro encontrado com o ID fornecido.",
      });
    }

    res.json({ status: "OK", affectedRows: rows.affectedRows });
  });
});

module.exports = router;