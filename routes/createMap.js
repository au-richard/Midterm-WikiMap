const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // const createMap = data.rows;
    // console.log("create map", createMap);
    res.render("createMap", {});
  });

  router.post("/", (req, res) => {
    // req.query only temporary test (typing api id in address bar) http://localhost:8080/api/favourites?userID=3
    const userID = req.query.userID;
    console.log("User ID", userID);
    // const title = req.
    // console.log("Req Query and Body", req.query, req.body);
    db.query(`INSERT INTO maps (title, user_id, latitude, longitude) VALUES ($1, $2, $3, $4)`, [userID])
      .then(data => {
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

