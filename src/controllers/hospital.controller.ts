import { Request, Response } from "express";
import { HospitalService } from "../services/hospital.services";
import { GetHospitalsByCategoryDto } from "../dto/hospital.dto";
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export interface IValidationError {
  property: string;
  constraints: { [type: string]: string };
}

export class HospitalController {
static async createHospital(req: Request, res: Response) {
  console.log("post-createHospital called");
  console.log("Raw req.body:", req.body);

  try {
    const body = req.body;

    // ✅ Safely parse stringified JSON fields
    try {
      if (typeof body.location === 'string') {
        body.location = JSON.parse(body.location);
      }
      if (typeof body.address === 'string') {
        body.address = JSON.parse(body.address);
      }
      if (typeof body.categories === 'string') {
        body.categories = JSON.parse(body.categories);
      }
    } catch (err) {
      console.error("Invalid JSON format in one of the fields");
      return res.status(400).json({
        message: "Invalid JSON in 'location', 'address', or 'categories' field",
        error: (err as Error).message,
      });
    }

    // ✅ Ensure required nested fields are present
    if (
      !body.location?.latitude ||
      !body.location?.longitude ||
      !body.address?.address
    ) {
      return res.status(400).json({
        message: "Missing required location or address fields",
      });
    }

    // ✅ Get uploaded images (if any)
    const files = req.files as Express.Multer.File[] || [];

    // ✅ Pass parsed body and files to service
    const hospital = await HospitalService.createHospitalWithRelations(body, files);

    return res.status(201).json({
      message: "Hospital created successfully",
      hospital,
    });

  } catch (error) {
    console.error("Error in createHospital:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}




  static async getAllHospitals(_req: Request, res: Response) {
    try {
      const hospitals = await HospitalService.getAllHospitals();
      return res.status(200).json(hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getHospitalById(req: Request, res: Response) {
    console.log(`[GET] /hospitals/${req.params.id} - getHospitalById called`);
    try {
      const { id } = req.params;
      const hospital = await HospitalService.getHospitalById(id);

      if (!hospital) {
        console.warn(`Hospital not found with ID: ${id}`);
        return res.status(404).json({ message: "Hospital not found" });
      }

      return res.status(200).json(hospital);
    } catch (error) {
      console.error("Error fetching hospital by ID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


  static async getHospitalsByCategory(req: Request, res: Response) {
    try {
     
      const dto = plainToInstance(GetHospitalsByCategoryDto, req.body);
      const validationErrors: ValidationError[] = await validate(dto);
      if (validationErrors.length > 0) {
        const errors = validationErrors.map((error) => ({
          property: error.property,
          constraints: error.constraints || {},
        }));
        return res.status(400).json({
          success: false,
          message: 'Fetching hospitals by category failed',
          error: 'Invalid input data',
          validationErrors: errors,
        });
      }

      const hospitals = await HospitalService.getHospitalsByCategory(dto.categoryNames);

      return res.status(200).json(hospitals);
    } catch (error) {
      console.error("Error fetching hospitals by category:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
