import { ReactElement, useCallback } from "react"
import {DropedControl } from "../../helpers/types/index/dragNDropTypes"
import { setDragControlData } from "../../redux/index/dragToolsSlice";
import { reduceImageUploaderDataState } from "../../redux/index/initialData";
import ImageUploader from "../generic/ImageUploader";


type setDragControlDataType = typeof setDragControlData
function ImageUploaderBind({propsData,setDragControlData}:{propsData:DropedControl,setDragControlData?:setDragControlDataType}):ReactElement {

    const onFileChanged = useCallback((fileData:string, fileTy:string) => {
        setDragControlData?.(reduceImageUploaderDataState(propsData, fileData, fileTy))
    },[propsData.dataState])

    return <ImageUploader {...propsData.dataState} onChange={onFileChanged}/>
}



export default ImageUploaderBind