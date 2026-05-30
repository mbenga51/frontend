import React, { useState } from "react";
import { Package, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/register.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    businessName: "",
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    businessName: Yup.string().required("Business name is required"),

    businessType: Yup.string().required("Please select business type"),

    fullName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9+\s]+$/, "Invalid phone number")
      .required("Phone number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm your password"),
  });

  const getStrength = (password) => {
    if (!password) return null;
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const handleSubmit = async(values, { resetForm }) => {
    try {
      await api.post("/users/register", {
        fullName: values.fullName,
        businessName: values.businessName,  
        businessType: values.businessType,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });
      serverError("");
        navigate("/");
        alert("Account Created Successfully");
    } catch (error) {
      console.error("Registration failed:", error);
      setServerError(error.response?.data?.message || "An error occurred during registration.");
    }
    console.log(values);
    alert("Account Created Successfully");
    resetForm();
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        {/* Left Side */}
        <div className="register-info">
          

          <h1>Inventory Management System</h1>

          <p className="main-text">
            A web-based inventory management system designed to help businesses
            efficiently manage products, monitor stock levels, track
            transactions, and generate useful inventory reports in real time.
          </p>

          <div className="features">
            <div className="feature">
              <CheckCircle2 />
              <span>Track stock in / stock out transactions</span>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <span>Manage products and categories</span>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <span>Generate inventory reports</span>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <span>Simple dashboard for business owners</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="register-card">
          <div className="card-header">
            <h2>Create Account</h2>
            <p>Fill in your business details</p>
          </div>
          {serverError && <div className="error serverError ">{serverError}</div>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => {
              const strength = getStrength(values.password);

              return (
                <Form>
                  <h3>Business Information</h3>

                  <div className="grid-2">
                    <div className="input-group">
                      <label>Business Name</label>
                      <Field
                        type="text"
                        name="businessName"
                        placeholder="Your business name"
                      />
                      <ErrorMessage
                        name="businessName"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="input-group">
                      <label>Business Type</label>
                      <Field as="select" name="businessType">
                        <option value="">Select type</option>
                        <option value="Retail Shop">Retail Shop</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Wholesale">Wholesale</option>
                      </Field>

                      <ErrorMessage
                        name="businessType"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  <h3>Personal Information</h3>

                  <div className="grid-2">
                    <div className="input-group">
                      <label>Full Name</label>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="input-group">
                      <label>Phone Number</label>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="+220 1234567"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>

                  <h3>Security</h3>

                  <div className="input-group">
                    <label>Password</label>

                    <div className="password-box">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create password"
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

                    {strength && (
                      <div className={`strength ${strength}`}>
                        {strength.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <label>Confirm Password</label>

                    <div className="password-box">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                      />

                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </span>
                    </div>

                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error"
                    />
                  </div>

                  <button type="submit" className="register-btn">
                    Create Account
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;