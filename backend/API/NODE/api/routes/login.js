const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const pool = require("../database");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (username === "seu_usuario" && password === "sua_senha") {
    const user = { username: "seu_usuario" };

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h", 
    });

    res.json({ status: "OK", token });
  } else {
    res.status(401).json({
      status: "Unauthorized",
      message: "Credenciais inválidas.",
    });
  }
});

module.exports = router;
