import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import NavigationBar from "./components/NavigationBar";
import PageLogIn from "./components/PageLogIn";
import SignUpModal from "./components/SignUpModal";
import * as UsersApi from "./network/usersApi";
import "./styles/global.css";
import { User } from "./types";
import PageLogOut from "./components/PageLogOut";

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
      <Container>{loggedInUser ? <PageLogIn /> : <PageLogOut />}</Container>
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
