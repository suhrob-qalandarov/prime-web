import { Container, Button, Select, MenuItem, FormControl } from "@mui/material"

const ChevronDownIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#0033aa" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ marginRight: "2px", height: "20px", width: "20px", color: "#0033aa" }}
    >
        <path d="m6 9 6 6 6-6"></path>
    </svg>
)

const SpotlightList = ({ spotlights, spotlight, isMobile }) => {
    return (
        <>
            {isMobile ? (
                <FormControl sx={{ width: "100%", minWidth: 0 }}>
                    <Select
                        displayEmpty
                        variant="filled"
                        value={spotlight ? spotlight.name : ""}
                        onChange={(e) => {
                            const selectedSpot = spotlights.find((spot) => spot.name === e.target.value)
                            if (selectedSpot) {
                                window.location.href = `/catalog?${selectedSpot.url}`
                            }
                        }}
                        IconComponent={ChevronDownIcon}
                        sx={{
                            backgroundColor: "var(--light-color)",
                            color: "#0033aa",
                            fontWeight: "bold",
                            fontFamily: "Noto Sans, sans-serif",
                            textTransform: "uppercase",
                            fontSize: { xs: "12px", sm: "16px" },
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "none",
                            "& .MuiSelect-select": {
                                padding: { xs: "8px 12px", sm: "12px 14px" },
                                paddingRight: { xs: "18px !important", sm: "20px !important" },
                                color: "#0033aa",
                                fontWeight: "bold",
                                whiteSpace: "normal",
                                overflow: "visible",
                                textOverflow: "clip",
                            },
                            "& .MuiSelect-icon": {
                                color: "#0033aa",
                                right: { xs: "0px !important", sm: "2px !important" },
                                width: "20px !important",
                                height: "20px !important",
                                margin: "0 !important",
                                padding: "0 !important",
                            },
                            "& .MuiSelect-iconOpen": {
                                transform: "none",
                            },
                            "&::before, &::after": {
                                display: "none",
                            },
                            "&:hover::before": {
                                borderBottom: "none !important",
                            },
                            "&.Mui-focused": {
                                backgroundColor: "var(--light-color)",
                                boxShadow: "none",
                            },
                            "& .MuiFilledInput-root": {
                                backgroundColor: "var(--light-color) !important",
                            },
                            "& .MuiSelect-filled.Mui-focused": {
                                backgroundColor: "var(--light-color) !important",
                            },
                            "& .MuiPaper-root": {
                                backgroundColor: "var(--light-color)",
                                borderRadius: "8px",
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: "var(--light-color)",
                                    borderRadius: "8px",
                                    marginTop: "4px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    "& .MuiMenuItem-root": {
                                        color: "#0033aa",
                                        fontWeight: "bold",
                                        fontFamily: "Noto Sans, sans-serif",
                                        textTransform: "uppercase",
                                        fontSize: { xs: "12px", sm: "14px" },
                                        padding: { xs: "10px 12px", sm: "12px 14px" },
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 51, 170, 0.1)",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "rgba(0, 51, 170, 0.15)",
                                            "&:hover": {
                                                backgroundColor: "rgba(0, 51, 170, 0.2)",
                                            },
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="" disabled sx={{ color: "#666", fontWeight: "bold", textTransform: "uppercase" }}>
                            TOIFALAR
                        </MenuItem>
                        {spotlights.map((spot, index) => (
                            <MenuItem key={index} value={spot.name} sx={{ textTransform: "uppercase" }}>
                                {spot.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                // Kompyuter uchun Button ro'yxati
                <Container
                    style={{
                        paddingBottom: "10px",
                        borderBottom: "1px solid #6b0f2a",
                    }}
                >
                    <div className="row g-4">
                        {spotlights.map((spot, index) => (
                            <div className="col-6 col-md-3" key={index}>
                                <Button
                                    variant="text"
                                    disableRipple
                                    href={`/catalog?${spot.url}`}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        padding: "10px",
                                        backgroundColor: "transparent",
                                        color: "var(--burgundy-color)",
                                        fontWeight: "bold",
                                        fontFamily: "Noto Sans, sans-serif",
                                        fontSize: "18px",
                                        textTransform: "uppercase",
                                        "&:hover": {},
                                    }}
                                >
                                    {spot.name}
                                </Button>
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </>
    )
}

export default SpotlightList
