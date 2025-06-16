import { RoomCanvas } from "@/components/RoomCanvas";
import { BACKEND_URL } from "@/app/config";

async function getRoomId(slug: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/room/${slug}`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data.room?.id;
    } catch (error) {
        console.error('Error fetching room:', error);
        return null;
    }
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RoomPage({ params }: PageProps) {
    const { slug } = await params;
    const roomId = await getRoomId(slug);
    
    if (!roomId) {
       return;
    }

    return <>
        <RoomCanvas roomId={roomId}/>
    </>
}