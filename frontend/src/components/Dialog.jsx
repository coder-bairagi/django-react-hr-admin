import { Typography, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// Scroll Type: paper or body
const ScrollDialog = ({ open, setOpen, scrollType, title, content }) => {
    const theme = useTheme()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                scroll={scrollType}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ backgroundColor: `${theme.palette.background.default}` }}><Typography variant="h3">{title}</Typography></DialogTitle>
                <DialogContent sx={{ backgroundColor: `${theme.palette.background.default}` }} dividers={scrollType === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: `${theme.palette.background.default}` }}>
                    <Button color="success" variant="outlined" onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ScrollDialog