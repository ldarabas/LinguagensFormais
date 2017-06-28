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
        	i--;
        	j++;
		}
	}

	//Imprime estados que contém vazios
	console.log("Estados com vazio:");
	for (var i = 0; i < estadosComVazio.length; i++){
		console.log(estadosComVazio[i]);
	}

	var producoesAux = [];
	// Gera novas produções onde contém vazio, e armazena no array de produções auxiliares
	for(var i = 0; i < producoes.length; i++){
		var novaProd = '';
		if (contaOcorrencias(producoes[i].prod, estadosComVazio) > 1){
			// Cria uma produção eliminando cada estado que possuir vazio
			for (var j = 0; j < producoes[i].prod.length; j++){
				for (var k = 0; k < estadosComVazio.length; k++){
					if (producoes[i].prod[j] === estadosComVazio[k]){
						// Quando entra nesse if achou a posição do estado, então vai criar uma produção sem o caractere dessa posição
						for (var l = 0; l < producoes[i].prod.length; l++){
							if (j === l){
								continue;
							}
							novaProd += producoes[i].prod[l];
						}
						producoesAux.push(new Producao(producoes[i].estado, novaProd, producoes[i].isInicial));
						novaProd = '';    						
					}
				}
			}
			// Cria uma produção sem TODOS os estados que contém vazio
			novaProd = producoes[i].prod;
			for (var j = 0; j < estadosComVazio.length; j++){
				novaProd = novaProd.replace(estadosComVazio[j], '');
			}
			producoesAux.push(new Producao(producoes[i].estado, novaProd, producoes[i].isInicial));
		} else {
			//Trata apenas estados com apenas um único vazio
			for (var j = 0 ; j < estadosComVazio.length; j++) {
				//Verifica se há algum estado vazio na produção
				if (producoes[i].prod.indexOf(estadosComVazio[j]) > -1) {				
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
	}

	console.log("producoes criadas: ");
	imprime(producoesAux);

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
				j--;
			}
		}
	}

	// Após ter removido vazio, pode haver uma sobre, por exemplo C -> D e D -> &, ao remover o vazio do D, 
	// não criado produção no C pois contém somente um D que apontava para vazio, então vai remover o C -> D aqui
	for (var i = 0; i < producoes.length; i++){
		for (var j = 0; j < estadosComVazio.length; j ++){
			if (producoes[i].prod === estadosComVazio[j]){
				producoes.splice(i, 1);
				i--;
			}	
		}
	}

	// Mostra no console as produções após eliminar vazios
	console.log('Produções após eliminar os vazios: ');
	imprime(producoes);

}

function contaOcorrencias(prod, estadosComVazio){
	var novaProd = prod;
	for (var i = 0; i < estadosComVazio.length; i++){
		novaProd = novaProd.replace(estadosComVazio[i], '');
	}
	return (prod.length - novaProd.length);
}

function imprime(producoes){
	for (var i = 0; i < producoes.length; i++){
		console.log(producoes[i].estado + ' ' + producoes[i].prod + ' ' + producoes[i].isInicial);			
	}
}
