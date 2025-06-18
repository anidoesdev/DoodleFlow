"use client"

import { useEffect, useRef, useState } from "react"
import { Circle, Pencil, RectangleHorizontalIcon, Minus, Diamond, Hand} from "lucide-react"; 
import { IconButton } from "./IconButton";
import { Draw } from "@/draw/Draw";

export type Tool = "rect" | "circle" | "line" | "diamond" | "pencil" | "pan"


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
    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-2">
            <div className="flex flex-row justify-between items-center space-x-2 px-4 py-2 rounded-full shadow-2xl border border-white/10 bg-black/60 backdrop-blur">
                <IconButton onClick={()=>{
                    setSelectedTool("rect")
                }} activated={selectedTool==="rect"} icon={<RectangleHorizontalIcon/>}/>

                <IconButton onClick={()=>{
                    setSelectedTool("circle")
                }} activated={selectedTool==="circle"} icon={<Circle/>}/>

                <IconButton onClick={()=>{
                    setSelectedTool("line")
                }} activated={selectedTool==="line"} icon={<Minus/>}/>

                <IconButton onClick={()=>{
                    setSelectedTool("diamond")
                }} activated={selectedTool==="diamond"} icon={<Diamond/>}/>

                <IconButton onClick={()=>{
                    setSelectedTool("pencil")
                }} activated={selectedTool==="pencil"} icon={<Pencil/>}/>

                <IconButton onClick={()=>{
                    setSelectedTool("pan")
                }} activated={selectedTool==="pan"} icon={<Hand/>}/>
            </div>
        </div>
    )
}