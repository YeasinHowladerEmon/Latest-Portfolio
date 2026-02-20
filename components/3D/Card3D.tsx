'use client'

import { useRef } from 'react'

interface Card3DProps {
    children: React.ReactNode
    intensity?: number
}

export function Card3DEffect({ children, intensity = 15 }: Card3DProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const card = cardRef.current
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * intensity
        const rotateY = ((centerX - x) / centerX) * intensity

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

        // Update Spotlight variable
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }

    const handleMouseLeave = () => {
        if (!cardRef.current) return
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d',
            }}
            className="relative group/card"
        >
            {/* Spotlight overlay */}
            <div
                className="absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                style={{
                    background: `radial-gradient(
                        800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
                        rgba(255, 255, 255, 0.1),
                        transparent 40%
                    )`
                }}
            />
            {children}
        </div>
    )
}
