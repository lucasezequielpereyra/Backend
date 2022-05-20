import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.post("/add", productController.newProduct);
router.get("/", productController.getProducts);

export default router;
