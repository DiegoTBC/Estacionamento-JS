let marca = document.querySelector("#marca")
let modelo = document.querySelector("#modelo")
let placa = document.querySelector("#placa")
let telefone = document.querySelector("#telefone")
let tempo = document.querySelector("#tempo")
let preco = document.querySelector("#preco")
let pago = document.querySelector("#pago")
let naoPago = document.querySelector("#naoPago")
let adicionar = document.querySelector("#adicionar")
let fechar = document.querySelector(".fechar")
let listar = document.querySelector("#listar")
let buscar = document.querySelector("#buscar")



let Carros = []

function apagarItensDeFormulario(){
    document.querySelector('form').reset()
}

function adicionarCarro(marca, modelo, placa, telefone, tempo, preco, entradaFormatado, entradaM, saida, pagamento ){
    return {
        marca,
        modelo,
        placa,
        telefone,
        tempo,
        preco,
        entradaFormatado,
        entradaM,
        saida,
        pagamento
    }
}

function listarCarros(){
    listaCarros.innerHTML = `<table class="table table-hover">
    
  </table> `

    table1.innerHTML = ` `
    
    Carros.forEach( (valor, indice) => {
        table1.innerHTML += `<tr>
        <th scope="col">${valor.placa}</th>
        <th scope="col">${valor.telefone}</th>
        <th scope="col">${valor.tempo}</th>
        <th scope="col">${valor.entradaFormatado}</th>              
      </tr>`
    })

    
}

adicionar.addEventListener("click", function(){
    let marcaValor = marca.value
    let modeloValor = modelo.value
    let placaValor = placa.value
    let telefoneValor = telefone.value
    let tempoValor = Number(tempo.value)
    let precoValor = Number(preco.value)
    let hora = new Date().getHours()
    let minutos = new Date().getMinutes()
    let entradaFormatado = `${hora}:${minutos}`
    let entradaM = Date.now()
    let saida = entradaM + (tempoValor * 60000)
    let pagamento
    if (pago.checked){
        pagamento = pago.value
    } else {
        pagamento = naoPago.value
    }

    Carros.push(adicionarCarro(marcaValor, modeloValor, placaValor, telefoneValor, tempoValor, precoValor, entradaFormatado, entradaM, saida, pagamento))

    apagarItensDeFormulario()

})

listar.addEventListener("click", listarCarros)