import React, { DragEvent, ReactElement, useMemo } from 'react'
import { connect } from 'react-redux'
import {  ControlTool, DropedControl } from '../../helpers/types/index/dragNDropTypes'
import { RootState } from '../../redux/store'
import { clearDroped,onDropTool,setDragControlData } from '../../redux/index/dragToolsSlice'
import { Components} from '../../redux/index/initialData'
import { useState } from 'react'
import RegisterNewTool from './RegisterNewTool'
import { useDropTools } from '../../helpers/context/dropedToolsContext'


type onDropToolType = typeof onDropTool
interface DropSectionParams {
    // dropedTools: {[key:string]:DropedControl},
    onDropTool: onDropToolType,
}


const DropSection = ({onDropTool }: DropSectionParams): ReactElement => {
    const [dropedTools] = useDropTools()
    const onDrop = (event:DragEvent) => {
        event.preventDefault()
        // console.log('onDrop')
        onDropTool()
        // clearDroped()
        // registerTool({

        // })
    }

    const onDragOver = (event:DragEvent) => {
        event.preventDefault()
        // console.log('onDragOver')
    }


    console.log('DropSection render',dropedTools)
    return (
        <>
            <RegisterNewTool />
            <div
                className='w-full space-y-7 px-4 bg-white'
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {
                    Object.values(dropedTools).map((tool, index) => {
                        const Component = connect(null,{setDragControlData})(Components[tool.toolId])
                        // const Component = Components[tool.toolId]
                        return <Component key={index} id={tool.id} />
                    })
                }
                
            </div>
        </>
        
    )
}



export default connect(null, { onDropTool })(DropSection)