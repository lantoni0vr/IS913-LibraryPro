"use client";
import React, { useState } from 'react'
import { changePassword } from '../api/auth/reset-password/route';

interface ChangePasswordFormProps {
    resetPasswordToken: string;
}

const ChangePasswordForm = ({ resetPasswordToken }: ChangePasswordFormProps) => {

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
        if (password == "" || confirmPassword == "") {
            setMessage('Por favor rellene los campos vacios')
            return
        }
        if (password.length < 5) {
            setMessage("La contraseña debe tener al menos 5 caracteres");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Las contrasenas no coinciden")
            return
        }

        const message = await changePassword(resetPasswordToken, password);

        setMessage(message);
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-100">
            <div className="bg-white rounded-lg p-8 flex flex-col max-w-auto mx-auto mt-10 md:mt-0 rounde-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-300">
                <h1 className=" text-slate-700 font-bold text-4xl mb-4">Reestablecer</h1>
                <label htmlFor="password" className="text-slate-600 mb-2 block text-sm">
                    Cambio de contraseña:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSubmit} className=" bg-blue-500 text-white p-3 rounded-lg mt-2">
                    Cambiar contraseña
                </button>
                <p className='p-4'>{message}</p>
            </div>
        </div>
    )
}

export default ChangePasswordForm