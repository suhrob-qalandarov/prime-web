import {Stack, Box} from "@mui/material";
import {Link} from "react-router-dom";

const CatalogPageHeader = ({spotlight}) => {
    return (
        <Stack
            sx={{
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#6b0f2a",
                    marginBottom: "0px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
            >
                {spotlight ? spotlight.name : "Katalog"}
            </Box>
            <Box
                sx={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: "300",
                    color: "#6b0f2a",
                    marginBottom: "8px",
                    letterSpacing: "1px",
                    marginTop: "10px",
                }}
            >
                <Link to="/" className="breadcrumb-link">
                    Asosiy
                </Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{spotlight ? spotlight.name : "Katalog"}</span>
            </Box>
        </Stack>
    );
};

export default CatalogPageHeader;