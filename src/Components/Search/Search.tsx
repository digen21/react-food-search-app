import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

//State : information which accessible to specific component
//Props : Passing property from one component to another component

const Search = (props: any) => {
  const [inputValue, setInputValue] = useState("");

  const { ApiCalled, setApiCalled } = props;

  const handleInputValue = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    //child to parent relationship
    props.getDataFromSearchCom(inputValue); //sending data to parent
  };

  useEffect(() => {
    if (ApiCalled) {
      setInputValue(""); //When API is called Search Input Will Be Empty
      setApiCalled(false); //When API Called Successfully  It will be come false
    }
  }, [ApiCalled]); //Calling Only When The Api Called Property Changed

  return (
    <>
      <nav>
        <div className="--logo">
          <img
            src="https://img.freepik.com/premium-vector/search-food-logo-template-design_20029-442.jpg?w=2000"
            alt=""
          />
        </div>
        <form action="" className="--search-form" onSubmit={handleSubmit}>
          <div className="--search">
            <input
              type="text"
              name="search"
              placeholder="Search Recipes"
              id="search"
              onChange={handleInputValue}
              value={inputValue}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default Search;
