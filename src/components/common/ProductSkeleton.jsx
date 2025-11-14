import { Box } from "@mui/material"

const ProductSkeleton = ({ aspectRatio = "133%", overlay = false }) => {
    const spinnerContent = (
        <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin-slow"
        >
            <circle cx="60" cy="60" r="45" stroke="#d1d5db" strokeWidth="8" strokeLinecap="round" />
            <circle
                cx="60"
                cy="60"
                r="32"
                stroke="#60a5fa"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="60 160"
            />
            <circle
                cx="60"
                cy="60"
                r="20"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="30 90"
            />
        </svg>
    )

    if (overlay) {
        return (
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                }}
            >
                {spinnerContent}
            </Box>
        )
    }

    // Full product card skeleton that matches ProductCard structure exactly
    return (
        <Box className="flex flex-col product-card w-full">
            {/* Image container skeleton - matches product-card-image exactly */}
            <Box
                className="relative rounded-[14px] overflow-hidden bg-[#f5f5f5] product-card-image"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {spinnerContent}
            </Box>

            {/* Text content skeleton - matches ProductCard text area */}
            <Box className="pt-2 w-full">
                {/* Name and brand skeleton */}
                <Box className="flex flex-wrap items-end gap-x-2 gap-y-1 w-full mb-1">
                    <Box
                        sx={{
                            height: { xs: "32px", sm: "40px" },
                            width: "70%",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "4px",
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                        }}
                    />
                    <Box
                        sx={{
                            height: { xs: "14px", sm: "16px" },
                            width: "25%",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "4px",
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            marginLeft: "auto",
                        }}
                    />
                </Box>

                {/* Price skeleton */}
                <Box className="flex items-baseline gap-2 mt-1">
                    <Box
                        sx={{
                            height: { xs: "16px", sm: "20px" },
                            width: "100px",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "4px",
                            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductSkeleton
