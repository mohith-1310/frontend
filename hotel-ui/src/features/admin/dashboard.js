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
    if (param.get("page") === "Bookings") {
      if (localStorage.getItem("isLoggedIn") === null) {
        localStorage.setItem("url", "/feelhome/admin/dashboard?page=bookings");
        return <Login />;
      }

      return <ViewBookings />;
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
