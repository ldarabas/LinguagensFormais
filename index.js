var count = 1,
  term = [],
  nterm = [],
  producao = [],
  errTerm,
  nTermError = false,
  errNTerm,
  inicial,
  tabActive,
  producaoSemVazio = null,
  producaoUnitaria = null,
  nTermKeyUpError = false,
  audio = new Audio("audio/audio.mp3"),
  audio2 = new Audio("audio/audio2.mp3");

var Producao = function(estado, prod, isInicial) {
  this.estado = estado;
  this.prod = prod;
  this.isInicial = isInicial;
};

$(document).ready(function() {
  $("select").material_select();
  $("#modal1").modal({
    complete: function() {
      $("#nterm").focus();
    }
  });
  $("#modal2").modal({
    complete: function() {
      $("#term").focus();
    }
  });
  $("#modal3").modal();
  $("#modal4").modal();
  $("#modalexit").modal();
  $("#modalexport").modal();

  $(".tooltipped").tooltip({
    delay: 50
  });

  $("ul.tabs").tabs("select_tab", "tab_id");

  $("#new").hide();
  $("#exp").hide();
  $("#tab").hide();

  errTerm = false;
  errNTerm = false;
  tabActive = false;
  $("#nterm").val("");
  $("#term").val("");
});

$("#nterm").on("keyup", function(e) {
  $(this).val($(this).val().toUpperCase());
  if (
    (e.getKeyCode || e.which) != 188 &&
    !new RegExp(/^([A-Z],)+[A-Z]$/g).test($(this).val()) &&
    $(this).val().length > 1
  ) {
    nTermKeyUpError = true;
    $(this).addClass("wrong");
  } else {
    if (nTermKeyUpError && (e.getKeyCode || e.which) != 188 && !nTermError) {
      $(this).removeClass("wrong");
    } else {
      nTermError = false;
    }
  }
});

$("#term").on("keyup", function() {
  $(this).val($(this).val().toLowerCase());
});

$("#add").on("click", function() {
  novo = $(".content-select").append(
    '<div class="row"><div class="input-field col s2 offset-s4" id="select' +
      count +
      '"><label>Produções não terminais</label></div><div class="col s1 center"><i class="material-icons medium" style="margin-top:10px">trending_flat</i></div><div class="input-field col s2"><input class="ldir" type="text" class="validate"><label for="ldir">Lado direito</label></div></div>'
  );
  $("#copy-select select")
    .clone()
    .prependTo("#select" + count)
    .attr("id", "select" + count);
  count += 1;
  console.log(count);
  $("select").material_select();
});

$("#nterm").on("focusout", function() {
  if ($(this).val() == "") {
    return;
  }
  if (errTerm) {
    $("#term").focus();
    return;
  }
  errNTerm = false;
  var ntermTemp = nterm;
  nterm = $(this).val().split(",");
  nTermError = false;
  var counts = {};
  nterm.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
    if (counts[x] > 1) {
      nTermError = true;
      lancarModal(1, "errou");
      return;
    }
  });

  $.each(nterm, function(i, val) {
    if (!verificaMaisculo(val)) {
      lancarModal(1, "errou");
      nTermError = true;
    }
  });

  if (nTermError === false) {
    callOkMessage();
    $("select").each(function() {
      $(this)
        .empty()
        .html('<option value="-1" disabled selected>Selecione</option>');
    });
    $.each(nterm, function(i, val) {
      $("select").each(function() {
        $(this).append($("<option></option>").attr("value", i).text(val));
      });
    });
    $("select").material_select();
    if ($(this).hasClass("wrong")) {
      $(this).removeClass("wrong");
    }
  } else {
    nterm = ntermTemp;
    $(this).addClass("wrong");
    errNTerm = true;
  }
});

$("#term").on("focusout", function() {
  if ($(this).val() == "") {
    return;
  }
  if (errNTerm) {
    $("#nterm").focus();
    return;
  }
  errTerm = false;

  var termTemp = term;
  term = $(this).val().split(",");
  var error = false;

  var counts = {};
  term.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
    if (counts[x] > 1) {
      lancarModal(2, "errou");
      return;
    }
  });

  $.each(term, function(i, val) {
    if (verificaMaisculo(val) || val.length > 1) {
      lancarModal(2, "errou");
      error = true;
    }
  });
  if (error === false) {
    callOkMessage();
    if ($(this).hasClass("wrong")) {
      $(this).removeClass("wrong");
    }
  } else {
    term = termTemp;
    $(this).addClass("wrong");
    errTerm = true;
  }
});

$("#inicial").on("change", function() {
  inicial = $(this).val();
  Materialize.toast("Tudo certo, pronto para prosseguir!", 3000);
});

function callOkMessage() {
  Materialize.toast("Tudo certo, pronto para prosseguir!", 3000);
}

function verificaMaisculo(str) {
  return /^([A-Z]{1})$/.test(str); //regex para verificar se está entre A a Z e contem somente um caractere
}

function verificaMinusculo(str) {
  return /^([a-z]{1})$/.test(str); //regex para verificar se está entre A a Z e contem somente um caractere
}

function lancarModal(modal, audio) {
  switch (audio) {
    case "errou":
      this.audio.play();
      break;
    case "aleluia":
      this.audio2.play();
      break;
    default:
  }
  $("#modal" + modal).modal("open");
}

$("#submit").on("click", function() {
  tempCounter = 0;
  producao = []; //seta array vazio
  music = true;
  $(".ldir").each(function(i, val) {
    var select = $("select", $("#select" + tempCounter++)).val();
    if (val.value == "") {
      console.log("0");
      lancarModal(3, "errou");
      music = false;
      return;
    }

    if (select == null) {
      //um ou mais select ficaram sem ser(em) selecionado(s)
      console.log("1");
      lancarModal(3, "errou");
      music = false;
      return;
    }

    for (j = 0; j < val.value.length; j++) {
      notFound = true;
      for (k = 0; k < term.length; k++) {
        //console.log(term[k]);
        //console.log(val.value[j]);
        if (val.value[j] == term[k]) {
          notFound = false;
        }
      }
      for (k = 0; k < nterm.length; k++) {
        if (val.value[j] == nterm[k]) {
          notFound = false;
        }
      }
      if (notFound) {
        console.log("2");
        lancarModal(3, "errou");
        music = false;
        return;
      }
    }

    prod = new Producao(
      nterm[$(".select-g select").get(i).value],
      val.value,
      false
    );

    if ($("select")[0].value == $(".select-g select").get(i).value) {
      prod.isInicial = true;
    }
    producao.push(prod);
  });
  if (producao.length != 0 && music) {
    setTabActive();
    audio2.play();
  }
});

$("#tab").on("click", function() {
  if (!tabActive) {
    lancarModal(4, "errou");
  }
});

function setTabActive() {
  $("#tab").show("slow");
  tabs = ["tab-1", "tab-2", "tab-3", "tab-4"];
  tabsBody = ["#tab-vazio", "#tab-unitaria", "#tab-inuteis", "#tab-combinado"];
  for (var i = 0; i < tabs.length; i++) {
    tab = "#" + tabs[i];
    $(tab).removeClass("disabled");
  }
  $(".tabs .indicator").css("background-color", "#f6b2b5");
  producaoSemVazio = JSON.parse(JSON.stringify(producao)); //copy o array sem passar referencia
  producaoUnitaria = JSON.parse(JSON.stringify(producao)); //copy o array sem passar referencia
  producaoSemInuteis = JSON.parse(JSON.stringify(producao)); //copy o array sem passar referencia
  producaoCombinada = JSON.parse(JSON.stringify(producao)); //copy o array sem passar referencia
  for (var i = 0; i < tabsBody.length; i++) {
    switch (i) {
      case 0:
        removeProducoesVazias(producaoSemVazio);
        console.log(producaoSemVazio);
        producaoSemVazio.sort(function(x, y) {
          return x.isInicial === y.isInicial ? 0 : x.isInicial ? -1 : 1;
        });
        $(tabsBody[i]).html(
          '<table class="col s4 offset-s5 center"><tbody></tbody></table>'
        );
        for (var j = 0; j < producaoSemVazio.length; j++) {
          console.log("Passou no switch com " + i + " e " + j);
          $(tabsBody[i])
            .children()
            .append(
              (producaoSemVazio[j].isInicial
                ? '<tr><td><i class="material-icons">input</i></td>'
                : '<tr><td style="width:4rem"></td>') +
                "</td><td>" +
                producaoSemVazio[j].estado +
                '</td><td><i class="material-icons">trending_flat</i></td><td>' +
                producaoSemVazio[j].prod +
                "</td></tr>"
            );
        }
        break;
      case 1:
        removeProducoesVazias(producaoUnitaria);
        removeProducoesUnitarias(producaoUnitaria);
        console.log(producaoUnitaria);
        producaoUnitaria.sort(function(x, y) {
          return x.isInicial === y.isInicial ? 0 : x.isInicial ? -1 : 1;
        });
        $(tabsBody[i]).html(
          '<table class="col s4 offset-s5 center"><tbody></tbody></table>'
        );
        for (var j = 0; j < producaoUnitaria.length; j++) {
          console.log("Passou no switch com " + i + " e " + j);
          $(tabsBody[i])
            .children()
            .append(
              (producaoUnitaria[j].isInicial
                ? '<tr><td><i class="material-icons">input</i></td>'
                : '<tr><td style="width:4rem"></td>') +
                "</td><td>" +
                producaoUnitaria[j].estado +
                '</td><td><i class="material-icons">trending_flat</i></td><td>' +
                producaoUnitaria[j].prod +
                "</td></tr>"
            );
        }

        break;
      case 2:
        removerEstadosInuteis(producaoSemInuteis);
        console.log(producaoSemInuteis);
        producaoSemInuteis.sort(function(x, y) {
          return x.isInicial === y.isInicial ? 0 : x.isInicial ? -1 : 1;
        });
        $(tabsBody[i]).html(
          '<table class="col s4 offset-s5 center"><tbody></tbody></table>'
        );
        for (var j = 0; j < producaoSemInuteis.length; j++) {
          console.log("Passou no switch com " + i + " e " + j);
          $(tabsBody[i])
            .children()
            .append(
              (producaoSemInuteis[j].isInicial
                ? '<tr><td><i class="material-icons">input</i></td>'
                : '<tr><td style="width:4rem"></td>') +
                "</td><td>" +
                producaoSemInuteis[j].estado +
                '</td><td><i class="material-icons">trending_flat</i></td><td>' +
                producaoSemInuteis[j].prod +
                "</td></tr>"
            );
        }

        break;
      case 3:
        console.log("COMBINADA");
        producaoCombinada = JSON.parse(JSON.stringify(producaoUnitaria)); //copy o array sem passar referencia
        removerEstadosInuteis(producaoCombinada);
        console.log(producaoCombinada);
        producaoCombinada.sort(function(x, y) {
          return x.isInicial === y.isInicial ? 0 : x.isInicial ? -1 : 1;
        });

        $(tabsBody[i]).html(
          '<table class="col s4 offset-s5 center"><tbody></tbody></table>'
        );
        for (var j = 0; j < producaoCombinada.length; j++) {
          console.log("Passou no switch com " + i + " e " + j);
          $(tabsBody[i])
            .children()
            .append(
              (producaoCombinada[j].isInicial
                ? '<tr><td><i class="material-icons">input</i></td>'
                : '<tr><td style="width:4rem"></td>') +
                "</td><td>" +
                producaoCombinada[j].estado +
                '</td><td><i class="material-icons">trending_flat</i></td><td>' +
                producaoCombinada[j].prod +
                "</td></tr>"
            );
        }

        break;
      default:
        break;
    }
  }
  tabActive = true;
  $("html, body").animate(
    {
      scrollTop: $(document).height()
    },
    "slow"
  );
  $("#new").show("slow");
  $("#exp").show("slow");
}
$("#new").on("click", function() {
  lancarModal("exit", 0);
});
$("#exit").on("click", function() {
  location.reload();
});
$("#exp").on("click", function() {
  $("#export").html(
    '<div class="input-field col s2 offset-s4" id="selectExport0"><select id="select-export" class="selectExport"><option value="-1" disabled selected>Selecione</option><option value="1">Gramática Informada</option><option value="2">Gramática sem Vazio</option><option value="3">Gramática sem Unitária</option><option value="4">Gramática sem Inuteis</option><option value="5">Combinada</option><option value="6">Todos</option></select><label>Selecione o que deseja exportar</label></div>'
  );
  $("select").material_select();
  lancarModal("export", 0);
});
$("#json").on("click", function() {
  downloadURL($(this).attr("id"));
});
$("#text").on("click", function() {
  downloadURL($(this).attr("id"));
});

/*
  <option value="1">Gramática Informada</option>
  <option value="2">Gramática sem Vazio</option>
  <option value="3">Gramática sem Unitária</option>
  <option value="4">Gramática sem Inuteis</option>
  <option value="5">Gramática Combinada</option>
  <option value="6">Todos os acima</option>
*/
function downloadURL(type) {
  var select = $("#export select").val(),
    element = document.createElement("a"),
    data = "";
  if (type == "json") {
    switch (select) {
      case "1":
        data +=
          '{\n\t"Gramática Informada": ' + JSON.stringify(producao) + "\n}";
        break;
      case "2":
        data +=
          '{\n\t"Gramática sem vazio": ' +
          JSON.stringify(producaoSemVazio) +
          "\n}";
        break;
      case "3":
        data +=
          '{\n\t"Gramática sem Unitária": ' +
          JSON.stringify(producaoUnitaria) +
          "\n}";
        break;
      case "4":
        data +=
          '{\n\t"Gramática sem Inúteis": ' +
          JSON.stringify(producaoSemInuteis) +
          "\n}";
        break;
      case "5":
        data +=
          '{\n\t"Gramática Combinada": ' +
          JSON.stringify(producaoCombinada) +
          "\n}";
        break;
      case "6":
        data += '{\n\t"Gramática Informada": ' + JSON.stringify(producao) + ",";
        data +=
          '\n\t"Gramática sem vazio": ' +
          JSON.stringify(producaoSemVazio) +
          ",";
        data +=
          '\n\t"Gramática sem Unitária": ' +
          JSON.stringify(producaoUnitaria) +
          ",";
        data +=
          '\n\t"Gramática sem Inúteis": ' +
          JSON.stringify(producaoSemInuteis) +
          ",";
        data +=
          '\n\t"Gramática Combinada": ' +
          JSON.stringify(producaoCombinada) +
          "\n}";
        break;
      default:
        alert("Opção inválida!");
        return;
    }
  } else {
    switch (select) {
      case "1":
        data += '"Gramática Informada":\n';
        $.each(producao, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        break;
      case "2":
        data += '"Gramática sem Vazio":\n';
        $.each(producaoSemVazio, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        break;
      case "3":
        data += '"Gramática sem Unitária":\n';
        $.each(producaoUnitaria, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        break;
      case "4":
        data += '"Gramática sem Inúteis":\n';
        $.each(producaoSemInuteis, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        break;
      case "5":
        data += '"Gramática Combinada":\n';
        $.each(producaoCombinada, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });

        break;
      case "6":
        data += "\nGramática Informada:\n";
        $.each(producao, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        data += "\n";

        data += "\nGramática sem Vazio:\n";
        $.each(producaoSemVazio, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        data += "\n";

        data += "\nGramática sem Unitária:\n";
        $.each(producaoUnitaria, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        data += "\n";
        data += "\nGramática sem Inúteis:\n";
        $.each(producaoSemInuteis, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        data += "\n";
        data += "\nGramática Combinada:\n";
        $.each(producaoCombinada, function(i, val) {
          data +=
            "\t" +
            (val.isInicial ? "=>" : "") +
            val.estado +
            " =:: " +
            val.prod +
            "\n";
        });
        break;
      default:
        alert("Opção inválida!");
        return;
    }
  }
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(data)
  );
  element.setAttribute(
    "download",
    "export." + (type == "json" ? "json" : "txt")
  );
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
