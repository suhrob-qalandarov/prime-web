import { Box, Button, Select, MenuItem, FormControl } from "@mui/material"

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

const CategoriesList = ({ categories, onCategorySelect, selectedCategory, isMobile }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: isMobile ? "column" : "row",
                flexWrap: isMobile ? "nowrap" : "wrap",
                gap: 2,
                alignItems: "center",
                py: isMobile ? 0 : 1,
                maxHeight: { xs: "auto", sm: "auto", md: "400px" },
                overflowY: isMobile ? "hidden" : "auto",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                    width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(107, 15, 42, 0.3)",
                    borderRadius: "3px",
                    "&:hover": {
                        backgroundColor: "rgba(107, 15, 42, 0.5)",
                    },
                },
            }}
        >
            {isMobile ? (
                <FormControl sx={{ width: "100%", minWidth: 0 }}>
                    <Select
                        displayEmpty
                        value={selectedCategory || ""}
                        onChange={(e) => onCategorySelect(e.target.value)}
                        variant="filled"
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
                            KATEGORIYALAR
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem
                                key={category.id}
                                value={category.id}
                                sx={{
                                    textTransform: "uppercase",
                                }}
                            >
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                // Kompyuter uchun Button ro‘yxati
                categories.map((category) => (
                    <Button
                        variant="text"
                        key={category.id}
                        disableRipple
                        onClick={() => onCategorySelect(category.id)}
                        sx={{
                            minWidth: 140,
                            flex: "0 0 auto",
                            height: "28px",
                            px: 0,
                            backgroundColor: "transparent",
                            color: selectedCategory === category.id ? "black" : "#0033aa",
                            fontFamily: "Noto Sans, sans-serif",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            "&:hover": {
                                backgroundColor: "transparent",
                                color: "black",
                            },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                bottom: 0,
                                height: "2px",
                                width: "100%",
                                backgroundColor: "#0033aa",
                                transform: selectedCategory === category.id ? "scaleX(1)" : "scaleX(0)",
                                transformOrigin: "left",
                                transition: "transform 0.3s ease",
                            },
                            "&:hover::after": {
                                transform: "scaleX(1)",
                            },
                        }}
                    >
                        {category.name}
                    </Button>
                ))
            )}
        </Box>
    );
};

export default CategoriesList