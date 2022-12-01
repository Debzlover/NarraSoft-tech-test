import Image from "next/image"
import { ReactElement,  useEffect } from "react"
import styles from  '../../styles/DragAndDrop.module.css'
import classNames from 'classnames';
import { useFileSelector } from "../../helpers/hooks/hook";

export interface ImageUploaderParams{
    base64?:string;
    fileType?:string;
    onChange?: (base64:string, fileType:string) => void;
}

export default function ImageUploader({base64, fileType, onChange}:ImageUploaderParams):ReactElement {
    const {uploaderRef, fileData, fileTy, onFileSelected, selectFile} = useFileSelector(base64,fileType)

    useEffect(() => {
        if(fileData !== base64 && fileData){
            onChange?.(fileData, fileTy)
        }
    },[fileData])

    return (
        <div className="flex flex-col ">
            <div className={classNames([styles.ImageFileUploaderContainer,'w-[200px]','h-[200px]'])} onClick={selectFile}>
                {
                    fileData && 
                        <Image 
                            src={fileData}
                            alt={'Image Uploader'} 
                            width={200}
                            height={200} 
                        />
                }
            </div>
            <input ref={uploaderRef} accept="image/png, image/gif, image/jpeg"  id='selectImage' hidden type="file" onChange={onFileSelected} />
        </div>
    )
}