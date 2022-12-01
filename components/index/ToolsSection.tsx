import React, { DragEvent, ReactElement } from 'react'
import { connect } from 'react-redux'
import { ControlTool } from '../../helpers/types/index/dragNDropTypes'
import { RootState } from '../../redux/store'
import { onDragTool,onDragToolEnd } from '../../redux/index/dragToolsSlice'
import { ToolIcons } from '../../redux/index/initialData'

interface ToolsSectionParams {
    tools: ControlTool[],
}

interface ToolsItemParams {
    tool: ControlTool,
    onDragTool: typeof onDragTool
    onDragToolEnd: typeof onDragToolEnd
}

const ToolItem_ = React.memo(({ tool,onDragTool,onDragToolEnd }: ToolsItemParams) => {

    const onDrag = (event:DragEvent) => {
        event.preventDefault()
        // console.log('onDrag')
        onDragTool(tool)
    }

    const onDragEnd = (event:DragEvent) => {
        event.preventDefault()
        // console.log('onDragEnd')
        onDragToolEnd()
    }

    const Icon = ToolIcons['Tool'+tool.id]
    return <>
        <div
            draggable
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            className='flex py-2 align-center '
        >
            <Icon className='self-center mr-5'/>
            <span className='flex-1'>{tool.description}</span>
        </div>
    </>
})

const ToolItem = connect(null, {onDragTool,onDragToolEnd})(ToolItem_)

const ToolsSection = ({ tools }: ToolsSectionParams): ReactElement => {

    console.log('ToolsSection render')
    return (
        <>
            {
                tools.map((tool, index) => <ToolItem key={index} tool={tool} />)
            }
        </>
    )
}


export default connect((state: RootState) => ({
    tools: state.dragNDrop.tools
}))(ToolsSection)