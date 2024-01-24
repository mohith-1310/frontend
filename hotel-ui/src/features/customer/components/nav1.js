import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import 'primeicons/primeicons.css';
        

function NavbarTop() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/feelhome/customer/dashboard">FeelHome</Navbar.Brand>
          <Nav className="me-auto ">
            <Nav.Link onClick={() => navigate("/feelhome/customer/dashboard?page=bookings")}>Bookings</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">

          <i className="pi pi-user" style={{ color: 'whitesmoke' }}  onClick={() => navigate("/feelhome/customer/profile")}></i>
         
      
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            localStorage.getItem('isLoggedIn')?
            <React.Fragment>
            <Navbar.Text >
            Signed in as: <span style={{color: "white"}}> 
            {localStorage.getItem('username')} 
            </span>
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-info btn-sm ml-4" onClick={()=>{
            localStorage.clear();
            navigate('/feelhome/customer/dashboard')
          }}>Logout</button>
          </React.Fragment>
          : 
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1%' }}> <button className="btn btn-info btn-sm ml-4" onClick={()=>navigate('/feelhome/auth/login')}>Login</button> </div>
          }
          

          </Navbar.Collapse>
        </Container>
        
      </Navbar>

      
    </div>
  );
}

export default NavbarTop;
