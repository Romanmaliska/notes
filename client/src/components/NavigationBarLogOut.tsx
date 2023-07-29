import { Button } from "react-bootstrap";

type NavigationBarLogOutProps = {
  onSignUpClick: () => void;
  onLoginClick: () => void;
};

export default function NavigationBarLogOut({
  onSignUpClick,
  onLoginClick,
}: NavigationBarLogOutProps) {
  return (
    <>
      <Button onClick={onSignUpClick}>Sign Up</Button>
      <Button onClick={onLoginClick}>Log In</Button>
    </>
  );
}
