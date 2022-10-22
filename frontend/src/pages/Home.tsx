import Product from '../components/Product';
import { ISearchProduct } from '../interfaces/product-item';

const Home = ({ setSearch }: ISearchProduct) => {
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