import React, { useState } from "react";
import "./account.css";
import logo from "./../../assets/image/Logo.svg";
import image from "./../../assets/image/mochi-young-man-or-teenager-skateboarding.png";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [error, setError] = useState("");

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === input.email);
    if (existingUser) {
      setError("Email already exists");
      return;
    }
    if (input.password !== confirmPass) {
      setError("password and confirm password do not match");
      return;
    }
    const newUser = {
      id: uuidv4(),
      username: input.username,
      email: input.email,
      password: input.password,
      loggedin: false,
    };

    // createUser(newUser);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setInput({
      username: "",
      email: "",
      password: "",
    });
    navigate("/");
  };
  return (
    <>
      <div className="account">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="box  bg-light p-4 rounded-4 shadow">
            <div className="row wrap">
              <div className="col-lg-7 col-md-7 col-xs-12 ">
                <img src={logo} height={"30px"} alt="" />
                <h1>Sign Up</h1>
                <p className="subtitle">
                  Turn your goals into achievements with Taskaty.
                </p>
                <form action="" onSubmit={handleSubmit}>
                  <div className=" input-field mt-2">
                    <label htmlFor="text">Username</label>
                    <input
                      type="text"
                      name="username"
                      required
                      className="form-control"
                      value={input.username}
                      onChange={(e) =>
                        setInput({ ...input, [e.target.name]: e.target.value })
                      }
                    />
                  </div>
                  <div className=" input-field mt-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      className="form-control"
                      required
                      onChange={(e) =>
                        setInput({ ...input, [e.target.name]: e.target.value })
                      }
                    />
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className=" input-field mt-2">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          required
                          className="form-control"
                          value={input.password}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className=" input-field mt-2">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          name="confirmPassword"
                          value={confirmPass}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setConfirmPass(e.target.value);
                          }}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="error__message">{error}</p>

                  <button type="submit" className="btn btn-primary  w-100">
                    Sign in
                  </button>
                </form>
                <p className="subtitle mt-2 ps-1">
                  Already have an account ?{" "}
                  <Link to="/">
                    <a href="#" className="link">
                      Sign In
                    </a>
                  </Link>
                </p>
              </div>
              <div className="col-lg-5 col-md-5 col-xs-12 image__container">
                <img src={image} className="image-signup" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
