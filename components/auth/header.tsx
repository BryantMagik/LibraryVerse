import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { poppins } from "../ui/font";

interface HeaderProps {
    label: string
}

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold text-almond-600",
                poppins.className,
            )}>
                LibraryVerse
            </h1>
        </div>
    )
}

