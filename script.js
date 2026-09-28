const perguntas = [

    {
        pergunta:
            "O que significa Inteligência Artificial?",

        opcoes: [
            "Uma tecnologia capaz de realizar tarefas que envolvem capacidades associadas à inteligência humana.",

            "Um computador que possui sentimentos humanos.",

            "Um programa que nunca comete erros.",

            "Uma máquina que funciona sem receber dados."
        ],

        correta: 0,

        explicacao:
            "A IA reúne técnicas que permitem aos sistemas realizar tarefas como reconhecer padrões, analisar dados ou gerar conteúdos."
    },


    {
        pergunta:
            "Qual é uma boa atitude ao utilizar uma resposta gerada por IA?",

        opcoes: [
            "Aceitar a resposta imediatamente.",

            "Compartilhar a resposta sem verificar.",

            "Verificar a informação em fontes confiáveis.",

            "Considerar que a IA sempre está correta."
        ],

        correta: 2,

        explicacao:
            "Modelos de IA podem produzir informações incorretas. Por isso, verificar fontes é importante."
    },


    {
        pergunta:
            "Como a IA pode auxiliar um estudante?",

        opcoes: [
            "Substituindo completamente o processo de aprendizagem.",

            "Ajudando a explicar conceitos e gerar ideias para estudo.",

            "Fazendo todas as atividades sem participação do estudante.",

            "Impedindo o estudante de pesquisar."
        ],

        correta: 1,

        explicacao:
            "A IA pode funcionar como ferramenta de apoio, mas a participação e o pensamento do estudante continuam importantes."
    },


    {
        pergunta:
            "Qual é um possível risco do uso excessivo de IA na escola?",

        opcoes: [
            "Desenvolver autonomia.",

            "Aprender novas formas de pesquisar.",

            "Criar novas ideias.",

            "Criar dependência e reduzir a prática do pensamento crítico."
        ],

        correta: 3,

        explicacao:
            "Quando usada sem reflexão, a tecnologia pode fazer com que o estudante deixe de desenvolver algumas habilidades por conta própria."
    },


    {
        pergunta:
            "Qual atitude representa um uso responsável da IA?",

        opcoes: [
            "Usar IA para copiar trabalhos sem compreender o conteúdo.",

            "Usar IA como ferramenta de apoio e analisar criticamente suas respostas.",

            "Não questionar nenhuma resposta gerada.",

            "Compartilhar dados pessoais com qualquer ferramenta."
        ],

        correta: 1,

        explicacao:
            "O uso responsável envolve pensamento crítico, verificação das informações e atenção à privacidade."
    }

];


let atual = 0;

let pontos = 0;

let respondeu = false;


// ELEMENTOS

const perguntaEl =
    document.getElementById("pergunta");

const opcoesEl =
    document.getElementById("opcoes");

const numeroEl =
    document.getElementById("numero");

const feedbackEl =
    document.getElementById("feedback");

const proximaEl =
    document.getElementById("proxima");

const barraEl =
    document.getElementById("barra");


// CARREGAR PERGUNTA

function carregarPergunta() {

    respondeu = false;

    const q = perguntas[atual];


    numeroEl.textContent =
        `PERGUNTA ${atual + 1} DE ${perguntas.length}`;


    perguntaEl.textContent =
        q.pergunta;


    opcoesEl.innerHTML = "";


    feedbackEl.textContent = "";


    proximaEl.style.display = "none";


    const progresso =
        (atual / perguntas.length) * 100;


    barraEl.style.width =
        progresso + "%";


    q.opcoes.forEach(
        (opcao, indice) => {

            const botao =
                document.createElement("button");

            botao.className =
                "opcao";

            botao.textContent =
                opcao;


            botao.onclick =
                () => responder(
                    indice,
                    botao
                );


            opcoesEl.appendChild(
                botao
            );

        }
    );
}


// RESPONDER

function responder(indice, botao) {

    if (respondeu)
        return;


    respondeu = true;


    const q = perguntas[atual];


    const botoes =
        document.querySelectorAll(".opcao");


    botoes.forEach(
        (b, i) => {

            b.disabled = true;


            if (i === q.correta) {

                b.classList.add(
                    "correta"
                );

            }

        }
    );


    if (indice === q.correta) {

        pontos++;


        feedbackEl.innerHTML =
            "✅ <strong>Resposta correta!</strong><br>" +
            q.explicacao;

    }

    else {

        botao.classList.add(
            "errada"
        );


        feedbackEl.innerHTML =
            "❌ <strong>Não foi dessa vez.</strong><br>" +
            q.explicacao;
    }


    proximaEl.style.display =
        "inline-block";
}


// PRÓXIMA PERGUNTA

function proximaPergunta() {

    atual++;


    if (atual < perguntas.length) {

        carregarPergunta();

    }

    else {

        mostrarResultado();

    }
}


// RESULTADO

function mostrarResultado() {

    document.getElementById(
        "quizConteudo"
    ).style.display = "none";


    document.getElementById(
        "resultado"
    ).style.display = "block";


    document.getElementById(
        "pontuacao"
    ).textContent =
        `${pontos}/${perguntas.length}`;


    let mensagem;


    if (pontos === 5) {

        mensagem =
            "🌟 Excelente! Você demonstrou uma ótima compreensão sobre o uso responsável da IA.";

    }

    else if (pontos >= 3) {

        mensagem =
            "🚀 Muito bem! Você já conhece vários aspectos importantes da IA na educação.";

    }

    else {

        mensagem =
            "💡 Continue explorando o tema! A reflexão sobre tecnologia também faz parte da aprendizagem.";

    }


    document.getElementById(
        "mensagem"
    ).textContent = mensagem;


    barraEl.style.width =
        "100%";
}


// REINICIAR

function reiniciar() {

    atual = 0;

    pontos = 0;


    document.getElementById(
        "quizConteudo"
    ).style.display = "block";


    document.getElementById(
        "resultado"
    ).style.display = "none";


    carregarPergunta();


    document.getElementById(
        "quiz"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// INICIAR

carregarPergunta();
