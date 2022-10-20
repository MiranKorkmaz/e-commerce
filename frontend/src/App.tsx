import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:3001"

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsFromCategories, setAllProductsFromCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const fetchAllProducts = async () => {
    const response = await axios.get("/products");
    console.log(response);
  };
  /*
  const saveAllCategoriesToArray = () => {
    if(allProducts) {
      allProducts.data.map(product => {
        setAllCategories(product.category);
      })
    }
  };
  */


  const fetchProductsFromAllCategories = async () => {
    const response = await axios.get("/products/category/all");
    console.log("fetchProductsFromAllCategories:" , response);
    
  };

  useEffect(() => {
    fetchAllProducts()

  }, []);

  return (
    <div >

    </div>
  );
}

export default App;
