import { createStore } from "vuex";

const crieNovaInstancia = () =>
  createStore({
    state: {
      logado: true,
    },
    mutations: {
      setlogado(state, ativo) {
        state.logado = ativo;
      },
    },
  });

export default crieNovaInstancia();
export { crieNovaInstancia };
