"use client";

import TypeWriter from 'typewriter-effect';

interface Props {
    text: string[];
    size?: number;
    color?: string;
    delay?: number;
    deleteSpeed?: number;
}

export const TypeWriterComponent = ({ text, size=10, color, delay = 75, deleteSpeed = 50 } : Props) => {

    return (
        <div style={{ fontSize: size, color: color }}>
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