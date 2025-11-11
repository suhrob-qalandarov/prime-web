import { spotlights } from "../../../constants"
import { Box, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import { useMemo, useState, useRef, useCallback, useLayoutEffect } from "react"
import CarouselProducts from "./components/CarouselProducts"
import ImageWithSkeleton from "../../common/ImageWithSkeleton"
import "./home.css"

const mockTabs = [
    { id: "best", label: "Best Sellers" },
    { id: "sale", label: "Sale" },
    { id: "new", label: "New" },
]

const mockProductsByTab = {
    best: [
        {
            id: "best-1",
            name: "Shim QADAM",
            price: 348000,
            oldPrice: 520000,
            discount: 0,
            image: "/images/spotlights/pants-cover.jpg",
            images: [
                "/images/spotlights/pants-cover.jpg",
                "/images/spotlights/shim.jpeg",
                "/images/spotlights/shim2.jpeg",
            ],
            badge: "HOT",
            marqueeDiscount: 0,
        },
        {
            id: "best-2",
            name: "Shalvar OD",
            price: 328000,
            oldPrice: 470000,
            discount: 0,
            image: "/images/spotlights/shim2.jpeg",
            images: [
                "/images/spotlights/shim2.jpeg",
                "/images/spotlights/shim3.jpeg",
                "/images/spotlights/shim4.jpeg",
            ],
            badge: "HOT",
            marqueeDiscount: 0,
        },
        {
            id: "best-3",
            name: "Kurtka Velvet",
            price: 308000,
            oldPrice: 420000,
            discount: 0,
            image: "/images/spotlights/shoes2.jpeg",
            images: [
                "/images/spotlights/shoes2.jpeg",
                "/images/spotlights/shoes3.jpeg",
                "/images/spotlights/shoes4.jpeg",
            ],
            badge: "HOT",
            marqueeDiscount: 0,
        },
        {
            id: "best-4",
            name: "Keng Shalvar \"Yulduz Bo'l\"",
            price: 260000,
            oldPrice: 315000,
            discount: 0,
            image: "/images/spotlights/cover-sh.jpeg",
            images: [
                "/images/spotlights/cover-sh.jpeg",
                "/images/spotlights/cover-sh1.jpeg",
                "/images/spotlights/shim9.jpeg",
            ],
            badge: "HOT",
            marqueeDiscount: 0,
        },
        {
            id: "best-5",
            name: "Plashovka (Simple.Club)",
            price: 301000,
            oldPrice: 350000,
            discount: 0,
            image: "/images/spotlights/shim6.jpeg",
            images: [
                "/images/spotlights/shim6.jpeg",
                "/images/spotlights/shim4.jpeg",
                "/images/spotlights/shim3.jpeg",
            ],
            badge: "HOT",
            marqueeDiscount: 0,
        },
        {
            id: "best-6",
            name: "Kurtka Ayıq",
            price: 336000,
            oldPrice: 420000,
            discount: 0,
            image: "/images/spotlights/cover3.webp",
            images: [
                "/images/spotlights/cover3.webp",
                "/images/spotlights/cover-sh1.jpeg",
                "/images/spotlights/shim.jpeg",
            ],
            badge: "HOT",
            marqueeDiscount: 0,
        },
    ],
    sale: [
        {
            id: "sale-1",
            name: "Sweatshirt 15/15",
            price: 240000,
            oldPrice: 300000,
            discount: 20,
            image: "/images/spotlights/cover-sh1.jpeg",
            images: [
                "/images/spotlights/cover-sh1.jpeg",
                "/images/spotlights/shim3.jpeg",
                "/images/spotlights/shim6.jpeg",
            ],
            badge: "SALE",
            marqueeDiscount: 20,
        },
        {
            id: "sale-2",
            name: "Simple Club",
            price: 191750,
            oldPrice: 295000,
            discount: 35,
            image: "/images/spotlights/shim3.jpeg",
            images: [
                "/images/spotlights/shim3.jpeg",
                "/images/spotlights/shim4.jpeg",
                "/images/spotlights/shim9.jpeg",
            ],
            badge: "SALE",
            marqueeDiscount: 35,
        },
        {
            id: "sale-3",
            name: "Jordan Low Sky",
            price: 265000,
            oldPrice: 330000,
            discount: 20,
            image: "/images/spotlights/shoes5.jpeg",
            images: [
                "/images/spotlights/shoes5.jpeg",
                "/images/spotlights/shoes4.jpeg",
                "/images/spotlights/shoes3.jpeg",
            ],
            badge: "SALE",
            marqueeDiscount: 20,
        },
        {
            id: "sale-4",
            name: "Hoodie Classic",
            price: 228000,
            oldPrice: 285000,
            discount: 20,
            image: "/images/spotlights/shim9.jpeg",
            images: [
                "/images/spotlights/shim9.jpeg",
                "/images/spotlights/shim6.jpeg",
                "/images/spotlights/shim4.jpeg",
            ],
            badge: "SALE",
            marqueeDiscount: 20,
        },
    ],
    new: [
        {
            id: "new-1",
            name: "Kargo Shortik",
            price: 289000,
            oldPrice: 346000,
            discount: 0,
            image: "/images/spotlights/shim4.jpeg",
            images: [
                "/images/spotlights/shim4.jpeg",
                "/images/spotlights/shim2.jpeg",
                "/images/spotlights/shim3.jpeg",
            ],
            badge: "NEW",
            marqueeDiscount: 0,
        },
        {
            id: "new-2",
            name: "Kurtka Classic",
            price: 301000,
            oldPrice: 350000,
            discount: 0,
            image: "/images/spotlights/shim6.jpeg",
            images: [
                "/images/spotlights/shim6.jpeg",
                "/images/spotlights/shim9.jpeg",
                "/images/spotlights/shim2.jpeg",
            ],
            badge: "NEW",
            marqueeDiscount: 0,
        },
        {
            id: "new-3",
            name: "Loose Fit T-shirt",
            price: 165000,
            oldPrice: 0,
            discount: 0,
            image: "/images/spotlights/shim2.jpeg",
            images: [
                "/images/spotlights/shim2.jpeg",
                "/images/spotlights/shim.jpeg",
                "/images/spotlights/shim3.jpeg",
            ],
            badge: "NEW",
            marqueeDiscount: 0,
        },
        {
            id: "new-4",
            name: "Sneakers Cloud",
            price: 275000,
            oldPrice: 0,
            discount: 0,
            image: "/images/spotlights/shoes5.jpeg",
            images: [
                "/images/spotlights/shoes5.jpeg",
                "/images/spotlights/shoes4.jpeg",
                "/images/spotlights/shoes3.jpeg",
            ],
            badge: "NEW",
            marqueeDiscount: 0,
        },
        {
            id: "new-5",
            name: "Sneakers Cloud",
            price: 275000,
            oldPrice: 0,
            discount: 0,
            image: "/images/spotlights/shoes6.jpeg",
            images: [
                "/images/spotlights/shoes6.jpeg",
                "/images/spotlights/shoes3.jpeg",
                "/images/spotlights/shoes4.jpeg",
            ],
            badge: "NEW",
            marqueeDiscount: 0,
        },
    ],
}

const Home = () => {
    const [activeTab, setActiveTab] = useState("best")
    const tabListRef = useRef(null)
    const tabRefs = useRef([])
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
    const activeProducts = useMemo(() => mockProductsByTab[activeTab] || [], [activeTab])

    const updateIndicator = useCallback(() => {
        const currentIndex = mockTabs.findIndex((tab) => tab.id === activeTab)
        const listEl = tabListRef.current
        const currentEl = tabRefs.current[currentIndex]

        if (listEl && currentEl) {
            const listRect = listEl.getBoundingClientRect()
            const tabRect = currentEl.getBoundingClientRect()
            setIndicatorStyle({
                width: tabRect.width,
                left: tabRect.left - listRect.left,
            })
        }
    }, [activeTab])

    useLayoutEffect(() => {
        updateIndicator()
    }, [updateIndicator])

    useLayoutEffect(() => {
        window.addEventListener("resize", updateIndicator)
        return () => window.removeEventListener("resize", updateIndicator)
    }, [updateIndicator])

    return (
        <div>
            <Stack className="p-0 mt-0">
                <Stack className="w-full px-0">
                    <Box className="w-full flex flex-wrap gap-0 relative">
                        <Link
                            to={"/catalog"}
                            className="w-full block overflow-hidden relative mb-0 cursor-pointer rounded-none"
                        >
                            <ImageWithSkeleton
                                src="/images/spotlights/cover3.webp"
                                alt="catalog"
                                containerClassName="w-full h-[410px] md:h-[580px]"
                                imgClassName="w-full h-full object-cover object-top block"
                                delay={300}
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
                                <ImageWithSkeleton
                                    src={cat.image || "/placeholder.svg"}
                                    alt={cat.name}
                                    containerClassName="spotlight-image-wrapper"
                                    imgClassName={`w-full h-full md:h-[400px] object-cover block transition-transform duration-300 ${
                                        cat.side === "top"
                                            ? "object-top"
                                            : cat.side === "bottom"
                                                ? "object-bottom"
                                                : "object-center"
                                    }`}
                                    delay={300}
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

                <div className="w-full px-6 lg:px-[200px] mt-12 md:mt-16">
                    <Stack className="gap-8">
                        <Box className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div
                                ref={tabListRef}
                                className="home-tab-list mx-auto lg:mx-0"
                            >
                                <div
                                    className="home-tab-highlight"
                                    style={{
                                        width: indicatorStyle.width,
                                        transform: `translateX(${indicatorStyle.left}px)`,
                                    }}
                                />
                                {mockTabs.map((tab, index) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        ref={(el) => {
                                            tabRefs.current[index] = el
                                        }}
                                        className={`tab-item relative cursor-pointer transition-colors duration-300 capitalize ${
                                            activeTab === tab.id ? "text-[var(--burgundy-dark)]" : "text-[#7a7a7a] hover:text-[var(--burgundy-dark)]"
                                        }`}
                                        type="button"
                                    >
                                        <span className="relative z-[1] tab-item-text">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </Box>

                        <div className="relative">
                            <CarouselProducts products={activeProducts} />
                        </div>
                    </Stack>
                </div>

                <section className="home-benefits container mt-16 md:mt-20 mb-16 md:mb-20">
                    <div className="benefit-block md:py-20 py-10">
                        <div className="list-benefit grid items-start lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-[30px]">
                            <div className="benefit-item flex flex-col items-center justify-center text-center">
                                <i className="icon-phone-call lg:text-7xl text-5xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </i>
                                <div className="heading6 text-center mt-5">24/6 Qo'llab-quvvatlash</div>
                                <div className="caption1 text-secondary1 text-center mt-3">
                                    Har qanday qanday savollarigiz bilan yordam berishga tayyormiz
                                </div>
                            </div>
                            <div className="benefit-item flex flex-col items-center justify-center text-center">
                                <i className="icon-guarantee lg:text-7xl text-5xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2 20 5v6c0 5.25-3.44 10.74-8 12-4.56-1.26-8-6.75-8-12V5l8-3Z" />
                                        <path d="m9 11 2 2 4-4" />
                                    </svg>
                                </i>
                                <div className="heading6 text-center mt-5">Kafolat</div>
                                <div className="caption1 text-secondary1 text-center mt-3">
                                    Har bir mahsulotlarimizning sifatiga kafolat beramiz
                                </div>
                            </div>
                            <div className="benefit-item flex flex-col items-center justify-center text-center">
                                <i className="icon-delivery-truck lg:text-7xl text-5xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 17a2 2 0 1 0 2 2" />
                                        <path d="M15 17a2 2 0 1 0 2 2" />
                                        <path d="M4 17V5h11v12" />
                                        <path d="m15 8 4 0 3 5v4h-4" />
                                        <path d="M16 8v3h5" />
                                    </svg>
                                </i>
                                <div className="heading6 text-center mt-5">Yetkazib berish</div>
                                <div className="caption1 text-secondary1 text-center mt-3">
                                    Yetkazib berish mamlakatimizning barcha nuqtalariga bevosita amalga oshiriladi.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Stack>
        </div>
    )
}

export default Home
