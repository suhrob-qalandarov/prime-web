import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProductCard from "../../common/ProductCard"
import ProductSkeleton from "../../common/ProductSkeleton"
import QuickViewModal from "./modal/quick-view"
import { mockProducts } from "../../../mock/products"

const ProductGrid = ({ selectedCategory }) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [quickViewOpen, setQuickViewOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null)
    const itemsPerPage = 20

    useEffect(() => {
        // Simulate loading delay
        setLoading(true)
        const timer = setTimeout(() => {
            // Use mock data instead of API call
            const transformedProducts = mockProducts.map((product) => {
                const hasDiscount = product.status === "SALE" && product.discount > 0
                // In mock data, price is already the discounted price
                const displayPrice = product.price
                const displayOldPrice = hasDiscount && product.oldPrice ? product.oldPrice : null

                // Create original product structure for QuickView modal
                // For QuickView, we need the original (non-discounted) price
                const originalPrice = hasDiscount && product.oldPrice ? product.oldPrice : product.price
                
                const originalProduct = {
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price: originalPrice,
                    discount: product.discount || 0,
                    status: product.status,
                    attachmentKeys: product.images,
                    categoryName: "Category",
                    description: `${product.name} - ${product.brand} mahsuloti. Yuqori sifatli materialdan tayyorlangan.`,
                    productSizes: [
                        { size: "S", amount: 10 },
                        { size: "M", amount: 15 },
                        { size: "L", amount: 12 },
                        { size: "XL", amount: 8 },
                    ],
                }

                return {
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price: displayPrice,
                    oldPrice: displayOldPrice,
                    discount: product.discount || 0,
                    image: product.image,
                    images: product.images,
                    badge: product.badge,
                    marqueeDiscount: product.marqueeDiscount || 0,
                    originalProduct,
                }
            })
            
            setProducts(transformedProducts)
            setPage(1)
            setLoading(false)
        }, 300) // Small delay to simulate API call

        return () => clearTimeout(timer)
    }, [selectedCategory])

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = products.slice(startIndex, endIndex)
    const totalPages = Math.ceil(products.length / itemsPerPage)

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
                products={products.map(p => p.originalProduct).filter(Boolean)}
            />

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <ProductSkeleton key={idx} />
                    ))}
                </div>
            ) : products.length > 0 ? (
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

