const Game = require("../models/games");

exports.getGames = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const filter = req.query.text;
  const gameQuery = Game.find();

  let fetchedGames;
  if (filter) {

    gameQuery.find({
      $text: {
        $search: filter
      }
    });
    console.log(filter);
  }
  if (pageSize && currentPage) {
    gameQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  gameQuery
    .then(games => {
      fetchedGames = games;
      console.log(games);

      return Game.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Games fetched successfully!",
        games: fetchedGames,
        maxGames: count
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Fetching games failed!"
      });
    });
};

exports.getGame = (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => {
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json({
          message: "Game not found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching game failed!"
      });
    });
};
