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
                            <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                                <SeparatorIcon sx={{ color: "#e0e0e0" }} />
                            </Box>
                            {hasDiscount && (
                                <>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "14px",
                                            color: "#aaa",
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {formatPrice(product.price)} So'm
                                    </Typography>
                                    <Chip
                                        label={`-${product.discount}%`}
                                        size="small"
                                        sx={{
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            fontWeight: 700,
                                            fontSize: "12px",
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

                        {/* Size Selection */}
                        {availableSizes.length > 0 && (
                            <Box>
                                <Typography sx={{ fontSize: "14px", fontFamily: "Noto Sans", fontWeight: 600, mb: 1 }}>
                                    O'lcham: {selectedSize ? selectedSize.size : ""}
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

                        {/* Color - Display only */}
                        {product.color && (
                            <Box>
                                <Typography sx={{ fontSize: "14px", fontWeight: 600, fontFamily: "Noto Sans", mb: 0.5 }}>
                                    Rang: <span style={{ fontWeight: 400 }}>{product.color}</span>
                                </Typography>
                            </Box>
                        )}

                        {/* Quantity Selector and Add to Cart */}
                        {selectedSize && (
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: { xs: "wrap", lg: "nowrap" },
                                gap: { xs: 2, lg: 3 }, mt: 3 }}
                            >
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
                        )}

                        {/* Additional Actions */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
                            <Button
                                variant="text"
                                fullWidth
                                sx={{
                                    color: "#666",
                                    fontSize: "13px",
                                    fontFamily: "Noto Sans",
                                    textTransform: "none",
                                    justifyContent: "flex-start",
                                    textAlign: "left",
                                    px: 0,
                                    minWidth: "auto",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={handleCopyLink}
                            >
                                Kiyim havolasini nusxala!
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                sx={{
                                    color: "#666",
                                    fontSize: "13px",
                                    fontFamily: "Noto Sans",
                                    textTransform: "none",
                                    justifyContent: "flex-start",
                                    textAlign: "left",
                                    px: 0,
                                    minWidth: "auto",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Savol Berish
                            </Button>
                        </Box>

                        {/* View Count */}
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontFamily: "Noto Sans",
                                color: "#999",
                                mt: 1,
                            }}
                        >
                            6 kishi mahsulotni hozir ko'rmoqda!
                        </Typography>

                        {/* Category Label */}
                        {product.categoryName && (
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontFamily: "Noto Sans",
                                    color: "#666",
                                }}
                            >
                                Kategoriya: {product.categoryName}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default QuickViewModal
