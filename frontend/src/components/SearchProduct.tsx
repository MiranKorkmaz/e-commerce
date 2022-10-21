import axios from 'axios';
import React, { useState } from 'react'

export const SearchProduct = () => {
    const [search, setSearch] = useState("");

    const fetchProducts = async () => {
        const response = await axios.post("/search-products");
        setSearch(response.data.name)
        console.log(response)
    }
    return (
        <div>
            <input 
                type="text"
                placeholder="search products"
                value={search}
                onChange={(e) => fetchProducts()}
            />
        </div>
    )
}
