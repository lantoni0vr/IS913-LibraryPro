
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { Button, Card, Flex } from '@radix-ui/themes'
import Link from 'next/link'

export default async function SuccessPage() {
  return (
    <main className="w-full mx-auto flex flex-col justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-100">
      {/* <div className="container px-5 py-24 flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-purple-100"> */}
        <div className="bg-white rounded-lg p-8 flex flex-col max-w-auto mx-auto mt-10 md:mt-0 rounde-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-200">
          <Card className="gap-4 flex flex-col">
            <Flex gap="4" direction="column">
              <h1 className="text-slate-700 font-bold text-4xl mb-4">Correo enviado con éxito</h1>
              <p className="text-slate-500 mb-2 block text-xl">Si el correo no se muestra revisa la bandeja de Spam.</p>
              <Link
                href="/auth/signin"
                className="text-sm text-neutral-700/80 flex items-center p-3">
                <CaretLeftIcon />
                <span>Volver a inicio de sesión</span>
              </Link>
            </Flex>
          </Card>
        </div>
      {/* </div> */}
    </main>
  )
}