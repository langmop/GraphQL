import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createQuote, getProfile, getQuotes } from "../queries";
import { useMutation } from "@apollo/client";

const CreateQuote = () => {
  const quote = useRef();
  const navigate = useNavigate();

  const [createQuotes, { error, loading, data }] = useMutation(createQuote, {
    refetchQueries: [{ query: getProfile }, { query: getQuotes }],
  });

  const onSubmitPost = async () => {
    const quoteData = await createQuotes({
      variables: {
        quote: quote.current.value,
      },
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="container-md mt-5">
        <h3>Create a Quote</h3>
      </div>

      {error && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-danger my-2">{error.message}</button>
        </div>
      )}
      {data && !loading && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-warning my-2">{data.addQuote}</button>
        </div>
      )}
      <div class="mb-3 container-md">
        <label htmlFor="exampleFormControlTextarea1" class="form-label">
          Quote
        </label>
        <textarea
          ref={quote}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <button onClick={onSubmitPost} className="btn btn-primary mt-4">
          Submit Quote
        </button>
      </div>
    </div>
  );
};

export default CreateQuote;
