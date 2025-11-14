import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ProductSkeleton from "./ProductSkeleton"
import ImageWithSkeleton from "./ImageWithSkeleton"

const ProductCard = ({ product, onQuickView }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isDesktop, setIsDesktop] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1024 : false))
    const [hovered, setHovered] = useState(false)
    const images = product?.images?.length ? product.images : [product?.image].filter(Boolean)

    useEffect(() => {
        const updateMatch = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener("resize", updateMatch)
        return () => window.removeEventListener("resize", updateMatch)
    }, [])

    useEffect(() => {
        setImageLoaded(false)
    }, [images.length])

    if (!product) {
        return (
            <Box className="flex flex-col">
                <ProductSkeleton />
            </Box>
        )
    }

    const isQuickViewVisible = imageLoaded && (isDesktop ? hovered : true)

    const formatPrice = (value) =>
        `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)} So'm`

    return (
        <Box
            className="flex flex-col product-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative rounded-[14px] overflow-hidden bg-[#f5f5f5] product-card-image">
                {!imageLoaded && <ProductSkeleton overlay />}
                <ImageWithSkeleton
                    src={images[0]}
                    alt={product.name}
                    containerClassName="w-full h-full"
                    imgClassName="product-card-img"
                    delay={0}
                    onLoad={() => setImageLoaded(true)}
                />

                {product.badge && product.badge !== "SALE" && imageLoaded && (
                    <span
                        className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${
                            product.badge === "NEW" ? "home-new-badge" : "bg-[#ff4d4f] text-white"
                        }`}
                    >
                        {product.badge}
                    </span>
                )}

                {product.badge === "SALE" && imageLoaded && (
                    <div className="home-marquee-container">
                        <div className="home-marquee-content">
                            <div className="home-marquee-track">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="home-marquee-item">
                                        <span className="home-marquee-text">Qaynoq chegirma {product.marqueeDiscount}%</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 256 256"
                                            fill="currentColor"
                                            className="home-marquee-icon"
                                        >
                                            <path d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"></path>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className={`quick-view-btn ${isDesktop ? "desktop" : "mobile"} ${isQuickViewVisible ? "quick-view-btn--visible" : ""}`}
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        if (onQuickView && product?.id) {
                            onQuickView(product.id)
                        }
                    }}
                >
                    {isDesktop ? "QUICK VIEW" : <VisibilityOutlinedIcon fontSize="small" />}
                </button>
            </div>

            <div className="pt-2 transition-opacity duration-500" style={{ opacity: imageLoaded ? 1 : 0 }}>
                <div className="flex flex-wrap items-end gap-x-2 gap-y-1 w-full">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="product-name text-[0.85rem] sm:text-base font-semibold text-[var(--burgundy-dark)] leading-tight line-clamp-2 flex-1 min-w-0">
                            {product.name}
                        </div>
                        {product.color && (
                            <span
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0 border border-gray-300"
                                style={{ backgroundColor: product.color }}
                                title={product.color}
                            />
                        )}
                    </div>
                    {product.brand && (
                        <span className="sm:text-[0.68rem] text-[0.60rem] font-semibold uppercase tracking-[0.08em] text-[#121212] whitespace-nowrap font-['Noto_Sans'] w-full sm:w-auto mt-0 text-left sm:text-right ml-0 sm:ml-auto self-start sm:self-end">
                            {product.brand}
                        </span>
                    )}
                </div>

                <div className="price-row flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 text-xs sm:text-sm text-[#525252] mt-1">
                    <div className="flex items-baseline gap-2">
                        <span className="font-medium font-['Noto_Sans'] text-[#121212] text-xs sm:text-base lg:text-l tracking-wide">{formatPrice(product.price)}</span>
                        {product.discount > 0 && product.oldPrice && (
                            <>
                                <span className="line-through text-[#666666] l:text-l font-['Noto_Sans'] tracking-wide">
                                    {formatPrice(product.oldPrice)}
                                </span>
                                <span className="hidden sm:inline-block w-2.5"></span>
                            </>
                        )}
                    </div>
                    {product.discount > 0 && (
                        <span className="inline-flex items-center px-2.5 py-1 sm:px-5 sm:py-2.5 md:px-3 md:py-2 rounded-full bg-lime-300 text-xs sm:text-sm font-semibold text-[#121212] sm:mt-0 w-fit font-['Noto_Sans']">
                            -{product.discount}%
                        </span>
                    )}
                </div>
            </div>
        </Box>
    )
}

export default ProductCard
