import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      const res = await axios.post("/login", { ...login });

      if (res.data.EnterAllDetails) {
        setErrorMessage(res.data.EnterAllDetails);
      } else if (res.data.NotExist) {
        setErrorMessage(res.data.NotExist);
      } else if (res.data.Incorrect) {
        setErrorMessage(res.data.Incorrect);
      } else {
        const userId = res.data._id; 
        navigate(`/home/${userId}`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.inputContainer1}>
          <i className={`fas fa-envelope ${styles.icon}`}></i> {/* Email Icon */}
          <input 
            autoFocus 
            autoComplete="off"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={login.email}
            className={styles.input}
          />
          <span className={styles.underline}></span>
        </div>

        <div className={styles.inputContainer2}>
          <i className={`fas fa-lock ${styles.icon}`}></i> {/* Lock Icon */}
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password types
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={login.password}
            className={styles.input}
          />          <span className={styles.underline}></span>

          {/* Eye Icon for showing/hiding password */}
          <i 
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`} 
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        <p className={styles.resetPassword}>
          <Link to="/reset" className={styles.link}>Forgot password?</Link>
        </p>

        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
