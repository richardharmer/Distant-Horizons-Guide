'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ImageSliderProps {
    beforeSrc: string;
    afterSrc: string;
    beforeLabel?: string;
    afterLabel?: string;
}

export default function ImageSlider({
    beforeSrc,
    afterSrc,
    beforeLabel = 'Vanilla 16 Chunks',
    afterLabel = 'DH 512 Chunks',
}: ImageSliderProps) {
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateSliderPos = useCallback(
        (clientX: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setSliderPos(percentage);
        },
        []
    );

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setIsDragging(true);
            updateSliderPos(e.clientX);
        },
        [updateSliderPos]
    );

    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            setIsDragging(true);
            updateSliderPos(e.touches[0].clientX);
        },
        [updateSliderPos]
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) updateSliderPos(e.clientX);
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) updateSliderPos(e.touches[0].clientX);
        };
        const handleUp = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isDragging, updateSliderPos]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none group shadow-2xl shadow-black/50"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* After image (full width, behind) */}
            <img
                src={afterSrc}
                alt="Minecraft with Distant Horizons - extended view distance"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
            />

            {/* Before image (clipped using clip-path for reliable rendering) */}
            <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <img
                    src={beforeSrc}
                    alt="Vanilla Minecraft - limited view distance"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
            </div>

            {/* Slider line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-10"
                style={{ left: `${sliderPos}%` }}
            >
                {/* Slider handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white shadow-xl flex items-center justify-center gap-0.5 transition-transform group-hover:scale-110">
                    <svg width="6" height="14" viewBox="0 0 6 14" fill="none" className="opacity-60">
                        <path d="M1 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M5 1L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                    {beforeLabel}
                </span>
            </div>
            <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                    {afterLabel}
                </span>
            </div>

            {/* Instruction overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-70 group-hover:opacity-0 transition-opacity duration-300">
                <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    ← Drag to compare →
                </span>
            </div>
        </div>
    );
}
