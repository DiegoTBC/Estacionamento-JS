let botaoAdicionar = document.querySelector("#adicionar")
let botaoListarPatio = document.querySelector("#mostrarPatio")
let botaoPesquisar = document.querySelector("#buscar")
let inputPesquisar = document.querySelector("#pesquisar")


function cadastrarVeiculo(e){
    let marcaVeiculo = document.querySelector("#marca").value.toUpperCase()
    let modeloVeiculo = document.querySelector("#modelo").value.toUpperCase()
    let placaVeiculo = document.querySelector("#placa").value.toUpperCase()
    let telefoneDonoVeiculo = document.querySelector("#telefone").value
    let tempo = document.querySelector("#tempo").value
    let preco = document.querySelector("#preco").value
    let pago = document.querySelector("#pago").value
    let naoPago = document.querySelector("#naoPago").value
    let pagamento
    if(pago.checked){
        pagamento = true
    } else {
        pagamento = false
    }

    let horaEntrada = Date.now()
    let previsaoSaida = horaEntrada + (Number(tempo) * 60000)

    let aux = new Date(horaEntrada)
    let horaEntradaFormatada = `${aux.getHours()}:${aux.getMinutes()}`

    aux = new Date(previsaoSaida)
    let previsaoSaidaFormatada = `${aux.getHours()}:${aux.getMinutes()}`

    if (placa.value == "" || telefone.value == "" || tempo.value == ""){
        alert("Você não informou os campos necessário !")
    }

    let regexPlaca = /\d{3}\s{4}/
    let regexTelefone = /\d{9}/

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
        PrevisaoSaida: previsaoSaida,
        Pago: pagamento
    }

    if (localStorage.getItem('patio') === null){
        let veiculos = []
        veiculos.push(veiculo);
        localStorage.setItem('patio', JSON.stringify(veiculos))
    } else {
        var veiculos = JSON.parse(localStorage.getItem('patio'))
        veiculos.push(veiculo)
        localStorage.setItem('patio', JSON.stringify(veiculos))
    }

    document.querySelector('form').reset()

    mostrarPatio()

    e.preventDefault()
}

function mostrarPatio(){
    let veiculos = JSON.parse(localStorage.getItem('patio'))
    let listar = document.querySelector(".table")

    let tabela = `<tr>
        <th scope="col">Placa</th>
        <th scope="col">Telefone</th>
        <th scope="col">Tempo</th>
        <th scope="col">Entrada</th>
        <th scope="col">Observações</th>
        <th scope="col">Ações</th>            
        </tr>`

    if (veiculos.length === 0){
        listar.innerHTML = ""
    } else { 
        veiculos.forEach(chave => {
            if(chave.PrevisaoSaida <= Date.now()){
                tabela +=
                `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-warning text-dark">Atraso</span></td>
                <td><button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></button></td>           
                </tr> `
            } else {
                tabela +=
                `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-info">No Horário</span></td>
                <td><button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></button></td>           
                </tr> `
            }          
        })  
        listar.innerHTML = tabela
    }   
}

function pesquisarVeiculo(placa){
    let veiculos = JSON.parse(localStorage.getItem('patio'))
    let listar = document.querySelector(".table")

    veiculos.forEach(chave => {
        if (placa === chave.Placa){ 
            if(chave.PrevisaoSaida <= Date.now()){
                listar.innerHTML =
                `<tr>
                <th scope="col">Placa</th>
                <th scope="col">Telefone</th>
                <th scope="col">Tempo</th>
                <th scope="col">Entrada</th>
                <th scope="col">Observações</th>
                <th scope="col">Ações</th>            
                </tr>
                <tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-warning text-dark">Atraso</span></td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg></button>
                </td>           
                </tr> `
            } else {
                listar.innerHTML =
                `<tr>
                <th scope="col">Placa</th>
                <th scope="col">Telefone</th>
                <th scope="col">Tempo</th>
                <th scope="col">Entrada</th>
                <th scope="col">Observações</th>
                <th scope="col">Ações</th>            
                </tr>
                <tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-info">No Horário</span></td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg></button>
                </td>           
                </tr> `
            }
        }
    })    
}

function confirmarRemocaoVeiculo(placa){
    let opcao = confirm("Deseja realmente excluir?")

    if(opcao)
        removerVeiculo(placa)        
    else
        return false
}

function removerVeiculo(placa){
    let veiculos = JSON.parse(localStorage.getItem('patio'))

    veiculos.forEach((valor, indice) => {
        if (valor.Placa === placa){
            veiculos.splice(indice, 1)
        }
    })

    localStorage.setItem('patio', JSON.stringify(veiculos))

    mostrarPatio()
}


setInterval(mostrarPatio, 30000);

botaoAdicionar.addEventListener('click', cadastrarVeiculo)

botaoListarPatio.addEventListener('click', mostrarPatio)

botaoPesquisar.addEventListener('click', function(){
    pesquisarVeiculo(inputPesquisar.value.toUpperCase())
    inputPesquisar.value = ""
})

inputPesquisar.addEventListener('keypress', function(e){
    if(event.keyCode === 13){
        pesquisarVeiculo(inputPesquisar.value.toUpperCase())
        inputPesquisar.value = ""
    }   
})

document.querySelector("#tempo").addEventListener('change', function(){
    let preco = document.querySelector("#preco")
    switch (Number(document.querySelector("#tempo").value)) {
        case 30:
            preco.value = "R$ 1,00"
            break;
        case 60:
            preco.value = "R$ 1,50"
            break;
        case 90:
            preco.value = "R$ 2,00"
            break;
        case 120:
            preco.value = "R$ 2,50"
            break
        default:
            preco.value = ""
            break;
    }
})