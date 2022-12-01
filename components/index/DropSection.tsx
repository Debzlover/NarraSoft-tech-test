import React, { DragEvent, ReactElement } from 'react'
import { connect } from 'react-redux'
import {  DropedControl } from '../../helpers/types/index/dragNDropTypes'
import { RootState } from '../../redux/store'
import { onDropTool } from '../../redux/index/dragToolsSlice'
import { Components} from '../../redux/index/initialData'
import { useState } from 'react'
import RegisterNewTool from './RegisterNewTool'


type onDropToolType = typeof onDropTool
interface DropSectionParams {
    dropedTools: DropedControl[],
    onDropTool: onDropToolType,
    // draged: ControlTool | null
}


const DropSection = ({ dropedTools, onDropTool }: DropSectionParams): ReactElement => {
    const [showNewTextBoxRegForm, setShowTextBoxRegForm] = useState(false)
    const onDrop = (event:DragEvent) => {
        event.preventDefault()
        // console.log('onDrop')
        onDropTool()
    }

    const onDragOver = (event:DragEvent) => {
        event.preventDefault()
        // console.log('onDragOver')
    }

    console.log('DropSection render')
    return (
        <div
            className='w-full space-y-7 px-4 bg-white'
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <RegisterNewTool />
            {
                dropedTools.map((tool, index) => {
                    // const Component = connect(null,{setDragControlData})(Components['Tool'+tool.toolId])
                    const Component = Components['Tool'+tool.toolId]
                    return <Component key={index} {...tool.dataState} />
                })
            }

            
        </div>
    )
}



export default connect((state: RootState) => ({
    dropedTools: state.dragNDrop.dropedTools,
}), { onDropTool })(DropSection)