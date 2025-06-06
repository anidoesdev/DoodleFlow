import { prismaClient } from "@repo/db/database"
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, User, SigninSchema } from "@repo/common/schema"
import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"



const createUser = async(req:Request,res:Response)=>{
    const data  = User.safeParse(req.body);
    if(!data){
        throw new Error("please fill all the fields")
    }
    if (!data.data?.password) {
        throw new Error("Password is required");
    }
    const salt = await bcrypt.genSalt(11)
    const hashpassword = await bcrypt.hash(data.data.password.toString(), salt)

    try {
        const user = await prismaClient.user.create({
            data:{
                username: data.data.username,
                name: data.data.name,
                password: hashpassword
            }
        })
        res.status(201).json({
            message: "user created"
        })
    } catch (error) {
        res.status(500).json({
            message:"Invalid inputs"
        })
    }
}

const signin = async(req:Request,res:Response) => {
    const data = SigninSchema.safeParse(req.body);
    if(!data){
        res.json({
            message: "fill all the fields"
        })
    }
    const user = await prismaClient.user.findFirst({
        where:{
            username: data.data?.username
        }
    })
    if(!user){
        res.json({
            message: "User does not exist"
        })
    }
    if (!data.data?.password || !user?.password) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
    }
    try {
        const compare = await bcrypt.compare(data.data.password, user.password)
        if(compare){
            const token = jwt.sign({
                userId: user.id
            },JWT_SECRET)
            res.json({
                token,
                message: "SignIn successfull"
            })
        }
    } catch (error) {
        res.json({
            message:"Invalid Credentials"
        })
    }
   
}

const room = async(req:Request,res:Response) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data){
        res.json({
            message: "Invalid"
        })
    }
    const userId = (req as JwtPayload).userId
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: data.data?.name ?? "",
                adminId: userId
            }
        })
        res.json({
            roomId: room.id
        })
    } catch (error) {
        res.json({
            message: "Room already exists"
        })
    }
}

const draw = async(req:Request,res:Response) => {
    try {
        const roomId = Number(req.params.roomId)
        const shapes = await prismaClient.draw.findMany({
            where:{
                roomId:roomId
            },
            orderBy:{
                id: "desc"
            },
            take: 50
        })
        res.json({
            shapes
        })
    } catch (error) {
        res.json({
            shapes: []
        })
    }
}

const slug = async(req:Request,res:Response) => {
    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where:{
            slug: slug
        }
    })
    res.json({
        room
    })
}

export {createUser,signin,room,slug,draw};