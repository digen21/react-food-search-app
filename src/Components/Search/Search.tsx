import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./style.css";
import ThemeButton from "../Theme-Button/Theme-Button";
import { ThemeContext } from "../../App";

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
  }, [ApiCalled, setApiCalled]); //Calling Only When The Api Called Property Changed

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <nav style={theme ? { backgroundColor: "#212121" } : {}}>
        <div className="--logo">
          <img
            src="https://cdn.dribbble.com/users/5482538/screenshots/14141766/media/4f52f8d7436ae17658c4391b75b45951.jpg"
            alt=""
            className="--logo-img"
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
            <button type="submit" className="-search-btn">
              <span className="--btn-text">Search</span>
              <i className="uil uil-search-alt --btn-ic"></i>
            </button>
          </div>
        </form>
        <ThemeButton />
      </nav>
    </>
  );
};

export default Search;
