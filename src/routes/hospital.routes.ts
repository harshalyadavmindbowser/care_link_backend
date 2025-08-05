import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { HospitalController } from "../controllers/hospital.controller";
import { authentification } from "../middleware/auth.middleware";
import { authorization } from "../middleware/authorization";

const router = Router();

router.post("/", authentification, authorization(["provider"]), upload.array("images", 5), HospitalController.createHospital);
router.get("/", HospitalController.getAllHospitals);
router.get("/:id", HospitalController.getHospitalById);
router.post("/category", authentification, authorization(["patient", "provider"]), HospitalController.getHospitalsByCategory);

export default router;
