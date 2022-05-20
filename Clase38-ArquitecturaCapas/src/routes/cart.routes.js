import { Router } from "express";
import * as cartController from "../controllers/cart.controller";

const router = Router();

router.get("/buy", cartController.getCart);
router.post("/add", cartController.newCart);
router.get("/checkout", cartController.checkoutCart);
router.get("/delete", cartController.deleteCart);
router.post("/succes", cartController.success);

export default router;
