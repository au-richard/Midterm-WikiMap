
$(document).ready(function (){
  let item = $('meta[name=mbox_key]').attr('content');
  let user_id = $('mapUser_id').textContent;
  console.log(user_id);
  let map = L.map('map').setView([49.2827,-123.1207], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: item
}).addTo(map);
});
