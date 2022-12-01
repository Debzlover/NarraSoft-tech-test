import { ChangeEvent, ReactElement } from "react"


const TextBoxParamsDefault = {
    placeholder: "Enter something here",
}

export interface TextBoxParams{
    label?:string;
    value?:string;
    placeholder?: string;
    onChange?: (value:string) => void
    type?:'text'|'number'|'email';
}

function TextBox({label,value, placeholder,onChange,type = 'text' }:TextBoxParams & typeof TextBoxParamsDefault):ReactElement {

    const onTextChanged = (e:ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.currentTarget.value)
    }

    return (
        <div className="flex flex-col">
            {label && <label>{label}:</label>}
            <input type={type} value={value} placeholder={placeholder} onChange={onTextChanged} className="px-3 py-2 my-1 border border-gray-200 focus:outline-none focus:ring focus:ring-violet-300 rounded-lg"  />
        </div>
    )
}

TextBox.defaultProps = TextBoxParamsDefault


export default TextBox