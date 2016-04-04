'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as userController from '../../user/userController';

const userRoutes: express.Router = express.Router();

userRoutes.get('/', userController.getUsers);
userRoutes.get('/:id', userController.getUser);
userRoutes.post('/', userController.create);

export = userRoutes;
