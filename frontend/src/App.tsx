/* eslint-disable array-callback-return */
import React, { useEffect, useState, createContext, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { IAllProductsContext, IProductItem } from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';
import About from './pages/About';

import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { SignupPage } from './pages/SignupPage';
import { IUserCartContextValueFinal, ICartContents } from './interfaces/cart-interfaces';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

export const AllProductsContext = createContext<IAllProductsContext | null>(null);

export const UserCartContext = createContext<IUserCartContextValueFinal>({
    userCart: {
        _id: "hello",
        cartItems: [],
        subTotal: 0,
        shippingCost: 0,
        total: 0,
        userId: "",
    },
    setUserCart: () => { },
});

function App() {
    const [allProducts, setAllProducts] = useState<IProductItem[]>([]);
    const [search, setSearch] = useState("");
    const [userCart, setUserCart] = useState<ICartContents>();

    const UserCartContextValue: IUserCartContextValueFinal = useMemo(
        () => ({ userCart, setUserCart }),
        [userCart]
    )

    const AllProductsContextValue: IAllProductsContext = {
        allProducts: allProducts
    }

    const fetchAllProducts = async () => {
        const response = await axios.get(`/products/?search=${search}`);
        setAllProducts(response.data);
        await fetchUserCart();
    };
    const loggedInUser: string = "mock-user-id"
    const fetchUserCart = async () => {
        const response = await axios.get(`/cart/${loggedInUser}`);
        await setUserCart(response.data.userCart);
    };

    useEffect(() => {
        fetchAllProducts();
    }, [search, allProducts]);

    return (
        <AllProductsContext.Provider value={AllProductsContextValue}>
            <ShoppingCartProvider>
                <Container className="mb-4">
                    <Router>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Home
                                setSearch={setSearch}
                            />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/:id' element={<ProductItem allProducts={allProducts} />} />
                            <Route path='/signup' element={<SignupPage />} />
                        </Routes>
                    </Router>
                </Container>
            </ShoppingCartProvider>
        </AllProductsContext.Provider>
    );
}
export default App;
