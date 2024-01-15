import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../card-recipes/Card-Recipes.css";
import { useEffect } from "react";
import { useState } from "react";
import { getRecipe } from "../../services/recipes.service";
import { useNavigate } from "react-router-dom";

const CardRecipes = () => {
  const [recipesArray, setFormRecipes] = useState(null);
  const navigate = useNavigate();

  const showFormRecipes = () => {
    getRecipe()
      .then((response) => {
        setFormRecipes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    showFormRecipes();
  }, []);

  return (
    <div>
      {recipesArray &&
        recipesArray.map((recipe) => {
          return (
            <div className="card-container">
              <Card
                id={recipe.id}
                refreshAction={showFormRecipes}
                className="recipe"
                style={{ maxWidth: "90%" }}
              >
                <Card.Img src={recipe.imgRecipe} variant="top" />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{" " + recipe.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("recipes/" + recipe.id)}
                  >
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>
  );
}

export default CardRecipes;
