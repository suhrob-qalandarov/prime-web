import { Link } from "react-router-dom"
import { payments } from "../../constants"

export default function Footer() {
    return (
        <footer className="bg-[#f8f9fb] py-16 px-4 md:px-8 lg:px-12 relative">
            <div className="max-w-7xl mx-auto">
                {/* By Logo - Mobile da page o'ng tomonida */}
                <a href="https://howdy.uz" target="_blank" rel="noopener noreferrer" className="absolute md:hidden top-16 right-4 flex items-start no-underline">
                    <h1
                        className="font-bold text-lg tracking-wide m-0"
                        style={{
                            fontWeight: 700,
                            letterSpacing: "1px",
                        }}
                    >
                        <span style={{ fontSize: "12px", color: "rgba(25,145,49,0.95)" }}>by </span>
                        <span style={{ fontSize: "16px", color: "rgba(0,0,0,0.9)" }}>HOWDY.UZ</span>
                    </h1>
                </a>

                <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8 mb-16">
                    {/* Logo Section */}
                    <div className="flex flex-col md:col-span-1">
                        <Link to="/" className="flex items-start no-underline">
                            <h1
                                className="font-bold text-lg md:text-2xl tracking-wide m-0"
                                style={{
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                }}
                            >
                                <span style={{ color: "rgba(198,176,33,0.95)" }}>PRIME</span>
                                <span style={{ color: "rgba(160,27,71,0.9)" }}>77</span>
                            </h1>
                        </Link>
                        {/* By Logo - Desktop da PRIME77 logo tagidan */}
                        <a href="https://howdy.uz" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-start no-underline mt-2">
                            <h1
                                className="font-bold text-lg md:text-2xl tracking-wide m-0"
                                style={{
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                }}
                            >
                                <span style={{ fontSize: "12px", color: "rgba(25,145,49,0.95)" }}>by </span>
                                <span style={{ fontSize: "16px", color: "rgba(0,0,0,0.9)" }}>HOWDY.UZ</span>
                            </h1>
                        </a>
                    </div>

                    {/* Sections Row - Mobile da 3 ta bitta row da */}
                    <div className="grid grid-cols-3 md:contents gap-4 md:gap-0">
                        {/* KOMPANIYA Section */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-xs md:text-sm font-bold mb-2 md:mb-3 pb-1 md:pb-2" style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}>
                                KOMPANIYA
                            </h3>
                            <ul className="space-y-0.5 md:space-y-1 list-none p-0 m-0">
                                <li>
                                    <Link
                                        to="/about-us"
                                        className="text-xs md:text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                        style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}
                                    >
                                        Biz haqimizda
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="text-xs md:text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                        style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}
                                    >
                                        Biz bilan bog'lanish
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* QO'LLAB-QUVVATLASH Section */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-xs md:text-sm font-bold mb-2 md:mb-3 pb-1 md:pb-2" style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}>
                                QO'LLAB-QUVVATLASH
                            </h3>
                            <ul className="space-y-0.5 md:space-y-1 list-none p-0 m-0">
                                <li>
                                    <Link
                                        to="/delivery"
                                        className="text-xs md:text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                        style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}
                                    >
                                        Yetkazib berish
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about-us"
                                        className="text-xs md:text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                        style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* IJTIMOIY TARMOQLAR Section */}
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-xs md:text-sm font-bold mb-2 md:mb-3 pb-1 md:pb-2" style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}>
                                IJTIMOIY TARMOQLAR
                            </h3>
                            <div className="flex flex-col gap-2 md:gap-4">
                                <Link
                                    to="#"
                                    className="flex items-center gap-1 md:gap-2 text-xs md:text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                    style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}
                                >
                                    <i className="fab fa-telegram-plane text-xs md:text-sm w-4 md:w-5"></i>
                                    <span>Telegram</span>
                                </Link>
                                <Link
                                    to="#"
                                    className="flex items-center gap-1 md:gap-2 text-xs md:text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                    style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}
                                >
                                    <i className="fab fa-instagram text-xs md:text-sm w-4 md:w-5"></i>
                                    <span>Instagram</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-3" style={{ borderColor: "rgba(160,27,71,0.3)" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Copyright */}
                        <div>
                            <p className="text-sm m-0 opacity-80" style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}>
                                &copy; 2025 PRIME77, Barcha huquqlar himoyalangan
                            </p>
                            
                            {/* Payment Methods - Mobile only, shown below copyright */}
                            <div className="flex md:hidden items-center justify-center gap-2 mt-3">
                                <span className="text-sm opacity-80" style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}>
                                    To'lov turlari:
                                </span>
                                <div className="flex gap-2">
                                    {payments.map((payment) => (
                                        <img
                                            key={payment.name}
                                            src={payment.image || "/placeholder.svg"}
                                            alt={payment.name}
                                            className="h-4 w-auto"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods - Desktop, shown on md and up */}
                        <div className="hidden md:flex items-center justify-end gap-2">
                            <span className="text-sm opacity-80" style={{ color: "var(--burgundy-dark)", fontFamily: "Noto Sans" }}>
                                To'lov turlari:
                            </span>
                            <div className="flex gap-2">
                                {payments.map((payment) => (
                                    <img
                                        key={payment.name}
                                        src={payment.image || "/placeholder.svg"}
                                        alt={payment.name}
                                        className="h-4 w-auto"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
