/* eslint-disable array-callback-return */
import React, { useEffect, useState, createContext, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import IProductItem from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';
import About from './pages/About';
import { IAllProductsContext, ICartContents, IUserCartContextValue } from "./interfaces/product-item"

import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { SignupPage } from './pages/SignupPage';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000/"

const AllProductsContext = createContext<IAllProductsContext | null>(null);

export const UserCartContext = createContext<IUserCartContextValue>({
  userCart: {
    _id: "hello",
    cartItems: [],
    subTotal: 0,
    shippingCost: 0,
    total:  0,
    userId: "",
  },
  setUserCart: () => {},
});


function App() {

// Fetch User Cart with axios and set it as the Context's initial value
const [userCart, setUserCart] = useState<ICartContents>();
const [search, setSearch] = useState("")

const UserCartContextValue:IUserCartContextValue = useMemo(
  () => ({userCart, setUserCart}),
  [userCart]
)

const [allProducts, setAllProducts] = useState<IProductItem[]>([]);

const AllProductsContextValue: IAllProductsContext = {
  allProducts: allProducts
}

const fetchAllProducts = async () => {
    const response = await axios.get(`/products/?search=${search}`)
  setAllProducts(response.data);
  if(loggedInUser) await fetchUserCart();
};

// Fetch specific user's cart data
let loggedInUser: string | undefined
loggedInUser = "mock-user-id"; // Enable when we have completed login functionality
const fetchUserCart = async () => {
  const response = await axios.get(`/cart/${loggedInUser}`);
  await setUserCart(response.data.userCart);
};

useEffect(() => {
    // fetchUserCart();
    fetchAllProducts();
  }, [search]);

  return (
    <AllProductsContext.Provider value={AllProductsContextValue}>

      <UserCartContext.Provider value={UserCartContextValue}>
        <ShoppingCartProvider>
          <Container className="mb-4">
              <Header />
              <Routes>
                <Route path='/' element={<Home setSearch={setSearch}/>}/>
                <Route path='/about' element={<About />}/>
                <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
                <Route path='/signup' element={<SignupPage />}/> 
              </Routes>
          </Container>
        </ShoppingCartProvider>
      </UserCartContext.Provider>
    </AllProductsContext.Provider>
  );
}

export {AllProductsContext};
export default App;