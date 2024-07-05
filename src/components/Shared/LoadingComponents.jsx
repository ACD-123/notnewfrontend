import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingComponents() {
    return (
        <div className="loader-container text-center">
            <Spinner animation="border" role="status"></Spinner>
        </div>
    )
}

export default LoadingComponents