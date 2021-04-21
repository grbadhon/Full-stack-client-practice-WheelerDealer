import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './ProductManager.css';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
   useEffect(() => {
        fetch('https://wheelerdealer786.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products])

    //Edit products 
    const {  handleSubmit } = useForm();
    const [imageURL, setIMageURL] = useState(null);
    const [productName,setProductName] = useState('');
    const [productPrice,setProductPrice] = useState(0);
    const [productQuantity,setProductQuantity] = useState(0);
    const [editProductId,setEditProductId] = useState('');
    const [isEditClicked,setIsEditClicked] = useState(false);
  

    const onSubmit = () => {
        const productData = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            imageURL: imageURL
          };

        fetch(`https://wheelerdealer786.herokuapp.com/update/${editProductId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setIsEditClicked(false);
                }
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
      function deleteProduct(id) {
        fetch(`https://wheelerdealer786.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                
            })
    }
    const editClicked = (id) => {
        setEditProductId(id);
        setIsEditClicked(true);
    }
    
    return (
        <div className="table-responsive manager-div">
             {
                       isEditClicked &&
                       <form className="form-group row" id="update-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <h1>Edit Product</h1>
                            </div>
                           
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <label className="m" for="inlineFormInputName1">Product Name</label>
                                <input onChange={event => setProductName(event.target.value)} type="text" className="form-control mb-2" id="inlineFormInputName1" placeholder="Product Name" required="required"></input>
                            </div>
            
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <label className="m " for="inlineFormInputName2">Price</label>
                                <input onChange={event => setProductPrice(parseInt(event.target.value))} type="text" className="form-control mb-2 " name="price" id="inlineFormInputName2" placeholder="Price" required="required"></input>
                            </div>
            
            
            
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <label className="m" for="inlineFormInputName3">Quantity</label>
                                <input onChange={event => setProductQuantity(parseInt(event.target.value))} type="text" className="form-control mb-2" name="quantity" id="inlineFormInputName3" placeholder="Quantity" required="required"></input>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <label className="m" for="inlineFormInputName4">Image</label>
                                <input type="file" required="required" className="form-control mb-2 mr-sm-2" id="inlineFormInputName4" onChange={handleImageUpload}></input>
                            </div>
                            <div className="col-auto text-center">
                                <button type="submit" className="btn btn-primary mb-2">Update Product</button>
                            </div>
                        </form>
                   }
            <table className="table caption-top">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                
                   {
                       products.map(product =>{
                        return <tr>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td><button onClick={()=>editClicked(product._id)} className="btn btn-primary mr-1">Edit</button><button onClick={() =>deleteProduct(product._id)} className="btn btn-danger" >Delete</button></td>
                                </tr>

                       })
                   }
                
                </tbody>
            </table>
                    
                  


        </div>
    );
};

export default ProductManager;