import React from 'react';
import Prdimg1 from '../../../assets/Images/PersonalInfo/Savedimages/1.png';
import Prdimg2 from '../../../assets/Images/PersonalInfo/Savedimages/2.png';
import Prdimg3 from '../../../assets/Images/PersonalInfo/Savedimages/3.png';
import Prdimg4 from '../../../assets/Images/PersonalInfo/Savedimages/4.png';
import Prdimg5 from '../../../assets/Images/PersonalInfo/Savedimages/5.png';
import Prdimg6 from '../../../assets/Images/PersonalInfo/Savedimages/6.png';
import Prdimg7 from '../../../assets/Images/PersonalInfo/Savedimages/7.png';
import Prdimg8 from '../../../assets/Images/PersonalInfo/Savedimages/8.png';
import Prdimg9 from '../../../assets/Images/PersonalInfo/Savedimages/9.png';
import Prdimg10 from '../../../assets/Images/PersonalInfo/Savedimages/10.png';
import Prdimg11 from '../../../assets/Images/PersonalInfo/Savedimages/11.png';


const imagePaths = [Prdimg1, Prdimg2, Prdimg3, Prdimg4, Prdimg5, Prdimg6, Prdimg7, Prdimg8, Prdimg9, Prdimg10, Prdimg11];

const SavedImages = () => {
  return (
    <div className='saved-images'>
      <h3>Recent Saved Images</h3>
      <div className='row'>
        {imagePaths.map((path, index) => (
          <div className='col' key={index}>
            <img src={path} style={{ width: '100%' }} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <h3>All Saved Images</h3>
      <div className='row'>
        {imagePaths.map((path, index) => (
          <div className='col' key={index}>
            <img src={path} style={{ width: '100%' }} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default SavedImages;
