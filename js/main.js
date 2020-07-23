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
    } else {
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
    }
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
                <td>
                    <button type="button" class="btn btn-info" onclick="editarVeiculo('${chave.Placa}')>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>           
                </tr>`
            } else {
                tabela +=
                `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-success">No Horário</span></td>
                <td>
                    <button type="button" class="btn btn-info" onclick="editarVeiculo('${chave.Placa}')>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                        </svg> 
                    </button>
                    <button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>          
                </tr>`
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
                tabela +=
                `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-warning text-dark">Atraso</span></td>
                <td>
                    <button type="button" class="btn btn-info" onclick="editarVeiculo('${chave.Placa}')>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg> 
                    </button>
                    <button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </td>           
                </tr> `
            } else {
                tabela +=
                `<tr>
                <td scope="row">${chave.Placa}</td>
                <td>${chave.Telefone}</td>
                <td>${chave.Tempo}</td>
                <td>${chave.HoraEntradaF}</td>
                <td><span class="badge bg-success">No Horário</span></td>
                <td>
                    <button type="button" class="btn btn-info" onclick="editarVeiculo('${chave.Placa}')>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                        </svg> 
                    </button>
                    <button type="button" class="btn btn-danger" onclick="confirmarRemocaoVeiculo('${chave.Placa}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                    </button>
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