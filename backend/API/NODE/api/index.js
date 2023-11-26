const express = require("express");
const app = express();
const alunosRoutes = require("./routes/alunos");
const carrosRoutes = require("./routes/carros");
const agendamentosRoutes = require("./routes/agendamento");
const loginRoute = require("./routes/login");

require("dotenv").config();

app.use(express.json());
app.use("/api/alunos", alunosRoutes);
app.use("/api/carros", carrosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);
app.use("/api/login", loginRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API DEPLOYED! => ${port}`);
});
