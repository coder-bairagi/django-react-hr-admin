import { Box, useTheme } from "@mui/material"
import { tokens } from "../theme"

const ProgressCircle = ({ progress = "0.75", size = "40", fontSize="0.75rem" }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 360;

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize={fontSize}
            sx={{
                background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                conic-gradient(${colors.greenAccent[500]} 0deg ${angle}deg, transparent ${angle}deg 360deg),
                ${colors.primary[400]}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            {(progress * 100) + "%"}
        </Box>
    )
}

export default ProgressCircle
