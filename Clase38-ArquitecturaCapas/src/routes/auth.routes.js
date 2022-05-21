import { Router } from "express";
import passport from "passport";
import multer from "multer";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();
const uploadAvatar = multer({ dest: "public/assets/uploads/" });

router.post("/signup", [uploadAvatar.single("file")], authCtrl.signUp);

// login with passport
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/succesredirect",
    failureRedirect: "/",
  })
);

router.get("/succesredirect", authCtrl.succesredirect);
router.get("/logout", authCtrl.signOut);
router.get("/register", (req, res) => {
  res.render("register");
});

export default router;
