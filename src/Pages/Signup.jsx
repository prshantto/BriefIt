import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Form.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
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
            <h2>Create your account</h2>
            <p>Welcome! Please fill in the details to get started.</p>
          </div>

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
              />
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            {errors.error && (
              <div className="error-message">{errors.error}</div>
            )}
          </form>
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// import "./Form.css";
// import { Header } from "../components/Header";

// const Signup = () => {
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const navigate = useNavigate();

//   const handeleSubmit = (e) => {
//     e.preventDefault();
//     const user = {
//       firstname,
//       lastname,
//       email,
//       password,
//     };
//     console.log(user);
//     // axios
//     //   .post(`${import.meta.env.VITE_API_URL}/api/users/register`, user)
//     //   .then((res) => {
//     //     console.log(res);
//     //     if (res.status === 201) {
//     //       navigate("/login");
//     //     }
//     //   })
//     //   .catch((err) => {
//     //     const errorMessage =
//     //       err.response?.data?.errors?.[0]?.msg ||
//     //       err.response?.data?.message ||
//     //       "Could not register";
//     //     console.log(err);
//     //     setErrors({ error: errorMessage });
//     //   });
//     setFirstname("");
//     setLastname("");
//     setEmail("");
//     setPassword("");
//   };
//   return (
//     <div className="body">
//       <div className="mt-2">
//         <Header
//           title="BriefIt"
//           subtitle="Get concise summaries of YouTube videos in seconds"
//         />
//       </div>

//       <div className="container">
//         <div className="form-header">
//           <h2>
//             Create your account
//             <p className="welcome-message text-sm">
//               Welcome! Please fill in the details to get started.
//             </p>
//           </h2>

//           <form onSubmit={handeleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <div className="name-inputs">
//                 <input
//                   value={firstname}
//                   onChange={(e) => setFirstname(e.target.value)}
//                   type="text"
//                   id="firstname"
//                   name="firstname"
//                   placeholder="First Name"
//                   required
//                 />
//                 <input
//                   value={lastname}
//                   onChange={(e) => setLastname(e.target.value)}
//                   type="text"
//                   id="lastname"
//                   name="lastname"
//                   placeholder="Last Name"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Create a password"
//                 required
//               />
//             </div>

//             <button type="submit" className="btn">
//               Sign Up
//             </button>

//             {Object.keys(errors).length > 0 ? (
//               <div className="error-message">{errors.error}</div>
//             ) : null}
//           </form>
//         </div>
//         <div className="form-footer">
//           <p>
//             Already have an account?{" "}
//             <span className="link" onClick={() => navigate("/login")}>
//               Login here
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
