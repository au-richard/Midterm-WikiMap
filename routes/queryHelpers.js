
const getMapMarkers = function(db, mapID) {
  return db.query(`SELECT title, image_url, latitude, longitude FROM markers WHERE map_id = $1;`, [mapID])
          .then(data => data.rows)
          .catch(err => err.message);
};


module.exports = {getMapMarkers};
