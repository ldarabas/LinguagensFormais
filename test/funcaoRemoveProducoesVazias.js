var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

function removeProducoesVazias(producoes){
	// Mostra no console as produções antes de eliminar vazios
	console.log('Produções antes de eliminar os vazios: ');
	imprime(producoes);

	var estadosComVazio = [];
	// Armazena os estados com vazio em um array auxiliar
	for(var i = 0, j = 0; i < producoes.length; i++){
		if (producoes[i].prod === '&') {
        	estadosComVazio[j] = producoes[i].estado;
        	producoes.splice(i, 1);
        	j++;
		}
	}

	var producoesAux = [];
	// Gera novas produções onde contém vazio, e armazena no array de produções auxiliares
	for(var i = 0; i < producoes.length; i++){
		for (var j = 0 ; j < estadosComVazio.length; j++) {
			if (producoes[i].prod.indexOf(estadosComVazio[j]) > -1) {
				// Se possuir mais de uma ocorrência, por exemplo aAbcA, entra no if para fazer diferente
				// Se possuir duas repetidas, aAAbc, entra também e vai gerar produção repetida mas no final do código uma delas é eliminada
				var novaProd = '';
    			if (contaOcorrencias(producoes[i].prod, estadosComVazio[j]) > 1){	        				
    				for (var k = 0; k < producoes[i].prod.length; k++){
    					if (producoes[i].prod[k] === estadosComVazio[j]){
							// Quando entra nesse if achou a posição do estado, então vai criar uma produção sem o caractere dessa posição
							for (var l = 0; l < producoes[i].prod.length; l++){
								if (k === l){
									continue;
								}
								novaProd += producoes[i].prod[l];
							}
    						producoesAux.push(new Producao(producoes[i].estado, novaProd, producoes[i].isInicial));
    						novaProd = '';
	    				}
    				}
    			}
				
				// Geral - Todas as produções são geradas aqui, com excessão quando entra no IF acima que gera algumas produções a mais
				// Tira todas as ocorrências dos estados com vazio.
				novaProd = '';
				for (var k = 0; k < producoes[i].prod.length; k++){
    				if (producoes[i].prod[k] !== estadosComVazio[j]){
    					novaProd += producoes[i].prod[k];
    				}
				}
				producoesAux.push(new Producao(producoes[i].estado, novaProd, producoes[i].isInicial));
        	}
		}
	}

	// Coloca as novas produções criada no array auxiliar, passando para o array principal.			
	if (producoesAux.length > 0){
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

	// Mostra no console as produções após eliminar vazios
	console.log('Produções após eliminar os vazios: ');
	imprime(producoes);

}

function contaOcorrencias(prod, estado){			
	return (prod.length - (prod.split(estado).join('').length));
}

function imprime(producoes){
	for (var i = 0; i < producoes.length; i++){
		console.log(producoes[i].estado + ' ' + producoes[i].prod + ' ' + producoes[i].isInicial);			
	}
}
