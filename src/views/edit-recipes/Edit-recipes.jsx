import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { editRecipe, getRecipeById } from "../../services/recipes.service";
import { useNavigate, useParams } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";


const EditViews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [recipeImg, setRecipeImg] = useState(null);

  const onErrors = (e) => {
    console.error(e)
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const customSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("imgRecipe", recipeImg);
    formData.append("timeCook", data.timeCook);
    formData.append("portions", data.portions);
    formData.append("ingredients", data.ingredients);
    formData.append("instructions", data.instructions);
    editRecipe(id, formData)
      .then(() => {
        handleReset();
        Swal.fire({
          title: "Gracias",
          text: "Se ha guardado tu receta",
          icon: "success",
          position: "center",
        }).then(() => {
          setTimeout(3000, navigate("/profile"));
        });
      })
      .catch((e) => {
        Swal.fire(
          "¡Error!",
          "Ha ocurrido un error al enviar la petición.</br>",
          "error"
        );
      });
  };

  const getURL = (imageUrl) => {
    setRecipeImg(imageUrl);
  }

  const handleReset = () => {
    setAdded(false);
    document.getElementById("recipes-form").reset();
  };

  useEffect(() => {
    getRecipeById(id).then(
      (response) => {
        reset({
          description: response.data.description,
          imgRecipe: response.data.imgRecipe,
          ingredients: response.data.ingredients,
          instructions: response.data.instructions,
          portions: response.data.portions,
          timeCook: response.data.timeCook,
          title: response.data.title
        })
        setRecipeImg(response.data.imgRecipe)
      }
    )
  }, [id, reset])

  return (
    <div className="form-container p-5">
      <Card id="regisCardStyle" className="text-start">
        <Card.Title id="regisTittle" className="text-center text-white">
          <h2>Edita tu receta</h2>
        </Card.Title>
        <Card.Body>
          <Card.Img variant="top" src={recipeImg ? recipeImg : "..."}></Card.Img>
          <Form
            id="recipes-form"
            onSubmit={handleSubmit(customSubmit, onErrors)}
          >
            <Form.Group className="mb-3" controlId="recipestitle">
              <Form.Label>Titulo</Form.Label>
              <input
                name="title"
                type="text"
                placeholder="Escribe el nombre de tu receta"
                className={
                  errors.name
                    ? "form-control shadow fail"
                    : "form-control shadow"
                }
                {...register("title", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.title?.type === "required" && (
                <small className="fail">Este campo no puede estar vacío</small>
              )}
              {errors.title?.type === "maxLength" && (
                <small className="fail">Corrija el campo</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipedescription">
              <Form.Label>Descripción del plato</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                className="inputEdit"
                type="text"
                placeholder="Escribe una breve descripción de la receta"
                {...register("description", {
                  required: true,
                  minLength: 4,
                  maxLength: 280,
                })}
              />
              {errors.description?.type === "required" && (
                <small className="fail">Este campo no puede estar vacío</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipestime">
              <Form.Label>Tiempo de preparación</Form.Label>
              <input
                name="timeCook"
                type="text"
                placeholder="Escribe en cuanto tiempo se prepara"
                className={
                  errors.timeCook
                    ? "form-control shadow fail"
                    : "form-control shadow"
                }
                {...register("timeCook", {
                  required: true,
                  maxLength: 15,
                })}
                aria-invalid={errors.timeCook ? "true" : "false"}
              />
              {errors.timeCook?.type === "required" && (
                <p role="alert">El tiempo es requerido</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Porciones</Form.Label>
              <Form.Select
                id="selectField"
                name="portions"
                className={
                  errors.portions
                    ? "form-control shadow fail"
                    : "form-control shadow"
                }
                controlId="recipeportions"
                {...register("portions", {
                  required: true,
                })}
              >
                <option selected>Elija una opción</option>
                <option value="1 persona">1 persona</option>
                <option value="2 personas">2 personas</option>
                <option value="3-4 personas">3-4 personas</option>
                <option value="5-6 personas">5-6 personas</option>
                <option value="7 personas">7 a mas personas</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeingredients">
              <Form.Label>Ingredientes</Form.Label>
              <Form.Control
                name="ingredients"
                as="textarea"
                type="text"
                placeholder="Escribe los ingredientes"
                {...register("ingredients", {
                  required: true,
                  minLength: 5,
                  maxLength: 1000,
                })}
              />
              {errors.ingredients?.type === "required" && (
                <small className="fail">Este campo no puede estar vacío</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeinstruction">
              <Form.Label>Instrucciones</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="instructions"
                placeholder="Introduce el paso a paso para preparar la receta"
                {...register("instructions", {
                  required: true,
                  minLength: 5,
                  maxLength: 2000,
                })}
              />
              {errors.instruction?.type === "required" && (
                <small className="fail">Este campo no puede estar vacío</small>
              )}
              {errors.instruction?.type === "maxLength" && (
                <small className="fail">
                  El número máximo de caracteres es 2000
                </small>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeimg">
              <Form.Label className="btn btn-primary">
                <UploadWidget
                  getUrlFunction={getURL}
                  added={added}
                  onAdd={() => setAdded(true)}
                  text='Cambiar Imagen'
                />
              </Form.Label>
            </Form.Group>
            <div id="btnContainer">
              <Button id="createBtn" variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditViews;
