import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { HospitalController } from "../controllers/hospital.controller";

const router = Router();

router.post("/", upload.array("images", 5), HospitalController.createHospital);
router.get("/", HospitalController.getAllHospitals);
router.get("/:id", HospitalController.getHospitalById);

export default router;
