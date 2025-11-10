import { useState } from "react"
import { Box } from "@mui/material"
import ProductSkeleton from "./ProductSkeleton"

const ProductCard = ({ product, isLoading }) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    if (!product) {
        return (
            <Box className="flex flex-col">
                <ProductSkeleton />
            </Box>
        )
    }

    return (
        <Box className="flex flex-col">
            <div className="relative rounded-[24px] overflow-hidden bg-[#f5f5f5]" style={{ minHeight: "380px" }}>
                {(isLoading || !imageLoaded) && <ProductSkeleton overlay />}
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-[440px] object-cover transition-opacity duration-700 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
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
            </div>
            <div className="pt-4 min-h-[72px] transition-opacity duration-500" style={{ opacity: imageLoaded ? 1 : 0 }}>
                <h3 className="text-base font-semibold text-[#121212] line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 text-sm text-[#525252] mt-1">
                    <span className="font-semibold text-[#121212]">{product.price.toLocaleString("fr-FR")} So'm</span>
                    {product.oldPrice && (
                        <span className="line-through text-[#9c9c9c]">{product.oldPrice.toLocaleString("fr-FR")} So'm</span>
                    )}
                    {product.discount && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lime-200 text-xs font-semibold text-[#121212]">
                            -{product.discount}%
                        </span>
                    )}
                </div>
            </div>
        </Box>
    )
}

export default ProductCard
