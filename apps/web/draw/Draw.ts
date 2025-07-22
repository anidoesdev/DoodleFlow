import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shapes = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
} |
{
    type: "circle",
    x: number,
    y: number,
    radius: number
} | {
    type: "line",
    x1: number,
    y1: number,
    x2: number,
    y2: number,
} | {
    type: "diamond",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "pencil",
    points: { x: number, y: number }[]
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
    private currentPencilPoints: { x: number, y: number }[] = []
    private isPanning: boolean = false
    private panX: number = 0
    private panY: number = 0
    private lastPanX: number = 0
    private lastPanY: number = 0

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
        this.isPanning = false
        this.panX = 0
        this.panY = 0
        this.lastPanX = 0
        this.lastPanY = 0
    }
    destroy(){
        this.canvas.removeEventListener("mousedown",this.mouseDownHandler)
        this.canvas.removeEventListener("mouseup",this.mouseUpHandler)
        this.canvas.removeEventListener("mousemove",this.mouseMoveHandler)


    }
    setTool(tool: Tool){
        this.selectedTool = tool
        if (tool !== "pan") {
            this.isPanning = false;
        }
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
            this.ctx.strokeStyle = "rgba(255,255,255)"
            if(shape.type === 'rect'){
                this.ctx.beginPath()
                this.ctx.roundRect(shape.x + this.panX, shape.y + this.panY, shape.width, shape.height,10)
                this.ctx.stroke()
            }else if(shape.type === "circle"){
                this.ctx.beginPath();
                this.ctx.arc(shape.x + this.panX, shape.y + this.panY, Math.abs(shape.radius),0,Math.PI*2)
                this.ctx.stroke();
                this.ctx.closePath()
            }else if(shape.type === "line"){
                this.ctx.beginPath()
                this.ctx.moveTo(shape.x1 + this.panX, shape.y1 + this.panY)
                this.ctx.lineTo(shape.x2 + this.panX, shape.y2 + this.panY)
                this.ctx.stroke();
                this.ctx.closePath()
            }else if(shape.type === "diamond"){
                this.ctx.beginPath();
                this.ctx.moveTo(shape.x + shape.width/2 + this.panX, shape.y + this.panY); // top
                this.ctx.lineTo(shape.x + shape.width + this.panX, shape.y + shape.height/2 + this.panY); // right
                this.ctx.lineTo(shape.x + shape.width/2 + this.panX, shape.y + shape.height + this.panY); // bottom
                this.ctx.lineTo(shape.x + this.panX, shape.y + shape.height/2 + this.panY); // left
                this.ctx.closePath();
                this.ctx.stroke();
            }else if(shape.type === "pencil"){
                if (shape.points.length < 2) return;
                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x + this.panX, shape.points[0].y + this.panY);
                for (let i = 1; i < shape.points.length; i++) {
                    this.ctx.lineTo(shape.points[i].x + this.panX, shape.points[i].y + this.panY);
                }
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }
    mouseDownHandler = (e: MouseEvent) => {
        if (this.selectedTool === "pan") {
            this.isPanning = true;
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
            return;
        }
        this.clicked = true;
        this.startX = e.clientX - this.panX;
        this.startY = e.clientY - this.panY;
        if (this.selectedTool === "pencil") {
            this.currentPencilPoints = [{ x: this.startX, y: this.startY }];
        }
    }

    mouseUpHandler = (e: MouseEvent) => {
        if (this.selectedTool === "pan") {
            this.isPanning = false;
            return;
        }
        this.clicked = false;
        const width = e.clientX - this.panX - this.startX;
        const height = e.clientY - this.panY - this.startY;
        const selectedTool = this.selectedTool;
        let shape: Shapes | null = null;
        if(selectedTool === 'rect'){
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height,
                radius: 10,
            }
        } else if (selectedTool === 'circle') {
            const radius = Math.max(width,height) / 2
            shape = {
                type: "circle",
                radius: radius,
                x: this.startX + radius,
                y: this.startY + radius
            }
        }else if(selectedTool === "line"){
            shape = {
                type: "line",
                x1: this.startX,
                y1: this.startY,
                x2: e.clientX - this.panX,
                y2: e.clientY - this.panY
            }
        }else if(selectedTool === "diamond"){
            shape = {
                type: "diamond",
                x: this.startX,
                y: this.startY,
                width,
                height
            }
        }else if(selectedTool === "pencil"){
            if (this.currentPencilPoints.length > 1) {
                shape = {
                    type: "pencil",
                    points: [...this.currentPencilPoints]
                }
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
        this.currentPencilPoints = [];
    }
    mouseMoveHandler = (e: MouseEvent) => {
        if (this.selectedTool === "pan" && this.isPanning) {
            const dx = e.clientX - this.lastPanX;
            const dy = e.clientY - this.lastPanY;
            this.panX += dx;
            this.panY += dy;
            this.lastPanX = e.clientX;
            this.lastPanY = e.clientY;
            this.clearCanvas();
            return;
        }
        if(this.clicked){
            const width = e.clientX - this.panX - this.startX;
            const height = e.clientY - this.panY - this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255,255,255)";
            const selectedTool = this.selectedTool;
            if(selectedTool==="rect"){
                this.ctx.beginPath()
                this.ctx.roundRect(this.startX + this.panX, this.startY + this.panY, width, height,10);
                this.ctx.stroke()
            } else if(selectedTool==="circle"){
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius + this.panX;
                const centerY = this.startY + radius + this.panY;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();      
            }else if(selectedTool==="line"){
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX + this.panX, this.startY + this.panY);
                this.ctx.lineTo(e.clientX, e.clientY);
                this.ctx.stroke();
                this.ctx.closePath();
            }else if(selectedTool==="diamond"){
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX + width/2 + this.panX, this.startY + this.panY); // top
                this.ctx.lineTo(this.startX + width + this.panX, this.startY + height/2 + this.panY); // right
                this.ctx.lineTo(this.startX + width/2 + this.panX, this.startY + height + this.panY); // bottom
                this.ctx.lineTo(this.startX + this.panX, this.startY + height/2 + this.panY); // left
                this.ctx.closePath();
                this.ctx.stroke();
            }else if(selectedTool==="pencil"){
                const newPoint = { x: e.clientX - this.panX, y: e.clientY - this.panY };
                this.currentPencilPoints.push(newPoint);
                this.ctx.beginPath();
                this.ctx.moveTo(this.currentPencilPoints[0].x + this.panX, this.currentPencilPoints[0].y + this.panY);
                for (let i = 1; i < this.currentPencilPoints.length; i++) {
                    this.ctx.lineTo(this.currentPencilPoints[i].x + this.panX, this.currentPencilPoints[i].y + this.panY);
                }
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