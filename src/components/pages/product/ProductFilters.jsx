import { useState } from "react"
import { Box, Chip, Select, MenuItem, FormControl, useMediaQuery, Collapse } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const FilterIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
    >
        <path d="M4 21V14" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M4 10V3" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 21V12" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 8V3" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M20 21V16" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M20 12V3" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M1 14H7" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M9 8H15" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17 16H23" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
)

const ChevronDownIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ height: "16px", width: "16px" }}
    >
        <path d="m6 9 6 6 6-6"></path>
    </svg>
)

const ProductFilters = ({ 
    totalProducts, 
    selectedStatus, 
    onStatusChange,
    selectedSort,
    onSortChange,
    selectedColors,
    onColorChange,
    selectedSizes,
    onSizeChange
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    const colors = [
        "Oq", "Qora", "Havorang", "Pushti", "Yashil", "Kulrang",
        "Burgundiy", "To'q Ko'k", "To'q Yashil", "Jigarrang",
        "Xantal Rang", "Shaftoli Rang", "Qaymoq Rang", 
        "To'q Ko'k (Jinsi)", "Qora (Jinsi)", "To'q Kulrang (Jinsi)"
    ]

    const sizes = [
        "XL (Bo'y 176-187)", "L (Bo'y 163-175)", "Standart", "A5",
        "M (Oversize)", "M (Not Oversize)"
    ]

    const sortOptions = [
        { value: "default", label: "Saralash" },
        { value: "discount", label: "Chegirma bo'yicha" },
        { value: "price-low", label: "Avval arzoni" },
        { value: "price-high", label: "Avval qimmati" }
    ]

    const toggleColor = (color) => {
        const newColors = selectedColors.includes(color)
            ? selectedColors.filter(c => c !== color)
            : [...selectedColors, color]
        onColorChange(newColors)
    }

    const toggleSize = (size) => {
        const newSizes = selectedSizes.includes(size)
            ? selectedSizes.filter(s => s !== size)
            : [...selectedSizes, size]
        onSizeChange(newSizes)
    }

    return (
        <Box sx={{ mb: 4, position: "relative" }}>
            {/* Top Filter Bar */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    justifyContent: "space-between",
                    gap: isMobile ? 2 : 2,
                    mb: filterOpen ? (isMobile ? 2 : 0) : 0,
                }}
            >
                {/* Left side - Filterlar button and status pills */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                    {isMobile ? (
                        <Box sx={{ width: "100%" }}>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    padding: "12px 16px",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontFamily: "Noto Sans, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#333",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <FilterIcon />
                                    Filterlar
                                </Box>
                                <ExpandMoreIcon
                                    sx={{
                                        fontSize: "24px",
                                        transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </button>
                        </Box>
                    ) : (
                        <>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontFamily: "Noto Sans, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    color: "#333",
                                }}
                            >
                                <FilterIcon />
                                Filterlar
                            </button>

                            {/* Status Pills - Right side of filter button */}
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {["Sale", "New", "Hot"].map((status) => (
                                    <Chip
                                        key={status}
                                        label={status}
                                        onClick={() => onStatusChange(
                                            selectedStatus === status ? null : status
                                        )}
                                        sx={{
                                            backgroundColor: "var(--light-color)",
                                            color: selectedStatus === status ? "#0033aa" : "#333",
                                            border: `1px solid ${selectedStatus === status ? "#000" : "#ddd"}`,
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            height: "32px",
                                            "&:hover": {
                                                backgroundColor: "var(--light-color)",
                                                border: "1px solid #000",
                                            },
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                        }}
                                    />
                                ))}
                            </Box>
                        </>
                    )}
                </Box>

                {/* Right side - Sort dropdown */}
                <Box sx={{ width: isMobile ? "100%" : "auto" }}>
                    <FormControl
                        sx={{
                            width: isMobile ? "100%" : 180,
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                "& fieldset": {
                                    borderColor: "#ddd",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#bbb",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#333",
                                },
                            },
                        }}
                    >
                        <Select
                            value={selectedSort}
                            onChange={(e) => {
                                onSortChange(e.target.value)
                                setSortOpen(false)
                            }}
                            onOpen={() => setSortOpen(true)}
                            onClose={() => setSortOpen(false)}
                            IconComponent={ChevronDownIcon}
                            sx={{
                                fontSize: isMobile ? "14px" : "16px",
                                fontFamily: "Noto Sans, sans-serif",
                                "& .MuiSelect-select": {
                                    padding: isMobile ? "10px 32px 10px 14px" : "12px 36px 12px 16px",
                                },
                                "& .MuiSelect-icon": {
                                    right: "8px",
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        borderRadius: "8px",
                                        marginTop: "4px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        "& .MuiMenuItem-root": {
                                            fontFamily: "Noto Sans, sans-serif",
                                            fontSize: "14px",
                                            padding: "10px 16px",
                                            "&.Mui-selected": {
                                                backgroundColor: "#f5f5f5",
                                                "&:hover": {
                                                    backgroundColor: "#eee",
                                                },
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {sortOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value === selectedSort && "✓ "}
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Products count - Separate row below filter button */}
            <Box 
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 3,
                    mt: 2,
                    mb: filterOpen ? 2 : 0,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: "#666",
                        fontFamily: "Noto Sans, sans-serif",
                    }}
                >
                    {totalProducts > 0 ? (
                        <>Mahsulotlar topildi: {totalProducts}</>
                    ) : (
                        <>Tanlangan mezonlar bo'yicha mahsulotlar topilmadi</>
                    )}
                </Box>
                {(selectedStatus || selectedColors.length > 0 || selectedSizes.length > 0) && (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box 
                                sx={{ 
                                    width: "1px", 
                                    height: "16px", 
                                    backgroundColor: "#ddd" 
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                            {selectedStatus && (
                                <Chip
                                    label={selectedStatus}
                                    onDelete={() => onStatusChange(null)}
                                    sx={{
                                        backgroundColor: "var(--light-color)",
                                        color: "#0033aa",
                                        border: "1px solid #000",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        height: "28px",
                                        "& .MuiChip-deleteIcon": {
                                            color: "#666",
                                            fontSize: "16px",
                                            "&:hover": {
                                                color: "#000",
                                            },
                                        },
                                    }}
                                />
                            )}
                            {selectedColors.map((color) => (
                                <Chip
                                    key={color}
                                    label={color}
                                    onDelete={() => {
                                        const newColors = selectedColors.filter(c => c !== color)
                                        onColorChange(newColors)
                                    }}
                                    sx={{
                                        backgroundColor: "var(--light-color)",
                                        color: "#0033aa",
                                        border: "1px solid #000",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        height: "28px",
                                        "& .MuiChip-deleteIcon": {
                                            color: "#666",
                                            fontSize: "16px",
                                            "&:hover": {
                                                color: "#000",
                                            },
                                        },
                                    }}
                                />
                            ))}
                            {selectedSizes.map((size) => (
                                <Chip
                                    key={size}
                                    label={size}
                                    onDelete={() => {
                                        const newSizes = selectedSizes.filter(s => s !== size)
                                        onSizeChange(newSizes)
                                    }}
                                    sx={{
                                        backgroundColor: "var(--light-color)",
                                        color: "#0033aa",
                                        border: "1px solid #000",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        height: "28px",
                                        "& .MuiChip-deleteIcon": {
                                            color: "#666",
                                            fontSize: "16px",
                                            "&:hover": {
                                                color: "#000",
                                            },
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </>
                )}
            </Box>

            {/* Filter Dropdown */}
            <Collapse 
                in={filterOpen} 
                timeout={300} 
                sx={{ 
                    width: "100%",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1000,
                    mt: 2,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "var(--light-color)",
                        borderRadius: "8px",
                        padding: isMobile ? "16px" : "20px 0",
                        width: "100%",
                        position: "relative",
                        zIndex: 1000,
                        animation: filterOpen ? "rotateIn 0.3s ease-out" : "none",
                        "@keyframes rotateIn": {
                            "0%": {
                                opacity: 0,
                                transform: "rotateX(-90deg) translateY(-10px)",
                            },
                            "100%": {
                                opacity: 1,
                                transform: "rotateX(0deg) translateY(0)",
                            },
                        },
                    }}
                >
                    {isMobile ? (
                        <>
                            {/* Mobile: Status Pills inside dropdown */}
                            <Box sx={{ mb: 3 }}>
                                <Box
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        mb: 2,
                                        fontFamily: "Noto Sans, sans-serif",
                                    }}
                                >
                                    Status
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {["Sale", "New", "Hot"].map((status) => (
                                        <Chip
                                            key={status}
                                            label={status}
                                            onClick={() => onStatusChange(
                                                selectedStatus === status ? null : status
                                            )}
                                            sx={{
                                                backgroundColor: "var(--light-color)",
                                                color: selectedStatus === status ? "#0033aa" : "#333",
                                                border: `1px solid ${selectedStatus === status ? "#000" : "#ddd"}`,
                                                fontWeight: 500,
                                                fontSize: "13px",
                                                height: "32px",
                                                "&:hover": {
                                                    backgroundColor: "var(--light-color)",
                                                    border: "1px solid #000",
                                                },
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </>
                    ) : null}

                    <Box
                        sx={{
                            display: isMobile ? "block" : "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                            gap: isMobile ? 0 : "30px",
                        }}
                    >
                        {/* Rang Filter */}
                        <Box sx={{ mb: isMobile ? 3 : 0 }}>
                            <Box
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    mb: 2,
                                    fontFamily: "Noto Sans, sans-serif",
                                }}
                            >
                                Rang
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {colors.map((color) => (
                                    <Chip
                                        key={color}
                                        label={color}
                                        onClick={() => toggleColor(color)}
                                        sx={{
                                            backgroundColor: "var(--light-color)",
                                            color: selectedColors.includes(color) ? "#0033aa" : "#333",
                                            border: `1px solid ${selectedColors.includes(color) ? "#000" : "#ddd"}`,
                                            fontWeight: 500,
                                            fontSize: "13px",
                                            height: "32px",
                                            "&:hover": {
                                                backgroundColor: "var(--light-color)",
                                                border: "1px solid #000",
                                            },
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* O'lcham Filter */}
                        <Box>
                            <Box
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    mb: 2,
                                    fontFamily: "Noto Sans, sans-serif",
                                }}
                            >
                                O'lcham
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {sizes.map((size) => (
                                    <Chip
                                        key={size}
                                        label={size}
                                        onClick={() => toggleSize(size)}
                                        sx={{
                                            backgroundColor: "var(--light-color)",
                                            color: selectedSizes.includes(size) ? "#0033aa" : "#333",
                                            border: `1px solid ${selectedSizes.includes(size) ? "#000" : "#ddd"}`,
                                            fontWeight: 500,
                                            fontSize: "13px",
                                            height: "32px",
                                            "&:hover": {
                                                backgroundColor: "var(--light-color)",
                                                border: "1px solid #000",
                                            },
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    )
}

export default ProductFilters

