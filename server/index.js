const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
require("./models/User");
require("./models/Room");
const spotifyRoutes = require("./routes/spotifyRoutes");

mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;

const app = express();

app
  .use(cors())
  .use(bodyParser.json())
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
  console.log(socket.id + " connected");

  socket.on("JOIN_ROOM", data => {
    console.log(data.room);
    socket.join(data.room);
    io.to(data.room).emit("ROOM_JOINED", data.room);
  });

  socket.on("SEND_VOTE", data => {
    console.log(data.songs);
    io.to(data.room).emit("RECEIVE_VOTE", data.songs);
  });

  socket.on("UPDATE_Q", data => {
    console.log("Updating Queue");
    io.to(data.room).emit("UPDATE_QUEUE", data);
  });

  socket.on("RESET_Q", data => {
    console.log("Resetting Queue");
    io.to(data.room).emit("RESET_QUEUE");
  });

  socket.on("RESET_V", data => {
    console.log("Resetting Votes");
    io.to(data.room).emit("RESET_VOTES");
  });
});
