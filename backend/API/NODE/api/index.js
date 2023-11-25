const express = require("express");
const app = express();
const alunosRoutes = require("./routes/alunosRoutes");
const carrosRoutes = require("./routes/carrosRoutes");
const agendamentosRoutes = require("./routes/agendamentoRoutes");

require("dotenv").config();

app.use(express.json());
app.use("/api/alunos", alunosRoutes);
app.use("/api/carros", carrosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API na porta ${port}`);
});
