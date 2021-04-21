import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://wheelerdealer786.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    return (
        <>
        {
            (products.length > 0) ?
                <div className="row d-flex justify-content-center shop-div">
                    {
                        products.map(product =><Product product={product} key={product._id}></Product>)
                    }
            
                </div> :
                <Spinner></Spinner>
        }
        
        </>
    );
};

export default Shop;