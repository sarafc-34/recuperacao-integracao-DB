export class LeituraEnergia {
  constructor(maquinaId, dataLeitura, consumoKwh, horasOperacao) {
    this.maquinaId = Number(maquinaId);
    this.dataLeitura = dataLeitura;
    this.consumoKwh = Number(consumoKwh);
    this.horasOperacao = Number(horasOperacao);
  }

  validar() {
    if (!Number.isInteger(this.maquinaId) || this.maquinaId <= 0) {
      throw new Error("O maquinaId deve ser um número inteiro positivo.");
    }

    if (!this.dataLeitura) {
      throw new Error("A data da leitura é obrigatória.");
    }

    if (this.consumoKwh < 0 || this.horasOperacao < 0) {
      throw new Error("Consumo e horas de operação não podem ser negativos.");
    }
  }
}
