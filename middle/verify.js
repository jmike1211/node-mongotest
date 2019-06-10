var Passport = require( 'passport' );
var LocalStrategy = require( 'passport-local' ).Strategy;

var users = {
  zack: {
    username: 'zack',
    password: '1234',
    id: 1,
  },
  node: {
    username: 'node',
    password: '5678',
    id: 2,
  },
}

var localStrategy = new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
	},
    function(username, password, done) {
      	user = users[ username ];
 
      	if ( user == null ) {
			console.log("false1")
        	return done( null, false, { message: 'Invalid user' } );
      	};
 
      	if ( user.password !== password ) {
			console.log("false2")
        	return done( null, false, { message: 'Invalid password' } );
      	};
		console.log("true12")
      	done( null, user );
    }
)
 
Passport.use( 'local', localStrategy );

module.exports = function (app) {
	app.use(Passport.initialize())
}

