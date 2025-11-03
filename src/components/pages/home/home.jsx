import { spotlights } from "../../../constants"
import { Box, Stack } from "@mui/material"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Stack className="p-0 mt-[18px]">
                <Stack className="w-full px-0">
                    <Box className="w-full flex flex-wrap gap-0">
                        <Link
                            to={"/catalog"}
                            className="w-full group block overflow-hidden relative mb-0 shadow-none transition-all duration-300 cursor-pointer rounded-none"
                        >
                            <img
                                src={"/images/spotlights/cover3.webp"}
                                alt={"catalog"}
                                className="w-full h-[410px] md:h-[580px]  object-cover object-top object-fit-cover block transition-transform duration-300 relative"
                            />
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
                                    <h3 className="text-[var(--light-color)] uppercase text-lg md:text-xl font-sans text-center transition-colors duration-300 group-hover:text-[#8b1538] px-4">
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
