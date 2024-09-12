import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer/index";


import { Home } from "./pages/home";
import { LoginView } from "./pages/logIn";
import { SignInView } from "./pages/signIn";
import { Profile } from "./pages/profile";
import { UserDetails } from "./pages/userDetails"
import { FavoritesView } from "./pages/favoritesView";
import { RecipeView } from "./pages/recipeView";
import { ViewOfAllCategories } from "./pages/viewOfAllCategories";

import { PrivacyPolicy } from "./pages/static/privacyPolicy";
import { TermsAndConditions } from "./pages/static/termsAndConditions";
import { FAQPage } from "./pages/static/faqPage";

import injectContext from "./store/appContext";

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
                        <Route element={<LoginView />} path="/login" />
                        <Route element={<SignInView />} path="/sign_in" />
                        <Route element={<Profile/>}path="/user-profile"  /> 
                        <Route element={<UserDetails />}path="/user/:id"  /> 
                        <Route element={<FavoritesView />} path="/user/favorites" /> 
                        <Route element={<ViewOfAllCategories />} path="/categories" /> 
                        <Route element={<RecipeView />} path="/recipe/:id" />
                        <Route element={<PrivacyPolicy />} path="/privacy-policy" />
                        <Route element={<TermsAndConditions />} path="/terms-and-conditions" />
                        <Route element={<FAQPage />} path="/faq" />
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
