import { useContext } from "react";
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext";
import { AllProductsContext } from "../App";
import { formatCurrency } from "../utilities/formatCurrency"
import { TCartItemProps } from "../interfaces/cart-item";

export function CartItem({ _id, quantity }: TCartItemProps) {
    const allProducts = useContext(AllProductsContext);

    const { removeFromCart } = useShoppingCart();
    const item = allProducts?.allProducts.find(item => item._id === _id);

    if (item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.pictures[0]} alt={item.name} style={{ width: "125px", height: "auto", objectFit: "cover" }} />
            <div className="me-auto">
                <div>
                    {item.name} {quantity > 1 && <span className="text-muted" style={{ fontSize: "1rem" }}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>{formatCurrency(item.price)}</div>
                <div>TOTAL: {formatCurrency(item.price * quantity)}</div>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item._id!)}
                >
                    &times;
                </Button>
            </div>
        </Stack>
    )
}