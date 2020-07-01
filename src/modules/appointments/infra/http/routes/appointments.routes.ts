import { Router } from 'express';

import ensureAuthentitcated from '@modules/users/infra/http/middlewares/ensureAuthentitcated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appoitmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appoitmentsRouter.use(ensureAuthentitcated);

appoitmentsRouter.post('/', appointmentsController.create);

export default appoitmentsRouter;
