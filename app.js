import express from "express";
import maquinaRoutes from "./routes/maquinaRoutes.js";
import leituraEnergiaRoutes from "./routes/leituraEnergiaRoutes.js";
import { conexao } from "./config/database.js";

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use("/maquinas", maquinaRoutes);
app.use("/leituras", leituraEnergiaRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API EnergyTrack em execução" });
});

try {
  await conexao();
  app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
  });
} catch (erro) {
  console.error("Não foi possível iniciar a API:", erro.message);
  process.exit(1);
}
