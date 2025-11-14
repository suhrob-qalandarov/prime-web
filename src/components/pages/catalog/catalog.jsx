import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"

import { Stack, Container, Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import CategoriesList from "./categories-list"
import SpotlightList from "./spotlight-list"

import { spotlights } from "../../../constants"
import CategoryService from "../../../service/catalog"
import ProductGrid from "../product/ProductGrid";

const Catalog = () => {
    const [categoriesData, setCategoriesData] = useState([])
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const param = [...searchParams.keys()][0]
    const selectedSpotlight = spotlights.find((cat) => cat.url === param) || null

    const categoryParam = searchParams.get("category")
    const [selectedCategory, setSelectedCategory] = useState(categoryParam ? Number.parseInt(categoryParam) : null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let data
                if (selectedSpotlight) {
                    data = await CategoryService.getCategoriesBySpotlightName(selectedSpotlight.name)
                } else {
                    data = await CategoryService.getCategories()
                }
                setCategoriesData(data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }

        fetchCategories()
    }, [selectedSpotlight])

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId)
        const spotlightParam = param || ""
        navigate(`?${spotlightParam}${categoryId ? `&category=${categoryId}` : ""}`)
    }

    return (
        <Stack>
            <Stack
                sx={{
                    backgroundColor: "#f0f0f0",
                    width: "100%",
                    minHeight: "200px",
                    paddingBottom: "8px",
                }}
            >
                <Container>
                    <Stack
                        sx={{
                            marginTop: { xs: "35px", sm: "45px" },
                            textAlign: "center",
                        }}
                    >
                        <Box
                            sx={{
                                fontFamily: "Noto Sans, sans-serif",
                                fontSize: { xs: "1.35rem", sm: "2.5rem" },
                                fontWeight: { xs: "600", sm: "700" },
                                color: "#6b0f2a",
                                marginBottom: "0px",
                                textTransform: "none",
                                letterSpacing: "1px",
                            }}
                        >
                            {selectedSpotlight ? selectedSpotlight.name : "Katalog"}
                        </Box>
                        <Box
                            sx={{
                                fontFamily: "Noto Sans, sans-serif",
                                fontSize: { xs: "0.85rem", sm: "1.1rem" },
                                fontWeight: "300",
                                color: "#6b0f2a",
                                marginBottom: "8px",
                                letterSpacing: "1px",
                                marginTop: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                            }}
                        >
                            <Link to="/" className="breadcrumb-link" style={{ textDecoration: "none", color: "#6b0f2a" }}>
                                Asosiy
                            </Link>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="14" 
                                height="14" 
                                fill="var(--burgundy-dark)" 
                                viewBox="0 0 256 256"
                                style={{ flexShrink: 0 }}
                            >
                                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                            </svg>
                            <span className="breadcrumb-current">{selectedSpotlight ? selectedSpotlight.name : "Katalog"}</span>
                        </Box>
                    </Stack>
                    {isMobile ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "nowrap",
                                marginTop: { xs: "26px", sm: "30px" },
                                marginBottom: "16px",
                                paddingBottom: "10px",
                                overflowX: "hidden",
                                gap: "2px",
                            }}
                        >
                            <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
                                <SpotlightList
                                    spotlights={spotlights}
                                    spotlight={selectedSpotlight}
                                    isMobile={isMobile}
                                />
                            </Box>
                            <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
                                <CategoriesList
                                    categories={categoriesData}
                                    onCategorySelect={handleCategorySelect}
                                    selectedCategory={selectedCategory}
                                    isMobile={isMobile}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <>
                            <SpotlightList
                                spotlights={spotlights}
                                spotlight={selectedSpotlight}
                                isMobile={isMobile}
                            />
                            <Container>
                                <CategoriesList
                                    categories={categoriesData}
                                    onCategorySelect={handleCategorySelect}
                                    selectedCategory={selectedCategory}
                                    isMobile={isMobile}
                                />
                            </Container>
                        </>
                    )}
                </Container>
            </Stack>
            <ProductGrid selectedCategory={selectedCategory} />
        </Stack>
    )
}

export default Catalog
