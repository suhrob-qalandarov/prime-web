import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import ProductSkeleton from "./ProductSkeleton"
import ImageWithSkeleton from "./ImageWithSkeleton"

const ProductCard = ({ product }) => {
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
            <div className="relative rounded-[24px] overflow-hidden bg-[#f5f5f5] product-card-image">
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
                >
                    {isDesktop ? "QUICK VIEW" : <VisibilityOutlinedIcon fontSize="small" />}
                </button>
            </div>

            <div className="pt-2 transition-opacity duration-500" style={{ opacity: imageLoaded ? 1 : 0 }}>
                <div className="flex flex-wrap items-start gap-2">
                    <div className="product-name text-sm sm:text-base font-semibold text-[#121212] line-clamp-2 flex-1 min-w-0">
                        {product.name}
                    </div>
                    {product.brand && (
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#999999] whitespace-nowrap font-['Noto_Sans'] self-start">
                            {product.brand}
                        </span>
                    )}
                </div>

                <div className="price-row flex items-center gap-2 text-xs sm:text-sm text-[#525252] mt-1">
                    <span className="font-semibold text-[#121212] text-sm sm:text-base lg:text-sm">{formatPrice(product.price)}</span>
                    {product.discount > 0 && product.oldPrice && (
                        <span className="line-through text-[#9c9c9c] text-xs sm:text-sm">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lime-200 text-xs font-semibold text-[#121212] mt-1 lg:mt-0">
                            -{product.discount}%
                        </span>
                    )}
                </div>
            </div>
        </Box>
    )
}

export default ProductCard
