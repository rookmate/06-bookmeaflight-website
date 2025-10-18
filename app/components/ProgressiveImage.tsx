"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface ProgressiveImageProps {
    src: string
    alt: string
    priority?: boolean
    sizes?: string
    className?: string
}

export default function ProgressiveImage({
    src,
    alt,
    priority = false,
    sizes,
    className = "object-cover"
}: ProgressiveImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(priority)
    const [hasError, setHasError] = useState(false)
    const imgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // If priority is true, load immediately
        if (priority) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px' // Start loading 50px before image enters viewport
            }
        )

        if (imgRef.current) {
            observer.observe(imgRef.current)
        }

        return () => observer.disconnect()
    }, [priority])

    const handleLoad = () => {
        setIsLoaded(true)
    }

    const handleError = () => {
        setHasError(true)
        setIsLoaded(true) // Stop loading state even on error
    }

    return (
        <div
            ref={imgRef}
            className="aspect-square relative overflow-hidden rounded-lg bg-gray-200"
        >
            {/* Loading placeholder */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-400 text-sm text-center p-2">
                        <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded flex items-center justify-center">
                            <span className="text-xs">📷</span>
                        </div>
                        <div>Image unavailable</div>
                    </div>
                </div>
            )}

            {/* Actual image */}
            {isInView && !hasError && (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    sizes={sizes || "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"}
                    onLoad={handleLoad}
                    onError={handleError}
                    priority={priority}
                />
            )}
        </div>
    )
}
