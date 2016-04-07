'use strict';

import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
import * as User from './user/User';

var config = require('./config');
import apiRoutes from './api/apiRoutes';

const app: express.Express = express();

mongoose.connect(config.database);
app.set('dev', 'development');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', apiRoutes);

app.get('/', function(req: express.Request, res: express.Response) {
  return res.json({ message: 'hola' });
});

// DEBUG UTILS

app.get('/setup', function(req: express.Request, res: express.Response) {
  var user = new User({ name: 'name', password: 'password', email: 'email@email.com' });
  user.save(function(err) {
    if (err) throw err;

    console.log('user created successfully');
    res.json({ success: true })
  })
});

app.listen(8080);

export default app;
