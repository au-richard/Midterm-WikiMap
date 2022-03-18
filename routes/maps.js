const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    res.redirect("mainpage");

  });

  router.get("/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;


    db.query(`SELECT latitude, longitude FROM maps WHERE id = $1 AND active_map = TRUE;`, [mapID])
      .then(data => {
        const coords = data.rows;
        console.log(coords);
        res.json({coords});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
