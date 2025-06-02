const database = require('../database/config');

function salvarMMR(dados) {
    const instrucao = `
        INSERT INTO historico_mmr 
        (id_usuario, mmr_calculado, vitorias, derrotas, empates, dificuldade_oponente)
        VALUES (
            ${dados.id_usuario},
            ${dados.mmr_calculado},
            ${dados.vitorias},
            ${dados.derrotas},
            ${dados.empates},
            ${dados.dificuldade_oponente}
        );
    `;
    return database.executar(instrucao);
}

module.exports = { salvarMMR };
