import React, { useContext, Component, useState, useEffect } from "react";
import "../styles/Product.css"
import { Link } from 'react-router-dom';
import { AllProductsContext } from "../App";
import axios from "axios";
import IProductItem from "../interfaces/product-item";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

const Product = () => {
    const allProducts = useContext(AllProductsContext);

    const [checked, setChecked] = useState<string[]>([]);
    // const [filters, setFilters] = useState({});
    // const [filteredProducts, setFilteredProducts] = useState<IProductItem[]>([]);    
    
    const categories = allProducts?.allProducts.map(product => product.category);

    let uniqueCategories = categories?.filter(function(item, pos){
        return categories.indexOf(item) === pos;
    })

    const handleToggle = (category:string) => {
        const currentIndex = checked.indexOf(category);
        const newChecked = [...checked];

        if(currentIndex === -1) {
            newChecked.push(category)
        }
        else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        // handleFilters(newChecked)
    }

    // const handleFilters = (filters:string[]) => {
    //     console.log(filters)
    
    //     const newFilters = { ...filters};
    //     console.log("newFilters: ", newFilters);
    //     setFilters(filters);
    //   };


    // const renderCategories = async () => {
    //     const response = await axios.get("/products/categories", {
    //         filters : filters
    //     });

    //     setFilteredProducts(response)
    //     }


    //     useEffect(() => {
    //         renderCategories();
    //     }, []);
        
        


  return (
    <div className='wrapper--allProducts'>

        <h2 className='title'>All Products</h2>

        <div className="container--categories">
            {uniqueCategories && uniqueCategories.map((category, index) => (
                <div key={index}>
                    <input 
                        onChange={() => handleToggle(category)}
                        type="checkbox" 
                        id={category} 
                        name={category} 
                        checked={checked.indexOf(category) === -1 ? false : true}
                    /> 
                    <label htmlFor={category}>{category}</label>
                </div>
            ))}
        </div>


        <div className='container--all-product-items'> 
            {allProducts?.allProducts.map((product, index) => (
                <div className='container--product-item' key={index}>
                    <Link to={`/${product._id}`}><img className='product-image' src={product.pictures[0]} alt={product.name} /></Link>
                    <br/>
                    <Link to={`/${product._id}`}>{product.name}</Link>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                    <p><strong>Weight:</strong> {product.weight} gr.</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p className='description'><strong>Description:</strong> {product.description}</p>
                 

                </div>
            ))}
        </div>
    </div>
  )
}

export default Product