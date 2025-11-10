import { useEffect, useMemo, useState } from "react"
import { Box } from "@mui/material"
import ProductCard from "../../../common/ProductCard"
import ProductSkeleton from "../../../common/ProductSkeleton"

const useItemsPerView = () => {
    const getItemsPerView = () => (window.innerWidth < 768 ? 2 : 4)
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
    const [page, setPage] = useState(0)

    useEffect(() => {
        setPage(0)
    }, [products.length, itemsPerView])

    const pages = useMemo(() => {
        if (!products.length) return [[]]
        const result = []
        for (let i = 0; i < products.length; i += itemsPerView) {
            result.push(products.slice(i, i + itemsPerView))
        }
        return result
    }, [products, itemsPerView])

    const nextPage = () => {
        setPage((prev) => (prev + 1) % pages.length)
    }

    const prevPage = () => {
        setPage((prev) => (prev - 1 + pages.length) % pages.length)
    }

    const displayProducts = pages[page] || []

    return (
        <div className="relative">
            {pages.length > 1 && (
                <>
                    <button type="button" className="carousel-arrow left" onClick={prevPage}>
                        <span className="sr-only">Prev</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button" className="carousel-arrow right" onClick={nextPage}>
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </>
            )}

            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform ease-out duration-500">
                {(isLoading ? Array.from({ length: itemsPerView }) : displayProducts).map((product, idx) => (
                    <Box key={product?.id ?? `product-${idx}`} className="flex flex-col">
                        {product ? <ProductCard product={product} isLoading={isLoading} /> : <ProductSkeleton />}
                    </Box>
                ))}
            </Box>
        </div>
    )
}

export default CarouselProducts
