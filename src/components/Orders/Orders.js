import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Orders.css'

const Orders = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('https://wheelerdealer786.herokuapp.com/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, [])
    
    return (
        <div className="booking-table table-responsive">
            <h1>You Have {bookings.length} Order(s)</h1>
            <table className="table caption-top">
                
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                
                   {
                       bookings.map(booking =>{
                        return <tr>
                                    <td>{booking.orderItem}</td>
                                    <td>{booking.name}</td>
                                    <td>{booking.email}</td>
                                    <td>{booking.mobileNo}</td>
                                    <td>{booking.address}</td>
                                    <td>{booking.quantity}</td>
                                    <td>{booking.price}</td>
                                    <td>{booking.orderDateTime}</td>
                                </tr>

                       })
                   }
                
                </tbody>
            </table>
            
        </div>
    );
};

export default Orders;