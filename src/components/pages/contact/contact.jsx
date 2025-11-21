import { Stack, Container, Box, Typography, Grid } from "@mui/material"
import PageHeader from "../../common/PageHeader"

const Contact = () => {
    return (
        <Stack>
            <PageHeader title="Kontaktlar" />

            <Stack
                sx={{
                    background: "transparent",
                    padding: { xs: "30px 0 50px", md: "70px 0 40px" },
                }}
            >
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                    <Grid container spacing={4} justifyContent="center">
                        {/* Kontaktlar */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    padding: 0,
                                    marginBottom: { xs: 3, md: 0 },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                                        fontWeight: 700,
                                        color: "#6b0f2a",
                                        marginBottom: 2,
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    Kontaktlar
                                </Typography>
                                <Box
                                    sx={{
                                        marginTop: "5px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1.25,
                                        fontWeight: 500,
                                        color: "#6b0f2a",
                                        fontSize: { xs: "14px", md: "16px" },
                                    }}
                                >
                                    <Box
                                        component="i"
                                        className="fab fa-telegram-plane"
                                        sx={{
                                            fontSize: "18px",
                                            color: "#8b1538",
                                            width: "20px",
                                            textAlign: "center",
                                            display: "inline-block",
                                        }}
                                    />
                                    <Box component="span">
                                        Telegram:
                                        <Box
                                            component="a"
                                            href="https://t.me/prime77admin"
                                            target="_blank"
                                            rel="noreferrer"
                                            sx={{
                                                color: "#8b1538",
                                                textDecoration: "none",
                                                fontWeight: 600,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    color: "#a01b47",
                                                    textDecoration: "underline",
                                                },
                                            }}
                                        >
                                            {" "}@prime77admin
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Ishlash vaqtlari */}
                        <Grid item xs={12} md={6} lg={4}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    padding: 0,
                                    marginBottom: { xs: 3, md: 0 },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                                        fontWeight: 700,
                                        color: "#6b0f2a",
                                        marginBottom: 2,
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    Ishlash vaqtlari
                                </Typography>
                                <Box
                                    sx={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            marginTop: 0,
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: { xs: "14px", md: "16px" },
                                                color: "#6b0f2a",
                                                display: "block",
                                                textAlign: "center",
                                            }}
                                        >
                                            Har kuni: 10:00 - 20:00 GMT+5
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Stack>
        </Stack>
    )
}

export default Contact
