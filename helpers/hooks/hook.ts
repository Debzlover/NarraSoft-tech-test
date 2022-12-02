import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

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



export const useDropToolSelector = (id:string) => {
    const dropTool = useSelector((state:RootState) => state.dragNDrop.dropedTools[id])
    return [dropTool]
}