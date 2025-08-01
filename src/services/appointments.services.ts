import PostgresDataSource from "../config/database";
import { Appointments, AppointmentStatus } from '../models/appointments';
import { User } from '../models/User';
import { Hospital } from '../models/hospital';
import { CreateAppointmentDTO } from '../dto/appointments.dto';

export class AppointmentsService {
  private appointmentRepo = PostgresDataSource.getRepository(Appointments);
  private userRepo = PostgresDataSource.getRepository(User);
  private hospitalRepo = PostgresDataSource.getRepository(Hospital);

  public async createAppointment(dto: CreateAppointmentDTO): Promise<Appointments> {
    const {
      appointment_date,
      appointment_time,
      patient_id,
      provider_id,
      hospital_id,
      status,
      rejection_reason
    } = dto;

    const patient = await this.userRepo.findOneByOrFail({ id: patient_id });
    const provider = await this.userRepo.findOneByOrFail({ id: provider_id });
    const hospital = await this.hospitalRepo.findOneByOrFail({ id: hospital_id });

    const appointment = this.appointmentRepo.create({
      appointment_date: new Date(appointment_date),
      appointment_time,
      patient,
      provider,
      hospital,
      status: status || AppointmentStatus.Pending,
      rejection_reason: status === AppointmentStatus.Cancelled ? rejection_reason : null
    });

    return await this.appointmentRepo.save(appointment);
  }
}
