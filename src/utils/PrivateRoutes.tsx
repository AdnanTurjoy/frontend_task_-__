import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { selectCurrentToken } from '../features/authSlice'

const PrivateRoutes = () => {
    const token = useSelector(selectCurrentToken)
    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes