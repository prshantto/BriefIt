import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "../atom";
import "./Form.css";
import { useSignInEmailPassword } from "@nhost/react";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const setIsLoggedin = useSetRecoilState(isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    signInEmailPassword,
    needsEmailVerification,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInEmailPassword({
      email,
      password,
    });
    console.log({ email, password });
    setIsLoggedin(true);
    setEmail("");
    setPassword("");
  };

  if (isSuccess) {
    navigate("/");
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div className="auth-container">
      <div className="header">
        <Header
          title="BriefIt"
          subtitle="Get concise summaries of YouTube videos in seconds"
        />
      </div>

      <div className="form-container">
        <div className="form-content">
          <div className="form-title">
            <h2>Sign in to BriefIt</h2>
            <p>Welcome back! Please sign in to continue</p>
          </div>

          {needsEmailVerification ? (
            <div className="error-message">
              Please verify your email before logging in.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                {isLoading ? <Spinner /> : "Sign In"}
              </button>

              {isError && <div className="error-message">{error.message}</div>}
              {console.log(error)}
            </form>
          )}
        </div>

        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign-up here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
