import { Maquina } from "../model/Maquina.js";
import {
  cadastrar,
  listar,
  buscarPorId,
  atualizar,
  deletar
} from "../repository/maquinaRepository.js";

export async function cadastrarMaquina(req, res) {
  try {
    const { codigo, nome, setor, status } = req.body;

    if (!codigo || !nome || !setor) {
      return res.status(400).json({
        mensagem: "Código, nome e setor são obrigatórios"
      });
    }

    const maquina = new Maquina(codigo, nome, setor, status);
    const id = await cadastrar(maquina);

    res.status(201).json({
      mensagem: "Máquina cadastrada com sucesso",
      id_maquina: id
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar máquina: " + erro
    });
  }
}

export async function listarMaquinas(req, res) {
  try {
    const listaDeMaquinas = await listar();
    res.status(200).json(listaDeMaquinas);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar máquinas: " + erro
    });
  }
}

export async function buscarMaquinaPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const maquina = await buscarPorId(id);

    if (!maquina) {
      return res.status(404).json({ mensagem: "Máquina não encontrada" });
    }

    res.status(200).json(maquina);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar máquina por ID: " + erro
    });
  }
}

export async function atualizarMaquina(req, res) {
  try {
    const id = Number(req.params.id);
    const maquina = await buscarPorId(id);

    if (!maquina) {
      return res.status(404).json({ mensagem: "Máquina não encontrada" });
    }

    const { codigo, nome, setor, status } = req.body;

    if (codigo !== undefined) maquina.codigo = codigo;
    if (nome !== undefined) maquina.nome = nome;
    if (setor !== undefined) maquina.setor = setor;
    if (status !== undefined) maquina.status = status;

    const resultado = await atualizar(id, maquina);

    if (resultado === 0) {
      return res.status(404).json({
        mensagem: "Erro ao atualizar máquina, nenhuma máquina atualizada"
      });
    }

    res.status(200).json({ mensagem: "Máquina atualizada com sucesso" });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar máquina: " + erro
    });
  }
}

export async function deletarMaquina(req, res) {
  try {
    const id = Number(req.params.id);
    const maquina = await buscarPorId(id);

    if (!maquina) {
      return res.status(404).json({ mensagem: "Máquina não encontrada" });
    }

    const resultado = await deletar(id);

    if (resultado === 0) {
      return res.status(404).json({ mensagem: "Nenhuma máquina deletada" });
    }

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar máquina: " + erro
    });
  }
}
