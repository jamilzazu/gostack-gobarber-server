import { Router } from 'express';
import multer from 'multer';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UsersAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import uploadConfig from '@config/upload';
import ensureAuthentitcated from '../middlewares/ensureAuthentitcated';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const update = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthentitcated,
  update.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
