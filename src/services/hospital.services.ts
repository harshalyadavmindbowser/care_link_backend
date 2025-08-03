import PostgresDataSource from "../config/database";
import { Hospital } from "../models/hospital";
import { Address } from "../models/Address";
import { Location } from "../models/location";
import { Images } from "../models/images";
import { User } from "../models/User";
import { Category } from "../models/category";
import { In } from 'typeorm';


const hospitalRepo = PostgresDataSource.getRepository(Hospital);
const categoryRepo = PostgresDataSource.getRepository(Category);
const addressRepo = PostgresDataSource.getRepository(Address);
const locationRepo = PostgresDataSource.getRepository(Location);
const imageRepo = PostgresDataSource.getRepository(Images);
const userRepo = PostgresDataSource.getRepository(User);

export class HospitalService {
  static async createHospitalWithRelations(
    data: any,
    files: Express.Multer.File[]
  ) {

    console.log("createHospitalWithRelations called");
    try {
      console.log("Incoming data:", JSON.stringify(data, null, 2));

      const location = locationRepo.create({ //saving location
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      });
      await locationRepo.save(location);

      if (!data.categories || !Array.isArray(data.categories)) {
        throw new Error("Categories must be an array of category names");
      }

      const categories = data.categories;

      const addedCategories = categories.map((name: string) => {
        return categoryRepo.create({ name });
      });

      await categoryRepo.save(addedCategories);


      const addressText = data?.address?.address?.trim(); //saving address
      console.log("address:", addressText);

      if (!addressText) {
        throw new Error("hospital address is missing");
      }

      const address = addressRepo.create({
        address: addressText,
        location: location,
      });
      await addressRepo.save(address);

      const provider = await userRepo.findOne({
        where: { id: data.provider_id },
      }); //find the provider entity

      if (!provider) {
        throw new Error("Provider not found with ID: " + data.provider_id);
      }

      const hospital = new Hospital(); //create and save hospital details
      hospital.hospital_name = data.hospital_name;
      hospital.contact_info = data.contact_info;
      hospital.hospital_website = data.hospital_website;
      hospital.hospital_address = addressText;
      hospital.provider = provider;
      hospital.location = location;
      hospital.categories = addedCategories;

      await hospitalRepo.save(hospital);

      if (files && files.length > 0) { //saving images 
        const imageEntities = files.map((file) =>
          imageRepo.create({
            images_url: `/uploads/images/${file.filename}`,
            hospital: hospital,
          })
        );
        await imageRepo.save(imageEntities);
        console.log(`Saved ${files.length} image(s).`);
      }

      console.log("Hospital created successfully!");
      return hospital;
    } catch (error) {
      console.error(" Error creating hospital:", error);
      throw error;
    }
  }

  static async getAllHospitals() {
    return await hospitalRepo.find({
      relations: ["location", "images" , "categories"],
    });
  }

  static async getHospitalById(id: string) {
    return await hospitalRepo.findOne({
      where: { id },
      relations: ["location", "images" , "provider" ],
    });
  }


  static async getHospitalsByCategory(categoryNames: string[]){
    const categories = await categoryRepo.find({
      where: { name: In(categoryNames) },
      relations: [
        'hospitals',
        'hospitals.location',
        'hospitals.images',
        'hospitals.categories',
      ],
    });
    
    if (!categories.length) {
      return [];
    }

    const hospitals = categories.flatMap(category => category.hospitals)
    return hospitals;
  }

}