import { Router } from 'express';
import { AppointmentsController } from '../controllers/appointments.controller';
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";
const router = Router();
const controller = new AppointmentsController();

router.post('/', authentification, authorization(["patient"]), controller.createAppointment);
router.get('/:id', authentification,
    authorization(["provider", "patient"]), controller.getAppointment);


export default router;
