import React, { useContext } from "react";
import "../styles/Product.css"
import { Link } from 'react-router-dom';
import { AllProductsContext } from "../App";

const Product = () => {
    const allProducts = useContext(AllProductsContext);

  return (
    <div className='wrapper--allProducts'>

        <h2 className='title'>All Products</h2>

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