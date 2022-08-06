import { useAuth } from "Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";

function Header() {
  const { userCookie } = useAuth();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ display: "flex", paddingRight: 0, margin: 0 }}
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/home">HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              href="/profile"
              style={{ display: "flex", color: "whitesmoke", marginRight: 0, alignItems: "center" }}
            >
              <Typography>
                {userCookie.user.firstName} {userCookie.user.lastName}
              </Typography>
              <AccountCircleIcon style={{ marginLeft: 12 }} fontSize="large" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
