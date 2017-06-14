var Producao = function(estado, prod, isInicial) {
    this.estado = estado;
    this.prod = prod;
    this.isInicial = isInicial;
}

function verificarMinuscula(texto) {
    var letras;
    if (/[a-z]/gm.test(texto)) {

        return letras = 1;
    } else {
        return letras = 0;
    }

}

function verificarEstadosVazios(producoes) {
    var prod0 = new Producao("S", "aAbB", true);
    var prod1 = new Producao("S", "aA", true);
    var prod2 = new Producao("S", "a", true);
    var prod3 = new Producao("A", "aBb", false);
    var prod4 = new Producao("A", "bbA", false);
    var prod5 = new Producao("A", "&", false);
    var prod6 = new Producao("B", "bAa", false);
    var prod7 = new Producao("B", "aa", false);

    producoes = [prod0, prod1, prod2, prod3, prod4, prod5, prod6, prod7];
    // Armazenando o numero de produções do Simbolo Inicial
    var ProduçõesIniciais = 0;
    for (var i = 0; i < producoes.length; i++) {
        if (producoes[i].estado === "S") {
            ProduçõesIniciais++;
        }
    }
    var p;
    var estadosComVazio = [];
    // Armazenar todos os Estados que geram terminais diretamente
    for (var i = 0; j = 0; i < producoes.length; i++) {
        var verif = 0;
        verif = verificarMinuscula(producoes[i].prod)
        if (verif === 1) {
            if (producoes[i].estado !== = estadosComVazio[j - 1])
                estadosComVazio[j] = producoes[i].estado;
            j++;
            p = j;
        }
    }

    // Armazenar todos os Estados que acessam terminais indiretamente
    for (var i = 0; i < producoes.length; i++) {
        for (j = 0; j < estadosComVazio.length; j++) {
            if (producoes[i].prod.indexOf(estadosComVazio[j]) >= 0) {
                if (producoes[i].estado !== = estadosComVazio[j - 1] {
                        estadosComVazio[p] = producoes[i].estado;
                    }

                }
            }
        }

        var estadosfinal = [prod0];
        //Usar os simbolos restantes e ver quais deles são gerados a partir do simbolo inicial

        for (var i = 0; i < ProduçõesIniciais; i++) {
            for (j = 0; j < estadosComVazio.length; j++) {
                if (producoes[i].prod.indexOf(estadosComVazio[j]) >= 0) {
                    if (producoes[i].estado !== = estadosComVazio[j - 1] {
                            estadosfinal[j] = producoes[i].estado;
                        }

                    }
                }
            }



            // Mostra no console como ficou as produções
            for (var i = 0; i < estadosfinal.length; i++) {
                console.log(producoes[i].estado + " " + producoes[i].prod + " " + producoes[i].isInicial);
            }
        }
