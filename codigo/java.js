fetch('dados.json')
  .then(r => r.json())
  .then(dados => {

    const desc = dados.descricoes?.[0];
    if (desc) {
      const elGeral = document.getElementById('descricao-geral');
      if (elGeral) elGeral.textContent = desc.descricao_principal;
      const elFim = document.getElementById('fim_pagina');
      if (elFim) elFim.textContent = desc.descricao_secundaria;
    }

    const golpes    = dados.principais_tipos_de_golpe;
    const container = document.getElementById('acordeoes-container');
    if (!golpes || !container) return;

    golpes.forEach(golpe => {
      const sinaisHTML = golpe.sinais_principais
        .map(s => `<li>${s}</li>`).join('');

      const bloco = document.createElement('div');
      bloco.innerHTML = `
        <button class="accordion"><h2>${golpe.titulo}</h2></button>
        <div class="painel">
          <p>${golpe.descricao_detalhada}</p>
          <ul><strong>SINAIS:</strong>${sinaisHTML}</ul>
          <h3>${golpe.texto_chamada_tutorial}</h3>
          <a href="${golpe.tutorial_slug}" class="botao-tutorial" target="_blank">Ver tutorial</a>
        </div>
      `;
      container.appendChild(bloco);

      const acc    = bloco.querySelector('.accordion');
      const painel = bloco.querySelector('.painel');

      acc.addEventListener('click', () => {
        const abrindo = !acc.classList.contains('active');
        document.querySelectorAll('.accordion').forEach(a => {
          a.classList.remove('active');
          a.nextElementSibling.style.display = 'none';
        });
        if (abrindo) {
          acc.classList.add('active');
          painel.style.display = 'block';
        }
      });
    });

  })
  .catch(err => console.error('Erro ao carregar dados.json:', err));
