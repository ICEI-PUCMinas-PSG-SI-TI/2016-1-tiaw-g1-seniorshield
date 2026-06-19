var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {

  // clicar acordeão
  acc[i].addEventListener("click", function() {

    this.classList.toggle("active");

    var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }

  });

  // mouse por cima
  acc[i].addEventListener("mouseover", function() {
    this.style.transform = "scale(1.02)";
  });

  // quando sai o mouse
  acc[i].addEventListener("mouseout", function() {
    this.style.transform = "scale(1)";
  });

}


// FETCH DOS GOLPEs

fetch('http://localhost:3000/principais_tipos_de_golpe')
  .then(response => response.json())
  .then(golpes => {

    for (let i = 0; i < golpes.length; i++) {

      document.getElementById(`descricao-do-golpe${i+1}`).innerHTML =
      golpes[i].descricao_detalhada;

      let listaSinais = '';

      for (let a = 0; a < golpes[i].sinais_principais.length; a++) {
        listaSinais += `<li>${golpes[i].sinais_principais[a]}</li>`;
      }

      document.getElementById(`sinais-do-golpe${i+1}`).innerHTML = `
        <ul>
          <strong>SINAIS:</strong>
          ${listaSinais}
        </ul>
      `;

      document.getElementById(`golpe-${i+1}`).innerHTML =
      `<h2>${golpes[i].titulo}</h2>`;

      document.getElementById(`link-tutorial-abaixo${i+1}`).innerHTML =
      golpes[i].texto_chamada_tutorial;

      let link = document.getElementById(`link-${i+1}`);

      // MODIFICAÇÃO: Removemos a URL estática do Pinterest e preparamos o clique dinâmico
      link.href = "#"; 

      link.addEventListener("click", function(evento) {
        evento.preventDefault(); 

        // Faz o fetch direto na chave de vídeos por categoria do seu servidor
        fetch('http://localhost:3000/videosPorCategoria')
          .then(res => res.json())
          .then(categoriasDeVideo => {
            
            // Pega especificamente a lista "tutoriais" que você enviou
            var listaTutoriais = categoriasDeVideo["tutoriais"];

            if (listaTutoriais) {
              var videoSelecionado = null;

              // Identifica qual golpe foi clicado usando a variável 'i' do seu loop principal
              // e atribui exatamente o objeto do vídeo correto da lista de tutoriais
              if (i === 0) {
                // Primeiro Golpe: Fraude de Consumo -> Vídeo ID 14 (identifique lojas falsas)
                videoSelecionado = listaTutoriais.find(v => v.id === 14);
              } 
              else if (i === 1) {
                // Segundo Golpe: Parceiro Virtual -> Vídeo ID 17 (GOLPE DO AMOR)
                videoSelecionado = listaTutoriais.find(v => v.id === 17);
              } 
              else if (i === 2) {
                // Terceiro Golpe: Suposta Autoridade -> Vídeo ID 15 (o golpe da falsa autoridade)
                videoSelecionado = listaTutoriais.find(v => v.id === 15);
              } 
              else if (i === 3) {
                // Quarto Golpe: Roubo de Dados -> Vídeo ID 13 (ROUBO DE DADOS na internet)
                videoSelecionado = listaTutoriais.find(v => v.id === 13);
              }

              // Se o vídeo foi encontrado na lista, salva as propriedades dele no localStorage
              if (videoSelecionado) {
                
                // Aqui salvamos exatamente as variáveis que a sua segunda parte do código lê
                localStorage.setItem("videoUrlSelecionado", videoSelecionado.url);
                localStorage.setItem("videoTituloSelecionado", videoSelecionado.titulo);
                localStorage.setItem("videoCriadorSelecionado", JSON.stringify(videoSelecionado.criador));
                localStorage.setItem("videoLinksSelecionados", JSON.stringify(videoSelecionado.linksUsados));

                // Redireciona o usuário para a página do player onde o seu segundo script vai rodar
                window.location.href = "player_video.html"; 

              } else {
                alert("O vídeo configurado para este golpe não foi encontrado.");
              }
            }
          })
          .catch(err => console.error('Erro ao buscar a categoria de tutoriais:', err));
      });

      // EVENTO NO LINK (MOUSEOVER/OUT)
      link.addEventListener("mouseover", function() {
        link.style.transform = "scale(1.1)";
      });

      link.addEventListener("mouseout", function() {
        link.style.transform = "scale(1)";
      });

    } // <--- FECHAMENTO DO LOOP FOR DE GOLPES (Corrigido)

  }) // <--- FECHAMENTO DO THEN DE GOLPES (Corrigido)
  .catch(error => console.error('Erro ao carregar golpes:', error));



// FETCH DAS DESCRIÇÕES

fetch('http://localhost:3000/descricoes')
  .then(response => response.json())
  .then(descricao => {

    document.getElementById("descricao-general").innerHTML =
    descricao[0].descricao_principal;

    document.getElementById("fim_pagina").innerHTML =
    descricao[0].descricao_secundaria;

  })
  .catch(error => console.error('Erro ao carregar descrições:', error));
