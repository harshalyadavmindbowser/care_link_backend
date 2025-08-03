import { Request, Response } from "express";
import { HospitalService } from "../services/hospital.services";

export class HospitalController {
  static async createHospital(req: Request, res: Response) {
    console.log("post-createHospital called",req.body.provider_id);

    try {
      if (!req.body) {
        console.warn(" Missing data field in form data");
        return res.status(400).json({ message: "Missing data field in form data" });
      }

      console.log("Raw req.body.data:", req.body); //parsing json data from multipart form-data field
      // const data = JSON.parse(req.body);
      // console.log("dataddddd",data);
      
      const files = req.files as Express.Multer.File[] || [];

      const hospital = await HospitalService.createHospitalWithRelations(req.body, files);

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
}
