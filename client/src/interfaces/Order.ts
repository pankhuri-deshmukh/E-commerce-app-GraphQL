import { Product } from "./Product";

export interface Order{
    order_id: number;
    payment_status: string;
    total_amount: number;
    //user: User??
}

export interface OrderItem {
    item_id: number;
    quantity: number;
    subtotal: number;
    product: Product;
    order: Order;

}

export interface OrderProps {
    order: Order
}


