const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "This email is not registered",
            });
          }
          // Match password
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (isMatch) {
                // Generate JWT token
                const token = jwt.sign(
                  {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                  },
                  "rommel"
                );
                return done(null, token);
              } else {
                return done(null, false, { message: "Password is incorrect" });
              }
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
