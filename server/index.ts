'use strict';

import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
var mongoose = require('mongoose');
var passport = require('passport');
import * as User from './user/User';

var config = require('./config');
import apiRoutes from './api/apiRoutes';

const app: express.Express = express();

mongoose.connect(config.database);
app.set('dev', 'development');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.get('/', function(req: express.Request, res: express.Response) {
  return res.json({ message: 'hola' });
});

// DEBUG UTILS

app.get('/setup', function(req: express.Request, res: express.Response) {
  var user = new User({ name: 'ieltxu', password: 'Cucaracha13', email: 'user@appsilon.pl' });
  user.save(function(err) {
    if (err) throw err;

    console.log('user created successfully');
    res.json({ success: true })
  })
});

app.get('/users', function(req: express.Request, res: express.Response) {
  User.find(function(err, users) {
    if (err) return res.json({error: err});

    res.json({users: users});
  })
})

app.listen(8080);

export default app;
