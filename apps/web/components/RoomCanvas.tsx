"use client"

import { useEffect, useState, useRef } from "react"
import {Canvas} from "./Canvas"
import { WS_URL } from "@/app/config"


export function RoomCanvas({roomId}:{roomId: string}){
    const [socket,setSocket] = useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZTQ5MDhlYS1hZDVhLTQ1ZTItOWJkZS0xNmVmNjc4NTRhMWUiLCJpYXQiOjE3NDk4OTQxMDN9.yeGo65m1M9O_0vXF7_XYzSMkCYrrYsehprz79VboK6s`)

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