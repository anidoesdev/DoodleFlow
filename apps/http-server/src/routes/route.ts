import express, { Router } from "express"
import { createUser, draw, room, signin, slug } from "../controllers/userController";
import { Authenticate } from "../middlewares/authmiddleware";

const router:Router = express.Router();

router.post('/signup',createUser)
router.post('/signin',signin)
router.post('/room',Authenticate,room)
router.get('/shapes/:roomId',draw)
router.get('/room/:slug',slug)


export default router;