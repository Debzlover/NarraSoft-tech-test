import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"

export const useFileSelector = (defaultPath:string|undefined, fileType:string|undefined) => {
    const uploaderRef = useRef<HTMLInputElement|null>(null)
    const [fileData, setFile] = useState<string>(defaultPath? defaultPath : '/assets/image/image-upload-placeholder.jpg')
    const [fileTy, setFileType] = useState<string>(fileType? fileType : 'jpg')

    useEffect(() => {
        if(defaultPath){
            setFile(defaultPath)
        }
        if(fileType){
            setFileType(fileType)
        }
    },[defaultPath, fileType])

    const selectFile = useCallback(() => {
        uploaderRef.current?.click()
    },[])

    const onFileSelected = (ie: ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList|null = ie.target.files;
        const fileReader = new FileReader();

        fileReader.addEventListener("load", (e) => {
            setFile(String(e?.target?.result));
        });

        if(fileList?.length)
            fileReader.readAsDataURL(fileList[0]);
    }

    return {
        fileData,
        fileTy,
        uploaderRef,
        selectFile,
        onFileSelected
    }
}