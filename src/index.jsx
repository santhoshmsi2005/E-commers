import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import Navebar from "./components/NaveBar";
import Counter from "./pages/Counter"
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import { ProductSection } from "./pages/ProductSection";
import Comment from "./pages/Comment";
import { Card } from "./pages/Card";
import { createBrowserRouter, Outlet, RouterProvider, useParams } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Route from "./routes/Route";


// const HeadingReactElement = React.createElement(
//     "h1", 
//     {id: "heading"}, 
//     "Hello React Developers... ❤️❤️💕💕")

const ReactRoot = ReactDom.createRoot(document.getElementById("root"));
ReactRoot.render(<RouterProvider router={Route} />);