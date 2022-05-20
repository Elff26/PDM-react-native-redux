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