var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

var prod0 = new Producao('S', 'aAB', true);
var prod1 = new Producao('A', 'a', false);			
var prod2 = new Producao('E', 'aED', false);
var prod3 = new Producao('D', 'dda', false);
var prod4 = new Producao('D', 'aDA', false);
var prod5 = new Producao('H', 'aH', false);
var prod6 = new Producao('I', 'aAaA', false);
var prod7 = new Producao('B', 'bD', false);
var prod8 = new Producao('B', 'b', false);

var terminais = ['a', 'b', 'd'];
var nTerminais = ['S', 'A', 'B', 'E', 'D', 'H', 'I'];
var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];


function testeVazio(){
	removeProducoesVazias(producoes);
}

function testeUnitarias(){
	removeProducoesUnitarias(nTerminais, producoes);
}

function testeInuteis(){
	removerEstadosInuteis(terminais, nTerminais, producoes);
}
