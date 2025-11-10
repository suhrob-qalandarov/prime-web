import { useState, useEffect } from "react"
import ProductSkeleton from "./ProductSkeleton"

const ImageWithSkeleton = ({ src, alt, containerClassName = "", imgClassName = "", style, delay = 500, onLoad }) => {
    const [loaded, setLoaded] = useState(false)
    const [showImage, setShowImage] = useState(false)

    useEffect(() => {
        setLoaded(false)
        setShowImage(false)
    }, [src])

    useEffect(() => {
        if (!loaded) return
        const timeout = setTimeout(() => setShowImage(true), delay)
        return () => clearTimeout(timeout)
    }, [loaded, delay])

    const handleLoad = () => {
        setLoaded(true)
        if (onLoad) {
            onLoad()
        }
    }

    return (
        <div className={`relative overflow-hidden bg-[#f5f5f5] ${containerClassName}`} style={style}>
            {!showImage && <ProductSkeleton overlay />}
            <img
                src={src}
                alt={alt}
                className={`transition-opacity duration-700 ${showImage ? "opacity-100" : "opacity-0"} ${imgClassName}`}
                onLoad={handleLoad}
            />
        </div>
    )
}

export default ImageWithSkeleton
