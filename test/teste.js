var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

// Inúteis
//var prod0 = new Producao('S', 'baB', true);
//var prod1 = new Producao('S', 'bBcG', true);			
//var prod2 = new Producao('A', 'baB', false);
//var prod3 = new Producao('A', 'a', false);
//var prod4 = new Producao('B', 'bFa', false);
//var prod5 = new Producao('B', 'aG', false);
//var prod6 = new Producao('B', '&', false);
//var prod7 = new Producao('E', 'aE', false);
//var prod8 = new Producao('E', 'a', false);
//var prod9 = new Producao('F', 'aB', false);
//var prod10 = new Producao('F', 'bEa', false);
//var prod11 = new Producao('G', 'baG', false);
//var prod12 = new Producao('G', 'aGb', false);
//
//var terminais = ['a', 'b', '&'];
//var nTerminais = ['S', 'A', 'B', 'E', 'F', 'G'];
//var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12];

//Vazios
var prod0 = new Producao('J', 'aWBbH', true);
var prod1 = new Producao('J', 'bBb', true);			
var prod2 = new Producao('J', 'aHa', true);
var prod3 = new Producao('B', 'bWa', false);
var prod4 = new Producao('B', 'bBH', false);
var prod5 = new Producao('B', 'a', false);
var prod6 = new Producao('H', 'bHB', false);
var prod7 = new Producao('H', 'aBB', false);
var prod8 = new Producao('H', '&', false);
var prod9 = new Producao('W', 'bB', false);
var prod10 = new Producao('W', 'bb', false);
var prod11 = new Producao('W', '&', false);

var terminais = ['a', '&'];
var nTerminais = ['J', 'B', 'H', 'W'];
var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11];

function testeVazio(){
	removeProducoesVazias(producoes);
}

function testeUnitarias(){
	removeProducoesUnitarias(nTerminais, producoes);
}

function testeInuteis(){
	removerEstadosInuteis(terminais, nTerminais, producoes);
}
