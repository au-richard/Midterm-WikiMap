const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // const createMap = data.rows;
    // console.log("create map", createMap);
    res.render("createMap", {});
  });

  router.post("/", (req, res) => {
    console.log("req body", req.body);
    const userID = req.session["user_id"];

    console.log("User ID", userID);
    // const title = req.
    // console.log("Req Query and Body", req.query, req.body);

    db.query(`INSERT INTO maps (title, user_id, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *;`, [req.body.title, userID, req.body.latitude, req.body.longitude])
      .then(data => {
        console.log("return data rows", data.rows[0].id);
        db.query(`INSERT INTO contributions (user_id, map_id) VALUES ($1, $2);`, [userID, data.rows[0].id]);
        res.redirect("/createMap");

      })
      .catch(err => {
        console.log("res error", err.message);
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

