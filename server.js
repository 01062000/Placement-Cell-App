const express = require('express');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const dotenv = require('dotenv');
dotenv.config();
const port = 8000;


dotenv.config({ path: 'config/.env' });

const app = express();
// set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(
	session({
		secret: "hello",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 100 },
	})
);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.urlencoded({ extended: true }));

// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// express router
app.use('/', require('./routes'));

// starting the server
app.listen(port, function (error) {
	if (error) {
		console.log(`Error in connecting to server: ${error}`);
		return;
	}
	console.log(`Server running on port: ${port}`);
});
