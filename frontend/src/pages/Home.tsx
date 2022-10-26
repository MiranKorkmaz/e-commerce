import { useContext } from 'react';
import { AllProductsContext } from '../App';
import { Product } from '../components/Product';
import { ISearch } from '../interfaces/product-item';

const Home = ({ setSearch }: ISearch) => {
    const allProducts = useContext(AllProductsContext);

    return (
        <div>
            <input
                type="text"
                className="product-search"
                placeholder="Search product"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />
            <Product />
        </div>
    )
}

export default Home