
import { Sidebar } from "@/components"
//import Navbar from "@/components/NavBar"
import Image from "next/image"
import React from "react"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-slate-100 overflow-x-scroll h-screen antialiased text-slate-300
            selection:bg-blue-600 selection:text-white">
            <div className="flex">
                <Sidebar />
                {/* <Navbar/> */}
                <div className="p-2 w-full text-slate-900">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
