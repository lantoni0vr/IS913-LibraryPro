import { getServerSession } from 'next-auth/next';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

interface ProtectedLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email) {
        return (
            <div className="flex flex-col h-screen text-slate-700 text-2xl mb-4 p-6 bg-gradient-to-r from-blue-300 to-purple-200">
                Ruta protegida, debe iniciar sesión para poder acceder!!
            </div>
        )
    }

  return (
    <>
        {children}
    </>
  );
}

export default ProtectedLayout