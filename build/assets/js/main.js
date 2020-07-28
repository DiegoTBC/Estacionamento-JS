let botaoAdicionar = document.querySelector("#adicionar");
let botaoListarPatio = document.querySelector("#mostrarPatio");
let botaoFinalizarEdicao = document.querySelector("#finalizarE");
let botaoDarBaixa = document.querySelector("#darBaixa");
let botaoPesquisar = document.querySelector("#buscar");
let inputPesquisar = document.querySelector("#pesquisar"); // ================================ CREATE =======================================

document.querySelector("#AdicionarCarro").addEventListener('shown.bs.modal', function () {
  botaoAdicionar.setAttribute("data-dismiss", "modal");
});

function cadastrarVeiculo(e) {
  let marcaVeiculo = document.querySelector("#marca").value.toUpperCase();
  let modeloVeiculo = document.querySelector("#modelo").value.toUpperCase();
  let placaVeiculo = document.querySelector("#placa").value.toUpperCase();
  let telefoneDonoVeiculo = document.querySelector("#telefone").value;
  let tempo = document.querySelector("#tempo").value;
  let preco = document.querySelector("#preco").value;
  let horaEntrada = Date.now();
  let previsaoSaida = horaEntrada + Number(tempo) * 60000;
  let aux = new Date(horaEntrada);
  let horaEntradaFormatada = `${aux.getHours()}:${aux.getMinutes()}`;
  aux = new Date(previsaoSaida);
  let previsaoSaidaFormatada = `${aux.getHours()}:${aux.getMinutes()}`;

  if (placa.value == "" || telefone.value == "" || tempo.value == "") {
    botaoAdicionar.removeAttribute("data-dismiss");
    alert("Você não informou os campos necessário !");
  } else {
    let regexPlaca = /\d{3}\s{4}/;
    let regexTelefone = /\d{9}/;
    let veiculo = {
      Marca: marcaVeiculo,
      Modelo: modeloVeiculo,
      Placa: placaVeiculo,
      Telefone: telefoneDonoVeiculo,
      Preco: preco,
      Tempo: tempo,
      HoraEntradaF: horaEntradaFormatada,
      PrevisaoSaidaFormatada: previsaoSaidaFormatada,
      HoraEntrada: horaEntrada,
      PrevisaoSaida: previsaoSaida
    };

    if (localStorage.getItem('patio') === null) {
      let veiculos = [];
      veiculos.push(veiculo);
      localStorage.setItem('patio', JSON.stringify(veiculos));
    } else {
      var veiculos = JSON.parse(localStorage.getItem('patio'));
      veiculos.push(veiculo);
      localStorage.setItem('patio', JSON.stringify(veiculos));
    }

    document.querySelector('form').reset();
    mostrarPatio();
  }

  e.preventDefault();
}

; // ============================== READ ======================================

function mostrarPatio() {
  let veiculos = JSON.parse(localStorage.getItem('patio'));
  let tabela = document.querySelector(".table");
  let tabelaHTML = `<tr>
        <th scope="col">Placa</th>
        <th scope="col">Telefone</th>
        <th scope="col">Tempo</th>
        <th scope="col">Entrada</th>
        <th scope="col">Observações</th>
        <th scope="col">Ações</th>            
        </tr>`;

  if (veiculos.length === 0) {
    tabela.innerHTML = "";
  } else {
    veiculos.forEach(chave => {
      if (chave.PrevisaoSaida <= Date.now()) {
        tabelaHTML += `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-warning text-dark">Atraso</span></td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#editarInfoVeiculo" onclick="editarInfoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#darBaixaCarro" onclick="darBaixaVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>           
                </tr> `;
      } else {
        tabelaHTML += `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-success">No Horário</span></td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#editarInfoVeiculo" onclick="editarInfoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg> 
                    </button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#darBaixaCarro" onclick="darBaixaVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>          
                </tr> `;
      }
    });
    tabela.innerHTML = tabelaHTML;
  }
}

;

function pesquisarVeiculo(placa) {
  let veiculos = JSON.parse(localStorage.getItem('patio'));
  let tabela = document.querySelector(".table");
  let tabelaHTML = `<tr>
        <th scope="col">Placa</th>
        <th scope="col">Telefone</th>
        <th scope="col">Tempo</th>
        <th scope="col">Entrada</th>
        <th scope="col">Observações</th>
        <th scope="col">Ações</th>            
        </tr>`;
  veiculos.forEach(chave => {
    if (placa === chave.Placa) {
      if (chave.PrevisaoSaida <= Date.now()) {
        tabelaHTML += `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-warning text-dark">Atraso</span></td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#editarInfoVeiculo" onclick="editarInfoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg> 
                    </button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#darBaixaCarro" onclick="darBaixaVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>           
                </tr> `;
      } else {
        tabelaHTML += `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-success">No Horário</span></td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#editarInfoVeiculo" onclick="editarInfoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg> 
                    </button>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#darBaixaCarro" onclick="darBaixaVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>           
                </tr> `;
      }
    }
  });
  tabela.innerHTML = tabelaHTML;
  inputPesquisar.value = "";
}

; // ================================ UPDATE ======================================

document.querySelector("#editarInfoVeiculo").addEventListener('shown.bs.modal', function () {
  botaoFinalizarEdicao.setAttribute("data-dismiss", "modal");
});

function editarInfoVeiculo(placa) {
  let valorPlaca = placa;
  let veiculos = JSON.parse(localStorage.getItem('patio'));
  let body = document.querySelector(".body-edita-carro");
  let marcaVeiculo = document.querySelector("#marcaE");
  let modeloVeiculo = document.querySelector("#modeloE");
  let placaVeiculo = document.querySelector("#placaE");
  let telefoneDonoVeiculo = document.querySelector("#telefoneE");
  let tempo = document.querySelector("#tempoE");
  let preco = document.querySelector("#precoE");
  veiculos.forEach((valor, indice) => {
    if (valor.Placa === valorPlaca) {
      marcaVeiculo.value = valor.Marca;
      modeloVeiculo.value = valor.Modelo;
      placaVeiculo.value = valor.Placa;
      telefoneDonoVeiculo.value = valor.Telefone;
      tempo.value = valor.Tempo;
      preco.value = valor.Preco;
    }
  });
  document.querySelector("#tempoE").addEventListener('change', function () {
    let preco = document.querySelector("#precoE");

    switch (Number(document.querySelector("#tempoE").value)) {
      case 30:
        preco.value = "R$ 1,00";
        break;

      case 60:
        preco.value = "R$ 1,50";
        break;

      case 90:
        preco.value = "R$ 2,00";
        break;

      case 120:
        preco.value = "R$ 2,50";
        break;

      default:
        preco.value = "";
        break;
    }
  });
  botaoFinalizarEdicao.addEventListener('click', function () {
    let veiculos = JSON.parse(localStorage.getItem('patio'));

    if (placaVeiculo.value == "" || telefoneDonoVeiculo.value == "" || tempo.value == "") {
      alert("Você não informou os campos necessário !");
    } else {
      veiculos.forEach(valor => {
        if (valor.Placa === valorPlaca) {
          let horaEntrada = valor.HoraEntrada;
          let previsaoSaida = horaEntrada + Number(tempo.value) * 60000;
          let aux = new Date(previsaoSaida);
          let previsaoSaidaFormatada = `${aux.getHours()}:${aux.getMinutes()}`;
          valor.Marca = marcaVeiculo.value.toUpperCase();
          valor.Modelo = modeloVeiculo.value.toUpperCase();
          valor.Placa = placaVeiculo.value.toUpperCase();
          valor.Telefone = telefoneDonoVeiculo.value;
          valor.Tempo = tempo.value;
          valor.Preco = preco.value;
          valor.PrevisaoSaidaFormatada = previsaoSaidaFormatada;
          valor.PrevisaoSaida = previsaoSaida;
        }
      });
    }

    localStorage.setItem('patio', JSON.stringify(veiculos));
    mostrarPatio();
  });
}

; // ======================= DELETE ===================================

document.querySelector("#darBaixaCarro").addEventListener('shown.bs.modal', function () {
  botaoDarBaixa.setAttribute("data-dismiss", "modal");
});

function darBaixaVeiculo(placa) {
  let veiculos = JSON.parse(localStorage.getItem('patio'));
  let body = document.querySelector(".body-baixa-carro");
  let botaoFinalizar = document.querySelector(".finalizaBaixa");
  let valorPlaca = placa;
  veiculos.forEach((valor, indice) => {
    if (valor.Placa === placa) {
      if (valor.PrevisaoSaida <= Date.now()) {
        body.innerHTML = `
                <table class="table table-hover">     
                    <tr>
                        <th scope="col">Placa</th>
                        <th scope="col">Tempo</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Saida Prevista</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Observações</th>         
                    </tr>
                    <tr>
                    <td scope="row">${valor.Placa}</td>
                    <td>${valor.Tempo}</td>
                    <td>${valor.HoraEntradaF}</td>
                    <td>${valor.PrevisaoSaidaFormatada}</td>
                    <td>${valor.Preco}</td>
                    <td><span class="badge bg-warning text-dark">Atraso</span></td>
                    <td></td>
                </table>`;
      } else {
        body.innerHTML = `
                <table class="table table-hover">     
                    <tr>
                        <th scope="col">Placa</th>
                        <th scope="col">Tempo</th>
                        <th scope="col">Entrada</th>
                        <th scope="col">Saida Prevista</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Observações</th>         
                    </tr>
                    <tr>
                    <td scope="row">${valor.Placa}</td>
                    <td>${valor.Tempo}</td>
                    <td>${valor.HoraEntradaF}</td>
                    <td>${valor.PrevisaoSaidaFormatada}</td>
                    <td>${valor.Preco}</td>
                    <td><span class="badge bg-success">No Horário</span></td>
                    <td></td>
                </table>`;
      }
    }
  }); //Remove veiculo

  botaoDarBaixa.addEventListener('click', function () {
    let veiculos = JSON.parse(localStorage.getItem('patio'));
    veiculos.forEach((valor, indice) => {
      if (valor.Placa === valorPlaca) {
        veiculos.splice(indice, 1);
      }
    });
    localStorage.setItem('patio', JSON.stringify(veiculos));
    mostrarPatio();
  });
}

;
/*function confirmarRemocaoVeiculo(placa){
    let opcao = confirm("Deseja realmente excluir?")

    if(opcao)
        removerVeiculo(placa)        
    else
        return false
}*/
// ========================= EVENTS ================================
//* Atualiza o patio a cada 30 segundos e verifica se possui algum veiculo em atraso

setInterval(mostrarPatio, 30000);
botaoAdicionar.addEventListener('click', cadastrarVeiculo);
botaoListarPatio.addEventListener('click', mostrarPatio);
botaoPesquisar.addEventListener('click', function () {
  pesquisarVeiculo(inputPesquisar.value.toUpperCase());
});
inputPesquisar.addEventListener('keypress', function (e) {
  if (event.keyCode === 13) {
    pesquisarVeiculo(inputPesquisar.value.toUpperCase());
  }
});
document.querySelector("#tempo").addEventListener('change', function () {
  let preco = document.querySelector("#preco");

  switch (Number(document.querySelector("#tempo").value)) {
    case 30:
      preco.value = "R$ 1,00";
      break;

    case 60:
      preco.value = "R$ 1,50";
      break;

    case 90:
      preco.value = "R$ 2,00";
      break;

    case 120:
      preco.value = "R$ 2,50";
      break;

    default:
      preco.value = "";
      break;
  }
});