const querystring = require("querystring");
const request = require("request");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

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

  app.get("/api/login", (req, res) => {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope =
      "streaming user-read-birthdate user-read-email user-read-private";
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
            console.log(body.id);

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
              existingUser.update({
                accessToken: access_token,
                refreshToken: refresh_token
              });
              existingUser.save();
            }

            res.redirect(
              "http://localhost:3000/" +
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
