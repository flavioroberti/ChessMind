const database = require('../database/config');

function buscarDadosUsuario(idUsuario) {
    const instrucao = `
        SELECT nome, email, DATE_FORMAT(data_criacao, '%d/%m/%Y %H:%i') AS data_registro
        FROM usuario
        WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function buscarMMRAtual(idUsuario) {
    const instrucao = `
        SELECT mmr_calculado AS mmr 
        FROM historico_mmr 
        WHERE id_usuario = ${idUsuario} 
        ORDER BY id_mmr DESC 
        LIMIT 1;
    `;
    return database.executar(instrucao);
}

function buscarRankingUsuario(idUsuario) {
    const instrucao = `
        SELECT posicao FROM (
            SELECT u.id,
                   RANK() OVER (ORDER BY MAX(p.acertos) DESC) AS posicao
            FROM usuario u
            LEFT JOIN pontuacao p ON u.id = p.fkUsuario
            GROUP BY u.id
        ) AS ranking
        WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function editarPerfil(idUsuario, novoNome, novoEmail) {
    const instrucao = `
        UPDATE usuario
        SET nome = '${novoNome}', email = '${novoEmail}'
        WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function alterarSenha(idUsuario, novaSenha) {
    const instrucao = `
        UPDATE usuario
        SET senha = '${novaSenha}'
        WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function excluirPerfil(idUsuario) {
    const instrucao = `
        DELETE FROM usuario
        WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function excluirHistoricoMMR(idUsuario) {
    const instrucao = `
        DELETE FROM historico_mmr
        WHERE id_usuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function excluirPontuacaoQuiz(idUsuario) {
    const instrucao = `
        DELETE FROM pontuacao
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosUsuario,
    buscarMMRAtual,
    buscarRankingUsuario,
    editarPerfil,
    alterarSenha,
    excluirPerfil,
    excluirHistoricoMMR,
    excluirPontuacaoQuiz

};
