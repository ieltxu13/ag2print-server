'use strict';

import * as express from 'express';

import * as authRoutes from './auth/authRoutes';
import * as userRoutes from './user/userRoutes';

const apiRoutes: express.Router = express.Router();

apiRoutes.get('/', function(req: express.Request, res: express.Response) {
  return res.json({message: 'pegandole a la api'});
});

apiRoutes.use('/authenticate', authRoutes);
apiRoutes.use('/users', userRoutes);

export default apiRoutes;
