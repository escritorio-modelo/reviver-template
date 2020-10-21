import paciente from "../domain/Paciente/Paciente";
import cuidador from "../domain/Cuidador/Cuidador";

class ParticipanteController {
  constructor() {
    this.currentTab = 0;

    let $ = document.querySelector.bind(document);

    this.buttonNext = $(".button-cadastro-continuar");
    this.buttonPrev = $(".button-cadastro-voltar");
    this.buttonModalAddPaciente = $(".modal-cadastrar-paciente");
    this.buttonModalAddCuidador = $(".modal-cadastrar-cuidador");
    this.closeModal = document.querySelectorAll(
      ".delete,.close-modal,.modal-background"
    );
    this.submitPaciente = $("#cadastrar-paciente");
    this.submitCuidador = $("#cadastrar-cuidador");
  }

  bind() {
    this.buttonNext.addEventListener("click", () => this.nextPrev(1));
    this.buttonPrev.addEventListener("click", () => this.nextPrev(-1));

    this.buttonModalAddPaciente.addEventListener("click", () => {
      document.querySelector(".modal-paciente").style.display = "block";
    });
    this.buttonModalAddCuidador.addEventListener("click", () => {
      document.querySelector(".modal-cuidador").style.display = "block";
    });

    this.submitPaciente.addEventListener("click", () => this.addPaciente());
    this.submitCuidador.addEventListener("click", () => this.addCuidador());

    this.closeModal.forEach((button) =>
      button.addEventListener("click", () => {
        document.querySelector(".modal-cuidador").style.display = "none";
        document.querySelector(".modal-paciente").style.display = "none";
      })
    );

    $(document).ready(function () {
      $("#paciente").select2({
        ajax: {
          url: "/api/pacientes/select/",
          dataType: "json",
          delay: 250,
          processResults: function (response) {
            return {
              results: response,
            };
          },
          cache: true,
          data: function (params) {
            var queries = {
              query: params.term,
            };
            return queries;
          },
        },
      });
    });

    $(document).ready(function () {
      $("#cuidador").select2({
        ajax: {
          url: "/api/cuidadores/select/",
          dataType: "json",
          delay: 250,
          processResults: function (response) {
            return {
              results: response,
            };
          },
          cache: true,
          data: function (params) {
            var queries = {
              query: params.term,
            };
            return queries;
          },
        },
      });
    });

    this.showTab(this.currentTab);
  }

  addPaciente() {
    let Paciente = new paciente();
    Paciente.add();
  }
  addCuidador() {
    let Cuidador = new cuidador();
    Cuidador.add();
  }

  showTab(currentTab) {
    let tabs = document.getElementsByClassName("tab");
    tabs[currentTab].style.display = "block";

    if (currentTab === 0) {
      this.buttonPrev.style.visibility = "hidden";
    } else {
      this.buttonPrev.style.visibility = "visible";
    }

    if (currentTab === tabs.length - 1) {
      this.buttonNext.innerHTML = "Finalizar &#10003;";
    } else {
      this.buttonNext.innerHTML = "Continuar";
    }

    this.fixStepIndicator(currentTab);
  }

  fixStepIndicator(currentTab) {
    let i;
    let sessions = document.getElementsByClassName("session-item");

    for (i = 0; i < sessions.length; i++) {
      if (i > currentTab) {
        sessions[i].classList.remove("item-checked");
      } else if (i < currentTab) {
        sessions[i].classList.add("item-checked");
      }
    }

    sessions[currentTab].classList.add("item-checked");
  }

  nextPrev(nextPrevtab) {
    let tabs = document.getElementsByClassName("tab");

    tabs[this.currentTab].style.display = "none";
    this.currentTab = this.currentTab + nextPrevtab;

    if (this.currentTab >= tabs.length) {
      document.getElementById("regForm").submit();
      return false;
    }

    this.showTab(this.currentTab);
  }
}

export default ParticipanteController;
