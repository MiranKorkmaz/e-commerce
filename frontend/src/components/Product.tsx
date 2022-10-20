import React from 'react'
import "../styles/Product.css"
import IProductItem from "../interfaces/product-item";

type HomeProps = {
    allProducts: IProductItem[]
}

const Product = ({allProducts}:HomeProps) => {
  return (
    <div className='container--all-product-items'> 
        {allProducts.map((product, index) => (
            <div className='container--product-item' key={index}>
                <h3>{product.name}</h3>
                <img className='product-image' src={product.pictures[0]} alt={product.name} />
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                <p><strong>Weight:</strong> {product.weight} gr.</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p className='description'><strong>Description:</strong> {product.description}</p>

            </div>
        ))}
    </div>
  )
}

export default Product