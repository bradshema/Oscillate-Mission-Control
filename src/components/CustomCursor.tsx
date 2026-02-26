'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const cursorOutlineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cursorDotRef.current || !cursorOutlineRef.current) return

        // Set up GSAP quickSetters for high performance 60fps tracking
        const xDotTo = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.1, ease: "power3" })
        const yDotTo = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.1, ease: "power3" })

        const xOutlineTo = gsap.quickTo(cursorOutlineRef.current, "x", { duration: 0.3, ease: "power3" })
        const yOutlineTo = gsap.quickTo(cursorOutlineRef.current, "y", { duration: 0.3, ease: "power3" })

        let isHovering = false

        // Mouse Move Event Listener
        const onMouseMove = (e: MouseEvent) => {
            xDotTo(e.clientX)
            yDotTo(e.clientY)
            xOutlineTo(e.clientX)
            yOutlineTo(e.clientY)
        }

        // Custom Magnetic / Hover Logic
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Trigger hover state if it's a link, button, or explicitly has cursor-pointer
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'grab'
            ) {
                isHovering = true
                gsap.to(cursorOutlineRef.current, {
                    scale: 2.5,
                    opacity: 0.1,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    duration: 0.3,
                    ease: "power2.out"
                })
                gsap.to(cursorDotRef.current, {
                    scale: 0,
                    duration: 0.2
                })
            }
        }

        const onMouseOut = () => {
            if (isHovering) {
                isHovering = false
                gsap.to(cursorOutlineRef.current, {
                    scale: 1,
                    opacity: 0.5,
                    backgroundColor: 'transparent',
                    duration: 0.3,
                    ease: "power2.out"
                })
                gsap.to(cursorDotRef.current, {
                    scale: 1,
                    duration: 0.2
                })
            }
        }

        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)
        document.addEventListener('mouseout', onMouseOut)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', onMouseOver)
            document.removeEventListener('mouseout', onMouseOut)
        }
    }, [])

    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
            />
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
            />
        </>
    )
}
