import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import "./login.css";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src="logo.png" alt="" />
        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
