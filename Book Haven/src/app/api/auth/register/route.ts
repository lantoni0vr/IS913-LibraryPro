'use server';

import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { VerifyEmailEmailTemplate } from '@/app/email-templates/verify-email-email';
import { sendEmail } from '@/app/actions/emails/sendEmail';
import { redirect } from 'next/navigation'

export const signUp = async (email: string, username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return 'El correo ya existe';
    }
    const usernameFound = await prisma.user.findUnique({
        where: {
            username,
        }
    });
    if (usernameFound) {
        return 'Nombre de usuario ya existe'
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    
    const createdUser = await prisma.user.create({
        data: {
            email,
            username,
            passwordHash,
        },
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    await prisma.user.update({
        where: {
            id: createdUser.id
        },
        data: {
            emailVerificationToken: emailVerificationToken,
        }
    })

    await sendEmail({
        from: 'Solicitud de reestablecimiento de contraseña <onboarding@resend.dev>',
        to: ['lazaro.vasquez@unah.hn'],
        subject: 'Verify your email address',
        react: VerifyEmailEmailTemplate({email, emailVerificationToken}) as React.ReactElement
    });

    redirect('/auth/register/success')
    return "Nuevo usuario creado exitosamente!";
};
