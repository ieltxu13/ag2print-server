import mongoose = require('mongoose');

import IUser = require('./IUser');

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  email: {
    type: String,
    required: [true, 'Email field is required.']
  },
  password: {
    type: String,
    required: [true, 'Password field is required.']
  }
});

var User = mongoose.model<IUserModel>('User', userSchema);

export = User;
