import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { signup } from "../queries";

export const Signup = () => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();

  const [signUpUser, { data, loading, error }] = useMutation(signup);

  const onSubmit = async (e) => {
    e.preventDefault();

    const signupUserResult = await signUpUser({
      variables: {
        NewUser: {
          email: email.current.value,
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          password: password.current.value,
        },
      },
    });
  };

  return (
    <div style={{ maxWidth: "400px" }} className="m-auto mt-4">
      <h3> Signup Form </h3>

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
          required
          type="email"
          class="form-control"
          placeholder="name@example.com"
          name="email"
          ref={email}
        ></input>
      </div>
      <div class="mb-3">
        <label htmlFor="firstName" class="form-label">
          First Name
        </label>
        <input
          required
          type="text"
          class="form-control"
          placeholder="First Name"
          name="firstName"
          ref={firstName}
        ></input>
      </div>
      <div class="mb-3">
        <label htmlFor="lastName" class="form-label">
          Last Name
        </label>
        <input
          required
          type="text"
          class="form-control"
          placeholder="Last Name"
          name="lastName"
          ref={lastName}
        ></input>
      </div>
      <div class="mb-3">
        <label htmlFor="[assword" class="form-label">
          Password
        </label>
        <input
          required
          type="password"
          class="form-control"
          placeholder="password"
          name="Password"
          ref={password}
        ></input>
      </div>
      <button onClick={onSubmit} type="button" className="btn btn-warning mb-2">
        Login
      </button>
      <br></br>
      <Link to="/login"> Have a account Login </Link>
    </div>
  );
};
