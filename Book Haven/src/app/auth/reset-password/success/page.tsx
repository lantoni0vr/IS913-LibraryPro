
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { Button, Card, Flex } from '@radix-ui/themes'
import Link from 'next/link'

export default async function SuccessPage() {
  return (
    <main className="max-w-xl px-4 mx-auto flex flex-col justify-center h-screen">
      <Card className="gap-4 flex flex-col">
        <Flex gap="4" direction="column">
          <h1  className="text-slate-700 font-bold text-4xl mb-4">Correo enviado con éxito</h1>
          <p className="text-slate-500 mb-2 block text-xl">Si el correo no se muestra revisa la bandeja de Spam.</p>
          <Link
            href="/auth/signin"
            className="text-sm text-neutral-700/80 flex items-center p-3">
            <CaretLeftIcon />
            <span>Volver a inicio de sesión</span>
          </Link>
        </Flex>
      </Card>
    </main>
  )
}