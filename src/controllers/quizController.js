const quizModel = require('../models/quizModel');

exports.registrarPontuacao = (req, res) => {
    const { fkUsuario, acertos, totalQuestoes } = req.body;

    if (!fkUsuario || acertos == null || totalQuestoes == null) {
        return res.status(400).json({ erro: 'Dados incompletos' });
    }

    quizModel.registrarPontuacao(fkUsuario, acertos, totalQuestoes)
        .then(() => {
            res.status(200).json({ mensagem: 'Pontuação registrada com sucesso!' });
        })
        .catch((erro) => {
            console.error("Erro ao registrar pontuação:", erro.sqlMessage || erro);
            res.status(500).json({ erro: 'Erro ao registrar pontuação' });
        });
};
