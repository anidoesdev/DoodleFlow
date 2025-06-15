"use client"

import { useEffect, useRef, useState } from "react"
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react"; 
import { IconButton } from "./IconButton";
import { Draw } from "@/draw/Draw";

export type Tool = "rect" | "circle" 


export function Canvas({roomId, socket}:{
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedTool,setSelectedTool] = useState<Tool>("circle")
    const [draw,setDraw] = useState<Draw>();

    useEffect(()=>{
        draw?.setTool(selectedTool);

    },[selectedTool,draw])
    useEffect(()=>{
        if(canvasRef.current){
            const d = new Draw(canvasRef.current,roomId,socket)
            setDraw(d);
            return()=>{
                d.destroy()
            }
        }
    },[canvasRef])
    
    return (
        <div className="h-100vh overflow-hidden">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <Navbar setSelectedTool={setSelectedTool} selectedTool={selectedTool}/>
            
        </div>
    )
}
function Navbar({selectedTool, setSelectedTool}:{
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div className="fixed top-10 left-10">
        <div className="flex gap-t">
            <IconButton onClick={()=>{
                setSelectedTool("rect")
            }} activated={selectedTool==="rect"} icon={<RectangleHorizontalIcon/>}/>

            <IconButton onClick={()=>{
                setSelectedTool("circle")
            }} activated={selectedTool==="circle"} icon={<Circle/>}/>
        </div>
    </div>
}