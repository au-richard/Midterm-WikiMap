const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    res.redirect("mainPage");

  });

  router.get("/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;


    db.query(`SELECT title, image_url, latitude, longitude FROM markers WHERE map_id = $1;`, [mapID])
      .then(data => {
        const markers = data.rows;
        console.log(markers);
        res.json({markers});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
