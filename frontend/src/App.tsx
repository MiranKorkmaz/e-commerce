/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import './App.css';
import IProductItem from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"


function App() {
  const [allProducts, setAllProducts] = useState<IProductItem[]>([]);
  const [allProductsFromCategories, setAllProductsFromCategories] = useState<IProductItem[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createUsers = async () => {
    const payload = {
      firstName,
      lastName,
      email,
      password
    }
     const response = await axios.post('/signup', payload)
      setFirstName(response.data)
      setLastName(response.data)
      setEmail(response.data)
      setPassword(response.data)
  }

  // Fetches all products from /products
  const fetchAllProducts = async () => {
    const response = await axios.get("/products");
    // console.log(response);
    setAllProducts(response.data);
    console.log("allProducts:", allProducts);
    
    // Save every product category to an array
    if(allProducts.length > 0) {
      saveAllCategoriesToArray(allProducts);
      console.log("allProducts: ", allCategories);
    };
  };
  
  // Fetches all products from /products/categories/all
  const fetchProductsFromAllCategories = async () => {
    const response = await axios.get("/products/category/all");
    setAllProductsFromCategories(response.data)
    console.log("allProductsFromCategories:", allProductsFromCategories);
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
    createUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home allProducts={allProducts}/>}/>
        <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
        <Route path='/signup' element={<SignupPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
