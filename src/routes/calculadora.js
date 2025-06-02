const express = require("express");
const router = express.Router();
const calculadoraController = require("../controllers/calculadoraController");

router.post("/salvar", calculadoraController.salvarMMR);

module.exports = router;
