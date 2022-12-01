
export interface ControlTool {
    id: string;
    description: string;
}



export interface DropedControlTextInputData {
    label:string;
    placeholder:string;
    value:string
}

export interface DropedControlImageUploaderData {
    base64: string;
    fileType: string
}


export type DropControlStateType = DropedControlTextInputData | DropedControlImageUploaderData | null
export interface DropedControl {
    id: string;
    toolId: string;
    dataState: DropControlStateType
}




export interface ControlToolList {
    draged: ControlTool | null,
    tools: ControlTool[],
    dropedTools: DropedControl[],
    newDroped:ControlTool | null,
}