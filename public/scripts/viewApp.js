
$(document).ready(function (){
  let item = $('meta[name=mbox_key]').attr('content');
  let map_id = $('meta[name=map_id]').attr('content');
  let mlat = 49.2827;
  let mlongi = -123.1207;
  /*
  $.get(`/api/maps/${map_id}`, function(res) {
    mlat = res.coords.latitude;
    mlongi = res.coords.longitude;

  })
*/
  let map = L.map('map').setView([mlat,mlongi], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: item
}).addTo(map);

$.get(`/markers/${map_id}`, function(res) {
  res.markers.forEach(element => {
    placeMarker(element);
  });
})

const placeMarker = function(markEl) {
  const title = markEl.title;
  const image_url = markEl.image_url;
  const latitude = markEl.latitude;
  const longitude = markEl.longitude;

  const singleMarker = L.marker([latitude,longitude])
  const popup = singleMarker.bindPopup(`
  <h1>${title}</h1>
  <img src=${image_url} alt="location image" width="150" height="100">
  `)
  popup.addTo(map);
};


});
