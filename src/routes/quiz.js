const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/salvar', quizController.registrarPontuacao);

module.exports = router;
