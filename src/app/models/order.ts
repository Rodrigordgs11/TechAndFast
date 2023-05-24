import { Product } from "./product";

export interface Order {
    id: any;
    amount: number;
    orderNote: any;
    orderStatus: any;
    paymentMethod: any;
    orderLine: Product[];
    createdAt: any;
}