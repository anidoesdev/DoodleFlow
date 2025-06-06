import express, { Router } from "express"
import { createUser, draw, room, signin, slug } from "../controllers/userController";

const router:Router = express.Router();

router.post('/signup',createUser)
router.post('/signin',signin)
router.post('/room',room)
router.get('/shapes/:roomId',draw)
router.get('/room/:slug',slug)


export default router;