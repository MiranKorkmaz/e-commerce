import React, { useEffect, useState, createContext, useMemo } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import IProductItem from "./interfaces/product-item";
import Home from './pages/Home';
import ProductItem from './pages/ProductItem';
import Header from './components/Header';
import About from './pages/About';
import { ShoppingCartProvider } from './context/ShoppingCartContext';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:3001"

// AllProducts Context
interface IAllProductsContext {
  allProducts: IProductItem[] 
}
const AllProductsContext = createContext<IAllProductsContext | null>(null);

// UserCart Context
type TCartItem = {
  _id: string
  quantity: number
  name?: string
  manufacturer?: string
  image?: string
  price?: number
  weight?: number
};
interface ICartContents {
  _id?: string
  cartItems?: TCartItem[]
  subTotal?: number
  shippingCost?: number
  total?: number
  userId?: string
}

interface IUserCartContextFinal {
  userCart: {
    _id?: string
    cartItems?: TCartItem[]
    subTotal?: number
    shippingCost?: number
    total?: number
    userId?: string
  }
  setUserCart: (value: ICartContents) => void;
}
interface IUserCartContextValueFinal {
  userCart: ICartContents | undefined;
  setUserCart: React.Dispatch<React.SetStateAction<ICartContents | undefined>>;
} 
export const UserCartContext = createContext<IUserCartContextValueFinal>({
  userCart: {
    _id: "hello",
    cartItems: [],
    subTotal: 0,
    shippingCost: 0,
    total:  0,
    userId: "",
  },
  setUserCart: () => {},
});
// UserCart Context --



function App() {

  // Fetch User Cart with axios and set it as the Context's initial value
  const [userCart, setUserCart] = useState<ICartContents>();
  
  const UserCartContextValue:IUserCartContextValueFinal = useMemo(
    () => ({userCart, setUserCart}),
    [userCart]
  )

  const [allProducts, setAllProducts] = useState<IProductItem[]>([]);

  const AllProductsContextValue: IAllProductsContext = {
    allProducts: allProducts
  }

  // Fetches all products from /products
  const fetchAllProducts = async () => {
    const response = await axios.get("/products")
    setAllProducts(response.data);
    await fetchUserCart();
  };

  // Fetch specific user's cart data
  const loggedInUser: string = "mock-user-id"
  const fetchUserCart = async () => {
    const response = await axios.get(`/cart/${loggedInUser}`);
    await setUserCart(response.data.userCart);
    // console.log("1. App.tsx userCart: ", userCart);
  };
  
  useEffect(() => {
    // fetchUserCart();
    fetchAllProducts();
    // console.log("test: ", test)
  }, []);

  return (
    <AllProductsContext.Provider value={AllProductsContextValue}>
      <UserCartContext.Provider value={UserCartContextValue}>
        <ShoppingCartProvider>
        <p>userCart._id: {userCart?._id}</p>
        <p>userCart.subTotal: {userCart?.subTotal}</p>
          <Container className="mb-4">
            {/* <Router> */}
              <Header />
              <Routes>
                <Route path='/' element={<Home allProducts={allProducts}/>}/>
                <Route path='/about' element={<About />}/>
                <Route path='/:id' element={<ProductItem allProducts={allProducts}/>}/>
              </Routes>
            {/* </Router> */}
          </Container>
        </ShoppingCartProvider>
      </UserCartContext.Provider>
    </AllProductsContext.Provider>
  );
}

export {AllProductsContext};
export default App;
