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
                return {
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    width: "550px",
                    height: "calc(100vh - 40px)",
                    borderRadius: "20px",
                }
        }
    }

    return (
        <div
            className="fixed inset-0 z-[2500] flex justify-end opacity-100"
            onClick={handleBackdropClick}
        >
            <div
                className="m-[5px] p-2 bg-white shadow-[5px_0_15px_rgba(0,0,0,0.1)] flex flex-col rounded-[22px]"
                style={getResponsiveStyles()}
            >
                {/* Header */}
                <div className="mt-[-5px] px-4 py-[32px] border-b border-[#e9ecef] flex items-center justify-between">
                    <h3 className="text-[20px] font-extrabold font-['Noto Sans'] text-[color:var(--text-color)] m-0">
                        Savat
                    </h3>
                    <button
                        className="bg-transparent border-none mr-2 text-[28px] text-[#6B7280] hover:text-[color:var(--burgundy-color)] transition-colors"
                        onClick={onClose}
                    >
                        <CartCloseIcon />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 px-5 py-5 overflow-y-auto" id="cartBody">
                    <div
                        className="py-10 px-5 text-[#6B7280] tracking-[0.7px] text-[19.7px] font-normal font-['Noto Sans']"
                        id="cartEmpty"
                    >
                        <small>Ha ul-bul narsa qo&apos;shmaymizmi bu yerga?</small>
                    </div>
                    <div id="cartItems">
                        {/* Cart items will be populated dynamically */}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-2 pb-3 pt-2 border-t border-[#e9ecef] rounded-b-[15px]" id="cartFooter">
                    <div className="flex items-center justify-between mb-2 py-1.5 text-[16px] font-semibold text-[color:var(--text-color)] font-['Noto Sans']">
                        <span>Summa</span>
                        <span id="cartTotalPrice">0 So&apos;m</span>
                    </div>
                    <div className="flex h-[40px] gap-4 font-['Noto Sans'] font-semibold items-start mt-2">
                        <Link
                            to="/order"
                            className="flex-1 bg-[color:var(--burgundy-color)] text-white border-none px-5 py-[13px] rounded-lg text-[95%] tracking-[0.5px] no-underline flex items-center justify-center"
                            id="cartCheckoutBtn"
                            onClick={onClose}
                        >
                            Buyurtma qilish
                        </Link>
                        <Link
                            to="/cart"
                            className="flex-1 bg-transparent text-[color:var(--burgundy-color)] border border-[color:var(--burgundy-dark)] px-5 py-[13px] rounded-lg text-[96%] tracking-[0.5px] no-underline flex items-center justify-center transition-all duration-300"
                            id="cartViewBtn"
                            onClick={onClose}
                        >
                            Savat
                        </Link>
                    </div>
                    <p className="text-center text-[15px] mb-[-5px] font-normal tracking-[0.8px] px-2 pt-2 text-[#6B7280] font-['Noto Sans'] cursor-pointer">
                        <span onClick={onClose}>Yoki xaridlarni anti-to&apos;xtatish</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartModal
