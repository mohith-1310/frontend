import axios from "axios";
import { useEffect, useState } from "react";

function ViewBookings() {

  const [admin, setAdmin] = useState({});
  const [hotel, setHotel] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAdminId = localStorage.getItem("id");

        if (storedAdminId) {
          const adminId = parseInt(storedAdminId, 10);

          const response = await axios.get(
            `http://localhost:8088/feelhome/hoteladmin/getone/${adminId}`
          );
          const adminDetails = response.data;

          console.log(adminDetails);
          setAdmin(adminDetails);

          const result = await axios.get(
            `http://localhost:8088/feelhome/hotel/getbyadmin/${adminDetails.id}`
          );
          const jsonData1 = result.data;

          setHotel(jsonData1);
          console.log(jsonData1);

          const result1 = await axios.get(
            `http://localhost:8088/feelhome/hotel/booking/getall/${hotel.id}`
          );
          const jsonData2 = result1.data;

          setBookingData(jsonData2);
          console.log(jsonData2);



        } else {
          console.error("Executive ID not found in local storage.");
          setMsg("Executive ID not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();





    
  }, []);
 
  return (
    <div >
      hello
    </div>
  );
}

export default ViewBookings;
