const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const User = require('../models').User

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return User.findOne({
        email
    }).exec().then(async user => {
        if (!user || !(await user.comparePassword(password))) {
            return cb(null, false, {
                message: 'Incorrect email or password.'
            })
        }

        return cb(null, user, {
            message: 'Logged In Successfully'
        })
    }).catch(err => cb(err))
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET || 'changeme'
}, function (payload, cb) {
    try {
        const user = await User.findOneById(payload.id)
    
        if (user) {
          return done(null, {
            email: user.email,
            admin: user.admin
          })
        }
    
        done(new Error('User not found'), null)
    } catch (err) {
        done(err, null)
    }
}))