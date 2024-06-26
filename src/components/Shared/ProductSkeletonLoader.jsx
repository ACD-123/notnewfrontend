import React from 'react'
import Skeleton from 'react-skeleton-loader';

function ProductSkeletonLoader() {
    return (
        <div className='product-skeleton-loader'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    )
}

export default ProductSkeletonLoader