const database = require('../database/config');

function registrarPontuacao(fkUsuario, acertos, totalQuestoes) {
    const instrucao = `
        INSERT INTO pontuacao (fkUsuario, acertos, totalQuestoes)
        VALUES (${fkUsuario}, ${acertos}, ${totalQuestoes});
    `;
    return database.executar(instrucao);
}

module.exports = {
    registrarPontuacao
};
