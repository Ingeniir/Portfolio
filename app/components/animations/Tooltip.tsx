"use client";

import React, { useState, useEffect, useRef } from "react";

interface TooltipProps {
    message: string | React.ReactNode;
    children: React.ReactNode;
    minus: number
}

export default function Tooltip({message, children, minus}: TooltipProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const childRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && childRef.current) {
            const element = childRef.current;
            const rect = element.getBoundingClientRect();

            setPosition({
                y: rect.top - minus,
                x: rect.left + rect.width / 2,
            });
        }
    }, [isVisible]);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <>
            <div
                ref={childRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={"inline-block"}
            >
                {children}
            </div>

            {isVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: position.y,
                        left: position.x,
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                    }}
                    className={"bg-white text-foreground text-sm px-4 py-2 max-h-80 max-w-80 rounded-lg shadow-lg break-word pointer-events-none"}
                >
                    {message}
                </div>
            )}
        </>
    )
}