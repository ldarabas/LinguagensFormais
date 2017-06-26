var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

function removeProducoesUnitarias(producoes){
	// Mostra no console as produções antes de remover unitárias
	console.log('Produções antes de remover os unitárias: ');
	imprime(producoes);

	// Verifica se existe estados inválidos para eliminar. Ex: J -> H e H -> J
	removeEstadosInvalidos(producoes);

	// Remove produções unitárias
	removeUnitaria(producoes);	
	
	// Mostra no console as produções após remover unitárias
	console.log('Produções após remover os unitárias: ');
	imprime(producoes);
}

function removeEstadosInvalidos(producoes){
	for(var i = 0; i < producoes.length; i++){
		for(var j = 0; j < nterm.length; j++){
			if (producoes[i].prod === nterm[j]){
				var arrayProds = criaArrayComProducoesDoEstadoX(nterm[j], producoes);				
				for(var k = 0; k < arrayProds.length; k++){
					if (arrayProds[k].prod === producoes[i].estado){
						// Encontrou loop, irá eliminar os estados e todos as produções que os contém
						var excluir = [arrayProds[k].estado, producoes[i].estado];
 						for (var l = 0; l < producoes.length; l++){
 							for (var m = 0; m < excluir.length; m++){
 								if (producoes[l].prod.indexOf(excluir[m]) > -1){
 									producoes.splice(l, 1);
 									l--;
 								}
 							}
 						}
					}
				}
			}
		}
	}
}

function removeUnitaria(producoes){
	var producoesAux = [];
	var existeUnitaria = false;
	// Gera novas produções e elimina a unitária
	for(var i = 0; i < producoes.length; i++){
		for (var j = 0; j < nterm.length; j++){
			if(producoes[i].prod === nterm[j]){
				// Cria novas produções de acordo com a unitária
				for(var k = 0; k < producoes.length; k++){
					if (producoes[k].estado === nterm[j]){
						var novaProdObj = new Producao(producoes[i].estado, producoes[k].prod, producoes[i].isInicial);
						producoesAux.push(novaProdObj);
					}
				}
				// Elimina a produção unitária
				producoes.splice(i, 1);
				i--;
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

	// Depois de ajustar tudo, verificar se ainda existe produção unitária
	externo: for(var i = 0; i < producoes.length; i++){
		for (var j = 0; j < nterm.length; j++){
			if(producoes[i].prod === nterm[j]){
				// Ainda existe unitária
				existeUnitaria = true;
				break externo;
			}
		}
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
	
	if (existeUnitaria){
		removeUnitaria(producoes);
	}
}

function criaArrayComProducoesDoEstadoX(estado, producoes){
	var array = [];
	for (var i = 0; i < producoes.length;i++){
		if(producoes[i].estado === estado){
			array.push(producoes[i]);
		}
	}
	return array;
}

function imprime(producoes){
	for (var i = 0; i < producoes.length; i++){
		console.log(producoes[i].estado + ' ' + producoes[i].prod + ' ' + producoes[i].isInicial);			
	}
}
