import ErroBase from "./erro-base.js";

class NaoEncontrado extends ErroBase {
  constructor() {
    super("página não encontrada", 404);
  }
}

export default NaoEncontrado;