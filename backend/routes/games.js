const express = require("express");

const GameController = require("../controllers/games");

const router = express.Router();

router.get("", GameController.getGames);

router.get("/:id", GameController.getGame);

module.exports = router;
