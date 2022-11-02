import { useContext } from "react";
import "../styles/Product.css"
import { Link } from 'react-router-dom';
import { AllProductsContext } from "../App";

export const Product = () => {
    const allProducts = useContext(AllProductsContext);
    return (

        <div className='wrapper--allProducts'>
            {allProducts?.allProducts.map((product, index) => {
                return (
                    <div className='container--product-item' key={index}>
                        <Link to={`/${product._id}`}><img className='product-image' src={product.pictures[0]} alt={product.name} /></Link>
                        <br />
                        <Link to={`/${product._id}`}>{product.name}</Link>
                        <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                )
            }
            )}
        </div>
    )
}
