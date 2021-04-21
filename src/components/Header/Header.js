import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
import logo from './logo.png'
import { handleSignOut } from '../Login/loginManager';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const signOut = () => {
        handleSignOut()
        .then(res => {
            setLoggedInUser(res);
            
            
        })
    }

    return (
        <div className="menu-area">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light nav-spacing">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img className="navimg" src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav mobile-link">
                            <Link to="/home" className="nav-link active nav-a m-1" aria-current="page">Home</Link>
                            <Link to="/orders" className="nav-link active nav-a m-1" >Order</Link>
                            <Link to="/dashboard/manage-products" className="nav-link active nav-a m-1" >Admin</Link>
                            
                            {
                                (loggedInUser.email)?
                                <button onClick={signOut} className="btn nav-link active nav-a mt-1 text-white custom-btn" >Log Out</button> :
                                <Link to="/login" className="nav-link active nav-a m-1 " >Login</Link>
                                

                            }
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;