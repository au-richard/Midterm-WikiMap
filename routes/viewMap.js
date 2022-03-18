const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
        res.redirect("/mappage");
  });
  router.get("/:id", (req, res) => {
    const userID = req.session["user_id"];
    const mapID = req.params.id;

    db.query(`SELECT * FROM maps WHERE maps.id = $1;`,[mapID])
      .then(data => {
        const maps = data.rows;
        console.log(maps);
        res.render("viewMap",{maps, user: userID});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
