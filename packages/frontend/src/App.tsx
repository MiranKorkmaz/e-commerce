/* eslint-disable array-callback-return */
import {
    useEffect,
    useState,
    createContext,
    useMemo,
} from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import IProductItem from "./interfaces/product-item";
import Home from "./pages/Home";
import ProductItem from "./pages/ProductItem";
import Header from "./components/Header";
import About from "./pages/About";
import { IAllProductsContext } from "./interfaces/product-item";
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProductByCategory } from './pages/ProductByCategory';
import { OrderPage } from "./pages/OrderPage";
import { OrdersMadePage } from "./pages/OrdersMadePage";
import { IUserCartContextValue, ICartContents } from "./interfaces/cart-item";

axios.defaults.baseURL =
    process.env.REACT_APP_SERVER_PORT || "http://localhost:4000/";

axios.interceptors.request.use((config) => {
    if (!config.headers) {
        config.headers = {};
    }
    const jwt = localStorage.getItem("backend3-ecom");
    if (jwt) {
        config.headers["authorization"] = `Bearer ${jwt}`;
    }
    return config;
});

const AllProductsContext = createContext<IAllProductsContext | null>(null);

export const UserCartContext = createContext<IUserCartContextValue>({
    userCart: {
        _id: "",
        userId: "",
        cartItems: [],
        total: 0,
        subTotal: 0,
        shippingCost: 0
    },
    setUserCart: () => { },
});

function App() {
    const [userCart, setUserCart] = useState<ICartContents>();
    const [search, setSearch] = useState("");
    const [allProducts, setAllProducts] = useState<IProductItem[]>([]);


    const UserCartContextValue: IUserCartContextValue = useMemo(
        () => ({ userCart, setUserCart }),
        [userCart]
    );

    const AllProductsContextValue: IAllProductsContext = {
        allProducts: allProducts,
    };

    const fetchAllProducts = async () => {
        const response = await axios.get(`/products/?search=${search}`);
        setAllProducts(response.data);
        if (loggedUserId) await fetchUserCart();
    };

    let loggedUserId: string | undefined = undefined;

    const token = localStorage.getItem("backend3-ecom");
    if (token) {
        const decodeJWT = (token: string) => {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        };
        loggedUserId = decodeJWT(token).user_id;

    }
    const fetchUserCart = async () => {
        const response = await axios.get(`/cart/${loggedUserId}`);
        await setUserCart(response.data.userCart);
    };

    useEffect(() => {
        fetchAllProducts();
    }, [search, token]);

    return (
        <AllProductsContext.Provider value={AllProductsContextValue}>
            <UserCartContext.Provider value={UserCartContextValue}>
                <ShoppingCartProvider>
                    <Container className="mb-4">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home setSearch={setSearch} />} />
                            <Route path="/categories" element={<ProductByCategory />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/:id"
                                element={<ProductItem allProducts={allProducts} />}
                            />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/user/:id" element={<ProfilePage />} />
                            <Route path="/orders" element={<OrderPage />} />
                            <Route path="/orders/:id" element={<OrdersMadePage />} />
                            <Route path="*" element={<h1>404 - Not Found</h1>} />
                        </Routes>
                    </Container>
                </ShoppingCartProvider>
            </UserCartContext.Provider>
        </AllProductsContext.Provider>
    );
}

export { AllProductsContext };
export default App;
