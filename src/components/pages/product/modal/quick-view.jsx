import { useState, useEffect } from "react"
import { Modal, Box, Typography, Chip, IconButton, Button } from "@mui/material"
import urls from "../../../../constants/urls"
import { CloseIcon, SeparatorIcon, MinusIcon, PlusIcon, CopyIcon, QuestionIcon, EyeIcon } from "../../../../icons"

const QuickViewModal = ({ isOpen, onClose, productId, products }) => {
    const [product, setProduct] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50

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
            setCurrentSlideIndex(0) // Reset slide index when product changes
        }
    }, [productId, products])

    const onTouchStartHandler = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMoveHandler = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEndHandler = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            // Swipe left - go to next slide
            const totalSlides = Math.max(1, (product?.attachmentKeys || []).length - 1)
            setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1))
        } else if (isRightSwipe) {
            // Swipe right - go to previous slide
            setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))
        }

        setTouchStart(null)
        setTouchEnd(null)
    }

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
                    ml: { xs: 0, md: "auto" },
                    overflow: { xs: "hidden", md: "hidden" },
                }}
            >
                {/* Mobile: Sticky Header + Scrollable Content */}
                <Box
                    sx={{
                        display: { xs: "flex", md: "none" },
                        flexDirection: "column",
                        flex: 1,
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Quickview Title and Close Button - Sticky */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2,
                            pt: 2,
                            pb: 1,
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            backgroundColor: "white",
                            flexShrink: 0,
                        }}
                    >
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

                    {/* Mobile: Scrollable Content - Images + Info */}
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: "auto",
                            overflowX: "auto",
                            "&::-webkit-scrollbar": {
                                width: "6px",
                                height: "6px",
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                p: 2,
                            }}
                        >
                            {/* Mobile: Images - Horizontal Carousel */}
                            <Box sx={{ position: "relative", width: "100%" }}>
                                <Box
                                    onTouchStart={onTouchStartHandler}
                                    onTouchMove={onTouchMoveHandler}
                                    onTouchEnd={onTouchEndHandler}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1,
                                        overflow: "hidden",
                                        width: "100%",
                                        position: "relative",
                                        touchAction: "pan-x pan-y",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 1,
                                            transform: `translateX(-${currentSlideIndex * 50}%)`,
                                            transition: "transform 0.3s ease-in-out",
                                            width: `${allImages.length * 50 + (allImages.length - 1) * 2}%`,
                                        }}
                                    >
                                        {allImages.length > 0 ? (
                                            allImages.map((imageKey, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        position: "relative",
                                                        width: "calc(50% - 4px)",
                                                        minWidth: "calc(50% - 4px)",
                                                        paddingTop: "66.67%",
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
                                </Box>

                                {/* Navigation Dots */}
                                {allImages.length > 0 && (() => {
                                    const totalSlides = Math.max(1, allImages.length - 1)
                                    return (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: 0.5,
                                                mt: 1.5,
                                                mb: -0.5,
                                                position: "relative",
                                                width: "100%",
                                                zIndex: 1,
                                            }}
                                        >
                                            {Array.from({ length: totalSlides }, (_, index) => (
                                                <Box
                                                    key={index}
                                                    onClick={() => setCurrentSlideIndex(index)}
                                                    className={currentSlideIndex === index ? "swiper-pagination-bullet swiper-pagination-bullet-active" : "swiper-pagination-bullet"}
                                                    sx={{
                                                        width: "8px",
                                                        height: "8px",
                                                        borderRadius: "50%",
                                                        backgroundColor: currentSlideIndex === index ? "#000" : "rgba(0, 0, 0, 0.2)",
                                                        cursor: "pointer",
                                                        transition: "background-color 0.2s ease, opacity 0.2s ease",
                                                        flexShrink: 0,
                                                        opacity: currentSlideIndex === index ? 1 : 0.5,
                        "&:hover": {
                                                            opacity: 1,
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    )
                                })()}
                            </Box>

                            {/* Mobile: Product Details - Same as Desktop but without scroll wrapper */}
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
                                    fontSize: "18px",
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
                                    pr: 1.5,
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
                                    display: "block",
                                    minHeight: "1px",
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
                                <Box sx={{ mb: -2 }}>
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
                                        flexWrap: "wrap",
                                        gap: 2,
                                    }}>
                                        {/* Quantity Selector */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                borderRadius: "8px",
                                                border: "1px solid #e0e0e0",
                                                width: "100px",
                                                flexShrink: 0,
                                                py: 0.6,
                                                px: 0.75,
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
                                                py: 0.75,
                                                px: 2,
                                                textTransform: "none",
                                                width: "50%",
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
                                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, gapY: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Box
                                            onClick={handleCopyLink}
                                            sx={{
                                                width: "40px",
                                                height: "40px",
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

                            {/* Payment Methods */}
                            <Box sx={{ mt: 2 }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "12px",
                                        pt: { xs: 3, lg: 4 },
                                        pb: { xs: 2, lg: 3 },
                                        px: { xs: 1.5, sm: 2 },
                                        width: { xs: "100%", sm: "66.67%", md: "100%" },
                                        mx: "auto",
                                    }}
                                >
                                    {/* Heading */}
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "15px",
                                            fontWeight: 600,
                                            letterSpacing: "0.5px",
                                            color: "#1a1a1a",
                                            backgroundColor: "white",
                                            position: "absolute",
                                            top: "-14px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            px: 2.5,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Kafolatlangan Xarid
                                    </Typography>

                                    {/* Payment List */}
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <Box
                                            sx={{
                                                width: "25%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                px: { xs: 0.5, lg: 1.5 },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src="/images/payments/click.webp"
                                                alt="payment"
                                                loading="lazy"
                                                sx={{
                                                    width: "100%",
                                                    height: "auto",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                width: "25%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                px: { xs: 0.5, lg: 1.5 },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src="/images/payments/payme.webp"
                                                alt="payment"
                                                loading="lazy"
                                                sx={{
                                                    width: "100%",
                                                    height: "auto",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Desktop: Original Layout */}
                <Box
                    sx={{
                        display: { xs: "none", md: "grid" },
                        gridTemplateColumns: "360px 1fr",
                        gap: 2,
                        pl: 3,
                        pt: 3,
                        pb: 3,
                        pr: 0,
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
                            pr: 1.5,
                            overflow: "hidden",
                        }}
                    >
                        {/* Quickview Title and Close Button */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: -1,
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                                backgroundColor: "white",
                                pb: 1,
                            }}
                        >
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

                        {/* Scrollable Content */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                overflowY: "auto",
                                overflowX: "hidden",
                                flex: 1,
                                minHeight: 0,
                                pr: "12px",
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
                                pr: 1.5,
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
                                display: "block",
                                minHeight: "1px",
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

                        {/* Payment Methods */}
                        <Box sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    pt: { xs: 3, lg: 4 },
                                    pb: { xs: 2, lg: 3 },
                                    px: { xs: 1.5, sm: 2 },
                                    width: { xs: "100%", sm: "66.67%", md: "100%" },
                                    mx: "auto",
                                }}
                            >
                                {/* Heading */}
                                <Typography
                                    sx={{
                                        fontFamily: "Noto Sans",
                                        fontSize: "15px",
                                        fontWeight: 600,
                                        letterSpacing: "0.5px",
                                        color: "#1a1a1a",
                                        backgroundColor: "white",
                                        position: "absolute",
                                        top: "-14px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        px: 2.5,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Kafolatlangan Xarid
                                </Typography>

                                {/* Payment List */}
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Box
                                        sx={{
                                            width: "25%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            px: { xs: 0.5, lg: 1.5 },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src="/images/payments/click.webp"
                                            alt="payment"
                                            loading="lazy"
                                            sx={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "25%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            px: { xs: 0.5, lg: 1.5 },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src="/images/payments/payme.webp"
                                            alt="payment"
                                            loading="lazy"
                                            sx={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default QuickViewModal
