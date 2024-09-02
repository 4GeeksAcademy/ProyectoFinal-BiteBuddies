import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Sign_in } from "./pages/sign_in";
import { UserProfile } from "./pages/UserProfile";
import { FavoritesView } from "./pages/favoritesView";
import { RecipeView } from "./pages/recipeView";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import "../styles/layout.css";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="page-container">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="content">
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Sign_in />} path="/sign_in" />
                        <Route element={<UserProfile />} path="/user-profile/:id" />
                        <Route element={<FavoritesView />} path="/user/favorites" /> 
                        <Route element={<RecipeView />} path="/recipe" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
