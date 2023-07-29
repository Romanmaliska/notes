import { Container, Navbar } from "react-bootstrap";
import { User } from "../types";
import NavigationBarLogin from "./NavigationBarLogIn";
import NavigationBarLogOut from "./NavigationBarLogOut";

type NavbarProps = {
  loggedInUser: User | null;
  onSignUpClick: () => void;
  onLoginClick: () => void;
  onLogoutSuccesful: () => void;
};

export default function NavigationBar({
  loggedInUser,
  onSignUpClick,
  onLoginClick,
  onLogoutSuccesful,
}: NavbarProps) {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <nav className="ms-auto">
            {loggedInUser ? (
              <NavigationBarLogin
                loggedInUser={loggedInUser}
                onLogoutSuccesful={onLogoutSuccesful}
              />
            ) : (
              <NavigationBarLogOut
                onSignUpClick={onSignUpClick}
                onLoginClick={onLoginClick}
              />
            )}
          </nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
