import React from "react";
import "./footer.css";

export const Footer = () => {
	return (
		<footer className="custom-footer">
			<div className="footer-container justify-content-center">
				<div className="footer-section">
					<h4>Categorías Populares</h4>
					<a href="/categoria/postres" className="footer-link">Postres</a><br />
					<a href="/categoria/vegetariano" className="footer-link">Vegetariano</a><br />
					<a href="/categoria/comida-rapida" className="footer-link">Comida Rápida</a>
				</div>
				<div className="footer-section">
					<h4 className="text-center">Ayuda y Soporte</h4>
					<div className="footer-section-container d-flex">
						<div className="m-2">
							<a href="/faq" className="footer-link">Preguntas Frecuentes (FAQ)</a><br />
							<a href="/contacto" className="footer-link">Contacto</a>
						</div>
						<div className="m-2">
							<a href="/politica-de-privacidad" className="footer-link">Política de Privacidad</a><br />
							<a href="/terminos-condiciones" className="footer-link">Términos y Condiciones</a>
						</div>
					</div>
				</div>
				<div className="footer-section">
					<h4>Contacto</h4>
					<p>Teléfono: +1 800-123-4567</p>
					<p>Email: contacto@bestchefs.com</p>
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