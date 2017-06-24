var Producao = function(estado, prod, isInicial){
	this.estado = estado;
	this.prod = prod;
	this.isInicial = isInicial;
}

function removeProducoesUnitarias(nTerminais, producoes){
	// Mostra no console as produções antes de remover unitárias
	console.log('Produções antes de remover os unitárias: ');
	imprime(producoes);
	

	// Verifica se existe estados inválidos para eliminar. Ex: J -> H e H -> J
	removeEstadosInvalidos(nTerminais, producoes);

	var v = ContadorSomenteNãoTerminais(nTerminais,producoes);
	
	// Remove produções unitárias
	var x = 0;
	console.log( v +'x');
	do {
        x++;
		console.log(v + "Verificador");
		removeUnitaria(nTerminais, producoes, v);
        
	} while(x<=v);
	
	
	// Mostra no console as produções após remover unitárias
	console.log('Produções após remover os unitárias: ');
	imprime(producoes);
}

function Excluir(nTerminais,producoes,nTerminaisExclusão){
	console.log('EXCCC');
for(var i = 0; i < producoes.length; i++){
	for (var j = 0 ; j < nTerminaisExclusão.length ; j++) {
		var verificar = producoes[i].prod.indexOf(nTerminaisExclusão[j]);
		console.log(verificar + 'Posicao encontrado >>  ' + producoes[i].prod);
		if(verificar !== -1){
		console.log('Excluido >>> ' + producoes[i].prod);
		producoes.splice(i, 1);
		
		}
		}
	}
		

}

function ContadorSomenteNãoTerminais(nTerminais,producoes){
	var v=0;
for(var i = 0; i < producoes.length; i++){

		for (var j = 0; j < nTerminais.length; j++){
			if(producoes[i].prod === nTerminais[j]){
				// Conta Unitaria
				v++;
				
				
			}
		}
}
console.log(v + 'opax');
return v;
}

function removeEstadosInvalidos(nTerminais, producoes){
	var nTerminaisExclusão = [];
    var verif = 0;

	for(var i = 0; i < producoes.length; i++){
		for(var j = 0; j < nTerminais.length; j++){
			if (producoes[i].prod === nTerminais[j]){
				var arrayProds = criaArrayComProducoesDoEstadoX(nTerminais[j], producoes);				
				for(var k = 0; k < arrayProds.length; k++){
					if (arrayProds[k].prod === producoes[i].estado){
						if( verif === 0) {
							nTerminaisExclusão.push(arrayProds[k].estado);
						console.log(nTerminaisExclusão[0]);
						nTerminaisExclusão.push(producoes[i].estado);
						console.log(nTerminaisExclusão[1]);
						Excluir(nTerminais,producoes,nTerminaisExclusão);
						console.log('BOM ');
						verif = 10;
						} 
					}
				}
			}
		}
	}
	
}

function removeUnitaria(nTerminais, producoes, v){
	var producoesAux = [];
	var existeUnitaria = false;
	// Gera novas produções e elimina a unitária
	for(var i = 0; i < producoes.length; i++){
		for (var j = 0; j < nTerminais.length; j++){
			if(producoes[i].prod === nTerminais[j]){
				// Cria novas produções de acordo com a unitária
				for(var k = 0; k < producoes.length; k++){
					if (producoes[k].estado === nTerminais[j]){
						var novaProdObj = new Producao(producoes[i].estado,producoes[k].prod,producoes[i].isInicial);
						producoesAux.push(novaProdObj);
					}
				}
				// Elimina a produção unitária
				producoes.splice(i, 1);
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
	for(var i = 0; i < producoes.length; i++){

		for (var j = 0; j < nTerminais.length; j++){
			if(producoes[i].prod === nTerminais[j]){
				// Ainda existe unitária
				v = 0;
				console.log("Opa");

				break;
			}
			else {
				v = 9999;
			}
		}
	}

	// Remove possíveis produções que ficarão repetidas
	for (var i = 0; i < producoes.length; i++){
		for (var j = i + 1; j < producoes.length; j++){
			if (producoes[i].estado === producoes[j].estado && producoes[i].prod === producoes[j].prod){
				producoes.splice(j, 1);
			}
		}
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
