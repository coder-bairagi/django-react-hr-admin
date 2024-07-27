import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearUserInfo, showSnackbar, hideSnackbar } from '../../redux/actions/actions'
import { currentDomain } from '../../helper'

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleServerLogout = async () => {
            try {
                const response = await fetch(currentDomain + 'api/hr/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('access')}`
                    },
                    body: JSON.stringify({
                        "refresh": `${localStorage.getItem('refresh')}`
                    })
                });

                if (response.ok) {
                    // Dispatch clearUserInfo action
                    dispatch(clearUserInfo()) // clearing user info will automatically redirects user to sign-in page
                    dispatch(hideSnackbar())
                } else if (response.status === 401) {
                    // Logout from frontend immediately if accessed is revoked from server
                    dispatch(clearUserInfo())
                } else {
                    // Handle error response
                    dispatch(showSnackbar({
                        message: 'Logout failed: ' + response.statusText,
                        alertType: "error",
                    }));
                }
            } catch (error) {
                dispatch(showSnackbar({
                    message: 'Logout error: ' + error,
                    alertType: "error",
                }));
            }
        };

        // Log out from server when component mounts
        handleServerLogout();
    }, [dispatch]);

    return null
};

export default Logout;
