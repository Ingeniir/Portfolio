"use client";

import TypeWriter from 'typewriter-effect';

interface Props {
    text: string[];
    size?: number;
    color?: string;
    delay?: number;
    deleteSpeed?: number;
}

export const TypeWriterComponent = ({ text, size=30, color, delay = 75, deleteSpeed = 50 } : Props) => {

    return (
        <div className={`text-[${size }px] text-[${color}] font-bold`}>
            <TypeWriter
                options={{
                    strings: text,
                    autoStart: true,
                    loop: true,
                    delay: delay,
                    deleteSpeed: deleteSpeed,
                }}
            />
        </div>
    )
}