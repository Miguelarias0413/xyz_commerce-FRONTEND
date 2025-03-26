import { toast } from "sonner";
import type { Product } from "../types";

type Action = 
{type : 'add-order-product', payload:{product:Product}}|
{ type: 'decrement-product-quantity', payload: { productId: number } }|
{ type: 'increment-product-quantity', payload: { productId: number } }|
{type: 'reset-order'}
type CartState = {
    products : Product[]
}


export const INITIAL_CART_STATE : CartState  = {
    products:[]

}

export function cartReducer(state = INITIAL_CART_STATE, action: Action) {
    if (action.type === 'add-order-product') {

        const productExists = state.products.find((productState) => productState.id === action.payload.product.id);
        if (productExists) {
            toast.error('Ya existe el producto en el carrito');
            return state;
        } else {
            toast.success('Producto Añadido al carrito');
            return {
            ...state,
            products: [...state.products, { ...action.payload.product, quantity: 1 }]
            };
        }
    }

    if (action.type === 'increment-product-quantity') {
        return {
            ...state,
            products: state.products.map((product) =>
                product.id === action.payload.productId
                    ? { ...product, quantity: (product.quantity ?? 0) + 1 }
                    : product
            )
        }
   
    }
    if (action.type === 'decrement-product-quantity') {
        return {
            ...state,
            products: state.products.map((product) =>
                product.id === action.payload.productId
                    ? { ...product, quantity: (product.quantity ?? 0) - 1 }
                    : product
            )
        }
   
    }

    if (action.type == 'reset-order'){
        return{
            ...state,
            products: []
        }
    }

    return state;

}