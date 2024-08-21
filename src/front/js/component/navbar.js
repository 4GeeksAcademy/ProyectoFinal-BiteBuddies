import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">HOME</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary m-1">LOGIN</button>
					</Link>
					<Link to="/sign_in">
						<button className="btn btn-primary m-1">SIGN IN</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};