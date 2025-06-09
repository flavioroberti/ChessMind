document.addEventListener("DOMContentLoaded", () => {
    const idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        window.location.href = "../login.html";
        return;
    }

    const nomeUsuario = sessionStorage.NOME_USUARIO;
    if (nomeUsuario) {
        document.getElementById("b_usuario").innerText = `Olá, ${nomeUsuario.split(' ')[0]}`;
        document.getElementById("user-info").style.display = "flex";
        document.getElementById("login-btn").style.display = "none";
    }

    document.getElementById("data-registro").textContent = sessionStorage.DATA_CRIACAO || "Desconhecida";

    fetch(`/perfil/mmrAtual/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("user_mmr_atual").textContent = data.mmr || "0";
        })
        .catch(() => {
            document.getElementById("user_mmr_atual").textContent = "0";
        });

    fetch(`/perfil/ranking/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("ranking-usuario").textContent = data.posicao || "Sem ranking";
        })
        .catch(() => {
            document.getElementById("ranking-usuario").textContent = "Indefinido";
        });

    fetch(`/perfil/dados/${idUsuario}`)
        .then(res => res.json())
        .then(dados => {
            document.getElementById("nome-usuario").textContent = dados.nome || "Nome não encontrado";
            document.getElementById("email-usuario").textContent = dados.email || "Email não encontrado";
            document.getElementById("data-registro").textContent = dados.data_registro || "Desconhecida";

            document.getElementById("nome_usuario").textContent = dados.nome || "Nome não encontrado";
            document.getElementById("email_usuario").textContent = dados.email || "Email não encontrado";

            sessionStorage.NOME_USUARIO = dados.nome || "";
            sessionStorage.EMAIL_USUARIO = dados.email || "";
        })
        .catch(() => {
            document.getElementById("nome-usuario").textContent = "Erro ao carregar dados";
            document.getElementById("email-usuario").textContent = "Erro ao carregar dados";
            document.getElementById("data-registro").textContent = "Erro";
        });
});

function limparSessao() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}

function abrirFormularioEdicao() {
    const formularioEdicao = document.getElementById("formulario-edicao");
    formularioEdicao.classList.remove("oculto");

    const novoNomeInput = document.getElementById("novo_nome");
    const novoEmailInput = document.getElementById("novo_email");

    novoNomeInput.value = sessionStorage.NOME_USUARIO || "";
    novoEmailInput.value = sessionStorage.EMAIL_USUARIO || "";
}

function salvarEdicaoPerfil() {
    const novoNome = document.getElementById("novo_nome").value.trim();
    const novoEmail = document.getElementById("novo_email").value.trim();

    if (!novoNome || !novoEmail) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch(`/perfil/editar/${sessionStorage.ID_USUARIO}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novoNome: novoNome, novoEmail: novoEmail }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                sessionStorage.NOME_USUARIO = novoNome;
                sessionStorage.EMAIL_USUARIO = novoEmail;
                alert("Dados atualizados com sucesso!");
                document.getElementById("formulario-edicao").classList.add("oculto");

                document.getElementById("nome-usuario").textContent = novoNome;
                document.getElementById("email-usuario").textContent = novoEmail;

                document.getElementById("nome_usuario").textContent = novoNome;
                document.getElementById("email_usuario").textContent = novoEmail;

                document.getElementById("b_usuario").innerText = `Olá, ${novoNome.split(' ')[0]}`;
            } else {
                alert("Erro ao atualizar os dados.");
            }
        })
        .catch(() => {
            alert("Erro ao conectar com o servidor.");
        });
}

function abrirFormularioSenha() {
    const formularioSenha = document.getElementById("formulario-senha");
    formularioSenha.classList.remove("oculto");
}

function salvarNovaSenha() {
    const senhaAtual = document.getElementById("senha_atual").value.trim();
    const novaSenha = document.getElementById("nova_senha").value.trim();

    if (!senhaAtual || !novaSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch(`/perfil/alterarSenha/${sessionStorage.ID_USUARIO}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senhaAtual, novaSenha }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Senha alterada com sucesso!");
                document.getElementById("formulario-senha").classList.add("oculto");

                document.getElementById("senha_atual").value = "";
                document.getElementById("nova_senha").value = "";
            } else {
                alert("Erro ao alterar a senha. Verifique se a senha atual está correta.");
            }
        })
        .catch(() => {
            alert("Erro ao conectar com o servidor.");
        });
}

function excluirConta() {
    const idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        alert("ID de usuário não encontrado.");
        return;
    }

    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) {
        return;
    }

    fetch(`/perfil/excluirPontuacaoQuiz/${idUsuario}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao excluir pontuação do quiz");
            return fetch(`/perfil/excluirHistoricoMMR/${idUsuario}`, { method: "DELETE" });
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao excluir histórico de MMR");
            return fetch(`/perfil/excluir/${idUsuario}`, { method: "DELETE" });
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao excluir o perfil");
            alert("Conta excluída com sucesso!");
            sessionStorage.clear();
            window.location.href = "index.html";
        })
        .catch(erro => {
            console.error("Erro na exclusão de conta:", erro);
            alert("Erro ao excluir conta. Tente novamente mais tarde.");
        });
}

function cancelarEdicaoPerfil() {
    const formularioEdicao = document.getElementById("formulario-edicao");
    formularioEdicao.classList.add("oculto");
    document.getElementById("novo_nome").value = "";
    document.getElementById("novo_email").value = "";
}

function cancelarEdicaoSenha() {
    const formularioSenha = document.getElementById("formulario-senha");
    formularioSenha.classList.add("oculto");
    document.getElementById("senha_atual").value = "";
    document.getElementById("nova_senha").value = "";
}
