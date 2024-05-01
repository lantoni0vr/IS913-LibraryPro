
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";


//get all fileName list to display on UI 
export async function GET(){
    try {
        const fileList = await prisma.pdfTable.findMany({
            orderBy:[
                {
                    uploadedAt : 'desc'
                }
            ]
        });
        return NextResponse.json({success: true, fileList , status:"200"}, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}

//store filename and fileData in base64 url
export async function POST(req: Request){
    
    try {
        const body=await req.formData();
        const fileName : any= body.get('fileName')+"";
        const file:any = body.get('file')+"";
        const size:any = body.get('size')+"";
        
        if(file === "null" && fileName === "null" ){
            return NextResponse.json({success: false, message: "Please Select Different File",status: "401"},{status: 401})
        }
        //check file name already exist or not
        const existingFileName = await prisma.pdfTable.findUnique({
            where: { fileName: fileName}
        });
        if(existingFileName){
            return NextResponse.json({success: false, message: "File Name already exists",status: "409"},{status: 409})
        }
        const pdfUpload = await prisma.pdfTable.create({
            data: {
                fileName: fileName,
                pdf: file,
                fileSize: size,
            }
        })
        
        return NextResponse.json({success: true, pdfUpload, status: "200"},{status: 200});
    } catch (error) {
        // console.log("SERVER CATCH ERROR ", error)
        return NextResponse.json({success: false, error: error , status: "400"},{status: 400})
    }
}   