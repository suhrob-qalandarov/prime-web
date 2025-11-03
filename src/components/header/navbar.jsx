import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import BottomNavbar from "./bottom/bottom-navbar";
import CartModal from "../modals/cart-modal";
import Sidebar from "./sidebar/sidebar";
import SearchModal from "../modals/search-modal";
import { links } from "../../constants";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0)
    const [modal, setModal] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const isLoggedIn = Boolean(localStorage.getItem("prime-token"))
    const topPosition = isScrolled ? "top-5" : location.pathname === "/" ? "top-10" : "top-5"

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleCartClick = () => {
        setModal("cart")
    }

    const handleCategoriesClick = () => {
        navigate("/catalog")
    }

    const handleSearchClick = () => {
        console.log("Search clicked from bottom nav")
    }

    const handleProfileClick = () => {
        navigate("/profile")
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <>
            <Stack className="bg-transparent w-full">
                <div
                    className={`fixed ${topPosition} left-0 right-0 z-[999] transition-all duration-300 w-full bg-[#f8f9fb] lg:bg-transparent`}
                    style={{
                        backgroundColor:
                            location.pathname === "/" && !isScrolled && window.innerWidth >= 1024
                                ? "transparent" : "#f8f9fb",
                    }}
                >
                    <div className="px-6 lg:px-[200px]">
                        <div className="flex items-center justify-between h-16">
                            <div className="lg:hidden cursor-pointer p-2.5 z-[1000]" onClick={toggleSidebar}>
                                <div className="flex flex-col gap-1">
                                    <span className="w-[25px] h-[3px] bg-[#8b1538] rounded-sm transition-all duration-300"></span>
                                    <span className="w-[25px] h-[3px] bg-[#8b1538] rounded-sm transition-all duration-300"></span>
                                    <span className="w-[25px] h-[3px] bg-[#8b1538] rounded-sm transition-all duration-300"></span>
                                </div>
                            </div>

                            <Link
                                to={"/"}
                                className="no-underline flex-shrink-0 flex-1 flex justify-center lg:flex-none lg:justify-start"
                            >
                                <h1
                                    id="main-logo"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "24px",
                                        margin: 0,
                                        letterSpacing: "1px",
                                        color: "rgba(198,176,33,0.95)",
                                    }}
                                >
                                    PRIME
                                    <span
                                        style={{
                                            color: "rgba(160,27,71,0.9)",
                                        }}
                                    >
                                        77
                                    </span>
                                </h1>
                            </Link>
                            <div className="hidden lg:flex col-span-6 justify-start">
                                <ul className="flex gap-4 list-none m-0 p-0">
                                    {links.map(({ to, label }) => (
                                        <li key={to}>
                                            <NavLink
                                                to={to}
                                                className={({ isActive }) =>
                                                    `relative px-5 py-1 font-bold text-[#8b1538]
                                                    transition-all duration-300 rounded-lg text-sm
                                                    no-underline
                                                    ${isActive ? "text-black" : "hover:text-black"}
                                                    after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2
                                                    after:h-0.5 after:bg-[#a01b47] after:transition-all
                                                    after:duration-300 after:-translate-x-1/2 after:rounded-sm
                                                    ${isActive ? "after:w-[70%]" : "after:w-0 hover:after:w-[70%]"}
                                                    `
                                                }
                                            >
                                                {label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="hidden lg:flex col-span-3">
                                <div className="flex justify-end items-center w-full">
                                    <div className="flex items-center gap-4">
                                        <button className="p-2 text-[#8b1538]" onClick={() => setModal("search")}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="#8b1538"
                                                viewBox="0 0 256 256"
                                            >
                                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                                            </svg>
                                        </button>

                                        <span className="text-[#8b1538] text-3xl font-light">|</span>

                                        <Link to={isLoggedIn ? "/profile" : "/login"} className="p-2 text-[#8b1538] no-underline">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="#8b1538"
                                                viewBox="0 0 256 256"
                                            >
                                                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                                            </svg>
                                        </Link>

                                        <button className="p-2 text-[#8b1538] relative" onClick={() => setModal("cart")}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="#8b1538"
                                                viewBox="0 0 256 256"
                                            >
                                                <path d="M239.89,198.12l-14.26-120a16,16,0,0,0-16-14.12H176a48,48,0,1,0-96,0H46.33a16,16,0,0,0-16,14.12l-14.26,120A16,16,0,0,0,20,210.6a16.13,16.13,0,0,0,12,5.4H223.92A16.13,16.13,0,0,0,236,210.6,16,16,0,0,0,239.89,198.12ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32ZM32,200,46.33,80H80v24a8,8,0,0,0,16,0V80h64v24a8,8,0,0,0,16,0V80h33.75l14.17,120Z"></path>
                                            </svg>
                                            <span
                                                className="absolute top-0 right-1 bg-[#a01b47] text-white text-xs rounded-full w-4 h-5 flex items-center justify-center font-semibold"
                                                id="cartBadge"
                                            >
                                                0
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Link to={isLoggedIn ? "/profile" : "/login"} className="lg:hidden p-2 text-[#8b1538] no-underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8b1538" viewBox="0 0 256 256">
                                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </Stack>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <BottomNavbar
                cartCount={cartCount}
                onCartClick={handleCartClick}
                onCategoriesClick={handleCategoriesClick}
                onSearchClick={handleSearchClick}
                onProfileClick={handleProfileClick}
            />
            <CartModal isOpen={modal === "cart"} onClose={() => setModal(null)} />
            <SearchModal isOpen={modal === "search"} onClose={() => setModal(null)} />
        </>
    )
}

export default Navbar
