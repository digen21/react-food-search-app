import React, { useState, useEffect, useReducer } from "react";
import Search from "../../Components/Search/Search";
import RecipeItem from "../../Components/Recipe-Item/RecipeItem";
//parent

//loadingState --> some time api take time to fetch so when loadingState become false the result is fetched

interface Items {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

function HomePage() {
  const [loadingState, setLoadingState] = useState(false); //used while fetching API
  const [recipes, setRecipes] = useState([]); //For the recipes
  const [apiCalled, setApiCalled] = useState(false); //State for API got successfully or Not After each search

  const getDataFromSearchCom = (getData: string) => {
    //Before Fetching API
    setLoadingState(true);

    const getRecipes = async () => {
      const apiRecipes = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=4a00203417a54918ae563401a443554e&query=${getData}`
      );

      const result = await apiRecipes.json();
      const { results } = result;

      if (results && results.length > 0) {
        //After Fetching API
        setLoadingState(false); //Before Fetching API
        setRecipes(results); //After API fetched
        setApiCalled(true); //When Api Called Successfully
      }
    };
    getRecipes();
  };

  return (
    <div>
      <Search
        getDataFromSearchCom={getDataFromSearchCom}
        ApiCalled={apiCalled}
        setApiCalled={setApiCalled}
      />

      {/* displaying favorite items  */}
      <div className="--items">
        <h1 className="--fav-title">Favorites</h1>
        <div className="--favorites"></div>
      </div>

      {/* Displaying Loading State Which Contain API */}
      {/* Before Fetching API this will be displayed */}

      {loadingState && (
        <div className="--loading">Recipe Is Loading... Please Wait!</div>
      )}

      <div className="--items">
        {recipes && recipes.length > 0
          ? recipes.map((item: Items) => (
              <RecipeItem key={item.id} item={item} />
            ))
          : null}
      </div>
    </div>
  );
}

export default HomePage;
