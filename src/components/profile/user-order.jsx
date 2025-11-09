import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/material"
import {useState, useEffect, useImperativeHandle, forwardRef, useCallback} from "react"
import OrderService from "../../service/order"
import "./user-order.css"

const UserOrder = forwardRef(({ user }, ref) => {
    const [orders, setOrders] = useState({
        pendingOrders: [],
        confirmedOrders: [],
        shippedOrders: [],
    })
    const [activeStatus, setActiveStatus] = useState("pending")
    const [loading, setLoading] = useState(true)

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true)
            if (user && user.id) {
                const response = await OrderService.getOrdersById(user.id);
                setOrders(response)
                localStorage.setItem("prime-user-orders", JSON.stringify(response))
                localStorage.setItem("fetched-orders-date", Date.now().toString())
            } else {
                console.error("User not found in localStorage");
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        const fetchedOrdersDate = localStorage.getItem("fetched-orders-date")
        const userOrdersData = localStorage.getItem("prime-user-orders")

        const hydrateOrders = async () => {
            try {
                const now = Date.now()
                const threeHours = 3 * 60 * 60 * 1000

                if (userOrdersData && fetchedOrdersDate) {
                    const parsedOrders = JSON.parse(userOrdersData) || "{}"
                    const lastFetched = parseInt(fetchedOrdersDate, 10)

                    if (now - lastFetched > threeHours) {
                        await fetchOrders()
                    } else {
                        setOrders(parsedOrders)
                        setLoading(false)
                    }
                } else {
                    await fetchOrders()
                }
            } catch (e) {
                console.error("Error parsing orders:", e)
                setLoading(false)
            }
        }

        hydrateOrders()
    }, [fetchOrders])

    useImperativeHandle(ref, () => ({
        fetchOrders,
    }))

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "#FFA500" // Orange for pending
            case "confirmed":
                return "#4CAF50" // Green for confirmed
            case "shipped":
                return "#2196F3" // Blue for shipped
            default:
                return "#757575"
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "pending":
                return "Kutilmoqda"
            case "confirmed":
                return "Rasmiylashtirildi"
            case "shipped":
                return "Bajarildi"
            default:
                return status
        }
    }

    const getCurrentOrders = () => {
        switch (activeStatus) {
            case "pending":
                return orders.pendingOrders
            case "confirmed":
                return orders.confirmedOrders
            case "shipped":
                return orders.shippedOrders
            default:
                return []
        }
    }

    const currentOrders = getCurrentOrders()

    return (
        <Card
            sx={{
                minWidth: { xs: "100%", sm: "100%", md: 650, lg: 700 },
                maxWidth: { xs: "100%", sm: "100%", md: 800, lg: 900 },
                width: { xs: "100%", sm: "100%", md: "100%", lg: "auto" },
                margin: "0 auto",
                marginTop: { xs: "10px", sm: "10px", md: "10px", lg: "10px" },
                marginLeft: { xs: 0, sm: 0, md: 0, lg: "-200px" },
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                "@media (min-width: 769px)": {
                    marginTop: "10px",
                },
            }}
        >
            <CardContent sx={{
                padding: { xs: "20px", sm: "25px", md: "30px", lg: "30px" }
            }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "var(--burgundy-dark)",
                        marginBottom: { xs: "15px", sm: "15px", md: "20px", lg: "20px" },
                        fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
                    }}
                >
                    Buyurtmalar
                </Typography>

                {/* Status buttons */}
                {/* Status buttons */}
                <Box
                    className="status-buttons"
                    sx={{
                        marginBottom: { xs: "15px", sm: "15px", md: "20px", lg: "20px" },
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: { xs: "8px", sm: "8px", md: "10px", lg: "10px" },
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        paddingBottom: "5px",
                        "&::-webkit-scrollbar": {
                            height: "4px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#ccc",
                            borderRadius: "4px",
                        },
                    }}
                >
                    <Button
                        className={`status-btn ${activeStatus === "pending" ? "active" : ""}`}
                        onClick={() => setActiveStatus("pending")}
                        sx={{
                            backgroundColor: activeStatus === "pending" ? "#f5f5f5" : "transparent",
                            color: activeStatus === "pending" ? "#333" : "#666",
                            fontWeight: activeStatus === "pending" ? "bold" : "normal",
                            padding: { xs: "6px 12px", sm: "6px 12px", md: "8px 16px", lg: "8px 16px" },
                            borderRadius: "20px",
                            textTransform: "none",
                            minWidth: { xs: "80px", sm: "100px", md: "100px", lg: "100px" },
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1rem" },
                            flexShrink: 1,
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        Kutilmoqda
                    </Button>
                    <Button
                        className={`status-btn ${activeStatus === "confirmed" ? "active" : ""}`}
                        onClick={() => setActiveStatus("confirmed")}
                        sx={{
                            backgroundColor: activeStatus === "confirmed" ? "#f5f5f5" : "transparent",
                            color: activeStatus === "confirmed" ? "#333" : "#666",
                            fontWeight: activeStatus === "confirmed" ? "bold" : "normal",
                            padding: { xs: "6px 12px", sm: "6px 12px", md: "8px 16px", lg: "8px 16px" },
                            borderRadius: "20px",
                            textTransform: "none",
                            minWidth: { xs: "80px", sm: "100px", md: "100px", lg: "100px" },
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1rem" },
                            flexShrink: 1,
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        Rasmiylashtirildi
                    </Button>
                    <Button
                        className={`status-btn ${activeStatus === "shipped" ? "active" : ""}`}
                        onClick={() => setActiveStatus("shipped")}
                        sx={{
                            backgroundColor: activeStatus === "shipped" ? "#f5f5f5" : "transparent",
                            color: activeStatus === "shipped" ? "#333" : "#666",
                            fontWeight: activeStatus === "shipped" ? "bold" : "normal",
                            padding: { xs: "6px 12px", sm: "6px 12px", md: "8px 16px", lg: "8px 16px" },
                            borderRadius: "20px",
                            textTransform: "none",
                            minWidth: { xs: "80px", sm: "100px", md: "100px", lg: "100px" },
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1rem" },
                            flexShrink: 1,
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        Bajarildi
                    </Button>
                </Box>

                {/* Orders list */}
                <Box className="orders-container">
                    {loading ? (
                        <Typography sx={{
                            textAlign: "center",
                            color: "#666",
                            padding: { xs: "20px", sm: "30px", md: "40px", lg: "40px" }
                        }}>Yuklanmoqda...</Typography>
                    ) : currentOrders.length === 0 ? (
                        <Typography sx={{
                            textAlign: "center",
                            color: "#666",
                            padding: { xs: "20px", sm: "30px", md: "40px", lg: "40px" }
                        }}>
                            Bunday statusli buyurtmalar yo'q
                        </Typography>
                    ) : (
                        <Stack spacing={{ xs: 1.5, sm: 2, md: 2, lg: 2 }}>
                            {currentOrders.map((order) => (
                                <Card
                                    key={order.id}
                                    className="order-card"
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "12px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <CardContent sx={{
                                        padding: { xs: "15px", sm: "20px", md: "25px", lg: "25px" }
                                    }}>
                                        {/* Order header */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: { xs: "space-between", sm: "space-between", md: "space-between", lg: "space-between" },
                                                alignItems: "center",
                                                flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
                                                gap: { xs: "10px", sm: 0, md: 0, lg: 0 },
                                                marginBottom: { xs: "10px", sm: "10px", md: "10px", lg: "10px" },
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: "bold",
                                                    textAlign: { xs: "center", sm: "left", md: "left", lg: "left" },
                                                    fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.25rem", lg: "1.25rem" },
                                                }}
                                            >
                                                Buyurtma №{order.id}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    backgroundColor: getStatusColor(activeStatus),
                                                    color: "white",
                                                    padding: { xs: "6px 12px", sm: "4px 12px", md: "4px 12px", lg: "4px 12px" },
                                                    borderRadius: "12px",
                                                    fontSize: { xs: "11px", sm: "12px", md: "12px", lg: "12px" },
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {getStatusText(activeStatus)}
                                            </Box>
                                        </Box>

                                        {/* Order date */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#666",
                                                marginBottom: { xs: "10px", sm: "10px", md: "15px", lg: "15px" },
                                                textAlign: { xs: "center", sm: "left", md: "left", lg: "left" },
                                                fontSize: { xs: "0.875rem", sm: "0.875rem", md: "0.875rem", lg: "0.875rem" },
                                            }}
                                        >
                                            {formatDate(order.createdAt)}
                                        </Typography>

                                        {/* Order summary */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
                                                gap: { xs: "8px", sm: 0, md: 0, lg: 0 },
                                                marginBottom: { xs: "10px", sm: "10px", md: "15px", lg: "15px" },
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    textAlign: { xs: "center", sm: "left", md: "left", lg: "left" },
                                                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" },
                                                }}
                                            >
                                                {order.orderItems.reduce((total, item) => total + item.count, 0)} ta mahsulot
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: "bold",
                                                    textAlign: { xs: "center", sm: "right", md: "right", lg: "right" },
                                                    fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.25rem", lg: "1.25rem" },
                                                }}
                                            >
                                                Jami: {order.totalSum.toLocaleString()} So'm
                                            </Typography>
                                        </Box>

                                        {/* Order details button */}
                                        <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start", md: "flex-start", lg: "flex-start" } }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#333",
                                                    color: "white",
                                                    borderRadius: "20px",
                                                    textTransform: "none",
                                                    padding: { xs: "8px 16px", sm: "8px 20px", md: "8px 20px", lg: "8px 20px" },
                                                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1rem", lg: "1rem" },
                                                    "&:hover": {
                                                        backgroundColor: "#555",
                                                    },
                                                }}
                                            >
                                                Buyurtma ma'lumotlari
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
})

export default UserOrder