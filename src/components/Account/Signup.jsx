import React, { useContext, useState } from "react";
import "./account.css";
import logo from "./../../assets/image/logo.png";
import image from "./../../assets/image/mochi-young-man-or-teenager-skateboarding.png";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Signup = () => {
  // const navigat = useNavigate();
  // const [input, setInput] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   localStorage.setItem("user", JSON.stringify(input));
  //   navigat("/");
  // };
  const { userData, createUser } = useContext(UserContext);

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: userData.length + 1,
      username: input.username,
      email: input.email,
      password: input.password,
    };

    createUser(newUser);
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
                  Hi! Turn your goals into achievements with Taskaty.
                </p>
                <form action="" onSubmit={handleSubmit}>
                  <div className=" input-field mt-2">
                    <label htmlFor="text">Username</label>
                    <input
                      type="text"
                      name="username"
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
                        <label htmlFor="comfirmPassword">
                          Comfirm Password
                        </label>
                        <input
                          type="password"
                          name="comfirmPassword"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3 w-100">
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
