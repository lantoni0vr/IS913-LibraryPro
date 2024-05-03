import ChangePasswordForm from '@/app/components/ChangePasswordForm';
import ResetPasswordForm from '@/app/components/ResetPasswordForm';
import prisma from '@/lib/prisma';
import React from 'react';

interface VerifyEmailPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
    if (searchParams.token) {
        const user = await prisma.user.findUnique({
            where: {
                emailVerificationToken: searchParams.token as string,
            },
        });
        if (!user) {
            return <div className="flex flex-col h-screen text-slate-700 font-bold text-2xl mb-4 p-6">
                Lo sentimos el token no es valido!!
            </div>;
        }

        await prisma.user.update({
            where: {
                emailVerificationToken: searchParams.token as string,
            },
            data: {
                emailVerified: true,
                emailVerificationToken: null
            }
        })

        return (
            <div>
                <h1 className="flex flex-col h-screen text-slate-700 text-2xl mb-4 p-6">
                   <span>El correo <span className='font-semibold'>{user.email}</span> ha sido verificado</span> 
                </h1>
            </div>
        )
    } else {
        return (
            <div>
                
                <label className="flex flex-col h-screen text-slate-700 text-2xl mb-4 p-6">
                    No se encontró ningún token de verificación de correo electrónico. Revise su correo electrónico.</label>
            </div>
        )
    }
};

export default VerifyEmailPage;
