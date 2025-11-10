import { useEffect, useMemo, useState } from "react"
import { Box } from "@mui/material"
import ProductCard from "../../../common/ProductCard"
import ProductSkeleton from "../../../common/ProductSkeleton"

const useItemsPerView = () => {
    const getItemsPerView = () => {
        const width = window.innerWidth
        if (width < 640) return 2
        if (width < 1024) return 3
        return 4
    }

    const [itemsPerView, setItemsPerView] = useState(getItemsPerView)

    useEffect(() => {
        const handler = () => setItemsPerView(getItemsPerView())
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    return itemsPerView
}

const CarouselProducts = ({ products = [], isLoading = false }) => {
    const itemsPerView = useItemsPerView()
    const totalItems = products.length
    const [index, setIndex] = useState(0)
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
        setIndex(0)
        setAnimationKey((prev) => prev + 1)
    }, [totalItems, itemsPerView])

    const showArrows = totalItems > itemsPerView

    const visibleProducts = useMemo(() => {
        if (!totalItems) {
            return []
        }
        return Array.from({ length: itemsPerView }).map((_, idx) => {
            const absoluteIndex = (index + idx) % totalItems
            return products[absoluteIndex]
        })
    }, [products, index, itemsPerView, totalItems])

    const handleNext = () => {
        if (!totalItems) return
        setIndex((prev) => (prev + 1) % totalItems)
        setAnimationKey((prev) => prev + 1)
    }

    const handlePrev = () => {
        if (!totalItems) return
        setIndex((prev) => (prev - 1 + totalItems) % totalItems)
        setAnimationKey((prev) => prev + 1)
    }

    return (
        <div className="relative -ml-3">
            {showArrows && (
                <>
                    <button type="button" className="carousel-arrow left" onClick={handlePrev}>
                        <span className="sr-only">Prev</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button" className="carousel-arrow right" onClick={handleNext}>
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </>
            )}

            <Box
                key={animationKey}
                className="carousel-grid carousel-fade"
                sx={{ "--columns": itemsPerView }}
            >
                {isLoading && !products.length
                    ? Array.from({ length: itemsPerView }).map((_, idx) => (
                          <Box key={`skeleton-${idx}`} className="carousel-card">
                              <ProductSkeleton />
                          </Box>
                      ))
                    : visibleProducts.map((product, idx) => (
                          <Box key={product?.id ?? `product-${idx}`} className="carousel-card">
                              <ProductCard product={product} />
                          </Box>
                      ))}
            </Box>
        </div>
    )
}

export default CarouselProducts
