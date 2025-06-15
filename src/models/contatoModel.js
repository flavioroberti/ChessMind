const db = require('../database/config');

function salvarMensagem(nome, email, mensagem){
    const instrucao = `
        INSERT INTO contato (nome, email, mensagem) 
        VALUES ('${nome}', '${email}', '${mensagem}');
    `;
    return db.executar(instrucao);
}

function listarMensagens() {
    const instrucao = `
        SELECT nome, email, mensagem 
        FROM contato 
        ORDER BY id DESC 
        LIMIT 10;
    `;
    return db.executar(instrucao);
}

module.exports = {
    salvarMensagem,
    listarMensagens
};