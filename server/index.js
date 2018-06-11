const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

mongoose.connect('mongodb://localhost/nextsong');

mongoose.Promise = global.Promise;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [keys.cookieKeys]
  })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('server is running on port', PORT);
});

const io = socket(server);

io.on('connection', socket => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', data => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});
