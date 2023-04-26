import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { login } from "../queries";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const [loginUser, { data, loading, error }] = useMutation(login);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email.current.value && password.current.value) {
      const loggedInUser = await loginUser({
        variables: {
          OldUser: {
            email: email.current.value,
            password: password.current.value,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data && !error) {
      localStorage.setItem("accessToken", data.signinUser.token);
      navigate("/");
    }
  }, [loading]);

  return (
    <>
      <div style={{ maxWidth: "400px" }} className="m-auto mt-4">
        <h3> Login Form </h3>

        {error && (
          <button className="btn btn-danger my-2">{error.message}</button>
        )}
        {data && !loading && (
          <button className="btn btn-success my-2">
            User SignUp Successfully
          </button>
        )}

        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="name@example.com"
            name="email"
            ref={email}
          ></input>
        </div>
        <div class="mb-3">
          <label htmlFor="[assword" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            name="Password"
            ref={password}
          ></input>
        </div>
        <button
          onClick={onSubmit}
          type="button"
          className="btn btn-warning mb-3"
        >
          Login
        </button>
        <br></br>
        <Link to="/signup"> Don't have a account Signup </Link>
      </div>
    </>
  );
};
