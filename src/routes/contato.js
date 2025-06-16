const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');

router.post('/salvar', contatoController.salvar);
router.get('/listar', contatoController.listar);
router.delete('/deletar/:id', contatoController.deletar);

module.exports = router;