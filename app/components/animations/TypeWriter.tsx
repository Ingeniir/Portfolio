"use client";

import TypeWriter from 'typewriter-effect';

interface Props {
    text: string[];
}

export const TypeWriterComponent = ({ text} : Props) => {

    return (
        <div className={"text-4xl sm:text-5xl md:text-7xl font-bold}"}>
            <TypeWriter
                options={{
                    strings: text,
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                }}
            />
        </div>
    )
}