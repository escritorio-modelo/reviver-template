const api = {
  getListaFiltrada: (tipo, texto, pagina) => {
    let url = `/${tipo}/?titulo=${texto}&pagina=${pagina}`;

    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(this.responseText));
          }
        }
      };
      xhr.onerror = reject;
      xhr.open("GET", url, true);
      xhr.send();
    });
  },
};

export default api;
