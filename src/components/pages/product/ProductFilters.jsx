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

const SeparatorIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1" 
        height="16" 
        viewBox="0 0 1 16" 
        fill="none"
    >
        <line 
            x1="0.5" 
            y1="0" 
            x2="0.5" 
            y2="16" 
            stroke="#666" 
            strokeWidth="1"
        />
    </svg>
)

const CloseIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1em" 
        height="1em" 
        fill="currentColor" 
        viewBox="0 0 256 256"
    >
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
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
        if (selectedColors.includes(color)) {
            onColorChange([])
        } else {
            onColorChange([color])
        }
        setFilterOpen(false)
    }

    const toggleSize = (size) => {
        if (selectedSizes.includes(size)) {
            onSizeChange([])
        } else {
            onSizeChange([size])
        }
        setFilterOpen(false)
    }

    const handleStatusChange = (status) => {
        onStatusChange(selectedStatus === status ? null : status)
        setFilterOpen(false)
    }

    return (
        <Box sx={{ mb: 4, position: "relative" }}>
            {/* Top Filter Bar */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                    mb: filterOpen ? (isMobile ? 2 : 0) : 0,
                }}
            >
                {/* Left side - Filterlar button */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {isMobile ? (
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
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
                    ) : (
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
                    )}
                </Box>

                {/* Left side - Status pills (tags) after Filterlar button */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    {["Sale", "New", "Hot"].map((status) => (
                        <Chip
                            key={status}
                            label={status}
                            onClick={() => handleStatusChange(status)}
                            sx={{
                                backgroundColor: "var(--light-color)",
                                color: "#333",
                                border: `1px solid ${selectedStatus === status ? "#000" : "#ddd"}`,
                                fontWeight: 500,
                                fontSize: isMobile ? "13px" : "14px",
                                height: isMobile ? "28px" : "32px",
                                "&:hover": {
                                    backgroundColor: "var(--light-color)",
                                    border: "1px solid #000",
                                },
                                "&:active": {
                                    border: "1px solid #000",
                                },
                                cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        />
                    ))}
                </Box>

            </Box>

            {/* Products count - Separate row below filter button */}
            <Box 
                sx={{ 
                    mt: 2,
                    mb: filterOpen ? 2 : 0,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box 
                    sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 3,
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                        <Box
                            sx={{
                                fontSize: isMobile ? "13px" : "14px",
                                color: "#666",
                                fontFamily: "Noto Sans, sans-serif",
                            }}
                        >
                            Mahsulotlar topildi: {totalProducts}
                        </Box>

                        {/* Separator and Selected Filters */}
                        {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                            <>
                                <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                                    <SeparatorIcon />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                    {selectedColors.map((color) => (
                                        <Chip
                                            key={color}
                                            label={color}
                                            onClick={() => {
                                                const newColors = selectedColors.filter(c => c !== color)
                                                onColorChange(newColors)
                                            }}
                                            onDelete={(e) => {
                                                e.stopPropagation()
                                                const newColors = selectedColors.filter(c => c !== color)
                                                onColorChange(newColors)
                                            }}
                                            deleteIcon={<CloseIcon />}
                                            size="small"
                                            sx={{
                                                fontSize: isMobile ? "13px" : "14px",
                                                height: isMobile ? "28px" : "32px",
                                                backgroundColor: "#e5e2d0",
                                                color: "#333",
                                                flexDirection: "row-reverse",
                                                paddingLeft: "6px",
                                                cursor: "pointer",
                                                "& .MuiChip-deleteIcon": {
                                                    fontSize: "18px",
                                                    color: "#666",
                                                    marginLeft: "2px",
                                                    marginRight: "0px",
                                                    cursor: "pointer",
                                                },
                                                "& .MuiChip-label": {
                                                    paddingLeft: "4px",
                                                    paddingRight: "6px",
                                                    fontSize: isMobile ? "13px" : "14px",
                                                    cursor: "pointer",
                                                },
                                            }}
                                        />
                                    ))}
                                    {selectedSizes.map((size) => (
                                        <Chip
                                            key={size}
                                            label={size}
                                            onClick={() => {
                                                const newSizes = selectedSizes.filter(s => s !== size)
                                                onSizeChange(newSizes)
                                            }}
                                            onDelete={(e) => {
                                                e.stopPropagation()
                                                const newSizes = selectedSizes.filter(s => s !== size)
                                                onSizeChange(newSizes)
                                            }}
                                            deleteIcon={<CloseIcon />}
                                            size="small"
                                            sx={{
                                                fontSize: isMobile ? "13px" : "14px",
                                                height: isMobile ? "28px" : "32px",
                                                backgroundColor: "#e5e2d0",
                                                color: "#333",
                                                flexDirection: "row-reverse",
                                                paddingLeft: "6px",
                                                cursor: "pointer",
                                                "& .MuiChip-deleteIcon": {
                                                    fontSize: "18px",
                                                    color: "#666",
                                                    marginLeft: "2px",
                                                    marginRight: "0px",
                                                    cursor: "pointer",
                                                },
                                                "& .MuiChip-label": {
                                                    paddingLeft: "4px",
                                                    paddingRight: "6px",
                                                    fontSize: isMobile ? "13px" : "14px",
                                                    cursor: "pointer",
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* Sort dropdown - Right side */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControl
                        sx={{
                            minWidth: isMobile ? "150px" : "220px",
                            width: "auto",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                height: isMobile ? "36px" : "40px",
                                "& fieldset": {
                                    borderColor: "#ddd",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#ddd",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#ddd",
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
                            displayEmpty
                            sx={{
                                fontSize: isMobile ? "13px" : "16px",
                                fontFamily: "Noto Sans, sans-serif",
                                height: isMobile ? "36px" : "40px",
                                "& .MuiSelect-select": {
                                    padding: isMobile ? "6px 12px" : "8px 16px",
                                    minWidth: "auto",
                                    width: "auto",
                                },
                                "& .MuiSelect-icon": {
                                    display: "none",
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
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Box>
                </Box>
            </Box>

            {/* No products message - Below products count */}
            {totalProducts === 0 && (
                <Box
                    sx={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: "#000",
                        fontFamily: "Noto Sans, sans-serif",
                        mt: 2,
                        mb: filterOpen ? 2 : 0,
                    }}
                >
                    Tanlangan mezonlar bo'yicha mahsulotlar topilmadi
                </Box>
            )}

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
                                            color: "#333",
                                            border: `1px solid ${selectedColors.includes(color) ? "#000" : "#ddd"}`,
                                            fontWeight: 500,
                                            fontSize: "13px",
                                            height: "32px",
                                            "&:hover": {
                                                backgroundColor: "var(--light-color)",
                                                border: "1px solid #000",
                                            },
                                            "&:active": {
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
                                            color: "#333",
                                            border: `1px solid ${selectedSizes.includes(size) ? "#000" : "#ddd"}`,
                                            fontWeight: 500,
                                            fontSize: "13px",
                                            height: "32px",
                                            "&:hover": {
                                                backgroundColor: "var(--light-color)",
                                                border: "1px solid #000",
                                            },
                                            "&:active": {
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

