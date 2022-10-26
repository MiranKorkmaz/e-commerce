/* eslint-disable array-callback-return */
import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import './App.css';
import IProductItem from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import About from './pages/About';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { UserContext } from './pages/LoginPage';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

interface IAllProductsContext {
  allProducts: IProductItem[] 
}

const AllProductsContext = createContext<IAllProductsContext | null>(null);

function App() {
  const [allProducts, setAllProducts] = useState<IProductItem[]>([]);

  const AllProductsContextValue: IAllProductsContext = {
    allProducts: allProducts
  }

  const user = useContext (UserContext);

  // Fetches all products from /products
  const fetchAllProducts = async () => {
    const response = await axios.get("/products");
    setAllProducts(response.data);
  };
  
  useEffect(() => {
    fetchAllProducts();
    console.log(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AllProductsContext.Provider value={AllProductsContextValue}>
      <ShoppingCartProvider>
        <UserContext.Provider value={user}>
        <Container className="mb-4">
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
              <Route path='/signup' element={<SignupPage />}/> 
              <Route path='/login' element={<LoginPage /> }/>
              <Route path='/user/:id' element={<ProfilePage />}/>
              <Route path='*' element={<h1>404 - Not Found</h1>}/>
            </Routes>
          </Router>
        </Container>
        </UserContext.Provider>
      </ShoppingCartProvider>
    </AllProductsContext.Provider>
  );
}

export {AllProductsContext};
export default App;
