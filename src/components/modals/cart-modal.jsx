import { CartCloseIcon } from "../../icons"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { mockProducts } from "../../mock/products"
import BottomNavbar from "../header/bottom/bottom-navbar";

const buildMockCartItems = () => {
    const tags = ["HOT", "NEW", "SALE", "NEW", "SALE"]

    return tags
        .map((tag) => {
            const product = mockProducts.find((p) => p.tag === tag)
            if (!product) return null

            return {
                id: product.id,
                name: product.name,
                image: product.images?.[0],
                // Demo uchun faqat o'lcham qiymati
                size: "XL",
                // Rang nuqtasi uchun hex color (agar bo'lmasa, kulrang)
                colorHex: product.color || "#6B7280",
                price: product.price,
                originalPrice: product.originalPrice && product.originalPrice > product.price ? product.originalPrice : null,
                quantity: 3,
            }
        })
        .filter(Boolean)
}

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

    const cartItems = buildMockCartItems()
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
                        <CartCloseIcon size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 px-2 py-2 overflow-y-auto" id="cartBody">
                    {cartItems.length === 0 ? (
                        <div
                            className="py-10 px-5 text-[#6B7280] tracking-[0.7px] text-[19.7px] font-normal font-['Noto Sans']"
                            id="cartEmpty"
                        >
                            <small>Ha ul-bul narsa qo&apos;shmaymizmi bu yerga?</small>
                        </div>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 py-3 border-b border-[#f0f0f0]">
                                    {/* Image */}
                                    <div className="w-[85px] h-[95px] rounded-xl bg-[#f3f4f6] overflow-hidden flex-shrink-0">
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Texts */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <p className="mt-1 text-[15px] font-semibold text-[#111827] leading-tight">
                                                    {item.name}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-[14px] font-sans">
                                                        Rang:
                                                    </span>
                                                    <span
                                                        className="w-5 h-5 rounded-full border border-[#e5e7eb] inline-block"
                                                        style={{ backgroundColor: item.colorHex }}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="mt-1 text-[14px] font-sans">
                                                        O&apos;lcham:
                                                    </p>
                                                    <span className="font-semibold">{item.size}</span>
                                                </div>
                                            </div>

                                            <button className="text-[#ef4444] px-1 leading-none">
                                                <CartCloseIcon size={18} />
                                            </button>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-[15px] font-semibold text-[#111827]">
                                                    {item.price.toLocaleString("fr-FR")} So&apos;m
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="text-[14px] text-[#9CA3AF] line-through">
                                                        {item.originalPrice.toLocaleString("fr-FR")} So&apos;m
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-lg text-[#111827] mr-2">
                                                ×{item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-2 pb-3 pt-2 border-t border-[#e9ecef] rounded-b-[15px]" id="cartFooter">
                    <div className="flex items-center justify-between mb-2 py-1.5 text-[16px] font-semibold text-[color:var(--text-color)] font-['Noto Sans']">
                        <span>Summa</span>
                        <span id="cartTotalPrice">
                            {totalPrice.toLocaleString("fr-FR")} So&apos;m
                        </span>
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
                <BottomNavbar />
            </div>
        </div>
    )
}

export default CartModal
