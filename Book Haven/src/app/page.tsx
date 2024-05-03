import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  // redirect('/auth/register')

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-purple-100">
      <div className="relative bg-white rounded-lg p-8 rounde-lg border-2 border-double border-lightgray shadow-lg bg-gradient-to-r from-blue-300 to-purple-300">
        <h1 className="p-24 text-5xl font-bold">
          Book Haven Library
        </h1>
      </div>
    </main>
  );
}