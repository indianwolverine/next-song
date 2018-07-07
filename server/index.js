const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
require("./models/user");
require("./services/passport");
const spotifyRoutes = require("./routes/spotifyRoutes");

mongoose.connect("mongodb://localhost/nextsong");
mongoose.Promise = global.Promise;

const app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  // .use(bodyParser.json())
  // .use(
  //   cookieSession({
  //     name: "session",
  //     keys: [keys.cookieKeys]
  //   })
  // )
  .use(cookieParser());

spotifyRoutes(app);

const PORT = process.env.PORT || 8888;
const server = app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", data => {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
