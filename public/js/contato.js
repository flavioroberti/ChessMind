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

    const form = document.querySelector(".form-contato");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = form.nome.value;
        const email = form.email.value;
        const mensagem = form.mensagem.value;

        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        fetch("/contato/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, mensagem })
        })
        .then(res => {
            if (res.ok) {
                alert("Mensagem enviada! Em breve entraremos em contato.");
                form.reset();
                carregarComentarios();
            } else {
                alert("Erro ao enviar mensagem.");
            }
        })
        .catch(err => {
            console.error("Erro ao enviar mensagem:", err);
            alert("Erro na comunicação com o servidor.");
        });
    });
});

function limparSessao() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}

function irParaPerfil() {
    var nome = sessionStorage.getItem("NOME_USUARIO");
    if (nome != null) {
        window.location.href = "../perfil.html";
    } else {
        window.location.href = "login.html";
    }
}

function carregarComentarios() {
    fetch("/contato/listar")
        .then(res => {
            if (!res.ok) throw new Error("Erro ao buscar comentários.");
            return res.json();
        })
        .then(comentarios => {
            const container = document.getElementById("comentarios-container");
            container.innerHTML = ""; 

            if (comentarios.length === 0) {
                container.innerHTML = "<p class='sem-comentario'>Nenhum comentário enviado ainda.</p>";
                return;
            }

            comentarios.forEach(c => {
                const card = document.createElement("div");
                card.className = "comentario-card";
                card.innerHTML = `
                    <h4>${c.nome}</h4>
                    <p class="email">${c.email}</p>
                    <p class="mensagem">"${c.mensagem}"</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar comentários:", err);
        });
}

document.addEventListener("DOMContentLoaded", carregarComentarios);
