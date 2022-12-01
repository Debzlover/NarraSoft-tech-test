import { ReactElement, useCallback } from "react"
import {DropedControl } from "../../helpers/types/index/dragNDropTypes"
import { reduceTextInputDataState, setDragControlData } from "../../redux/index/dragToolsSlice";
import TextBox from "../generic/TextBox";



type setDragControlDataType = typeof setDragControlData
function TextBoxBind({propsData,setDragControlData}:{propsData:DropedControl,setDragControlData?:setDragControlDataType}):ReactElement {

    const onTextChanged = useCallback((value:string) => {
        setDragControlData?.(reduceTextInputDataState(propsData, value))
    },[propsData.dataState])

    return <TextBox {...propsData.dataState} onChange={onTextChanged}/>
}



export default TextBoxBind