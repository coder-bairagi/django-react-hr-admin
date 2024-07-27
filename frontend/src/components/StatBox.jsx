import { Box, Typography, useTheme } from "@mui/material"
import PropTypes from 'prop-types'
import { tokens } from "../theme"
import ProgressCircle from "./ProgressCircle"

const StatBox = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {props.icon}
                    <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                        {props.title}
                    </Typography>
                </Box>
                <ProgressCircle progress={props.progress} size={window.innerWidth < 768 ? "40" : "50"} />
            </Box>
            <Box display="flex" flexDirection="column">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {props.subtitle}
                </Typography>
                <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600] }}>
                    {props.increasePercentage}
                </Typography>
            </Box>
        </Box>
    )
}

StatBox.propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    increasePercentage: PropTypes.string,
    progress: PropTypes.string,
}

export default StatBox
