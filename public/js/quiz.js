const perguntas = [
  {
    pergunta: "1. Qual é o objetivo do jogo de xadrez?",
    opcoes: ["Capturar todas as peças do oponente", "Dar xeque-mate no rei adversário", "Fazer o maior número de movimentos possíveis"],
    correta: "Dar xeque-mate no rei adversário"
  },
  {
    pergunta: "2. Quantas casas existem no tabuleiro de xadrez?",
    opcoes: ["64", "100", "32"],
    correta: "64"
  },
  {
    pergunta: "3. Qual peça só se move na diagonal?",
    opcoes: ["Torre", "Bispo", "Cavalo"],
    correta: "Bispo"
  },
  {
    pergunta: "4. Qual peça pode pular outras peças?",
    opcoes: ["Peão", "Rainha", "Cavalo"],
    correta: "Cavalo"
  },
  {
    pergunta: "5. Quantos peões cada jogador possui no início?",
    opcoes: ["6", "8", "10"],
    correta: "8"
  },
  {
    pergunta: "6. Qual peça combina o movimento da torre e do bispo?",
    opcoes: ["Rainha", "Rei", "Cavalo"],
    correta: "Rainha"
  },
  {
    pergunta: "7. Qual é a única peça que não pode dar xeque-mate sozinha?",
    opcoes: ["Torre", "Cavalo", "Rei"],
    correta: "Rei"
  },
  {
    pergunta: "8. O que é roque?",
    opcoes: ["Trocar o rei com a rainha", "Mover o rei duas casas e a torre ao lado dele", "Trocar de lado no meio do jogo"],
    correta: "Mover o rei duas casas e a torre ao lado dele"
  },
  {
    pergunta: "9. Em que situação ocorre um empate?",
    opcoes: ["Rei é capturado", "Os dois jogadores têm a mesma pontuação", "Não há mais movimentos legais"],
    correta: "Não há mais movimentos legais"
  },
  {
    pergunta: "10. Qual é o valor da dama no sistema de pontos tradicional?",
    opcoes: ["10", "9", "8"],
    correta: "9"
  },
  {
    pergunta: "11. O que significa promoção de peão?",
    opcoes: ["Mover o peão para trás", "Transformar o peão em outra peça ao alcançar a última fileira", "Trocar o peão com o rei"],
    correta: "Transformar o peão em outra peça ao alcançar a última fileira"
  },
  {
    pergunta: "12. Qual peça representa a estratégia e o controle do centro?",
    opcoes: ["Peões", "Torre", "Bispo"],
    correta: "Peões"
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let erros = [];


const quizForm = document.getElementById("quiz-form");
const resultadoDiv = document.getElementById("resultado");
const progresso = document.getElementById("progresso");

function carregarPerguntas() {
  for (let index = 0; index < perguntas.length; index++) {
    const q = perguntas[index];
    const div = document.createElement("div");
    div.classList.add("question");
    if (index === 0) div.classList.add("active");

    const p = document.createElement("p");
    p.textContent = q.pergunta;
    div.appendChild(p);

    for (let i = 0; i < q.opcoes.length; i++) {
      const opcao = q.opcoes[i];
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="pergunta${index}" value="${opcao}"> ${opcao}`;
      div.appendChild(label);
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = (index === perguntas.length - 1) ? "Finalizar" : "Próxima";
    btn.onclick = (index === perguntas.length - 1) ? finalizarQuiz : proximaPergunta;
    div.appendChild(btn);

    quizForm.appendChild(div);
  }
}


function proximaPergunta() {
  const perguntaDivs = document.querySelectorAll(".question");
  const atual = perguntaDivs[perguntaAtual];
  const radios = atual.querySelectorAll("input[type='radio']");
  const selecionado = Array.from(radios).find(r => r.checked);

  if (!selecionado) {
    alert("Por favor, selecione uma resposta.");
    return;
  }

  const respostaUsuario = selecionado.value;
  const respostaCorreta = perguntas[perguntaAtual].correta;

  if (respostaUsuario === respostaCorreta) {
    pontuacao++;
  } else {
    erros.push({
      index: perguntaAtual,
      pergunta: perguntas[perguntaAtual].pergunta,
      correta: respostaCorreta,
      respostaUsuario: respostaUsuario
    });
  }

  atual.classList.remove("active");
  perguntaAtual++;
  perguntaDivs[perguntaAtual].classList.add("active");
  atualizarProgresso();
}


function finalizarQuiz() {
  const perguntaDivs = document.querySelectorAll(".question");
  const atual = perguntaDivs[perguntaAtual];
  const radios = atual.querySelectorAll("input[type='radio']");
  const selecionado = Array.from(radios).find(r => r.checked);

  if (!selecionado) {
    alert("Por favor, selecione uma resposta.");
    return;
  }

  const respostaUsuario = selecionado.value;
  const respostaCorreta = perguntas[perguntaAtual].correta;

  if (respostaUsuario === respostaCorreta) {
    pontuacao++;
  } else {
    erros.push({
      index: perguntaAtual,
      pergunta: perguntas[perguntaAtual].pergunta,
      correta: respostaCorreta,
      respostaUsuario: respostaUsuario
    });
  }

  quizForm.style.display = "none";
  progresso.style.display = "none";

  let mensagem = "";
  let cor = "";

  if (pontuacao >= 10) {
    mensagem = "Excelente! Você conhece muito bem o xadrez!";
    cor = "green";
  } else if (pontuacao >= 6) {
    mensagem = "Bom trabalho! Ainda dá pra melhorar!";
    cor = "orange";
  } else {
    mensagem = "Você precisa estudar um pouco mais.";
    cor = "red";
  }

  let resultadoHTML = `<h2 style="color: ${cor}">${mensagem} <br>Você acertou ${pontuacao} de ${perguntas.length} perguntas.</h2>`;

  if (erros.length > 0) {
    resultadoHTML += `<h3>Você errou as seguintes perguntas:</h3><ul>`;
    erros.forEach(erro => {
      resultadoHTML += `<li>
        <strong>${erro.pergunta}</strong><br>
        Sua resposta: <span style="color:red">${erro.respostaUsuario}</span><br>
        Resposta correta: <span style="color:green">${erro.correta}</span>
      </li><br>`;
    });
    resultadoHTML += `</ul>`;
  }

  resultadoHTML += `<button id="btn-reiniciar">Reiniciar Quiz</button>`;

  resultadoDiv.innerHTML = resultadoHTML;

  document.getElementById("btn-reiniciar").addEventListener("click", reiniciarQuiz);

  fetch("/quiz/salvar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fkUsuario: sessionStorage.ID_USUARIO,
      acertos: pontuacao,
      totalQuestoes: perguntas.length
    })

  })
    .then(res => {
      if (res.ok) {
        console.log("Pontuação registrada com sucesso!");
      } else {
        console.error("Erro ao registrar pontuação.");
      }
    })
    .catch(err => {
      console.error("Erro na requisição:", err);
    });
}

function atualizarProgresso() {
  progresso.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
}

carregarPerguntas();
atualizarProgresso();

function reiniciarQuiz() {
  pontuacao = 0;
  perguntaAtual = 0;
  erros = [];

  resultadoDiv.innerHTML = "";
  quizForm.innerHTML = "";
  quizForm.style.display = "block";
  progresso.style.display = "block";

  carregarPerguntas();
  atualizarProgresso();
}