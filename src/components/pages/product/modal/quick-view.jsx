import { useState, useEffect } from "react"
import { Modal, Box, Typography, Chip, IconButton, Button } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
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
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "var(--burgundy-dark)",
                                    fontFamily: "Noto Sans",
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
                                fontSize: "12px",
                                color: "#666",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                fontWeight: 600,
                                mt: "10px",
                                mb: "-12px",
                            }}
                        >
                            {product.categoryName}
                        </Typography>

                        {/* Product Name */}
                        <Typography
                            sx={{
                                mt: 0,
                                fontFamily: "Noto Sans",
                                fontSize: { xs: "18px", md: "22px" },
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
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "#1a1a1a",
                                }}
                            >
                                {formatPrice(discountedPrice)} So'm
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                                <SeparatorIcon />
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
                        {product.description && (
                            <Typography
                                sx={{
                                    fontFamily: "Noto Sans",
                                    fontSize: "13px",
                                    color: "#666",
                                    lineHeight: 1.6,
                                }}
                            >
                                {product.description}
                            </Typography>
                        )}

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
                        {product.colorName && (
                            <Box>
                                <Typography sx={{ fontSize: "14px", fontWeight: 600, fontFamily: "Noto Sans", mb: 0.5 }}>
                                    Rang: <span style={{ fontWeight: 400 }}>{product.color}</span>
                                </Typography>
                            </Box>
                        )}

                        {/* Quantity Selector */}
                        {selectedSize && (
                            <Box>
                                <Typography sx={{ fontSize: "14px", fontFamily: "Noto Sans", fontWeight: 600, mb: 1 }}>Miqdori:</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "fit-content" }}>
                                    <IconButton
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        size="small"
                                        sx={{
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            width: "32px",
                                            height: "32px",
                                            "&:disabled": {
                                                borderColor: "#f0f0f0",
                                                color: "#ccc",
                                            },
                                        }}
                                    >
                                        <RemoveIcon sx={{ fontSize: "16px" }} />
                                    </IconButton>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            minWidth: "30px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {quantity}
                                    </Typography>
                                    <IconButton
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= maxQuantity}
                                        size="small"
                                        sx={{
                                            border: "1px solid #ddd",
                                            borderRadius: "4px",
                                            width: "32px",
                                            height: "32px",
                                            "&:disabled": {
                                                borderColor: "#f0f0f0",
                                                color: "#ccc",
                                            },
                                        }}
                                    >
                                        <AddIcon sx={{ fontSize: "16px" }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}

                        {/* Add to Cart Button */}
                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!selectedSize}
                            sx={{
                                backgroundColor: "#8b1538",
                                color: "white",
                                fontWeight: 700,
                                fontSize: "14px",
                                fontFamily: "Noto Sans",
                                py: 1.5,
                                textTransform: "uppercase",
                                mt: 1,
                                "&:hover": {
                                    backgroundColor: "#6b0f2a",
                                },
                                "&:disabled": {
                                    backgroundColor: "#e0e0e0",
                                    color: "#999",
                                },
                            }}
                        >
                            SAVATGA
                        </Button>

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
