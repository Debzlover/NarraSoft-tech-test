import { ReactElement, useCallback } from "react"
import { useDropToolSelector } from "../../helpers/context/dropedToolsContext";
// import { useDropToolSelector } from "../../helpers/hooks/hook";
import {DropedControl, DropToolList } from "../../helpers/types/index/dragNDropTypes"
import { reduceTextInputDataState, setDragControlData } from "../../redux/index/dragToolsSlice";
import TextBox from "../generic/TextBox";
import { AiOutlineCloseCircle } from 'react-icons/ai';


type setDragControlDataType = typeof setDragControlData
function TextBoxBind({id,setDragControlData}:{id:string,setDragControlData?:setDragControlDataType}):ReactElement {
    // const [tool] = useDropToolSelector(id)
    const [tool,setTool, removeTool] = useDropToolSelector((state:DropToolList) => state[id])
    // const onTextChanged = useCallback((value:string) => {
    //     // setDragControlData?.(reduceTextInputDataState(tool, value))
    //     setTool(reduceTextInputDataState(tool, value))
    // },[tool])

    const onChange = (value:string)=> {
        setTool(reduceTextInputDataState(tool, value))
    }

    console.log('TextBoxBind render',tool.id)
    return (
        <div className="relative">
            <span className="hover:cursor-pointer absolute right-0" onClick={removeTool}><AiOutlineCloseCircle /></span>
            <TextBox {...tool.dataState} onChange={onChange}/>
        </div>
    )
}



export default TextBoxBind