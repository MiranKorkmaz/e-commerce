import { ISearchProduct } from "../interfaces/product-item"

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
