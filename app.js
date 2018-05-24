////////////////////////////////////////////////////////////////////////////////////
/// Template website app for nodejs
////////////////////////////////////////////////////////////////////////////////////

require('attract')({basePath: __dirname + '/src'});

// dependencies
const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const websocket = require('socket.io');
const websocket_session = require('express-socket.io-session');
const mongoose = require('mongoose');


// from ./src folder
const config = required('config');
const useRoutes = required('use-routes');
const useSockets = required('use-routes');
const servePugPages = required('serve-pug-pages');


/// Variables //////////////////////////////////////////////////////////////////////

let app = express();
let server = app.listen(config.PORT);
let io = websocket(server);
let session_middleware = session(config.SESSION_OPTIONS);


/// Express Middleware /////////////////////////////////////////////////////////////

app.set('view engine', 'pug');
app.set('views', config.VIEWS_PATH);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session_middleware);
app.use(cookie(config.SECRET_KEY));

app.use(servePugPages());
app.use(express.static(config.PUBLIC_FILES_PATH));

useRoutes(app, config.ROUTES_PATH);


/// Socket.io //////////////////////////////////////////////////////////////////////

io.use(websocket_session(session_middleware));
io.on('connection', function(socket){
    useSockets(socket, config.SOCKETS_PATH);
});


/// Mongoose ///////////////////////////////////////////////////////////////////////

mongoose.connect(config.DB_URL);


////////////////////////////////////////////////////////////////////////////////////

