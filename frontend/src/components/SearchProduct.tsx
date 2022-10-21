import { ISearchProduct } from "../interfaces/product-item"
import "../styles/Product.css"

export const SearchProduct = ({setSearch}: ISearchProduct) => {
  return (
    <input
        type="text"
        className="product-search"
        placeholder="Search product"
        onChange={({ currentTarget: input }) => setSearch(input.value)}
    />
  )
}
