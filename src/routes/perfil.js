const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

router.get('/dados/:idUsuario', perfilController.buscarDadosPerfil);
router.get('/mmrAtual/:idUsuario', perfilController.buscarMMRAtual);
router.get('/ranking/:idUsuario', perfilController.buscarRanking);
router.put('/editar/:idUsuario', perfilController.editarPerfil);
router.put('/alterarSenha/:idUsuario', perfilController.alterarSenha);
router.delete('/excluir/:idUsuario', perfilController.excluirPerfil);
router.delete('/excluirHistoricoMMR/:idUsuario', perfilController.excluirHistoricoMMR);
router.delete('/excluirPontuacaoQuiz/:idUsuario', perfilController.excluirPontuacaoQuiz);

module.exports = router;
