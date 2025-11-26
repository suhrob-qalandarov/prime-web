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
    Collapse,
} from "@mui/material"
import PageHeader from "../../common/PageHeader"
import AuthService from "../../../service/auth"
import OrderService from "../../../service/order"

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [comment, setComment] = useState("")
    const [deliveryMethod, setDeliveryMethod] = useState("bts")
    const [btsOpen, setBtsOpen] = useState(true)
    const [yandexOpen, setYandexOpen] = useState(false)
    const [promoCode, setPromoCode] = useState("")
    const [cartItems, setCartItems] = useState([
        {
        id: 1,
        productId: 1,
        name: "Kurtka Ayiq",
        brand: "North Face",
        color: "Qora",
        size: "XL",
        price: 336000,
        originalPrice: 420000,
        quantity: 1,
        image: "/images/spotlights/clothe.jpg",
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
        }
    ])
    const [loading, setLoading] = useState(true)
    
    // Phone verification states
    const [codeSent, setCodeSent] = useState(false)
    const [code, setCode] = useState("")
    const [sendingCode, setSendingCode] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [verified, setVerified] = useState(false)
    const [telegram, setTelegram] = useState("")
    const [fullName, setFullName] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            const userFromLS = await AuthService.getUserFromLS()
            if (userFromLS && userFromLS.id) {
                setCustomer(userFromLS)
            } else {
                navigate("/login")
            }
            setLoading(false)
        }
        fetchUser()
    }, [navigate])

    const formatPrice = (price) => {
        return new Intl.NumberFormat("fr-FR").format(price) + " So'm"
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

    const handleSendCode = async () => {
        setSendingCode(true)
        try {
            // TODO: Call API to send verification code
            // await AuthService.sendVerificationCode(user.phone)
            await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
            setCodeSent(true)
        } catch (error) {
            console.error("Error sending code:", error)
        } finally {
            setSendingCode(false)
        }
    }

    const handleVerifyCode = async () => {
        if (code.length !== 6) return
        
        setVerifying(true)
        try {
            // TODO: Call API to verify code
            // await AuthService.verifyCode(user.phone, code)
            await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
            setVerified(true)
        } catch (error) {
            console.error("Error verifying code:", error)
            // Show error message
        } finally {
            setVerifying(false)
        }
    }

    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "") // Only numbers
        if (value.length <= 6) {
            setCode(value)
        }
    }

    const handleDeliveryMethodChange = (newMethod) => {
        if (newMethod === deliveryMethod) return
        if (newMethod === "bts") {
            setBtsOpen(true)
            setTimeout(() => {
                setYandexOpen(false)
            }, 200)
        } else if (newMethod === "yandex") {
            setYandexOpen(true)
            setTimeout(() => {
                setBtsOpen(false)
            }, 200)
        }
        setDeliveryMethod(newMethod)
    }

    const handlePayment = async () => {
        try {
            const orderData = {
                comment: comment,
                deliveryMethod: deliveryMethod,
                promoCode: promoCode || null,
                telegram: telegram,
                fullName: fullName,
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
                        {!verified ? (
                            <>
                                {!codeSent ? (
                                    <>
                                        {/* Form Title - Before code sent */}
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Noto Sans",
                                                    fontSize: "22px",
                                                    fontWeight: 700,
                                                    letterSpacing: 0.7,
                                                    color: "var(--burgundy-dark)",
                                                }}
                                            >
                                                Formani to'ldiring
                                            </Typography>
                                        </Box>

                                        {/* F.I.O field */}
                                        <Box>
                                            <Typography sx={{
                                                fontFamily: "Noto Sans",
                                                fontSize: "14px",
                                                color: "var(--burgundy-color)",
                                                mb: 1
                                            }}>
                                                Iltimos, buyurtma rasmiylashtiriladigan to'liq ismni kiriting (Buyurtma shu nomga rasmiylashtiriladi)
                                            </Typography>
                                            <TextField
                                                label="F.I.O *"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                fullWidth
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                    },
                                                }}
                                            />
                                        </Box>

                                        {/* Telegram username or phone number field */}
                                        <Box>
                                            <Typography sx={{
                                                fontFamily: "Noto Sans",
                                                fontSize: "14px",
                                                color: "var(--burgundy-color)",
                                                mb: 1
                                            }}>
                                                Iltimos, Telegram username yoki Telegramda ro'yxatdan o'tilgan raqamingizni kiriting
                                            </Typography>
                                            <TextField
                                                label="Telegram username/telefon raqam *"
                                                value={telegram}
                                                onChange={(e) => setTelegram(e.target.value)}
                                                fullWidth
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                    },
                                                }}
                                            />
                                        </Box>

                                        {/* Comment field */}
                                        <Box>
                                            <TextField
                                                label="Izoh..."
                                                multiline
                                                rows={2}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                fullWidth
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                    },
                                                }}
                                            />
                                        </Box>

                                        {/* Send Code Button */}
                                        <Button
                                            variant="contained"
                                            onClick={handleSendCode}
                                            disabled={sendingCode || !fullName.trim() || !telegram.trim()}
                                            sx={{
                                                backgroundColor: "var(--burgundy-dark)",
                                                color: "white",
                                                py: 1,
                                                px: 2,
                                                fontFamily: "Noto Sans",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                textTransform: "uppercase",
                                                borderRadius: "8px",
                                                boxShadow: "none",
                                                transition: "background-color 0.3s ease, color 0.4s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(189,236,118,0.87)",
                                                    color: "var(--burgundy-dark)",
                                                    boxShadow: "none",
                                                },
                                                "&:disabled": {
                                                    backgroundColor: "#999",
                                                },
                                            }}
                                        >
                                            {sendingCode ? "Yuborilmoqda..." : "Kodni yuborish"}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {/* Buyurtma ma'lumotlari - codeSent bo'lganda */}
                                            <Typography
                                                sx={{
                                                    fontFamily: "Noto Sans",
                                                    fontSize: "22px",
                                                    fontWeight: 700,
                                                    letterSpacing: 0.7,
                                                    color: "var(--burgundy-dark)",
                                                    mb: 2
                                            }}
                                            >
                                                Buyurtma ma'lumotlari
                                            </Typography>
                                        
                                        {/* Qabul qiluvchi - faqat fullName va telegram to'ldirilganda ko'rinadi */}
                                        {fullName && telegram && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: "Noto Sans",
                                                        fontSize: "22px",
                                                        fontWeight: 700,
                                                        letterSpacing: 0.7,
                                                        color: "var(--burgundy-dark)",
                                                        mb: 2
                                                    }}
                                                >
                                                    Qabul qiluvchi
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "14px",
                                                                color: "#666",
                                                                mr: 1
                                                            }}>
                                                        Ism:
                                                    </Typography>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "16px",
                                                                fontWeight: 700
                                                            }}>
                                                        {fullName || user?.firstName || "Noma'lum"}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "14px",
                                                                color: "#666",
                                                                mr: 1
                                                            }}>
                                                            Telegram username/raqam:
                                                    </Typography>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "16px",
                                                                fontWeight: 700
                                                            }}>
                                                        {telegram || "Noma'lum"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        )}

                                        {/* Comment field - After code sent */}
                                        {comment && (<Box sx={{ mb: 2 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "18px",
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    color: "#1a1a1a",
                                                }}
                                            >
                                                Izoh
                                            </Typography>
                                            <Typography sx={{ fontSize: "16px", color: "#1a1a1a" }}>
                                                {comment}
                                            </Typography>
                                        </Box>)}

                                        {/* Code Input and Verify Button - Yetkazib berish tepasidan - faqat verified bo'lmaganida */}
                                        {!verified && (
                                            <Box sx={{ mb: 2 }}>
                                                <Typography sx={{ fontSize: "15px", color: "#1a1a1a", mb: 1 }}>
                                                    <a className="text-[var(--burgundy-dark)] underline underline-offset-4 font-['Noto Sans']" href="https://t.me/prime77uzBot" target="_blank" rel="noopener noreferrer">
                                                        @prime77uzbot
                                                    </a>
                                                    <span>&nbsp;&nbsp;telegram botiga kiring va buyurtmani tasdiqlash uchun 2 daqiqalik kodingizni oling.</span>
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                    <TextField
                                                        value={code}
                                                        onChange={handleCodeChange}
                                                        placeholder="000000"
                                                        size="small"
                                                        inputProps={{
                                                            maxLength: 6,
                                                            pattern: "[0-9]*",
                                                            inputMode: "numeric",
                                                            style: {
                                                                textAlign: "center",
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "16px",
                                                                color: "var(--burgundy-dark)",
                                                                letterSpacing: "4px",
                                                                fontWeight: 600,
                                                            },
                                                        }}
                                                        sx={{
                                                            flex: 0.5,
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "8px",
                                                            },
                                                        }}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleVerifyCode}
                                                        disabled={verifying || code.length !== 6}
                                                        sx={{
                                                            backgroundColor: "var(--burgundy-dark)",
                                                            color: "white",
                                                            py: 1.2,
                                                            px: 4,
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "12px",
                                                            fontWeight: 600,
                                                            textTransform: "uppercase",
                                                            borderRadius: "8px",
                                                            boxShadow: "none",
                                                            transition: "background-color 0.3s ease, color 0.4s ease",
                                                            "&:hover": {
                                                                backgroundColor: "rgba(189,236,118,0.87)",
                                                                color: "var(--burgundy-dark)",
                                                                boxShadow: "none",
                                                            },
                                                            "&:disabled": {
                                                                backgroundColor: "#999",
                                                            },
                                                        }}
                                                    >
                                                        {verifying ? "Tekshirilmoqda..." : "Tasdiqlash"}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Buyurtma ma'lumotlari */}
                                <Typography
                                    sx={{
                                        fontFamily: "Noto Sans",
                                        fontSize: "22px",
                                        fontWeight: 700,
                                        letterSpacing: 0.7,
                                        color: "var(--burgundy-dark)",
                                        mb: 2
                                }}>
                                    Buyurtma ma'lumotlari
                                </Typography>

                                {/* Mijoz va Qabul qiluvchi bitta row da */}
                                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, mb: 2 }}>
                                    {/* Mijoz - faqat verified bo'lganda ko'rinadi */}
                                    {verified && (
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Noto Sans",
                                                    fontSize: "22px",
                                                    fontWeight: 700,
                                                    letterSpacing: 0.7,
                                                    color: "var(--burgundy-dark)",
                                                    mb: 2
                                            }}>
                                                Mijoz
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "14px",
                                                            color: "#666",
                                                            mr: 1
                                                    }}>
                                                        Ism:
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "16px",
                                                            fontWeight: 700
                                                    }}>
                                                        {customer.firstName || "Noma'lum"}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "14px",
                                                            color: "#666",
                                                            mr: 1
                                                    }}>
                                                        Telefon raqam:
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "16px",
                                                            fontWeight: 700
                                                    }}>
                                                        {customer.phone || "Noma'lum"}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "14px",
                                                            color: "#666",
                                                            mr: 1
                                                    }}>
                                                        Telegram username:
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "16px",
                                                            fontWeight: 700
                                                    }}>
                                                        @{customer.username || "Noma'lum"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}

                                    {/* Qabul qiluvchi - faqat fullName va telegram to'ldirilganda ko'rinadi */}
                                    {fullName && telegram && (
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: "Noto Sans",
                                                    fontSize: "22px",
                                                    fontWeight: 700,
                                                    letterSpacing: 0.7,
                                                    color: "var(--burgundy-dark)",
                                                    mb: 2
                                            }}>
                                                Qabul qiluvchi
                                            </Typography>
                                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "14px",
                                                            color: "#666",
                                                            mr: 1
                                                    }}>
                                                        Ism:
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "16px",
                                                            fontWeight: 700
                                                    }}>
                                                        {fullName || user?.firstName || "Noma'lum"}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            fontFamily: "Noto Sans",
                                                            fontSize: "14px",
                                                            color: "#666",
                                                            mr: 1
                                                    }}>
                                                        Telegram username/raqam:
                                                    </Typography>
                                                    <Box>
                                                        <Typography
                                                            component="span"
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "16px",
                                                                fontWeight: 700
                                                            }}>
                                                            {telegram || "Noma'lum"}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>

                                {/* Comment field - After verification */}
                                {comment && (<Box>
                                    <Typography
                                        sx={{
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            mb: 2,
                                            color: "#1a1a1a",
                                        }}
                                    >
                                        Izoh
                                    </Typography>
                                    <Typography sx={{ fontSize: "16px", color: "#1a1a1a" }}>
                                        {comment}
                                    </Typography>
                                </Box>)}

                                {/* Code Input and Verify Button - Yetkazib berish tepasidan - faqat verified bo'lmaganida */}
                                {!verified && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ fontSize: "15px", color: "#1a1a1a", mb: 1 }}>
                                            <a className="text-[var(--burgundy-dark)] underline underline-offset-4 font-['Noto Sans']" href="https://t.me/prime77uzBot" target="_blank" rel="noopener noreferrer">
                                                @prime77uzbot
                                            </a>
                                            <span>&nbsp;&nbsp;telegram botiga kiring va buyurtmani tasdiqlash uchun 2 daqiqalik kodingizni oling.</span>
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                            <TextField
                                                value={code}
                                                onChange={handleCodeChange}
                                                placeholder="000000"
                                                size="small"
                                                inputProps={{
                                                    maxLength: 6,
                                                    pattern: "[0-9]*",
                                                    inputMode: "numeric",
                                                    style: {
                                                        textAlign: "center",
                                                        fontFamily: "Noto Sans",
                                                        fontSize: "16px",
                                                        color: "var(--burgundy-dark)",
                                                        letterSpacing: "4px",
                                                        fontWeight: 600,
                                                    },
                                                }}
                                                sx={{
                                                    flex: 0.5,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                    },
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleVerifyCode}
                                                disabled={verifying || code.length !== 6}
                                                sx={{
                                                    backgroundColor: "var(--burgundy-dark)",
                                                    color: "white",
                                                    py: 1.2,
                                                    px: 4,
                                                    fontFamily: "Noto Sans",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    textTransform: "uppercase",
                                                    borderRadius: "8px",
                                                    boxShadow: "none",
                                                    transition: "background-color 0.3s ease, color 0.4s ease",
                                                    "&:hover": {
                                                        backgroundColor: "rgba(189,236,118,0.87)",
                                                        color: "var(--burgundy-dark)",
                                                        boxShadow: "none",
                                                    },
                                                    "&:disabled": {
                                                        backgroundColor: "#999",
                                                    },
                                                }}
                                            >
                                                {verifying ? "Tekshirilmoqda..." : "Tasdiqlash"}
                                            </Button>
                                        </Box>
                                    </Box>
                                )}

                                {/* Delivery Method Selection - After verification */}
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "22px",
                                            fontWeight: 700,
                                            letterSpacing: 0.7,
                                            color: "var(--burgundy-dark)",
                                            mb: 2
                                        }}
                                    >
                                        Yetkazib berish usulini tanlang
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            value={deliveryMethod}
                                            onChange={(e) => handleDeliveryMethodChange(e.target.value)}
                                        >
                                            <Box
                                                onClick={() => handleDeliveryMethodChange("bts")}
                                                sx={{
                                                    p: 2,
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "8px",
                                                    mt: 2,
                                                    cursor: "pointer",
                                                    backgroundColor: "#f0f0f0",
                                                    transition: "background-color 0.2s ease"
                                                }}
                                        >
                                            <FormControlLabel
                                                value="bts"
                                                control={<Radio />}
                                                label={
                                                        <Typography sx={{ fontFamily: "Noto Sans", fontSize: "18px", fontWeight: 500 }}>
                                                            BTS Pochta
                                                        </Typography>
                                                    }
                                                    onClick={(e) => e.stopPropagation()}
                                                    sx={{
                                                        m: 0,
                                                        "& .MuiFormControlLabel-label": {
                                                            ml: 1,
                                                        },
                                                    }}
                                                />
                                                <Collapse in={btsOpen} timeout={{ enter: 200, exit: 700 }}>
                                                    <Box sx={{ pt: 2, pl: 2 }}>
                                                        <Typography
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "16px",
                                                                fontWeight: 600,
                                                                mb: 1
                                                            }}
                                                        >
                                                            <strong>Viloyatlarga (BTS):</strong>
                                                        </Typography>
                                                        <Box component="ul" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
                                                            <Typography component="li" sx={{ fontFamily: "Noto Sans", fontSize: "15px", listStyle: "disc" }}>
                                                                2–4 kun ichida sizga eng yaqin BTS chiqarish punktigacha yetkaziladi.
                                                            </Typography>
                                                            <Typography component="li" sx={{ fontFamily: "Noto Sans", fontSize: "14px", listStyle: "disc" }}>
                                                                Buyurtmani onlayn rasmiylashtirishda to'lovni amalga oshiring, yetkazib berish uchun esa mahsulotni qabul qilganingizda to'laysiz.
                                                            </Typography>
                                                            <Typography component="li" sx={{ fontFamily: "Noto Sans", fontSize: "15px", listStyle: "disc" }}>
                                                                Buyurtmangizni o'zingizga qulay vaqtda olib ketishingiz mumkin.
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                            <Box
                                                onClick={() => handleDeliveryMethodChange("yandex")}
                                                sx={{
                                                    p: 2.5,
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "8px",
                                                    mt: 2.5,
                                                    cursor: "pointer",
                                                    backgroundColor: "#f0f0f0",
                                                    transition: "background-color 0.2s ease",
                                                }}
                                            >
                                            <FormControlLabel
                                                value="yandex"
                                                control={<Radio />}
                                                label={
                                                        <Typography sx={{ fontFamily: "Noto Sans", fontSize: "18px", fontWeight: 500 }}>
                                                        Yandex Yetkazib berish
                                                    </Typography>
                                                }
                                                    onClick={(e) => e.stopPropagation()}
                                                sx={{
                                                        m: 0,
                                                    "& .MuiFormControlLabel-label": {
                                                        ml: 1,
                                                    },
                                                }}
                                            />
                                                <Collapse in={yandexOpen} timeout={{ enter: 200, exit: 700 }}>
                                                    <Box sx={{ pt: 2, pl: 2 }}>
                                                        <Typography
                                                            sx={{
                                                                fontFamily: "Noto Sans",
                                                                fontSize: "16px",
                                                                fontWeight: 600,
                                                                mb: 1,
                                                            }}
                                                        >
                                                            <strong>Toshkent bo'yicha (Yandex):</strong>
                                                        </Typography>
                                                        <Box component="ul" sx={{ pl: 3, m: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
                                                            <Typography component="li" sx={{ fontFamily: "Noto Sans", fontSize: "13px", listStyle: "disc" }}>
                                                                Buyurtmangiz 1–2 kun ichida yetkaziladi.
                                                            </Typography>
                                                            <Typography component="li" sx={{ fontFamily: "Noto Sans", fontSize: "13px", listStyle: "disc" }}>
                                                                Buyurtmani onlayn rasmiylashtirishda to'lovni amalga oshiring, yetkazib berish uchun esa mahsulotni qabul qilganingizda to'laysiz.
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Collapse>
                                            </Box>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                {/* Payment Button - After verification */}
                                <Button
                                    variant="contained"
                                    onClick={handlePayment}
                                    sx={{
                                        backgroundColor: "var(--burgundy-dark)",
                                        color: "white",
                                        py: 1,
                                        px: 2,
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                        borderRadius: "8px",
                                        transition: "background-color 0.3s ease, color 0.4s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(189,236,118,0.87)",
                                            color: "var(--burgundy-dark)",
                                            boxShadow: "none",
                                        },
                                        "&:disabled": {
                                            backgroundColor: "#999",
                                        },
                                    }}
                                >
                                    TO'LASH
                                </Button>
                            </>
                        )}
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
                        {/* Order Heading */}
                        <Typography
                            sx={{
                                fontFamily: "Noto Sans",
                                fontSize: "22px",
                                fontWeight: 700,
                                letterSpacing: 0.7,
                                color: "var(--burgundy-dark)",
                            }}
                        >
                            Buyurtma
                        </Typography>

                        {/* Product Information */}
                        {cartItems.map((item, index) => (
                            <Box key={item.id}>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
                                <Box
                                    component="img"
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    sx={{
                                        width: "100px",
                                        height: "135px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        flexShrink: 0,
                                    }}
                                />
                                    <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "16px",
                                            fontWeight: 600,
                                            color: "var(--burgundy-dark)"
                                        }}
                                    >
                                        {item.name}
                                    </Typography>

                                    {item.brand && (
                                        <Typography sx={{
                                            fontFamily: "Noto Sans",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#1a1a1a",
                                            textTransform: "uppercase",
                                            mb: 0.5
                                        }}>
                                            {item.brand}
                                        </Typography>
                                    )}
                                        </Box>
                                        <Typography sx={{ fontFamily: "Noto Sans", fontSize: "15px",  color: "#1a1a1a", ml: 2 }}>
                                            {item.size} {item.color}
                                        </Typography>
                                        <Typography sx={{ fontFamily: "Noto Sans", fontSize: "15px", fontWeight: 600, ml: 2 }}>
                                        {item.quantity} x {formatPrice(item.price)}
                                    </Typography>
                                </Box>
                            </Box>
                                {/* Border after product - same spacing as gap (gap: 2 = 16px) */}
                                <Box
                                    sx={{
                                        height: "1px",
                                        backgroundColor: "#e0e0e0",
                                        mt: 3,
                                    }}
                                />
                            </Box>
                        ))}

                        {/* Order Summary */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", pb: 1 }}>
                                <Typography sx={{ fontFamily: "Noto Sans", fontSize: "15px", fontWeight: 600, letterSpacing: 0.7 }}>
                                    Summa
                                </Typography>
                                <Typography sx={{ fontFamily: "Noto Sans", fontSize: "15px", fontWeight: 600, letterSpacing: 0.7 }}>
                                    {formatPrice(subtotal)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    pt: 3,
                                    borderTop: "1px solid #e0e0e0",
                                    pb: 1,
                                }}
                            >
                                <Typography sx={{ fontFamily: "Noto Sans", fontSize: "15px", fontWeight: 600, letterSpacing: 0.7 }}>
                                    Chegirma
                                </Typography>
                                <Typography sx={{ fontFamily: "Noto Sans", fontSize: "15px", fontWeight: 600, letterSpacing: 0.7 }}>
                                    -{formatPrice(discount)}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    pt: 2,
                                    pb: 1,
                                    borderTop: "1px solid #e0e0e0",
                                }}
                            >
                                <Typography sx={{
                                    fontFamily: "Noto Sans",
                                    fontSize: "23px",
                                    fontWeight: 700,
                                    letterSpacing: 0.3,
                                    color: "var(--burgundy-dark)",
                                }}>
                                    Jami
                                </Typography>
                                <Typography sx={{ fontFamily: "Noto Sans", fontSize: "24px", fontWeight: 700, letterSpacing: 0.7, color: "var(--burgundy-dark)" }}>
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

