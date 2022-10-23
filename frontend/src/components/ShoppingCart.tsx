import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { AllProductsContext } from "../App";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency"
import axios from "axios";

type TShoppingCartProps = {
    isOpen: boolean
}

type TCartItem = {
    _id: string
    quantity: number
    name?: string
    manufacturer?: string
    image?: string
};
interface ICartContents {
    _id?: string
    cartItems?: TCartItem[]
    subTotal?: number
    shippingCost?: number
    total?: number
    userId?: string
}

export const UserCartContext = createContext<ICartContents | null>(null);

export function ShoppingCart({ isOpen }: TShoppingCartProps) {
    const navigate = useNavigate();
    const allProducts = useContext(AllProductsContext);
    const { closeCart, cartItems } = useShoppingCart();

    
    // User Cart Context
    const [userCart, setUserCart] = useState<ICartContents>({});
    interface IUserCartContext {
        userCart: ICartContents
    }
    const UserCartContextValue: IUserCartContext = {
        userCart: userCart
    }


    let totalOrder:number = 0;
    let mockUserId: string = "mock-user-id";

    const cartContents:ICartContents = {};
    cartContents.subTotal = totalOrder;
    cartContents.shippingCost = 0;
    cartContents.userId = mockUserId;

    const updateShppingCost = (cartItems:TCartItem[]) => {
        let totalShippingCost = 0;
        let shippingCost = 3;

        if(cartItems.length > 0 ) {
            let totalItems:number = 0;
            cartItems.map(items => totalItems = totalItems + items.quantity);
            totalShippingCost = shippingCost * totalItems;
        }
        cartContents.shippingCost = totalShippingCost;
            
        return cartContents.shippingCost
    };

    const addProductDetailsToCartContent = (cartItems:TCartItem[]) => {
        cartItems.map(product => {
            allProducts?.allProducts.map(allProductsItem => {
                if(product._id === allProductsItem._id){
                    product.name = allProductsItem.name;
                    product.manufacturer = allProductsItem.manufacturer;
                    product.image = allProductsItem.pictures[0];
                }
            })
            
        })
    };

    const updateCartContents = (cartContents:ICartContents, cartItems:TCartItem[]) => {
        cartContents.cartItems = cartItems; // Adds an array with the product items in the cart
        cartContents.total = cartContents.subTotal! + cartContents.shippingCost!; // Adds the total
        addProductDetailsToCartContent(cartContents.cartItems);
    }

    const saveCartToMongoDb = async (cartContents:ICartContents) => {
        await updateCartContents(cartContents, cartItems);
        const response:ICartContents = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/cart/${cartContents.userId}`, cartContents);
        // setUserCart(response);
        return response;
    };
    const getUserCart = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PORT}/cart/${cartContents.userId}`);
        return response;
    }

    const goToCheckout = () => {
        console.log(cartContents);
        navigate("/checkout");
    };

    useEffect(() => {
        saveCartToMongoDb(cartContents);
    }, [cartItems]);

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={5}>
                    {cartItems.map(item => (
                        <CartItem key={item._id} {...item} />
                    ))}
                    { updateShppingCost(cartItems) > 0 && (
                        <div className="ms-auto fw-bold fs-7 text-muted">{`Shipping Cost: ${updateShppingCost(cartItems) > 0 ? formatCurrency(updateShppingCost(cartItems)) : ""}`}</div>
                    )}
                    <div className="ms-auto fw-bold fs-5">Total:{" "}  
                    {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = allProducts?.allProducts.find(item => item._id === cartItem._id);
                        cartContents.subTotal = total + (item?.price || 0) * cartItem.quantity;
                        return total + (item?.price || 0) * cartItem.quantity;
                        }, 0)
                        +  updateShppingCost(cartItems))} 
                    </div>
                    {cartContents.subTotal > 0 && (
                        <Button onClick={goToCheckout}>CHECKOUT</Button>
                    )}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    ) 
}

