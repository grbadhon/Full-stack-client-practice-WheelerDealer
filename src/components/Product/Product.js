import React from 'react';
import { useHistory } from 'react-router';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product }) => {
    const history = useHistory()
    const handleOrder = (productId) => {
        history.push(`/buy-product/${productId}`);
    }
    return (
        <div className="card col-sm-12 col-md-5 col-lg-3 m-4 product-card">
            <img src={product.imageURL} className="card-img-top product-image mt-4" alt="..."></img>
            <div className="card-body p-0">
                <h5 className="card-title mt-4">{product.name}</h5>
                <div className="row d-flex mb-4">
                    <div className="col-8 ">
                        <p className="card-text">Price: {product.price}</p>
                    </div>
                    <div className="col-4 p-0">
                        <p className="card-text text-end">Quantity: {product.quantity}</p>
                    </div>

                </div>
                <button onClick={() => handleOrder(product._id)} className="btn btn-primary mb-4"> <FontAwesomeIcon icon={faShoppingBasket} /> Buy Now</button>
            </div>
        </div>
    );
};

export default Product;