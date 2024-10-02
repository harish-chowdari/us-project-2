import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PasswordReset.module.css"; // Reuse styles from Login.module.css
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

const PasswordReset = () => {
  const [login, setLogin] = useState({ email: "", otp: "", newPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isOTPSent) {
      try {
        const res = await axios.post("/send-otp", { email: login.email });

        if (res.data.emailRequire) {
          setErrorMessage("Please enter your email address.");
        } else if (res.data.userNotExist) {
          setErrorMessage("No account found with this email address.");
        } else if (res.data.msg === "OTP sent successfully") {
          alert("OTP has been sent to your email. Please check your inbox.");
          setIsOTPSent(true);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    } else {
      try {
        const res = await axios.post("/update-password", {
          email: login.email,
          otp: login.otp,
          newPassword: login.newPassword,
        });

        if (res.data.otpNotValid) {
          setErrorMessage("Invalid OTP. Please try again.");
        } else if (res.data.otpExpired) {
          setErrorMessage("OTP has expired. Please request a new one.");
        } else if (res.data.updatedPassword) {
          alert("Password updated successfully! You can now log in.");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("An error occurred while updating the password.");
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Password Reset</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.inputContainer1}>
          <i className={`fas fa-envelope ${styles.icon}`}></i>
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

        {isOTPSent && (
          <>
            <div className={styles.inputContainer2}>
              <i className={`fas fa-lock ${styles.icon}`}></i>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
                value={login.otp}
                className={styles.input}
                
              />
              <span className={styles.underline}></span>
            </div>

            <div className={styles.inputContainer2}>
              <i className={`fas fa-lock ${styles.icon}`}></i>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
                value={login.newPassword}
                className={styles.input}
                
              />
              <span className={styles.underline}></span>

              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </>
        )}

        <button type="submit" className={styles.button}>
          {isOTPSent ? "Reset Password" : "Send OTP"}
        </button>

        <p className={styles.text}>
          Remember your password?{" "}
          <Link to="/" className={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default PasswordReset;
