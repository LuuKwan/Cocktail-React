import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const [loading, setLoading] = React.useState(true);
  const [cocktail, setCocktail] = React.useState(null);
  const { id } = useParams();

  //fetch single data from the url
  const fetchSingleCocktail = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      if (data.drinks) {
        //get data from the array drinks
        const {
          // es6 method to set alias to a variable when destructuring an object
          strDrink: name,
          strCategory: category,
          strAlcoholic: alcoholic,
          strGlass: glass,
          strInstructions: instructions,
          strDrinkThumb: image,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        //ES6 style to define an object when its members have the same name with existed variable
        const newCocktail = {
          name,
          image,
          glass,
          instructions,
          category,
          alcoholic,
          ingredients,
        };
        setCocktail(newCocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchSingleCocktail();
  }, [id, fetchSingleCocktail]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">No cocktails to display</h2>;
  }

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
      <h2 className="section-title"> {cocktail.name}</h2>
      <div className="drink">
        <img src={cocktail.image} alt={cocktail.name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span> {cocktail.name}
          </p>
          <p>
            <span className="drink-data">Alcoholic: </span> {cocktail.alcoholic}
          </p>
          <p>
            <span className="drink-data">Category: </span> {cocktail.category}
          </p>
          <p>
            <span className="drink-data">Glass: </span> {cocktail.glass}
          </p>
          <p>
            <span className="drink-data">Instruction: </span>{" "}
            {cocktail.instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {cocktail.ingredients.map((item, index) => {
              return item ? <span key={index}>{item} </span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
