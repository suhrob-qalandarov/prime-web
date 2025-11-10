import { Box } from "@mui/material"

const ProductSkeleton = ({ aspectRatio = "133%", overlay = false }) => {
    const content = (
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
                {content}
            </Box>
        )
    }

    return (
        <Box className="w-full" sx={{ position: "relative", overflow: "hidden" }}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: aspectRatio,
                    background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                    borderRadius: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {content}
            </Box>
        </Box>
    )
}

export default ProductSkeleton
