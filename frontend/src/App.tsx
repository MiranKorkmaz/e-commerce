/* eslint-disable array-callback-return */
import React, { useEffect, useState, createContext } from 'react';
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

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

interface IAllProductsContext {
  allProducts: IProductItem[] 
}

const AllProductsContext = createContext<IAllProductsContext | null>(null);

function App() {
  const [allProducts, setAllProducts] = useState<IProductItem[]>([]);
  const [search, setSearch] = useState("");
  const AllProductsContextValue: IAllProductsContext = {
    allProducts: allProducts
  }

  // Fetches all products from /products
  const fetchAllProducts = async () => {
    const response = await axios.get(`/products/?search=${search}`);
    setAllProducts(response.data);
  };
  
  useEffect(() => {
    fetchAllProducts();
  }, [search]);

  return (
    <AllProductsContext.Provider value={AllProductsContextValue}>
      <ShoppingCartProvider>
        <Container className="mb-4">
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home setSearch={setSearch} />}/>
              <Route path='/about' element={<About />}/>
              <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
              <Route path='/signup' element={<SignupPage />}/> 
            </Routes>
          </Router>
        </Container>
      </ShoppingCartProvider>
    </AllProductsContext.Provider>
  );
}

export {AllProductsContext};
export default App;
