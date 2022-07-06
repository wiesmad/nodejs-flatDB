const fs = require('fs');
const users = require('../data/users.json');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// save updated users.json file
function saveFile() {
  fs.writeFile("./data/users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return next(new AppError('Can not update file', 500));
    };
  });
}

// middleware to check if request body not empty
exports.checkBody = (req, res, next) => {
  if (req.body.username === "" || req.body.email === "") {
    next(new AppError('User name and email are required', 500));
  }
  next();
};

// middleware to check if user exists
exports.checkUser = (req, res, next) => {
  const user = users.find(el => el.id == req.params.id);
  if (!user) {
    next(new AppError(`Invalid user ID: '${req.params.id}`, 500));
  }
  next();
};

exports.getAllUsers = (req, res) => {
  if (!users)
    return new AppError('Can not read json file!', 500);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users.length > 0 ? users : null
  });
};

exports.getUser = catchAsync(async (req, res) => {
  const user = await users.find(el => el.id == req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = catchAsync((req, res) => {
  const user = {
    id: Math.random().toString(16).substring(2, 10),
    username: req.body.username,
    email: req.body.email,
    createdAt: new Date().toLocaleString()
  }

  if (
    users.find(el => el.username == req.body.username)
    ||
    users.find(el => el.email == req.body.email)
  ) {
    throw new AppError('User name or email already exist', 500)
  } else {
    users.push(user);
  }

  saveFile();

  res.status(200).json({
    success: true,
    data: user,
  });
});


exports.updateUser = catchAsync(async (req, res) => {
  const user = await users.find(el => el.id == req.params.id);
  const index = await users.findIndex(el => el.id == user.id);
  const newUser = {
    id: user.id,
    username: req.body.username || user.username,
    email: req.body.email || user.email,
    createdAt: user.createdAt,
    updatedAt: new Date().toLocaleString()
  }

  if (index !== -1) {
    users[index] = newUser;
  }

  saveFile();

  res.status(200).json({
    success: true,
    data: `User ${user.username} with ID '${user.id}' was updated`,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await users.find(el => el.id == req.params.id);
  const index = await users.findIndex(el => el.id == user.id);
  users.splice(index, 1);

  saveFile();

  res.status(200).json({
    success: true,
    data: `User '${user.username}' with ID '${user.id}' was deleted`,
  });
});