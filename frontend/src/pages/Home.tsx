import { ChangeEventHandler, useContext } from 'react';
import { AllProductsContext } from '../App';
import Product from '../components/Product';
import { ISearch } from '../interfaces/product-item';

const Home = ({ setSearch }: ISearch) => {
    const allProducts = useContext(AllProductsContext);
    const categories = [...new Set(allProducts?.allProducts.map((option) => {
        return option.category
    }))]
    return (
        <div>
            <input
                type="text"
                className="product-search"
                placeholder="Search product"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />
            <select>
                {categories.map(category => {
                    return (
                        <option>{category}</option>
                    )
                })}
            </select>
            <Product />
        </div>
    )
}

export default Home