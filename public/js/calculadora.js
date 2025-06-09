document.addEventListener("DOMContentLoaded", function () {
    const nomeUsuario = sessionStorage.NOME_USUARIO;

    const userInfo = document.getElementById("user-info");
    const loginBtn = document.getElementById("login-btn");
    const b_usuario = document.getElementById("b_usuario");

    if (nomeUsuario) {
        b_usuario.innerText = `Olá, ${nomeUsuario.split(' ')[0]}`;
        userInfo.style.display = "flex";
        loginBtn.style.display = "none";
    }
});

function limparSessao() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}

function irParaPerfil(){
        var nome = sessionStorage.getItem("NOME_USUARIO");
        if (nome != null) {
            window.location.href = "../perfil.html";
        } else {
            window.location.href = "login.html";
        }
    }

function calcularMMR() {
    const vitorias = Number(document.getElementById('vitorias').value);
    const derrotas = Number(document.getElementById('derrotas').value);
    const empates = Number(document.getElementById('empates').value) || 0;
    const mmrInicial = Number(document.getElementById('mmrInicial').value);
    const dificuldadeOponente = Number(document.getElementById('dificuldadeOponente').value);

    let ganhoPorVitoria;
    let perdaPorDerrota;
    const ganhoPorEmpate = 10;

    if (dificuldadeOponente === 1) {
        ganhoPorVitoria = 15;
        perdaPorDerrota = 25;
    } else if (dificuldadeOponente === 2) {
        ganhoPorVitoria = 25;
        perdaPorDerrota = 20;
    } else if (dificuldadeOponente === 3) {
        ganhoPorVitoria = 35;
        perdaPorDerrota = 15;
    } else {
        ganhoPorVitoria = 25;
        perdaPorDerrota = 20;
    }

    const totalPartidas = vitorias + derrotas + empates;
    let aproveitamento = 0;
    if (totalPartidas > 0) {
        aproveitamento = vitorias / totalPartidas;
    }

    let mmrFinal = mmrInicial + (vitorias * ganhoPorVitoria) + (empates * ganhoPorEmpate) - (derrotas * perdaPorDerrota);

    if (aproveitamento >= 0.7) {
        mmrFinal += 50;
    }

    const resultado = document.getElementById('resultadoMMR');
    resultado.innerHTML = `Seu MMR estimado é <strong>${Math.round(mmrFinal)}</strong>`;

    fetch("/calculadora/salvar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_usuario: sessionStorage.ID_USUARIO,
            mmr_calculado: Math.round(mmrFinal),
            vitorias,
            derrotas,
            empates,
            dificuldade_oponente: dificuldadeOponente
        })
    })
        .then(res => res.json())
        .then(res => console.log("Resposta da API:", res))
        .catch(err => console.error("Erro ao salvar MMR:", err));
}

function irParaDashboard() {
    window.location.href = "dashboard.html";
}
