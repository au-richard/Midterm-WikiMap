const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session["user_id"];
    db.query(`SELECT * FROM contributions JOIN users ON users.id = contributions.user_id JOIN maps ON maps.id = contributions.map_id WHERE contributions.user_id = $1;`, [userID])
      .then(data => {
        const contributions = data.rows;
        console.log("contributions", contributions);
        res.render("contributions", { contributions });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
