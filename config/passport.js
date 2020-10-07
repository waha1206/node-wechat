// eslint-disable-next-line no-unused-vars
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose') // 要用到 mongoose 是因為要用到 User (資料結構)
const User = mongoose.model('users')
const keys = require('./keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = (passport) => {
  passport.use(
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload)
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
