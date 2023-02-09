const { use } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.userid);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((userid, done) => {
    done(null, { userid });
  });

  // Configure local strategy to be use for local login
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ username: username, password: password });
        return done(null, user);
      } catch(err) {
        console.log(err);
        return done(err);
      }
    }
  ));

  return passport;

}