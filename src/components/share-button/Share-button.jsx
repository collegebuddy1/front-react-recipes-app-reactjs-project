// ShareButtons.js
import "../share-button/Share-button.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function ShareButtons({ recipe }) {
  const url = `https://127.0.0.1:8000/api/recipes/${recipe.id}`;
  const text = `Mira esta deliciosa receta: ${recipe.title}`;

  return (
    <div class="share-button">
      <p class="title-share">Compartir en:</p>
      <a href={`https://wa.me/?text=${text} ${url}`} target="_blank" rel="noopener noreferrer" >
        <WhatsAppIcon color="success"/>
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
        <FacebookIcon color="primary" />
      </a>
    </div>
  );
}

export default ShareButtons;
