import PostgresDataSource from "../config/database";
import { Appointments, AppointmentStatus } from '../models/appointments';
import { User } from '../models/User';
import { Hospital } from '../models/hospital';
import { CreateAppointmentDTO } from '../dto/appointments.dto';
import { sendMail } from '../utils/mailer';

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

    const savedAppointment = await this.appointmentRepo.save(appointment);

    //  Send email based on status
    try {
      if (status === AppointmentStatus.Approved) {
        await sendMail({
          to: patient.email,
          subject: 'Confirmation of Your Appointment',
          html: `
            <p>Hello ${patient.full_name},</p>
            <p>Your appointment is confirmed. Please find the details below:</p>
            <ul>
              <li><strong>Date:</strong> ${appointment_date}</li>
              <li><strong>Time:</strong> ${appointment_time}</li>
            </ul>
            <p>We look forward to seeing you.</p>
            <br/>
            <p>Thank you,<br/><strong>Team CareLink</strong></p>
          `
        });
      } else if (status === AppointmentStatus.Cancelled) {
        await sendMail({
          to: patient.email,
          subject: 'Cancellation of Your Appointment',
          html: `
            <p>Hello ${patient.full_name},</p>
            <p>We regret to inform you that your appointment on <strong>${appointment_date}</strong> at <strong>${appointment_time}</strong> has been rejected.</p>
            <p>Reason: ${rejection_reason || 'Not provided'}</p>
            <p>Please contact us to reschedule. We apologise for the inconvenience.</p>
            <br/>
            <p>Thank you,<br/><strong>Team CareLink</strong></p>
          `
        });
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return savedAppointment;
  }

  public async getAppointmentsById(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ["patientAppointments", "patientAppointments.provider", "doctorAppointments", "doctorAppointments.patient"] })
    if (!user) {
      return {
        message: "user not found"
      }
    }
    if (user.role == "patient") {

      return user;
    }
    else if (user.role === "provider") {
      return user;
    }
    else {
      return [];
    }
  }



}
