import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

import { Stack, Container, Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import CategoriesList from "./categories-list"
import SpotlightList from "./spotlight-list"
import PageHeader from "../../common/PageHeader"

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

    const pageTitle = selectedSpotlight ? selectedSpotlight.name : "Katalog"

    return (
        <Stack>
            <Stack
                sx={{
                    backgroundColor: "#f0f0f0",
                    width: "100%",
                    paddingBottom: "8px",
                }}
            >
                <Container>
                    <PageHeader 
                        title={pageTitle}
                        breadcrumbItems={[
                            { label: "Asosiy", to: "/" },
                            { label: pageTitle, to: null }
                        ]}
                        showContainer={false}
                        minHeight="100px"
                        breadcrumbMarginBottom="0"
                    />
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
