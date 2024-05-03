
import Image from "next/image"
import { IoBrowsersOutline, IoLibrary, IoLogOut } from "react-icons/io5"
import SideBarMenuItem from "./SideBarMenuItem"
import { MdDashboard } from "react-icons/md";
//import { GiDragonBalls } from "react-icons/gi"

const menuItems = [
  {
    path: '/protected/dashboard/main',
    icon: <MdDashboard/>,
    title: 'Dashboard',
    subTitle: "Visualizacion"
  },
  {
    path: '/protected/dashboard/pdffile/pdfAdd',
    icon: <IoLibrary />,
    title: 'Agregar PDF',
    subTitle: "Nuevo"
  },
  {
    path: '/protected/dashboard/addbook',
    icon: <IoLibrary />,
    title: 'Agregar Libro',
    subTitle: "Nuevo"
  },
  {
    path: '/api/auth/signout',
    icon: <IoLogOut />,
    title: 'Cerrar Sesion',
    subTitle: "Salir"
  },
]

export const Sidebar = () => {
  console.log()
  return (
    <div
      style={{ width: "250px" }}
      className="bg-slate-100 w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex flex-col relative w-screen">
        <div id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 fixed left-0 h-screen overflow-y-scroll">
          <div id="logo" className="my-4 px-6">
            <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
              <IoLibrary className="mr-2" />
              BOOK
              <span className="text-blue-500">Haven</span>.
            </h1>
            <p className="text-slate-500 text-sm">Library</p>
          </div>
          <div id="nav" className="w-full px-6">
            {
              menuItems.map((item) => (
                <SideBarMenuItem
                  key={item.path}
                  path={item.path}
                  icon={item.icon}
                  title={item.title}
                  subTitle={item.subTitle}
                />
              ))
            }


          </div>
        </div>


      </div>
    </div>
  )
}
