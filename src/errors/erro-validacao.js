import RequisicaoIncorreta from "./requisicao-incorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {

    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`${mensagensErro}`);

  }
}

export default ErroValidacao;