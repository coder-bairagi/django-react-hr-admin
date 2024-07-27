import React from 'react'
import { Box, Button, Modal, Typography, useTheme } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { isMobile } from '../helper';
import { tokens } from '../theme';

const CustomModal = ({ open, handleClose, title, children, width, bgcolor, isOverdropClose = true, autoPopulateButton = false, handleAutoPopulate = null }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    width = isMobile ? "90%" : width

    return (
        <Modal open={open} onClose={isOverdropClose ? handleClose : isOverdropClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box width={width} bgcolor={bgcolor} sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 4,
                outline: 'none',
                borderRadius: "8px"
            }}>
                {/* Modal Header */}
                <Box display="flex" justifyContent="space-between">
                    <Typography id="modal-modal-title" variant="h3">{title}</Typography>
                    <Box display="flex" justifyContent="space-between">
                        {autoPopulateButton &&
                            <>
                            <Typography variant="h6" color={colors.grey[100]} sx={{ marginRight: `${isMobile ? "10px" : "25px"}`  }}>This button is for demo purposes and<br />Will be removed when deploying for the client.</Typography>
                            <Button color="secondary" variant="contained" sx={{ marginRight: `${isMobile ? "10px" : "25px"}`  }} onClick={handleAutoPopulate}>
                                Auto Populate Fields
                            </Button>
                            </>}
                        <Box sx={{
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}>
                            <CloseOutlinedIcon onClick={handleClose} />
                        </Box>
                    </Box>
                </Box>
                {/* Modal Body */}
                <Box id="modal-modal-description" sx={{ mt: "30px" }}>
                    {children()}
                </Box>
            </Box>
        </Modal>
    );
};

export default CustomModal;