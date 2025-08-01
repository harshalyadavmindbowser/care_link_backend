import { Router } from 'express';
import { AppointmentsController } from '../controllers/appointments.controller';

const router = Router();
const controller = new AppointmentsController();

router.post('/', controller.createAppointment);

export default router;
