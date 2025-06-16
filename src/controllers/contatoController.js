const contatoModel = require('../models/contatoModel');

function salvar(req, res) {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    contatoModel.salvarMensagem(nome, email, mensagem)
        .then(() => {
            res.status(200).json({ mensagem: "Mensagem salva com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao salvar mensagem:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao salvar mensagem" });
        });
}

function listar(req, res) {
    contatoModel.listarMensagens()
        .then(resultados => {
            res.status(200).json(resultados);
        })
        .catch(erro => {
            console.error("Erro ao listar mensagens:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao listar mensagens" });
        });
}

function deletar(req, res) {
    const idMensagem = req.params.id;
    const emailUsuario = req.headers.email;

    if (emailUsuario !== "admin@suporte.com") {
        return res.status(403).json({ erro: "Apenas o administrador pode apagar mensagens." });
    }

    contatoModel.deletarMensagem(idMensagem)
        .then(() => {
            res.status(200).json({ mensagem: "Mensagem apagada com sucesso." });
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao apagar mensagem." });
        });
}

module.exports = {
    salvar,
    listar,
    deletar
};
