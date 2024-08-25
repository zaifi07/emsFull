import React from 'react'
import Header from './header'

function Layout({ children }) {
    return (
        <div className='layout'>
            <Header />
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Layout
