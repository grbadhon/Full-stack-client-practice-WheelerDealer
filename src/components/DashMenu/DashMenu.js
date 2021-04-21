import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './DashMenu.css'
const DashMenu = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    if (loggedInUser.email) {
        var name = loggedInUser.email.substring(0, loggedInUser.email.indexOf("@"));
    }
    return (
        <div className="text-white bg-dark dash-nav" >
            <ul className="nav nav-pills flex-column mb-auto ">
               
                <li>
                    <Link to="/dashboard/addproducts" className="nav-link text-white">
                        Add Products
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/pending-orders" className="nav-link text-white">
                        Pending Orders
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/manage-products" className="nav-link text-white">
                        Manage Products
                    </Link>
                </li>
                <li className="nav-link text-white">
                    Hello, {name}
                </li>
            </ul>
        </div>
    );
};

export default DashMenu;