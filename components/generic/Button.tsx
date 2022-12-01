import { ChangeEvent, ReactElement, ReactNode, useMemo } from "react"
import {DropedControl,DropedControlTextInputData } from "../../helpers/types/index/dragNDropTypes"
import { setDragControlData } from "../../redux/index/dragToolsSlice";


interface ButtonParams{
    children:ReactNode;
    onClick?: () => void
}

function Button({children, onClick}:ButtonParams ):ReactElement {
    return (
        <button onClick={onClick} className='p-3 mt-3 rounded-lg font-bold bg-slate-400'>{children}</button>
    )
}


export default Button