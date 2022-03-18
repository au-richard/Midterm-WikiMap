const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    db.query(`SELECT maps.title, maps.id, users.name FROM maps JOIN users ON users.id = maps.user_id WHERE active_map IS TRUE;`)
      .then(data => {
        const maps = data.rows;
        console.log(maps);
        res.render("mainpage",{maps});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
