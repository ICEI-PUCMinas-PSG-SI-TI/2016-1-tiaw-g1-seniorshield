document.getElementById('btn-confirmar-selecao').addEventListener('click', () => {
    const categoriasSelecionadas = [];
    
    if (document.getElementById('chk-fraudes-consumo').checked) categoriasSelecionadas.push('fraudesDeConsumo');
    if (document.getElementById('chk-falsidade-ideologica').checked) categoriasSelecionadas.push('falsidadeIdeologica');
    if (document.getElementById('chk-falsa-autoridade').checked) categoriasSelecionadas.push('falsaAutoridade');
    if (document.getElementById('chk-tutoriais').checked) categoriasSelecionadas.push('tutoriais');
    if (document.getElementById('chk-saude-bem-estar').checked) categoriasSelecionadas.push('saudeEBemEstar');

    if (categoriasSelecionadas.length === 0) {
        alert('Por favor, selecione pelo menos uma categoria.');
        return;
    }

    localStorage.setItem('categoriasFiltro', JSON.stringify(categoriasSelecionadas));
    // Certifique-se de que o nome do arquivo HTML do seu feed seja exatamente este:
    window.location.href = 'videos.html';
});