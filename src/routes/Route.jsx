import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/HomePage";
import Counter from "../pages/Counter";
import ProductDetails from "../pages/ProductDetail";
import ErrorPage from "../pages/ErrorPage";
import Comment from "../pages/Comment";
import Contact from "../pages/Contact/Contact";


const Route = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/home/counter",
                element: <Counter />
            },
            {
                path: "/productDetails/:id",
                element: <ProductDetails />
            },
            {
                path: "/form",
                element : <Contact />
            }
        ],
        errorElement: <ErrorPage />
    },
    {
        path: "/comment",
        element: <Comment />
    }
])

export default Route;