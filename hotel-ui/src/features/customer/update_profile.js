import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavbarTop from "./components/nav1";
import { Col, Form } from "react-bootstrap";

function UpdateProfile(){

    const [customer, setCustomer] = useState(0);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [idproof, setIdproof] = useState("");
    const [customerInfo,setCustomerInfo]=useState({});

    useEffect(() => {
        const storedCustomerId = localStorage.getItem('id');
    
        if (storedCustomerId) {
          const customerId = parseInt(storedCustomerId, 10);
    
          axios.get(`http://localhost:8088/feelhome/customer/get/${customerId}`)
            .then(response => {
              const customerDetails = response.data;
              setCustomer(customerDetails);
            })
            .catch(error => {
              console.error('Error fetching customer:', error);
              setMsg("Error fetching customer");
            });
        } else {
          console.error('Customer ID not found in local storage.');
          setMsg("Customer ID not found");
        }
      }, []);

     

      const handleCustomerUpdate = () =>{
        let customerObj = {
            "name":name,
            "phone":contact,
            "dateOfBirth":dob,
            "age":age,
            "gender":gender,
            "email":email,
            "idProof":idproof,
          };

    axios
      .put(`http://localhost:8088/feelhome/customer/update/${customer.id}`, customerObj)
      .then((response) => {
        const updatedCustomerDetails = response.data;

        // Update the state with the new data
        setCustomerInfo(updatedCustomerDetails);

        // Navigate and set success message
       
        setMsg('Updation success');
      })
      .catch((error) => {
        // Handle errors and set an error message
        console.error('Error updating Customer:', error);
        setMsg('Issue in updating customer');
      });
      
      }
    
    return(
        <div>
            <NavbarTop/>
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
    
                      {/* Read Contact */}
                      <div className="col-md-6">
                        <label>Enter Contact No:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
    
                      {/* Read DOB */}
                      <div className="col-md-6">
                        <label>Enter Date of Birth:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
    
                      {/* Read age */}
                      <div className="col-md-6">
                        <label>Enter Age:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
    
                      {/* Read gender */}
                      <Form.Group className="row " controlId="formGender">
                    <Form.Label className="col-md-6">
                      Enter Gender:
                    </Form.Label>
                    <Col sm="6">
                      <Form.Check
                        inline
                        type="radio"
                        label="Male"
                        name="gender"
                        value="MALE"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Female"
                        name="gender"
                        value="FEMALE"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Other"
                        name="gender"
                        value="OTHER"
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
    
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
                      {/* Read id proof */}
                      <div className="col-md-6">
                        <label>Enter ID Proof:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setIdproof(e.target.value)}
                        />
                      </div>     
                    </div>
              </div>
              <div className="card-footer" style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={() => handleCustomerUpdate()}>
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

export default UpdateProfile;
