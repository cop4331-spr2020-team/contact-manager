const PassportJwt = require('passport-jwt')
const User        = require('../models/user-model')
const keys        = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.sercretOrKey = keys.sercretOrKey

passport = () => {
	passport.use(
		new PassportJwt.JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user)
					}

					return done(null, false)
				})
				.catch(err => console.log(err))
		})
	)
}

module.export = {
	passport
}