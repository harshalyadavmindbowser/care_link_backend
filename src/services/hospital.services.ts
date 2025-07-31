import PostgresDataSource from "../config/database";
import { Hospital } from "../models/hospital";

const hospitalRepo = PostgresDataSource.getRepository(Hospital);

export class HospitalService {
  static async createHospital(data: Partial<Hospital>) {
    const hospital = hospitalRepo.create(data);
    return await hospitalRepo.save(hospital);
  }

  static async getAllHospitals() {
    return await hospitalRepo.find();
  }

  static async getHospitalById(id: string) {
    return await hospitalRepo.findOneBy({ id: id });
  }
}
