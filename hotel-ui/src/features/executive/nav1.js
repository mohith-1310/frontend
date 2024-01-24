import React from "react";
import { Button, ButtonGroup, Card, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function NavbarTop2() {

  const navigate = useNavigate();
  return (
    <div>
    <Navbar bg="light" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate("/feelhome/hr/dashboard")}>
          FeelHome
        </Navbar.Brand>
        &nbsp; &nbsp; &nbsp;
        <Nav className="me-auto mr-4">
          <Dropdown as={ButtonGroup}>
            <Button variant="secondary">Admin</Button>

            <Dropdown.Toggle
              split
              variant="secondary"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/feelhome/executive/dashboard?page=add_admin")}>
                Add Admin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/feelhome/executive/dashboard?page=view_admins")}>
                View Admins
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

        </Nav>
        <Navbar.Collapse className="justify-content-end">

        <i className="pi pi-user" style={{ color: 'whitesmoke' }}  onClick={() => navigate("/feelhome/executive/profile")}></i>
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

export default NavbarTop2;
