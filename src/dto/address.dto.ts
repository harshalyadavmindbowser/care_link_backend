import { IsString, IsOptional } from 'class-validator'

export class AddressDTO {
    @IsString()
    address: string
}
