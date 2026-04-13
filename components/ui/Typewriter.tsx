'use client';

import TypewriterComponent from 'typewriter-effect';

interface TypewriterProps {
    strings: string[];
    className?: string;
    wrapperClassName?: string;
    cursorClassName?: string;
    delay?: number;
    deleteSpeed?: number;
}

export function Typewriter({
    strings,
    className = "text-lime-400 font-bold",
    wrapperClassName = "typewriter-wrapper",
    cursorClassName = "typewriter-cursor text-fuchsia-500",
    delay = 75,
    deleteSpeed = 50
}: TypewriterProps) {
    return (
        <span className={className}>
            <TypewriterComponent
                options={{
                    strings,
                    autoStart: true,
                    loop: true,
                    delay,
                    deleteSpeed,
                    wrapperClassName,
                    cursorClassName,
                }}
            />
        </span>
    );
}
