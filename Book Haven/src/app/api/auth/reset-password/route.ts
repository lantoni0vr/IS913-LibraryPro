"use server";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation";

export const changePassword = async (resetPasswordToken: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            resetPasswordToken
        }
    })

    if(!user) {
        throw new Error('User not found');
    }

    const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
    if(!resetPasswordTokenExpiry) {
        throw new Error('Token expired');
    }

    const today = new Date();

    if(today > resetPasswordTokenExpiry) {
        throw new Error('Token expired');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            passwordHash,
            resetPasswordToken: null,
            resetPasswordTokenExpiry: null,
        }
    })
    redirect('/auth/signin/success')
   return "Password changed successfully"
}