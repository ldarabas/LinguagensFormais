var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

var prod0 = new Producao('S', 'aAa', true);
var prod1 = new Producao('S', 'bBb', false);			
var prod2 = new Producao('A', 'a', false);
var prod3 = new Producao('A', 'S', false);
var prod4 = new Producao('C', 'c', false);

var terminais = ['a', 'c'];
var nTerminais = ['S', 'A', 'C'];
var producoes = [prod0, prod1, prod2, prod3, prod4];


function testeVazio(){
	removeProducoesVazias(producoes);
}

function testeUnitarias(){
	removeProducoesUnitarias(nTerminais, producoes);
}

function testeInuteis(){
	removerEstadosInuteis(terminais, nTerminais, producoes);
}
