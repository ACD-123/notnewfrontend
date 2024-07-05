import React from 'react'
import NoDataFoundImage from '../../assets/Images/do-data-found.png';


function NoDataFound({title}) {
    return (
        <div className='no-data-found'>
            <img src={NoDataFoundImage} alt="" />
            <p>{title}</p>
        </div>
    )
}

export default NoDataFound