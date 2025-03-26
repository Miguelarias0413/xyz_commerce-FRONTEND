import { useEffect, useState } from "react";
import Header from "../components/Header";
import { BACKEND_URL_API } from "../constants/index";
import { toast } from "sonner";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router";

type UserResponse = {
  success: boolean;
  user: {
    created_at: string;
    email: string;
    id: number;
    is_admin: boolean;
    name: string;
    updated_at: string;
  };
};
type ResponseErrors = {
  message: string;
  errors: Errors;
};

type Errors = {
  email: string[];
  password: string[];
  name: string[];
};

export default function Authenticate() {
  const [isLoginActivated, setIsLoginActivated] = useState<boolean>(false);
  const { checkAuthStatus, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated){
      navigate('/landing')
      toast.warning("Ya estás registrado mi rey")
    }
    
  });

  const handleToggleForm = () => {
    setIsLoginActivated(!isLoginActivated);
  };
  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetch(`${BACKEND_URL}/sanctum/csrf-cookie`).then(response => {

    // });
    const formData = new FormData(e.target as HTMLFormElement);
    const loginUserData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`${BACKEND_URL_API}/user/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginUserData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ResponseErrors = await response.json();
        if (errorData.errors) {
          Object.values(errorData.errors).forEach((err) => {
            toast.error(err);
          });
        } else {
          throw new Error(errorData.message);
        }
      }

      const data: { message: string } = await response.json();

      toast.success(data.message);
      checkAuthStatus();
    } catch (error) {
      toast.error("Ocurrio un error");
    }
  };
  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const registerUserData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      is_admin: formData.get("is_admin") === "true",
    };

    try {
      const response = await fetch(`${BACKEND_URL_API}/user/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(registerUserData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData: ResponseErrors = await response.json();
        Object.values(errorData.errors).forEach((error) => {
          toast.error(error);
        });
      }

      const { success }: UserResponse = await response.json();

      if (success) {
        toast.success("El usuario se ha creado correctamente");
        setIsLoginActivated(!isLoginActivated);
        checkAuthStatus();
      }
    } catch (error) {}
  };
  return (
    <>
      <Header />
      {isLoginActivated && (
        <section className=" w-full h-[80vh]  flex items-center justify-center ">
          <form
            onSubmit={handleLoginUser}
            className=" w-80 min-h-96 md:w-11/12 md:max-w-[500px]  flex flex-col items-center py-2  rounded-2xl bg-black-100 bg-gray-900 gap-10 shadow-2xl  "
          >
            <h1 className=" text-xl font-black uppercase text-amber-400">
              Iniciar sesión{" "}
            </h1>
            <div className=" w-full px-2 ">
              <label htmlFor="email" className="text-white">
                Correo Electronico
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="password" className="text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>

            <div className=" w-full px-2 flex items-center justify-center ">
              <button className="bg-amber-400 font-bold text-white px-10 py-2 rounded-2xl cursor-pointer">
                Ingresar
              </button>
            </div>
            <div className=" w-full px-2 text-white underline  ">
              <p className="cursor-pointer" onClick={handleToggleForm}>
                ¿No estas registrado?{" "}
                <span className="text-green-400">Registrate</span>{" "}
              </p>
            </div>
          </form>
        </section>
      )}
      {!isLoginActivated && (
        <section className=" w-full h-[80vh]  flex items-center justify-center ">
          <form
            onSubmit={handleRegisterUser}
            className=" w-80 min-h-96 md:w-11/12 md:max-w-[500px]  flex flex-col items-center py-2  rounded-2xl bg-black-100 bg-gray-900 gap-10 shadow-2xl  "
          >
            <h1 className=" text-xl font-black uppercase text-green-400">
              Registrarse{" "}
            </h1>
            <div className=" w-full px-2 ">
              <label htmlFor="name" className="text-white">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="email" className="text-white">
                Correo Electronico
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="password" className="text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="is_admin" className="text-white">
                ¿Desea ser administrador?
              </label>
              <select
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300 text-gray-600"
                name="is_admin"
                id="is_admin"
              >
                <option value="" disabled defaultValue={'Seleccione Si/No'}>
                  Seleccione Si/No
                </option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className=" w-full px-2 flex items-center justify-center ">
              <button className="bg-green-400 font-bold text-white px-10 py-2 rounded-2xl cursor-pointer">
                Crear cuenta
              </button>
            </div>
            <div className=" w-full px-2 text-white underline  ">
              <p className="cursor-pointer w-fit" onClick={handleToggleForm}>
                ¿Ya estás registrado?{" "}
                <span className="text-amber-400">Inicia sesion</span>{" "}
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
