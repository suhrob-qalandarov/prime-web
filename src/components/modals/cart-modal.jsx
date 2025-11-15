"use client"

import "./cart-modal.css"
import { Box, Stack, Typography } from "@mui/material"
import { CartCloseIcon } from "../../icons"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const CartModal = ({ isOpen, onClose }) => {
    const [screenSize, setScreenSize] = useState("desktop")

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 768) {
                setScreenSize("mobile")
            } else if (width < 1024) {
                setScreenSize("tablet")
            } else {
                setScreenSize("desktop")
            }
        }

        handleResize() // Check initial size
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const getResponsiveStyles = () => {
        switch (screenSize) {
            case "mobile":
                return {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    width: "100%",
                    height: "100vh",
                    margin: "0",
                    borderRadius: "0",
                    transform: "none",
                }
            case "tablet":
                return {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    width: "90%",
                    maxWidth: "500px",
                    height: "80vh",
                    margin: "0",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "20px",
                }
            default: // desktop
                return {} // Use default CSS styles
        }
    }

    return (
        <div className="cart-modal show" onClick={handleBackdropClick}>
            <Stack className="cart-modal-content" style={getResponsiveStyles()}>
                {/* Header */}
                <Box className="cart-header">
                    <h3 className="cart-title">Savat</h3>
                    <button className="cart-close" onClick={onClose}>
                        <CartCloseIcon />
                    </button>
                </Box>

                {/* Body */}
                <Box className="cart-body" id="cartBody">
                    <div className="cart-empty" id="cartEmpty">
                        <small>Ha ul-bul narsa qo'shmaymizmi bu yerga?</small>
                    </div>
                    <Typography className="cart-items" id="cartItems">
                        {/* Cart items will be populated dynamically */}
                    </Typography>
                </Box>

                {/* Footer */}
                <Box className="cart-footer" id="cartFooter">
                    <div className="cart-total">
                        <span className="cart-total-label">Summa</span>
                        <span className="cart-total-price" id="cartTotalPrice">
              0 So&apos;m
            </span>
                    </div>
                    <Box className="cart-buttons">
                        <Link to="/order" className="cart-checkout-btn" id="cartCheckoutBtn" onClick={onClose}>
                            Buyurtma qilish
                        </Link>
                        <Link to="/cart" className="cart-view-btn" id="cartViewBtn" onClick={onClose}>
                            Savat
                        </Link>
                    </Box>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "15px",
                            marginBottom: "-5px",
                            fontWeight: "normal",
                            letterSpacing: "0.8px",
                            padding: "8px",
                            color: "#6B7280",
                            fontFamily: "Noto Sans",
                            cursor: "pointer",
                        }}
                    >
                        <span onClick={onClose}>Yoki xaridlarni anti-to&apos;xtatish</span>
                    </Typography>
                </Box>
            </Stack>
        </div>
    )
}

export default CartModal
