class Atendimento {
  constructor() {
    let $ = document.querySelector.bind(document);

    this.nome = $("#area");
    this.cpf = $("#data-hora");
    this.buttonModalAddAtendimento = $(".modal-cadastrar-atendimento");
    this.closeModal = document.querySelectorAll(
      ".delete,.close-modal,.modal-background"
    );
    this.submitAtendimento = $("#cadastrar-atendimento");

    this.bind();
  }

  bind() {
    this.buttonModalAddAtendimento.addEventListener("click", () => {
      document.querySelector(".modal-atendimento").style.display = "block";
    });

    this.submitAtendimento.addEventListener("click", () => this.addAtendimento());

    this.closeModal.forEach((button) =>
      button.addEventListener("click", () => {
        document.querySelector(".modal-atendimento").style.display = "none";
      })
    );
  }

  addAtendimento() {
    console.log('ainda faremos')
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

    notificationErrorsCuidador.scrollIntoView();
  }
}

export default Atendimento;
