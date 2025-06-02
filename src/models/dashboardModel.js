const database = require('../database/config');

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

function buscarMaiorMMR(idUsuario) {
    const instrucao = `
        SELECT MAX(mmr_calculado) AS maior 
        FROM historico_mmr 
        WHERE id_usuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function buscarMediaAcertos(idUsuario) {
    const instrucao = `
        SELECT AVG(acertos) AS media_acertos 
        FROM pontuacao
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function buscarMaiorPontuacao(idUsuario) {
    const instrucao = `
        SELECT MAX(acertos) AS maior_pontuacao 
        FROM pontuacao 
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function buscarRanking() {
    const instrucao = `
        SELECT u.nome, p.acertos 
        FROM usuario u 
        JOIN pontuacao p ON u.id = p.fkUsuario 
        ORDER BY p.acertos DESC 
        LIMIT 10;
    `;
    return database.executar(instrucao);
}

function buscarEvolucaoDesempenho(idUsuario) {
    const instrucao = `
        SELECT idPontuacao, acertos, dataTentativa 
        FROM pontuacao 
        WHERE fkUsuario = ${idUsuario} 
        ORDER BY dataTentativa DESC;
    `;
    return database.executar(instrucao);
}


module.exports = {
    buscarMMRAtual,
    buscarMaiorMMR,
    buscarMediaAcertos,
    buscarMaiorPontuacao,
    buscarRanking,
    buscarEvolucaoDesempenho
};
