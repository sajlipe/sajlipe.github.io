const db = {
    cidade: [
        {
            nome: "São Paulo",
            quantidade: 15,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Rio de Janeiro",
            quantidade: 12,
            classe: ["econômica", "executiva"],
            passagem: ["ida"]
        },
        {
            nome: "Belo Horizonte",
            quantidade: 5,
            classe: ["executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Salvador",
            quantidade: 9,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Brasília",
            quantidade: 19,
            classe: ["primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Curitiba",
            quantidade: 30,
            classe: ["econômica", "executiva", "primeira"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Fortaleza",
            quantidade: 10,
            classe: ["econômica", "primeira"],
            passagem: ["volta"]
        },
        {
            nome: "Recife",
            quantidade: 50,
            classe: ["econômica"],
            passagem: ["volta"]
        },
        {
            nome: "Porto Alegre",
            quantidade: 9,
            classe: ["econômica", "executiva", "primeira"],
            passagem: null
        },
        {
            nome: "Manaus",
            quantidade: null,
            classe: null,
            passagem: ["ida", "volta"]
        },
        {
            nome: "Capela do Alto Alegre",
            quantidade: 5,
            classe: ["econômica", "executiva"],
            passagem: ["ida", "volta"]
        },
        {
            nome: "Santo Antônio de Jesus",
            quantidade: 30,
            classe: ["executiva"],
            passagem: ["ida", "volta"]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const origemSelect = document.getElementById('barra1');
    const destinoSelect = document.getElementById('barra2');
    const classeSelect = document.getElementById('barra4');

    
    db.cidade.forEach(cidade => {
        const optionOrigem = document.createElement('option');
        optionOrigem.value = cidade.nome.toLowerCase();
        optionOrigem.textContent = cidade.nome;
        origemSelect.appendChild(optionOrigem);

        const optionDestino = document.createElement('option');
        optionDestino.value = cidade.nome.toLowerCase();
        optionDestino.textContent = cidade.nome;
        destinoSelect.appendChild(optionDestino);
    });

    
    destinoSelect.addEventListener('change', () => {
        const destino = destinoSelect.value;
        const cidadeDestino = db.cidade.find(c => c.nome.toLowerCase() === destino);

        
        classeSelect.innerHTML = '<option value="">Selecione a classe</option>';

        
        if (cidadeDestino && cidadeDestino.classe) {
            cidadeDestino.classe.forEach(classe => {
                const optionClasse = document.createElement('option');
                optionClasse.value = classe;
                optionClasse.textContent = classe.charAt(0).toUpperCase() + classe.slice(1);
                classeSelect.appendChild(optionClasse);
            });
        }
    });

    document.getElementById('butao').addEventListener('click', () => {
        const origem = origemSelect.value;
        const destino = destinoSelect.value;
        const quantidade = document.getElementById('barra3').value;
        const classe = classeSelect.value;
        const idaEVolta = document.getElementById('check').checked;

        if (!origem || !destino || !quantidade || !classe) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        function validarNoBancoDeDados(origem, destino, quantidade, classe, idaEVolta) {
            const cidadeOrigem = db.cidade.find(c => c.nome.toLowerCase() === origem);
            const cidadeDestino = db.cidade.find(c => c.nome.toLowerCase() === destino);

            if (!cidadeOrigem) {
                alert('Cidade de origem não disponível.');
                return false;
            }

            if (!cidadeDestino) {
                alert('Cidade de destino não disponível.');
                return false;
            }

            if (cidadeDestino.quantidade === null || parseInt(quantidade) > cidadeDestino.quantidade) {
                alert('Quantidade de passagens não disponível.');
                return false;
            }

            if (!cidadeDestino.classe.includes(classe.toLowerCase())) {
                alert('Classe não disponível.');
                return false;
            }

            if (idaEVolta && (!cidadeDestino.passagem || !cidadeDestino.passagem.includes("ida") || !cidadeDestino.passagem.includes("volta"))) {
                alert('Passagem de ida e volta não disponível para o destino selecionado.');
                return false;
            }

            return true;
        }

        if (validarNoBancoDeDados(origem, destino, quantidade, classe, idaEVolta)) {
            alert('Sua busca foi realizada com sucesso!, redirencionando!');
        }
    });

    document.querySelector('#linke a').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'https://pt.wikipedia.org/wiki/Lista_de_municípios_do_Brasil';
    });
});
