import { ReactNode } from "react"

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return (
        <button
            className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-150
                ${activated ? "bg-teal-600/90 text-white shadow-lg" : "bg-gray-800/80 text-gray-200"}
                hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-teal-400`}
            onClick={onClick}
            aria-pressed={activated}
            tabIndex={0}
        >
            {icon}
        </button>
    )
}