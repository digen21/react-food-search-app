import "./style.css";
import React from "react";

interface Item {
  item: Recipe;
}

interface Recipe {
  id: number;
  image: string;
  title: string;
}

//Receiving items from homepage component
function RecipeItem(props: any) {
  const { addToFavorites } = props;

  return (
    <div className="--recipes">
      <div className="--recipe-img">
        <img src={props.item.image} alt="image" />
      </div>
      <div className="--recipe-content">
        <h4>{props.item.title}</h4>
        <button className="--btn" type="button" onClick={addToFavorites}>
          Add to Favorite
        </button>
      </div>
    </div>
  );
}

export default RecipeItem;
