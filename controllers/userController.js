const Users = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

class UserController {
  register(req, res, next) {
    const { email, password, name, YOB, phone } = req.body;
    let errors = [];
    if (!email || !password || !name || !YOB || !phone) {
      errors.push("Please enter all fields");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      Users.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push("email already exists");
          res.status(400).json(errors);
        } else {
          const newUser = new Users({
            ...req.body,
          });
          // Hash password
          bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.status(200).json("User registered successfully");
              })
              .catch(next);
          });
        }
      });
    }
  }
  signin(req, res, next) {
    passport.authenticate("local", (err, token, info) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      try {
        const decoded = jwt.verify(token, "rommel");
        const userInfo = decoded.user;

        // let redirectURL = "";

        // if (userInfo.role === "Customer") {
        //   redirectURL = "http://localhost:5173/customer";
        // } else if (userInfo.role === "Staff") {
        //   redirectURL = "http://localhost:5173/staff";
        // } else if (userInfo.role === "Admin") {
        //   redirectURL = "http://localhost:5173/admin";
        // }

        // Set the JWT token as a cookie
        res.cookie("token", token, {
          httpOnly: true, // Make the cookie accessible only via HTTP(S)
          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        });

        // Redirect to the desired page
        res.status(200).json('login success');
      } catch (error) {
        return res.status(401).json({ message: "Username or password is incorrect" });
      }
    })(req, res, next);
  }

  loginSuccess(req, res, next) {
    const token = req.cookies.token;

    if (token) {
      try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, "rommel");

        // The user information is available in the decoded payload
        const user = decoded;

        res.status(200).json({
          success: true,
          message: "Login successful",
          user: user,
        });
      } catch (error) {
        // Handle token verification error
        res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  }

  loginFailed(req, res, next) {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }

  logout(req, res, next) {
    res.clearCookie("token");
    // res.redirect("http://localhost:5173");
    res.status(200).json('logout success')
  }
}

module.exports = new UserController();
