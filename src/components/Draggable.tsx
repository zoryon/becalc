"use client";

import React, { useState } from "react";

interface DraggableProps {
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    onStop?: (e: MouseEvent, data: { x: number; y: number }) => void;
}

const Draggable: React.FC<DraggableProps> = ({
    children,
    defaultPosition = { x: 0, y: 0 },
    onStop,
}) => {
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const newPosition = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };

        setPosition(newPosition);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (isDragging && onStop) {
            onStop(e as unknown as MouseEvent, position);
        }
        setIsDragging(false);
    };

    return (
        <div
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                cursor: "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {children}
        </div>
    );
};

export default Draggable;
