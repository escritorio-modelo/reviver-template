const DetailsOptions = {
  bind: () => {
    document
      .querySelector(".detalhes-opcoes-botao")
      .addEventListener("click", function () {
        let bodyOptions = document.querySelector(".detalhes-opcoes-body");
        bodyOptions.style.display == "block"
          ? (bodyOptions.style.display = "none")
          : (bodyOptions.style.display = "block");
      });
  },
};

export default DetailsOptions;
