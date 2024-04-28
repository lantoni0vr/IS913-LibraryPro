import React from 'react';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white px-24 py-3">
            <ul className="text-4xl font-bold">
                <li>
                    <Link href="/">📚</Link>
                </li>
            </ul>
            <ul className="flex gap-x-2">

                {session && session.user?.email ? (
                    <>
                        <p>
                            <b className="w-full bg-blue-800 text-white p-3 rounded-lg mt-2">Identificado como {session.user?.email}</b>
                        </p>
                    </>
                ) : (
                    <>
                        <li className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                            <Link href='/auth/signin'>Iniciar</Link>
                        </li>
                        <li className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                            <Link href='/auth/register'>Registro</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
