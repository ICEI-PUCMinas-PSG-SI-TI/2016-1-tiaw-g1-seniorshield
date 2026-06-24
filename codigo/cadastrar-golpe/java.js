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