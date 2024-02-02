import axios from "axios";
import { useState } from "react";
import { Col, Container, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function SignUp(){
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [idproof, setIdproof] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [customer,setCustomer]=useState({});
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    
    const doSignUp = () => {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg('Please enter a valid email address.');
      return;
    }

    // Simple password validation (at least 6 characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMsg('Password must meet the criteria: at least 8 characters, one uppercase, one lowercase, one special character.');
      return;
    }
        let customerObj={
            "name":name,
            "phone":contact,
            "dateOfBirth":dob,
            "age":age,
            "gender":gender,
            "email":email,
            "idProof":idproof,
            "user":{
            "username":username,
            "password":password
            }
        }
        //console.log(JSON.stringify(customerObj))
        axios.post('http://localhost:8088/feelhome/customer/add',customerObj)
        .then(response=>{
            setCustomer(response.data)
            setMsg('signup success')
            
        })
        .catch(function (error){
            setMsg("Issue in processing sign up")
        });
      }
      return (
       <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Feel Home</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
              {msg !== "" && (
                  <div
                    className={`alert ${msg === "signup success" ? "alert-success" : "alert-danger"}`}
                    role="alert"
                  >
                    {msg}
                  </div>
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
                      <hr />
                      <div className="col-md-6">
                        <label>Enter Email/Username:</label>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          type="email"
                          className="form-control"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ textAlign: "right" }}>
                      <div className="col-md-6">
                        <label>Enter Password:</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="password"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
              </div>
              <div className="card-footer" style={{ textAlign: "center" }}>
                <button className="btn btn-primary" onClick={() => doSignUp()}>
                  SignUp
                </button>
              </div>
            </div>
            <div style={{ textAlign: "center" }} className="mt-4">
              <span style={{ fontWeight: "bold" }}>
                Have an Account?
                <button
                  className="button_link"
                  onClick={() => navigate("/feelhome/auth/login")}
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
}
export default SignUp;