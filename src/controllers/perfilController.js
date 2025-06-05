const perfilModel = require("../models/perfilModel");

function buscarDadosPerfil(req, res) {
    const idUsuario = req.params.idUsuario;

    perfilModel.buscarDadosUsuario(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
            }
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarMMRAtual(req, res) {
    const idUsuario = req.params.idUsuario;

    perfilModel.buscarMMRAtual(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.json({ mmr: 0 });
            }
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRanking(req, res) {
    const idUsuario = req.params.idUsuario;

    perfilModel.buscarRankingUsuario(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.json({ posicao: "Sem ranking" });
            }
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function editarPerfil(req, res) {
    const idUsuario = req.params.idUsuario;
    const { novoNome, novoEmail } = req.body;

    perfilModel.editarPerfil(idUsuario, novoNome, novoEmail)
        .then(() => {
            res.json({ success: true, mensagem: "Perfil atualizado com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ success: false, mensagem: erro.sqlMessage });
        });
}


function alterarSenha(req, res) {
    const idUsuario = req.params.idUsuario;
    const { novaSenha } = req.body;

    perfilModel.alterarSenha(idUsuario, novaSenha)
        .then(() => {
            res.json({ success: true, mensagem: "Senha alterada com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ success: false, mensagem: erro.sqlMessage });
        });
}


function excluirPerfil(req, res) {
    const idUsuario = req.params.idUsuario;

    perfilModel.excluirPerfil(idUsuario)
        .then(() => {
            res.json({ success: true, mensagem: "Perfil excluído com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ success: false, mensagem: erro.sqlMessage });
        });
}

function excluirHistoricoMMR(req, res) {
    const idUsuario = req.params.idUsuario;

    perfilModel.excluirHistoricoMMR(idUsuario)
        .then(() => {
            res.json({ success: true, mensagem: "Histórico MMR excluído com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ success: false, mensagem: erro.sqlMessage });
        });
}

function excluirPontuacaoQuiz(req, res) {
    const idUsuario = req.params.idUsuario;

    perfilModel.excluirPontuacaoQuiz(idUsuario)
        .then(() => {
            res.json({ success: true, mensagem: "Pontuação do quiz excluída com sucesso!" });
        })
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ success: false, mensagem: erro.sqlMessage });
        });
}

module.exports = {
    buscarDadosPerfil,
    buscarMMRAtual,
    buscarRanking,
    editarPerfil,
    alterarSenha,
    excluirPerfil,
    excluirHistoricoMMR,
    excluirPontuacaoQuiz
};
