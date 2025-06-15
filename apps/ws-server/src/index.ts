//web socket server
import { WebSocketServer,WebSocket } from "ws";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config"
import {prismaClient} from "@repo/db/database"

const wss = new WebSocketServer({port:8080})

interface User {
    ws: WebSocket;
    rooms: Set<string>;
    userId: string;
}
const users = new Map<WebSocket, User>()

function checkUser(token: string): string | null{
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        if(typeof decoded === 'string' || !decoded || !decoded.userId){
            return null
        }
        return decoded.userId
    } catch (error) {
        return null;
    }
}

wss.on("connection",(ws,request)=>{
    const url = request.url
    if(!url){
        ws.close();
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token')
    if(!token){
        ws.close()
        return
    }
    const userId = checkUser(token)
    if(!userId){
        ws.close()
        return
    }

    users.set(ws,{
        ws,
        rooms: new Set<string>(),
        userId
    })

    ws.on('message',async(message)=>{
        const parsedData = JSON.parse(message.toString())
        const user = users.get(ws)
        if(!user) return

        if(parsedData.type === "join_room"){
            const roomId = parsedData.roomId;
            user.rooms.add(roomId)
        }
        if(parsedData.type === "leave_room"){
            const roomId = parsedData.roomId;
            user.rooms.delete(roomId)
        }
        if(parsedData.type === "draw"){
            const roomId = parsedData.roomId
            const shape = parsedData.shape

            if (!roomId) {
                console.error("No roomId provided in draw message");
                return;
            }

            try {
                const room = await prismaClient.room.findUnique({
                    where:{
                        id: Number(roomId)
                    }
                })
                if (!room) {
                    console.error(`Room with id ${roomId} not found`);
                    return;
                }
                await prismaClient.draw.create({
                    data:{
                        shape: shape,
                        room: {
                            connect: { id: Number(roomId)}
                        },
                        user: {
                            connect: { id: userId }
                        }
                    }
                })
                users.forEach((user)=>{
                    if(user.ws.readyState===WebSocket.OPEN && user.rooms.has(roomId)){
                        user.ws.send(JSON.stringify({
                            type: "draw",
                            shape: shape
                        }))
                    }
                })
            } catch (error) {
                console.error("Error processing draw message:", error);
            }
        }
    })
    ws.on('close',()=>{
        const user = users.get(ws)
        if(user){
            users.delete(ws)
        }
    })
})