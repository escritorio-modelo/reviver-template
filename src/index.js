require("./_sass/main.scss");

import notificacao from "./_javascript/components/notificacao";
import Detalhes from "./_javascript/pages/detalhes";
// import api from "./service/api";
import AddParticipante from "./_javascript/pages/cadastro-participante";

document.addEventListener("DOMContentLoaded", function () {
  notificacao.bind();
  Detalhes.opcoes();

  if (document.querySelector(".button-cadastro-continuar")) {
    new AddParticipante();
  }
  // api.getListaFiltrada("chamadas", "xx", 0).then((res) => console.log(res));
});
