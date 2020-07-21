import { Router } from 'express';

import ensureAuthentitcated from '@modules/users/infra/http/middlewares/ensureAuthentitcated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthentitcated);

providersRouter.get('/', providersController.index);

export default providersRouter;
