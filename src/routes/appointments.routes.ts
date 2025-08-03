import { Router } from 'express';
import { AppointmentsController } from '../controllers/appointments.controller';

const router = Router();
const controller = new AppointmentsController();

router.post('/', controller.createAppointment);
router.get('/:id', controller.getAppointment);


export default router;
