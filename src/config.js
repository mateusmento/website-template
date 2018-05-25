const path = require('path');

exports.PORT = process.env.PORT || 80;

exports.DB_HOST = 'localhost';
exports.DB_NAME = 'test';
exports.DB_URL = 'mongodb://' + exports.DB_HOST + '/' + exports.DB_NAME;

exports.HASH_SALT_LENTGH = 10;


exports.ROUTES_PATH = path.resolve(__dirname, '../src/routes');
exports.SOCKETS_PATH = path.resolve(__dirname, '../src/sockets');

exports.VIEWS_PATH = path.resolve(__dirname, '../web/views');
exports.STYLESHEETS_PATH = path.resolve(__dirname, '../web/stylesheets');
exports.SCRIPTS_PATH = path.resolve(__dirname, '../web/scripts');

exports.PUBLIC_FILES_PATH = path.resolve(__dirname, '../web/public/');
exports.CSS_PATH = exports.PUBLIC_FILES_PATH + '/css';
exports.JS_PATH = exports.PUBLIC_FILES_PATH + '/js';


exports.SECRET_KEY = 'adf64sg9s874df3se743df46';
exports.SESSION_OPTIONS = {
    resave: true,
    saveUninitialized: true,
    secret: exports.SECRET_KEY,
    cookie: {
        maxAge: 999999999
    }
};




