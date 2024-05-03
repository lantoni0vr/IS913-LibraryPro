import Link from 'next/link';

const MainPage = () => {
  return (
    <main className="text-gray-600 body-font items-center  ">
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="relative bg-white rounded-lg p-8 rounde-lg border-6 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-300">
          <button className=" bg-blue-500 text-white p-3 rounded-lg mt-2 text-lg hover:bg-indigo-600 mr-3">
            <Link href="/protected/dashboard">Bienvenido</Link>
          </button>
          <button className="bg-blue-500 text-white p-3 rounded-lg mt-2 text-lg hover:bg-indigo-600 border-slate-900 mr-3">
            <Link href="/protected/dashboard/pdffile/pdfAdd">Agregar PDF</Link>
          </button>
          <button className=" bg-blue-500 text-white p-3 rounded-lg mt-2 text-lg hover:bg-indigo-600">
            <Link href="/protected/dashboard/addbook">Agregar libro</Link>
          </button>
        </div>
      </div>
    </main>
  )
}

export default MainPage
