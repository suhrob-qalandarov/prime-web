import { useState, useEffect } from "react"
import { Modal, Box, Typography, Chip, IconButton, Button } from "@mui/material"
import urls from "../../../../constants/urls"

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--burgundy-dark)" viewBox="0 0 256 256">
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
    </svg>
)

const SeparatorIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1"
        height="16"
        viewBox="0 0 1 16"
        fill="none"
    >
        <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="16"
            stroke="#666"
            strokeWidth="1"
        />
    </svg>
)

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" style={{ cursor: "pointer" }}>
        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
    </svg>
)

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" style={{ cursor: "pointer" }}>
        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
)

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
        <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
    </svg>
)

const QuestionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
        <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
    </svg>
)

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
        <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
    </svg>
)

const QuickViewModal = ({ isOpen, onClose, productId, products }) => {
    const [product, setProduct] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (productId && products) {
            const foundProduct = products.find((p) => p.id === productId)
            setProduct(foundProduct)
            // Set default size (first available size)
            if (foundProduct?.productSizes && foundProduct.productSizes.length > 0) {
                const availableSizes = foundProduct.productSizes.filter((size) => size.amount > 0)
                if (availableSizes.length > 0) {
                    setSelectedSize(availableSizes[0])
                }
            }
            setQuantity(1)
        }
    }, [productId, products])

    if (!product) return null

    // Get all product images
    const allImages = product.attachmentKeys || []
    
    // Helper function to get image URL
    const getImageUrl = (imageKey) => {
        if (!imageKey) return "/placeholder.svg?height=500&width=375"
        return imageKey?.startsWith("/") 
            ? imageKey 
            : `${urls.apiBaseUrl}/v1/attachment/${imageKey}`
    }

    const hasDiscount = product.status === "SALE" && product.discount > 0
    const discountedPrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price

    const formatPrice = (price) => {
        return new Intl.NumberFormat("fr-FR").format(price)
    }

    const availableSizes = product.productSizes?.filter((size) => size.amount > 0) || []
    const maxQuantity = selectedSize ? selectedSize.amount : 0

    const handleQuantityChange = (delta) => {
        const newQuantity = Math.max(1, Math.min(maxQuantity, quantity + delta))
        setQuantity(newQuantity)
    }

    const handleCopyLink = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        // You can add a toast notification here
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: { xs: "center", md: "flex-start" },
                justifyContent: { xs: "center", md: "flex-end" },
                pt: { xs: 1, md: 1 },
                pb: { xs: 1, md: 1 },
                pr: { xs: 1, md: 1.2 },
                pl: { xs: 1, md: 1 },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    maxWidth: "860px",
                    width: "100%",
                    maxHeight: { xs: "90vh", md: "96.5vh" },
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    mt: { xs: 0, md: 1 },
                    mb: { xs: 0, md: 1 },
                    mr: { xs: 0, md: 1 },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "360px 1fr" },
                        gap: { xs: 2, md: 2 },
                        p: { xs: 2, md: 3 },
                        flex: 1,
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Left Side - Product Images */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            overflowY: "auto",
                            overflowX: "hidden",
                            pr: 0,
                            "&::-webkit-scrollbar": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "#f5f5f5",
                                borderRadius: "3px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#ccc",
                                borderRadius: "3px",
                                "&:hover": {
                                    backgroundColor: "#999",
                                },
                            },
                        }}
                    >
                        {/* All Product Images */}
                        {allImages.length > 0 ? (
                            allImages.map((imageKey, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        paddingTop: "133.33%",
                                        overflow: "hidden",
                                        borderRadius: "18px",
                                        backgroundColor: "#f5f5f5",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={getImageUrl(imageKey)}
                                        alt={`${product.name} - ${index + 1}`}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            ))
                        ) : (
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    paddingTop: "133.33%",
                                    overflow: "hidden",
                                    borderRadius: "12px",
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/placeholder.svg?height=500&width=375"
                                    alt={product.name}
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Right Side - Product Details */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            ml: 4,
                            overflowY: "auto",
                            overflowX: "hidden",
                            pr: 1,
                            "&::-webkit-scrollbar": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "#f5f5f5",
                                borderRadius: "3px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#ccc",
                                borderRadius: "3px",
                                "&:hover": {
                                    backgroundColor: "#999",
                                },
                            },
                        }}
                    >
                        {/* Quickview Title and Close Button */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: -1 }}>
                            <Typography
                                sx={{
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    color: "var(--burgundy-dark)",
                                    fontFamily: "Noto Sans",
                                    letterSpacing: "1px",
                                }}
                            >
                                Quickview
                            </Typography>
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    backgroundColor: "#f0f0f0",
                                    padding: "2",

                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Category */}
                        <Typography
                            sx={{
                                fontFamily: "Noto Sans",
                                fontSize: "13px",
                                color: "#666",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                fontWeight: 600,
                                mt: "10px",
                                mb: "-13px",
                            }}
                        >
                            {product.categoryName}
                        </Typography>

                        {/* Product Name */}
                        <Typography
                            sx={{
                                mt: 0,
                                fontFamily: "Noto Sans",
                                fontSize: { xs: "18px", md: "28px" },
                                letterSpacing: "1px",
                                fontWeight: 600,
                                color: "#1a1a1a",
                            }}
                        >
                            {product.name}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                            <Typography
                                sx={{
                                    fontFamily: "Noto Sans",
                                    fontSize: "22px",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                    color: "#1a1a1a",
                                }}
                            >
                                {formatPrice(discountedPrice)} So'm
                            </Typography>
                            {hasDiscount && (
                                <>
                                    <Box sx={{ display: "flex", alignItems: "center", mx: 0 }}>
                                        <SeparatorIcon sx={{ color: "#636262" }} />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "16px",
                                            color: "#636262",
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {formatPrice(product.price)} So'm
                                    </Typography>
                                    <Chip
                                        label={`-${product.discount}%`}
                                        sx={{
                                            backgroundColor: "rgba(189,236,118,0.87)",
                                            color: "black",
                                            fontWeight: 600,
                                            fontSize: "14px",
                                            height: "25px",
                                            "& .MuiChip-label": {
                                                px: 1.5,
                                            },
                                        }}
                                    />
                                </>
                            )}
                        </Box>

                        {/* Description */}
                        <Typography
                            sx={{
                                fontFamily: "Noto Sans",
                                fontSize: "15px",
                                letterSpacing: "0.5px",
                                color: "#666",
                                lineHeight: 1.6,
                            }}
                        >
                            {product.description}
                        </Typography>

                        {/* Separator Line */}
                        <Box
                                sx={{
                                width: "100%",
                                height: "1px",
                                backgroundColor: "#e0e0e0",
                                my: 1,
                            }}
                        />

                        {/* Color Display */}
                        {product.color && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: 600, fontFamily: "Noto Sans", mb: 0 }}>
                                    Rang:
                                </Typography>
                                <Box
                                    sx={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "50%",
                                        backgroundColor: product.color,
                                        border: "1px solid #e0e0e0",
                                        flexShrink: 0,
                                    }}
                                />
                            </Box>
                        )}

                        {/* Size Selection */}
                        {availableSizes.length > 0 && (
                            <Box sx={{mb: -2 }}>
                                <Typography sx={{ fontSize: "14px", fontFamily: "Noto Sans", fontWeight: 600, mb: 1 }}>
                                    O'lcham:{" "}
                                    {selectedSize && (
                                        <span style={{ fontSize: "20px", fontWeight: 400, marginLeft: 2 }}>
                                            {selectedSize.size}
                                        </span>
                                    )}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                                    {availableSizes.map((size, index) => (
                                        <Chip
                                            key={index}
                                            label={size.size}
                                            onClick={() => {
                                                setSelectedSize(size)
                                                setQuantity(1)
                                            }}
                                            sx={{
                                                border: selectedSize?.size === size.size ? "2px solid #000" : "1px solid #ddd",
                                                backgroundColor: selectedSize?.size === size.size ? "#f5f5f5" : "white",
                                                color: "#333",
                                                fontWeight: selectedSize?.size === size.size ? 700 : 500,
                                                fontSize: "13px",
                                                fontFamily: "Noto Sans",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    borderColor: "#000",
                                                    backgroundColor: "#f5f5f5",
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Quantity Selector and Add to Cart */}
                        {selectedSize && (
                            <Box sx={{ mt: 3 }}>
                                {/* Miqdori Label */}
                                <Typography sx={{ fontSize: "14px", fontFamily: "Noto Sans", fontWeight: 600, mb: 1 }}>
                                    Miqdori:
                                </Typography>
                                
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: { xs: "wrap", lg: "nowrap" },
                                    gap: { xs: 2, lg: 3 },
                                }}>
                                    {/* Quantity Selector */}
                                    <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderRadius: "8px",
                                        border: "1px solid #e0e0e0",
                                        width: { xs: "100px", sm: "130px" },
                                        flexShrink: 0,
                                        py: { xs: 0.5, md: 1.3 },
                                        px: { xs: 0.75, md: 0.85 },
                                    }}
                                >
                                    <Box
                                        onClick={() => handleQuantityChange(-1)}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: quantity <= 1 ? "not-allowed" : "pointer",
                                            opacity: quantity <= 1 ? 0.4 : 1,
                                            pointerEvents: quantity <= 1 ? "none" : "auto",
                                        }}
                                    >
                                        <MinusIcon />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            textAlign: "center",
                                        }}
                                    >
                                        {quantity}
                                    </Typography>
                                    <Box
                                        onClick={() => handleQuantityChange(1)}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: quantity >= maxQuantity ? "not-allowed" : "pointer",
                                            opacity: quantity >= maxQuantity ? 0.4 : 1,
                                            pointerEvents: quantity >= maxQuantity ? "none" : "auto",
                                        }}
                                    >
                                        <PlusIcon />
                                    </Box>
                                </Box>

                                {/* Add to Cart Button */}
                                <Button
                                    variant="outlined"
                                    fullWidth={false}
                                    disabled={!selectedSize}
                                    sx={{
                                        backgroundColor: "white",
                                        color: "black",
                                        border: "1px solid black",
                                        borderRadius: "12px",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        fontFamily: "Noto Sans",
                                        py: 1.2,
                                        px: 2,
                                        textTransform: "none",
                                        width: { xs: "100%", lg: "auto" },
                                        minWidth: { lg: "200px" },
                                        textAlign: "center",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                            borderColor: "black",
                                        },
                                        "&:disabled": {
                                            backgroundColor: "#e0e0e0",
                                            color: "#999",
                                            borderColor: "#e0e0e0",
                                        },
                                    }}
                                >
                                    Savatga
                                </Button>
                                </Box>
                            </Box>
                        )}

                        {/* Additional Actions */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 8, lg: 20 }, gapY: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                    <Box
                                        onClick={handleCopyLink}
                                        sx={{
                                            width: { xs: "40px", md: "48px" },
                                            height: { xs: "40px", md: "48px" },
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "12px",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: "#000",
                                                color: "#fff",
                                            },
                                        }}
                                    >
                                        <CopyIcon />
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "14px",
                                            letterSpacing: "0.5px",
                                            fontWeight: 700,
                                            color: "#1a1a1a",
                                        }}
                                    >
                                        Kiyim havolasini nusxala!
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* More Info */}
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                                {/* Savol Berish */}
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <QuestionIcon />
                                    <Box
                                        component="a"
                                        href="https://t.me/prime77uz_bot"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            color: "#1a1a1a",
                                            textDecoration: "none",
                                            "&:hover": {
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        Savol berish
                                    </Box>
                                </Box>
                            </Box>

                            {/* View Count */}
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
                                <EyeIcon />
                                <Typography
                                    sx={{
                                        fontFamily: "Noto Sans",
                                        fontSize: "15px",
                                        letterSpacing: "0.5px",
                                        fontWeight: 600,
                                        color: "#1a1a1a",
                                    }}
                                >
                                    10
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Noto Sans",
                                        fontSize: "14px",
                                        letterSpacing: "0.5px",
                                        color: "#666",
                                    }}
                                >
                                    kishi mahsulotni hozir ko'rmoqda!
                                </Typography>
                            </Box>

                            {/* Category Label */}
                            {product.categoryName && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 2 }}>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "15px",
                                            fontWeight: 600,
                                            color: "#1a1a1a",
                                        }}
                                    >
                                        Kategoriya:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "15px",
                                            color: "#666",
                                        }}
                                    >
                                        {product.categoryName}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default QuickViewModal
