import React from 'react'
import { useParams } from 'react-router'
import IProductItem from '../interfaces/product-item';
import "../styles/ProductItem.css"

type HomeProps = {
    allProducts: IProductItem[]
};

const ProductItem = ({allProducts}:HomeProps) => {
    const { id } = useParams();

    const product = allProducts.find(product => product._id === id);

    return (
        <>
            {product ? (
                <div className='wrapper--ProductItem'>
                <div className='container--product-item'></div>
                <h1>{product?.name} by {product.manufacturer}</h1>
                <img className='main-product-image' src={product.pictures[0]} alt={product.name} />
                <div className='container--thumbnails'>
                    {product?.pictures.map((image, index) => (
                        <img className='thumbnail' src={image} alt={`${product.name} ${index}`}/>
                    ))}
                </div>
                <div className='container--product-item-details'>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Weight:</strong> {product.weight} gr.</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p className='description'><strong>Description:</strong> {product.description}</p>
                </div>
            </div>
            ):(
                <h3>Product not found...</h3>
            )}
        </>
    )
}

export default ProductItem