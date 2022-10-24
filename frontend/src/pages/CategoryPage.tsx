import { useContext, useState } from 'react'
import { AllProductsContext } from '../App';
import Categories from '../components/Categories'

export const CategoryPage = () => {
    const allProducts = useContext(AllProductsContext);
    const [data, setData] = useState([])

    const filterByCategory = (catItem: string) => {
        const result: any = allProducts?.allProducts.filter((product) => {
            return product.category === catItem;
        })
        setData(result)
    }
    return (
    <div>
        <button onClick={() => filterByCategory("Phones")}>Phones</button>
        <Categories />
    </div>
  )
}
