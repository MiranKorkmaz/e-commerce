import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Offcanvas, Stack, Nav, Navbar } from "react-bootstrap";
import { AllProductsContext, UserCartContext } from "../App";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency"
import axios from "axios";
import { ICartContents } from "../interfaces/product-item"

type TShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: TShoppingCartProps) {
    let loggedInUser: string | undefined = undefined;
    loggedInUser = "6357bc05b61a410bf051a2c2"; // Has User, Has User Cart
    // loggedInUser = "6361f5292fa2f26d4df0728a" // Has User, no User Cart
    const navigate = useNavigate();
    const allProducts = useContext(AllProductsContext);
    
    const { closeCart, cartItems } = useShoppingCart();

    // User Cart Context
    const {userCart, setUserCart} = useContext(UserCartContext);

    let shippingCostPerUnit: number = 3;

    const cartContents:ICartContents = {
        _id: userCart?._id,
        subTotal: userCart?.subTotal,
        shippingCost: userCart?.shippingCost,
        total: userCart?.total,
        userId: userCart?.userId,
        cartItems: userCart?.cartItems,
    };

    const saveCartToMongoDb = async (userCart:ICartContents) => {

        //0. add cartItems to userCart.cartItems
        userCart.cartItems = cartItems;

        //1. map through userCart.cartItems and calculate:
        if(userCart) {

            // a. Apply the fields name, manufacturer, price to every product in cartItems
            await userCart?.cartItems!.map(product => {
                allProducts?.allProducts.map(allProductsItem => {
                    if(product._id === allProductsItem._id){
                        product.name = allProductsItem.name;
                        product.manufacturer = allProductsItem.manufacturer;
                        product.image = allProductsItem.pictures[0];
                        product.price = allProductsItem.price;
                        product.manufacturer = allProductsItem.manufacturer;
                    }
                })
            });

            // b. Calculate the subtotal
            userCart.subTotal = userCart?.cartItems?.reduce((total, cartItem) => {
                return total + (cartItem?.price! * cartItem.quantity);
            }, 0);
            
            // c. Calculate the shipping cost
            userCart.shippingCost = userCart?.cartItems?.reduce((total, cartItem) => {
                return total + (shippingCostPerUnit * cartItem.quantity);
            }, 0);
        
            // d. Calculate the total
            if(userCart.subTotal !== undefined && userCart.shippingCost !== undefined){
                userCart.total = userCart.subTotal + userCart.shippingCost
            };

            // e. Sets the state to the final useCart data
            setUserCart(userCart);

        };
        
        //2. Save the userCart to MongoDB (Add condition "if user is logged in" when login is finished)
        const response:ICartContents = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/cart/${cartContents.userId}`, userCart);
        return response;
    };
    

    const goToCheckout = () => {
        closeCart();
        navigate("/order");
    };

    useEffect(() => {
        if(userCart) {
            saveCartToMongoDb(userCart);
        };
    }, [cartItems]);

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
           
            <Offcanvas.Body>
                    <Stack gap={3}>
                        {cartItems.map(item => (
                            <CartItem key={item._id} {...item} />
                        ))}
                        <div className="ms-auto fw-bold fs-5">
                            Total{" "}
                            {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = allProducts?.allProducts.find(i => i._id === cartItem._id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                            )}
                        </div>
                        {cartContents.subTotal && cartContents?.subTotal > 0 && cartItems.length > 0 ? (
                        <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
                        ) : ""}
                    </Stack>
                    
                    {!loggedInUser && (
                            <Nav className='me-auto' style={{marginTop: "50px"}}>
                                <Nav.Link to="/signup" as={ NavLink } onClick={closeCart} style={{fontSize: "1rem"}} >Log in or Register to Save Your Cart Contents</Nav.Link>
                            </Nav>
                        )
                    }
                
            </Offcanvas.Body>
        </Offcanvas>
    ) 
}