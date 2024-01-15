import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../nav-bar/NavBar.css"
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function NavBars() {
  const [searchValue, setSearchValue]=useState("");
  
  const navigate = useNavigate()
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null)

    const handleKeyUp=(event)=>{
    setSearchValue(event.target.value)
  }
  const handleSearch = async () => {
  if (searchValue.length > 0) {
      await axios
        navigate('search/'+searchValue)
    }
};

useEffect(() => {
  // Obtener el nombre del usuario del almacenamiento local
  const storedName = localStorage.getItem('name')
  const storedToken = localStorage.getItem("token")
  if (storedToken) {
    setToken(storedToken)
  }
  // Actualizar el estado con el nombre del usuario
  setName(storedName);

  //history.state ejecuta este bloque cada vez que cambia la url
}, [history.state]);

const handleLogOut = () => {
    localStorage.clear();
    Swal.fire({title:'Has Cerrado sesión',
    text: 'Se ha cerrado la sesión con exito',
    icon: 'success',
    position: 'center'}).then(res => {
      setTimeout(3000, navigate('/'))
      setName(null)
      setToken(null)
    });
};
    return (
    <Navbar collapseOnSelect={true} className= "customnav" bg="light" expand="lg" fixed="top" data-bs-toggle="collapse">
      <Container fluid>
        <Navbar.Brand className="customLogo"><Link to={'/'}><img src="/logo.png" alt="logo" width="200px"></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className=" linksmap me-auto my-2 my-lg-0"
            navbarScroll
          >

          
          {localStorage.getItem("token") ? (
                    <>
                      <Nav.Link eventKey="1">
                        Hola, {name}
                      </Nav.Link>

                      <Nav.Link className="MyRecipes" eventKey="2">
                        <Link to={'/profile'}>Mis recetas</Link>
                      </Nav.Link>

                      <Nav.Link eventKey="2"><Link to={'/create'}>
                        Crear receta</Link></Nav.Link>

                      <Nav.Link eventKey="3">
                      <Link onClick={handleLogOut} className="link_brand danger">
                        Logout
                    </Link>
                    </Nav.Link>
                      </>
                  ) : (
                    <>

                  <Nav.Link eventKey="2"><Link to={'/create'}>
                      Crear receta</Link></Nav.Link>

                    <Nav.Link className="loginCustom" eventKey="5">
                      <Link to={'/login'}>Login</Link>
                    </Nav.Link>
                    <Nav.Link  eventKey="6">
                      <Link to={'/register'}>Registrate</Link>
                    </Nav.Link>
                    </>
                    )
                  
                  }
          </Nav>
          <Form className="d-flex">
            <Form.Control
              onKeyUp={handleKeyUp}
              type="search"
              placeholder="Escribe la receta..."
              className="me-2"
              aria-label="Search"
            />
            <Button data-bs-toggle="hidden.bs.collapse" variant="outline-success" type="button" onClick={handleSearch} >Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );

}

export default NavBars;