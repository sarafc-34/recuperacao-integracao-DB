import { Router } from "express";
import {
  cadastrarLeitura,
  listarLeituras,
  listarLeiturasDetalhadas,
  buscarLeituraPorId,
  atualizarLeitura,
  deletarLeitura
} from "../controller/leituraEnergiaController.js";

const router = Router();

router.post("/", cadastrarLeitura);
router.get("/", listarLeituras);
router.get("/detalhadas", listarLeiturasDetalhadas);
router.get("/:id", buscarLeituraPorId);
router.patch("/:id", atualizarLeitura);
router.delete("/:id", deletarLeitura);

export default router;
