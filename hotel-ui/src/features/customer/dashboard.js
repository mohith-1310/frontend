import { useNavigate, useSearchParams } from "react-router-dom";
import NavbarTop from "./components/nav1";
import NavbarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import Login from "../login";
import BookingList from "./bookinglist";


function CustomerDashboard(){

    const [param] = useSearchParams();
    const navigate = useNavigate();
    const process = () => {
        if (!param.get("page")) {
          return (
            <div style={{
              backgroundImage: 'url("/background.png")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width:"flex"}}>
             <HomeComponent/>
            </div>
          );
        }
        if (param.get("page") === "bookings") {
          if (localStorage.getItem("isLoggedIn") === null) {
            localStorage.setItem("url", "/feelhome/customer/dashboard?page=bookings");
            return (
              <div>
                <Login />
              </div>
            );
          }
          
          return (
            <div>
             
             <BookingList/>
            </div>
          );
        
    }   
  }                 
    return(
        
        <div>
            
            <NavbarTop/>
            {process()}
            <div><NavbarComponent/></div>
        </div>
       
    )
}
export default CustomerDashboard;