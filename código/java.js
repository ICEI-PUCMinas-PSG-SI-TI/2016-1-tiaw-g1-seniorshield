<<<<<<< HEAD
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

      link.href = golpes[i].tutorial_slug;

      // EVENTO NO LINK
      link.addEventListener("mouseover", function() {
        link.style.transform = "scale(1.1)";
      });

      link.addEventListener("mouseout", function() {
        link.style.transform = "scale(1)";
      });

    }

  })

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
=======
// Seleciona o formulário pelo ID
const formulario = document.getElementById('form-registrar-golpe');

// "Escuta" o evento de envio (submit) do formulário
formulario.addEventListener('submit', function(event) {
    
    // Impede a página de recarregar
    event.preventDefault();

    // 1. Coleta os dados digitados nos campos
    const nome = document.getElementById('nome-completo').value;
    const email = document.getElementById('email').value;
    const golpeSofrido = document.getElementById('golpe-sofrido').value;
    const valorPerdido = document.getElementById('valor-perdido').value;
    const dataOcorrencia = document.getElementById('data-ocorrencia').value;

    // 2. Faz uma leitura (GET) no servidor para saber quantos golpes já existem
    fetch('http://localhost:3000/registro_golpes_sofridos')
        .then(response => response.json())
        .then(golpesExistentes => {
            
            // Calcula o próximo id_golpe (tamanho da lista + 1) e transforma em texto
            const proximoIdGolpe = String(golpesExistentes.length + 1);

            // 3. Monta o pacote de dados com o número sequencial automático!
            const novoGolpe = {
                id_golpe: proximoIdGolpe,
                nome: nome,
                tipo_golpe: golpeSofrido, // Usamos 'tipo_golpe' no lugar de 'id' para evitar erros
                email: email,
                valor_perdido: valorPerdido,
                data_ocorrencia: dataOcorrencia
            };

            // 4. Envia (POST) o novo pacote para o servidor
            return fetch('http://localhost:3000/registro_golpes_sofridos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoGolpe)
            });
        })
        .then(response => {
            if (response.ok) {
                // Se o servidor aceitou, avisa o idoso e limpa o formulário
                alert("Muito obrigado! O golpe foi registrado com sucesso e ajudará a comunidade.");
                formulario.reset(); 
            } else {
                alert("Poxa, ocorreu um erro ao registrar. Tente novamente mais tarde.");
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão. Verifique se o JSON Server está rodando no terminal.");
        });
});
>>>>>>> f1d29b88b227e62b643be14f1845b96d0d89337c
