const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../database");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  const queryParams = [user, password];

  pool.query(query, queryParams, (error, rows) => {
    if (error) {
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Ocorreu um erro em tempo de execução.",
      });
    }

    if (rows.length === 0) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Credenciais inválidas.",
      });
    }

    const usuario = rows[0];

    const nivel_permissao = usuario.nivel_perm;

    const token = jwt.sign(
      { userid: usuario.id, nivel_permissao: nivel_permissao },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ auth: true, token, usuario });
  });
});

module.exports = router;
