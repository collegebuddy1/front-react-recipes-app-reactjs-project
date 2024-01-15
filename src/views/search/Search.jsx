import { useParams } from "react-router-dom";
import "../search/Search.css";
import { useEffect, useState } from "react";
import { getRecipeByTitle } from "../../services/recipes.service";
import RecipeDetails from "../../components/details-recipes/DetailsRecipes";
//importa los componentes


function Search(){

    const { busqueda } = useParams()
    const [recipesData, setRecipesData] = useState(null)

    useEffect(() => {
        if (busqueda && busqueda.length > 0) {
            getRecipeByTitle(busqueda)
                .then(response => {
                    setRecipesData(response.data)
                    console.log(response.data)
                })
        }
    }
    , [busqueda])

    return (
        <div>
            <RecipeDetails className="searchForm" recipeData={recipesData} />
        </div>
    )
    }
    
    export default Search