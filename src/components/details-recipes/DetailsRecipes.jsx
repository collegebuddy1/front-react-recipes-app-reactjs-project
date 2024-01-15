import React from "react";
import "../details-recipes/DetailsRecipes.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ShareButtons from '../../components/share-button/Share-button';

const DetailsRecipes = ({ recipeData }) => {
  return (
    recipeData &&
    recipeData.map((recipe) => {
      return (
        <Card className="recipe-container">
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
                <b>Pasos de la receta:</b> {recipe ? recipe.instructions : "..."}
              </ListGroup.Item>
              <ListGroup.Item>
                <ShareButtons recipe={[recipeData]} />
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      );
    })
  );
};

export default DetailsRecipes;
