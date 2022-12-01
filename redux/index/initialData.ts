import { ControlToolList, DropedControl } from "../../helpers/types/index/dragNDropTypes";
import { BsInputCursorText,BsFillImageFill } from 'react-icons/Bs';
import TextBox from "../../components/generic/TextBox";
import ImageUploader from "../../components/generic/ImageUploader";

export const TextBoxToolId = 'n1';
export const ImageUploaderToolId = 'n2';

export const Components = {
    ['Tool'+TextBoxToolId] : TextBox,
    ['Tool'+ImageUploaderToolId] : ImageUploader,
}

export const ToolIcons = {
    ['Tool'+TextBoxToolId] : BsInputCursorText,
    ['Tool'+ImageUploaderToolId] : BsFillImageFill,
}

export const initialState: ControlToolList = {
  draged: null,
  tools: [
    {
      id: TextBoxToolId,
      description: 'Simple Text Box',
    },
    {
      id: ImageUploaderToolId,
      description: 'Upload and Show Image',
    },
  ],
  dropedTools: [],
  newDroped: null
};


export const reduceTextInputDataState = (control: DropedControl, value:string):DropedControl => {
  return {
      ...control,
      dataState: control.dataState ? {
          label: 'label' in control.dataState ? control.dataState.label : '',
          placeholder: 'placeholder' in control.dataState ? control.dataState.placeholder : '',
          value
      } : null
  }
}


export const reduceImageUploaderDataState = (control: DropedControl, base64:string, fileType:string):DropedControl => {
  return {
    ...control,
    dataState: control.dataState ? {
        base64,
        fileType
    } : null
}
}