import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import './App.css';
import IProductItem from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"


function App() {
  const [allProducts, setAllProducts] = useState<IProductItem[]>([]);
  const [allProductsFromCategories, setAllProductsFromCategories] = useState<IProductItem[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Fetches all products from /products
  const fetchAllProducts = async () => {
    const response = await axios.get("/products");
    // console.log(response);
    setAllProducts(response.data);
    console.log("allProducts:", allProducts);
    
    // Save every product category to an array
    if(allProducts.length > 0) {
      saveAllCategoriesToArray(allProducts);
    };
  };
  
  // Fetches all products from /products/categories/all
  const fetchProductsFromAllCategories = async () => {
    const response = await axios.get("/products/category/all");
    setAllProductsFromCategories(response.data)
  };


  const saveAllCategoriesToArray = (array:IProductItem[]) => {
    let categories:string[] = [];
      array?.map(product => {
        categories.push(product.category);
      });
      setAllCategories(categories);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchProductsFromAllCategories();
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home allProducts={allProducts}/>}/>
        <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
