import React from 'react'

function Loader() {
    return (
        <div style={{ padding: '5rem' }}>
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <p style={{ textAlign: 'center' }}>Wait a second...</p>
        </div>
    )
}

export default Loader
