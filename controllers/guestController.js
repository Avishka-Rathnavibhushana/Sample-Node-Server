const Guest = require('../services/guestService.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const guest = new Guest();
const guestController = {};

guestController.createAccount = async (req, res, next) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      const response = {
        err: 1,
        obj: {},
        msg: "All inputs are required"
      }
      return res.json(response);
    }

    // check if user already exist
    // Validate if user exist in our database
    const isUserexist = await guest.isUserExist(email);

    if (isUserexist) {
      const response = {
        err: 1,
        obj: {},
        msg: "User Already Exist. Please Login"
      }
      return res.json(response);
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user model
    const user = new User(null, email, encryptedPassword, first_name, last_name);

    // Creeate user in database
    guest.createAccount(user)
      .then(response => {
        if (response === true) {
          const response = {
            err: 0,
            obj: true,
            msg: "User successfully registered"
          }
          return res.json(response);
        } else {
          const response = {
            err: 1,
            obj: false,
            msg: "Something is wrong"
          }
          return res.json(response);
        }
      });
  } catch (err) {
    next(err);
  }
};

guestController.login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      const response = {
        err: 1,
        obj: {},
        msg: "All inputs are required"
      }
      return res.json(response);
    }

    const user_object = await guest.getUser(email);

    if (user_object == undefined) {
      const response = {
        err: 1,
        obj: {},
        msg: "User does not exist"
      }
      return res.json(response);
    }

    if (user_object && (await bcrypt.compare(password, user_object.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user_object.user_id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user_object.token = token;

      // user
      const response = {
        err: 0,
        obj: user_object,
        msg: "User Exist"
      }
      return res.json(response);
    }
    const response = {
      err: 1,
      obj: {},
      msg: "Invalid Credentials"
    }
    return res.json(response);
  } catch (err) {
    next(err);
  }
};


module.exports = guestController;
