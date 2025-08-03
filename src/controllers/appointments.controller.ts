import { Request, Response } from 'express';
import { AppointmentsService } from '../services/appointments.services';
import { CreateAppointmentDTO } from '../dto/appointments.dto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { start } from 'repl';
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

  public getAppointment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const appoinments = await this.service.getAppointmentsById(id);

      return res.status(201).json({
        status: "success",
        message: "Appintments featched successfully",
        appoinments: appoinments
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting appointment', error });
    }
  }

}
