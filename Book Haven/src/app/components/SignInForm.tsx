'use client';

import React, { useEffect, useState } from 'react';
import { signUp } from '../api/auth/register/route';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CaretRightIcon } from '@radix-ui/react-icons';

const SignInForm = () => {
    const router = useRouter();

    const { status } = useSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        //setMessage('Signing in...');

        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (!signInResponse || signInResponse.ok !== true) {
                setMessage("Invalid credentials");
            } else {
                router.refresh();
            }
            if (email == '' || password == '') {
                setMessage('Por favor debe rellenar ambos espacios')
                return
            }
            if (!email) {
                setMessage('Este correo no está registrado')
                return
            }
            

        } catch (err) {
            console.log(err);
            setMessage('Error al iniciar sesión');
        }


    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            setMessage('Iniciando sesión...');
            router.push('/protected/dashboard');
        }
    }, [status]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className=" text-slate-700 font-bold text-4xl mb-4 w-1/4">Inicio de Sesión</h1>
            <label htmlFor="email" className="text-slate-500 mb-2 block text-sm w-1/4">
                Correo:
            </label>
            <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-1/4" type='text' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password" className="text-slate-500 mb-2 block text-sm w-1/4">
                Contraseña:
            </label>
            <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-1/4" type='password' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit} className="w-1/4 bg-blue-500 text-white p-3 rounded-lg mt-2">
                Iniciar Sesión
            </button>
            <Link
                href="/auth/reset-password"
                className="text-sm text-neutral-700/80 flex items-center w-1/4 p-3"
            >
                <CaretRightIcon />
                <span>¿Olvidaste tu contaseña?</span>
            </Link>


            <p>{message}</p>
        </div>
    );
};

export default SignInForm;
