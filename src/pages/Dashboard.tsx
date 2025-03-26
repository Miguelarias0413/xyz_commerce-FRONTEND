import { useEffect, useState } from "react";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import { BACKEND_URL_API } from "../constants/index";
import { toast } from "sonner";

type UsersResponse = {
  success: boolean;
  users?: User[];
};

type User = {
  id: number;
  email: string;
  name: string;
};

type ProductsResponse = {
  success: boolean;
  products?: Product[];
};

type Product = {
  id: number;
  name: string;
  stock: number;
};

export default function Dashboard() {
  const { isAdmin, user } = useUser();

  const [usersSelect, setUsersSelect] = useState<UsersResponse["users"]>([]);
  const [productsSelect, setProductsSelect] = useState<ProductsResponse["products"]>([]);

  useEffect(() => {
    if (isAdmin) {
      getAllUsers();
      getAllProducts();
    }
  }, [isAdmin]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL_API}/getAllUsers`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: UsersResponse = await response.json();

      if (!data.success) {
        toast.error("No se pudieron traer los usuarios, actualice");
        throw new Error();
      }

      setUsersSelect(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL_API}/getAllProducts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: ProductsResponse = await response.json();

      console.log(data);
      

      if (!data.success) {
        toast.error("No se pudieron traer los productos, actualice");
        throw new Error();
      }

      setProductsSelect(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const associateUserProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const userProductData = {
      'userID' : formData.get('userID'),
      'productID' : formData.get('productID')

    }

    const response = await fetch(`${BACKEND_URL_API}/addUserProduct`,{
      'method': 'POST',
      'credentials' : 'include',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      'body': JSON.stringify(userProductData)
     
    })

    const data: {message :string, success: boolean} = await response.json();
    

    if (!data.success){
      toast.error(data.message);
    }

    toast.success(data.message);
    
    
  }

  return (
    <main className=" h-screen w-full bg-slate-800">
      <Header>
        <>
          <nav className=" h-18 bg-slate-950 w-full flex items-center justify-between px-4 ">
            <h2 className=" text-white font-bold">
              {" "}
              <span className=" text-green-400">
                Panel de administrador
              </span>{" "}
            </h2>

            {isAdmin && (
              <div className=" h-full text-white flex items-center">
                {user?.name}
              </div>
            )}
          </nav>
        </>
      </Header>

      <section className=" bg-slate-100/40 w-full min-h-150 flex flex-col justify-around">
        <form onSubmit={associateUserProduct} className=" w-full h-90 bg-white flex flex-col">
          <h2 className=" bg-amber-200 text-center text-2xl text-slate-900 font-bold ">
            Asociar Clientes Con producto
          </h2>
          <div className=" w-full h-full flex flex-col md:flex-row justify-evenly items-center">
            <div className=" flex flex-col h-fit justify-center bg-gray-800 px-10  py-10 ">
              <label className="text-center text-white" htmlFor="userID">
                Seleccionar cliente
              </label>
              <select
                name="userID"
                className="outline-0 bg-white border-2 w-80 border-amber-500"
                id="userID"
              >
                {usersSelect?.length== 0 
                ?
                (<option className="text-gray-500" disabled defaultValue={'No hay Usuarios aún'} ></option>)
                :
                (<option className="text-gray-500" disabled defaultValue={'Seleccione un usuario'}></option>)

                }
                {usersSelect?.map((optionUser) => (
                   <option key={optionUser.id} value={optionUser.id}> {optionUser.name}</option>
                ))}
              </select>
            </div>
            <div className=" flex flex-col h-fit justify-center bg-gray-800 px-10  py-10 ">
              <label className="text-center text-white" htmlFor="productID">
                Seleccionar producto
              </label>
              <select
                name="productID"
                className="outline-0 bg-white border-2 w-80 border-amber-500"
                id="productID"
              >
                {productsSelect?.length== 0 
                ?
                (<option className="text-gray-500" disabled  defaultValue={'No hay productos aún'}>No hay productos aún</option>)
                :
                (<option className="text-gray-500" disabled defaultValue={'Seleccione un producto'}>Seleccione un producto</option>)

                }

                {productsSelect?.map((optionProduct) => (
                   <option key={optionProduct.id} value={optionProduct.id}> {optionProduct.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button className=" mx-auto my-4 text-white w-40 bg-green-600 px-3 py-2 rounded cursor-pointer hover:bg-green-400">
            Asociar
          </button>
        </form>


        
      </section>
    </main>
  );
}