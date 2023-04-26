import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { getProfile } from "../queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: {
      user: { email = "", quotes = [], firstName = "", lastName = "" } = {},
    } = {},
  } = useQuery(getProfile) || {};

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return (
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-warning m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div style={{ maxWidth: "600px" }} className="m-auto">
        <div class="text-center">
          <img
            src="https://robohash.org/YOUR-TEXT.png"
            class="rounded-circle border border-warning"
            alt="..."
          ></img>
        </div>
        <div className="text-center"> {` ${firstName} ${lastName} `} </div>
        <div className="bold text-center">{email}</div>
        <div class="list-group mt-4">
          {quotes.map((quote) => {
            return (
              <a
                href="javascript:void(0)"
                class="list-group-item list-group-item-action"
                aria-current="true"
              >
                <figure class="text-center">
                  <blockquote class="blockquote">
                    <p>{quote.name}</p>
                  </blockquote>
                </figure>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
