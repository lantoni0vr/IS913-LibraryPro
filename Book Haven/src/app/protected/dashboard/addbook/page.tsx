import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Edit() {
  async function createBook(data: FormData) {
    "use server";

    await prisma.book.create({
      data: {
        name: data.get("name") as string,
        genre: data.get("genre") as string,
        description: data.get("description") as string,
      },
    });
  }

  return (
    <main className="text-gray-600 body-font items-center ">
      <div className="container px-5 py-24 flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-purple-100">
        <div className="bg-white rounded-lg p-8 flex flex-col max-w-auto mx-auto mt-10 md:mt-0 rounde-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-200">
          <h2 className="text-gray-600 text-center text-3xl">
            Agrega un Nuevo Libro
          </h2>

          <form action={createBook}>
            <div className="relative text-gray-500 font-bold mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Titulo
              </label>

              <input
                id="name"
                name="name"
                placeholder="Titulo del libro"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative text-gray-500 font-bold mb-4">
              <label
                htmlFor="genre"
                className="leading-7 text-sm text-gray-600"
              >
                Genero
              </label>

              <input
                id="genre"
                name="genre"
                placeholder="Genero del libro"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative text-gray-500 font-bold mb-4">
              <label
                htmlFor="description"
                className="leading-7 text-sm text-gray-600"
              >
                Descripcion del libro
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Agrega una descripcion del libro"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>

            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-9 mr-12">
              Create
            </button>

            <button className="text-white bg-indigo-500 border border-indigo-500 py-2 px-6 hover:bg-indigo-600 rounded text-lg mt-4 w-[6.5rem] ml-10">
              <Link href="/protected/dashboard/booktable">Lista</Link>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
