import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ImageUploader from '../../components/generic/ImageUploader';
import TextBox from '../../components/generic/TextBox';
import { ControlTool, ControlToolList, DropedControl, DropControlStateType } from '../../helpers/types/index/dragNDropTypes';
import { RootState } from '../store';

import {initialState, TextBoxToolId} from './initialData'


export const toolsDragDropSlice = createSlice({
  name: 'dragNDrop',
  initialState,
  reducers: {
    onDragTool: (state,action: PayloadAction<ControlTool>) => {
      // this will only update the state if new item has been draged
      if(state.draged?.id !== action.payload.id)
        state.draged = {...action.payload}
      else if(!state.draged)
        state.draged = {...action.payload}
    },
    onDragToolEnd: (state) => {
      /**
       * draged will be set to null to prevent registration of new tool that is not part of the tools catalogue
       */
      state.draged = null
      // console.log('onDragToolEnd')
    },
    onDropTool: (state) => {
      /**
       * set the newDroped value to true to trigger the modal to set its control values and properties
       */
      
      if(state.draged){
        state.newDroped = {...state.draged}
      }
      console.log('onDropTool ',state.newDroped?.id)
    },
    registerDropedTool: (state,action: PayloadAction<DropControlStateType>) => {
      /**
       * register new tool only if its currently draged tool
       */
      if(state.newDroped){
        state.dropedTools.push({
          id: "random-"+Math.random()*1000,
          toolId:state.newDroped.id,
          dataState:action.payload
        })
        state.newDroped = null
      }
    },

    setDragControlData: (state,action: PayloadAction<DropedControl>) => {
      state.dropedTools = state.dropedTools.map(tool => tool.id == action.payload.id ? action.payload : tool)
    },
  },
});

export const { onDragTool,onDropTool,onDragToolEnd ,setDragControlData, registerDropedTool} = toolsDragDropSlice.actions;

export const selectCount = (state: RootState) => state.dragNDrop.tools;



export const reduceTextInputDataState = (control: DropedControl, value: string): DropedControl => {
  return {
    ...control,
    dataState: control.dataState ? {
      label: 'label' in control.dataState ? control.dataState.label : '',
      placeholder: 'placeholder' in control.dataState ? control.dataState.placeholder : '',
      value
    } : null
  }
}


export const reduceImageUploaderDataState = (control: DropedControl, base64: string, fileType: string): DropedControl => {
  return {
    ...control,
    dataState: control.dataState ? {
      base64,
      fileType
    } : null
  }
}


export default toolsDragDropSlice.reducer;
