import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LogoutPage from "./components/LogoutPage";
import LoginPage from "./components/LoginPage";
import LoginModal from "./components/forms/LoginModal";
import NavigationBar from "./components/navbar/NavigationBar";
import SignUpModal from "./components/forms/SignUpModal";
import * as UsersApi from "./network/usersApi";
import "./styles/global.css";
import { User } from "./types";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const loadLoggedInUser = async () => {
      try {
        const loggedInUser = await UsersApi.getLoggedUser();
        setLoggedInUser(loggedInUser);
      } catch (err) {
        console.error(err);
      }
    };
    loadLoggedInUser();
  }, []);

  return (
    <>
      <NavigationBar
        loggedInUser={loggedInUser}
        onLoginClick={() => setShowLoginModal(true)}
        onSignUpClick={() => setShowSignUpModal(true)}
        onLogoutSuccesful={() => setLoggedInUser(null)}
      />
      <Container>{loggedInUser ? <LoginPage /> : <LogoutPage />}</Container>
      {showSignUpModal && (
        <SignUpModal
          onClose={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(loggedInUser) => {
            setLoggedInUser(loggedInUser);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccessful={(loggedInUser) => {
            setLoggedInUser(loggedInUser);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
