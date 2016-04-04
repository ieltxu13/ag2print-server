import express = require('express');
import mongoose = require('mongoose');
import User = require('./User');

import IUser = require('./IUser');

export function create(req: express.Request, res: express.Response) {
  var user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.save((error, user) => {
    if (error) {
      res.send(500);
    } else {
      res.status(200).json(user);
    }
  });
}

export function getUsers(req: express.Request, res: express.Response) {
  User.find((error, users) => {
    if (error) {
      res.send(500);
    }
    res.status(200).json(users);
  });
}

export function getUser(req: express.Request, res: express.Response) {
  User.findById(req.params.id, (error, user) => {
    if (error) {
      res.send(500);
    } else {
      res.status(200).json(user);
    }
  })
}
