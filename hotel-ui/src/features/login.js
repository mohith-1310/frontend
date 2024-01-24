import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {  useSearchParams } from "react-router-dom";

function Login(){
    const [param] = useSearchParams();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState(param.get('msg'));
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    //jsdhfjshfdjhf434jhjhjh = harry@gmail.com:potter@123
    const doLogin=()=>{
        let token = window.btoa(username + ':' + password);
        //console.log(token);
        axios.post('http://localhost:8088/auth/login',{},{
          headers:{
            'Authorization':'Basic ' + token
          }
        })
        .then(function (response) {
          // handle success
          localStorage.setItem('username',username)
          localStorage.setItem('token',token)
          localStorage.setItem('id',response.data.id)
          localStorage.setItem('isLoggedIn',true)
          let role = response.data.role;

          switch(role){
            case 'CUSTOMER':
              navigate('/feelhome/customer/dashboard')
              break; 
            case 'HR':
              navigate('/feelhome/hr/dashboard')
              break;
            case 'EXECUTIVE':
              navigate('/feelhome/executive/dashboard')
              break;
            case 'HOTEL_ADMIN':
              navigate('/feelhome/admin/dashboard')
              break;
            default: 
              
          }
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          setMsg('Invalid Credentials')
        });
         
    }
    return (
      <div className="container mt-4" >
         
          <div className="row" >
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <div className="card mt-5" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.5,0.5,0,0.5)' }}>
  <div className="card-header" style={{ borderBottom: '2px solid #007BFF', padding: '10px 0', textAlign: 'center' }}>
    <h3 style={{ margin: '0', fontWeight: 'bold', color: 'black' }}>Login</h3>
  </div>
  <div className="card-body">
    {msg !== null ? (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    ) : (
      ''
    )}
    <div className="row" style={{ textAlign: 'right' }}>
      <div className="col-md-6">
        <label style={{ fontWeight: 'bold' }}>Enter Email/Username:</label>
      </div>
      <div className="col-md-6 mb-4">
      <Input placeholder="Enter Username"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      onChange={(e) => setUsername(e.target.value)}
       />
      </div>
    </div>
    <div className="row" style={{ textAlign: 'right' }}>
      <div className="col-md-6">
        <label style={{ fontWeight: 'bold' }}>Enter Password:</label>
      </div>
      <div className="col-md-6">
      <Input.Password
        placeholder="input password"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        onChange={(e) => setPassword(e.target.value)}
      />
        
      </div>
    </div>
  </div>
  <div className="card-footer" style={{ textAlign: 'center', borderTop: '1px solid #dee2e6' }}>
    <button className="btn btn-primary" onClick={() => doLogin()}>
      Login
    </button>
  </div>
</div>


              <div style={{textAlign: "center"}} className="mt-4">
                  <span>Don't have an Account 
                    <button className="button_link" style={{ margin: '0 auto' }}
                        onClick={()=>navigate("/feelhome/auth/signup")}>Sign Up</button>
                    </span>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        
      </div>
    ); 
}

export default Login;