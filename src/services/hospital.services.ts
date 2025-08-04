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

    if (typeof data.location === 'string') {
      data.location = JSON.parse(data.location);
    }

    if (typeof data.address === 'string') {
      data.address = JSON.parse(data.address);
    }

    if (typeof data.categories === 'string') {
      data.categories = JSON.parse(data.categories);
    }
  } catch (err) {
    throw new Error("Failed to parse JSON fields: " + (err as Error).message);
  }

  console.log("Parsed Data:", JSON.stringify(data, null, 2));

  try {
    if (
      data.location?.latitude == null ||
      data.location?.longitude == null
    ) {
      throw new Error("'location.latitude' and 'location.longitude' are required.");
    }

    const location = locationRepo.create({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    });
    await locationRepo.save(location);
    console.log("Location saved");

    if (!Array.isArray(data.categories) || data.categories.length === 0) {
      throw new Error("categories must be a nonnul array.");
    }

    const addedCategories = data.categories.map((name: string) =>
      categoryRepo.create({ name })
    );
    await categoryRepo.save(addedCategories);
    console.log("🏷️ Categories saved");

    const addressText = data?.address?.address?.trim();
    if (!addressText) {
      throw new Error("'address.address' field is required.");
    }

    const address = addressRepo.create({
      address: addressText,
      location: location,
    });
    await addressRepo.save(address);
    console.log("Address saved");

    const provider = await userRepo.findOne({ where: { id: data.provider_id } });
    if (!provider) {
      throw new Error("Provider not found with ID: " + data.provider_id);
    }

    const hospital = hospitalRepo.create({//saving hopsital
      hospital_name: data.hospital_name,
      contact_info: data.contact_info,
      hospital_website: data.hospital_website,
      hospital_address: addressText,
      provider: provider,
      location: location,
      categories: addedCategories,
    });

    await hospitalRepo.save(hospital);
    console.log("🏥 Hospital saved");

    if (files && files.length > 0) {//saving images
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
    console.error("Error creating hospital:", error);
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