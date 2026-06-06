document.addEventListener('DOMContentLoaded', () => {
    const urlSelecionada = localStorage.getItem('videoUrlSelecionado');
    const playerContainer = document.getElementById('video-player');
    const nomeCanalText = document.getElementById('info-nome-canal');
    const linkCanalAnchor = document.getElementById('info-link-canal');
    const fontesLista = document.getElementById('dropdown-fontes-lista');

    // Injeta o iframe real do YouTube para o vídeo rodar na tela
    if (urlSelecionada && playerContainer) {
        playerContainer.innerHTML = `
            <iframe width="100%" height="450" src="${urlSelecionada}" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>`;
    }

    // Busca detalhes do criador e fontes relevantes
    fetch('http://localhost:3000/videoSelecionado')
        .then(res => res.json())
        .then(videoData => {
            if (nomeCanalText && linkCanalAnchor) {
                nomeCanalText.textContent = `Canal: ${videoData.criador.canal}`;
                linkCanalAnchor.textContent = `Dono: ${videoData.criador.nome}`;
                linkCanalAnchor.href = videoData.criador.canal;
            }

            if (fontesLista) {
                fontesLista.innerHTML = '';
                videoData.fontesRelevantes.forEach(fonte => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a class="dropdown-item" href="${fonte.link}" target="_blank">${fonte.link}</a>`;
                    fontesLista.appendChild(li);
                });
            }
        })
        .catch(err => console.error('Erro ao buscar detalhes do vídeo:', err));

    // EVENTOS DE NAVEGAÇÃO CORRIGIDOS:
    document.getElementById('btn-video-back').addEventListener('click', () => {
        window.location.href = 'videos.html';
    }); // <-- Faltava fechar aqui

    document.getElementById('btn-video-home').addEventListener('click', () => {
        window.location.href = 'golpetube_main.html';
    });
}); 