import { Router } from "express";
import * as categoryController from "../controllers/category.controller";

const router = Router();

router.post("/add", categoryController.newCategory);
router.get("/", categoryController.getCategories);

export default router;
