const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // req.query only temporary test (typing api id in address bar) http://localhost:8080/api/favourites?userID=3
    const userID = req.query.userID;
    // console.log("Req Query and Body", req.query, req.body);
    // maps.title AS title maps.latitude AS latitude maps.longitude AS longtiude
    db.query(`SELECT * FROM contributions JOIN users ON users.id = contributions.user_id JOIN maps ON maps.id = contributions.map_id WHERE contributions.user_id = $1;`, [userID])
      .then(data => {
        const contributions = data.rows;
        const markers = data.rows;
        console.log("contributions", contributions);
        res.render("contributions", { contributions, markers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
