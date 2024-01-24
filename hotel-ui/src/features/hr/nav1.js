import React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Nav,
  Navbar
} from "react-bootstrap";
import { useNavigate } from "react-router";

function NavbarTop1() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar bg="light" data-bs-theme="dark" className="bg-body-tertiary" style={{ boxShadow: '0 4px 8px rgba(0,0.5,0,0.8)' }}>
        <Container>
          <Navbar.Brand onClick={() => navigate("/feelhome/hr/dashboard")}>
            FeelHome
          </Navbar.Brand>
          &nbsp; &nbsp; &nbsp;
          <Nav className="me-auto mr-4" >
            <Dropdown as={ButtonGroup}>
              <Button variant="secondary" >Executive</Button>

              <Dropdown.Toggle
                split
                variant="secondary"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/feelhome/hr/dashboard?page=add_executive")} >Add Executive</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/feelhome/hr/dashboard?page=view_executives")}>
                  View Executives
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <Dropdown as={ButtonGroup}>
              <Button variant="secondary">Location</Button>

              <Dropdown.Toggle
                split
                variant="secondary"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/feelhome/hr/dashboard?page=add_location")}>Add Location</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/feelhome/hr/dashboard?page=view_locations")}>
                  View Locations
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <Dropdown as={ButtonGroup}>
              <Button variant="secondary">Hotel</Button>

              <Dropdown.Toggle
                split
                variant="secondary"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/feelhome/hr/dashboard?page=add_hotel")}>Add Hotel</Dropdown.Item>
                
                <Dropdown.Item onClick={() => navigate("/feelhome/hr/dashboard?page=view_hotels")}>
                  View Hotels
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {localStorage.getItem("isLoggedIn") ? (
              <React.Fragment>
                <Navbar.Text>
                  Signed in as:{" "}
                  <span style={{ color: "white" }}>
                    {localStorage.getItem("username")}
                  </span>
                </Navbar.Text>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-info btn-sm ml-4"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/feelhome/auth/login");
                  }}
                >
                  Logout
                </button>
              </React.Fragment>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "1%",
                }}
              >
                {" "}
                <button
                  className="btn btn-info btn-sm ml-4"
                  onClick={() => navigate("/feelhome/auth/login")}
                >
                  Login
                </button>{" "}
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarTop1;
