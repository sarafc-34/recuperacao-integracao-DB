import { LeituraEnergia } from "../model/LeituraEnergia.js";
import {
  cadastrar,
  listar,
  listarDetalhadas,
  buscarPorId,
  atualizar,
  deletar
} from "../repository/leituraEnergiaRepository.js";

export async function cadastrarLeitura(req, res) {
  try {
    const { maquinaId, dataLeitura, consumoKwh, horasOperacao } = req.body;

    if (!maquinaId || !dataLeitura || consumoKwh === undefined || horasOperacao === undefined) {
      return res.status(400).json({
        mensagem: "Máquina, data, consumo e horas de operação são obrigatórios"
      });
    }

    const leitura = new LeituraEnergia(
      maquinaId,
      dataLeitura,
      consumoKwh,
      horasOperacao
    );

    const id = await cadastrar(leitura);

    res.status(201).json({
      mensagem: "Leitura cadastrada com sucesso",
      id_leitura: id
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar leitura: " + erro
    });
  }
}

export async function listarLeituras(req, res) {
  try {
    const listaDeLeituras = await listar();
    res.status(200).json(listaDeLeituras);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar leituras: " + erro
    });
  }
}

export async function listarLeiturasDetalhadas(req, res) {
  try {
    const listaDetalhada = await listarDetalhadas();
    res.status(200).json(listaDetalhada);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar leituras detalhadas: " + erro
    });
  }
}

export async function buscarLeituraPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const leitura = await buscarPorId(id);

    if (!leitura) {
      return res.status(404).json({ mensagem: "Leitura não encontrada" });
    }

    res.status(200).json(leitura);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar leitura por ID: " + erro
    });
  }
}

export async function atualizarLeitura(req, res) {
  try {
    const id = Number(req.params.id);
    const leitura = await buscarPorId(id);

    if (!leitura) {
      return res.status(404).json({ mensagem: "Leitura não encontrada" });
    }

    const { maquinaId, dataLeitura, consumoKwh, horasOperacao } = req.body;

    if (maquinaId !== undefined) leitura.maquinaId = Number(maquinaId);
    if (dataLeitura !== undefined) leitura.dataLeitura = dataLeitura;
    if (consumoKwh !== undefined) leitura.consumoKwh = Number(consumoKwh);
    if (horasOperacao !== undefined) leitura.horasOperacao = Number(horasOperacao);

    const resultado = await atualizar(id, leitura);

    if (resultado === 0) {
      return res.status(404).json({
        mensagem: "Erro ao atualizar leitura, nenhuma leitura atualizada"
      });
    }

    res.status(200).json({ mensagem: "Leitura atualizada com sucesso" });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar leitura: " + erro
    });
  }
}

export async function deletarLeitura(req, res) {
  try {
    const id = Number(req.params.id);
    const leitura = await buscarPorId(id);

    if (!leitura) {
      return res.status(404).json({ mensagem: "Leitura não encontrada" });
    }

    const resultado = await deletar(id);

    if (resultado === 0) {
      return res.status(404).json({ mensagem: "Nenhuma leitura deletada" });
    }

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar leitura: " + erro
    });
  }
}
