export class Maquina {
  constructor(codigo, nome, setor, status = "ativa") {
    this.codigo = codigo;
    this.nome = nome;
    this.setor = setor;
    this.status = status;
  }

  validar() {
    if (!this.codigo || !this.nome || !this.setor) {
      throw new Error("Código, nome e setor são obrigatórios.");
    }

    if (!["ativa", "inativa"].includes(this.status)) {
      throw new Error("O status deve ser ativa ou inativa.");
    }
  }
}
