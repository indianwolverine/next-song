const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
require("./models/User");
// require("./services/passport");
const spotifyRoutes = require("./routes/spotifyRoutes");

mongoose.connect("mongodb://localhost/nextsong");
mongoose.Promise = global.Promise;

const app = express();

app
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8888;
const server = app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

const io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", data => {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
