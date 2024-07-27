import React, { useContext } from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} backgroundColor={theme.palette.background.default}>
        {/* Search Bar */}
        <Box display="flex" justifyContent="space-between">
          {props.isMobile && (
            <IconButton onClick={() => { props.setIsCollapsed(!props.isCollapsed); }}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Box display="flex" justifyContent="space-between" backgroundColor={colors.primary[400]} borderRadius="3px" marginLeft={props.isMobile ? "15px" : "0"}>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Icon Buttons */}
        <Box display="flex">
          <IconButton onClick={colorMode.toogleColorMode}>
            {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}

Topbar.propTypes = {
  isMobile: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  setIsCollapsed: PropTypes.func,
};

export default Topbar
