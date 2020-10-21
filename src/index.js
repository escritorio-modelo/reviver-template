require("./_sass/main.scss");

import notificacao from "./_javascript/components/notificacao";
import Detalhes from "./_javascript/pages/detalhes";
import mascara from "./_javascript/utils/mascara";
import ParticipanteController from "./_javascript/controllers/ParticipanteController";

document.addEventListener("DOMContentLoaded", function () {
  notificacao.bind();
  Detalhes.opcoes();
  // mascara();

  if (document.querySelector(".button-cadastro-continuar")) {
    let participanteController = new ParticipanteController();
    participanteController.bind();
  }
});
