import React, { Component } from "react";
import "../../styles/footer.css"

export const Footer = () => {
	return (
		<footer className="custom-footer">
			<div className="footer-container">
				<div className="footer-section">
					<h4>Mi Cuenta</h4>
					<a href="/perfil" className="footer-link">Mi Perfil</a><br />
					<a href="/mis-recetas" className="footer-link">Mis Recetas</a><br />
					<a href="/mis-favoritos" className="footer-link">Mis Favoritos</a>
				</div>
				<div className="footer-section">
					<h4>Categorías Populares</h4>
					<a href="/categoria/postres" className="footer-link">Postres</a><br />
					<a href="/categoria/vegetariano" className="footer-link">Vegetariano</a><br />
					<a href="/categoria/comida-rapida" className="footer-link">Comida Rápida</a>
				</div>
				<div className="footer-section">
					<h4>Sobre Nosotros</h4>
					<p>Somos una comunidad de amantes de la cocina donde puedes descubrir, compartir y disfrutar recetas de todo el mundo.</p>
				</div>
				<div className="footer-section">
					<h4>Ayuda y Soporte</h4>
					<a href="/faq" className="footer-link">Preguntas Frecuentes (FAQ)</a><br />
					<a href="/centro-de-ayuda" className="footer-link">Centro de Ayuda</a><br />
					<a href="/reportar-problema" className="footer-link">Reportar un Problema</a><br />
					<a href="/contacto" className="footer-link">Contacto</a><br />
					<a href="/politica-de-privacidad" className="footer-link">Política de Privacidad</a><br />
					<a href="/terminos-condiciones" className="footer-link">Términos y Condiciones</a>
				</div>
				<div className="footer-section">
					<h4>Redes Sociales</h4>
					<div className="social-icons">
						<a href="https://www.facebook.com" className="footer-link" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i> Facebook</a><br />
						<a href="https://www.instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a><br />
						<a href="https://www.twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i> Twitter</a>
					</div>
					
			</div>
			</div>
			<div className="footer-bottom">
			<div className="footer-section">
						<h4>Newsletter</h4>
						<p>Suscríbete a nuestro boletín para recibir las últimas recetas y novedades.</p>
						<form>
							<input type="email" placeholder="Tu correo electrónico" className="newsletter-input" required />
							<button type="submit" className="newsletter-button">Suscribirse</button>
						</form>
					</div>
				<p>&copy; 2024 BEST CHEFS. Todos los derechos reservados.</p>
				<p>Powered by BEST CHEFS</p>
				
			</div>
	  </footer>
	);
  }
