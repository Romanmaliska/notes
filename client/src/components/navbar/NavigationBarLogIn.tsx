import { Navbar, Button } from "react-bootstrap";
import { User } from "../../types";
import * as UsersApi from "../../network/usersApi";

type NavigationBarLoginProps = {
  loggedInUser: User | null;
  onLogoutSuccesful: () => void;
};

export default function NavigationBarLogin({
  loggedInUser,
  onLogoutSuccesful,
}: NavigationBarLoginProps) {
  const logout = async () => {
    try {
      await UsersApi.logout();
      onLogoutSuccesful();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar.Text className="me-2">
        Signed in as {loggedInUser?.name}
      </Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
}
