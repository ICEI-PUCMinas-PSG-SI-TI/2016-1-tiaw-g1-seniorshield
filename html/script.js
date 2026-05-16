fetch('dicionario.json')
    .then(response => response.json())
    .then(data => {
        // Preencher os elementos com as definições
        document.getElementById('phishing').textContent = data.palavras[0].phishing;
        document.getElementById('engenharia-social').textContent = data.palavras[1].smishing;
        document.getElementById('vishing').textContent = data.palavras[2].Vishing;
        document.getElementById('malware').textContent = data.palavras[4].Malware;
        document.getElementById('ransomware').textContent = data.palavras[5].Ransomware;
        document.getElementById('spoofing').textContent = data.palavras[6].Spoofing;
        document.getElementById('2fa').textContent = data.palavras[7]['Autenticação em Dois Fatores (2FA)'];
        document.getElementById('link-malicioso').textContent = data.palavras[8]['Link Malicioso'];
        document.getElementById('otp').textContent = data.palavras[9]['OTP (One-Time Password)'];
    });
    