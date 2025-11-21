import { Link } from "react-router-dom"
import { Stack, Container, Box } from "@mui/material"

const PageHeader = ({ title, breadcrumbItems = [], showContainer = true, minHeight = "130px", breadcrumbMarginBottom = "30px" }) => {
    const defaultBreadcrumb = [
        { label: "Asosiy", to: "/" },
        { label: title, to: null }
    ]

    const breadcrumbs = breadcrumbItems.length > 0 ? breadcrumbItems : defaultBreadcrumb

    const content = (
        <Stack
            sx={{
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: { xs: "1.35rem", sm: "2.5rem" },
                    fontWeight: { xs: "600", sm: "700" },
                    color: "var(--burgundy-dark)",
                    marginBottom: "0px",
                    textTransform: "none",
                    letterSpacing: "1px",
                }}
            >
                {title}
            </Box>
            <Box
                sx={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: { xs: "0.85rem", sm: "1.1rem" },
                    fontWeight: "400",
                    color: "var(--burgundy-light)",
                    marginBottom: breadcrumbMarginBottom,
                    letterSpacing: "1px",
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                }}
            >
                {breadcrumbs.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {item.to ? (
                            <Link 
                                to={item.to}
                                style={{ textDecoration: "none", color: "var(--burgundy-dark)" }}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {index < breadcrumbs.length - 1 && (
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
                        )}
                    </Box>
                ))}
            </Box>
        </Stack>
    )

    return (
        <Stack
            sx={{
                backgroundColor: "#f0f0f0",
                width: "100%",
                minHeight: minHeight,
                paddingBottom: "8px",
                paddingTop: { xs: "30px", sm: "96px", md: "96px", lg: "96px" },
            }}
        >
            {showContainer ? (
                <Container>{content}</Container>
            ) : (
                content
            )}
        </Stack>
    )
}

export default PageHeader

