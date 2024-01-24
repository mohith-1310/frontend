import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import NavbarTop from "./components/nav1";
import { Card, Form } from "react-bootstrap";

function BookRooms() {
  const [customer, setCustomer] = useState({});
  const [room, setRoom] = useState([]);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState({});
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noOfAdults, setNoOfAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCustomerId = localStorage.getItem('id');

        if (storedCustomerId) {
          const customerId = parseInt(storedCustomerId, 10);

          const response = await axios.get(`http://localhost:8088/feelhome/customer/get/${customerId}`);
          const customerDetails = response.data;

          console.log(customerDetails);
          setCustomer(customerDetails);

          

          const response1 = await axios.get(`http://localhost:8088/feelhome/rooms/getByHotel/${hotelId}`);
          const roomDetails = response1.data;

          console.log(roomDetails);
          setRoom(roomDetails);

        } else {
          console.error('Customer ID not found in local storage.');
          setMsg("Customer ID not found");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [hotelId]);

  const handleBooking = async () => {
    try {
      // Construct the booking object
      const bookObj = {
        "check_in": checkIn,
        "check_out": checkOut,
        "noOfAdults": noOfAdults,
        "noOfChildren": noOfChildren
      };

      const response = await axios.post(`http://localhost:8088/feelhome/book/${customer.id}/${selectedRoom}/${hotelId}`, bookObj);
      const updatedBookingDetails = response.data;

      // Update the state with the new data
      setBooking(updatedBookingDetails);

      // Navigate and set success message
      console.log(booking);
      setMsg('Insertion success');
      navigate('/feelhome/customer/dashboard?page=bookings')
      
    } catch (error) {
      // Handle errors and set an error message
      console.error('Error adding booking:', error);
      setMsg('Issue in adding booking');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleBooking(); // Call your booking function
  };

  return (
    <div>
    <NavbarTop />

    <div className="d-flex">
      {/* Card 1 */}
      <Card className="mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)', width: '700px', marginLeft: '0' }}>
        <Card.Header style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
          <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Booking Details</h3>
        </Card.Header>
        <Card.Body>
          <div>
            <Form.Group controlId="formRoom">
              <Form.Label>Select a Room:</Form.Label>
              <Form.Control as="select" onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="" disabled>Select a room</option>
                {room.map((roomItem) => (
                  <option key={roomItem.id} value={roomItem.id}>
                    {roomItem.room_type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCheckIn">
              <Form.Label>Check-in:</Form.Label>
              <Form.Control
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCheckOut">
              <Form.Label>Check-out:</Form.Label>
              <Form.Control
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <Form.Group controlId="formAdultsChildren" className="d-flex justify-content-center">
                {/* ... (rest of your form code) */}
              </Form.Group>
            </Form.Group>
          </div>
        </Card.Body>
        <Card.Footer>
          <button className="btn btn-primary" onClick={()=>handleBooking()}>Book Room</button>
        </Card.Footer>
      </Card>

      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

      {/* Card 2 */}
      <Card className="mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)', width: '700px', marginRight: '0' }}>
        <Card.Header style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>Check Given Inputs</Card.Header>
        {selectedRoom && (
          <div>
            <Card.Body>
              <h2>Booking Details</h2>
              <p>Check-in: {checkIn}</p>
              <p>Check-out: {checkOut}</p>
              <p>Adults: {noOfAdults}</p>
              <p>Children: {noOfChildren}</p>
            </Card.Body>
          </div>
        )}
      </Card>
    </div>
  </div>
  );
}

export default BookRooms;