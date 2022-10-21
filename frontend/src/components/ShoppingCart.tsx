import { useContext } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { AllProductsContext } from "../App";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency"

type TShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: TShoppingCartProps) {
    const allProducts = useContext(AllProductsContext);

    const { closeCart, cartItems } = useShoppingCart();
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

                    <div className="ms-auto fw-bold fs-5">Total:{" "}  
                    {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = allProducts?.allProducts.find(item => item._id === cartItem._id)
                        return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                        )} 
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    ) 
}