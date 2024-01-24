import axios from "axios";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "./navbar";
import NavbarTop from "./nav1";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const { location } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/feelhome/gethotels/${location}`
        );
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchData();
  }, [location]);

  const navigateToBookRooms = (hotelId) => {
    const url = `/feelhome/book-rooms/${location}/${hotelId}`;
    navigate(url);
  };

 

  return (
    <div>
      <NavbarTop/>
      <div className="container mt-5">
     
     {hotels.length === 0 ? (
       <div>No hotels to show.....</div>
     ) : (
       <div className="row">
         {hotels.map((hotel) => (
           <div key={hotel.id} className="col-md-6 mb-4">
             <div
               className="card"
               style={{
                 display: "flex",
                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Add shadow
                 borderRadius: "10px", // Add border radius
                 overflow: "hidden", // Hide overflow content
               }}
             >
               <img
                 src={hotel.imageUrl ?? "./hotel.png"}
                 className="card-img-left"
                 alt={`Hotel ${hotel.name}`}
                 style={{
                   flex: 1,
                   objectFit: "cover",
                   borderRadius: "10px 0 0 10px",
                 }}
               />

               <div
                 className="card-body"
                 style={{
                   flex: 2,
                   padding: "1.5rem", // Add padding for better spacing
                 }}
               >
                 <h5 className="card-title" style={{ fontWeight: "bold" }}>
                   {hotel.name}
                 </h5>
                 <p className="card-text" style={{ color: "#777" }}>
                   {hotel.address}
                 </p>
                 <ul className="list-group list-group-flush">
                   <li className="list-group-item">
                     <strong>Email:</strong> {hotel.email}
                   </li>
                   <li className="list-group-item">
                     <strong>Phone:</strong> {hotel.phone}
                   </li>
                 </ul>
                 <button
                   type="button"
                   className="btn btn-primary"
                   onClick={() => navigateToBookRooms(hotel.id)}
                 >
                   Book Rooms
                 </button>
                 &nbsp; &nbsp;&nbsp;
                 
               </div>
             </div>
           </div>
         ))}
       </div>
     )}
     
      <NavbarComponent/>
   </div>
    </div>
    
  );
}

export default Hotels;
