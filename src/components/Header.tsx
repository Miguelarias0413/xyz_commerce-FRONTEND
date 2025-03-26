import logo from "../assets/incloud.png"
import { Link } from "react-router"
export default function Header({children}: {children?: React.ReactNode}) {
  return (
   <>
    <header className="h-24 bg-slate-900 text-amber-300 shadow-2xl flex items-center justify-between text-4xl font-bold px-8"  >
       <Link to={'/landing'}>
         XYZ Eccomerce
       </Link>
        <img src={logo} alt="" />
    </header>
    {children}
   </>
  )
}
