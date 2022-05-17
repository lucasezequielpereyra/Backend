import { Router } from "express";
import multer from "multer";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();
const uploadAvatar = multer({ dest: "public/assets/uploads/" });

router.post("/signup", [uploadAvatar.single("file")], authCtrl.signUp);
router.post("/login", authCtrl.login);

export default router;
