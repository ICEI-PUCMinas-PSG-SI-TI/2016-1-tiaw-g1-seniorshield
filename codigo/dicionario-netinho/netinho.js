fetch('netinho.json')
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById('cards-container');

        data.netinho.forEach(item => {

            const card = document.createElement('div');
            card.className = 'cards-container';

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.pergunta}</h5>
                    <p class="card-text">${item["o que fazer"]}</p>
                </div>
            `;

            container.appendChild(card);
        });

    })
    .catch(error => console.error('Erro ao carregar JSON:', error));
