var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

var prod0 = new Producao('S', 'aSb', true);
var prod1 = new Producao('S', 'A', true);			
var prod2 = new Producao('A', 'aA', false);
var prod3 = new Producao('A', 'B', false);
var prod4 = new Producao('B', 'bBc', false);
var prod5 = new Producao('B', 'bc', false);

var terminais = ['a', 'b', 'c'];
var nTerminais = ['S', 'A', 'B'];
var producoes = [prod0, prod1, prod2, prod3, prod4, prod5];


function testeVazio(){
	removeProducoesVazias(producoes);
}

function testeUnitarias(){
	removeProducoesUnitarias(nTerminais, producoes);
}

function testeInuteis(){
	removerEstadosInuteis(terminais, nTerminais, producoes);
}
