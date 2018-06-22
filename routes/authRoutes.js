const passport = require('passport')

module.exports = (app)=>{
	//Login with google
	app.get('/auth/google', 
			passport.authenticate('google', {
				scope:['profile','email']
	}));

	//Logged with google, now Get User Data
	app.get('/auth/google/callback',passport.authenticate('google'));

	// Logged in
	app.get('/api/current_user',(req,res)=>{
		//res.send(req.session) //This is the User ID
		//res.send(req.user);
	});

	// Logout
	app.get('/api/logout',(req,res)=>{
		req.logout();
		res.send(req.user);
	});
}

