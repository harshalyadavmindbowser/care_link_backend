import { IsNumber } from 'class-validator'

export class LocationDTO {
    @IsNumber()
    radius: number;

    @IsNumber()
    lat: number;

    @IsNumber()
    long: number;
}