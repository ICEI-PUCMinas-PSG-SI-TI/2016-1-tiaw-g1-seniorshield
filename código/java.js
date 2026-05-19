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