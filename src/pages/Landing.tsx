import { NavLink } from "react-router";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import { BACKEND_URL_API } from "../constants";
import { toast } from "sonner";
import { useEffect, useReducer, useState } from "react";
import type { Product } from "../types";
import { cartReducer, INITIAL_CART_STATE } from "../reducers/cartReducer";
export interface ResponseErrors {
  products: Product[];
  success: boolean;
}

export default function Landing() {
  const [productsCart, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);
  const [productsAssociated, setProductsAssociated] = useState<Product[]>([]);
  const { user, isAdmin, checkAuthStatus } = useUser();

  useEffect(() => {
    fetchProductsAssociatedToUser();
  }, []);

  const logOut = async () => {
    toast.info("Cerrando Sesion");
    const response = await fetch(`${BACKEND_URL_API}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data: { message: string; success: boolean } = await response.json();
    if (response.ok && data.success) {
      toast.success(data.message);
    } else {
      toast.error("Ocurrio un error al cerrar sesión");
    }

    checkAuthStatus();
  };

  const fetchProductsAssociatedToUser = async () => {
    const response = await fetch(`${BACKEND_URL_API}/associateProductsToUser`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Error a cargar los productos de el usuario");
    }

    const data: ResponseErrors = await response.json();

    setProductsAssociated(data.products);
  };

  const handleCreateOrder = () => {
    console.log(productsCart);

    fetch(`${BACKEND_URL_API}/`)
  };

  return (
    <>
      <Header>
        <>
          <nav className=" h-18 bg-slate-800 w-full flex items-center justify-between px-4 ">
            <h2 className=" text-white font-bold">
              {" "}
              Bienvenido <span className=" text-green-400">
                {user?.name}
              </span>{" "}
            </h2>

            <div className=" h-full text-white flex items-center gap-x-2">
              {isAdmin ? (
                <NavLink
                  to="/dashboard"
                  className=" bg-green-600 px-3 py-2 rounded cursor-pointer hover:bg-green-400"
                >
                  Dashboard
                </NavLink>
              ) : undefined}
              <button
                onClick={logOut}
                className=" bg-red-600 px-3 py-2 rounded cursor-pointer hover:bg-red-400"
              >
                Logout
              </button>

              <div className="relative group">
                <button className="relative bg-gray-800 px-3 py-2 rounded cursor-pointer hover:bg-gray-600 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21h6"
                    />
                  </svg>
                </button>
                <div className=" hover:flex absolute right-0 top-7 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg hidden group-hover:flex flex-col">
                  {productsCart.products.length > 0 ? (
                    productsCart.products.map((productCart) => (
                      <div
                        key={productCart.id}
                        className="p-2 text-gray-800 flex items-center justify-between"
                      >
                        {productCart.name}
                        <div className="flex items-center gap-x-2">
                          <button
                            onClick={
                              (productCart.quantity ?? 0) > 0
                                ? () =>
                                    dispatch({
                                      type: "decrement-product-quantity",
                                      payload: { productId: productCart.id },
                                    })
                                : undefined
                            }
                            className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded hover:bg-red-400"
                          >
                            -
                          </button>
                          <span>{productCart.quantity}</span>
                          <button
                            onClick={
                              (productCart.quantity ?? 0) <
                              (productsAssociated.find(
                                (prodAsc) => prodAsc.id == productCart.id
                              )?.stock ?? 0)
                                ? () =>
                                    dispatch({
                                      type: "increment-product-quantity",
                                      payload: { productId: productCart.id },
                                    })
                                : undefined
                            }
                            className=" cursor-pointer bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-600 ">
                      No hay productos en el carrito
                    </div>
                  )}
                  <button
                  disabled={productsCart.products.length <= 0}
                    onClick={handleCreateOrder}
                    className="bg-blue-600 disabled:bg-gray-600 disabled:opacity-20 my-2 mx-5  text-white px-3 py-2 rounded cursor-pointer hover:bg-blue-400"
                  >
                    Crear Orden
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </>
      </Header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {productsAssociated.length > 0 ? (
          productsAssociated.map((product) => (
            <article key={product.id} className=" border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p>ID: {product.id}</p>
              <p>Stock: {product.stock}</p>
              <button
                onClick={() => {
                  dispatch({
                    type: "add-order-product",
                    payload: { product: product },
                  });
                }}
                className="mt-2 mx-auto cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
              >
                Añadir al carrito
              </button>
            </article>
          ))
        ) : (
          <div className="flex items-center justify-center col-span-full h-[60vh] text-gray-500 text-4xl font-black  ">
            No tienes productos disponibles aun para tu orden
          </div>
        )}
      </main>
    </>
  );
}
