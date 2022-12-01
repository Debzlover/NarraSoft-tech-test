import { useEffect } from "react";
import { ReactElement, ReactNode, useState } from "react"
import { connect } from "react-redux";
import { ControlTool, DropedControlImageUploaderData } from "../../helpers/types/index/dragNDropTypes";
import { ImageUploaderToolId } from "../../redux/index/initialData";
import { RootState } from "../../redux/store";
import Button from "../generic/Button"
import TextBox from "../generic/TextBox"
import Modal from "./Modal"
import {registerDropedTool} from '../../redux/index/dragToolsSlice'
import ImageUploader from "../generic/ImageUploader";


interface RegisternewImageUploaderModalParams {
    onRegister?:(obj:DropedControlImageUploaderData) => void
    show?:boolean;
    newDroped:ControlTool | null,
    registerDropedTool: typeof registerDropedTool
}



function RegisternewImageUploaderModal({newDroped,registerDropedTool,onRegister,show = false}:RegisternewImageUploaderModalParams):ReactElement|null {

    const [fileData, setFileData] = useState<DropedControlImageUploaderData>({
        base64: '',
        fileType: ''
    })
    const [showModal, setShowModal] = useState(show)

    const registerImageUploaded = () => {
        registerDropedTool(fileData)
        onRegister?.(fileData)
    }

    const onChange = (base64:string, fileType:string) => {
        setFileData({base64,fileType})
    }

    useEffect(() => {
        if(newDroped?.id == ImageUploaderToolId){
            setShowModal(true)
        }
        
    }, [show,newDroped])

    console.log('RegisternewImageUploaderModal rerender',newDroped?.id)
    return (
        <>
            {newDroped?.id == ImageUploaderToolId &&
            <Modal title="New Image Uploader" show={showModal}>
                <div className="flex flex-col">
                    <ImageUploader onChange={onChange}/>
                    <Button onClick={registerImageUploaded}>
                        Register Tool
                    </Button>
                </div>
            </Modal>
            }
        </>
        
    )
}

export default connect((state:RootState) => ({
    newDroped : state.dragNDrop.newDroped,
}),{registerDropedTool})(RegisternewImageUploaderModal)