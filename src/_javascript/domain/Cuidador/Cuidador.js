import masks from "../../utils/masks";

class Cuidador {
  constructor() {
    let $ = document.querySelector.bind(document);

    this.nome = $("#nome-cuidador");
    this.cpf = $("#cpf-cuidador");
    this.dataNascimento = $("#nascimento-cuidador");
    this.email = $("#email-cuidador");
    this.genero = $("#genero-cuidador");
    this.estadoCivil = $("#estadocivil-cuidador");
    this.telefone = $("#telefone-cuidador");
    this.enderecoNumero = $("#numero-cuidador");
    this.complemento = $("#complemento-cuidador");
    this.cep = $("#cep-cuidador");
    this.rua = $("#rua-cuidador");
    this.bairro = $("#bairro-cuidador");
    this.cidade = $("#cidade-cuidador");
    this.estado = $("#estado-cuidador");
  }

  add() {
    let cpfWithoutMask = masks.removeMask("cpf", this.cpf.value);

    let data = {
      nome: this.nome.value,
      cpf: cpfWithoutMask,
      dataNascimento: this.dataNascimento.value,
      email: this.email.value,
      genero: this.genero.value,
      estadoCivil: this.estadoCivil.value,
      telefone: [this.telefone.value],
      endereco: {
        numero: this.enderecoNumero.value,
        complemento: this.complemento.value,
        cep: this.cep.value,
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
      url: "/api/cuidadores/",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (res) {
        let newState = new Option(res.nome, res.id, true, true);
        $("#cuidador").append(newState).trigger("change");
        document.querySelector(".modal-cuidador").style.display = "none";
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        self.showErrors(XMLHttpRequest.responseJSON);
      },
    });
  }

  showErrors(data) {
    let inputErrors = data.campos;
    let notificationErrorsCuidador = document.querySelector(
      "#noticacao-erros-cuidador"
    );
    notificationErrorsCuidador.innerHTML = "";

    inputErrors.map((campo) => {
      let line = `<div class="notification is-light is-danger">
              <p>${campo.mensagem}</p>
          </div>`;
      notificationErrorsCuidador.innerHTML += line;
    });
  }
}

export default Cuidador;
