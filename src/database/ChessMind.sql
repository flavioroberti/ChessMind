CREATE DATABASE chessmind;

use chessmind;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(50) NOT NULL
);

CREATE TABLE pontuacao (
    idPontuacao INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    acertos INT NOT NULL,
    totalQuestoes INT NOT NULL,
    dataTentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE historico_mmr (
    id_mmr INT PRIMARY KEY auto_increment,
    id_usuario INT NOT NULL,
    mmr_calculado INT NOT NULL,
    vitorias INT NOT NULL,
    derrotas INT NOT NULL,
    empates INT DEFAULT 0,
    dificuldade_oponente INT NOT NULL,
    data_calculo DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

ALTER TABLE usuario ADD COLUMN data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP;


SELECT * FROM usuario;
select * from pontuacao;	
select * from historico_mmr;

/* SELECT mmr_calculado AS mmr 
        FROM historico_mmr 
        WHERE id_usuario = ${idUsuario} 
        ORDER BY id_mmr DESC 
        LIMIT 1;

/* SELECT MAX(mmr_calculado) AS maior 
        FROM historico_mmr 
        WHERE id_usuario = ${idUsuario};

/* SELECT AVG(acertos) AS media_acertos 
        FROM pontuacao
        WHERE fkUsuario = ${idUsuario};
        
/* SELECT MAX(acertos) AS maior_pontuacao 
        FROM pontuacao 
        WHERE fkUsuario = ${idUsuario};
        
/* SELECT u.nome, p.acertos 
        FROM usuario u 
        JOIN pontuacao p ON u.id = p.fkUsuario 
        ORDER BY p.acertos DESC 
        LIMIT 10;
        
/* SELECT idPontuacao, acertos, dataTentativa 
        FROM pontuacao 
        WHERE fkUsuario = ${idUsuario} 
        ORDER BY dataTentativa DESC;
