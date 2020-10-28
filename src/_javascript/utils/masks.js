class Mascaras {
  static bind() {
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
      phone(value) {
        return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
          .replace(/(-\d{4})\d+?$/, "$1");
      },
      cep(value) {
        return value
          .replace(/\D/g, "")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{3})\d+?$/, "$1");
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
  }

  static removeMask(mask, inputValue) {
    if (mask === "cpf") {
      let oneQuarter = inputValue.slice(0, 3);
      let twoQuarter = inputValue.slice(4, 7);
      let threeQuarter = inputValue.slice(8, 11);
      let fourQuarter = inputValue.slice(12);

      return `${oneQuarter}${twoQuarter}${threeQuarter}${fourQuarter}`;
    }
    if (mask === "phone") {
      let ddd = inputValue.slice(1, 3);
      let number = inputValue.slice(5).replace("-", "");

      return `${ddd}${number}`;
    }
    if (mask === "cep") {
      return inputValue.replace("-", "");
    }
  }

  static addMask(mask, value) {
    if (mask === "cpf") {
      let oneQuarter = value.slice(0, 3);
      let twoQuarter = value.slice(4, 7);
      let threeQuarter = value.slice(8, 11);
      let fourQuarter = value.slice(12);

      return `${oneQuarter}.${twoQuarter}.${threeQuarter}-${fourQuarter}`;
    }
    if (mask === "phone") {
      let ddd = value.slice(1, 3);
      let number = value.slice(5);

      return `(${ddd}) ${number}`;
    }
    if (mask === "cep") {
      return `${value.slice(0, 4)}-${value.slice(5)}`;
    }
  }
}

export default Mascaras;
