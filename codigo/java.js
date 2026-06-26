var acc = document.getElementsByClassName("accordion");

document.getElementById("texto_explicativo").innerHTML = `<section class="intro-suporte">
  <div class="descricao-geral-texto">
    <h2>A internet é para você sim!</h2>
    <p>Criamos este espaço porque sabemos que o mundo digital pode parecer confuso e acelerado demais. Cair em golpes acontece com quem usa a internet, e a culpa <strong>nunca</strong> é da vítima, mas sim dos criminosos que agem de má-fé. Aqui, você pode ler tudo no seu tempo, com letras grandes e explicações simples. Navegue sem medo, estamos aqui para proteger você.</p>
  </div>

  <div class="como-funciona-passos">
    <h2>Como usar o SeniorShield?</h2>
    <p>É muito fácil usar o nosso site para se proteger. Veja o que preparamos para você:</p>
    <ol>
      <li><strong>Conheça os perigos:</strong> Logo abaixo, clique nos blocos azuis para descobrir quais são os golpes mais comuns e os sinais para ligar o sinal de alerta.</li>
      <li><strong>Assista e aprenda:</strong> No menu <strong>Golpe Tube</strong>, temos vídeos curtos e explicativos que mostram os golpes acontecendo na prática.</li>
      <li><strong>Faça um teste:</strong> Está na dúvida se uma mensagem ou ligação é falsa? Use o nosso <strong>Checklist de Risco</strong> para avaliar a situação em poucos minutos.</li>
      <li><strong>Caiu em um golpe? Nós te ajudamos:</strong> Não tenha vergonha, isso pode acontecer com qualquer um. Se você foi vítima de uma fraude, use a página <strong>Registrar Golpe</strong> para nos contar o que aconteceu e alertar outros idosos. Você também pode usar o nosso <strong>Gerador de Boletim</strong> para criar um texto prontinho com a sua denúncia para enviar à Delegacia Virtual de forma simples.</li>
    </ol>
  </div>
</section>`;

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

      
      link.href = "#"; 

      link.addEventListener("click", function(evento) {
        evento.preventDefault(); 

        // Faz o fetch direto na chave de vídeos por categoria do seu servidor
        fetch('http://localhost:3000/videosPorCategoria')
          .then(res => res.json())
          .then(categoriasDeVideo => {
            
           
            var listaTutoriais = categoriasDeVideo["tutoriais"];

            if (listaTutoriais) {
              var videoSelecionado = null;

             
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
                
               
                localStorage.setItem("videoUrlSelecionado", videoSelecionado.url);
                localStorage.setItem("videoTituloSelecionado", videoSelecionado.titulo);
                localStorage.setItem("videoCriadorSelecionado", JSON.stringify(videoSelecionado.criador));
                localStorage.setItem("videoLinksSelecionados", JSON.stringify(videoSelecionado.linksUsados));

                window.open("golpe_tube/video_selecionado.html", "_blank");

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

    } // <--- FECHAMENTO DO LOOP FOR DE GOLPES

  }) // <--- FECHAMENTO DO THEN DE GOLPES 
  .catch(error => console.error('Erro ao carregar golpes:', error));



// FETCH DAS DESCRIÇÕES

fetch('http://localhost:3000/descricoes')
  .then(response => response.json())
  .then(descricao => {

    document.getElementById("descricao-geral").innerHTML =
    descricao[0].descricao_principal;

    document.getElementById("fim_pagina").innerHTML =
    descricao[0].descricao_secundaria;

  })
  .catch(error => console.error('Erro ao carregar descrições:', error));

 