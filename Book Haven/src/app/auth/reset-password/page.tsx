import ChangePasswordForm from '@/app/components/ChangePasswordForm';
import ResetPasswordForm from '@/app/components/ResetPasswordForm';
import prisma from '@/app/lib/prisma';
import React from 'react';

interface ResetPasswordPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
    if (searchParams.token) {
        const user = await prisma.user.findUnique({
            where: {
                resetPasswordToken: searchParams.token as string,
            },
        });
        if (!user) {
            return <div className="flex flex-col h-screen text-slate-700 text-2xl mb-4 p-6">
                Lo sentimos el token ha expirado!!
            </div>;
        }

        return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
    } else {
        return <ResetPasswordForm />;
    }
};

export default ResetPasswordPage;
