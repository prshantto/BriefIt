import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Form.css";
import { useSignInEmailPasswordless } from "@nhost/react";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [Error, setError] = useState(null);

  const { signInEmailPasswordless, error } = useSignInEmailPasswordless();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await signInEmailPasswordless(email, {
      displayName: `${firstname} ${lastname}`,
      metadata: {
        firstname: firstname,
        lastname: lastname,
      },
    });

    if (error) {
      setError(error.message);
      console.error(error);
      return;
    }

    setLoading(false);
    setIsSuccess(true);

    setEmail("");
  };

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
          </div>

          {isSuccess ? (
            <div>
              <p className="text-gray-600">
                <span>Hey! {firstname}</span> Please check your email to verify
                your account. If you haven&apos;t received the verification
                email, please check your spam folder.
              </p>
              <button
                className=" w-full py-2 px-4 mt-8 bg-indigo-600 text-white border-none rounded-md font-bold cursor-pointer transition-colors duration-200 hover:bg-indigo-700"
                onClick={() => navigate("/login")}
              >
                Send Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="name-inputs">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
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

              <button
                onClick={() => setLoading(true)}
                type="submit"
                className="submit-button"
              >
                {loading ? <Spinner /> : "Get Magic Link!"}
              </button>

              {Error && <div className="error-message">{Error}</div>}
            </form>
          )}
        </div>

        <div className="form-footer">
          <p>Welcome back! Please sign in to continue</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
