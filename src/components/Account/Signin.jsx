import React, { useState } from "react";
import "./account.css";
import logo from "./../../assets/image/Logo.svg";
import image from "./../../assets/image/mochi-young-man-writing-in-folder-1.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const Signin = () => {
  const { userData } = useContext(UserContext);
  const [error, setError] = useState("");

  const [input, setInput] = useState({
    id: "",
    email: "",
    password: "",
    loggedin: false,
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => {
      return u.email === input.email && u.password === input.password;
    });

    if (user) {
      // localStorage.setItem("user", JSON.stringify(user));
      const loggedinUser = users.map((u) => {
        if (u.id === user.id) {
          return {
            ...u,
            loggedin: true,
          };
        }
        return u;
      });
      localStorage.setItem("users", JSON.stringify(loggedinUser));
      navigate("/dashboard", { state: user.id });
    } else {
      // Check if the user is not found in the userData file
      const newUser = userData.find((u) => u.email === input.email);
      if (newUser) {
        // User exists, but password is incorrect
        setError("Incorrect password");
      } else {
        // User not found in the userData file
        setError("User not found");
      }
    }
  };
  return (
    <>
      <div className="account">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="box  bg-light p-4 rounded-4 shadow">
            <div className="row wrap">
              <div className="col-lg-7 col-md-7 col-xs-12 ">
                <img src={logo} height={"30px"} alt="" />
                <h1>Sign In</h1>
                <p className="subtitle">
                  Welcome back! Sign in to your account .
                </p>
                <form action="" onSubmit={handleSubmit}>
                  <div className=" input-field mt-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      required
                      className="form-control"
                      onChange={(e) =>
                        setInput({ ...input, [e.target.name]: e.target.value })
                      }
                    />
                  </div>
                  <div className=" input-field mt-2">
                    <label htmlFor="password">Passward</label>
                    <input
                      type="password"
                      name="password"
                      // ref="password"
                      className="form-control"
                      value={input.password}
                      required
                      onChange={(e) =>
                        setInput({
                          ...input,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <p className="error__message">{error}</p>

                  <button type="submit" className="btn btn-primary  w-100">
                    Sign in
                  </button>
                </form>
                <p className="subtitle   ps-1">
                  Create new account ?{" "}
                  <Link to="/signup">
                    <a href="#" className="link">
                      Sign Up
                    </a>
                  </Link>
                </p>
              </div>
              <div className="col-lg-5 col-md-5 col-xs-12 image__container">
                <img src={image} className="image-signin" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
