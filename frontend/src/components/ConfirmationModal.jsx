import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme'


const ConfirmationModal = ({ title, message, open, setOpen, handleConfirm, handleCancel }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{
                    backgroundColor: `${colors.redAccent[500]}`
                }}>
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant="h3">{title}</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography variant="h5">{message}</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ color: "#fff" }} onClick={handleCancel} >Cancel</Button>
                        <Button sx={{ color: "#fff" }} onClick={handleConfirm} autoFocus >
                            Confirm
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )

}

export default ConfirmationModal
