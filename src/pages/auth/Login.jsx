import React from 'react'
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../../store/slices/authSlice';


function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    })
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
    .unwrap()
      .then(() => {
        toast.success("User Login Successfully");
      })
      .catch((error) => {
        toast.error("Login failed");
        console.error("Login Error",error);
      });
    
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div>
          <div className="card shadow-lg border-0">
            <div className="card-body p-md-5 p-3">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleOnSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    className="form-control" 
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter your email address"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      required
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="fs-5" />
                      ) : (
                        <AiOutlineEye className="fs-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="d-grid gap-2 mb-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <p className="mb-0">Don't have an account?</p>
                  <NavLink to="/auth/signup" className="btn btn-link text-decoration-none">
                    Create Account
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login