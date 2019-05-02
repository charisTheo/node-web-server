const GoogleOAuthStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config.js');

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  passport.use(new GoogleOAuthStrategy(
      {
        clientID: config.client_id,
        clientSecret: config.client_secret,
        callbackURL: config.auth_callback_url,
        // Set the correct profile URL that does not require any additional APIs
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
      },
      (token, refreshToken, profile, done) => done(null, {profile, token, refreshToken})));
};