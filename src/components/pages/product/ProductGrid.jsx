import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import ProductCard from "../../common/ProductCard"
import ProductSkeleton from "../../common/ProductSkeleton"
import QuickViewModal from "./modal/quick-view"
import ProductFilters from "./ProductFilters"
import { mockProducts } from "../../../mock/products"

const ProductGrid = ({ selectedCategory }) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [quickViewOpen, setQuickViewOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null)
    
    // Filter states
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedSort, setSelectedSort] = useState("default")
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    
    const itemsPerPage = 20

    useEffect(() => {
        // Simulate loading delay
        setLoading(true)
        const timer = setTimeout(() => {
            // Use mock data directly
            setProducts(mockProducts)
            setPage(1)
            setLoading(false)
        }, 300) // Small delay to simulate API call

        return () => clearTimeout(timer)
    }, [selectedCategory])

    // Transform products for QuickView modal
    const productsForQuickView = useMemo(() => {
        return products.map((product) => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            categoryName: product.category,
            color: product.color,
            price: product.originalPrice || product.price,
            discount: product.discount || 0,
            status: product.tag,
            attachmentKeys: product.images,
            description: product.description || `${product.name} - ${product.brand} mahsuloti. Yuqori sifatli materialdan tayyorlangan.`,
            productSizes: product.sizes || [
                { size: "S", amount: 10 },
                { size: "M", amount: 15 },
                { size: "L", amount: 12 },
                { size: "XL", amount: 8 },
            ],
        }))
    }, [products])

    // Transform products for display and filter
    const transformedProducts = useMemo(() => {
        return products.map((product) => {
            const hasDiscount = product.tag === "SALE" && product.discount > 0
            return {
                id: product.id,
                name: product.name,
                brand: product.brand,
                categoryName: product.category,
                color: product.color,
                price: product.price,
                oldPrice: hasDiscount ? product.originalPrice : null,
                discount: product.discount || 0,
                image: product.images?.[0],
                images: product.images,
                badge: product.tag,
                marqueeDiscount: product.discount || 0,
                status: product.tag,
            }
        })
    }, [products])

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...transformedProducts]

        // Filter by status
        if (selectedStatus) {
            filtered = filtered.filter(product => {
                if (selectedStatus === "Sale") return product.tag === "SALE" || product.discount > 0
                if (selectedStatus === "New") return product.tag === "NEW"
                if (selectedStatus === "Hot") return product.tag === "HOT"
                return true
            })
        }

        // Filter by colors
        if (selectedColors.length > 0) {
            filtered = filtered.filter(product => 
                product.color && selectedColors.includes(product.color)
            )
        }

        // Sort products
        if (selectedSort === "discount") {
            filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        } else if (selectedSort === "price-low") {
            filtered.sort((a, b) => a.price - b.price)
        } else if (selectedSort === "price-high") {
            filtered.sort((a, b) => b.price - a.price)
        }

        return filtered
    }, [transformedProducts, selectedStatus, selectedSort, selectedColors, selectedSizes])

    // Reset page when filters change
    useEffect(() => {
        setPage(1)
    }, [selectedStatus, selectedSort, selectedColors, selectedSizes])

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

    const handlePageChange = (newPage) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleQuickView = (productId) => {
        setSelectedProductId(productId)
        setQuickViewOpen(true)
    }

    const handleProductClick = (productId) => {
        navigate(`/product?id=${productId}`)
    }

    return (
        <div className="w-full px-6 lg:px-[200px] py-6 md:py-10">
            <QuickViewModal
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
                productId={selectedProductId}
                products={productsForQuickView}
            />

            {/* Filters Section */}
            <ProductFilters
                totalProducts={loading ? 0 : filteredProducts.length}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
                selectedColors={selectedColors}
                onColorChange={setSelectedColors}
                selectedSizes={selectedSizes}
                onSizeChange={setSelectedSizes}
            />

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <ProductSkeleton key={idx} />
                    ))}
                </div>
            ) : filteredProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {paginatedProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                                className="cursor-pointer"
                            >
                                <ProductCard product={product} onQuickView={handleQuickView} />
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 md:mt-12">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-transparent"
                                >
                                    Prev
                                </button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter((pageNum) => {
                                            if (totalPages <= 7) return true
                                            if (pageNum === 1 || pageNum === totalPages) return true
                                            if (Math.abs(pageNum - page) <= 1) return true
                                            return false
                                        })
                                        .map((pageNum, idx, arr) => {
                                            const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1
                                            return (
                                                <div key={pageNum} className="flex items-center gap-1">
                                                    {showEllipsis && (
                                                        <span className="px-2 text-gray-500">...</span>
                                                    )}
                                                    <button
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                                            page === pageNum
                                                                ? "bg-[#6b0f2a] text-white hover:bg-[#5a0a22]"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                </div>
                                            )
                                        })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 disabled:hover:bg-transparent"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12 md:py-16">
                    <div className="text-6xl md:text-8xl mb-4 md:mb-6">📦</div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                        Mahsulotlar topilmadi
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                        Bu kategoriyada hozircha mahsulotlar mavjud emas.
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProductGrid

