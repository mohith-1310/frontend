import { useSearchParams } from "react-router-dom";
import Login from "../login";
import NavbarTop2 from "./nav1";
import AddAdmin from "./add_admin";
import ViewAdmins from "./view_admins";

function ExecutiveDashboard(){
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
          if (param.get("page") === "add_admin") {
            if (localStorage.getItem("isLoggedIn") === null) {
              localStorage.setItem("url", "/feelhome/executive/dashboard?page=add_admin");
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
              }}
              >
                <AddAdmin/>
              </div>
            );
          }
      };
      if (param.get("page") === "view_admins") {
        if (localStorage.getItem("isLoggedIn") === null) {
          localStorage.setItem("url", "/feelhome/executive/dashboard?page=view_admins");
          return (
            <div>
              <Login/>
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
            <ViewAdmins/>
          </div>
        );
      }
  
    return(
      <div className="mt-4">
        <NavbarTop2 />
        {process()}
      
      
      </div>
      
      
    )
}
export default ExecutiveDashboard;