// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  if (!date) {
    const currentDate = new Date().toUTCString();
    const currentTimestamp = Date.now();
    res.json({ unix: currentTimestamp, utc: currentDate });
  }
  if (!date.includes("-")) {
    const newDate = new Date(Number(date));
    if (isNaN(newDate)) res.json({ error: "Invalid Date" });
    res.json({ unix: Number(date), utc: newDate.toUTCString() });
  } else {
    const newDate = new Date(date);
    const unixTime = Math.floor(newDate.getTime());
    if (isNaN(newDate)) res.json({ error: "Invalid Date" });
    res.json({ unix: unixTime, utc: newDate.toUTCString() });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
