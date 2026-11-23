import conexao from "../database/conexao.js";


export async function cadastrar(maquina) {
    const sql = "INSERT INTO maquina (codigo, nome, setor, status ) VALUES (?, ?, ?)";
    const [resultado] = await conexao.execute(sql, [
        maquina.codigo,
        maquina.nome,
        maquina.setor,
        maquina.status
    ]);

    return resultado.insertId;
}

export async function listar() {
    const sql = "SELECT * FROM maquina ORDER BY id_maquina";
    const [linhas] = await conexao.execute(sql);

    return linhas;
}

export async function buscarPorId(id) {
    const sql = "SELECT * FROM maquina WHERE id_maquina = ?";
    const [linhas] = await conexao.execute(sql, [id]);

    return linhas[0];
}

export async function atualizar(id, maquina) {
    const sql = "UPDATE maquina SET codigo = ?, nome = ?, setor = ?, status = ? WHERE id_leitura = ?";
    const [resultado] = await conexao.execute(sql, )
        maquina.codigo,
        maquina.nome,
        maquina.setor,
        maquina.status
        id
}

export async function deletar(id) {
const sql = "DELETE FROM maquina WHERE id_maquina = ?";
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado.affectedRows;
}
