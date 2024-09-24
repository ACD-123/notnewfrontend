import React, { useState, useEffect } from 'react';
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import { Link } from "react-router-dom";
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
import axios from 'axios'
const ProductUpload = () => {
    const [productData, setProductData] = useState([]);
    const [image, setImage] = useState('');
    const [sucess, setSucess] = useState(false);
    const [error, setError] = useState(false);
    const [imagePreviewUrl, setimagePreviewUrl] = useState(false);
    
    const onChange =(e) =>{
      let files = e.target.files[0] || e.dataTransfer.files[0];
      setImage(files)
    }
    const FormSubmit =(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('images', image);
      const config = {     
          headers: { 
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
           }
      }
      axios.post('https://notnewbackendv2.testingwebsitelink.com/api/products/upload', formData, config)
        .then(response => {
           
        })
        .catch(error => {
          toast.error(error?.response?.data?.message)
        });
    }
    useEffect(() => {
    }, []);
  return (
    <>
    <section id='product-recents-viewed'>
       product upload
       <form onSubmit={FormSubmit}  encType="multipart/form-data" >
            <h1>Insert Material</h1>
            <label className="label_imagem_artigo"> Imagem do artigo: </label>
            <input className="input_imagem_artigo" type="file"  onChange={onChange} />
            <div className="imgPreview">
            { imagePreviewUrl ?  (<img className="add_imagem" Name="add_imagem" src={imagePreviewUrl} />) : ( 'Upload image' )
            }
            <input type="submit" />
            </div>
</form>  
    </section>
    </>
  )
}

export default ProductUpload