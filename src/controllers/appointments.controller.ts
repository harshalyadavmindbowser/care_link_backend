import { Request, Response } from 'express';
import { AppointmentsService } from '../services/appointments.services';
import { CreateAppointmentDTO } from '../dto/appointments.dto';

export class AppointmentsController {
  private service = new AppointmentsService();

  public createAppointment = async (req: Request, res: Response) => {
    try {
      const dto: CreateAppointmentDTO = req.body;
      const appointment = await this.service.createAppointment(dto);
      res.status(201).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating appointment', error });
    }
  };
}
