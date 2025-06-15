import { BACKEND_URL } from "@/app/config";
import axios from "axios";


export async function getExistingShapes(roomId:string) {
    const res = await axios.get(`${BACKEND_URL}/shapes/${roomId}`)
    console.log(res)
    const shapes = res.data.shapes || [];

    return shapes.map((x:{shape:string})=>{
        const messageData = JSON.parse(x.shape)
        return messageData.shape
    })
}