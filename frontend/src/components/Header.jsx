import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../theme'

const Header = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="30px">
            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" marginBottom="5px">{props.title}</Typography>
            <Typography variant="h5" color={theme.palette.mode === "dark" ? colors.greenAccent[500] : colors.blueAccent[500]}>{props.subtitle}</Typography>
        </Box>
    )
}

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
}

export default Header

