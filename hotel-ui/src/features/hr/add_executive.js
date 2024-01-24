import axios from "axios";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";

function AddExecutive(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [executive,setExecutive]=useState({});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const addExecutive = () => {
        let executiveObj={
            "name":name,
            "email":email,
            "user":{
            "username":username,
            "password":password
            }
        }
        //console.log(JSON.stringify(customerObj))
        axios.post('http://localhost:8088/feelhome/add',executiveObj)
        .then(response=>{
            setExecutive(response.data)
            navigate('/feelhome/hr/dashboard')
            setMsg("insertion success")
            
        })
        .catch(function (error){
            setMsg("Issue in adding executive")
        });
      }
    return(
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)' }}>
            <div className="card-header" style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
              <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Add Executive</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Enter Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    style={{ width: '60%', textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}
                    onKeyUp={(e) => { setName(e.target.value) }}
                  />
                </div>
                <div className="form-group">
                  <label>Enter Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    style={{ width: '60%', textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}
                    onKeyUp={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="form-group">
                  <label>Enter Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    style={{ width: '60%', textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}
                    onKeyUp={(e) => { setUsername(e.target.value) }}
                  />
                </div>
                <div className="form-group">
                  <label>Enter Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    style={{ width: '60%', textAlign: 'left', marginLeft: '20%', marginRight: '20%' }}
                    onKeyUp={(e) => { setPassword(e.target.value) }}
                  />
                </div>
                <div className="card-footer" style={{ textAlign: 'center', borderTop: '1px solid #dee2e6' }}>
                  <button type="submit" className="btn btn-info btn-sm ml-4" onClick={() => addExecutive()} style={{ fontWeight: 'bold' }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>)
}

export default AddExecutive;