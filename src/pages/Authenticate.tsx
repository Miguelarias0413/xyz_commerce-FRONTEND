import { useState } from "react";
import Header from "../components/Header";
import {BACKEND_URL_API} from "../constants/index"
// type FormUserData = {

// }
export default function Authenticate() {
  const [isLoginActivated, setIsLoginActivated] = useState<boolean>(true);

  const INITIAL_LOGIN_USER_DATA = { email: null, password: null }
  const [loginUserData, setLoginUserData] = useState(INITIAL_LOGIN_USER_DATA);

  const INITIAL_REGISTER_USER_DATA = { email: null, password: null, isAdministrator:null }
  const [registerUserData, setRegisterUserData] = useState(INITIAL_REGISTER_USER_DATA);

  const handleToggleForm = () => {
    setIsLoginActivated(!isLoginActivated);
    setLoginUserData(INITIAL_LOGIN_USER_DATA)
    setRegisterUserData(INITIAL_REGISTER_USER_DATA)
  };
  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    console.log(Object.fromEntries(formData.entries()));
    
  }
  const handleRegisterUser = (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    console.log(Object.fromEntries(formData.entries()));
    
    
    fetch(BACKEND_URL_API, {

    })
  }
  return (
    <>
      <Header />

      {isLoginActivated && (
        <section className=" w-full h-[80vh]  flex items-center justify-center ">
          <form onSubmit={handleLoginUser} className=" w-80 min-h-96 md:w-11/12 md:max-w-[500px]  flex flex-col items-center py-2  rounded-2xl bg-black-100 bg-gray-900 gap-10 shadow-2xl  ">
            <h1 className=" text-xl font-black uppercase text-amber-400">
              Iniciar sesión{" "}
            </h1>
            <div className=" w-full px-2 ">
              <label htmlFor="emailLogin" className="text-white">
                Correo Electronico
              </label>
              <input
                type="text"
                id="emailLogin"
                name="emailLogin"

                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="passwordLogin" className="text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="passwordLogin"
                name="passwordLogin"

                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>

            <div className=" w-full px-2 flex items-center justify-center ">
              <button  className="bg-amber-400 font-bold text-white px-10 py-2 rounded-2xl cursor-pointer">
                Ingresar
              </button>
            </div>
            <div className=" w-full px-2 text-white underline  ">
              <p className="cursor-pointer" onClick={handleToggleForm}>
                ¿No estas registrado?  <span className="text-green-400">Registrate</span> {" "}
              </p>
            </div>
          </form>
        </section>
      )}
      {!isLoginActivated && (
        <section className=" w-full h-[80vh]  flex items-center justify-center ">
          <form onSubmit={(handleRegisterUser)} className=" w-80 min-h-96 md:w-11/12 md:max-w-[500px]  flex flex-col items-center py-2  rounded-2xl bg-black-100 bg-gray-900 gap-10 shadow-2xl  ">
            <h1 className=" text-xl font-black uppercase text-green-400">
              Registrarse{" "}
            </h1>
            <div className=" w-full px-2 ">
              <label htmlFor="emailRegister" className="text-white">
                Correo Electronico
              </label>
              <input
                type="text"
                id="emailRegister"
                name="emailRegister"

                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="passwordRegister" className="text-white">
                Contraseña
              </label>
              <input
                type="password"
                id="passwordRegister"
                name="passwordRegister"
                
                className=" bg-white w-[100%] h-8 px-2 outline-amber-300"
              />
            </div>
            <div className=" w-full px-2 ">
              <label htmlFor="isAdministrator" className="text-white">
                ¿Desea ser administrador?
              </label>
              <select className=" bg-white w-[100%] h-8 px-2 outline-amber-300 text-gray-600"  name="isAdministrator" id="isAdministrator">
                <option defaultValue={''} hidden disabled>seleccione Si/No</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className=" w-full px-2 flex items-center justify-center ">
              <button  className="bg-green-400 font-bold text-white px-10 py-2 rounded-2xl cursor-pointer">
                Crear cuenta
              </button>
            </div>
            <div className=" w-full px-2 text-white underline  ">
              <p className="cursor-pointer w-fit" onClick={handleToggleForm}>
                ¿Ya estás registrado? <span className="text-amber-400">Inicia sesion</span> {" "}
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
