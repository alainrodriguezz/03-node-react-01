const passport = 		require('passport');
const GoogleStrategy = 	require('passport-google-oauth20').Strategy;
const keys = 			require('./../config/keys')
const mongoose = 		require('mongoose')
const User = mongoose.model('users')


passport.serializeUser((user, done) => {
	console.log('serialize',user.id)
	done(null,user.id);
})

passport.deserializeUser(async (id,done) =>{
	const user = await User.findById(id)
	console.log('deserialize',user)
	done(null,user);
})


passport.use(new GoogleStrategy(
	{
		clientID: 		keys.googleClientID,
		clientSecret: 	keys.googleClientSecret,
		callbackURL: 	'/auth/google/callback'
	}, async (accessToken, refreshToken, profile, done)=>
	{
		let existingUser = await User.findOne({googleId:profile.id});

		if(existingUser){
			console.log('existingUser',existingUser);
			done(null,existingUser);
		}else{
			const newUser = await new User({googleId:profile.id}).save();
			done(null,newUser);	
		}
	}))
