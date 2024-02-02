import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../login";
import NavbarTop3 from "./nav1";
import ViewBookings from "./view_bookings";
import { useSearchParams } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [param] = useSearchParams();

  const process = () => {


    if (!param.get("page")) {
      return (
        <div style={{
          backgroundImage: 'url("/hotel.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
         
        </div>
      );
    }

    if (param.get("page") === "bookings") {
      if (localStorage.getItem("isLoggedIn") === null) {
        localStorage.setItem("url", "/feelhome/admin/dashboard?page=bookings");
        return (
          <div>
            <Login />
          </div>
        );
      }
      
      return (
        <div>
         
         <ViewBookings/>
        </div>
      );
    
}   
  };

  return (
    <div>
      <NavbarTop3 />
      {process()}
    </div>
  );
}

export default AdminDashboard;
