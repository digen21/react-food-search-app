import "./style.css";
import React from "react";

//Receiving items from homepage component
function FavoriteItem(props: any) {
  const { removeFromFavorites } = props;

  return (
    <div className="--favorite" key={props.id}>
      <div className="--favorite-img">
        <img src={props.item.image} alt="image" />
      </div>
      <div className="--favorite-content">
        <h4>{props.item.title}</h4>
        <button className="--btn" type="button" onClick={removeFromFavorites}>
          Remove From Favorite
        </button>
      </div>
    </div>
  );
}

export default FavoriteItem;
