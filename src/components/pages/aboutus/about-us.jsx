import { Stack, Container, Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import PageHeader from "../../common/PageHeader"

const AboutUs = () => {
    return (
        <Stack>
            {/* Page Header */}
            <PageHeader title="Biz haqimizda" />

            {/* Hero Section */}
            <section className="bg-[#f5f5dc] py-12 md:py-16">
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                            gap: { xs: 2, lg: 0 },
                            alignItems: "center",
                        }}
                    >
                        {/* Image - Left Side */}
                        <Box
                            sx={{
                                order: { xs: 2, lg: 1 },
                                textAlign: "center",
                            }}
                        >
                            <Box
                                component="img"
                                src="/images/logo.jpeg"
                                alt="Prime77 Team"
                                sx={{
                                    width: "100%",
                                    maxWidth: "500px",
                                    height: { xs: "300px", md: "400px" },
                                    objectFit: "cover",
                                    borderRadius: "15px",
                                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                        </Box>

                        {/* Content - Right Side */}
                        <Box
                            sx={{
                                order: { xs: 1, lg: 2 },
                                pr: { lg: 4 },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                                    fontWeight: 700,
                                    color: "#6b0f2a",
                                    mb: 3,
                                    lineHeight: 1.2,
                                }}
                            >
                                PRIME77 - Sizning uslubingiz!
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "14px", md: "16px" },
                                    color: "#232526",
                                    lineHeight: 1.6,
                                    mb: 5,
                                }}
                            >
                                    Biz 2020-yildan beri erkaklar uchun zamonaviy va sifatli kiyimlar ishlab chiqaramiz.
                                    Har bir mahsulotimiz diqqat bilan tanlab olingan materiallardan tayyorlanadi va
                                    yuqori sifat standartlariga javob beradi.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="bg-[#f5f5dc] py-16 md:py-20">
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Box
                        sx={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: "1.8rem", md: "2.2rem" },
                                fontWeight: 700,
                                color: "#6b0f2a",
                                mb: 2.5,
                            }}
                        >
                            Bizning kolleksiyamizni ko'ring!
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { xs: "14px", md: "16px" },
                                color: "#232526",
                                mb: 5,
                            }}
                        >
                            Eng so'nggi va zamonaviy erkaklar kiyimlarini kashf eting
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 2.5,
                                flexWrap: "wrap",
                            }}
                        >
                            <Button
                                component={Link}
                                to="/catalog"
                                variant="outlined"
                                sx={{
                                    borderColor: "#333",
                                    color: "#333",
                                    borderWidth: "2px",
                                    px: 4,
                                    py: 1.5,
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#333",
                                        color: "white",
                                        borderColor: "#333",
                                    },
                                }}
                            >
                                Katalogni ko'rish
                            </Button>
                            <Button
                                component={Link}
                                to="/contact"
                                variant="outlined"
                                sx={{
                                    borderColor: "#333",
                                    color: "#333",
                                    borderWidth: "2px",
                                    px: 4,
                                    py: 1.5,
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#333",
                                        color: "white",
                                        borderColor: "#333",
                                    },
                                }}
                            >
                                Biz bilan bog'lanish
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </section>
        </Stack>
    )
}

export default AboutUs
