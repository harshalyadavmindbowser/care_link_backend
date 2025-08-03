import {
  IsDateString,
  IsString,
  IsUUID,
  IsOptional,
  IsEnum,
  ValidateIf
} from 'class-validator';
import { AppointmentStatus } from '../models/appointments';

export class CreateAppointmentDTO {
  @IsDateString()
  appointment_date: string;

  @IsString()
  appointment_time: string;

  @IsUUID()
  patient_id: string;

  @IsUUID()
  provider_id: string;

  @IsUUID()
  hospital_id: string;

  @IsOptional()
  @IsEnum(AppointmentStatus, {
    message: `status must be one of: ${Object.values(AppointmentStatus).join(', ')}`,
  })
  status?: AppointmentStatus;

  @ValidateIf((o) => o.status === AppointmentStatus.Cancelled)
  @IsString({ message: 'Rejection reason is required when status is cancelled' })
  rejection_reason?: string;
}
