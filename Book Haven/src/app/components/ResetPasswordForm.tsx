"use client";
import React, { useState } from 'react'
import { resetPassword } from '../api/auth/forgot-password/route';
import Link from 'next/link';

import { CaretLeftIcon } from '@radix-ui/react-icons'


const ResetPasswordForm = () => {

    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
        const message = await resetPassword(email);

        setMessage(message);
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-purple-200">
                <h1 className=" text-slate-700 font-bold text-4xl mb-4 w-1/4">Reestablecer</h1>
                <label htmlFor="username" className="text-slate-500 mb-2 block text-sm w-1/4">
                    Ingresa correo para reestablecer contrasena:
                </label>

                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-1/4"
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubmit} className="w-1/4 bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-indigo-500">
                    Enviar correo
                </button>
                <Link
                        href="/auth/signin"
                        className="text-sm text-neutral-700/80 flex items-center w-1/4 p-3"
                    >
                        <CaretLeftIcon />
                        <span>Volver a inicio de sesión</span>
                    </Link>
                <p>{message}</p>
        </div>
    )
}

export default ResetPasswordForm