import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const AddLocation = () => {
  const [executives, setExecutives] = useState([]);
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');
  const [locationDetails, setLocationDetails] = useState({});
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    // Fetch executives from the server
    const fetchExecutives = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/feelhome/executive/getall`);
        setExecutives(response.data);
        console.log(executives);
      } catch (error) {
        console.error('Error fetching executives:', error); 
      }
    };

    fetchExecutives();
  }, []);
  

  const handleExecutiveChange = (e) => {
    setSelectedExecutive(e.target.value);
  };

  const handleAddLocation = () => {
    let locationObj = {
      name: name,
      pincode: pincode,
    };

    axios
      .post(`http://localhost:8088/feelhome/location/add/${selectedExecutive}`, locationObj)
      
      .then((response) => {
        // Assuming the response contains the updated executive and location details
        const updatedLocationDetails = response.data.location;

        // Update the state with the new data
        setLocationDetails(updatedLocationDetails);

        // Navigate and set success message
        navigate('/feelhome/hr/dashboard');
        setMsg('Insertion success');
      })
      .catch((error) => {
        // Handle errors and set an error message
        console.error('Error adding location:', error);
        setMsg('Issue in adding location');
      });
  };

  return (
    <div className="container mt-4">
  <div className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
      <div className="card mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)' }}>
        <div className="card-header" style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
          <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Add Location</h3>
        </div>
        <div className="card-body">
          <label style={{ fontWeight: 'bold' }} className="mb-3">
            Select Executive:
            <select
              className="form-control mb-2"
              value={selectedExecutive}
              onChange={handleExecutiveChange}
            >
              <option value="">Select an Executive</option>
              {executives.map((executive) => (
                <option key={executive.id} value={executive.id}>
                  {executive.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-group">
            <label
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: '3px',
              }}
            >
              Enter Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              style={{
                width: '80%',
                textAlign: 'left',
                marginLeft: '10%',
                marginRight: '10%',
              }}
              onKeyUp={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                marginBottom: '3px',
              }}
            >
              Enter Pin code
            </label>
            <input
              type="text"
              className="form-control"
              id="pincode"
              placeholder="Enter Pin code"
              style={{
                width: '80%',
                textAlign: 'left',
                marginLeft: '10%',
                marginRight: '10%',
              }}
              onKeyUp={(e) => {
                setPincode(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-info btn-sm ml-4"
            style={{
              fontWeight: 'bold',
            }}
            onClick={() => handleAddLocation()}
          >
            Add Location
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-3"></div>
  </div>
</div>

  );
};

export default AddLocation;
