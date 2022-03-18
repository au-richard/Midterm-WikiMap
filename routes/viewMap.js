const express = require('express');
const router  = express.Router();
const {getMapMarkers} = require("./queryHelpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
        res.redirect("/mainpage");
  });
  router.get("/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;

    db.query(`SELECT * FROM maps WHERE maps.id = $1 AND active_map = TRUE;`,[mapID])
      .then(data => {
        const maps = data.rows;
        console.log(maps);
        getMapMarkers(db, maps.id)
          .then(result =>{ console.log(result)
            res.render("viewMap",{maps, user: userID}); });

        //res.render("viewMap",{maps, user: userID});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/delete/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;
    console.log("mapID", mapID);
    console.log("userID", userID);

    db.query(`UPDATE maps FROM maps SET active_map = FALSE WHERE id = $1;`,[mapID])
      .then(data => {
        const maps = data.rows;
        console.log(maps);
        res.redirect("mainpage");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
