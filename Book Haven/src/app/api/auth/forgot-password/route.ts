'use server';

import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '../../../actions/emails/sendEmail';
import { ResetPasswordEmailTemplate } from '@/app/email-templates/reset-password-email';
import { redirect } from 'next/navigation';

export const resetPassword = async (email: string) => {
    console.log('Resetting password for ' + email);

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    //   if (!user) {
    //     return {
    //       error: 'Este correo no está registrado',
    //     }
    //   }
    if(!user) {
        throw new Error('User not found');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1)); // 24 hours from now

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiry: expiryDate
        }
    })

    await sendEmail({
        from: 'Reestablecimiento de Contraseña <onboarding@resend.dev>',
        to: ["lazaro.vasquez@unah.hn"],
        subject: 'Solicitud de restablecimiento de contraseña',
        react: ResetPasswordEmailTemplate({email, resetPasswordToken}) as React.ReactElement
    });

    redirect('/auth/reset-password/success')
    return "Password reset email sent"
};
