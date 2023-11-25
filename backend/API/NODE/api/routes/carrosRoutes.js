const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/:id?", async (req, res) => {
  const id = req.params.id;

  let query = id ? "SELECT * FROM carros WHERE id = ?" : "SELECT * FROM CARROS";
  let queryParams = id ? [id] : [];

  pool.query(query, queryParams, (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).send("Ocorreu um erro em tempo de execução.");
    }

    res.json({ carros: data });
  });
});

module.exports = router;
