'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
var jwt = require('jsonwebtoken');

import * as userController from '../../user/userController';
var config = require('./../auth/config');

const userRoutes: express.Router = express.Router();

// route middleware to verify a token
userRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  // decode token
  if (token) {
    var token = token.replace('Bearer ', '')
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

userRoutes.get('/', userController.getUsers);
userRoutes.get('/:id', userController.getUser);
userRoutes.post('/', userController.create);

export = userRoutes;
