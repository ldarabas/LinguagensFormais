var count = 1;
var term = [];
var nterm = [];
var producao = [];
var errTerm;
var errNTerm;
var inicial;
var tabActive;




$(document).ready(function () {
  $('select').material_select();
  $('#modal1').modal({
    complete: function () {
      $('#nterm').focus();
    }
  });
  $('#modal2').modal({
    complete: function () {
      $('#term').focus();
    }
  });
  $('#modal3').modal();
  $('#modal4').modal();

  $('.tooltipped').tooltip({
    delay: 50
  });


  $('ul.tabs').tabs('select_tab', 'tab_id');

  errTerm = false;
  errNTerm = false;
  tabActive = false;

});

$('#add').on('click', function () {
  novo = $('.content-select').append('<div class="row"><div class="input-field col s2 offset-s4" id="select' + count + '"><label>Produções não terminais</label></div><div class="col s1 center"><i class="material-icons medium" style="margin-top:10px">trending_flat</i></div><div class="input-field col s2"><input class="ldir" type="text" class="validate"><label for="ldir">Lado direito</label></div></div>')
  $('#copy-select select').clone().prependTo('#select' + count).attr('id', 'select' + count);
  count += 1;
  console.log(count);
  $('select').material_select();
});


$('#nterm').on('focusout', function () {
  if ($(this).val() == "") {
    return;
  }
  if (errTerm) {
    $('#term').focus();
    return;
  }
  errNTerm = false;
  var ntermTemp = nterm;
  nterm = $(this).val().split(',');
  var error = false;
  var counts = {};
  nterm.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
    if (counts[x] > 1) {
      lancarModal(1);
      return;
    }
  });

  $.each(nterm, function (i, val) {


    if (!verificaMaisculo(val)) {
      lancarModal(1);
      error = true;
    }
  });
  if (error === false) {
    callOkMessage();
    $('select').each(function () { $(this).empty().html('<option value="-1" disabled selected>Selecione</option>') });
    $.each(nterm, function (i, val) {
      $('select').each(function () { $(this).append($("<option></option>").attr("value", i).text(val)) });
    });
    $('select').material_select();
    if ($(this).hasClass('wrong')) {
      $(this).removeClass('wrong');
    }
  } else {
    nterm = ntermTemp;
    $(this).addClass('wrong');
    errNTerm = true;
  }
});


$('#term').on('focusout', function () {
  if ($(this).val() == "") {
    return;
  }
  if (errNTerm) {
    $('#nterm').focus();
    return;
  }
  errTerm = false;

  var termTemp = term;
  term = $(this).val().split(',');
  var error = false;

  var counts = {};
  term.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
    if (counts[x] > 1) {
      lancarModal(2);
      return;
    }
  });


  $.each(term, function (i, val) {

    if (verificaMaisculo(val) || val.length > 1) {
      lancarModal(2);
      error = true;
    }
  });
  if (error === false) {
    callOkMessage();
    if ($(this).hasClass('wrong')) {
      $(this).removeClass('wrong');
    }
  } else {
    term = termTemp;
    $(this).addClass('wrong');
    errTerm = true;
  }
});


$('#inicial').on('change', function () {
  inicial = $(this).val();
  Materialize.toast('Tudo certo, pronto para prosseguir!', 3000);
});

function callOkMessage() {
  Materialize.toast('Tudo certo, pronto para prosseguir!', 3000);
}

function verificaMaisculo(str) {
  return (/^([A-Z]{1})$/.test(str)); //regex para verificar se está entre A a Z e contem somente um caractere
}

function verificaMinusculo(str) {
  return (/^([a-z]{1})$/.test(str)); //regex para verificar se está entre A a Z e contem somente um caractere
}

function lancarModal(modal) {
  $('#modal' + modal).modal('open');
}

$('#submit').on('click', function () {
  tempCounter = 0;
  producao = []; //seta array vazio
  $('.ldir').each(function (i, val) {
    var select = $('select', $('#select' + tempCounter++)).val();
    if (val.value == "") {
      lancarModal(3);
      return;
    }

    if (select == null) { //um ou mais select ficaram sem ser(em) selecionado(s)
      lancarModal(3);
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
      if (notFound) {
        lancarModal(3);
        return;
      }
    }

    producao.push({
      id: $('.select-g select').get(i).value,
      value: val.value,
      inicial: false
    });

    if ($('select')[0].value == $('.select-g select').get(i).value) {
      producao[i].inicial = true;
    }
  });
  if (producao.length != 0) {
    setTabActive();
  }
});

$('#tab').on('click', function () {
  if (!tabActive) {
    lancarModal(4);
  }
});

function setTabActive() {
  tabs = ["tab-1", "tab-2", "tab-3"];
  tabsBody = ["tab-vazio", "tab-unitaria", "tab-inuteis"];
  for (var i = 0; i < tabs.length; i++) {
    tab = '#' + tabs[i];
    tabB = '#' + tabsBody[i];
    $(tab).removeClass("disabled");
    $(tabB).html(tabsBody[i]);


  }
  $('.tabs .indicator').css('background-color', '#f6b2b5');
  tabActive = true;
}
/*
function teste() {
  var i = 0;
  producao.forEach(function () {
    console.log(producao[i++].value);
  });
}*/
