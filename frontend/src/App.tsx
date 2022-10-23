import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import IProductItem from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';
import About from './pages/About';

import { ShoppingCartProvider } from './context/ShoppingCartContext';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:3001"

// Context
interface IAllProductsContext {
  allProducts: IProductItem[] 
}
const AllProductsContext = createContext<IAllProductsContext | null>(null);


function App() {
  const [allProducts, setAllProducts] = useState<IProductItem[]>([]);

  const AllProductsContextValue: IAllProductsContext = {
    allProducts: allProducts
  }

  // Fetches all products from /products
  const fetchAllProducts = async () => {
    const response = await axios.get("/products");
    setAllProducts(response.data);
  };
  
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <AllProductsContext.Provider value={AllProductsContextValue}>
        <ShoppingCartProvider>
          <Container className="mb-4">
            {/* <Router> */}
              <Header />
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
              </Routes>
            {/* </Router> */}
          </Container>
        </ShoppingCartProvider>
    </AllProductsContext.Provider>
  );
}

export {AllProductsContext};
export default App;
