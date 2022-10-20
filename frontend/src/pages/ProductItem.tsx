import React from 'react'
import { useParams } from 'react-router'

const ProductItem = () => {
    const { id } = useParams();

    return (
        <div>ProductItem</div>
    )
}

export default ProductItem