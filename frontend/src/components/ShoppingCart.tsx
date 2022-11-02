import { useContext, useEffect, useState } from "react";
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
    const navigate = useNavigate();
    const allProducts = useContext(AllProductsContext);

    const { closeCart, cartItems } = useShoppingCart();
    const { userCart, setUserCart } = useContext(UserCartContext);

    
    let shippingCostPerUnit: number = 3;

    const cartContents: ICartContents = {
        _id: userCart?._id,
        subTotal: userCart?.subTotal,
        shippingCost: userCart?.shippingCost,
        total: userCart?.total,
        userId: userCart?.userId,
        cartItems: userCart?.cartItems,
    };

    const saveCartToMongoDb = async (userCart: ICartContents) => {
        userCart.cartItems = cartItems;
        if (userCart) {
            await userCart?.cartItems!.map(product => {
                allProducts?.allProducts.map(allProductsItem => {
                    if (product._id === allProductsItem._id) {
                        product.name = allProductsItem.name;
                        product.manufacturer = allProductsItem.manufacturer;
                        product.image = allProductsItem.pictures[0];
                        product.price = allProductsItem.price;
                        product.manufacturer = allProductsItem.manufacturer;
                    }
                })
            });
            userCart.subTotal = userCart?.cartItems?.reduce((total, cartItem) => {
                return total + (cartItem?.price! * cartItem.quantity);
            }, 0);
            userCart.shippingCost = userCart?.cartItems?.reduce((total, cartItem) => {
                return total + (shippingCostPerUnit * cartItem.quantity);
            }, 0);
            if (userCart.subTotal !== undefined && userCart.shippingCost !== undefined) {
                userCart.total = userCart.subTotal + userCart.shippingCost
            };
            setUserCart(userCart);

        };
        const response: ICartContents = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/cart/${cartContents.userId}`, userCart);
        return response;
    };

    // ORDER *********************************************************************

    axios.defaults.baseURL =
    process.env.REACT_APP_SERVER_PORT || "http://localhost:4000";
    
    const [order, setOrder] = useState([]);

    const handleOrder = async () => {

        console.log("GOT INTO HANDLE ORDER 1");
        console.log(`loggedUserId: ${loggedUserId}`);

        await axios.delete("orders/" + loggedUserId);

        const { data } = await axios.post("/orders", {
           products: cartItems,
           owner: loggedUserId,
           status: "pending",
           shippingCost: 0,
           total: 0,
           count: 0,
           date: new Date(),
           address: loggedUserId,
        });

        console.log("GOT INTO HANDLE ORDER 2");
        setOrder(data);
        // navigate("/orders");
    };
 

    //*************************************************************************** */




    const goToCheckout = () => {
        handleOrder();
        console.log("GOT INTO GO TO CHECKOUT");
        closeCart();
        navigate("/orders");
    };

    useEffect(() => {
        if (userCart) {
            saveCartToMongoDb(userCart);
        };
    }, [cartItems, token, loggedUserId]);

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

                {!loggedUserId && (
                    <Nav className='me-auto' style={{ marginTop: "50px" }}>
                        <Nav.Link to="/signup" as={NavLink} onClick={closeCart} style={{ fontSize: "1rem" }} >Log in or Register to Save Your Cart Contents</Nav.Link>
                    </Nav>
                )
                }

            </Offcanvas.Body>
        </Offcanvas>
    )
}