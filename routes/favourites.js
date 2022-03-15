const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // req.query only temporary test (typing api id in address bar) http://localhost:8080/api/favourites?userID=3
    const userID = req.query.userID;
    // console.log("Req Query and Body", req.query, req.body);
    db.query(`SELECT * FROM favourites JOIN users ON users.id = favourites.user_id JOIN maps ON maps.id = favourites.map_id WHERE favourites.user_id = $1 AND favourites.active = TRUE;`, [userID])
      .then(data => {
        const favourites = data.rows;
        console.log("fave", favourites);
        res.render("favourites", { favourites });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/:id/delete", (req, res) => {
    const mapID = req.params.id;
    console.log("map ID", mapID);
    console.log("req body", req.body);
    db.query(`UPDATE favourites SET active = FALSE WHERE id = $1`, [mapID])
      .then(data => {
        const favourites = data.rows;
        console.log("fave", favourites);
        res.redirect("/favourites");
      });

  });
  return router;
};
