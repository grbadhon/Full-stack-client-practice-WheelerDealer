import React, { useContext, useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router';
import './CheckOut.css';
import { useForm } from "react-hook-form"
import { UserContext } from '../../App';

const CheckOut = () => {
    const { productId } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {  handleSubmit, } = useForm();
    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobileNo,setMobileNo] = useState('');
    const [address,setAddress] = useState('');
    useEffect(() => {
        fetch(`https://wheelerdealer786.herokuapp.com/product/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data[0]))
    }, [productId])

    const history = useHistory()


    const onSubmit = () => {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
    
        
        const productName = product.name;
        const productQuantity = product.quantity;
        const productPrice = product.price;
        const orderData = {
          name: name,
          email: email,
          mobileNo: mobileNo,
          address: address,
          orderItem: productName,
          orderDateTime: dateTime,
          price: productPrice,
          quantity: 1
        };
        console.log(orderData)
        const url = `https://wheelerdealer786.herokuapp.com/addOrder`;
        
        fetch(url, {
          method: 'POST', 
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(orderData)
        })
        .then(res => console.log('server side response', res))
        .then(data =>{
          alert('Order Recieved');
          history.push('/orders');
        })
      };
     
    


    return (
        <div className="checkout-form table-responsive">
            <h1>Your Order Details</h1>
            <table className="table caption-top ">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product.name}</td>
                        <td>1</td>
                        <td> ৳ {product.price}</td>
                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className='bold-font'>Total : ৳ {product.price}</td>
                    </tr>
                </tfoot>
            </table>
            <form className="form-group row" onSubmit={handleSubmit(onSubmit)} >

                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2" for="inlineFormInputName2">Your Name</label>
                    <input onChange={event => setName(event.target.value)} type="text" className="form-control mb-2 mr-sm-2" name="name" id="inlineFormInputName2" placeholder="Your Name" required="required"></input>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2" for="inlineFormInputName1">Enter Your Email</label>
                    {
                        loggedInUser.email ?
                        <input onChange={event => setEmail(event.target.value)} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName1" placeholder={loggedInUser.email} required="required"></input> :
                        <input onChange={event => setEmail(event.target.value)} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName1" placeholder="Your Email" required="required" ></input>

                    }
                   
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2" for="inlineFormInputName2">Enter Your Number</label>
                    <input onChange={event => setMobileNo(event.target.value)} type="text" className="form-control mb-2 mr-sm-2" name="mobileNo" id="inlineFormInputName2" placeholder="01*********" required="required"></input>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <label className="my-1 mr-2" for="inlineFormInputName3">Enter Your Address</label>
                    <input onChange={event => setAddress(event.target.value)} type="text" className="form-control mb-2 mr-sm-2" name="address" id="inlineFormInputName3" placeholder="Your Current Address" required="required"></input>
                </div>

                <div className="col-auto text-center">
                    <button type="submit" className="btn btn-primary mb-2">Check Out</button>
                </div>
            </form>
            

        </div>
    );
};

export default CheckOut;