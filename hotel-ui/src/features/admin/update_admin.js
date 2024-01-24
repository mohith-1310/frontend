import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Form } from "react-bootstrap";
import NavbarTop2 from "./nav1";


function UpdateAdmin(){

    const [admin, setAdmin] = useState(0);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [adminInfo,setAdminInfo]=useState({});

    useEffect(() => {
        const storedAdminId = localStorage.getItem('id');
    
        if (storedAdminId) {
          const adminId = parseInt(storedAdminId, 10);
    
          axios.get(`http://localhost:8088/feelhome/hoteladmin/getone/${adminId}`)
            .then(response => {
              const adminDetails = response.data;
              setAdmin(adminDetails);
            })
            .catch(error => {
              console.error('Error fetching admin:', error);
              setMsg("Error fetching admin");
            });
        } else {
          console.error('Admin ID not found in local storage.');
          setMsg("Admin ID not found");
        }
      }, []);

     

      const handleAdminUpdate = () =>{
        let admObj = {
            "name":name,
            "email":email,
            
          };

    axios
      .put(`http://localhost:8088/feelhome/updatehoteladmin/${admin.id}`, admObj)
      .then((response) => {
        const updatedAdminDetails = response.data;

        // Update the state with the new data
        setAdminInfo(updatedAdminDetails);

        // Navigate and set success message
       
        setMsg('Updation success');
      })
      .catch((error) => {
        // Handle errors and set an error message
        console.error('Error updating Executive:', error);
        setMsg('Issue in updating executive');
      });
      
      }
    
    return(
        <div>
            <NavbarTop2/>
            <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3> Update Details</h3>
              </div>
              <div className="card-body">
                {msg !== "" ? (
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                ) : (
                  ""
                )}
                <div className="row " style={{ textAlign: "right" }}>
                      {/* Read Name */}
                      <div className="col-md-6">
                        <label>Enter Name:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
    
                      
                      {/* Read email */}
                      <div className="col-md-6">
                        <label>Enter Email:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="email"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>     
                    </div>
              </div>
              <div className="card-footer" style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={() => handleAdminUpdate()}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
            
        </div>
    );
}

export default UpdateAdmin;
