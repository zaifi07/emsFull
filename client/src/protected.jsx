import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
const auth = () => {
    return localStorage.getItem('alnasar');
}

function Protected() {
    return (
        <div>
            {auth() ? <Outlet /> : <Navigate to={'/'} />}
        </div>
    )
}

export default Protected
