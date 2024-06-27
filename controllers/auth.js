const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Adjust the regex pattern as necessary

  // Validate the username against the regex pattern
  if (!usernameRegex.test(username)) {
    const error = new Error("cant use this username");
    error.statusCode = 400;
    return next(error);
  }

  const user = await User.findOne({ username });

  if (!user) {
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) {
      const error = new Error("password mismatch");
      error.statusCode = 422;
      return next(error);
    }
    const name = req.body.name;
    const birthday = req.body.birthday;

    password = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password,
      name,
      birthday,
    });
    return res.status(200).json({ message: "user signup successful" });
  }
  const error = new Error("username already used");
  error.statusCode = 400;
  return next(error);
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    return next(error);
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    const error = new Error("Invalid username or password");
    error.statusCode = 400;
    return next(error);
  }
  const token = jwt.sign(
    {
      email: user.username,
      userId: user._id.toString(),
      role: user.role,
    },
    "your-secret-key-here",
    { expiresIn: "24h" }
  );
  return res.status(200).json({ token, user });
};

exports.addToProfile = async (req, res, next) => {
  const userID = req.body.userID;
  const height = req.body.height;
  if (height) {
    const addheight = await User.findOneAndUpdate(
      { _id: userID },
      {
        height: height,
      },
      { new: true }
    );
  }
  const weight = req.body.weight;
  if (weight) {
    const addweight = await User.findOneAndUpdate(
      { _id: userID },
      {
        weight: weight,
      },
      { new: true }
    );
  }
  const mobileNumber = req.body.mobileNumber;
  if (mobileNumber) {
    const addNumber = await User.findOneAndUpdate(
      { _id: userID },
      {
        mobileNumber: mobileNumber,
      },
      { new: true }
    );
  }
  if (userID) {
    res.json({ Message: "updated Successfuly" });
  } else {
    const error = new Error("couldnt update this profile");
    error.statusCode = 424;
    next(error);
  }
};
exports.getProfile = async (req, res, next) => {
  const userID = req.params.id;
  if (!userID) {
    const error = new Error("please enter an id");
    error.statusCode = 422;
    next(error);
  }
  const currentDate = new Date();
  const getProfile = await User.findById({ _id: userID });
  const age = currentDate.getFullYear() - getProfile.birthday.getFullYear();
  if (getProfile) {
    res.json({ getProfile, age });
  } else {
    const error = new Error("Could not find this profile");
    error.statusCode = 404;
    next(error);
  }
};
