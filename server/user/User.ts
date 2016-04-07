import mongoose = require('mongoose');

import IUser = require('./IUser');

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String
});

var User = mongoose.model<IUserModel>('User', userSchema);

export = User;
