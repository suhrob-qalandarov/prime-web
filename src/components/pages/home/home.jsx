import { spotlights } from "../../../constants"
import { Box, Stack } from "@mui/material"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Stack className="p-0 mt-0">
                <Stack className="w-full px-0">
                    <Box className="w-full flex flex-wrap gap-0 relative">
                        <Link
                            to={"/catalog"}
                            className="w-full block overflow-hidden relative mb-0 cursor-pointer rounded-none"
                        >
                            <img
                                src={"/images/spotlights/cover3.webp"}
                                alt={"catalog"}
                                className="w-full h-[410px] md:h-[580px] object-cover object-top block"
                            />
                            <div
                                className="absolute top-1/2 left-1/2 md:left-[300px] transform -translate-x-1/2 -translate-y-1/2 md:-translate-x-0 z-10 pointer-events-none text-center md:text-left"
                                style={{ fontFamily: "'Noto Sans', sans-serif" }}
                            >
                                <h2 className="text-[var(--light-color)] md:text-[#8b1538] font-sans uppercase text-[26px] md:text-4xl md:font-bold tracking-wider drop-shadow-lg ">
                                    YANGI KOLLEKSIYASI
                                </h2>
                            </div>
                        </Link>
                    </Box>
                    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {spotlights.map((cat, index) => (
                            <Link
                                key={index}
                                to={"/catalog?" + cat.url}
                                className="group block relative overflow-hidden cursor-pointer aspect-square md:aspect-auto"
                            >
                                <img
                                    src={cat.image || "/placeholder.svg"}
                                    alt={cat.name}
                                    className={`w-full h-full md:h-[400px] object-cover block transition-transform duration-300 relative group-hover:scale-105 ${
                                        cat.side === "top"
                                            ? "object-top"
                                            : cat.side === "bottom"
                                                ? "object-bottom"
                                                : "object-center"
                                    }`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <h3 className="text-[var(--light-color)] uppercase text-[26px] md:text-xl font-sans text-center transition-colors duration-300 group-hover:text-[#8b1538] px-4">
                                        {cat.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </Box>
                </Stack>
            </Stack>
        </div>
    )
}

export default Home
