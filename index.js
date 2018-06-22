require('./models/User');
require('./services/passport');
const keys = 			require('./config/keys');
const express = 		require('express');
const mongoose =  		require('mongoose');
const cookieSession = 	require('cookie-session')
const passport = 		require('passport')
const app = 			express();


mongoose.connect(keys.mongoURI);
app.use(cookieSession(
{
	maxAge: 30*24*60*60*1000, //30 días: x24h x 60m x 60s x 1000 ms
	keys: 	[keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app)


const PORT = 	process.env.PORT || 3000
app.listen(PORT,()=>console.log('listening'))


module.exports = {app}