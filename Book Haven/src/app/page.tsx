import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

 // redirect('/auth/register')

  return (
    <main className=" h-[calc(100vh-7rem)] flex justify-center items-center p-24 text-3xl font-bold">
       <h1>Book Haven Library</h1>
    </main>
  );
}