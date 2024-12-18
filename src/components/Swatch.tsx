import { cn } from "@/lib/utils";

interface SwatchProps {
    color: string;
    isSelected: boolean;
    onClick: () => void;
}

const Swatch = ({ color, isSelected, onClick }: SwatchProps) => {
    return (
        <div
            className={cn(
                `z-20 w-8 h-8 rounded-full cursor-pointer border-2`,
                isSelected ? "border-black" : "border-transparent",
            )}
            style={{ backgroundColor: color }}
            onClick={() => onClick()}
        />
    );
}

export default Swatch;