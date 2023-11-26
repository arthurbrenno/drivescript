const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 
const app = express();
const alunosRoutes = require("./routes/alunos");
const carrosRoutes = require("./routes/carros");
const agendamentosRoutes = require("./routes/agendamento");
const loginRoute = require("./routes/login");

require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(morgan('dev'));
app.use("/api/alunos", alunosRoutes);
app.use("/api/carros", carrosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);
app.use("/api/login", loginRoute);

const obterTempoAtual = () => {
  const now = new Date();
  const horas = now.getHours().toString().padStart(2, '0');
  const minutos = now.getMinutes().toString().padStart(2, '0');
  const segundos = now.getSeconds().toString().padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
};

const port = process.env.PORT;
app.listen(port, () => {
  console.clear();
  console.log(`[online] Servidor Backend na porta ${port}`);
  console.log(`Última atualização: ${obterTempoAtual()}`);
});
