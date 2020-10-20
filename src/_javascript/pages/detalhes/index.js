const Detalhes = {
  opcoes: () => {
    let botaoOpcao = document.querySelector(".detalhes-opcoes-botao");

    if (botaoOpcao) {
      botaoOpcao.addEventListener("click", function () {
        var bodyOptions = document.querySelector(".detalhes-opcoes-body");
        bodyOptions.style.display == "block"
          ? (bodyOptions.style.display = "none")
          : (bodyOptions.style.display = "block");
      });
    }
  },
};

export default Detalhes;
