import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Container,
    Box,
    Stack,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Button,
    Divider,
} from "@mui/material"
import PageHeader from "../../common/PageHeader"
import AuthService from "../../../service/auth"
import OrderService from "../../../service/order"

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState("")
    const [deliveryMethod, setDeliveryMethod] = useState("bts")
    const [promoCode, setPromoCode] = useState("")
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    // Mock data for demonstration - replace with actual cart data
    const mockProduct = {
        id: 1,
        name: "Kurtka Ayiq",
        details: "Qora XL (bo'y 176-187)",
        quantity: 1,
        price: 336000,
        originalPrice: 420000,
        discount: 84000,
        image: "/images/spotlights/clothe.jpg",
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userFromLS = await AuthService.getUserFromLS()
            if (userFromLS && userFromLS.id) {
                setUser(userFromLS)
            } else {
                navigate("/login")
            }
            setLoading(false)
        }
        fetchUser()

        // TODO: Fetch actual cart items from localStorage or API
        // For now, using mock data
        setCartItems([mockProduct])
    }, [navigate])

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " So'm"
    }

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price || item.originalPrice - item.discount), 0)
    }

    const calculateDiscount = () => {
        return cartItems.reduce((sum, item) => sum + (item.discount || 0), 0)
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price), 0)
    }

    const handlePayment = async () => {
        try {
            const orderData = {
                comment: comment,
                deliveryMethod: deliveryMethod,
                promoCode: promoCode || null,
                orderItems: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            }

            await OrderService.confirmOrder(orderData)
            // Navigate to success page or show success message
            navigate("/profile")
        } catch (error) {
            console.error("Error confirming order:", error)
            // Show error message
        }
    }

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography>Yuklanmoqda...</Typography>
            </Box>
        )
    }

    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    const total = calculateTotal()

    return (
        <Stack>
            <PageHeader title="Buyurtma qilish" />
            <Container
                maxWidth="xl"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 3, md: 5 },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "1fr 1px 1fr" },
                        gap: { xs: 3, lg: 4 },
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {/* Left Section */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* Comment Field */}
                        <TextField
                            label="Izoh..."
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />

                        {/* Delivery Method Selection */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    mb: 2,
                                    color: "#1a1a1a",
                                }}
                            >
                                Yetkazib berish usulini tanlang
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={deliveryMethod}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="bts"
                                        control={<Radio />}
                                        label={
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                                    BTS Pochta
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        mb: 1,
                                                        color: "#666",
                                                    }}
                                                >
                                                    Viloyatlarga (BTS):
                                                </Typography>
                                                <Box sx={{ pl: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
                                                    <Typography sx={{ fontSize: "13px", color: "#666" }}>
                                                        • 2-4 kun ichida sizga eng yaqin BTS chiqarish punktigacha yetkaziladi.
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "13px", color: "#666" }}>
                                                        • Buyurtmani onlayn rasmiylashtirishda to'lovni amalga oshiring, yetkazib berish uchun esa mahsulotni qabul qilganingizda to'laysiz.
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "13px", color: "#666" }}>
                                                        • Buyurtmangizni o'zingizga qulay vaqtda olib ketishingiz mumkin.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        sx={{
                                            mb: 2,
                                            alignItems: "flex-start",
                                            "& .MuiFormControlLabel-label": {
                                                ml: 1,
                                            },
                                        }}
                                    />
                                    <FormControlLabel
                                        value="yandex"
                                        control={<Radio />}
                                        label={
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Yandex Yetkazib berish
                                            </Typography>
                                        }
                                        sx={{
                                            mb: 2,
                                            "& .MuiFormControlLabel-label": {
                                                ml: 1,
                                            },
                                        }}
                                    />
                                    <FormControlLabel
                                        value="pickup"
                                        control={<Radio />}
                                        label={
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Typography sx={{ fontWeight: 600 }}>
                                                    Do'kondan olib ketish
                                                </Typography>
                                                <Typography sx={{ fontSize: "13px", color: "#999", fontStyle: "italic" }}>
                                                    Tez orada...
                                                </Typography>
                                            </Box>
                                        }
                                        sx={{
                                            "& .MuiFormControlLabel-label": {
                                                ml: 1,
                                            },
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        {/* Payment Button */}
                        <Button
                            variant="contained"
                            onClick={handlePayment}
                            sx={{
                                backgroundColor: "#333",
                                color: "white",
                                py: 1.5,
                                fontSize: "16px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#555",
                                },
                            }}
                        >
                            TO'LASH
                        </Button>
                    </Box>

                    {/* Divider */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            display: { xs: "none", lg: "block" },
                            borderColor: "#e0e0e0",
                        }}
                    />

                    {/* Right Section */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* Customer Info */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    mb: 2,
                                    color: "#1a1a1a",
                                }}
                            >
                                Mijoz
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Box>
                                    <Typography
                                        component="span"
                                        sx={{ fontSize: "14px", color: "#666", mr: 1 }}
                                    >
                                        Ism:
                                    </Typography>
                                    <Typography component="span" sx={{ fontSize: "16px", fontWeight: 700 }}>
                                        {user?.firstName || "Noma'lum"}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        component="span"
                                        sx={{ fontSize: "14px", color: "#666", mr: 1 }}
                                    >
                                        Telefon raqami:
                                    </Typography>
                                    <Typography component="span" sx={{ fontSize: "16px", fontWeight: 700 }}>
                                        {user?.phone || "Noma'lum"}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Order Heading */}
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#1a1a1a",
                            }}
                        >
                            Buyurtma
                        </Typography>

                        {/* Product Information */}
                        {cartItems.map((item) => (
                            <Box key={item.id} sx={{ display: "flex", gap: 2 }}>
                                <Box
                                    component="img"
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    sx={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 0.5 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px", color: "#666", mb: 1 }}>
                                        {item.details}
                                    </Typography>
                                    <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                                        {item.quantity} x {formatPrice(item.price)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        {/* Cashback Wallet */}
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#1a1a1a",
                                    }}
                                >
                                    Keshbek Hamyondan Sarflash
                                </Typography>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "18px",
                                        height: "18px",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    ?
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#333",
                                    color: "white",
                                    py: 1,
                                    px: 2,
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#555",
                                    },
                                }}
                            >
                                Keshbek hamyon
                            </Button>
                        </Box>

                        {/* Promo Code */}
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#1a1a1a",
                                    }}
                                >
                                    Promo-Kod
                                </Typography>
                                <Box
                                    component="span"
                                    sx={{
                                        width: "18px",
                                        height: "18px",
                                        borderRadius: "50%",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    ?
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <TextField
                                    placeholder="Promo-kodni kiriting"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    size="small"
                                    sx={{
                                        flex: 1,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#333",
                                        color: "white",
                                        px: 3,
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        borderRadius: "8px",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#555",
                                        },
                                    }}
                                >
                                    QO'LLASH
                                </Button>
                            </Box>
                        </Box>

                        {/* Order Summary */}
                        <Box
                            sx={{
                                borderTop: "1px solid #e0e0e0",
                                pt: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                            }}
                        >
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{ fontSize: "15px", color: "#666" }}>
                                    Summa
                                </Typography>
                                <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                                    {formatPrice(subtotal)}
                                </Typography>
                            </Box>
                            {discount > 0 && (
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ fontSize: "15px", color: "#666" }}>
                                        Chegirma
                                    </Typography>
                                    <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#d32f2f" }}>
                                        -{formatPrice(discount)}
                                    </Typography>
                                </Box>
                            )}
                            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
                                <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
                                    Jami
                                </Typography>
                                <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
                                    {formatPrice(total)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Stack>
    )
}

export default ConfirmOrder

