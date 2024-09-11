import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = ({ children }) => {
  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar hacia arriba al cambiar la ruta
  }, [location]);

  return children; // Renderizar los hijos del componente
};

ScrollToTop.propTypes = {
  children: PropTypes.any
};

export default ScrollToTop;
