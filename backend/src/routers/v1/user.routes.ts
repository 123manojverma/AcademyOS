import { Router } from "express";
import { logoutController, signinController, signupController } from "../../controllers/user.controller";

const router=Router();

router.post('/signup',signupController);
router.post('/signin',signinController);
router.get('/logout',logoutController);

export default router;