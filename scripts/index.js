const verificaJsonValido = () => {
  const input = document.getElementById("input");
  const inputValue = input.value
  try {
    if (!inputValue) {
      input.classList.remove('invalid-input')
      return
    }

    JSON.parse(inputValue)
    input.classList.remove('invalid-input')
  } catch (error) {
    input.classList.add('invalid-input')
  }
};

const onChangeTipoRelatorio = (checkbox) => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="tipoRelatorio"]'
  );

  for (const item of checkboxes) if (item !== checkbox) item.checked = false;
};

const gerarJson = () => {
  const input = document.getElementById("input").value;
  const checkboxes = document.getElementsByName("tipoRelatorio");

  let tipoRelatorio = "";
  checkboxes.forEach(
    (item) => item.checked === true && (tipoRelatorio = item.value)
  );

  if (!input) {
    alert("Sem conteúdo para gerar json!");
    return;
  }

  const objetos = [];
  const linhas = input.split("\n");

  for (const linha of linhas) {
    const [key, valor] = linha.split(":");
    objetos.push({ key: key.trim(), valor: valor.trim() });
  }

  let data = { url: { key: "", valor: "" }, tipo: { key: "", valor: "" } };

  switch (tipoRelatorio) {
    case "lancamentos":
      data = {
        url: {
          key: "url",
          valor:
            "https://marte.hinova.com.br/sga/sgav4_astran/mgf/relatorio/filtroRelatorioLancamento.php",
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
    default:
      alert("Selecione um tipo de relatório!");
      return;
  }

  objetos.push(data.url);
  objetos.push(data.tipo);

  const relatorioJSON = JSON.stringify(objetos, null, 4);
  const jsonOutput = document.getElementById("jsonOutput");
  jsonOutput.innerHTML = syntaxHighlight(relatorioJSON);
};

const formatarJson = () => {
  const input = document.getElementById("input").value;

  try {
    const objetoJSON = JSON.parse(input);
    const relatorioJSON = JSON.stringify(objetoJSON, null, 4);
    const jsonOutput = document.getElementById("jsonOutput");
    jsonOutput.innerHTML = syntaxHighlight(relatorioJSON);
  } catch (erro) {
    alert("O JSON inserido não é válido. Por favor, insira um JSON válido.");
  }
}

function syntaxHighlight(json) {
  json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "json-value";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "json-key";
        } else {
          cls = "json-string";
        }
      } else if (/true|false/.test(match)) {
        cls = "json-boolean";
      } else if (/null/.test(match)) {
        cls = "json-null";
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
}

const copiarJsonParaAreaDeTransferencia = () => {
  const jsonOutput = document.getElementById("jsonOutput").textContent;

  if (!jsonOutput) {
    alert("Sem conteúdo para copiar!");
    return;
  }

  navigator.clipboard.writeText(jsonOutput);
  alert("Json copiado com sucesso!");
};
