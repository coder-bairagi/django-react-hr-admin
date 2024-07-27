import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {
    const user = useSelector(state => state.user)

    // If user name exists, then proceeds to children routes, else navigate
    return user.name ? <Outlet/> : <Navigate to="/sign-in" />
}

export default ProtectedRoutes
