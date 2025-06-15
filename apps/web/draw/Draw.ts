import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shapes = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} |
 {
    type: "circle",
    x: number,
    y: number,
    radius: number
} 


export class Draw {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D
    private existingShapes: Shapes[]
    private roomId: string
    private clicked: boolean
    private startX = 0
    private startY = 0
    private selectedTool: Tool = "circle"

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string,socket: WebSocket){
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = []
        this.roomId = roomId
        this.socket = socket
        this.clicked = false
        this.init()
        this.initHandlers();
        this.initMouseHandlers()

    }
    destroy(){
        this.canvas.removeEventListener("mousedown",this.mouseDownHandler)
        this.canvas.removeEventListener("mouseup",this.mouseUpHandler)
        this.canvas.removeEventListener("mousemove",this.mouseMoveHandler)


    }
    setTool(tool: "circle"|"rect"){
        this.selectedTool = tool
    }

    async init(){
        this.existingShapes = await getExistingShapes(this.roomId)
        console.log(this.existingShapes)
        this.clearCanvas()
    }
    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data)

            if(message.type == "draw"){
                const parsedShape = JSON.parse(message.shape)
                this.existingShapes.push(parsedShape.shape)
                this.clearCanvas()
            }
        }
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)

        this.existingShapes.map((shape)=>{
            if(shape.type === 'rect'){
                this.ctx.strokeStyle = "rgba(255,255,255)"
                this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
            }else if(shape.type === "circle"){
                this.ctx.beginPath();
                this.ctx.arc(shape.x,shape.y,Math.abs(shape.radius),0,Math.PI*2)
                this.ctx.stroke();
                this.ctx.closePath()
            }
        })
    }
    mouseDownHandler = (e:MouseEvent) => {
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY
    }

    mouseUpHandler = (e:MouseEvent) => {
        this.clicked = false
        const width = e.clientX - this.startX
        const height = e.clientY - this.startY

        const selectedTool = this.selectedTool

        let shape: Shapes | null = null
        if(selectedTool === 'rect'){
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        } else if (selectedTool === 'circle') {
            const radius = Math.max(width,height) / 2
            shape = {
                type: "circle",
                radius: radius,
                x: this.startX + radius,
                y: this.startY + radius
            }
        }
        if(!shape){
            return;
        }

        this.existingShapes.push(shape)
        this.socket.send(JSON.stringify({
            type:"draw",
            shape: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))
         
    }
    mouseMoveHandler = (e:MouseEvent) =>{
        if(this.clicked){
            const width = e.clientX - this.startX
            const height = e.clientY - this.startY

            this.clearCanvas()
            this.ctx.strokeStyle = "rgba(255,255,255)"
            const selectedTool = this.selectedTool
            if(selectedTool==="rect"){
                this.ctx.strokeRect(this.startX,this.startY,width,height)
            } else if(selectedTool==="circle"){
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();      
            }
        }
    }

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown",this.mouseDownHandler)
        this.canvas.addEventListener("mouseup", this.mouseUpHandler)
        this.canvas.addEventListener("mousemove",this.mouseMoveHandler)
    } 
    
}

// export function rect(canvas: HTMLCanvasElement) {
//     const ctx = canvas.getContext("2d")

//     if (!ctx) {
//         return
//     }

//     canvas.addEventListener("mousedown", (e) => {
//         clicked = true
//         startX = e.clientX
//         startY = e.clientY
//     })
// //     canvas.addEventListener("mouseup", (e) => {
// //         clicked = false
// //         const width = e.clientX - startX;
// //         const height = e.clientY - startY;
// //         shapes.push([{
// //             type: "rect",
// //             x: startX,
// //             y: startY,
// //             height: height,
// //             width: width
// //         }])
// //         redrawAllShapes(canvas, ctx);
// //     })
//     //  canvas.addEventListener("mousemove", (e) => {
// //         if (clicked) {
// //             const width = e.clientX - startX;
// //             const height = e.clientY - startY
// //             clearCanvas(shapes, canvas, ctx)
// //             ctx.strokeStyle = "rgba(255,255,255)"
// //             ctx.strokeRect(startX, startY, width, height)
// //         }
// //     })
// // }

// // export function circle(canvas: HTMLCanvasElement) {
// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     canvas.addEventListener("mousedown", (e) => {
// //         clicked = true;
// //         startX = e.clientX;
// //         startY = e.clientY;
// //     });

// //     canvas.addEventListener("mouseup", (e) => {
// //         if (!clicked) return;
        
// //         const radius = Math.sqrt(
// //             Math.pow(e.clientX - startX, 2) + 
// //             Math.pow(e.clientY - startY, 2)
// //         );

// //         shapes.push([{
// //             type: "circle",
// //             x: startX,
// //             y: startY,
// //             radius
// //         }]);

// //         clicked = false;
// //         redrawAllShapes(canvas, ctx);
// //     });

// //     canvas.addEventListener("mousemove", (e) => {
// //         if (!clicked) return;

// //         const radius = Math.sqrt(
// //             Math.pow(e.clientX - startX, 2) + 
// //             Math.pow(e.clientY - startY, 2)
// //         );

// //         clearCanvas(shapes, canvas, ctx);
// //         ctx.beginPath();
// //         ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
// //         ctx.strokeStyle = "rgba(255,255,255)";
// //         ctx.lineWidth = 3;
// //         ctx.stroke();
// //     });
// // }

// // function clearCanvas(shapes: Shapes[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     ctx.fillStyle = "black";
// //     ctx.fillRect(0, 0, canvas.width, canvas.height);
// //     shapes.forEach((shape) => {
// //         if (shape[0].type === "rect") {
// //             ctx.strokeStyle = "rgba(255,255,255)";
// //             ctx.strokeRect(shape[0].x, shape[0].y, shape[0].width, shape[0].height);
// //         } else if (shape[0].type === "circle") {
// //             ctx.beginPath();
// //             ctx.arc(shape[0].x, shape[0].y, shape[0].radius, 0, 2 * Math.PI);
// //             ctx.strokeStyle = "rgba(255,255,255)";
// //             ctx.lineWidth = 3;
// //             ctx.stroke();
// //         }
// //     });
// // }

// // function redrawAllShapes(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
// //     clearCanvas(shapes, canvas, ctx);
// }