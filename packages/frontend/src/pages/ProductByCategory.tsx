import { useContext, useState, useEffect } from "react";
import "../styles/Product.css"
import { Link } from 'react-router-dom';
import { AllProductsContext } from "../App";

export const ProductByCategory = () => {
    const allProducts = useContext(AllProductsContext);
    const [filters, setFilters] = useState<string[]>([]);
    const [checked, setChecked] = useState<string[]>([]);

    const handleFilters = (filters: string[]) => {
        setFilters(filters);
    };

    const categories = allProducts?.allProducts.map(product => product.category);
    let uniqueCategories = categories?.filter(function (item, pos) {
        return categories.indexOf(item) === pos;
    })

    const handleToggle = (category: string) => {
        const currentIndex = checked.indexOf(category);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(category)
        }
        else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        handleFilters(newChecked)
    }
    useEffect(() => {
    }, [filters]);

    return (
        <div className='wrapper--allProducts'>
            <h1 className="header-filter">Filter By Category</h1>
            <div className="categories">
                {uniqueCategories && uniqueCategories.map((category, index) => (
                    <div className="categories-div" key={index}>
                        <input
                            onChange={() => handleToggle(category)}
                            id={category}
                            type="checkbox"
                            className="category-input"
                            name={category}
                            checked={checked.indexOf(category) === -1 ? false : true}
                        />
                        <label className="category-label" htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
            <div className='container--all-product-items'>
                {filters.length === 0 && allProducts?.allProducts.map((product, index) => (
                    <div className='container--product-item' key={index}>
                        <Link to={`/${product._id}`}><img className='product-image' src={product.pictures[0]} alt={product.name} /></Link>
                        <br />
                        <Link to={`/${product._id}`}>{product.name}</Link>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                        <p><strong>Weight:</strong> {product.weight} gr.</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p className='description'><strong>Description:</strong> {product.description}</p>

                    </div>
                ))}
                {filters.length > 0 && filters.map((category: string) => (
                    allProducts?.allProducts.map((product, index) => {
                        if (product.category === category) {
                            return (
                                <div className='container--product-item' key={index}>
                                    <Link to={`/${product._id}`}><img className='product-image' src={product.pictures[0]} alt={product.name} /></Link>
                                    <br />
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
