var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

function removerEstadosInuteis(terminais, nTerminais, producoes){
	var estadoInicial;

	// Mostra no console as produções antes de eliminar inúteis
	console.log('Procuções antes de eliminar os inúteis: ');
	imprime(producoes);


	// Procura pelo estado inicial
	for (var i = 0; i < producoes.length; i++){
		if (producoes[i].isInicial){
			estadoInicial = producoes[i].estado;
			break;
		}
	}

	var geramTerminais = [];
	// Armazenar todos os Estados que geram terminais diretamente
	for(var i = 0; i < producoes.length; i++){
		var gera = true;

		externo: for (var j = 0; j < producoes[i].prod.length; j++){			
			for (var k = 0; k < nTerminais.length; k++){
				if (producoes[i].prod[j] === nTerminais[k]){
					gera = false;
					break externo;
				}
			}
		}

		if (gera){
			geramTerminais.push(producoes[i].estado);
		}
	}

	// Limpa o array de estados que geram terminais diretamente para não possuir estados repetidos
	for (var i = 0; i < geramTerminais.length; i++){
		for (var j = i + 1; j < geramTerminais.length; j++){
			if (geramTerminais[i] === geramTerminais[j]){
				geramTerminais.splice(j, 1);
			}
		}
	}

	console.log('termeinais diretamente');
	for (var i = 0; i < geramTerminais.length; i++){
		console.log(geramTerminais[i]);			
	}

	// Armazenar todos os Estados que acessam terminais indiretamente
	for(var i = 0; i < producoes.length; i++){
		// Somente vai validar os estados que não geram diretamente
		var geraDir = false;
		for (var j = 0; j < geramTerminais.length; j++){
			if (producoes[i].estado === geramTerminais[j]){
				geraDir = true;
				break;
			}
		}

		if(!geraDir){					
			if (verificaGeraIndiretamente(criaArrayComProducoesDoEstadoX(producoes[i].estado, producoes), producoes, nTerminais, geramTerminais)){
			geramTerminais.push(producoes[i].estado);
			}
		}
	}

	console.log('termeinais diretamente + indiretamente');
	for (var i = 0; i < geramTerminais.length; i++){
		console.log(geramTerminais[i]);			
	}

	// Elimina os estados que não geram terminais direta ou indiretamente
	for(var i = 0; i < producoes.length; i++){				
		var remove = true;
		for (var j = 0; j < geramTerminais.length; j++){
			if (producoes[i].estado == geramTerminais[j]){
				remove = false;
				break;
			}
		}

		if(remove){
			var estadoEliminado = producoes[i].estado;
			// Remove a produção
			producoes.splice(i, 1);	

			// Elimina as produções que contém os terminais eliminados
			for(var i = 0; i < producoes.length; i++){
				for(var j = 0; j < producoes[i].prod.length; j++){
					if(producoes[i].prod[j] === estadoEliminado){
						producoes.splice(i, 1);
					}
				}
			}

		}
	}

	var estadosAcessiveis = [];
	// Estados acessíveis a partir do estado inicial
	verificaAcessiveis(criaArrayComProducoesDoEstadoX(estadoInicial, producoes), producoes, nTerminais, estadosAcessiveis);

	// Remove repetiçõs no array de estados acessíveis
	for (var i = 0; i < estadosAcessiveis.length; i++){
		for (var j = i + 1; j < estadosAcessiveis.length; j++){
			if (estadosAcessiveis[i] === estadosAcessiveis[j]){
				estadosAcessiveis.splice(j, 1);
			}
		}
	}

	// Remove os estados que não são acessíveis a partir do simbolo inicial
	for(var i = 0; i < producoes.length; i++){				
		var remove = true;
		for (var j = 0; j < estadosAcessiveis.length; j++){
			if (producoes[i].estado == estadosAcessiveis[j]){
				remove = false;
				break;
			}
		}

		if(remove){
			producoes.splice(i, 1);	
		}
	}


	console.log("Estados acessíveis a partir do inicial: ");
	for (var i = 0; i < estadosAcessiveis.length; i++){
		console.log(estadosAcessiveis[i]);
	}


	// Mostra no console as produções depois de eliminar inúteis
	console.log('Procuções depois de eliminar os inúteis: ');
	imprime(producoes);
}

function verificaAcessiveis(prodEstado, producoes, nTerminais, estadosAcessiveis){
	for(var i = 0; i < prodEstado.length; i++){
		for(var j = 0; j < prodEstado[i].prod.length; j++){
			for(var k = 0; k < nTerminais.length; k++){
				if (prodEstado[i].prod[j] === nTerminais[k]){
					if (prodEstado[i].estado === nTerminais[k]){
						break;
					} else {
						estadosAcessiveis.push(nTerminais[k]);
						verificaAcessiveis(criaArrayComProducoesDoEstadoX(nTerminais[k], producoes), producoes, nTerminais, estadosAcessiveis);
						break;
					}
				}
			}
		}
	}
}

function verificaGeraIndiretamente(prodEstado, producoes, nTerminais, geramTerminais){
	for (var i = 0; i < prodEstado.length; i++) {
		for(var j = 0; j < prodEstado[i].prod.length; j++){
			for (var k = 0; k < nTerminais.length; k++){
				if(prodEstado[i].prod[j] === nTerminais[k]){
					// Se entrou no IF achou um terminal na produção
					if (prodEstado[i].estado === nTerminais[k]){
						break;
					} else {
						for (var l = 0; l < geramTerminais.length; l++){
							if (nTerminais[k] === geramTerminais[l]){
								return true;
							}
						}
						return verificaGeraIndiretamente(criaArrayComProducoesDoEstadoX(nTerminais[k], producoes), producoes, nTerminais, geramTerminais);
					}
				} 
			}
		}
	}
	return false;
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
