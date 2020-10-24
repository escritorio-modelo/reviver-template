class DataTablesListFilter {
  static bind() {
    $("#pacientes").dataTable({
      language: {
        search: "",
        searchPlaceholder: "Procurar paciente",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      },
      dom: ' <"top"f>rt<"bottom"ip><"clear">',
    });

    $("#cuidadores").dataTable({
      language: {
        search: "",
        searchPlaceholder: "Procurar cuidador",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      },
      dom: ' <"top"f>rt<"bottom"ip><"clear">',
    });

    $("#chamadas").dataTable({
      language: {
        search: "",
        searchPlaceholder: "Procurar chamada",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      },
      dom: ' <"top"f>rt<"bottom"ip><"clear">',
    });
  }
}

export default DataTablesListFilter;
