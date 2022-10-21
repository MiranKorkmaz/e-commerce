import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import "../styles/Categories.css"
import { AllProductsContext } from "../App";


const Categories = () => {
    const allProducts = useContext(AllProductsContext);

  return (
      <>
        <h2 className='categories-title'>Categories</h2>
        <div className='wrapper--categories-page'>
            <div className='wrapper--categories'>
                    <h3>Phones</h3>
                <div className='container--phone-category-products'>
                    {allProducts?.allProducts.map((product, index) => product.category === "Phones" ?(
                        <div className='container--phone-category-product' key={index}>
                            <Link to={`/${product._id}`}><img className='phone-category-product-image' src={product.pictures[0]} alt={product.name} /></Link>
                            <p className='phone-category-product-name'><strong>{product.name}</strong> by {product.manufacturer}</p>
                        </div>
                    ): "")}
                </div>

            </div>
            <div className='wrapper--categories'>
                    <h3>Headphones</h3>
                <div className='container--phone-category-products'>
                    {allProducts?.allProducts.map((product, index) => product.category === "Headphones" ?(
                        <div className='container--phone-category-product' key={index}>
                            <Link to={`/${product._id}`}><img className='phone-category-product-image' src={product.pictures[0]} alt={product.name} /></Link>
                            <p className='phone-category-product-name'><strong>{product.name}</strong> by {product.manufacturer}</p>
                        </div>
                    ): "")}
                </div>

            </div>
        </div>
    </>
  )
}

export default Categories