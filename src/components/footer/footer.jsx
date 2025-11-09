import { Link } from "react-router-dom"
import { payments } from "../../constants"

export default function Footer() {
    return (
        <footer className="bg-[#f8f9fb] py-16 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {/* Logo Section */}
                    <Link to="/" className="col-span-2 md:col-span-1 flex items-start no-underline">
                        <h1
                            className="font-bold text-2xl tracking-wide m-0"
                            style={{
                                fontWeight: 700,
                                fontSize: "24px",
                                letterSpacing: "1px",
                            }}
                        >
                            <span style={{ color: "rgba(198,176,33,0.95)" }}>PRIME</span>
                            <span style={{ color: "rgba(160,27,71,0.9)" }}>77</span>
                        </h1>
                    </Link>

                    {/* KOMPANIYA Section */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-bold mb-3 pb-2" style={{ color: "rgba(160,27,71,0.9)" }}>
                            KOMPANIYA
                        </h3>
                        <ul className="space-y-1 list-none p-0 m-0">
                            <li>
                                <Link
                                    to="/about-us"
                                    className="text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                    style={{ color: "rgba(160,27,71,0.8)" }}
                                >
                                    Biz haqimizda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                    style={{ color: "rgba(160,27,71,0.8)" }}
                                >
                                    Biz bilan bog'lanish
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* QO'LLAB-QUVVATLASH Section */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-bold mb-3 pb-2" style={{ color: "rgba(160,27,71,0.9)" }}>
                            QO'LLAB-QUVVATLASH
                        </h3>
                        <ul className="space-y-1 list-none p-0 m-0">
                            <li>
                                <Link
                                    to="/delivery"
                                    className="text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                    style={{ color: "rgba(160,27,71,0.8)" }}
                                >
                                    Yetkazib berish
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about-us"
                                    className="text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                    style={{ color: "rgba(160,27,71,0.8)" }}
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* IJTIMOIY TARMOQLAR Section */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-bold mb-3 pb-2" style={{ color: "rgba(160,27,71,0.9)" }}>
                            IJTIMOIY TARMOQLAR
                        </h3>
                        <div className="flex flex-col gap-4">
                            <Link
                                to="#"
                                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                style={{ color: "rgba(160,27,71,0.8)" }}
                            >
                                <i className="fab fa-telegram-plane text-sm w-5"></i>
                                <span>Telegram</span>
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-all no-underline"
                                style={{ color: "rgba(160,27,71,0.8)" }}
                            >
                                <i className="fab fa-instagram text-sm w-5"></i>
                                <span>Instagram</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-3" style={{ borderColor: "rgba(160,27,71,0.3)" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Copyright */}
                        <div>
                            <p className="text-sm m-0 opacity-80" style={{ color: "rgba(160,27,71,0.8)" }}>
                                &copy; 2025 PRIME77, Barcha huquqlar himoyalangan
                            </p>
                        </div>

                        {/* Payment Methods - hidden on mobile, shown on md and up */}
                        <div className="hidden md:flex items-center justify-end gap-2">
                            <span className="text-sm opacity-80" style={{ color: "rgba(160,27,71,0.8)" }}>
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
