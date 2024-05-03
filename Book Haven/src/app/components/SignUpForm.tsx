'use client';

import React, { useEffect, useState } from 'react';
import { signUp } from '../api/auth/register/route';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter()

    const isValidEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    const handleSubmit = async () => {
        if (password == "" || email == "") {
            setMessage('Por favor rellene los campos vacios')
            return
        }
        if (!isValidEmail(email)) {
            setMessage("Por favor ingrese un correo electrónico válido");
            return
        }
        if (password !== confirmPassword) {
            setMessage("Las contrasenas no coinciden")
            return
        }

        if (password.length < 5) {
            setMessage("La contraseña debe tener al menos 5 caracteres");
            return;
        }
        setMessage("Registrando...");
        const message = await signUp(email, username, password);
        setMessage(message);
    };


    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-100">
            <div className="bg-white rounded-lg p-8 flex flex-col max-w-auto mx-auto mt-10 md:mt-0 rounde-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-300">
                <h1 className=" text-slate-700 font-bold text-4xl mb-4 ">Registro</h1>
                <label htmlFor="email" className="text-slate-600 mb-2 block text-sm ">
                    Correo:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
                    type='text' placeholder='correo' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="username" className="text-slate-600 mb-2 block text-sm ">
                    Usuario:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
                    type='text' placeholder='usuario' value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label htmlFor="password" className="text-slate-600 mb-2 block text-sm">
                    Contraseña:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300"
                    type='password' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label htmlFor="confirmPassword" className="text-slate-600 mb-2 block text-sm ">
                    Confirmar Contraseña:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
                    type="password" placeholder="*******" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                <button onClick={handleSubmit} className="w-auto bg-blue-500 text-white p-3 rounded-lg mt-2">
                    Regitrar
                </button>

                <p className='p-4'>{message}</p>
            </div>
        </div>
    );
};

export default SignUpForm;
