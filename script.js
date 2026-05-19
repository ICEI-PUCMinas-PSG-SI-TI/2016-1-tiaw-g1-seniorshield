document.addEventListener("DOMContentLoaded", () => {
  /* ELEMENTOS */
  const campoValor = document.getElementById("valor");
  const btnGerar = document.getElementById("btnGerar");
  const btnCopiar = document.getElementById("btnCopiar");
  const btnPDF = document.getElementById("btnPDF");

  /* EVENTOS */
  btnGerar.addEventListener("click", gerarBoletim);
  btnCopiar.addEventListener("click", copiarTexto);
  btnPDF.addEventListener("click", baixarPDF);

  /* MÁSCARA MONETÁRIA */
  campoValor.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2).replace(".", ",");
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    this.value = "R$ " + valor;
  });
});

/* GERAR BOLETIM */
async function gerarBoletim(event) {
  if (event) event.preventDefault(); 

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const tipoGolpe = document.getElementById("tipoGolpe").value;
  const valor = document.getElementById("valor").value;
  const descricao = document.getElementById("descricao").value;

  /* VALIDAÇÃO */
  if (!nome || !data || !tipoGolpe || !valor || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }

  /* TEXTO GERADO */
  const dataFormatada = data.split('-').reverse().join('/');
  const texto = `Eu, ${nome}, venho por meio deste registrar um boletim de ocorrência referente a um golpe sofrido no dia ${dataFormatada}.

Tipo do golpe: ${tipoGolpe}

Valor do prejuízo: ${valor}

Descrição dos fatos:
${descricao}

Solicito que as medidas cabíveis sejam tomadas pelas autoridades competentes.`;

  /* MOSTRAR TEXTO */
  document.getElementById("textoBoletim").textContent = texto;

  /* SALVAR NO JSON SERVER (Obrigatório conforme os requisitos do trabalho) */
  try {
    await fetch("http://localhost:4000/boletins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        data,
        tipoGolpe,
        valor,
        descricao,
        texto
      })
    });
  } catch (erro) {
    console.log("Erro ao salvar no JSON Server:", erro);
  }
}

/* COPIAR TEXTO */
function copiarTexto() {
  const texto = document.getElementById("textoBoletim").textContent;

  if (texto.trim() === "") {
    alert("Gere um boletim primeiro!");
    return;
  }

  navigator.clipboard.writeText(texto)
    .then(() => alert("Texto copiado para a área de transferência!"))
    .catch(() => alert("Erro ao tentar copiar o texto."));
}

/* BAIXAR PDF */
function baixarPDF() {
  const texto = document.getElementById("textoBoletim").textContent;

  if (texto.trim() === "") {
    alert("Gere um boletim antes!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const linhas = doc.splitTextToSize(texto, 180);
  doc.text(linhas, 10, 20);
  doc.save("boletim_SeniorShield.pdf");
}