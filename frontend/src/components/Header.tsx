import { NavLink, useParams } from "react-router-dom";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "../styles/Header.css";
import { conditionalDisplay } from "./ConditionalDisplay";

const Header = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const { id } = useParams();

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            HOME
          </Nav.Link>
          <Nav.Link to="/categories" as={NavLink}>
            LIST BY CATEGORY
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            ABOUT
          </Nav.Link>
          {!conditionalDisplay() ? (
            <>
              <Nav.Link to="/signup" as={NavLink}>
                SIGN UP
              </Nav.Link>
              <Nav.Link to="/login" as={NavLink}>
                LOGIN
              </Nav.Link>
            </>
          ) : (
            <p></p>
          )}
          {conditionalDisplay() ? (
            <Nav.Link to={`/user/${id}`} as={NavLink}>
              PROFILE
            </Nav.Link>
          ) : (
            <p></p>
          )}
        </Nav>
        <Button onClick={openCart} style={{ width: "3rem", height: "3rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          {cartQuantity > 0 && (
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(0%, 0%",
              }}
            >
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </NavbarBs>
  );
};

export default Header;
