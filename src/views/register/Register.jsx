import { Card, Container, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../register/Register.css";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { registerUser } from "../../services/register.service";

const Register = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isRedirect, setIsRedirect] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onErrors = (e) => { };

    const customSubmit = (data) => {
        console.log("data antes de ser transformada", data);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password2);
        registerUser(formData)
            .then((response) => {
                handleReset();
                Swal.fire({
                    title: "Enviado",
                    text: "Se ha registrado con exito",
                    icon: "success",
                    position: "center",
                }).then(() => {
                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem("name", data.name);
                    if (isRedirect) {
                    console.log("navegando");
                    navigate(`/${params.redirectTo}`);
                    } else {
                    navigate("/");
                    }
                }
            )
        }
    )
        .catch((error) => {
                Swal.fire(
                    "¡Error!",
                    "Ha ocurrido un error al enviar la petición.</br>",
                    "error"
                );
            });

        };

useEffect(() => {
    // validar token
    if (params.redirectTo) {
    setIsRedirect(true);
    }
}, []);

const handleReset = () => {
            document.getElementById("register-form").reset();
        };


    

    return (
        <div className="form-container">
            <Container className="p-5">
                <Card id="registerCard" className="text-start">
                    <Card.Title className="text-center text-white">
                        <h2>Registro de Usuario</h2>
                    </Card.Title>
                    <Card.Body>
                        <Form
                            id="register-form"
                            onSubmit={handleSubmit(customSubmit, onErrors)}
                        >
                            <Form.Group className="mb-3" controlId="employeeName">
                                <Form.Label>Nombre</Form.Label>
                                <input
                                    type="text"
                                    placeholder="Escribe tu Nombre"
                                    className={
                                        errors.name
                                            ? "form-control shadow fail"
                                            : "form-control shadow"
                                    }
                                    {...register("name", {
                                        required: true,
                                        maxLength: 30,
                                    })}
                                />
                                {errors.name?.type === "required" && (
                                    <small className="fail">
                                        Este campo no puede estar vacío
                                    </small>
                                )}
                                {errors.name?.type === "maxLength" && (
                                    <small className="fail">Corrija el campo</small>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="registerEmail">
                                <Form.Label>Email</Form.Label>
                                <input
                                    type="text"
                                    placeholder="Escribe tu correo electrónico "
                                    className={
                                        errors.name
                                            ? "form-control shadow fail"
                                            : "form-control shadow"
                                    }
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                                    })}
                                />

                                {errors.email && <p role="alert">{errors.email?.message}</p>}
                                {errors.email?.type === "pattern" && (
                                    <small className="fail">
                                        {" "}
                                        El correo solo puede contener letras, números, puntos,
                                        guiones, y guiones bajos
                                    </small>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <input
                                    type="password"
                                    placeholder="Escribe una contraseña"
                                    className={
                                        errors.password
                                            ? "form-control shadow fail"
                                            : "form-control shadow"
                                    }
                                    {...register("password", {
                                        required: true,
                                        minLength: 4,
                                        maxLength: 8,
                                    })}
                                />
                                {errors.password?.type === "required" && (
                                    <small className="fail">
                                        Este campo no puede estar vacío
                                    </small>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <small className="fail">
                                        El número máximo de caracteres es ocho
                                    </small>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <input
                                    type="password"
                                    placeholder="Introduce de nuevo la contraseña"
                                    className={
                                        errors.password2
                                            ? "form-control shadow fail"
                                            : "form-control shadow"
                                    }
                                    {...register("password2", {
                                        required: true,
                                        minLength: 4,
                                        maxLength: 8,
                                    })}
                                />
                                {errors.password2?.type === "required" && (
                                    <small className="fail">
                                        Este campo no puede estar vacío
                                    </small>
                                )}
                                {errors.password2?.type === "maxLength" && (
                                    <small className="fail">
                                        El número máximo de caracteres es ocho
                                    </small>
                                )}
                            </Form.Group>

                            <div id="btnContainer">
                                <Button id="createBtn" variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
export default Register;
