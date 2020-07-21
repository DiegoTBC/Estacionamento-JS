let adicionar = document.querySelector("#adicionar")
let listarPatio = document.querySelector("#mostrarPatio")
let pesquisar = document.querySelector("#buscar")


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
    </tr>`

    veiculos.forEach(chave => { tabela +=
        `<tr>
        <td scope="row">${chave.Placa}</td>
        <td>${chave.Telefone}</td>
        <td>${chave.Tempo}</td>
        <td>${chave.HoraEntradaF}</td>              
        </tr> `
    })

    listar.innerHTML = tabela
}

function pesquisarVeiculo(placa){
    let veiculos = JSON.parse(localStorage.getItem('patio'))
    let listar = document.querySelector(".table")

    veiculos.forEach(chave => {
        if (placa === chave.Placa){ listar.innerHTML =
            `<tr>
            <th scope="col">Placa</th>
            <th scope="col">Telefone</th>
            <th scope="col">Tempo</th>
            <th scope="col">Entrada</th>              
            </tr>
            <tr>
            <td scope="row">${chave.Placa}</td>
            <td>${chave.Telefone}</td>
            <td>${chave.Tempo}</td>
            <td>${chave.HoraEntradaF}</td>              
            </tr> `
        }
    })    
}

adicionar.addEventListener('click', cadastrarVeiculo)

listarPatio.addEventListener('click', mostrarPatio)

pesquisar.addEventListener('click', function(){
    let placa = document.querySelector("#pesquisar").value
    pesquisarVeiculo(placa.toUpperCase())
    document.querySelector("#pesquisar").value = ""
})