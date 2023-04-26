import React from "react";
import { useQuery, gql } from "@apollo/client";
import { getQuotes } from "../queries";

const Home = () => {
  const { loading, error, data: { quotes = [] } = {} } = useQuery(getQuotes);

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
    <div>
      <div class="list-group mt-4 px-2">
        {quotes.map((quote) => {
          return (
            <a
              href={`/profile/${quote.by}`}
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              <figure class="text-center">
                <blockquote class="blockquote">
                  <p>{quote.name}</p>
                </blockquote>
                <figcaption class="blockquote-footer">
                  {` ${quote.userName.firstName} ${quote.userName.lastName} `}
                </figcaption>
              </figure>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
