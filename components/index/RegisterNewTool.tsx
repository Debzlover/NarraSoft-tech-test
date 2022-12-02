import { useEffect } from "react";
import { ReactElement, useState } from "react"
import { connect } from "react-redux";
import { ControlTool, DropControlStateType, DropedControlImageUploaderData, DropedControlTextInputData } from "../../helpers/types/index/dragNDropTypes";
import { ImageUploaderToolId, TextBoxToolId } from "../../redux/index/initialData";
import { RootState } from "../../redux/store";
import Button from "../generic/Button"
import TextBox from "../generic/TextBox"
import {registerDropedTool,clearDroped} from '../../redux/index/dragToolsSlice'
import ImageUploader from "../generic/ImageUploader";
import { useModalContextState } from "../../helpers/context/modalContext";
import { useDropTools } from "../../helpers/context/dropedToolsContext";


interface RegisterNewTextBoxModalParams {
    show?:boolean;
    newDroped:ControlTool | null,
    clearDroped: typeof clearDroped
}


const NewFeildPropComp = ({registerTool}:{registerTool:(data:DropControlStateType) => void}) => {
    const [field, setFieldData] = useState<DropedControlTextInputData>({
        label:'',
        placeholder:'',
        value:'',
    })
    const setLabel = (value: string)=> {setFieldData(feild => ({...feild,label: value}))}
    const setPlaceholder = (value: string)=> {setFieldData(feild => ({...feild,placeholder:value}))}
    const setValue = (value: string)=> {setFieldData(feild => ({...feild,value:value}))}

    const sendData = () => {
        registerTool(field)
    }

    console.log('NewFeildPropComp render')
    return (
        <>
            <TextBox label="Label" onChange={setLabel}/>
            <TextBox label="Placeholder" onChange={setPlaceholder}/>
            <TextBox label="Value" onChange={setValue}/>
            <Button onClick={sendData}>
                Register Tool
            </Button>
        </>
    )
}

const NewImageUploaderComp = ({registerTool}:{registerTool:(data:DropControlStateType) => void}) => {
    const [fileData, setFileData] = useState<DropedControlImageUploaderData>({
        base64: '',
        fileType: ''
    })

    const onChange = (base64:string, fileType:string)=> {setFileData({base64,fileType})}
    const sendData = () => {
        registerTool(fileData)
    }
    console.log('NewImageUploaderComp render')
    return (
        <>
            <ImageUploader onChange={onChange}/>
            <Button onClick={sendData}>
                Register Tool
            </Button>
        </>
    )
}

function RegisterNewTool({newDroped,clearDroped,show = false}:RegisterNewTextBoxModalParams):ReactElement|null {
    const {ModalD, modelRef} = useModalContextState()
    const [,registerDropedTool] = useDropTools()
    const [modalTitle, setModalTitle] = useState('')
    const [showModal, setShowModal] = useState(show)

    const registerTool = (data : DropControlStateType) => {
        if(newDroped){
            const id = "random-"+Math.random()*1000
            registerDropedTool({
                id: id,
                toolId:newDroped.id,
                dataState:data
            })
            clearDroped()
            modelRef.current?.closeModal()
        }
    }

    useEffect(() => {
        if(newDroped?.id == TextBoxToolId){
            setShowModal(true)
            setModalTitle("New Text Box")
        }
        else if(newDroped?.id == ImageUploaderToolId){
            setShowModal(true)
            setModalTitle("New Image Uploader")
        }

        if(newDroped)
            modelRef.current?.openModal()
        else 
            modelRef.current?.closeModal()
    }, [newDroped])

    console.log('RegisterNewTool rerender',newDroped?.id)
    return (
        <>
            {newDroped &&
                <ModalD title={modalTitle} show={showModal}>
                    <div className="flex flex-col">
                        {newDroped.id == TextBoxToolId && <NewFeildPropComp registerTool={registerTool} />}
                        {newDroped.id == ImageUploaderToolId && <NewImageUploaderComp registerTool={registerTool}/>}
                    </div>
                </ModalD>
            }
        </>
        
    )
}

export default connect((state:RootState) => ({
    newDroped : state.dragNDrop.newDroped,
}),{registerDropedTool,clearDroped})(RegisterNewTool)