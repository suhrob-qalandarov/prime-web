import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Container,
    Box,
    Stack,
    Typography,
    Button,
    IconButton,
} from "@mui/material"
import PageHeader from "../../common/PageHeader"
import urls from "../../../constants/urls"
import { MinusIcon, PlusIcon, CloseIcon2 } from "../../../icons"

const Cart = () => {
    const navigate = useNavigate()
    
    // Mock cart data - replace with actual cart from localStorage or API
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            productId: 1,
            name: "Kurtka Ayiq",
            brand: "North Face",
            color: "Qora",
            size: "XL (Bo'y 176-187)",
            price: 336000,
            originalPrice: 420000,
            quantity: 1,
            image: "/images/spotlights/clothe.jpg",
        },
        {
            id: 2,
            productId: 2,
            name: "Shim QADAM",
            color: "Jigarrang",
            size: "L",
            price: 295800,
            originalPrice: null,
            quantity: 1,
            image: "/images/spotlights/shim.jpeg",
        },
        {
            id: 3,
            productId: 3,
            name: "Shalvar OD",
            color: "Kulrang",
            size: "M",
            price: 328000,
            originalPrice: null,
            quantity: 1,
            image: "/images/spotlights/shim2.jpeg",
        },
        {
            id: 4,
            productId: 4,
            name: "Chorsu Vibe Sweatshirt",
            color: "Oq",
            size: "XL",
            price: 206500,
            originalPrice: 295000,
            quantity: 1,
            image: "/images/spotlights/clothe-8.jpeg",
        },
    ])

    useEffect(() => {
        // TODO: Load cart items from localStorage or API
        // const savedCart = localStorage.getItem('prime-cart')
        // if (savedCart) {
        //     setCartItems(JSON.parse(savedCart))
        // }
    }, [])

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " So'm"
    }

    const handleQuantityChange = (itemId, change) => {
        setCartItems((prevItems) => {
            return prevItems
                .map((item) => {
                    if (item.id === itemId) {
                        const newQuantity = item.quantity + change
                        // If quantity becomes 0 or less, remove the item
                        if (newQuantity <= 0) {
                            return null
                        }
                        return { ...item, quantity: newQuantity }
                    }
                    return item
                })
                .filter(Boolean) // Remove null items
        })
    }

    const handleRemoveItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0)
    }

    const calculateDiscount = () => {
        return cartItems.reduce((sum, item) => {
            if (item.originalPrice && item.originalPrice > item.price) {
                return sum + (item.originalPrice - item.price) * item.quantity
            }
            return sum
        }, 0)
    }

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const handleCheckout = () => {
        // TODO: Save cart items and navigate to order page
        navigate("/order")
    }

    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    const total = calculateTotal()

    return (
        <Stack>
            <PageHeader title="Savat" />
            <Container
                maxWidth={false}
                sx={{
                    px: { xs: 2, sm: 4, lg: "40px" },
                    py: { xs: 2, md: 5 },
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {cartItems.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography sx={{ fontSize: "24px", fontWeight: 600, mb: 2 }}>
                            Savat bo'sh
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/catalog")}
                            sx={{
                                backgroundColor: "#333",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#555",
                                },
                            }}
                        >
                            Katalogni ko'rish
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", lg: "1.86fr 0.85fr" },
                            gap: { xs: 3, lg: 6 },
                        }}
                    >
                        {/* Left Section - Cart Items */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {cartItems.map((item, index) => (
                                <Box key={item.id}>
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: { xs: "80px 1fr auto auto", lg: "100px 1fr 1fr auto auto" },
                                            gap: { xs: 2, lg: 3 },
                                            p: { xs: 1.5, lg: 2 },
                                            alignItems: "center",
                                        }}
                                    >
                                    {/* Product Image - Left */}
                                    <Box
                                        component="img"
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        sx={{
                                            width: { xs: "80px", lg: "100px" },
                                            height: { xs: "110px", lg: "135px" },
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            flexShrink: 0,
                                        }}
                                    />

                                    {/* Product Details - Middle */}
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, justifyContent: "center", minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: "14px", lg: "16px" },
                                                fontWeight: 600,
                                                color: "var(--burgundy-dark)",
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        {item.brand && (
                                            <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "11px", lg: "12px" }, fontWeight: 600, color: "#1a1a1a", textTransform: "uppercase" }}>
                                                {item.brand}
                                            </Typography>
                                        )}

                                        {item.color && (
                                            <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "13px", lg: "15px" }, color: "#666" }}>
                                                {item.color}
                                            </Typography>
                                        )}

                                        <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "13px", lg: "15px" }, color: "#666" }}>
                                            {item.size}
                                        </Typography>
                                    </Box>

                                    {/* Price - Desktop da alohida column */}
                                    <Box sx={{ 
                                        display: { xs: "none", lg: "flex" }, 
                                        flexDirection: "column", 
                                        alignItems: "center", 
                                        justifyContent: "center", 
                                        gap: 0.5,
                                        justifySelf: "center",
                                    }}>
                                        {item.originalPrice && item.originalPrice > item.price ? (
                                            <>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans",
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                        color: "#1a1a1a",
                                                    }}
                                                >
                                                    {formatPrice(item.price)}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans",
                                                        fontSize: "16px",
                                                        fontWeight: 500,
                                                        color: "#636262",
                                                        textDecoration: "line-through",
                                                    }}
                                                >
                                                    {formatPrice(item.originalPrice)}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography
                                                sx={{
                                                    fontFamily: "Noto Sans",
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    color: "#1a1a1a",
                                                }}
                                            >
                                                {formatPrice(item.price)}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Price and Quantity - Mobile da birga, Desktop da quantity */}
                                    <Box sx={{ 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        alignItems: { xs: "flex-end", lg: "center" }, 
                                        justifyContent: "center", 
                                        gap: 1,
                                        minWidth: 0,
                                    }}>
                                        {/* Price - Mobile da */}
                                        <Box sx={{ display: { xs: "flex", lg: "none" }, flexDirection: "column", alignItems: "flex-end", gap: 0.5 }}>
                                            {item.originalPrice && item.originalPrice > item.price ? (
                                                <>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "13px",
                                                            fontWeight: 600,
                                                            color: "#1a1a1a",
                                                        }}
                                                    >
                                                        {formatPrice(item.price)}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "12px",
                                                            fontWeight: 500,
                                                            color: "#636262",
                                                            textDecoration: "line-through",
                                                        }}
                                                    >
                                                        {formatPrice(item.originalPrice)}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans",
                                                        fontSize: "13px",
                                                        fontWeight: 600,
                                                        color: "#1a1a1a",
                                                    }}
                                                >
                                                    {formatPrice(item.price)}
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Quantity Selector */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                borderRadius: "8px",
                                                border: "1px solid #e0e0e0",
                                                backgroundColor: "#f0f0f0",
                                                width: { xs: "75px", lg: "100px" },
                                                flexShrink: 0,
                                                py: { xs: 1, lg: 1.6 },
                                                px: 1,
                                            }}
                                        >
                                            <Box
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <MinusIcon />
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Noto Sans",
                                                    fontSize: { xs: "13px", lg: "16px" },
                                                    fontWeight: 600,
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>
                                            <Box
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <PlusIcon />
                                            </Box>
                                        </Box>

                                        {/* Total Price - Mobile da quantity tagida */}
                                        <Typography
                                            sx={{
                                                display: { xs: "block", lg: "none" },
                                                fontFamily: "Noto Sans",
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                color: "var(--burgundy-dark)",
                                                whiteSpace: "nowrap",
                                                textAlign: "right",
                                            }}
                                        >
                                            {formatPrice(item.price * item.quantity)}
                                        </Typography>
                                    </Box>

                                    {/* Total Price - Desktop da */}
                                    <Typography
                                        sx={{
                                            display: { xs: "none", lg: "block" },
                                            fontFamily: "Noto Sans",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            color: "var(--burgundy-dark)",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {formatPrice(item.price * item.quantity)}
                                    </Typography>

                                    {/* Remove Button - Right (both mobile and desktop) */}
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveItem(item.id)}
                                        sx={{
                                            color: "#ef4444",
                                            padding: "4px",
                                            flexShrink: 0,
                                            "&:hover": {
                                                backgroundColor: "transparent",
                                            },
                                        }}
                                    >
                                        <CloseIcon2 size={18} />
                                    </IconButton>
                                    </Box>
                                    {/* Border after product - same spacing as gap (gap: 2 = 16px) */}
                                    <Box
                                        sx={{
                                            height: "1px",
                                            backgroundColor: "#e0e0e0",
                                            mt: 2,
                                            marginLeft: 2,
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>

                        {/* Right Section - Order Summary */}
                        <Box
                            sx={{
                                position: { lg: "sticky" },
                                top: { lg: "100px" },
                                height: { lg: "fit-content" },
                                backgroundColor: "#f0f0f0",
                                borderRadius: "18px",
                                p: { xs: 2, lg: 3 },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Noto Sans",
                                    fontSize: { xs: "20px", lg: "22px" },
                                    fontWeight: 700,
                                    letterSpacing: 0.7,
                                    mb: { xs: 2, lg: 3 },
                                    color: "var(--burgundy-dark)",
                                }}
                            >
                                Buyurtma
                            </Typography>

                            {/* Order Summary */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, lg: 2 }, mb: { xs: 2, lg: 3 } }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1.5 }}>
                                    <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "14px", lg: "15px" }, fontWeight: 600, letterSpacing: 0.7 }}>
                                        Summa
                                    </Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "14px", lg: "15px" }, fontWeight: 600, letterSpacing: 0.7 }}>
                                        {formatPrice(subtotal)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        pt: 2,
                                        borderTop: "1px solid #e0e0e0",
                                        pb: 1,
                                    }}
                                >
                                    <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "14px", lg: "15px" }, fontWeight: 600, letterSpacing: 0.7 }}>
                                        Chegirma
                                    </Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "14px", lg: "15px" }, fontWeight: 600, letterSpacing: 0.7 }}>
                                        -{formatPrice(discount)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        pt: 1,
                                        pb: 1,
                                        borderTop: "1px solid #e0e0e0",
                                    }}
                                >
                                    <Typography sx={{
                                        fontFamily: "Noto Sans",
                                        fontSize: { xs: "20px", lg: "23px" },
                                        fontWeight: 700,
                                        letterSpacing: 0.3,
                                        color: "var(--burgundy-dark)",
                                    }}>
                                        Jami
                                    </Typography>
                                    <Typography sx={{ fontFamily: "Noto Sans", fontSize: { xs: "20px", lg: "24px" }, fontWeight: 700, letterSpacing: 0.7, color: "var(--burgundy-dark)" }}>
                                        {formatPrice(total)}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Checkout Button */}
                            <Button
                                variant="contained"
                                onClick={handleCheckout}
                                fullWidth
                                sx={{
                                    backgroundColor: "var(--burgundy-dark)",
                                    color: "white",
                                    py: { xs: 1.2, lg: 1.5 },
                                    fontFamily: "Noto Sans",
                                    letterSpacing: 0.6,
                                    fontSize: { xs: "13px", lg: "14px" },
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    borderRadius: "12px",
                                    mb: { xs: 1.5, lg: 2 },
                                    boxShadow: "none",
                                    transition: "background-color 0.3s ease, color 0.4s ease",
                                    "&:hover": {
                                        backgroundColor: "rgba(189,236,118,0.87)",
                                        color: "var(--burgundy-dark)",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                BUYURTMA QILISH
                            </Button>

                            {/* Cancel Link */}
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontFamily: "Noto Sans",
                                    fontSize: { xs: "13px", lg: "15px" },
                                    color: "var(--burgundy-dark)",
                                    cursor: "pointer"
                                }}
                                onClick={() => navigate("/catalog")}
                            >
                                Yoki xaridlarni anti-to'xtatish
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Container>
        </Stack>
    )
}

export default Cart

