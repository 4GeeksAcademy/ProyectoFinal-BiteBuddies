import React from "react";
import { Link } from 'react-router-dom';
import "./footer.css";

export const Footer = () => {
	return (
		<footer className="custom-footer">
			<div className="footer-container justify-content-center">
				<div className="footer-section mx-5">
					<h4 className="text-center">Categorías Populares</h4>
					<div className="footer-section-container d-flex">
						<a href="/categoria/postres" className="footer-link m-2">Postres</a>
						<a href="/categoria/vegetariano" className="footer-link m-2">Vegetariano</a>
						<a href="/categoria/comida-rapida" className="footer-link m-2">Comida Rápida</a>
					</div>
				</div>
				<div className="footer-section mx-5">
					<h4 className="text-center">Ayuda y Soporte</h4>
					<div className="footer-section-container d-flex">
						<Link to="/faq" className="footer-link m-2">Preguntas Frecuentes (FAQ)</Link>
						<Link to="/privacy-policy" className="footer-link m-2">Política de Privacidad</Link>
						<Link to="/terms-and-conditions" className="footer-link m-2">Términos y Condiciones</Link>
					</div>
				</div>
				<div className="footer-section mx-5">
					<h4 className="text-center">Contacto</h4>
					<div className="footer-section-container d-flex">
						<p className="m-2">Teléfono: +1 800-123-4567</p>
						<p className="m-2">Email: contacto@bestchefs.com</p>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<p>&copy; 2024 BEST CHEFS. Todos los derechos reservados.</p>
				<p>Powered by BEST CHEFS</p>
				<div className="d-flex justify-content-center">
					<a href="https://www.facebook.com" className="footer-link m-2" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i> Facebook</a><br />
					<a href="https://www.instagram.com" className="footer-link m-2" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a><br />
					<a href="https://www.twitter.com" className="footer-link m-2" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i> Twitter</a>
				</div>
			</div>
	  </footer>
	);
};