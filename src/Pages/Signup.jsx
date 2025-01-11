import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Form.css";
import { useSignUpEmailPassword } from "@nhost/react";
import Spinner from "../components/Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const {
    signUpEmailPassword,
    needsEmailVerification,
    isLoading,
    isSuccess,
    isError,
    error,
    watchEffect,
  } = useSignUpEmailPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(formData.email);

    await signUpEmailPassword({
      email: "formData.email",
      password: formData.password,
      user: {
        displayName: `${formData.firstname} ${formData.lastname}`,
        metadata: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
      },
    });

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
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
            <h2>Create your account</h2>
            <p>Welcome! Please fill in the details to get started.</p>
          </div>

          {needsEmailVerification ? (
            <p>
              Please check your email to verify your account. If you
              haven&apos;t received the verification email, please check your
              spam folder.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="name-inputs">
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    disabled={disableForm}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    disabled={disableForm}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={disableForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  disabled={disableForm}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={disableForm}
              >
                {isLoading ? <Spinner /> : <span>Sign Up</span>}
              </button>
              {isError && <div className="error-message">{error.message}</div>}
              {console.log(error)}
            </form>
          )}
        </div>

        <div className="form-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
