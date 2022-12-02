import { ControlToolList, DropedControl } from "../../helpers/types/index/dragNDropTypes";
import { BsInputCursorText, BsFillImageFill } from 'react-icons/Bs';
import TextBox from "../../components/generic/TextBox";
import ImageUploader from "../../components/generic/ImageUploader";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import TextBoxBind from "../../components/index/TextBoxBind";
import ImageUploaderBind from "../../components/index/ImageUploaderBind";

export const TextBoxToolId = 'n1';
export const ImageUploaderToolId = 'n2';


export const Components: { [key: string]: typeof TextBoxBind | typeof ImageUploaderBind } = {
  [TextBoxToolId]: TextBoxBind,
  [ImageUploaderToolId]: ImageUploaderBind,
}

export const ToolIcons: { [key: string]: IconType } = {
  [TextBoxToolId]: BsInputCursorText,
  [ImageUploaderToolId]: BsFillImageFill,
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
  dropedTools: {},
  newDroped: null
};

