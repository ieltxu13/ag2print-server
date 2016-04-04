'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';

var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var localStrategyConfig = require('./strategies/local');

import * as User from './../../user/User';
var config = require('./config');

// CONFIG
localStrategyConfig();

const authRoutes: express.Router = express.Router();

// ROUTES

authRoutes.post('/', function(req: express.Request, res: express.Response, next) {
  if (req.body.credentials) {
    switch (req.body.credentials) {
      case 'password':
        localAuthentication(req, res, next);
    }
  } else {
    return res.status(403).send({
      message: 'credentials not provided'
    });
  }
});

function localAuthentication(req: express.Request, res: express.Response, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json(401, { error: 'message' });
    }

    //user has authenticated correctly thus we create a JWT token
    var token = jwt.sign({ name: user.name, email: user.email }, config.secret);
    res.json({ token: token });

  })(req, res, next);
}

export = authRoutes;
