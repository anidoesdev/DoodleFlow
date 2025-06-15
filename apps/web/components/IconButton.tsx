import { ReactNode } from "react"

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`m-2 pointer rounded border p-2 bg-gray-700 hover:bg-gray ${activated ? "text-white" : "text-black"}`} onClick={onClick}>
        {icon}
    </div>
}