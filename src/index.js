require("./_sass/main.scss");

import notificacao from "./_javascript/components/Notificacao";
import DetailsOptions from "./_javascript/components/DetailsOptions";
import ParticipanteController from "./_javascript/controllers/ParticipanteController";

document.addEventListener("DOMContentLoaded", function () {
  notificacao.bind();

  if (document.querySelector(".detalhes-opcoes-botao")) {
    DetailsOptions.bind();
  }

  if (document.querySelector(".button-cadastro-continuar")) {
    let participanteController = new ParticipanteController();
    participanteController.bind();
  }
});
