import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeById } from "../../services/recipes.service";
import DetailsRecipes from "../../components/details-recipes/DetailsRecipes";
import "./Details-views.css"


const DetailsViews = () => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);

  const handleRegister = async () => {
    const { data } = await getRecipeById(id);
    setRecipeData(data);
    console.log(data);
  };

  useEffect(() => {
    handleRegister();
  }, []);

  return (
    <div className="details-container">
      <DetailsRecipes recipeData={[recipeData]} />
    </div>
  );
};

export default DetailsViews;
