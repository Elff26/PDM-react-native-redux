const Redux = require ('redux')
const { createStore, combineReducers } = Redux

/*Essa função é uma função criadora de ação com
ou seja, ela devolve um objeto JSON
uma ação é um objeto JSON*/
const criarContrato = (nome, taxa) =>{
    //JSON que ela devolve é uma ação
    return{
        type: "CRIAR_CONTRATO",
        payload: {
            nome, taxa
        }
    }
}

//também é criadora de ação
const cancelarContrato = (nome) =>{
    //também é uma ação
    return{
        type: "CANCELAR_CONTRATO",
        payload: {
            nome
        }
    }
}

//também é criadora de ação
const solicitarCashback = (nome, valor) => {
    //tambem é uma ação
    return{
        type: "SOLICITAR_CASHBACK",
        payload: {
            nome, valor
        }
    }
}

//essa é uma função reducer
//historicoDePedidosDeCashback tem uma lista vazia como valor default para que não ocorra um undefined
const historicoDePedidosDeCashbackReducer = (historicoDePedidosDeCashbackAtual = [], acao) => {
    
    //se a ação for CASHBACK, adicionamos o novo pedido à coleção existente 
    if(acao.type === "SOLICITAR_CASHBACK"){
        
        //uma cópia. Contém todos os existentes + o novo 
        //não faça push 
        return [
            ...historicoDePedidosDeCashbackAtual, acao.payload
        ]
    }

    //caso contrário, apenas ignoramos e devolvemos a coleção inalterada 
    return historicoDePedidosDeCashbackAtual
}

//essa é uma função reducer
//caixa começa zerado
const caixaReducer = (dinheiroEmCaixa = 0, acao) => {

    //se a ação for SOLICITAR_CASHBACK, reduzir o valor do caixa
    if(acao.type === "SOLICITAR_CASHBACK"){
        dinheiroEmCaixa -= acao.payload.valor
    }
    //senão se a ação for CRIAR_CONTRATO, aumentar o valor do caixa
    else if(acao.type === "CRIAR_CONTRATO"){
        dinheiroEmCaixa += acao.payload.taxa
    }

    //senão, somente devolver a fatia de estado envolvida
    return dinheiroEmCaixa
}

//implementar o reducer que lida com a lista de contratos
//ele pode criar contratos e cancelar contratos
const contratosReducer = (listaDeContratosAtual = [], acao) => {
    if (acao.type === "CRIAR_CONTRATO"){
        return [
            ...listaDeContratosAtual,
            acao.payload
        ]
    }
    if (acao.type === "CANCELAR_CONTRATO"){
        return listaDeContratosAtual.filter(contrato => contrato.nome !== acao.payload.nome)
    }
    return listaDeContratosAtual
}

const todosOsReducers = combineReducers({ 
    historicoDePedidosDeCashback: historicoDePedidosDeCashbackReducer,
    caixa: caixaReducer, 
    contratos: contratosReducer
  }) 
  
const store = createStore(todosOsReducers)

//criar um contrato para o José
const acaoContratoJose = criarContrato('José', 50)
console.log(store.getState())
store.dispatch(acaoContratoJose)
console.log(store.getState())

//criar um contrato para a Maria
const acaoContratoMaria = criarContrato('Maria', 50)
store.dispatch(acaoContratoMaria)
console.log(store.getState())

//pedido de cashback para a Maria de 10
const acaoCashbackMaria = solicitarCashback('Maria', 10)
store.dispatch(acaoCashbackMaria)
console.log(store.getState())

//pedido de cashback para o José de 20
store.dispatch(solicitarCashback('José', 20))
console.log(store.getState())

//cancelar o contrato da Maria
store.dispatch(cancelarContrato('Maria'))
console.log(store.getState())