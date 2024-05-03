

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import React from 'react'

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)
  return (
    <section className="h-screen flex justify-center items-center text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-200">
      <ul className="flex gap-x-2">

        {session && session.user?.email ? (
          <>
            <p>
              <b className="w-full text-slate-800 text-2xl p-3 rounded-lg mt-2">Bienvenido/a {session.user?.email}</b>
            </p>
          </>
        ) : (
          <>
          </>
        )}
      </ul>
    </section>
  )
}

export default DashboardPage