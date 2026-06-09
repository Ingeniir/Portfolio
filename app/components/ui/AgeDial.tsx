"use client";

import { useEffect, useState } from "react";

export default function AgeDialMinimal() {
    const startAge = 15;
    const date = new Date();
    const bornDate = 2005;
    const targetAge = date.getFullYear() - bornDate;
    const minAge = 14;
    const maxAge = 28;

    const [currentAge, setCurrentAge] = useState(startAge);

    useEffect(() => {
        const delay = setTimeout(() => {
            const interval = setInterval(() => {
                setCurrentAge((prev) => {
                    if (prev < targetAge) return prev + 1;
                    clearInterval(interval);
                    return prev;
                });
            }, 200); // 200ms par année

            return () => clearInterval(interval);
        }, 400);

        return () => clearTimeout(delay);
    }, []);

    const itemWidth = 24;
    const containerCenter = 80;
    const targetPosition = containerCenter - (itemWidth / 2); // 68px
    const translateX = targetPosition - (currentAge - minAge) * itemWidth;

    const ages = Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i);

    return (
        <div className="flex flex-col items-center justify-center w-40 mx-auto select-none font-sans">

            <span className="text-xl font-bold text-black dark:text-white mb-2 tracking-tight">
                {currentAge} ans
            </span>

            <div className="relative w-full h-8 overflow-hidden flex items-center justify-start [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">

                <div
                    className="flex items-center h-full transition-transform duration-200 ease-out"
                    style={{ transform: `translateX(${translateX}px)` }}
                >
                    {ages.map((age) => {
                        const distance = Math.abs(age - currentAge);
                        const isCenter = age === currentAge;
                        
                        const opacity = Math.max(0.1, 1 - distance * 0.25);
                        const scaleY = isCenter ? 1 : Math.max(0.5, 1 - distance * 0.15);

                        return (
                            <div
                                key={age}
                                className="w-6 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                style={{
                                    opacity: opacity,
                                    transform: `scaleY(${scaleY})`,
                                }}
                            >
                                <div
                                    className={`w-1 h-5 rounded-full transition-colors duration-200 ${
                                        isCenter ? "bg-black dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700"
                                    }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}