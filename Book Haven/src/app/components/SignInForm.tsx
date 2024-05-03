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
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-100">
            <div className="bg-white rounded-lg p-8 flex flex-col max-w-auto mx-auto mt-10 md:mt-0 rounde-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-300">
                <h1 className=" text-slate-700 font-bold text-4xl mb-4">Inicio de Sesión</h1>
                <label htmlFor="email" className="text-slate-600 mb-2 block text-sm ">
                    Correo:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-auto" type='text' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" className="text-slate-600 mb-2 block text-sm w-auto">
                    Contraseña:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-auto" type='password' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleSubmit} className="bg-blue-500 text-white p-3 rounded-lg mt-2 hover:bg-indigo-500">
                    Iniciar Sesión
                </button>
                <Link
                    href="/auth/reset-password"
                    className="text-sm text-neutral-700/80 flex items-center w-auto p-3"
                >
                    <CaretRightIcon />
                    <span>¿Olvidaste tu contaseña?</span>
                </Link>


                <p className='items-center justify-center flex'>{message}</p>
            </div>
        </div>
    );
};

export default SignInForm;
