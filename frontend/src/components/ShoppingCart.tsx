import { useContext, useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
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

export function ShoppingCart({ isOpen }: TShoppingCartProps) {
    const allProducts = useContext(AllProductsContext);
    const { closeCart, cartItems } = useShoppingCart();

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
        cartItems.find(cartProduct => {
            allProducts?.allProducts.map(product => {
                if(product._id === cartProduct._id) {
                    cartContents?.cartItems?.map(cartItem => {
                        cartItem.name = product.name;
                        cartItem.manufacturer = product.manufacturer;
                        cartItem.image = product.pictures[0];
                    });
                }
            })
        })
    };

    const updateCartContents = (cartContents:ICartContents, cartItems:TCartItem[]) => {
        cartContents.cartItems = cartItems;
        addProductDetailsToCartContent(cartItems);
        cartContents.total = cartContents.subTotal! + cartContents.shippingCost!;
    }

    const saveCartToMongoDb = async (cartContents:ICartContents) => {
        await updateCartContents(cartContents, cartItems);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/cart/${cartContents.userId}`, cartContents);
        return response;
    };
    const getUserCart = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_PORT}/cart/${cartContents.userId}`);
        return response;
    }


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
                    
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    ) 
}