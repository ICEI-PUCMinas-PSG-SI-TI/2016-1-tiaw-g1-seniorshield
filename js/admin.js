var API = 'http://localhost:3000';
var respostas = [];

window.onload = function() {
  carregarRespostas();
};

function carregarRespostas() {
  fetch(API + '/respostas')
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(dados) {
      respostas = dados;
      mostrarRespostas(respostas);
    })
    .catch(function() {
      document.getElementById('loading').textContent = 'Erro ao conectar ao servidor.';
    });
}

function mostrarRespostas(lista) {
  document.getElementById('loading').style.display = 'none';

  var div = document.getElementById('lista');
  div.innerHTML = '';

  document.getElementById('contador').textContent = lista.length;

  if (lista.length === 0) {
    div.innerHTML = '<p class="vazio">Nenhuma resposta salva ainda.</p>';
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var r = lista[i];

    var totalSim = 0;
    for (var id in r.respostas) {
      if (r.respostas[id] === true) {
        totalSim = totalSim + 1;
      }
    }

    var card = document.createElement('div');
    card.className = 'item';

    card.innerHTML =
      '<div class="topo-item">' +
        '<div>' +
          '<strong>' + r.nome + '</strong>' +
          '<span class="data">  ' + r.data + '</span>' +
        '</div>' +
        '<div class="acoes">' +
          '<span class="badge-sim">Sim: ' + totalSim + '</span>' +
          '<button class="btn-excluir" onclick="excluirResposta(\'' + r.id + '\')">Excluir</button>' +
        '</div>' +
      '</div>' +
      '<div class="resumo">' + montarResumo(r.respostas) + '</div>';

    div.appendChild(card);
  }
}
function montarResumo(respostasObj) {
  var texto = '';
  for (var id in respostasObj) {
    var resposta = respostasObj[id] === true ? 'Sim' : 'Não';
    var cor = respostasObj[id] === true ? 'resp-sim' : 'resp-nao';
    texto = texto +
      '<span class="resumo-item">' +
        'Pergunta ' + id + ': <span class="' + cor + '">' + resposta + '</span>' +
      '</span>';
  }
  return texto;
}

function excluirResposta(id) {
  var confirmar = confirm('Deseja excluir esta resposta?');

  if (confirmar === false) {
    return;
  }

  fetch(API + '/respostas/' + id, { method: 'DELETE' })
    .then(function() {
      alert('Resposta excluída.');
      carregarRespostas();
    })
    .catch(function() {
      alert('Erro ao excluir.');
    });
}

