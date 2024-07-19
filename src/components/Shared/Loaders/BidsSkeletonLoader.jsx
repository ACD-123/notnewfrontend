import React from 'react'
import Skeleton from 'react-skeleton-loader';

function BidsSkeletonLoader() {
    return (
        <div className='bids-skeleton-loader'>
            <Skeleton />
        </div>
    )
}

export default BidsSkeletonLoader