import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router";

function Profile() {
  const [customer, setCustomer] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('id');

    if (storedCustomerId) {
      const customerId = parseInt(storedCustomerId, 10);

      axios.get(`http://localhost:8088/feelhome/customer/get/${customerId}`)
        .then(response => {
          const customerDetails = response.data;
          setCustomer(customerDetails);
        })
        .catch(error => {
          console.error('Error fetching customer:', error);
          setMsg("Error fetching customer");
        });
    } else {
      console.error('Customer ID not found in local storage.');
      setMsg("Customer ID not found");
    }
  }, []);

  console.log(customer);

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="card mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)' }}>
          <div className="card-header" style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
            <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Customer Profile</h3>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {customer ? (
              <>
                <div style={{ textAlign: 'center', width: '50%' }}>
                  <h4 style={{ fontWeight: 'bold' }}>Name:</h4> <p>{customer.name}</p>
                  <h4 style={{ fontWeight: 'bold' }}>Email:</h4><p>{customer.email}</p>
                  <h4 style={{ fontWeight: 'bold' }}>Phone:</h4> <p>{customer.phone}</p>
                  <h4 style={{ fontWeight: 'bold' }}>Date of Birth:</h4> <p>{customer.dateOfBirth}</p>
                  <h4 style={{ fontWeight: 'bold' }}>Age:</h4>  <p>{customer.age}</p>
                  <h4 style={{ fontWeight: 'bold' }}>Gender:</h4><p>{customer.gender}</p>
                  {/* Add more headings as needed */}
                </div>

                

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button className="btn btn-primary" onClick={()=>navigate('/feelhome/customer/profile/update')}>Update</button>
                </div>
              </>
            ) : (
              <p>{msg}</p>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  </div>
  );
}

export default Profile;
