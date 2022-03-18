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

  router.get("/edit/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;
    console.log(mapID);
     res.render("editMaps", {maps: mapID, user:userID})


  });

  router.post("/add/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;
    const {title, description, image_url, latitude, longitude} = req.body;


    db.query(`INSERT INTO markers (title, description, image_url, user_id, map_id, latitude, longitude) value($1, $2, $3, $4, $5, $6, $7);`, [title,description,image_url, userID ,mapID, latitude, longitude])
      .then(data => {
        const markers = data.rows;
        console.log(markers);
        res.render("viewMap",{maps: mapID, user: userID});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
