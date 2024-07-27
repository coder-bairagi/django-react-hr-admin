import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import Alert from '@mui/material/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { hideSnackbar } from '../redux/actions/actions'

const CustomSnackbar = () => {
    const snk = useSelector(state => state.snackbar)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(hideSnackbar())
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: snk.vertical,
                    horizontal: snk.horizontal
                }}
                open={snk.open}
                onClose={handleClick}
                TransitionComponent={Slide}
                key={snk.vertical + snk.horizontal}
            >
                <Alert
                    severity={snk.alertType}
                    variant="filled"
                    sx={{ width: '100%', color: "#ffffff" }}
                >
                    {snk.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default CustomSnackbar
