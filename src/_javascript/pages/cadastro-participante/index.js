export default class AddParticipante {
  constructor() {
    this.currentTab = 0;
    this.showTab(this.currentTab);
    this.bind();

    document
      .querySelector(".button-cadastro-continuar")
      .addEventListener("click", () => this.nextPrev(1));
    document
      .querySelector(".button-cadastro-voltar")
      .addEventListener("click", () => this.nextPrev(-1));
    document
      .querySelector(".modal-cadastrar-paciente")
      .addEventListener("click", () => {
        document.querySelector(".modal-paciente").style.display = "block";
      });
    document
      .querySelector(".modal-cadastrar-cuidador")
      .addEventListener("click", () => {
        document.querySelector(".modal-cuidador").style.display = "block";
      });
    document
      .querySelectorAll(".delete,.close-modal,.modal-background")
      .forEach((button) =>
        button.addEventListener("click", () => {
          document.querySelector(".modal-cuidador").style.display = "none";
          document.querySelector(".modal-paciente").style.display = "none";
        })
      );
  }

  showTab(currentTab) {
    let tabs = document.getElementsByClassName("tab");
    tabs[currentTab].style.display = "block";

    if (currentTab === 0) {
      document.querySelector(".button-cadastro-voltar").style.visibility =
        "hidden";
    } else {
      document.querySelector(".button-cadastro-voltar").style.visibility =
        "visible";
    }

    if (currentTab === tabs.length - 1) {
      document.querySelector(".button-cadastro-continuar").innerHTML =
        "Finalizar &#10003;";
    } else {
      document.querySelector(".button-cadastro-continuar").innerHTML =
        "Continuar";
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

  bind() {
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

    document
      .querySelector("#cadastrar-cuidador")
      .addEventListener("click", () => {
        let cuidadorData = {
          nome: document.querySelector("#nome-cuidador").value,
          cpf: document.querySelector("#cpf-cuidador").value,
          dataNascimento: document.querySelector("#nascimento-cuidador").value,
          email: document.querySelector("#email-cuidador").value,
          genero: document.querySelector("#genero-cuidador").value,
          estadoCivil: document.querySelector("#estadocivil-cuidador").value,
          telefone: [document.querySelector("#telefone-cuidador").value],
          endereco: {
            numero: document.querySelector("#numero-cuidador").value,
            complemento: document.querySelector("#complemento-cuidador").value,
            cep: document.querySelector("#cep-cuidador").value,
            rua: {
              nome: document.querySelector("#rua-cuidador").value,
              bairro: {
                nome: document.querySelector("#bairro-cuidador").value,
                cidade: {
                  nome: document.querySelector("#cidade-cuidador").value,
                  estado: {
                    nome: document.querySelector("#estado-cuidador").value,
                  },
                },
              },
            },
          },
        };

        $.ajax({
          type: "POST",
          url: "/api/cuidadores/",
          data: JSON.stringify(cuidadorData),
          contentType: "application/json",
          success: function (res) {
            var newState = new Option(res.nome, res.id, true, true);
            $("#cuidador").append(newState).trigger("change");
            document.querySelector(".modal-cuidador").style.display = "none";
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            mostrarErrosCuidador(XMLHttpRequest.responseJSON);
          },
        });
      });

    document
      .querySelector("#cadastrar-paciente")
      .addEventListener("click", () => {
        let pacienteData = {
          nome: document.querySelector("#nome-paciente").value,
          cpf: document.querySelector("#cpf-paciente").value,
          dataNascimento: document.querySelector("#nascimento-paciente").value,
          email: document.querySelector("#email-paciente").value,
          genero: document.querySelector("#genero-paciente").value,
          estadoCivil: document.querySelector("#estadocivil-paciente").value,
          parkinson:
            document.querySelector("#parkinson").value == "on" ? true : false,
          alzheimer:
            document.querySelector("#alzheimer").value == "on" ? true : false,
          telefone: [document.querySelector("#telefone-paciente").value],
          endereco: {
            numero: document.querySelector("#numero-paciente").value,
            complemento: document.querySelector("#complemento-paciente").value,
            cep: document.querySelector("#cep-paciente").value,
            rua: {
              nome: document.querySelector("#rua-paciente").value,
              bairro: {
                nome: document.querySelector("#bairro-paciente").value,
                cidade: {
                  nome: document.querySelector("#cidade-paciente").value,
                  estado: {
                    nome: document.querySelector("#estado-paciente").value,
                  },
                },
              },
            },
          },
        };

        $.ajax({
          type: "POST",
          url: "/api/pacientes/",
          data: JSON.stringify(pacienteData),
          contentType: "application/json",
          success: function (res) {
            console.log(res);
            var newState = new Option(res.nome, res.id, true, true);
            $("#paciente").append(newState).trigger("change");
            console.log(res);
            document.querySelector(".modal-paciente").style.display = "none";
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            mostrarErrosPaciente(XMLHttpRequest.responseJSON);
          },
        });
      });

    function mostrarErrosPaciente(data) {
      let camposErros = data.campos;
      let notificationErrorsPaciente = document.querySelector(
        "#noticacao-erros-paciente"
      );
      notificationErrorsPaciente.innerHTML = "";

      camposErros.map((campo) => {
        let line = `<div class="notification is-light is-danger">
              <p>${campo.mensagem}</p>
          </div>`;
        notificationErrorsPaciente.innerHTML += line;
      });
    }

    function mostrarErrosCuidador(data) {
      let camposErros = data.campos;
      let notificationErrorsCuidador = document.querySelector(
        "#noticacao-erros-cuidador"
      );
      notificationErrorsCuidador.innerHTML = "";

      camposErros.map((campo) => {
        let line = `<div class="notification is-light is-danger">
              <p>${campo.mensagem}</p>
          </div>`;
        notificationErrorsCuidador.innerHTML += line;
      });
    }
  }
}
