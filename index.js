const express = require("express");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/html"));

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

function getAddress(latitude, longitude) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();

    var method = "GET";
    var url =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude +
      "," +
      longitude +
      "&key=AIzaSyCaP09RKPbg-HCM3aESwkAKElWD6pDpL48";
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var data = JSON.parse(request.responseText);
          var address = data.results[0];
          console.log(address.formatted_address);
          resolve(address);
        } else {
          reject(request.status);
        }
      }
    };
    request.send();
  });
}
app.listen(8080, () => {
  console.log("Connected");
  //   getAddress(37.766656, -122.436459);
});
