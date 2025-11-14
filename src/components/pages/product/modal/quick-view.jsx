"use client"

import { useState, useEffect } from "react"
import { Modal, Box, Typography, Chip, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import urls from "../../../../constants/urls"

const QuickViewModal = ({ isOpen, onClose, productId, products }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (productId && products) {
            const foundProduct = products.find((p) => p.id === productId)
            setProduct(foundProduct)
        }
    }, [productId, products])

    if (!product) return null

    const mainImage = product.attachmentKeys?.[0] || ""
    // Handle both local paths (starting with "/") and API paths
    const imageSrc = mainImage?.startsWith("/") 
        ? mainImage 
        : mainImage 
            ? `${urls.apiBaseUrl}/v1/attachment/${mainImage}` 
            : "/placeholder.svg?height=500&width=375"
    const hasDiscount = product.status === "SALE" && product.discount > 0
    const discountedPrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " UZS"
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    maxWidth: "900px",
                    width: "90%",
                    maxHeight: "90vh",
                    overflow: "auto",
                    p: { xs: 2, md: 4 },
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 10,
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                            backgroundColor: "#e0e0e0",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: { xs: 2, md: 3 },
                    }}
                >
                    {/* Product Image */}
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
                            src={imageSrc}
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

                    {/* Product Details */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: { xs: 1.5, md: 2 },
                        }}
                    >
                        {/* Title */}
                        <Typography
                            sx={{
                                fontSize: { xs: "20px", md: "24px" },
                                fontWeight: 800,
                                color: "#1a1a1a",
                            }}
                        >
                            {product.name}
                        </Typography>

                        {/* Category */}
                        {product.categoryName && (
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    fontWeight: 600,
                                }}
                            >
                                {product.categoryName}
                            </Typography>
                        )}

                        {/* Price */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                            <Typography
                                sx={{
                                    fontSize: "24px",
                                    fontWeight: 800,
                                    color: hasDiscount ? "#ff6b6b" : "#1a1a1a",
                                }}
                            >
                                {formatPrice(discountedPrice)}
                            </Typography>
                            {hasDiscount && (
                                <>
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            color: "#aaa",
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {formatPrice(product.price)}
                                    </Typography>
                                    <Chip
                                        label={`-${product.discount}%`}
                                        sx={{
                                            backgroundColor: "#ff6b6b",
                                            color: "white",
                                            fontWeight: 800,
                                        }}
                                    />
                                </>
                            )}
                        </Box>

                        {/* Status */}
                        {product.status && (
                            <Chip
                                label={product.status}
                                sx={{
                                    backgroundColor:
                                        product.status === "HOT" ? "#ff4444" : product.status === "NEW" ? "#4CAF50" : "#ff6b6b",
                                    color: "white",
                                    fontWeight: 800,
                                    width: "fit-content",
                                }}
                            />
                        )}

                        {/* Sizes */}
                        {product.productSizes && product.productSizes.length > 0 && (
                            <Box>
                                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>Mavjud o'lchamlar:</Typography>
                                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                    {product.productSizes
                                        .filter((size) => size.amount > 0)
                                        .map((size, index) => (
                                            <Chip
                                                key={index}
                                                label={size.size}
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    backgroundColor: "white",
                                                    color: "#666",
                                                    fontWeight: 600,
                                                }}
                                            />
                                        ))}
                                </Box>
                            </Box>
                        )}

                        {/* Description */}
                        {product.description && (
                            <Box>
                                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>Tavsif:</Typography>
                                <Typography sx={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{product.description}</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default QuickViewModal
