import React from 'react'
import "../styles/Categories.css"
import IProductItem from '../interfaces/product-item';

type HomeProps = {
    allCategories: IProductItem[]
};

const Categories = ({allCategories}:HomeProps) => {
  return (
      <>
        <h2 className='categories-title'>Categories</h2>
        <div className='wrapper--categories-page'>
            <div className='wrapper--categories'>
                    <h3>Phones</h3>
                <div className='container--phone-category-products'>
                    {allCategories.map((product, index) => product.category === "Phones" ?(
                        <div className='container--phone-category-product' key={index}>
                            <img className='phone-category-product-image' src={product.pictures[0]} alt={product.name} />
                            <p className='phone-category-product-name'><strong>{product.name}</strong> by {product.manufacturer}</p>
                        </div>
                    ): "")}
                </div>

            </div>
            <div className='wrapper--categories'>
                    <h3>Headphones</h3>
                <div className='container--phone-category-products'>
                    {allCategories.map((product, index) => product.category === "Headphones" ?(
                        <div className='container--phone-category-product' key={index}>
                            <img className='phone-category-product-image' src={product.pictures[0]} alt={product.name} />
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