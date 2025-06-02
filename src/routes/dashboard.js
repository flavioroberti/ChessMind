const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/mmrAtual/:idUsuario", dashboardController.buscarMMRAtual);
router.get("/maiorMMR/:idUsuario", dashboardController.buscarMaiorMMR);
router.get("/mediaAcertos/:idUsuario", dashboardController.buscarMediaAcertos);
router.get("/maiorPontuacao/:idUsuario", dashboardController.buscarMaiorPontuacao);
router.get("/ranking", dashboardController.buscarRanking);
router.get("/evolucaoDesempenho/:idUsuario", dashboardController.buscarEvolucaoDesempenho);

module.exports = router;
