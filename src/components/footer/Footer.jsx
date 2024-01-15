import "../footer/Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-3 footer-col">
            <h4>Compañía</h4>
            <ul>
              <li>
                <a href="https://cookpad.com/es/privacidad" target="_blank">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="https://cookpad.com/es/privacidad" target="_blank">
                  Políticas de Privacidad
                </a>
              </li>
              <li>
                <a href="https://cookpad.com/es/privacidad" target="_blank">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 footer-col">
            <h4>Ayuda</h4>
            <ul>
              <li>
                <a href="/">Contáctenos</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 footer-col">
            <h4>Unete al Equipo</h4>
            <ul>
              <li>
                <a href="https://careers.cookpad.com/" target="_blank">
                  Ofertas de empleo
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 footer-col">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/" target="_blank">
                <FacebookIcon></FacebookIcon>
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <InstagramIcon></InstagramIcon>
              </a>
              <a href="https://twitter.com/?lang=es" target="_blank">
                <TwitterIcon></TwitterIcon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
