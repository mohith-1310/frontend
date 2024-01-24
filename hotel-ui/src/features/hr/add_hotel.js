import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AddHotel() {
  const [locations, setLocations] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [hotelDetails, setHotelDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseLocations = await axios.get(`http://localhost:8088/feelhome/location/getall`);
        setLocations(responseLocations.data);

        const responseAdmins = await axios.get(`http://localhost:8088/feelhome/admin/getall`);
        setAdmins(responseAdmins.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDetails();
   
    
  }, []);

  const handleAddHotel = () => {
    // Validate form data
    if (!name || !selectedLocation || !selectedAdmin) {
      setMsg('Please fill in all fields.');
      return;
    }

    // Construct the hotel object
    const hotelObj = {
      name: name,
      address:address,
      email:email,
      phone:phone,

    };

    axios
      .post(`http://localhost:8088/feelhome/hotel/add/${selectedAdmin}/${selectedLocation}`, hotelObj)
      .then((response) => {
        const updatedHotelDetails = response.data;

        // Update the state with the new data
        setHotelDetails(updatedHotelDetails);

        // Navigate and set success message
        navigate('/feelhome/hr/dashboard');
        setMsg('Insertion success');
      })
      .catch((error) => {
        // Handle errors and set an error message
        console.error('Error adding hotel:', error);
        setMsg('Issue in adding hotel');
      });
  };

  return (
    <div className="container mt-4">
  <div className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
      <div className="card mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)' }}>
        <div className="card-header" style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
          <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Add Hotel</h3>
        </div>
        <div className="card-body">
          <form>
            <label>Hotel Name:</label>
            <input
              
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              style={{
                width: '60%',
                textAlign: 'left',
                marginLeft: '20%',
                marginRight: '20%',
              }}
            />
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Address"
              style={{
                width: '60%',
                textAlign: 'left',
                marginLeft: '20%',
                marginRight: '20%',
              }}
              onChange={(e) => setAddress(e.target.value)}
             
            />
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Email"
              style={{
                width: '60%',
                textAlign: 'left',
                marginLeft: '20%',
                marginRight: '20%',
              }}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <label>Phone:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Phone"
              style={{
                width: '60%',
                textAlign: 'left',
                marginLeft: '20%',
                marginRight: '20%',
              }}
              onChange={(e) => setPhone(e.target.value)}
              
            />
            <label>Select Location:</label>
            <select
              style={{
                width: '60%',
                textAlign: 'left',
                marginLeft: '20%',
                marginRight: '20%',
              }}
              onChange={(e) => setSelectedLocation(e.target.value)}
              
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <label>Select Admin:</label>
            <select
              style={{
                width: '60%',
                textAlign: 'left',
                marginLeft: '20%',
                marginRight: '20%',
              }}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              
            >
              <option value="">Select Admin</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className="card-footer" style={{ textAlign: 'center', borderTop: '1px solid #dee2e6' }}>
          <button className="btn btn-primary" onClick={handleAddHotel}>
            Add Hotel
          </button>
        </div>
        {msg && <div className="message">{msg}</div>}
      </div>
    </div>
    <div className="col-md-3"></div>
  </div>
</div>

  );
}

export default AddHotel;
