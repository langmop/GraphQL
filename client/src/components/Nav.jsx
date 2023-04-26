import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const accessToken = localStorage.getItem("accessToken");

  const navigation = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    navigation("/login");
  };

  return accessToken ? (
    <nav class="navbar navbar-light bg-light">
      <form class="container-fluid justify-content-start flex-nowrap">
        <Link to="/">
          <button class="btn btn-outline-success me-2 w-sm" type="button">
            Home
          </button>
        </Link>
        <Link to="/profile">
          <button class="btn btn-outline-success me-2" type="button">
            Profile
          </button>
        </Link>
        <Link to="/addQuote">
          <button
            style={{ maxHeight: "38px", overflow: "hidden" }}
            class="btn btn-outline-danger me-2 max-h-[38px]"
            type="button"
          >
            Add Quote
          </button>
        </Link>
        <button
          onClick={onLogout}
          class="btn btn-outline-danger me-2"
          type="button"
        >
          Logout
        </button>
      </form>
    </nav>
  ) : (
    <nav class="navbar navbar-light bg-light">
      <form class="container-fluid justify-content-start">
        <Link to="/">
          <button class="btn btn-outline-success me-2 w-sm" type="button">
            Home
          </button>
        </Link>
        <Link to="/login">
          <button class="btn btn-outline-success me-2" type="button">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button class="btn btn-outline-danger me-2" type="button">
            Signup
          </button>
        </Link>
      </form>
    </nav>
  );
};

export default Nav;
