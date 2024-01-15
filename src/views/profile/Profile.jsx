import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getmyRecipe } from "../../services/recipes.service";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import DeleteRecipe from "../../components/delete-recipe/Delete-recipe";
import "../profile/Profile.css";
import ShareButtons from '../../components/share-button/Share-button';
    
const Profile = () => {
  const [myrecipesArray, setmyRecipes] = useState(null);

  const showmyRecipes = () => {
    getmyRecipe()
      .then((response) => {
        setmyRecipes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    showmyRecipes();
  }, []);

  return (
    <div className="details-container">
       {myrecipesArray &&
    myrecipesArray.map((recipe) => {
      return (
        <Card
          id={recipe.id}
          refreshAction={showmyRecipes}
          className="edit-details"
          style={{ marginBottom: "30px" }}
        >
          <Card.Img variant="top" src={recipe ? recipe.imgRecipe : "..."} />
          <Card.Body>
            <Card.Title>{recipe ? recipe.title : "..."}</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <b>Descripción:</b> {recipe ? recipe.description : "..."}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Tiempo:</b> {recipe ? recipe.timeCook : "..."}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Porciones:</b> {recipe ? recipe.portions : "..."}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Ingredientes:</b> {recipe ? recipe.ingredients : "..."}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Pasos de la receta:</b>{" "}
                {recipe ? recipe.instructions : "..."}
              </ListGroup.Item>
              <DeleteRecipe id={recipe.id} refreshAction={showmyRecipes} />
              <ShareButtons recipe={recipe} />
            </ListGroup>
          </Card.Body>
        </Card>
      );
    })}
    </div>
  );
};

export default Profile;
