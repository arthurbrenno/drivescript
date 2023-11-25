const express = require("express");
const app = express();
const mysql = require("mysql");
const alunosRoutes = require("./routes/alunosRoutes");
const carrosRoutes = require("./routes/carrosRoutes");
const agendamentosRoutes = require("./routes/agendamentoRoutes");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  connectionLimit: process.env.CONNECTION_LIMIT,
});

app.use(express.json());
app.use("/api/alunos", alunosRoutes);
app.use("/api/carros", carrosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API na porta ${port}`);
});
