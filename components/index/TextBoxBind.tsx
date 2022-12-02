import { ReactElement, useCallback } from "react"
import { useDropToolSelector } from "../../helpers/context/dropedToolsContext";
// import { useDropToolSelector } from "../../helpers/hooks/hook";
import {DropedControl, DropToolList } from "../../helpers/types/index/dragNDropTypes"
import { reduceTextInputDataState, setDragControlData } from "../../redux/index/dragToolsSlice";
import TextBox from "../generic/TextBox";



type setDragControlDataType = typeof setDragControlData
function TextBoxBind({id,setDragControlData}:{id:string,setDragControlData?:setDragControlDataType}):ReactElement {
    // const [tool] = useDropToolSelector(id)
    const [tool,setTool] = useDropToolSelector((state:DropToolList) => state[id])
    // const onTextChanged = useCallback((value:string) => {
    //     // setDragControlData?.(reduceTextInputDataState(tool, value))
    //     setTool(reduceTextInputDataState(tool, value))
    // },[tool])

    const onChange = (value:string)=> {
        setTool(reduceTextInputDataState(tool, value))
    }

    console.log('TextBoxBind render',tool.id)
    return <TextBox {...tool.dataState} onChange={onChange}/>
}



export default TextBoxBind