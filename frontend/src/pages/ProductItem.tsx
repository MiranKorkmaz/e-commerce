import React from 'react'
import { useParams } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import "../styles/ProductItem.css"
import IProductItem from '../interfaces/product-item';

type HomeProps = {
    allProducts: IProductItem[]
};

const ProductItem = ({allProducts}:HomeProps) => {
    const { id } = useParams();
    const product = allProducts.find(product => product._id === id);

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    const quantity = getItemQuantity(product?._id!);

    return (
        <Container>
            {product ? (
                <div className='wrapper--ProductItem'>
                <div className='container--product-item'></div>
                <h1>{product?.name} by {product.manufacturer}</h1>
                <img 
                    className='main-product-image' 
                    src={product.pictures[0]} alt={product.name} 
                    style={{width: "500px", height: "auto", objectFit: "cover"}}
                />
                <div className='container--thumbnails'>
                    {product?.pictures.map((image, index) => (
                        <img 
                            key={index} 
                            className='thumbnail' 
                            src={image} 
                            alt={`${product.name} ${index}`}
                            style={{width: "150px", height: "auto", objectFit: "cover"}}
                        />
                    ))}
                </div>
                
                <div className='container--product-item-details'>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Weight:</strong> {product.weight} gr.</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p className='description'><strong>Description:</strong> {product.description}</p>
                </div>
                
                <div className='container--buy-button'>
                    {quantity === 0 ? (
                        <button 
                            className='button--addToCart'
                            onClick={() => increaseCartQuantity(product._id!)}
                        >Add to Cart</button>
                    )
                    : <div className='container--increase-remove-items'>
                        <div className='container--increase-items'>
                            <button 
                                className='button-increase'
                                onClick={() => increaseCartQuantity(product._id!)}
                                >+</button>
                            <div><span className='quantity'>{quantity}</span> currently in cart</div>
                            <button 
                                className='button-decrease'
                                onClick={() => decreaseCartQuantity(product._id!)}
                            >-</button>
                        </div>
                        <button 
                            className='button-remove'
                            onClick={() => removeFromCart(product._id!)}
                        >REMOVE</button>
                    </div>
                    }
                </div>
            </div>
            )
            : (
                <h3>Product not found...</h3>
            )}
        </Container>
    )
}

export default ProductItem