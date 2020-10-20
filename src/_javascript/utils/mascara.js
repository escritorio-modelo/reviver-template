const mascara = () => {
  const masks = {
    data(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{4})\d+?$/, "$1");
    },
    cpf(value) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    },
  };

  document.querySelectorAll("input").forEach(($input) => {
    const campo = $input.dataset.mask;

    if (campo) {
      $input.addEventListener(
        "input",
        (event) => {
          event.target.value = masks[campo](event.target.value);
        },
        false
      );
    } else {
      return;
    }
  });
};

export default mascara;
