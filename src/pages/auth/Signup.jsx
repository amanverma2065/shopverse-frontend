import React, { useState } from 'react';
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signupUser } from '../../store/slices/authSlice';

function Signup() {

  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passAlert, setPassAlert] = useState("");


  const { firstName, lastName, email, password, confirmPassword } = formData

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      }
    })
  };

  // function handleOnChange(event) {
  //   setFormData( (prevData) => {
  //     return{
  //       ...prevData,
  //       [event.target.name]: event.target.value
  //     }
  //   })
  // };

  const handleOnSubmit = (e) => {
    e.preventDefault();


    if (password.length < 8) {
      setPassAlert('Password must be of at least eight characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        toast.success("User Registered Successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error("Signup failed");
        console.error("Signup Error",error);
      });



    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    console.log(formData);
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div>
          <div className="card shadow-lg border-0">
            <div className="card-body p-lg-5 p-4">
              <h2 className="text-center mb-4">Create Account</h2>
              <form onSubmit={handleOnSubmit}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={firstName}
                      onChange={handleOnChange}
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={lastName}
                      onChange={handleOnChange}
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>

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

                <div className="row mb-4">
                  <div className="col-md-6">
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
                    {passAlert && <div className="text-danger mt-1">{passAlert}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm Password"
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible className="fs-5" />
                        ) : (
                          <AiOutlineEye className="fs-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Create Account
                  </button>
                </div>

                <div className="text-center">
                  <p className="mb-0">Already have an account?</p>
                  <NavLink to="/auth/login" className="btn btn-link text-decoration-none">
                    Login
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


export default Signup