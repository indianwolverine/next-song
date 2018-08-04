const querystring = require("querystring");
const request = require("request");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Room = mongoose.model("rooms");

module.exports = app => {
  var generateRandomString = length => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  var stateKey = "spotify_auth_state";

  app.get("/api/user", async (req, res) => {
    const request = querystring.parse(req.headers.referer);
    const user = await User.findOne({ userID: request.userID });
    res.send(user);
  });

  app.post("/api/getHost", async (req, res) => {
    const host = await User.findOne({ userID: req.body.userID });
    res.send(host);
  });

  app.post("/api/findRoomAndHost", async (req, res) => {
    const room = await Room.findOne({
      name: req.body.room,
      password: req.body.password
    });
    if (room) {
      const user = await User.findOne({ userID: room.host });
      res.send({ user: user, room: room });
    } else {
      res.send("");
    }
  });

  app.post("/api/userRooms", async (req, res) => {
    const rooms = await Room.find({ host: req.body.userID });
    res.send(rooms);
  });

  app.post("/api/setUserPlaylist", async (req, res) => {
    const room = await Room.findOne({ name: req.body.room });
    room.playlistID = req.body.playlist;
    room.save();
  });

  app.post("/api/addToQueue", async (req, res) => {
    const room = await Room.findOne({ name: req.body.room });
    room.queue.push(JSON.stringify(req.body.song));
    room.save();
  });

  app.post("/api/resetQueue", async (req, res) => {
    const room = await Room.findOne({ name: req.body.room });
    room.queue = [];
    room.save();
  });

  app.post("/api/updateVotes", async (req, res) => {
    const room = await Room.findOne({ name: req.body.room });
    room.votes = JSON.stringify(req.body.votes);
    room.save();
  });

  app.post("/api/resetVotes", async (req, res) => {
    const room = await Room.findOne({ name: req.body.room });
    room.votes = "";
    room.save();
  });

  app.post("/api/createRoom", async (req, res) => {
    const room = new Room({
      host: req.body.userID,
      name: req.body.room,
      password: req.body.password
    });

    const user = await User.findOne({ userID: req.body.userID });
    user.rooms.push(room);

    room.save();
    user.save();

    res.send(room);
  });

  app.get("/api/login", (req, res) => {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope =
      "user-modify-playback-state user-read-private user-read-birthdate user-read-email playlist-read-private user-library-read user-library-modify user-top-read playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-read user-follow-modify user-read-playback-state user-read-currently-playing user-read-recently-played";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: keys.spotifyClientID,
          scope: scope,
          redirect_uri: keys.redirectURI,
          state: state
        })
    );
  });

  app.get("/api/callback", (req, res) => {
    4;
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch"
          })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: keys.redirectURI,
          grant_type: "authorization_code"
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(
              keys.spotifyClientID + ":" + keys.spotifyClientSecret
            ).toString("base64")
        },
        json: true
      };

      request.post(authOptions, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;

          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          await request.get(options, async (error, response, body) => {
            console.log(access_token);

            const existingUser = await User.findOne({ userID: body.id });

            if (!existingUser) {
              const user = new User({
                userID: body.id,
                userInfo: JSON.stringify(body),
                accessToken: access_token,
                refreshToken: refresh_token
              });
              await user.save();
            } else {
              existingUser.accessToken = access_token;
              existingUser.refreshToken = refresh_token;
              existingUser.save();
            }

            res.redirect(
              "http://localhost:3000/host/" +
                querystring.stringify({
                  // accessToken: access_token,
                  // refreshToken: refresh_token,
                  app: "next-song",
                  userID: body.id
                })
            );
          });
          // we can also pass the token to the browser to make requests from there
        } else {
          res.redirect(
            "/api/home#" +
              querystring.stringify({
                error: "invalid_token"
              })
          );
        }
      });
    }
  });

  app.get("/api/refresh_token", (req, res) => {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            keys.spotifyClientID + ":" + keys.spotifyClientSecret
          ).toString("base64")
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          access_token: access_token
        });
      }
    });
  });
};
