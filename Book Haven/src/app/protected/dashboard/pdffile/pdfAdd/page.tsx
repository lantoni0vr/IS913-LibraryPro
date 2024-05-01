"use client"
import PdfListSkeleton from '@/components/pdfListSkeleton';
import { pdfToBlob } from "@/utils/pdfToBlob";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import from material ui
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


interface PdfList {
  id: number;
  fileName: string;
  pdf: string;
  fileSize: string;
  uploadedAt: Date;
}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {

  const [requestData, setRequestData] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState<string>("")
  const [defaultFileName, setDefaultFileName] = useState<string>("")
  const [file, setFile] = useState<string | ArrayBuffer | null>("")
  const [pdfList, setPdfList] = useState<PdfList[]>([])
  const [fileSize, setFileSize] = useState("")
  const [searchList, setSearchList] = useState<PdfList[]>([])
  const [open, setOpen] = useState(false);
  const [deleteFileName, setDeleteFileName] = useState("");



  const handleClose = () => {
    setOpen(false);
    setDeleteFileName("")
  };

  const clearField = () => {
    setFileName("")
    setDefaultFileName("")
    setFile("")
    setHasFile(false)
    setDeleteFileName("")
  }


  useEffect(() => {
    const getPdfList = async () => {
      let pdfList: any = await fetch("/api", {
        cache: "no-store"
      })
      pdfList = await pdfList.json();
      setPdfList(pdfList.fileList)
      setSearchList(pdfList.fileList)
      if (pdfList.fileList && pdfList.fileList.length === 0) {
        setListIsEmpty(true)
      }
    }
    getPdfList()
  }, [requestData])


  const searchPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let filteredArray: any = pdfList.filter((item) => item.fileName?.toLowerCase().includes(value.toLowerCase()));
    setSearchList(filteredArray)
    if (filteredArray.length <= 0) {
      setListIsEmpty(true)
    } else {
      setListIsEmpty(false)
    }
  }


  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('size', fileSize);
    formData.append('file', file as unknown as string);

    try {
      let body = await fetch("/api", {
        method: "POST",
        body: formData,
      });
      const result = await body.json();

      if (result.status === "200") {
        setRequestData(new Date());
        toast.success("PDF uploaded successfully");
      }
      else if (result.status === "409") {
        toast.warning('File Name Already Exists')
      }
      else if (result.status === "401") {
        toast.warning('Please Select Different File')
      }
      else {
        toast.error('Fail To Upload PDF')
      }
    }
    
    catch (error) {
      toast.error('ERROR! Failed to upload PDF')
    }
    finally {
      clearField();
      setLoading(false);
    }
  }

  const calculateFileSize = (size: number) => {
    let fileSizeInBytes = size * 0.000001;
    let fileSize = fileSizeInBytes.toFixed(1);
    setFileSize(fileSize)
    return fileSize;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setHasFile(true)
      
      const dataBlob = await pdfToBlob(file);
      let size = calculateFileSize(dataBlob.size)

      
      const f = new File([dataBlob], file.name, { type: dataBlob.type })
      const fr = new FileReader();
      fr.readAsDataURL(f)
      fr.onload = () => {
        const re = fr.result;
        setFile(re)
      }
      setDefaultFileName(`1 File Selected.  Size = ${size} MB`)
     
      e.target.value = "";
    }
  };

  const handleDelete = async (f: string, confirm: boolean) => {
 
    setDeleteFileName(f);
    setOpen(true)
    if (confirm && deleteFileName.length > 1) {
      setOpen(false)
      let body = await toast.promise(
        fetch(`/api/${f}`, {
          method: "DELETE",
        }),
        {
          pending: 'Removing PDF',
          success: 'PDF Removed Successfully 👌',
          error: 'Failed To Remove PDF 🤯'
        }
      );
      const result = await body.json();
      if (result.status === "200") {
        let deletedPdfList =
          setSearchList(searchList.filter(x => x.fileName !== f))

      }

      setRequestData(new Date());
      setLoading(false);
      setDeleteFileName("")
    }
  }
  return (
    <main className="flex flex-row justify-evenly items-center py-16 min-h-screen">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete PFD file?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          ¿Estas seguros que quieres eliminar <span className="font-bold underline">{deleteFileName}</span> de tu lista de libros?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(deleteFileName, true)}>Si</Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <div className="h-80vh w-700 flex flex-col justify-center items-center p-12 rounded-lg border-2 border-dashed border-lightgray shadow-lg bg-gradient-to-r from-gray-300 to-purple-100">
        <h1 className="text-gray-500 text-center text-3xl">Cargar tu libro en PDF</h1>
        <br />
        <h3 className="text-gray-500 text-center font-bold">Selecciona el archivo</h3>
        <h3 className="text-gray-500 text-center font-bold">Renomobralo a tu prefencia</h3>
        <form className="flex flex-col items-center justify-center w-full p-4 rounded-lg" autoComplete="off">
          <div className="flex flex-col items-center justify-center w-full h-full rounded-md p-4 gap-4 m-5">
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <InsertDriveFileIcon />
              <Box sx={{ width: '100%' }}>
                <TextField className="text-gray-500 text-center font-bold"
                  id="standard-basic"
                  fullWidth
                  placeholder="Coloca un nombre al archivo"
                  value={fileName}
                  autoFocus
                  onChange={(e) => { setFileName(e.target.value) }}
                  variant="standard" />
              </Box>
            </div>
            <div className="flex flex-row items-center justify-evenly gap-4 w-full" >
              {file ? <CheckBoxIcon /> :
                <CheckBoxOutlineBlankIcon />
              }

              <Box sx={{ width: '100%' }} >
                <TextField
                  id="standard-multiline-static"
                  fullWidth
                  rows={1}
                  disabled
                  variant="standard"
                  value={defaultFileName}
                />
              </Box>
              <Button
                startIcon={<AddCircleOutlineIcon />}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                color={file ? "error" : "success"}
              >Archivo
                <VisuallyHiddenInput
                  onChange={handleFileChange}
                  type="file" accept="application/pdf" />
              </Button>
            </div>
          </div>
          <LoadingButton
          className="m-1 text-gray-400"
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            disabled={!hasFile || fileName.length == 0}
            loadingPosition="end"
            variant="contained">
            {
              loading ? "Uploading..." : "Cargar"
            }
          </LoadingButton>
        </form>
      </div>
      <div className="h-80vh w-700 p-5">
        <div className="flex p-2 justify-center self-center m-2 border-b">
          <h1 className="text-gray-500 text-center text-3xl">Tu lista de libros</h1>
        </div>
        <Paper
          className="bg-transparent"
          component="form"
          sx={{ p: '2px 4px', m: '5px', display: 'flex', alignItems: 'center' }}
        >
          <InputBase
          className="text-gray-500 text-center font-bold"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Bucar archivo PDF"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={searchPdf}
          />
        </Paper>
        <div  className="h-80vh p-4 m-2 overflow-y-auto flex flex-col justify-start items-center">
          {
            searchList && searchList.length === 0 ? (!listIsEmpty ? 
            <PdfListSkeleton /> : 
            <h2 className="text-gray-500 text-center font-bold">Libro no encontrado</h2>) :

              (searchList && searchList.map((item, index) => (
                <div key={index}  className="w-full flex flex-row justify-between items-center border-b-2 border-lightgray">
                  <div>
                    <h4 className="text-gray-500 m-1 w-90 p-2 text-left" >
                      {item.fileName}
                    </h4>
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div className="font-bold text-xs flex justify-center items-center flex-col">
                      <span>{item.fileSize}</span>
                      <span>MB</span>
                    </div>


                    <Link href={`/protected/dashboard/pdffile/${item.fileName}`} target="_blank">
                      <Button className="m-1 text-gray-400" size="small" variant="contained" id="#contained-buttons">
                        Abrir
                      </Button>
                    </Link>
                    <button className="cursor-pointer text-white bg-red-500 border-none rounded-md p-2 shadow-md"
                      onClick={() => handleDelete(item.fileName, false)}
                    ><DeleteIcon />
                    </button>


                  </div>
                </div>
              )))
          }
        </div>
      </div>
    </main>
  );
}
