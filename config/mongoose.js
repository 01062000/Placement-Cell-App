const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dotenv = require('dotenv');
dotenv.config();
const DB = process.env.DB;


mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function () {
	console.log('Connected to Database :: Mongodb');
});

module.exports = mongoose;
