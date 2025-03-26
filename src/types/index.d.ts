export type User = {
    id:number;
    name: string;
    email: string;
    isAuthenticated: boolean;
    isAdministrator: boolean;
}

export interface Product {
    id: number;
    name: string;
    stock: number;
    created_at: Date;
    updated_at: Date;
    pivot: Pivot;
    quantity?: number
  }
  
  export interface Pivot {
    user_id: number;
    product_id: number;
  }