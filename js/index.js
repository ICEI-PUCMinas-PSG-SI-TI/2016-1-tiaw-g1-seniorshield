var API = 'http://localhost:3000';

var perguntas = [];
var respostas = {};

window.onload = function() {
  carregarPerguntas();
};

function carregarPerguntas() {
  fetch(API + '/perguntas')
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(dados) {
      perguntas = dados;
      mostrarPerguntas();
    })
    .catch(function() {
      document.getElementById('loading').textContent = 'Erro ao carregar perguntas. Verifique se o servidor está rodando.';
    });
}


function mostrarPerguntas() {
  var lista = document.getElementById('lista-perguntas');
  lista.innerHTML = '';

  for (var i = 0; i < perguntas.length; i++) {
    var p = perguntas[i];

    var card = document.createElement('div');
    card.className = 'pergunta-card';
    card.id = 'card-' + p.id;

    card.innerHTML =
      '<div class="pergunta-topo">' +
        '<span class="categoria">' + p.categoria + '</span>' +
      '</div>' +
      '<div class="texto">' + p.texto + '</div>' +
      '<div class="opcoes">' +
        '<button type="button" class="btn-opcao" id="sim-' + p.id + '" onclick="responder(\'' + p.id + '\', true)">Sim</button>' +
        '<button type="button" class="btn-opcao" id="nao-' + p.id + '" onclick="responder(\'' + p.id + '\', false)">Não</button>' +
      '</div>';

    lista.appendChild(card);
  }

  document.getElementById('loading').style.display = 'none';
  document.getElementById('form-checklist').style.display = 'block';
}

function responder(id, valor) {
  respostas[id] = valor;

  var btnSim = document.getElementById('sim-' + id);
  var btnNao = document.getElementById('nao-' + id);

  if (valor === true) {
    btnSim.className = 'btn-opcao ativo';
    btnNao.className = 'btn-opcao';
  } else {
    btnSim.className = 'btn-opcao';
    btnNao.className = 'btn-opcao ativo';
  }

  document.getElementById('card-' + id).className = 'pergunta-card respondida';
}

function salvarRespostas() {
  var nome = document.getElementById('nome-usuario').value;

  if (nome === '') {
    alert('Por favor, escreva seu nome antes de salvar.');
    return;
  }

  var totalRespondidas = 0;
  for (var id in respostas) {
    totalRespondidas = totalRespondidas + 1;
  }

  if (totalRespondidas < perguntas.length) {
    alert('Responda todas as perguntas antes de salvar.');
    return;
  }

  var registro = {
    nome: nome,
    data: new Date().toLocaleDateString('pt-BR'),
    respostas: respostas
  };

  fetch(API + '/respostas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registro)
  })
    .then(function() {
      alert('Respostas salvas com sucesso!');
    })
    .catch(function() {
      alert('Erro ao salvar respostas.');
    });
}
