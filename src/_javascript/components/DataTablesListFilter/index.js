class DataTablesListFilter {
  static bind() {
    const messages = {
      search: "",
      searchPlaceholder: "Procurar paciente",
      info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      emptyTable: "Nenhum dado disponível na tabela",
      infoEmpty: "Mostrando de 0 até 0 de 0 registros",
      infoFiltered: "(Filtrado de _MAX_ registros)",
      thousands: ".",
      lengthMenu: "Mostrando _MENU_ registros",
      loadingRecords: "Carregando...",
      paginate: {
        first: "Primeiro",
        last: "Último",
        next: "Próximo",
        previous: "Voltar",
      },
    };

    $("#pacientes").dataTable({
      language: {
        ...messages,
      },
      dom: ' <"top"f>rt<"bottom"ip><"clear">',
    });

    $("#cuidadores").dataTable({
      language: {
        ...messages,
      },
      dom: ' <"top"f>rt<"bottom"ip><"clear">',
    });

    $("#chamadas").dataTable({
      language: {
        ...messages,
      },
      dom: ' <"top"f>rt<"bottom"ip><"clear">',
    });
  }
}

export default DataTablesListFilter;
