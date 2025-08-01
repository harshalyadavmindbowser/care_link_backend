import { IsString, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDTO {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

class AddressDTO {
  @IsString()
  address: string;
}

export class CreateHospitalDTO {
  @IsString()
  hospital_name: string;

  @IsString()
  contact_info: string;

  @IsOptional()
  @IsString()
  hospital_website?: string;

  @IsString()
  provider_id: string;

  @ValidateNested()
  @Type(() => LocationDTO)
  location: LocationDTO;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;
}
