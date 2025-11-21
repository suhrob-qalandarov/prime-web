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
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import CloseIcon from "@mui/icons-material/Close"
import PageHeader from "../../common/PageHeader"
import urls from "../../../constants/urls"

const Cart = () => {
    const navigate = useNavigate()
    
    // Mock cart data - replace with actual cart from localStorage or API
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            productId: 1,
            name: "Kurtka Ayiq",
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
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(1, item.quantity + change)
                    return { ...item, quantity: newQuantity }
                }
                return item
            })
        )
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
                maxWidth="xl"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 3, md: 5 },
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
                            gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
                            gap: { xs: 3, lg: 4 },
                            maxWidth: "1400px",
                            margin: "0 auto",
                        }}
                    >
                        {/* Left Section - Cart Items */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {cartItems.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        p: 2,
                                        borderBottom: "1px solid #e0e0e0",
                                        "&:last-child": {
                                            borderBottom: "none",
                                        },
                                    }}
                                >
                                    {/* Product Image - Left */}
                                    <Box
                                        component="img"
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        sx={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            flexShrink: 0,
                                        }}
                                    />

                                    {/* Product Details - Middle */}
                                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                color: "#1a1a1a",
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        <Typography sx={{ fontSize: "14px", color: "#666" }}>
                                            {item.color}
                                        </Typography>

                                        <Typography sx={{ fontSize: "14px", color: "#666" }}>
                                            {item.size}
                                        </Typography>
                                    </Box>

                                    {/* Right Side - Price, Quantity, Total, Remove */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        {/* Price */}
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.5 }}>
                                            {item.originalPrice && item.originalPrice > item.price ? (
                                                <>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "16px",
                                                            fontWeight: 600,
                                                            color: "#1a1a1a",
                                                        }}
                                                    >
                                                        {formatPrice(item.price)}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#999",
                                                            textDecoration: "line-through",
                                                        }}
                                                    >
                                                        {formatPrice(item.originalPrice)}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography
                                                    sx={{
                                                        fontSize: "16px",
                                                        fontWeight: 600,
                                                        color: "#1a1a1a",
                                                    }}
                                                >
                                                    {formatPrice(item.price)}
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Quantity Selector */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    width: "32px",
                                                    height: "32px",
                                                    backgroundColor: "#f5f5f5",
                                                    "&:hover": {
                                                        backgroundColor: "#e0e0e0",
                                                    },
                                                }}
                                            >
                                                <RemoveIcon sx={{ fontSize: "18px" }} />
                                            </IconButton>
                                            <Typography
                                                sx={{
                                                    minWidth: "30px",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    width: "32px",
                                                    height: "32px",
                                                    backgroundColor: "#f5f5f5",
                                                    "&:hover": {
                                                        backgroundColor: "#e0e0e0",
                                                    },
                                                }}
                                            >
                                                <AddIcon sx={{ fontSize: "18px" }} />
                                            </IconButton>
                                        </Box>

                                        {/* Total Price */}
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                color: "#1a1a1a",
                                            }}
                                        >
                                            {formatPrice(item.price * item.quantity)}
                                        </Typography>

                                        {/* Remove Button */}
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveItem(item.id)}
                                            sx={{
                                                color: "#ef4444",
                                                padding: "4px",
                                                "&:hover": {
                                                    backgroundColor: "transparent",
                                                },
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: "18px" }} />
                                        </IconButton>
                                    </Box>
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
                                borderRadius: "8px",
                                p: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    letterSpacing: 0.7,
                                    mb: 3,
                                    color: "var(--burgundy-light)",
                                }}
                            >
                                Buyurtma
                            </Typography>

                            {/* Order Summary */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                                        Summa
                                    </Typography>
                                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                                        {formatPrice(subtotal)}
                                    </Typography>
                                </Box>
                                {discount > 0 && (
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                                            Chegirma
                                        </Typography>
                                        <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#d32f2f" }}>
                                            -{formatPrice(discount)}
                                        </Typography>
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        pt: 2,
                                        borderTop: "1px solid #e0e0e0",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "22px",
                                        fontWeight: 700,
                                        letterSpacing: 0.7,
                                    }}>
                                        Jami
                                    </Typography>
                                    <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
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
                                    backgroundColor: "var(--burgundy-color)",
                                    color: "white",
                                    py: 1.5,
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    borderRadius: "8px",
                                    mb: 2,
                                    "&:hover": {
                                        backgroundColor: "var(--burgundy-dark)",
                                    },
                                }}
                            >
                                BUYURTMA QILISH
                            </Button>

                            {/* Cancel Link */}
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "15px",
                                    color: "#666",
                                    cursor: "pointer",
                                    mt: 1,
                                    "&:hover": {
                                        color: "#333",
                                    },
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

