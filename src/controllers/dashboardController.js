const dashboardModel = require("../models/dashboardModel");

function buscarMMRAtual(req, res) {
    const idUsuario = req.params.idUsuario;

    dashboardModel.buscarMMRAtual(idUsuario)
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar MMR atual" });
        });
}

function buscarMaiorMMR(req, res) {
    const idUsuario = req.params.idUsuario;

    dashboardModel.buscarMaiorMMR(idUsuario)
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar maior MMR" });
        });
}

function buscarMediaAcertos(req, res) {
    const idUsuario = req.params.idUsuario;

    dashboardModel.buscarMediaAcertos(idUsuario)
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar média de acertos" });
        });
}

function buscarMaiorPontuacao(req, res) {
    const idUsuario = req.params.idUsuario;

    dashboardModel.buscarMaiorPontuacao(idUsuario)
        .then(resultado => res.json(resultado[0]))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar maior pontuação" });
        });
}

function buscarRanking(req, res) {
    dashboardModel.buscarRanking()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar ranking" });
        });
}

function buscarEvolucaoDesempenho(req, res) {
    const idUsuario = req.params.idUsuario;

    dashboardModel.buscarEvolucaoDesempenho(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar evolução de desempenho" });
        });
}

module.exports = {
    buscarMMRAtual,
    buscarMaiorMMR,
    buscarMediaAcertos,
    buscarMaiorPontuacao,
    buscarRanking,
    buscarEvolucaoDesempenho
};
