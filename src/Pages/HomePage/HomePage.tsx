import React, { useState, useEffect, useReducer } from "react";
import Search from "../../Components/Search/Search";
import RecipeItem from "../../Components/Recipe-Item/RecipeItem";
import FavoriteItem from "../../Components/Favorite-Item/Favorite-Item";
//parent

//loadingState --> some time api take time to fetch so when loadingState become false the result is fetched

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "searchFavorites":
      return {
        ...state,
        filteredValue: action.value,
      };
    default:
      return state;
  }
};

const initialState = {
  filteredValue: "",
};

interface Items {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

function HomePage() {
  const [loadingState, setLoadingState] = useState(false); //used while fetching API
  const [recipes, setRecipes] = useState([]); //For the recipes
  const [favorites, setFavorites] = useState<any[]>([]);
  const [apiCalled, setApiCalled] = useState(false); //State for API got successfully or Not After each search
  const [filteredState, dispatch] = useReducer(reducer, initialState);

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

  const addToFavorites = (currentItem: Items) => {
    let copyFavorites = [...favorites];
    const index = copyFavorites.findIndex((item) => item.id === currentItem.id);
    if (index === -1) {
      copyFavorites.push(currentItem);
      setFavorites(copyFavorites);
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      alert("Item already present...");
    }
  };

  const removeFromFavorites = (currentId: number) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter(
      (item: Items) => item.id !== currentId
    );
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  useEffect(() => {
    const getItemFromStorage = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(getItemFromStorage);
  }, []);
  const filterItems = favorites.filter((item: Items) => {
    return item.title.toLowerCase().includes(filteredState.filteredValue);
  });

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
        <div className="--search-favorites">
          <input
            onChange={(e) =>
              dispatch({
                type: "searchFavorites",
                value: e.target.value,
              })
            }
            value={filteredState.filteredValue}
            type="text"
            name="searchFavorites"
            placeholder="Search Favorites...."
          />
        </div>
        <div className="--favorites-item">
          {favorites && favorites.length > 0
            ? filterItems.map((item: Items) => (
                <FavoriteItem
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  key={item.id}
                  item={item}
                />
              ))
            : null}
        </div>
      </div>

      {/* Displaying Loading State Which Contain API */}
      {/* Before Fetching API this will be displayed */}

      {loadingState && (
        <div className="--loading">Recipe Is Loading... Please Wait!</div>
      )}

      <div className="--items">
        {recipes && recipes.length > 0
          ? recipes.map((item: Items) => (
              <RecipeItem
                key={item.id}
                item={item}
                addToFavorites={() => addToFavorites(item)}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default HomePage;
