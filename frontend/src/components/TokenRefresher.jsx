import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentDomain, getJwtExpiration } from '../helper'
import { setUserInfo } from '../redux/actions/actions'
import { useNavigate } from 'react-router-dom'

const TokenRefresher = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const refreshAccessToken = async () => {
            const exp = user.exp ? user.exp : 0 // Leads to get new access token if user refreshes window/browser
            const now = Date.now();
            const refreshThreshold = 10 * 60 * 1000; // 10 minutes in milliseconds

            if (exp - now <= refreshThreshold) {
                try {
                    const response = await fetch(currentDomain + "api/hr/token/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "refresh": localStorage.getItem("refreshToken")
                        })
                    });

                    if (response.ok) {
                        const data = await response.json()
                        dispatch(setUserInfo({
                            accessToken: data.access,
                            exp: getJwtExpiration(data.access)
                        }));
                    } else {
                        // const data = response.json()
                        // console.log('Failed to refresh token, fetch error', data.error)
                        navigate("/logout")
                    }
                } catch (error) {
                    // console.log('Failed to refresh token, catched error: ', error)
                    navigate("/logout")
                }
            }
        };

        const interval = setInterval(refreshAccessToken, 5 * 60 * 1000) // Check every 1 minutes

        return () => clearInterval(interval) // Clear the interval when the component is unmounted
    })

    return null
}

export default TokenRefresher
