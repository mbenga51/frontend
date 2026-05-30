import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/login.css";
import api from "../api/axios";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
const handleSubmit = async (values) => {
  try {

    const response = await api.post("/users/login", {
      email: values.email,
      password: values.password,
    });

    console.log(response.data);

    // =========================
    // SAVE AUTH DATA
    // =========================

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    localStorage.setItem("isAuthenticated", "true");

    // =========================
    // CLEAR ERROR
    // =========================

    setError(null);

    // =========================
    // SUCCESS MESSAGE
    // =========================

    alert(response.data.message);

    // =========================
    // REDIRECT
    // =========================

    navigate("/dashboard");

  } catch (error) {

    console.error("Login failed:", error);

    setError(
      error.response?.data?.message ||
      "An error occurred during login."
    );
  }
};

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Left Side */}
        <div className="login-info">
          
          <h1>Inventory Management System</h1>

          <p className="main-text">
            A web-based inventory management system built for small and medium
            enterprises in The Gambia to manage products, track stock movement,
            monitor inventory levels, and improve business operations efficiently.
          </p>

          <div className="features">
            <div className="feature">
              <CheckCircle2 />
              <span>Real-time stock monitoring</span>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <span>Stock in / Stock out management</span>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <span>Generate inventory reports</span>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <span>Secure user authentication</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-card">
          <div className="card-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to continue</p>
          </div>
              {error && <div className="error serverError">{error}</div>}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="input-group">
                <label>Email Address</label>

                <Field
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
              </div>

              <div className="input-group">
                <div className="password-top">
                  <label>Password</label>
                  <span className="forgot">Forgot password?</span>
                </div>

                <div className="password-box">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                  />

                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </span>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="remember-box">
                <Field type="checkbox" name="remember" />
                <label>Remember me for 30 days</label>
              </div>

              <button type="submit" className="login-btn">
                Sign In
              </button>

              <div className="signup-link">
                Don't have an account?{" "}
                <Link to="/register">Create an account</Link>
              </div>

          
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;