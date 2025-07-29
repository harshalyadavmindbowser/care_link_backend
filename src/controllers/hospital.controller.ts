import { Request, Response } from "express";
import { HospitalService } from "../services/hospital.services";

export class HospitalController {
  static async createHospital(req: Request, res: Response) {
    try {
      const hospitalData = req.body;

      console.log("here", hospitalData);

      const { hospital_name, contact_info, provider_id } = req.body;

      if (!hospital_name || !contact_info || !provider_id) {
        return res
          .status(400)
          .json({
            message:
              "Required fields missing: hospital_name, contact_info, provider_id",
          });
      }

      const hospital = await HospitalService.createHospital(hospitalData);

      console.log("Hospital created successfully:", hospital);

      return res
        .status(201)
        .json({ message: "Hospital created successfully", hospital });
    } catch (error) {
      console.error("Error creating hospital:", error);

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
    try {
      const { id } = req.params;
      const hospital = await HospitalService.getHospitalById(id);

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      return res.status(200).json(hospital);
    } catch (error) {
      console.error("Error fetching hospital by ID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
