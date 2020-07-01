import { Router } from 'express';

import SessionsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
