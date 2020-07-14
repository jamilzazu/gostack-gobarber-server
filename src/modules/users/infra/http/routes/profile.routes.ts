import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthentitcated from '@modules/users/infra/http/middlewares/ensureAuthentitcated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthentitcated);

profileRouter.put('/', profileController.update);

profileRouter.get('/', profileController.show);

export default profileRouter;
