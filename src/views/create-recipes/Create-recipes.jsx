import { useEffect } from "react";
import FormRecipes from "../../components/form-recipes/Form-recipes";
import { useNavigate } from "react-router-dom";

const CreateRecipes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login/create");
    }
  });

  return <FormRecipes />;
}

export default CreateRecipes;
