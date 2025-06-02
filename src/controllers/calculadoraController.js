const calculadoraModel = require("../models/calculadoraModel");

async function salvarMMR(req, res) {
    const { id_usuario, mmr_calculado, vitorias, derrotas, empates, dificuldade_oponente } = req.body;

    if (!id_usuario || mmr_calculado == null || vitorias == null || derrotas == null || dificuldade_oponente == null) {
        return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
    }

    try {
        await calculadoraModel.salvarMMR({ id_usuario, mmr_calculado, vitorias, derrotas, empates, dificuldade_oponente });
        res.status(200).json({ mensagem: "MMR salvo com sucesso!" });
    } catch (erro) {
        console.error("Erro ao salvar MMR:", erro.sqlMessage || erro);
        res.status(500).json({ erro: "Erro interno ao salvar MMR" });
    }
}

module.exports = { salvarMMR };
