import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material"

const HeaderTop = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const getBackgroundColor = () => {
        if (isScrolled) {
            return "#f8f9fb"
        }
        if (location.pathname === "/") {
            return "transparent"
        }
        return "#f8f9fb"
    }

    return (
        <div className="fixed z-[999] w-full" style={{ backgroundColor: getBackgroundColor() }}>
            <Box className="w-full overflow-hidden">
                <div className="whitespace-nowrap text-red-500 text-sm font-semibold animate-marquee">
                    {Array(20).fill("SAYT HOZIRDA TEST REJIMIDA ISHLAYAPTI!  •  XATOLIK HAQIDA SUPPORTGA YOZING!").join(" • ")}
                </div>
            </Box>
        </div>
    )
}

export default HeaderTop
