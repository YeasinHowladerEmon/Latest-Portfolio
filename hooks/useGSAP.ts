'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates elements on scroll via GSAP ScrollTrigger.
 * Elements must have the class `gsap-reveal` to be targeted.
 */
export function useScrollReveal(
    containerRef: React.RefObject<HTMLElement | null>,
    options: {
        stagger?: number;
        y?: number;
        duration?: number;
        start?: string;
    } = {}
) {
    const { stagger = 0.12, y = 60, duration = 0.9, start = 'top 85%' } = options;

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const els = containerRef.current!.querySelectorAll('.gsap-reveal');
            if (els.length === 0) return;

            gsap.fromTo(
                els,
                { opacity: 0, y, willChange: 'transform, opacity' },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start,
                        once: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef, stagger, y, duration, start]);
}

/**
 * Horizontal slide-in for elements with `gsap-slide-left` or `gsap-slide-right` class.
 */
export function useHorizontalReveal(
    containerRef: React.RefObject<HTMLElement | null>
) {
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const lefts = containerRef.current!.querySelectorAll('.gsap-slide-left');
            const rights = containerRef.current!.querySelectorAll('.gsap-slide-right');

            if (lefts.length > 0) {
                gsap.fromTo(lefts,
                    { opacity: 0, x: -80, willChange: 'transform, opacity' },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }

            if (rights.length > 0) {
                gsap.fromTo(rights,
                    { opacity: 0, x: 80, willChange: 'transform, opacity' },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 80%',
                            once: true,
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef]);
}

/**
 * Scale-up reveal for cards with `gsap-scale-reveal` class.
 */
export function useScaleReveal(
    containerRef: React.RefObject<HTMLElement | null>,
    stagger = 0.08
) {
    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const els = containerRef.current!.querySelectorAll('.gsap-scale-reveal');
            if (els.length === 0) return;

            gsap.fromTo(
                els,
                { opacity: 0, scale: 0.85, y: 30, willChange: 'transform, opacity' },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.7,
                    stagger,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef, stagger]);
}

/**
 * Parallax effect — pass `speed` (positive = slower, negative = faster than scroll)
 */
export function useParallax(
    elementRef: React.RefObject<HTMLElement | null>,
    speed = 0.3
) {
    useEffect(() => {
        if (!elementRef.current) return;
        const el = elementRef.current;

        const tween = gsap.to(el, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => tween.scrollTrigger?.kill();
    }, [elementRef, speed]);
}
