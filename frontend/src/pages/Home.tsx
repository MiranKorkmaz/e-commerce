import React from 'react'
import Product from '../components/Product';
import Categories from '../components/Categories';
import IProductItem from "../interfaces/product-item";

type HomeProps = {
    allProducts: IProductItem[]
}

const Home = ({allProducts}:HomeProps) => {
  return (
    <div>
        <h1>Home</h1>
        <Product allProducts={allProducts} />
        <Categories allCategories={allProducts} />
    </div>
  )
}

export default Home