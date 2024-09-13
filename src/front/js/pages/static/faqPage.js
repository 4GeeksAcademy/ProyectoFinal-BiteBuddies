import React from 'react';
import "../../component/footer/footer.css";

export const FAQPage = () => {
  return (
    <div className="main-container-fot" style={{ padding: '20px' }}>
      <div className='content-fot'>
        <h1>Preguntas Frecuentes (FAQ)</h1>
        
        <h2>¿Cómo puedo buscar una receta?</h2>
        <p>Puedes utilizar la barra de búsqueda en la parte superior de la página para buscar recetas por nombre, categoría o ingredientes. Solo ingresa el término de búsqueda y presiona "Enter" o haz clic en el botón de búsqueda.</p>

        <h2>¿Cómo puedo enviar mi propia receta?</h2>
        <p>Para compartir tu propia receta, primero debes crear una cuenta o iniciar sesión. Luego, haz clic en "Subir receta" desde tu perfil y completa el formulario con los detalles de la receta, como los ingredientes y el proceso de preparación.</p>

        <h2>¿Es necesario registrarse para acceder a las recetas?</h2>
        <p>No, puedes ver todas las recetas sin necesidad de registrarte. Sin embargo, si quieres guardar tus recetas favoritas o subir tus propias recetas, es necesario que crees una cuenta.</p>

        <h2>¿Puedo modificar una receta después de publicarla?</h2>
        <p>Sí, puedes modificar una receta que hayas subido en cualquier momento desde tu perfil. Simplemente ve a la sección de "Mis Recetas", selecciona la receta que deseas editar y actualiza la información según sea necesario.</p>

        <h2>¿Cómo puedo guardar una receta como favorita?</h2>
        <p>Cuando encuentres una receta que te guste, haz clic en el ícono de corazón o "Guardar como favorita" que aparece junto a la receta. Esto añadirá la receta a tu lista de recetas favoritas en tu perfil.</p>

        <h2>¿Qué hago si encuentro un error en una receta?</h2>
        <p>Si encuentras un error en una receta, puedes reportarlo utilizando el botón de "Reportar un problema" en la página de la receta. Nuestro equipo revisará el reporte y tomará las medidas necesarias.</p>

        <h2>¿Puedo filtrar recetas por dietas o preferencias alimentarias?</h2>
        <p>Sí, en la barra de búsqueda o en la sección de filtros puedes seleccionar categorías como "Vegetariana", "Vegana", "Sin gluten", entre otras, para ver solo recetas que se ajusten a tus preferencias alimentarias.</p>

        <h2>¿Cómo puedo contactar al soporte si tengo más preguntas?</h2>
        <p>Si tienes alguna otra pregunta o necesitas ayuda, puedes contactarnos a través de nuestro correo electrónico de soporte: soporte@ejemplorecetas.com.</p>
      </div>

    </div>
  );
};