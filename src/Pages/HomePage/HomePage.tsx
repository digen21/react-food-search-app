import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import Swal from "sweetalert2";
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

  const addToFavorites = useCallback(
    (currentItem: Items) => {
      let copyFavorites = [...favorites];
      const index = copyFavorites.findIndex(
        (item) => item.id === currentItem.id
      );
      if (index === -1) {
        copyFavorites.push(currentItem);
        setFavorites(copyFavorites);
        localStorage.setItem("favorites", JSON.stringify(copyFavorites));
        window.scrollTo({ top: 0, behavior: "smooth" });
        Swal.fire({
          title: "Added To Favorite",
          text: "????",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Item Already Present",
          text: "??????",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    },
    [favorites]
  );

  const removeFromFavorites = (currentId: number) => {
    let copyFavorites = [...favorites];
    copyFavorites = copyFavorites.filter(
      (item: Items) => item.id !== currentId
    );
    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    Swal.fire({
      title: "Item Removed From Favorite",
      text: `???????`,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  useEffect(() => {
    const getItemFromStorage =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(getItemFromStorage);
  }, []);

  const filterItems =
    favorites && favorites.length > 0
      ? favorites.filter((item: Items) => {
          return item.title.toLowerCase().includes(filteredState.filteredValue);
        })
      : [];

  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      return recipes.map((item: Items) => (
        <RecipeItem
          key={item.id}
          item={item}
          addToFavorites={() => addToFavorites(item)}
        />
      ));
    }
  }, [recipes, addToFavorites]);

  return (
    <div>
      <Search
        getDataFromSearchCom={getDataFromSearchCom}
        ApiCalled={apiCalled}
        setApiCalled={setApiCalled}
      />

      {/* displaying favorite items  */}
      <div className="--favorite-items">
        <h3 className="--favorite-title">Favorites</h3>
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
          {!filterItems && !filterItems.length && (
            <div className="--no-item">No favorite item found</div>
          )}
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

      <div className="--recipe-items">
        {useMemo(
          () =>
            !loadingState && recipes && recipes.length > 0
              ? recipes.map((item: Items) => (
                  <RecipeItem
                    key={item.id}
                    item={item}
                    addToFavorites={() => addToFavorites(item)}
                  />
                ))
              : null,
          [loadingState, recipes, addToFavorites] //dependencies
        )}
      </div>
      {!loadingState && !recipes.length && (
        <div style={{ color: "#fff" }} className="--not-found">
          No Recipes Found
        </div>
      )}
    </div>
  );
}

export default HomePage;
