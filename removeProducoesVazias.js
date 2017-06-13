var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

function verificarEstadosVazios(producoes){

	var estadosComVazio = [];
	// Armazena os estados com vazio
	for(var i = 0, j = 0; i < producoes.length; i++){
		if (producoes[i].prod === "&") {
	    	estadosComVazio[j] = producoes[i].estado;
	    	producoes.splice(i, 1);
	    	j++;
		}
	}

	var producoesAux = [];
	// Gera novas produções onde contém vazio, e armazena no array de produções auxiliares
	for(var i = 0; i < producoes.length; i++){
		for (var j = 0 ; j < estadosComVazio.length; j++) {
			var str = producoes[i].prod;
			if (str.indexOf(estadosComVazio[j]) > -1) {
				var novaProd = "";
				for (var k = 0; k < producoes[i].prod.length; k++){
					if (producoes[i].prod[k] !== estadosComVazio[j]){
						novaProd += producoes[i].prod[k];
					}
				}
				var novaProdObj = new Producao(producoes[i].estado, novaProd, producoes[i].isInicial);
				producoesAux.push(novaProdObj);
	    	}
		}
	}

	// Coloca as novas produções criada no array principal.			
	if (producoesAux.length > 0){
		// Transfere para o array principal
		for (var i = 0; i < producoesAux.length; i++){
			producoes.push(producoesAux[i]);
		}
		// Limpa o array auxiliar
		producoesAux.splice(0, producoesAux.length - 1);
	}

	// Remove possíveis produções que ficarão repetidas
	for (var i = 0; i < producoes.length; i++){
		for (var j = i + 1; j < producoes.length; j++){
			if (producoes[i].estado === producoes[j].estado && producoes[i].prod === producoes[j].prod){
				producoes.splice(j, 1);
			}
		}
	}			

	// Mostra no console como ficou as produções
	for (var i = 0; i < producoes.length; i++){
		console.log(producoes[i].estado + " " + producoes[i].prod + " " + producoes[i].isInicial);
	}
	
}