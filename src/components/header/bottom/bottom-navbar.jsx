import { useState } from "react"

const BottomNavbar = ({ cartCount = 0, onCartClick, onCategoriesClick, onSearchClick, onProfileClick }) => {
    const [activeItem, setActiveItem] = useState("")
    const isLoggedIn = Boolean(localStorage.getItem("prime-token"))
    const iconClass = "w-5 h-5 text-[var(--burgundy-dark)]"
    const itemClass =
        "flex flex-col items-center justify-between h-full py-2 px-4 text-[var(--burgundy-dark)] transition-all duration-300"

    const handleItemClick = (itemName, callback) => {
        setActiveItem(itemName)
        if (callback) callback()
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#8b1538] px-3 z-[1025] lg:hidden h-16">
            <div className="flex items-stretch w-full">
                <div className="flex-1 flex justify-start">
                    <div
                        className={`${itemClass} cursor-pointer`}
                        onClick={() => handleItemClick("categories", onCategoriesClick)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={iconClass}
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                            <path d="M3 9h18"></path>
                            <path d="M3 15h18"></path>
                            <path d="M9 3v18"></path>
                            <path d="M15 3v18"></path>
                        </svg>
                        <span className="mt-2 text-sm font-medium text-center leading-tight text-[var(--burgundy-dark)]">Kategoriyalar</span>
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <div
                        className={`${itemClass} cursor-pointer`}
                        onClick={() => handleItemClick("cart", onCartClick)}
                    >
                        <div className="relative flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={iconClass}
                            >
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                                <path d="M3 6h18"></path>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            {cartCount > 0 && (
                                <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4.5 h-4.5 text-xs flex items-center justify-center font-semibold">
                                    {cartCount}
                                </div>
                            )}
                        </div>
                        <span className="mt-2 text-sm font-medium text-center leading-tight text-[var(--burgundy-dark)]">Savat</span>
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <div
                        className={`${itemClass} cursor-pointer`}
                        onClick={() => handleItemClick("search", onSearchClick)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={iconClass}
                        >
                            <circle cx="11" cy="11" r="7"></circle>
                            <path d="m20 20-3-3"></path>
                        </svg>
                        <span className="mt-2 text-sm font-medium text-center leading-tight text-[var(--burgundy-dark)]">Qidirish</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomNavbar
