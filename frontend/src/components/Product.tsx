import React, { useContext, useEffect, useState } from "react";
import "../styles/Product.css"
import { Link } from 'react-router-dom';
import { AllProductsContext } from "../App";

const Product = () => {
    const allProducts = useContext(AllProductsContext);

    const [filters, setFilters] = useState<string[]>([]);
    
      const handleFilters = (filters:string[]) => {
        console.log(filters)
    
        const newFilters = { ...filters};
        console.log("newFilters: ", newFilters);
        setFilters(filters);
      };

    const categories = allProducts?.allProducts.map(product => product.category);
    
    let uniqueCategories = categories?.filter(function(item, pos){
        return categories.indexOf(item) === pos;
    })

    const [checked, setChecked] = useState<string[]>([]);

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

        handleFilters(newChecked)
    }

    useEffect(() => {
        console.log(filters);
        // fetchCategoryProducts(filters);
    }, [filters]);

  return (
    <div className='wrapper--allProducts'>
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
            {filters.length === 0 && allProducts?.allProducts.map((product, index) => (
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

            {filters.length > 0 && filters.map((category:string) => (

                allProducts?.allProducts.map((product, index) => {
                    if(product.category === category) {
                        return (
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
                        )
                    }
                })
            ))}
                
                   
        </div>
    </div>
  )
}

export default Product