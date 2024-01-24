import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function ProfileExec() {
  const [executive, setExecutive] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedExecutiveId = localStorage.getItem('id');

    if (storedExecutiveId) {
      const executiveId = parseInt(storedExecutiveId, 10);

      axios.get(`http://localhost:8088/feelhome/executive/get/${executiveId}`)
        .then(response => {
          const executiveDetails = response.data;
          setExecutive(executiveDetails);
        })
        .catch(error => {
          console.error('Error fetching executive:', error);
          setMsg("Error fetching executive");
        });
    } else {
      console.error('Executive ID not found in local storage.');
      setMsg("Executive ID not found");
    }
  }, []);

  console.log(executive);


  return (
    <div className="container mt-4">
  <div className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
      <div className="card mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)' }}>
        <div className="card-header" style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
          <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Executive Profile</h3>
        </div>
        <div className="card-body">
          {executive ? (
            <div>
              <h4 style={{ fontWeight: 'bold' }}>Name:</h4>
              <p>{executive.name}</p>
              <h4 style={{ fontWeight: 'bold' }}>Email:</h4>
              <p>{executive.email}</p>
              {/* Add more details as needed */}
            </div>
          ) : (
            <p>{msg}</p>
          )}
        </div>
        <div className="card-footer" style={{ textAlign: 'center', borderTop: '1px solid #dee2e6' }}>
          <button className="btn btn-primary" onClick={() => navigate('/feelhome/executive/profile/update')}>
            Update
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-3"></div>
  </div>
</div>

  );
}

export default ProfileExec;
