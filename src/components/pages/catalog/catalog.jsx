import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"

import { Stack, Container, Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import CategoriesList from "./categories-list"
import SpotlightList from "./spotlight-list"
import Product from "../product/product"

import { spotlights } from "../../../constants"
import CategoryService from "../../../service/catalog"

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
                    marginTop: "64px",
                    width: "100%",
                    minHeight: "200px",
                    paddingBottom: "8px",
                }}
            >
                <Container>
                    <Stack
                        sx={{
                            marginTop: "10",
                            textAlign: "center",
                        }}
                    >
                        <Box
                            sx={{
                                fontFamily: "Noto Sans, sans-serif",
                                fontSize: "2.5rem",
                                fontWeight: "700",
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
                                fontSize: "1.1rem",
                                fontWeight: "300",
                                color: "#6b0f2a",
                                marginBottom: "8px",
                                letterSpacing: "1px",
                                marginTop: "10px",
                            }}
                        >
                            <Link to="/" className="breadcrumb-link">
                                Asosiy
                            </Link>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-current">{selectedSpotlight ? selectedSpotlight.name : "Katalog"}</span>
                        </Box>
                    </Stack>
                    {isMobile ? (
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                marginBottom: "16px",
                                paddingBottom: "10px",
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <SpotlightList
                                    spotlights={spotlights}
                                    spotlight={selectedSpotlight}
                                    isMobile={isMobile}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
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
            <Product selectedCategory={selectedCategory} />
        </Stack>
    )
}

export default Catalog
