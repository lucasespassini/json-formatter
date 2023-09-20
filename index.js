const gerarJson = () => {
  const input = document.getElementById("input").value;

  if (!input) {
    alert('Sem conteúdo!')
    return
  }

  const objetos = [];
  const linhas = input.split('\n');

  for (const linha of linhas) {
    const [key, valor] = linha.split(': ');
    objetos.push({ key, valor });
  }

  let tipoRelatorio = objetos.find(objeto => objeto['key'] === 'tipoRelatorio')
  if (!tipoRelatorio) {
    tipoRelatorio = objetos.find(objeto => objeto['key'] === 'dfsTitulo')
  }

  let data
  switch (tipoRelatorio.valor) {
    case 'veiculo':
      data = {
        url: {
          key: "url",
          valor: "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioVeiculo.php"
        },
        tipo: {
          key: "tipo",
          valor: "2"
        }
      }
      break
    case 'associado':
      data = {
        url: {
          key: "url",
          valor: "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioAssociado.php"
        },
        tipo: {
          key: "tipo",
          valor: "2"
        }
      }
      break
    case 'RELATÓRIO DE BOLETOS':
      data = {
        url: {
          key: "url",
          valor: "https://marte.hinova.com.br/sga/sgav4_astran/relatorio/geraRelatorioBoleto.php"
        },
        tipo: {
          key: "tipo",
          valor: "4"
        }
      }
      break
  }

  objetos.push(data.url)
  objetos.push(data.tipo)

  const relatorioJSON = JSON.stringify(objetos, null, 2);
  const jsonOutput = document.getElementById("jsonOutput");
  jsonOutput.textContent = relatorioJSON;

  Prism.highlightElement(jsonOutput);
}

const copiarJsonParaAreaDeTransferencia = () => {
  const jsonOutput = document.getElementById("jsonOutput").textContent;

  if (!jsonOutput) {
    alert('Sem conteúdo!')
    return
  }

  navigator.clipboard.writeText(jsonOutput)
  alert('Json copiado com sucesso!')
}
