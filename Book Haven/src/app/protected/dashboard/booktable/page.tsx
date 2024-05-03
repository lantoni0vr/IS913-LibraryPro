import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const books = await prisma.book.findMany();

  return (
    <main className="text-gray-600 body-font items-center">
      <div className=" h-screen container px-5 py-24 flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-purple-100">
        <div className="relative bg-white rounded-lg p-8 rounde-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-200">
          <h2 className="text-gray-600 text-center text-3xl mb-5">
            Lista de los libros agregados
          </h2>
          {books.map((book) => (
            <div
              className="lg:w-3/5 mx-auto border-b pb-3 border-gray-200 sm:flex-row flex-col"
              key={book.id}
            >
              
              <div className="flex-grow sm:text-left text-center mt-2 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  {book.name} ·{" "}
                  <span className="text-green-600 ">{book.genre}</span>
                </h2>
                <p className="leading-relaxed text-base">{book.description}</p>
              </div>
            </div>
          ))}</div>
      </div>
    </main>
  );
}
