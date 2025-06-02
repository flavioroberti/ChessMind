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


SELECT * FROM usuario;
select * from pontuacao;	
select * from historico_mmr;