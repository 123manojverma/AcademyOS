import { Router } from "express";
import { logoutController, signinController, signupController } from "../../controllers/user.controller";
import { authMiddleWare } from "../../middlewares/auth.middleware";

const router=Router();

router.post('/signup',signupController);
router.post('/signin',signinController);
router.get('/logout',authMiddleWare,logoutController);

export default router;