import React, { Component } from "react";

export const Footer = () => {
	return (
	  <footer className="footer container-fluid d-flex justify-content-between pt-5 border-top border-primary bg-secondary fixed-bottom">
		<div className="row">
			<div className="col text-center">
				<div className="footer__section">
					<h4>Mi Cuenta</h4>
					<a href="/perfil" className="text-warning">Mi Perfil</a><br />
					<a href="/mis-recetas" className="text-warning">Mis Recetas</a><br />
					<a href="/mis-favoritos" className="text-warning">Mis Favoritos</a>
				</div>
				<div className="footer__section">
					<h4>Categorías Populares</h4>
					<a href="/categoria/postres" className="text-warning">Postres</a><br />
					<a href="/categoria/vegetariano" className="text-warning">Vegetariano</a><br />
					<a href="/categoria/comida-rapida" className="text-warning">Comida Rápida</a>
				</div>
			</div>
			<div className="col">
				<div className="footer__section text-center">
					<h4>Sobre Nosotros</h4>
					<p className="text-white">Somos una comunidad de amantes de la cocina donde puedes descubrir, compartir y disfrutar recetas de todo el mundo.</p>
				</div>
			</div>
			<div className="col">
				<div className="footer__section text-center">
					<h4 className="text-center">Ayuda y Soporte</h4>
					<div className="justif">
						<a href="/faq" className="text-warning">Preguntas Frecuentes (FAQ)</a><br />
						<a href="/centro-de-ayuda" className="text-warning">Centro de Ayuda</a><br />
						<a href="/reportar-problema" className="text-warning">Reportar un Problema</a><br />
						<a href="/contacto" className="text-warning">Contacto</a><br />
						<a href="/politica-de-privacidad" className="text-warning">Política de Privacidad</a><br />
						<a href="/terminos-condiciones" className="text-warning">Términos y Condiciones</a>
					</div>
				</div>
			</div>
			<div className="col d-block">
				<div className="footer__section text-center">
					<h4>Redes Sociales</h4>
					<div className="d-flex fs-2 justify-content-around">
						<a href="https://www.facebook.com" className="text-warning" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a><br />
						<a href="https://www.instagram.com" className="text-warning" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a><br />
						<a href="https://www.twitter.com" className="text-warning" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-twitter"></i></a>
					</div>
				</div>
				<div className="footer__section text-center">
					<h4>Newsletter</h4>
					<p className="text-white">Suscríbete a nuestro boletín para recibir las últimas recetas y novedades.</p>
					<form>
						<input type="email" placeholder="Tu correo electrónico" required />
						<button type="submit">Suscribirse</button>
					</form>
				</div>
			</div>
			<div className="row">
				<div className="col text-center">
					<div className="footer__copyright">
						<p>&copy; 2024 BEST CHEFS. Todos los derechos reservados.</p>
						<p>Powered by BEST CHEFS</p>
					</div>
				</div>
			</div>
		</div>
	  </footer>
	);
  }
