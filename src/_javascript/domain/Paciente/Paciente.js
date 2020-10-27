import masks from "../../utils/masks";

class Paciente {
  constructor() {
    let $ = document.querySelector.bind(document);

    this.nome = $("#nome-paciente");
    this.cpf = $("#cpf-paciente");
    this.dataNascimento = $("#nascimento-paciente");
    this.email = $("#email-paciente");
    this.genero = $("#genero-paciente");
    this.estadoCivil = $("#estadocivil-paciente");
    this.parkinson = $("#parkinson");
    this.alzheimer = $("#alzheimer");
    this.telefone = $("#telefone-paciente");
    this.enderecoNumero = $("#numero-paciente");
    this.complemento = $("#complemento-paciente");
    this.cep = $("#cep-paciente");
    this.rua = $("#rua-paciente");
    this.bairro = $("#bairro-paciente");
    this.cidade = $("#cidade-paciente");
    this.estado = $("#estado-paciente");
  }

  add() {
    let cpfWithoutMask = masks.removeMask("cpf", this.cpf.value);
    let cepWithoutMask = masks.removeMask("cep", this.cep.value);
    let phoneWithoutMask = masks.removeMask("phone", this.telefone.value);

    let data = {
      nome: this.nome.value,
      cpf: cpfWithoutMask,
      dataNascimento: this.dataNascimento.value,
      email: this.email.value,
      genero: this.genero.value,
      estadoCivil: this.estadoCivil.value,
      parkinson: this.parkinson.checked,
      alzheimer: this.alzheimer.checked,
      telefone: [phoneWithoutMask],
      endereco: {
        numero: this.enderecoNumero.value,
        complemento: this.complemento.value,
        cep: cepWithoutMask,
        rua: {
          nome: this.rua.value,
          bairro: {
            nome: this.bairro.value,
            cidade: {
              nome: this.cidade.value,
              estado: {
                nome: this.estado.value,
              },
            },
          },
        },
      },
    };
    var self = this;

    $.ajax({
      type: "POST",
      url: "/api/pacientes/",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (res) {
        console.log(res);
        let newState = new Option(res.nome, res.id, true, true);
        $("#paciente").append(newState).trigger("change");
        console.log(res);
        document.querySelector(".modal-paciente").style.display = "none";
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        self.showErrors(XMLHttpRequest.responseJSON);
      },
    });
  }

  showErrors(data) {
    let inputErrors = data.campos;
    let notificationErrorsPaciente = document.querySelector(
      "#noticacao-erros-paciente"
    );
    notificationErrorsPaciente.innerHTML = "";

    inputErrors.map((campo) => {
      let line = `<div class="notification is-light is-danger">
              <p>${campo.mensagem}</p>
          </div>`;
      notificationErrorsPaciente.innerHTML += line;
    });
  }
}

export default Paciente;
