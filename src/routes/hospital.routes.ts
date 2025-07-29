import { Router } from "express";
import { HospitalController } from "../controllers/hospital.controller";

const router = Router();

router.post("/", HospitalController.createHospital);
router.get("/", HospitalController.getAllHospitals);
router.get("/:id", HospitalController.getHospitalById);

export default router;
