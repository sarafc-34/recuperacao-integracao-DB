import {conexao} from "../database/conexao.js";


export async function cadastrar(leitura) {
    const sql = "INSERT INTO leitura (maquinaId, dataLeitura, consumoKwh, horasOperacao) VALUES (?, ?, ?)";
    const [resultado] = await conexao.execute(sql, [
        leitura.maquinaId,
        leitura.dataLeitura,
        leitura.consumoKwh,
        leitura.horasOperacao
    ]);

    return resultado.insertId;
}

export async function listar() {
    const sql = "SELECT * FROM leitura ORDER BY id_leitura";
    const [linhas] = await conexao.execute(sql);

    return linhas;
}

export async function listarDetalhadas() {
    const [resultado] = await conexao.execute(`SELECT * FROM leituras`);

    return resultado;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM leitura WHERE id_leitura = ?";
    const [linhas] = await conexao.execute(sql, [id]);

    return linhas[0];
}

export async function atualizar(id, leitura) {
    const sql = "UPDATE leitura SET maquinaId = ?, dataLeitura = ?, consumoKwh = ?, horasOperacao = ? WHERE id_leitura = ?";

    const [resultado] = await conexao.execute(sql, [
        leitura.maquinaId,
        leitura.dataLeitura,
        leitura.consumoKwh,
        leitura.horasOperacao,
        id
    ])
    return resultado;
}

export async function deletar(id) {
    const sql = "DELETE FROM leitura WHERE id_leitura = ?";
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado.affectedRows;
}
