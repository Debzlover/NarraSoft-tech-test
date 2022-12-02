import { ReactElement, useCallback } from "react"
import { useDropToolSelector } from "../../helpers/context/dropedToolsContext";
// import { useDropToolSelector } from "../../helpers/hooks/hook";
import {DropedControl, DropToolList } from "../../helpers/types/index/dragNDropTypes"
import { reduceImageUploaderDataState, setDragControlData } from "../../redux/index/dragToolsSlice";
import ImageUploader from "../generic/ImageUploader";


type setDragControlDataType = typeof setDragControlData
function ImageUploaderBind({id,setDragControlData}:{id:string,setDragControlData?:setDragControlDataType}):ReactElement {
    // const [tool] = useDropToolSelector(id)
    const [tool,setTool] = useDropToolSelector((state:DropToolList) => state[id])
    const onFileChanged = useCallback((fileData:string, fileTy:string) => {
        // setDragControlData?.(reduceImageUploaderDataState(tool, fileData, fileTy))
        setTool(reduceImageUploaderDataState(tool, fileData, fileTy))
    },[tool.dataState])

    console.log('ImageUploaderBind render',tool.id)
    return <ImageUploader {...tool.dataState} onChange={onFileChanged}/>
}



export default ImageUploaderBind