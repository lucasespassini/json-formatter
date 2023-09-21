const onChangeTipoRelatorio = (checkbox) => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="tipoRelatorio"]'
  );

  for (const item of checkboxes) if (item !== checkbox) item.checked = false;
};

const gerarJson = () => {
  const input = document.getElementById("input").value;
  const checkboxes = document.getElementsByName("tipoRelatorio");

  console.log(checkboxes)
  let tipoRelatorio = "";
  checkboxes.forEach(
    (item) => item.checked === true && (tipoRelatorio = item.value)
  );

  if (!input) {
    alert("Sem conteúdo!");
    return;
  }

  const objetos = [];
  const linhas = input.split("\n");

  for (const linha of linhas) {
    const [key, valor] = linha.split(": ");
    objetos.push({ key, valor });
  }

  let data = { url: { key: "", valor: "" }, tipo: { key: "", valor: "" } };

  switch (tipoRelatorio) {
    case "lancamentos":
      data = {
        url: {
          key: "url",
          valor: "https://marte.hinova.com.br/sga/sgav4_astran/mgf/relatorio/filtroRelatorioLancamento.php",
        },
        tipo: { key: "tipo", valor: "1" },
      };
      break;
    case "veiculo":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioVeiculo.php",
        },
        tipo: { key: "tipo", valor: "2" },
      };
      break;
    case "associado":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioAssociado.php",
        },
        tipo: { key: "tipo", valor: "2" },
      };
      break;
    case "atendimento":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioAtendimento.php",
        },
        tipo: { key: "tipo", valor: "3" },
      };
      break;
    case "eventos":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioEvento.php",
        },
        tipo: { key: "tipo", valor: "3" },
      };
      break;
    case "boletos":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioBoleto.php",
        },
        tipo: { key: "tipo", valor: "4" },
      };
      break;
    case "mcv":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/mcv/relatorio/geraRelatorioCotacao.php",
        },
        tipo: { key: "tipo", valor: "6" },
      };
      break;
  }

  objetos.push(data.url);
  objetos.push(data.tipo);

  const relatorioJSON = JSON.stringify(objetos, null, 2);
  const jsonOutput = document.getElementById("jsonOutput");
  jsonOutput.textContent = relatorioJSON;

  Prism.highlightElement(jsonOutput);
};

const copiarJsonParaAreaDeTransferencia = () => {
  const jsonOutput = document.getElementById("jsonOutput").textContent;

  if (!jsonOutput) {
    alert("Sem conteúdo!");
    return;
  }

  navigator.clipboard.writeText(jsonOutput);
  alert("Json copiado com sucesso!");
};
