import React, { useState, useEffect, useContext } from 'react'
import { AllProductsContext } from "../App";


export const Categories = () => {
    const allProducts = useContext(AllProductsContext);

    const [checked, setChecked] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);


       const handleFilters = (filters: string[]) => {
        setFilters(filters);
    };

    const categories = allProducts?.allProducts.map(product => product.category);
    let uniqueCategories = categories?.filter(function (item, pos) {
        return categories.indexOf(item) === pos;
    })

    const handleToggle = (category: string) => {
        const currentIndex = checked.indexOf(category);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(category)
        }
        else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        handleFilters(newChecked)
    }
    useEffect(() => {
        console.log(filters);
    }, [filters]);
    
  return (
    <div>
          {uniqueCategories && uniqueCategories.map((category, index) => (
                    <div key={index}>
                        <input
                            onChange={() => handleToggle(category)}
                            id={category}
                            type="checkbox"
                            name={category}
                            checked={checked.indexOf(category) === -1 ? false : true}
                            className="category-inputs"
                        />
                        <label htmlFor={category}>{category}</label>
                        </div>
                ))}
    </div>
  )
}
function handleFilters(newChecked: string[]) {
    throw new Error('Function not implemented.');
}

