const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const RefreshTokens = require('../models/refreshToken');

exports.getUsersDb = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Access Token Required');
    }
    const token = req.headers.authorization.split(' ')[1];
    let userId = jwt.verify(token, process.env.SECRET);
    console.log(userId);
    // console.log(userId);
    // if (!user) {
    //   return res.status(403).send('Invalid Access Token');
    // }

    // if (!user.isAdmin) {
    //   return res.status(403).send('Invalid Access Token');
    // }
    return res.status(200).send(userId);
  } catch (error) {
    next(error);
  }
};
