"use client"
import { useEffect, useState } from "react";


export default function Page({ params }: any) {
    let fileName = params.pdf;
    
    const [file, setFile] = useState("")
    useEffect(() => {
        const getPdfList = async () => {
            let pdfList: any = await fetch(`/api/${fileName}`, {
                method: "GET",
            })
            pdfList = await pdfList.json();
            // console.log(pdfList.file.pdf);
            if (pdfList.file && pdfList.file.pdf) {
                setFile(pdfList.file.pdf);
              }
            console.log(pdfList)
        }
        getPdfList()
        // const pdfUrl = `${file}`;
        // window.open(pdfUrl);
    }, [file, fileName]);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <iframe src={`${file}`} className="absolute inset-0 w-full h-full" title="PDF Viewer"></iframe>
        </div> 
        )

}
