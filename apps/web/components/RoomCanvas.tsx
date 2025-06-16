"use client"

import { useEffect, useState, useRef } from "react"
import {Canvas} from "./Canvas"
import { WS_URL } from "@/app/config"


export function RoomCanvas({roomId}:{roomId: string}){
    const [socket,setSocket] = useState<WebSocket | null>(null)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () =>{
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            })
            console.log(data)
            ws.send(data)
        }
    },[])
    if(!socket){
        return <div className="text-white">
            Connecting to server
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket}/>
    </div>



}