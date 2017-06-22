var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

//Vazias 1
//var prod0 = new Producao('J', 'aWBbH', true);
//var prod1 = new Producao('J', 'bBb', true);			
//var prod2 = new Producao('J', 'aHa', true);
//var prod3 = new Producao('B', 'bWa', false);
//var prod4 = new Producao('B', 'bBH', false);
//var prod5 = new Producao('B', 'a', false);
//var prod6 = new Producao('H', 'bHB', false);
//var prod7 = new Producao('H', 'aBB', false);
//var prod8 = new Producao('H', '&', false);
//var prod9 = new Producao('W', 'bB', false);
//var prod10 = new Producao('W', 'bb', false);
//var prod11 = new Producao('W', '&', false);
//
//var terminais = ['a', '&'];
//var nTerminais = ['J', 'B', 'H', 'W'];
//var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11];

//Vazias 2
//var prod0 = new Producao('S', 'aB', true);
//var prod1 = new Producao('B', 'bB', false);
//var prod2 = new Producao('B', '&', false);
//
//var terminais = ['a', 'b', '&'];
//var nTerminais = ['S', 'B'];
//var producoes = [prod0, prod1, prod2];

//Vazias 3
//var prod0 = new Producao('S', 'bDCe', true);
//var prod1 = new Producao('D', 'dD', false);
//var prod2 = new Producao('D', '&', false);
//var prod3 = new Producao('C', 'cC', false);
//var prod4 = new Producao('C', '&', false);
//
//var terminais = ['b', 'c', 'd', 'e', '&'];
//var nTerminais = ['S', 'C', 'D'];
//var producoes = [prod0, prod1, prod2, prod3, prod4];

//Uniárias 1
//var prod0 = new Producao('J', 'aCb', true);
//var prod1 = new Producao('J', 'CA', true);
//var prod2 = new Producao('A', 'bC', false);
//var prod3 = new Producao('A', 'aCc', false);
//var prod4 = new Producao('A', 'C', false);
//var prod5 = new Producao('C', 'bC', false);
//var prod6 = new Producao('C', 'ab', false);
//var prod7 = new Producao('C', 'D', false);
//var prod8 = new Producao('D', 'aA', false);
//var prod9 = new Producao('D', 'bb', false);
//
//var terminais = ['a', 'b', 'c'];
//var nTerminais = ['J', 'A', 'C', 'D'];
//var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9];

//Unitárias 2 
//var prod0 = new Producao('S', 'bS', true);
//var prod1 = new Producao('S', 'A', true);
//var prod2 = new Producao('A', 'aA', false);
//var prod3 = new Producao('A', 'a', false);
//
//var terminais = ['a', 'b'];
//var nTerminais = ['S', 'A'];
//var producoes = [prod0, prod1, prod2, prod3];

//Unitárias 3
var prod0 = new Producao('S', 'AsB', true);
var prod1 = new Producao('S', 'A', true);
var prod2 = new Producao('A', 'aA', false);
var prod3 = new Producao('A', 'B', false);
var prod4 = new Producao('B', 'bBc', false);
var prod5 = new Producao('B', 'bc', false);
var prod6 = new Producao('J', 'H', false); // inválido
var prod7 = new Producao('H', 'J', false); // inválido

var terminais = ['a', 'b', 'c'];
var nTerminais = ['S', 'A', 'B', 'J', 'H'];
var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7];

// Inúteis 1
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

// Inúteis 2
//var prod0 = new Producao('S', 'aA', true);
//var prod1 = new Producao('A', 'a', false);
//var prod2 = new Producao('A', 'bB', false);
//var prod3 = new Producao('B', 'b', false);
//var prod4 = new Producao('B', 'dC', false);
//var prod5 = new Producao('C', 'cC', false);
//var prod6 = new Producao('C', 'c', false);
//var prod7 = new Producao('D', 'dD', false);
//var prod8 = new Producao('D', 'aA', false);
//
//var terminais = ['a', 'b', 'c', 'd'];
//var nTerminais = ['S', 'A', 'B', 'C', 'D'];
//var producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];

//Inúteis 3
//var prod0 = new Producao('S', 'aAa', true);
//var prod1 = new Producao('A', 'a', false);
//var prod2 = new Producao('A', 'S', false);
//var prod3 = new Producao('C', 'c', false);
//
//var terminais = ['a', 'c'];
//var nTerminais = ['S', 'A', 'C'];
//var producoes = [prod0, prod1, prod2, prod3];

function testeVazio(){
	removeProducoesVazias(producoes);
}

function testeUnitarias(){
	removeProducoesUnitarias(nTerminais, producoes);
}

function testeInuteis(){
	removerEstadosInuteis(terminais, nTerminais, producoes);
}
