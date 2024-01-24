
import { useSearchParams } from "react-router-dom";
import NavbarTop1 from "./nav1";
import Login from "../login";
import AddExecutive from "./add_executive";
import AllExecutives from "./view_executives";
import AddLocation from "./add_location";
import AddHotel from "./add_hotel";
import AllLocations from "./view_locations";
import ViewHotels from "./view_hotels";

function HrDashboard(){
    const [param] = useSearchParams();
    const process = () => {
        if (!param.get("page")) {
          return (
            <div style={{
              backgroundImage: 'url("/hotel.png")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
             
            </div>
          );
        }
          if (param.get("page") === "add_executive") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/hr/dashboard?page=add_executive");
              return (
                <div>
                  <Login />
                </div>
              );
            }
            
            return (
              <div  style={{
                backgroundImage: 'url("/pattern.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
               <AddExecutive/>
              </div>
            );
          }
          if (param.get("page") === "view_executives") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/hr/dashboard?page=view_executives");
              return (
                <div>
                  <Login />
                </div>
              );
            }
            
            return (
              <div  style={{
                backgroundImage: 'url("/pattern.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
             >
               <AllExecutives/>
              </div>
            );
          }

          
          if (param.get("page") === "add_location") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/hr/dashboard?page=add_location");
              return (
                <div >
                  <Login />
                </div>
              );
            }
            
            return (
              <div style={{
                backgroundImage: 'url("/pattern1.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
               <AddLocation/>
              </div>
            );
          }
          if (param.get("page") === "view_locations") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/hr/dashboard?page=view_locations");
              return (
                <div>
                  <Login />
                </div>
              );
            }
            
            return (
              <div style={{
                backgroundImage: 'url("/pattern1.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }} >
               <AllLocations/>
              </div>
            );
          }

          if (!param.get("page")) {
            return (
              <div>
               
              </div>
            );
          }
          if (param.get("page") === "add_hotel") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/hr/dashboard?page=add_hotel");
              return (
                <div>
                  <Login />
                </div>
              );
            }
            
            return (
              <div style={{
                backgroundImage: 'url("/pattern2.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
                <AddHotel/>
              </div>
            );
          }

          if (param.get("page") === "view_hotels") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/hr/dashboard?page=view_hotels");
              return (
                <div>
                  <Login />
                </div>
              );
            }
            
            return (
              <div style={{
                backgroundImage: 'url("/pattern2.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
               <ViewHotels/>
              </div>
            );
          }
      };
    return(
      <div 
      
    >
        <div  >
        <NavbarTop1 />
        {process()}
      
      
      </div>
      </div>
      
      
      
    )
}
export default HrDashboard;