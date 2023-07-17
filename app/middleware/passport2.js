// const {userServices} =require("../services")
require('dotenv').config();

const { Strategy: JwtStrategy, ExtractJwt } =require('passport-jwt') ;
const models =require("../models")

const Users = models.users;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.DB_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// create jwt strategy
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(`payload ${jwt_payload}`)
      Users.findAll({ where: { user_id: jwt_payload.id } })
        .then(user => {
          if (user.length) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
