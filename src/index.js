require("./_sass/main.scss");

import ParticipanteController from "./_javascript/controllers/ParticipanteController";
import notificacao from "./_javascript/components/Notificacao";
import detailsOptions from "./_javascript/components/DetailsOptions";
import masks from "./_javascript/utils/masks";

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("[data-notification]")) {
    notificacao.bind();
  }

  if (document.querySelector(".detalhes-opcoes-botao")) {
    detailsOptions.bind();
  }

  if (document.querySelector(".button-cadastro-continuar")) {
    let participanteController = new ParticipanteController();
    participanteController.bind();

    masks.bind();
  }
});
