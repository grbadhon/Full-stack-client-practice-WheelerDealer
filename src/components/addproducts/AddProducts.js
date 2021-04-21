import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './AddProducts.css'


const AddProducts = () => {
    const {  handleSubmit } = useForm();
    const [imageURL, setIMageURL] = useState(null);
    const [productName,setProductName] = useState('');
    const [productPrice,setProductPrice] = useState(0);
    const [productQuantity,setProductQuantity] = useState(0)
  
  
    const onSubmit = () => {
      
      const productData = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        imageURL: imageURL
      };
      const url = `https://wheelerdealer786.herokuapp.com/addProduct`;
      
      fetch(url, {
        method: 'POST', 
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      .then(res => console.log('server side response', res))
      .then(data =>{
        alert('Product Added');
      })
    };
  
    const handleImageUpload = event => {
      console.log(event.target.files[0])
      const imageData = new FormData();
      imageData.set('key', '0b387f6c6577ccb51d30dfe3197a0d9e');
      imageData.append('image', event.target.files[0]);
      
      axios.post('https://api.imgbb.com/1/upload', 
      imageData)
      .then(function (response) {
        setIMageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }


    return (
            <form className="form-group row ml-3 addProduct-div" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2 text-white" for="inlineFormInputName1">Product Name</label>
                    <input onChange={event => setProductName(event.target.value)} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName1" placeholder="Product Name" required="required"></input>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2 text-white" for="inlineFormInputName2">Price</label>
                    <input onChange={event => setProductPrice(parseInt(event.target.value))} type="text" className="form-control mb-2 mr-sm-2" name="price" id="inlineFormInputName2" placeholder="Price" required="required"></input>
                </div>



                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2 text-white" for="inlineFormInputName3">Quantity</label>
                    <input onChange={event => setProductQuantity(parseInt(event.target.value))} type="text" className="form-control mb-2 mr-sm-2" name="quantity" id="inlineFormInputName3" placeholder="Quantity" required="required"></input>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2 text-white" for="inlineFormInputName4">Image</label>
                    <input type="file" required="required" className="form-control mb-2 mr-sm-2" id="inlineFormInputName4" onChange={handleImageUpload}></input>
                </div>
                <div className="col-auto text-center">
                    <button type="submit" className="btn btn-primary mb-2">Add Product</button>
                </div>
            </form>
    );
};

export default AddProducts;